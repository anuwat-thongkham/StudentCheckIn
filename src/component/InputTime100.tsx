import React, { useState } from "react";
import '../style/global/global.scss';
import '../style/conponent/inputTime100Style.scss';

interface InputTime100Props {
    title: string;
    isInputError: boolean;
    errorText: string;
    onTimeChange: (time: string) => void;
}

const InputTime100: React.FC<InputTime100Props> = ({ title, isInputError, errorText , onTimeChange}) => {
    const [timeValue, setTimeValue] = useState<string>(""); 
    
    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = e.target.value;
        setTimeValue(time); // Update the state with the new time value
        onTimeChange(time); // Call the callback function passed from the parent component
    };

    return (
        <div className="inputTime100">
            <div className="container">
                <p className="inputName">{title}</p>
                <input 
                    type="time" 
                    className='inputField'
                    value={timeValue} // Bind input value to state variable
                    onChange={handleTimeChange} 
                />
                {isInputError && <p className="errorText">{errorText}</p>}
            </div>
        </div>
    );
}

export default InputTime100;
