import React from 'react';
import '../style/global/global.scss'
import '../style/conponent/button100Style.scss'

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const Button100: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button  className="buttonContainer"  onClick={onClick}>
      {children}
    </button>
  );
};

export default Button100;
