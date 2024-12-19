import React from 'react';
import { format, isValid } from 'date-fns';

interface CalculatorResultProps {
  type: 'due-date' | 'ovulation';
  result: {
    dueDate?: string;
    trimester?: string;
    weeksAndDays?: string;
    fertileWindow?: {
      start: string;
      end: string;
    };
    ovulationDate?: string;
  };
}

const formatDate = (dateString: string | undefined, formatStr: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return isValid(date) ? format(date, formatStr) : '';
};

const CalculatorResult: React.FC<CalculatorResultProps> = ({ type, result }) => {
  return (
    <div className="mt-8 space-y-4 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg animate-fade-in">
      <div className="grid grid-cols-1 gap-4">
        {type === 'due-date' ? (
          <>
            <ResultItem
              label="Estimated Due Date"
              value={result.dueDate}
            />
            <ResultItem
              label="Current Trimester"
              value={result.trimester}
            />
            <ResultItem
              label="Pregnancy Progress"
              value={result.weeksAndDays}
            />
          </>
        ) : (
          <>
            <ResultItem
              label="Fertile Window"
              value={result.fertileWindow ? 
                `${formatDate(result.fertileWindow.start, 'MMM dd')} - ${formatDate(result.fertileWindow.end, 'MMM dd')}` 
                : ''}
            />
            <ResultItem
              label="Ovulation Date"
              value={formatDate(result.ovulationDate, 'MMMM dd, yyyy')}
            />
          </>
        )}
      </div>
    </div>
  );
};

const ResultItem: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className="transform transition-all duration-300 hover:-translate-y-1">
    <h3 className="text-sm font-medium text-gray-500">{label}</h3>
    <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
  </div>
);

export default CalculatorResult;