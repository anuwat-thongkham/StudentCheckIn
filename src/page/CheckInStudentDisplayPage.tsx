
import { useEffect, useState } from 'react';

import '../style/global/global.scss';
import '../style/page/checkInStudentDisplayPageStyle.scss'
import NoSupport from '../component/NoSupport';
import Headbar100 from '../component/Headbar100';


import { firestore } from '../config/firebase';
import { QuerySnapshot, collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { RootState } from "../redux/store/store";
import StudentHistory from '../component/StudentHistory';
import { useSelector } from 'react-redux';

export default function CheckInStudentDisplayPage() {

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const navigate = useNavigate();

    const teacherSession = useSelector((state: RootState) => state.teacherSession.teacherSesion);


    const [subjectName, setSubjectName] = useState<string>('');
    const [time, setTime]  = useState<string>('');
    const [room, setRoom] = useState<string>('');
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth > 512);
        };
        handleResize(); // Call once to initialize
        findCollectionByPin(teacherSession);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const findCollectionByPin = async (pin:string) => {
        try {
            const sessionSnapshot: QuerySnapshot = await getDocs(query(collection(firestore, 'CheckInSession'), where('checkInSession_pin', '==', pin)));

            if (!sessionSnapshot.empty) {
                sessionSnapshot.forEach(doc => {
                    const data = doc.data();
                    setSubjectName(data.checkInSession_subject_name);
                    setTime(data.checkInSession_started_time);
                    setRoom(data.checkInSession_subject_room);
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

    const handBackButton = () => {
        navigate('/StudentCheckIn/CheckInDisplayPage');
    }

    return (
        <div className="main">
            {isSmallScreen ? (
                <NoSupport />
            ) : (
                <div className="checkInStudentDisplayPage">
                    <Headbar100 onClick={handBackButton} />
                    <h2 className="title">วิชา&nbsp;{subjectName}</h2>
                    <h2 className="description">ห้องเรียน&nbsp;{room}&nbsp;-&nbsp;{time}</h2>
                    <h2 className="nameListTitle">รายชื่อนักเรียนที่เช็คชื่อแล้ว</h2>
                    <div className="studentContainer">
                        <StudentHistory teacherSession={teacherSession} />
                    </div>
                </div>
            )}
        </div>
    );
}