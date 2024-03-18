import '../style/global/global.scss';
import '../style/conponent/noSupportStyle.scss';
export default function NoSupport() {
    return (
        <div className="noSupport">
            <img className='noSupportImage' src="./asset/svg/noSupport.svg" alt="No Support" width="100" height="100"  />
            <p className='noSupportDescription'>รองรับการแสดงผลเฉพาะบนสมาร์ทโฟน</p>
        </div>
    )
}