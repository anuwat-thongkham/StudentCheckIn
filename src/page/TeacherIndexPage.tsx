import { useEffect, useState } from "react";

import '../style/global/global.scss';
import '../style/page/teacherIndexPage.scss';

import Button100 from "../component/Button100";
import Button200 from "../component/Button200";
import Button300 from "../component/Button300";
import NoSupport from "../component/NoSupport";

function TeacherIndexPage() {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const [email] = useState<string>('anuwat@test.com');

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth > 512);
        };
        handleResize(); // Call once to initialize
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="main">
            {isSmallScreen ? (
                <NoSupport />
            ) : (
                <div className="teacherIndexPage">
                    <p className="roleHeader">Teacher</p>
                    <h1 className="schoolName">College of Computing</h1>
                    <p className="emailAddress">{email}</p>
                    <div className="button1Container">
                        <Button100>สร้างการเช็คชื่อ</Button100>
                    </div>
                    <div className="button2Container">
                        <Button200>ประวัติการเช็คชื่อ</Button200>
                    </div>
                    <div className="actionSection">
                        <Button300>ออกจากระบบ</Button300>
                    </div>
                </div>
            )}
        </div>

    );
}
export default TeacherIndexPage;