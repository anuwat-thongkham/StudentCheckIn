import { useState, useEffect } from 'react';

import '../style/global/global.scss';
import '../style/page/createAccountTeacherPageStyle.scss';

import NoSupport from '../component/NoSupport';
import Button100 from '../component/Button100';
import Headbar100 from '../component/Headbar100';
import InputText100 from '../component/InputText100';

import { auth, firestore } from '../config/firebase';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function CreateAccountTeacherPage(): JSX.Element {
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth > 512);
        };
        handleResize(); // Call once to initialize
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [fname, setFname] = useState<string>('');
    const [isFnameError, setIsFnameError] = useState<boolean>(false);
    const [fnameErrorMessage, setFnameErrorMessage] = useState<string>('');

    const [lname, setLname] = useState<string>('');
    const [isLnameError, setIsLnameError] = useState<boolean>(false);
    const [lnameErrorMessage, setLnameErrorMessage] = useState<string>('');

    const [stdId, setStdId] = useState<string>('');
    const [isStdIdError, setIsStdIdError] = useState<boolean>(false);
    const [stdErrorMessage, setStdErrorMessage] = useState<string>('');

    const onFnameChange = (text: string) => {
        setFname(text);
        if (isFnameError) {
            setIsFnameError(false);
        }
    };

    const onLnameChange = (text: string) => {
        setLname(text);
        if (isLnameError) {
            setIsLnameError(false);
        }
    };

    const onStdChange = (text: string) => {
        setStdId(text);
        if (isStdIdError) {
            setIsStdIdError(false);
        }
    };

    const validateFname = (): boolean => {
        const regex = /^[a-zA-Zก-๏\s]+$/;
        if (!regex.test(fname)) {
            setIsFnameError(true);
            setFnameErrorMessage('โปรดป้อนชื่อให้ถูกต้อง');
            return true;
        }
        return false;
    };

    const validateLname = (): boolean => {
        const regex = /^[a-zA-Zก-๏\s]+$/;
        if (!regex.test(lname)) {
            setIsLnameError(true);
            setLnameErrorMessage('โปรดป้อนนามสกุลให้ถูกต้อง');
            return true;
        }
        return false;
    };

    const validateStdId = (): boolean => {
        if (!/^\d+-\d$/.test(stdId)) {
            setIsStdIdError(true);
            setStdErrorMessage('โปรดใส่รหัสนักศึกษาให้ถูกต้อง มีขีด เช่น 643020060-0');
            return true;
        }
        return false;
    };

    const onCreateButton = () => {
        if (!validateFname() && !validateLname() && !validateStdId()) {
            const currentUserUid = auth.currentUser?.uid;
            const updateData = {
                student_fname: fname,
                student_lname: lname,
                student_stdId: stdId
            };
            updateStudentByUid(currentUserUid, updateData);
            navigate(`/StudentCheckIn/StudentIndexPage`);
        }
    };

    async function updateStudentByUid(studentUid: string | undefined, updateData: { student_fname: string; student_lname: string; student_stdId: string; }) {
        const studentCollection = collection(firestore, "Student");
        try {
            const getDate = query(studentCollection, where("student_uid", "==", studentUid));
            const querySnapshot = await getDocs(getDate);
            // Check if any documents were found
            if (querySnapshot.size === 0) {
                console.error("No student found with the provided student_uid");
                return; // Or throw an error if desired
            }
            // Get the document reference from the first (and hopefully only) document
            const docRef = querySnapshot.docs[0].ref;

            // Update the document with the provided update data
            await updateDoc(docRef, updateData);
            console.log("Student document updated successfully!");
        } catch (error) {
            console.error("Error updating student document:", error);
        }
    }

    const handleBackButton = () => {
        navigate('/');
    };

    return (
        <div className="main">
            {isSmallScreen ? (
                <NoSupport />
            ) : (
                <div className="createAccountStudentPage">
                    <Headbar100  onClick={handleBackButton}/>
                    <h2 className="title">สร้างบัญชี</h2>
                    <div className="input1Container">
                        <InputText100 title={'ชื่อ'} onTextChange={onFnameChange} isInputError={isFnameError} errorText={fnameErrorMessage} />
                    </div>
                    <div className="input2Container">
                        <InputText100 title={'นามสกุล'} onTextChange={onLnameChange} isInputError={isLnameError} errorText={lnameErrorMessage} />
                    </div>
                    <div className="input3Container">
                        <InputText100 title={'รหัสนักศึกษา'} onTextChange={onStdChange} isInputError={isStdIdError} errorText={stdErrorMessage} />
                    </div>
                    <div className="actionSection">
                        <Button100 onClick={onCreateButton}>สร้างบัญชี</Button100>
                    </div>
                </div>
            )}
        </div>
    );
}