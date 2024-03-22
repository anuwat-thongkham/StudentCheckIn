
import { useState, useEffect } from 'react';

import OtpInput from 'react-otp-input';

import '../style/global/global.scss';
import '../style/page/pinCheckInPage.scss'
import NoSupport from '../component/NoSupport';
import Headbar100 from '../component/Headbar100';
import Button100 from '../component/Button100';
import { auth, firestore } from '../config/firebase';
import { QuerySnapshot, addDoc, collection, getDocs, query, where } from 'firebase/firestore';


import { setStudentSession } from '../redux/reducers/studentSessionReducer';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PinCheckInPage() {
    const dispatch = useDispatch();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [keyPin, setKeyPin] = useState('');
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth > 512);
        };
        handleResize(); // Call once to initialize
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleBackBttonn = () => {
        navigate(`/StudentCheckIn/StudentIndexPage`);
    }

    const findCollectionByPin = async (pin: string) => {
        const currentUserEmail = await auth.currentUser?.email as any;
        const fname = getFnameByEmail(currentUserEmail);
        const lname = getLnameByEmail(currentUserEmail);
        const stdId = getStdIdByEmail(currentUserEmail);

        const currentDate = new Date();
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const timeCurrent = hours + ':' + minutes;

        try {
            const sessionSnapshot: QuerySnapshot = await getDocs(query(collection(firestore, 'CheckInSession'), where('checkInSession_pin', '==', pin)));

            if (!sessionSnapshot.empty) {
                sessionSnapshot.forEach(async doc => {

                    setIsError(false);
                    setErrorMessage('');
                    const data = doc.data();
                    const currentTime = data.checkInSession_exit_time;
                    const subject = data.checkInSession_subject_name;
                    const subjectRoom = data.checkInSession_subject_room;

                    const isEnd = data.checkInSession_isEnd;
                    const currentDate = new Date();
                    const hours = currentDate.getHours().toString().padStart(2, '0');
                    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
                    let setedTime = currentTime.split(':');
                    let setedHour = Number(setedTime[0]);
                    let setedMinute = Number(setedTime[1]);
                    let currentHour = Number(hours);
                    let currentMinute = Number(minutes);

                    if (isEnd) {
                        setIsError(true);
                        setErrorMessage('หมดเวลาเช็คชื่อ');
                        return;
                    }
                    if (setedHour > currentHour) {
                        dispatch(setStudentSession(keyPin));
                        addNewHistory(keyPin, subject, subjectRoom, currentUserEmail, await fname, await lname, await stdId, timeCurrent);
                        navigate(`/StudentCheckIn/SumaryCheckInPage`);

                    } else if (setedHour == currentHour) {
                        if (setedMinute > currentMinute) {
                            dispatch(setStudentSession(keyPin));
                            addNewHistory(keyPin, subject, subjectRoom, currentUserEmail, await fname, await lname, await stdId, timeCurrent);
                            navigate(`/StudentCheckIn/SumaryCheckInPage`);
                        } else {
                            setIsError(true);
                            setErrorMessage('หมดเวลาเช็คชื่อ');
                        }
                    } else {
                        setIsError(true);
                        setErrorMessage('หมดเวลาเช็คชื่อ');
                    }

                    console.log(data); // Access data of each document in the snapshot
                });
            } else {
                setIsError(true);
                setErrorMessage('ไม่พบวิชานี้');
                console.log("No documents found for the provided PIN.");
            }
        } catch (error) {
            console.error("Error finding collection by PIN:", error);
            throw error; // Rethrow the error to handle it elsewhere if needed
        }
    };

    const getFnameByEmail = async (email: string): Promise<string> => {
        try {
            const sessionSnapshot: QuerySnapshot = await getDocs(query(collection(firestore, 'Student'), where('student_email', '==', email)));

            if (!sessionSnapshot.empty) {
                let fname: string = '';
                sessionSnapshot.forEach(doc => {
                    const data = doc.data();
                    fname = data.student_fname; // Access data of each document in the snapshot
                });
                return fname;
            } else {
                console.log("No documents found for the provided email.");
                return '';
            }
        } catch (error) {
            console.error("Error finding collection by email:", error);
            return '';
        }
    };
    const getLnameByEmail = async (email: string): Promise<string> => {
        try {
            const sessionSnapshot: QuerySnapshot = await getDocs(query(collection(firestore, 'Student'), where('student_email', '==', email)));

            if (!sessionSnapshot.empty) {
                let fname: string = '';
                sessionSnapshot.forEach(doc => {
                    const data = doc.data();
                    fname = data.student_lname; // Access data of each document in the snapshot
                });
                return fname;
            } else {
                console.log("No documents found for the provided email.");
                return '';
            }
        } catch (error) {
            console.error("Error finding collection by email:", error);
            return '';
        }
    }; const getStdIdByEmail = async (email: string): Promise<string> => {
        try {
            const sessionSnapshot: QuerySnapshot = await getDocs(query(collection(firestore, 'Student'), where('student_email', '==', email)));

            if (!sessionSnapshot.empty) {
                let fname: string = '';
                sessionSnapshot.forEach(doc => {
                    const data = doc.data();
                    fname = data.student_stdId; // Access data of each document in the snapshot
                });
                return fname;
            } else {
                console.log("No documents found for the provided email.");
                return '';
            }
        } catch (error) {
            console.error("Error finding collection by email:", error);
            return '';
        }
    };
    const addNewHistory = async (pin: string, subjectName: string, room: string, email: string, fname: string, lname: string, stdId: string, timeStamp: string) => {
        try {
            const data = { // Explicitly type data as an object with string keys and any values
                checkInHistory_pin: pin,
                checkInHistory_subject_name: subjectName,
                checkInHistory_subject_room: room,
                checkInHistory_email: email,
                checkInHistory_fname: fname,
                checkInHistory_lname: lname,
                checkInHistory_student_id: stdId,
                checkInHistory_timeStamp: timeStamp,
            };

            await addDoc(collection(firestore, 'CheckInHistory'), data);
            console.log(`CheckInHistory added to Firestore successfully.`);
        } catch (error) {
            console.error("Error finding collection by PIN:", error);
            throw error; // Rethrow the error to handle it elsewhere if needed
        }
    }

    const handleSubmitButton = () => {
        findCollectionByPin(keyPin);
    }
    return (
        <div className="main">
            {isSmallScreen ? (
                <NoSupport />
            ) : (
                <div className="pinCheckInPage">
                    <Headbar100 onClick={handleBackBttonn} />
                    <h2 className="title">ใส่รหัส<span>&nbsp;PIN&nbsp;</span>สำหรับเช็คชื่อ</h2>
                    <div className="pinContainer">
                        <OtpInput
                            containerStyle='pinFieldStack'
                            inputStyle='pinField'
                            value={keyPin}
                            onChange={setKeyPin}
                            numInputs={4}
                            renderSeparator={<span></span>}
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>
                    {isError && <p className="errorText">{errorMessage}</p>}
                    <div className="actionSection">
                        <Button100 onClick={handleSubmitButton}>เช็คชื่อ</Button100>
                    </div>
                </div>
            )}
        </div>
    );
}