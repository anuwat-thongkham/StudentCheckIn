import '../style/global/global.scss';
import '../style/conponent/noSupportStyle.scss';

import noSupportImage from '../assets/svg/noSupport.svg'
export default function NoSupport() {
    return (
        <div className="noSupport">
            <img className='noSupportImage' src={noSupportImage} alt="No Support" width="100" height="100" />
            <p className='noSupportDescription'>รองรับการแสดงผลเฉพาะบนสมาร์ทโฟนแนวตั้ง</p>
        </div>
    )
}