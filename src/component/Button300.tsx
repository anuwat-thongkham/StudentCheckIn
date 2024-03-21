import React from 'react';
import '../style/global/global.scss'
import '../style/conponent/button300Style.scss'

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const Button300: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <div className="button300">
      <button className="buttonContainer" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button300;
