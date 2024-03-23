
import { useState, useEffect } from 'react';
import '../style/global/global.scss';
import '../style/page/createCheckInPageStyle.scss';
import NoSupport from '../component/NoSupport';
import Button100 from '../component/Button100';
import Headbar100 from '../component/Headbar100';
import InputText100 from '../component/InputText100';
import InputTime100 from '../component/InputTime100';


import { auth, firestore } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import GeneratePin from '../helper/generatePin';
import { setTeacherSession } from '../redux/reducers/teacherSessionReducer';
import { useDispatch } from "react-redux";
export default function CreateCheckInPage() {

    const dispatch = useDispatch();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const navigate = useNavigate();

    const [teacherEmail, setTeacherEmail] = useState<string>('') as any;

    const [subjectNeame, setSubjectName] = useState<string>('');
    const [isSubjectNameError, setIsSubjectNameError] = useState<boolean>(false);
    const [subjectNameErrorMassage] = useState<string>('');



    const [room, setRoom] = useState<string>('');
    const [isRoomError, setIsRoomError] = useState<boolean>(false);
    const [roomErrorMassage] = useState<string>('');

    const [time, setTime] = useState<string>('');
    const [isTimeError, setIsTimeError] = useState<boolean>(false);
    const [timeErrorMassage, setTimeErrorMassage] = useState<string>('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // Get the current user's email
                const currentUserEmail = user.email;
                setTeacherEmail(currentUserEmail);

            } else {
                setTeacherEmail('No Sign in');
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

    const onSubjectNameChange = (text: string) => {
        setSubjectName(text);
        if (isSubjectNameError) {
            setIsSubjectNameError(false);
        }
    };

    const onRoomChange = (text: string) => {
        setRoom(text);
        if (isRoomError) {
            setIsRoomError(false);
        }
    }

    const onTimeChange = (text: string) => {
        setTime(text);
        if (isTimeError) {
            setIsTimeError(false);
        }
    }
    const handleBackButton = () => {
        navigate('/StudentCheckIn/TeacherIndexPage');
    }


    const validateTime = (): boolean => {
        const currentDate = new Date();
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        let setedTime = time.split(':');
        let setedHour = Number(setedTime[0]);
        let setedMinute = Number(setedTime[1]);


        let currentHour = Number(hours);
        let currentMinute = Number(minutes);

        if (setedHour > currentHour) {
            return true;
        } else if (setedHour == currentHour) {
            if (setedMinute > currentMinute) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    const onCreateButton = async () => {
        const currentTime = new Date().toLocaleString();;
        if (!validateTime()) {
            setIsTimeError(true);
            setTimeErrorMassage('ตั้งเวลาต่ำเกินไป');
        } else {
            const pin = GeneratePin(4);
            try {
                const checkInSession = {
                    checkInSession_pin: pin,
                    checkInSession_teacher_email: teacherEmail,
                    checkInSession_subject_name: subjectNeame,
                    checkInSession_subject_room: room,
                    checkInSession_exit_time: time,
                    checkInSession_isEnd: false,
                    checkInSession_started_time:currentTime,
                    checkInSession_student_data:[],
                }
                await addDoc(collection(firestore, 'CheckInSession'), checkInSession)
                console.log(`CheckInSession added to Firestore successfully.`);
                dispatch(setTeacherSession(pin));
                navigate('/StudentCheckIn/CheckInDisplayPage');
            } catch (error) {
                console.error(`Error adding CheckInSession to Firestore:`, error);
            }
        }
    }

    return (
        <div className="main">
            {isSmallScreen ? (
                <NoSupport />
            ) : (
                <div className="createCheckInPage">
                    <Headbar100 onClick={handleBackButton} />
                    <h2 className="title">สร้างการเช็คชื่อ</h2>
                    <div className="input1Container">
                        <InputText100 title={'ชื่อวิชา'} isInputError={isSubjectNameError} errorText={subjectNameErrorMassage} onTextChange={onSubjectNameChange} />
                    </div>
                    <div className="input2Container">
                        <InputText100 title={'ห้องเรียน'} isInputError={isRoomError} errorText={roomErrorMassage} onTextChange={onRoomChange} />
                    </div>
                    <div className="input3Container">
                        <InputTime100 title={'เวลาสิ้นสุด ( นาฬิกา:นาที )'} isInputError={isTimeError} errorText={timeErrorMassage} onTimeChange={onTimeChange} />
                    </div>
                    <div className="actionSection">
                        <Button100 onClick={onCreateButton}>เริ่มการเช็คชื่อ</Button100>
                    </div>
                </div>
            )}
        </div>
    );
}

