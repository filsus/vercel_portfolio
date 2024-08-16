// components/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-[#553b1def] border-4 border-[#553b1def] shadow-sm min-h-[300px] mb-4 px-1">
      {children}      
    </div>
  );
};

export default Card;
