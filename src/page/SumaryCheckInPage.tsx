
import { useEffect, useState } from 'react';

import '../style/global/global.scss';
import '../style/page/sumaryCheckInPage.scss'
import NoSupport from '../component/NoSupport';
import Headbar100 from '../component/Headbar100';
import Button200 from '../component/Button200';


import { auth, firestore } from '../config/firebase';
import { QuerySnapshot, collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { RootState } from "../redux/store/store";
import { useSelector } from 'react-redux';

export default function SumaryCheckInPage() {

    const navigate = useNavigate();
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const studentSession = useSelector((state: RootState) => state.studentSession.studentSesion);
    const currentUserEmail = auth.currentUser?.email as any;
    const [stdSession] = useState<string>(studentSession);
    const [email] = useState<string>(currentUserEmail);
    const [subjectName, setSubjectName] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [room, setRoom] = useState<string>('');
    const getCheckInHistoryByPinAndEmail = async () => {
        try {
            
            const historySnapshot: QuerySnapshot = await getDocs(query(collection(firestore, 'CheckInHistory'),
                where('checkInHistory_pin', '==', stdSession),
                where('checkInHistory_email', '==', email)
            ));

            if (!historySnapshot.empty) {
                historySnapshot.forEach(doc => {
                    const data = doc.data();

                    setSubjectName(data.checkInHistory_subject_name);
                    setTime(data.checkInHistory_timeStamp)
                    setRoom(data.checkInHistory_subject_room);
                    console.log(data);
                });
            } else {
                console.log("No documents found for the provided PIN and email.");
            }
        } catch (error) {
            console.error("Error finding CheckInHistory document:", error);
            return null;
        }
    };
    useEffect(() => {

        getCheckInHistoryByPinAndEmail();
    
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
        navigate('/StudentCheckIn/PinCheckInPage');
    }
    const handleBackMenuButton = () =>{
        navigate('/StudentCheckIn/StudentIndexPage');
    }
    return (
        <div className="main">
            {isSmallScreen ? (
                <NoSupport />
            ) : (
                <div className="sumaryCheckInPage">
                    <Headbar100 onClick={handBackButton} />
                    <h1 className="statusDisplay">
                        เช็คชื่อสำเร็จ
                    </h1>
                    <p className="sujectDisplay">
                        วิชา&nbsp;{subjectName}
                    </p>
                    <p className="timeStamptDisplay">
                        {time}&nbsp;-&nbsp;ห้องเรียน&nbsp;{room}
                    </p><div className="actionSection">
                        <Button200 onClick={handleBackMenuButton}>ออกสู่หน้าเมนูหลัก</Button200>
                    </div>
                </div>
            )}
        </div>
    );
}