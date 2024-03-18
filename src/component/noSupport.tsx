import Image from 'next/image'; 
import '../style/global/global.scss';
import '../style/conponent/noSupportStyle.scss';
export default function NoSupport() {
    return (
        <div className="noSupport">
            <Image className='noSupportImage' src="./asset/svg/noSupport.svg" alt="No Support" width="100" height="100"  priority/>
            <p className='noSupportDescription'>รองรับการแสดงผลเฉพาะบนสมาร์ทโฟน</p>
        </div>
    )
}