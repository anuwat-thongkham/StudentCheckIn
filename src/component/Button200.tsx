import React from 'react';
import '../style/global/global.scss'
import '../style/conponent/button200Style.scss'

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const Button200: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <div className="button200">
      <button className="buttonContainer" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button200;
