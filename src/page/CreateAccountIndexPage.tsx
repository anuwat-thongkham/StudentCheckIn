import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { firestore, signInWithGooglePopup } from '../config/firebase';
import '../style/global/global.scss';
import '../style/page/createAccountIndexPageStyle.scss'
import NoSupport from '../component/NoSupport';
import Button100 from '../component/Button100';
import Headbar100 from '../component/Headbar100';

type UserType = 'Student' | 'Teacher'; // Define type for user types

export default function CreateAccountIndexPage() {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth > 512);
        };
        handleResize(); // Call once to initialize
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleBackButton = () => {
        navigate('/');
    };

    const signIn = async (userType: UserType) => { // Explicitly type userType
        try {
            const result = await signInWithGooglePopup();
            const user = result.user;
            const { email, uid } = user;

            const findCollection = await findCollectionByEmail(email);

            if (findCollection == 'Student') {
                navigate(`/StudentCheckIn/StudentIndexPage`);
            } else if (findCollection == 'Teacher') {
                navigate(`/StudentCheckIn/TeacherIndexPage`);
            } else {
                await addUserToFirestore(userType, email, uid);
                navigate(`/StudentCheckIn/CreateAccount${userType}Page`);
            }

        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };
    const findCollectionByEmail = async (email: string | null) => {
        try {
            const studentQuerySnapshot = await getDocs(query(collection(firestore, 'Student'), where('student_email', '==', email)));
            if (!studentQuerySnapshot.empty) {
                return 'Student';
            }

            const teacherQuerySnapshot = await getDocs(query(collection(firestore, 'Teacher'), where('teacher_email', '==', email)));
            if (!teacherQuerySnapshot.empty) {
                return 'Teacher';
            }
            return null;
        } catch (error) {
            console.error("Error finding collection by email:", error);
            return null;
        }
    };

    const addUserToFirestore = async (userType: UserType, email: string | null, uid: string) => { // Explicitly type userType, email, and uid
        try {
            const data: { [key: string]: any } = { // Explicitly type data as an object with string keys and any values
                [`${userType.toLowerCase()}_email`]: email, // Lowercase userType
                [`${userType.toLowerCase()}_uid`]: uid, // Lowercase userType
                [`${userType.toLowerCase()}_fname`]: '',
                [`${userType.toLowerCase()}_lname`]: '',
            };
            if (userType === 'Student') {
                data.student_stdId = ''; // Only add student_stdId for students
            }
            await addDoc(collection(firestore, userType), data);
            console.log(`${userType} added to Firestore successfully.`);
        } catch (error) {
            console.error(`Error adding ${userType} to Firestore:`, error);
        }
    };

    return (
        <div className="main">
            {isSmallScreen ? (
                <NoSupport />
            ) : (
                <div className="createAccountIndexPage">
                    <Headbar100 onClick={handleBackButton} />
                    <h2 className="title">เลือกสถานะ</h2>
                    <div className="button1Container">
                        <Button100 onClick={() => signIn('Student')}>นักศึกษา</Button100>
                    </div>
                    <div className="button2Container">
                        <Button100 onClick={() => signIn('Teacher')}>อาจารย์</Button100>
                    </div>
                </div>
            )}
        </div>
    );
}
