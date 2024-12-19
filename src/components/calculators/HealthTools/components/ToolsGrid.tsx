import React from 'react';
import { useNavigate } from 'react-router-dom';
import ToolCard from './ToolCard';
import { healthTools } from '../data/tools';

const ToolsGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {healthTools.map((tool, index) => (
        <div
          key={tool.path}
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <ToolCard
            {...tool}
            onClick={() => navigate(tool.path)}
          />
        </div>
      ))}
    </div>
  );
};

export default ToolsGrid;