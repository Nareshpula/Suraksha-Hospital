-- First enable the http extension if not already enabled
CREATE EXTENSION IF NOT EXISTS http;

-- Create http_header type if it doesn't exist
DO $$ BEGIN
  CREATE TYPE http_header AS (
    field text,
    value text
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create http_response type if it doesn't exist
DO $$ BEGIN
  CREATE TYPE http_response AS (
    status integer,
    content text,
    headers http_header[]
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create http_post function
CREATE OR REPLACE FUNCTION http_post(
  url text,
  body text,
  content_type text DEFAULT 'application/json',
  headers http_header[] DEFAULT '{}'::http_header[]
) 
RETURNS http_response AS $$
DECLARE
  result http_response;
BEGIN
  SELECT 
    status,
    content::text,
    ARRAY(
      SELECT (key, value)::http_header 
      FROM jsonb_each_text(headers_raw) 
    ) as headers
  INTO result
  FROM http((
    'POST',
    url,
    headers,
    content_type,
    body
  )::http_request);
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create http_get function
CREATE OR REPLACE FUNCTION http_get(
  url text,
  headers http_header[] DEFAULT '{}'::http_header[]
) 
RETURNS http_response AS $$
DECLARE
  result http_response;
BEGIN
  SELECT 
    status,
    content::text,
    ARRAY(
      SELECT (key, value)::http_header 
      FROM jsonb_each_text(headers_raw) 
    ) as headers
  INTO result
  FROM http((
    'GET',
    url,
    headers,
    NULL,
    NULL
  )::http_request);
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;