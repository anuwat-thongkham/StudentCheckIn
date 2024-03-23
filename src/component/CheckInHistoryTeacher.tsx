import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import { auth, firestore } from '../config/firebase'; // Import your Firestore instance
import '../style/global/global.scss';
import '../style/conponent/checkInHistoryTeacherStyle.scss';
interface HistoryData {
    id: string;
    subjectNeame: string;
    time: string;
}

const CheckInHistoryTeacher: React.FC<{ teacherSession: string }> = ({ teacherSession }) => {
    const [historyData, setHistoryData] = useState<HistoryData[]>([]);
    const [teacherEmail, setTeacherEmail] = useState<string>('') as any;

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
        const findCollectionByPin = async () => {
            try {
                const sessionSnapshot = await getDocs(
                    query(collection(firestore, 'CheckInSession'), where('checkInSession_teacher_email', '==', teacherEmail))
                );
                if (!sessionSnapshot.empty) {
                    const data: HistoryData[] = sessionSnapshot.docs.map((doc: QueryDocumentSnapshot, index: number) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            number: index + 1,
                            subjectNeame: data.checkInSession_subject_name,
                            time: data.checkInSession_started_time,
                        };
                    });
                    setHistoryData(data);
                } else {
                    setHistoryData([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        unsubscribe();
        findCollectionByPin();
    }, [teacherSession]);

    return (
        <div>
            {historyData.map((rowData) => (
                <HistoryRow
                    key={rowData.id}
                    subjectNeame={rowData.subjectNeame}
                    time={rowData.time}
                    id={''} />
            ))}
        </div>
    );
};

const HistoryRow: React.FC<HistoryData> = ({ id, subjectNeame, time }) => (
    <button className='checkInHistoryTeacher'>
        <div className="id">{id}</div>
        วิชา&nbsp;{subjectNeame}&nbsp;-&nbsp;{time}
    </button>
);

export default CheckInHistoryTeacher;
