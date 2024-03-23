import { useEffect, useState } from "react";

import '../style/global/global.scss';
import '../style/page/teacherHistoryPage.scss';

import NoSupport from "../component/NoSupport";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store/store";
import { useSelector } from "react-redux";
import Headbar100 from "../component/Headbar100";
import CheckInHistoryTeacher from "../component/CheckInHistoryTeacher";

function TeacherHistoryPage() {

    const teacherSession = useSelector((state: RootState) => state.teacherSession.teacherSesion);

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth > 512);
        };
        handleResize(); // Call once to initialize
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handBackButton = () => {
        navigate('/StudentCheckIn/TeacherIndexPage');
    }
    return (
        <div className="main">
            {isSmallScreen ? (
                <NoSupport />
            ) : (
                <div className="teacherHistoryPage">
                    <Headbar100 onClick={handBackButton} />
                    <h2 className="title">ประวัติการเช็คชื่อ</h2>
                    <div className="historySection">
                        <CheckInHistoryTeacher teacherSession={teacherSession} />
                    </div>
                </div>
            )}
        </div>

    );
}
export default TeacherHistoryPage;