import React from 'react';
import '../style/global/global.scss'
import '../style/conponent/headbar100Style.scss'

interface Headbar100Props {
    onClick?: () => void;
}

const Headbar100: React.FC<Headbar100Props> = ({ onClick }) => {
    return (
        <div className="headbar100">
            <div className="container">
                <button className="backButton" onClick={onClick}>
                    <span className="material-symbols-sharp backButtonIcon">arrow_back</span>
                </button>
                <p className="schoolName">College of Computing</p>
            </div>
        </div>
    );
}

export default Headbar100;