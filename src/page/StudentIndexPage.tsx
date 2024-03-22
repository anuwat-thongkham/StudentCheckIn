import { useEffect, useState } from "react";

import '../style/global/global.scss';
import '../style/page/studentIndexPageStyle.scss';

import Button100 from "../component/Button100";
import Button200 from "../component/Button200";
import Button300 from "../component/Button300";
import NoSupport from "../component/NoSupport";

import { auth } from '../config/firebase';
import { useNavigate } from "react-router-dom";

function StudentIndexPage() {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('') as any;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // Get the current user's email
                const currentUserEmail = user.email;
                setEmail(currentUserEmail);

            } else {
                setEmail('No Sign in');
            }
        });
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth > 512);
        };
        handleResize(); // Call once to initialize
        window.addEventListener('resize', handleResize);
        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    async function signOutFromFirebase() {
        try {
            await auth.signOut();
            console.log("Signed out from Firebase successfully!");
            navigate(`/`);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }
    const handleCheckInButton =() =>{
        navigate(`/StudentCheckIn/PinCheckInPage`);
    }
    return (
        <div className="main">
            {isSmallScreen ? (
                <NoSupport />
            ) : (
                <div className="studentIndexPage">
                    <p className="roleHeader">Student</p>
                    <h1 className="schoolName">College of Computing</h1>
                    <p className="emailAddress">{email}</p>
                    <div className="button1Container">
                        <Button100 onClick={handleCheckInButton}>เข้าเช็คชื่อ</Button100>
                    </div>
                    <div className="button2Container">
                        <Button200>ประวัติการเช็คชื่อ</Button200>
                    </div>
                    <div className="actionSection">
                        <Button300 onClick={signOutFromFirebase}>ออกจากระบบ</Button300>
                    </div>
                </div>
            )}
        </div>

    );
}
export default StudentIndexPage;
