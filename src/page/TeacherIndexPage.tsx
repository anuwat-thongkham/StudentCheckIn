import { useEffect, useState } from "react";

import '../style/global/global.scss';
import '../style/page/teacherIndexPage.scss';

import Button100 from "../component/Button100";
import Button200 from "../component/Button200";
import Button300 from "../component/Button300";
import NoSupport from "../component/NoSupport";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store/store";
import { auth, firestore } from '../config/firebase';
import { QuerySnapshot, collection, getDocs, query, where } from 'firebase/firestore';
import { useSelector } from "react-redux";

function TeacherIndexPage() {

    const teacherSession = useSelector((state: RootState) => state.teacherSession.teacherSesion);

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('') as any;

    const [subjectNeame, setSubjectName] = useState<string>('');
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
        findCollectionByPin();
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

    const findCollectionByPin = async () => {
        try {
            const sessionSnapshot: QuerySnapshot = await getDocs(query(collection(firestore, 'CheckInSession'), where('checkInSession_pin', '==', teacherSession)));
            if (!sessionSnapshot.empty) {
                sessionSnapshot.forEach(doc => {
                    const data = doc.data();
                    setSubjectName(data.checkInSession_subject_name);
                    console.log(data); // Access data of each document in the snapshot
                });
            } else {
                console.log("No documents found for the provided PIN.");
            }
        } catch (error) {
            console.error("Error finding collection by PIN:", error);
            throw error; // Rethrow the error to handle it elsewhere if needed
        }
    };

    const handleCreateSessionButton = () => {
        navigate(`/StudentCheckIn/CreateCheckInPage`);
    }
    const handleDisplayBttonn =() =>{
        navigate(`/StudentCheckIn/CheckInDisplayPage`);
    }
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
                        <Button100 onClick={handleCreateSessionButton}>สร้างการเช็คชื่อ</Button100>
                    </div>
                    <div className="button2Container">
                        <Button200>ประวัติการเช็คชื่อ</Button200>
                    </div>
                    {teacherSession != '' &&
                        <div className="checkInOnContainer">
                            <p className="checkInOnTitle">ที่กำลังเปิดเช็คชื่อ</p>
                            <button className="checkInButton" onClick={handleDisplayBttonn}>
                                วิชา&nbsp;{subjectNeame}
                            </button>
                        </div>
                    }
                    <div className="actionSection">
                        <Button300 onClick={signOutFromFirebase}>ออกจากระบบ</Button300>
                    </div>
                </div>
            )}
        </div>

    );
}
export default TeacherIndexPage;