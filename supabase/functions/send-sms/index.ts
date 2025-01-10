import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const FAST2SMS_API_KEY = Deno.env.get('FAST2SMS_API_KEY')
const FAST2SMS_BASE_URL = 'https://www.fast2sms.com/dev/bulkV2'

interface RequestBody {
  phoneNumber: string
  message: string
  type?: 'otp' | 'confirmation'
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  try {
    // Parse request body
    const { phoneNumber, message, type = 'confirmation' } = await req.json() as RequestBody

    // Validate phone number (Indian format)
    if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid phone number' }),
        { 
          status: 400, 
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    }

    // Send SMS via Fast2SMS
    const response = await fetch(FAST2SMS_BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': FAST2SMS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        route: type === 'otp' ? 'otp' : 'v3',
        sender_id: 'SURAKSHA',
        message,
        language: 'english',
        flash: type === 'otp' ? 1 : 0,
        numbers: phoneNumber,
      }),
    })

    const result = await response.json()

    if (!result.return) {
      throw new Error(result.message || 'Failed to send SMS')
    }

    return new Response(
      JSON.stringify({ success: true, message: 'SMS sent successfully' }),
      { 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { 
        status: 500, 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
})