import React from "react";
import '../style/global/global.scss';
import '../style/conponent/inputText100Style.scss';

interface InputText100Props {
    title: string;
    isInputError: boolean;
    errorText: string;
    onTextChange: (text: string) => void;
}

const InputText100: React.FC<InputText100Props> = ({ title, isInputError, errorText, onTextChange }) => {
  
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        onTextChange(text);
    };

    return (
        <div className="inputText100">
            <div className="container">
                <p className="inputName">{title}</p>
                <input 
                    type="text" 
                    className={`inputField ${isInputError ? 'errorInputField' : ''}`} 
                    onChange={handleTextChange} 
                />
                {isInputError && <p className="errorText">{errorText}</p>}
            </div>
        </div>
    );
}

export default InputText100;
