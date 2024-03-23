
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, QuerySnapshot, updateDoc } from "firebase/firestore";
import { firestore } from '../config/firebase';
import '../style/global/global.scss';
import '../style/page/checkInDisplayPage.scss'
import NoSupport from '../component/NoSupport';
import Button200 from '../component/Button200';
import Button300 from '../component/Button300';
import Headbar100 from '../component/Headbar100';


import { setTeacherSession } from '../redux/reducers/teacherSessionReducer';
import { RootState } from "../redux/store/store";
import { useDispatch, useSelector } from "react-redux";


export default function CheckInDisplayPage() {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const navigate = useNavigate();

    const teacherSession = useSelector((state: RootState) => state.teacherSession.teacherSesion);
    const dispatch = useDispatch();
    const [pin] = useState<string>(teacherSession);
    const [subjectNeame, setSubjectName] = useState<string>('');
    const [exitHour, setExitHour] = useState<string>('');
    const [exitMinute, setExitMinute] = useState<string>('');

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth > 512);
        };
        findCollectionByPin();
        handleResize(); // Call once to initialize
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleEndButton = async () => {
        const sessionCollection = collection(firestore, "CheckInSession");
        try {
            const getDate = query(sessionCollection, where("checkInSession_pin", "==", pin));
            const querySnapshot = await getDocs(getDate);

            if (querySnapshot.size === 0) {
                console.error("No CheckInSession found with the provided pin");
                return; // Or throw an error if desired
            }
            const updateData = {
                checkInSession_isEnd: true,
            };
            // Get the document reference from the first (and hopefully only) document
            const docRef = querySnapshot.docs[0].ref;

            // Update the document with the provided update data
            await updateDoc(docRef, updateData);
            console.log("CheckInSession document updated successfully!");
            dispatch(setTeacherSession(''));
            navigate('/StudentCheckIn/TeacherIndexPage');

        } catch (error) {
            console.error("Error updating CheckInSession document:", error);
        }
    };

    const handleBackButton = () => {
        navigate('/StudentCheckIn/TeacherIndexPage');
    }

    const findCollectionByPin = async () => {
        try {
            const sessionSnapshot: QuerySnapshot = await getDocs(query(collection(firestore, 'CheckInSession'), where('checkInSession_pin', '==', pin)));

            if (!sessionSnapshot.empty) {
                sessionSnapshot.forEach(doc => {
                    const data = doc.data();
                    setSubjectName(data.checkInSession_subject_name);
                    const exittTime = data.checkInSession_exit_time;
                    const exitFinal = exittTime.split(':')
                    setExitHour(exitFinal[0]);
                    setExitMinute(exitFinal[1]);
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

    const handleDisplayButton =()=>{
        navigate('/StudentCheckIn/CheckInStudentDisplayPage');
    }

    return (
        <div className="main">
            {isSmallScreen ? (
                <NoSupport />
            ) : (
                <div className="checkInDisplayPage">
                    <Headbar100 onClick={handleBackButton} />
                    <h2 className="title">การเช็คชื่อวิชา {subjectNeame}</h2>
                    <p className="pin">{pin}</p>
                    <h2 className="existTimeTitle">สิ้นสุดการเช็คชื่อในเวลา</h2>
                    <p className="existTime">{exitHour}&nbsp;<span>นาฬิกา</span>&nbsp;{exitMinute}&nbsp;<span>นาที</span></p>
                    <div className="actionSection">
                        <Button200 onClick={handleDisplayButton}>รายชื่อนักศึกษาที่เช็คชื่อแล้ว</Button200>
                        <Button300 onClick={handleEndButton}>สิ้นสุดการเช็คชื่อ</Button300>
                    </div>
                </div>
            )}
        </div>
    );
}