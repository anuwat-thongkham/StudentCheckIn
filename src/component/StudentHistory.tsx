import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import { firestore } from '../config/firebase'; // Import your Firestore instance
import '../style/global/global.scss';
import '../style/conponent/studentHistoryStyle.scss';
interface HistoryData {
  id: string;
  number: number;
  fname: string;
  lname: string;
  studentId: string;
  email: string;
  timeStamp: string;
}

const StudentHistory: React.FC<{ teacherSession: string }> = ({ teacherSession }) => {
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);

  useEffect(() => {
    const findCollectionByPin = async () => {
      try {
        const sessionSnapshot = await getDocs(
          query(collection(firestore, 'CheckInHistory'), where('checkInHistory_pin', '==', teacherSession))
        );
        if (!sessionSnapshot.empty) {
          const data: HistoryData[] = sessionSnapshot.docs.map((doc: QueryDocumentSnapshot, index: number) => {
            const data = doc.data();
            return {
              id: doc.id,
              number: index + 1,
              fname: data.checkInHistory_fname,
              lname: data.checkInHistory_lname,
              studentId: data.checkInHistory_student_id,
              email: data.checkInHistory_email,
              timeStamp: data.checkInHistory_timeStamp
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

    findCollectionByPin();
  }, [teacherSession]);

  return (
    <div>
      {historyData.map((rowData) => (
        <HistoryRow
              key={rowData.id}
              number={rowData.number}
              fname={rowData.fname}
              lname={rowData.lname}
              studentId={rowData.studentId}
              email={rowData.email}
              timeStamp={rowData.timeStamp} id={''}        />
      ))}
    </div>
  );
};

const HistoryRow: React.FC<HistoryData> = ({id, number, fname, lname, studentId, email, timeStamp }) => (
  <div className='studentHistory'>
    <p className='name'>{number}.&nbsp;{fname}&nbsp;{lname}</p>
    <p className='idAndEmail'>{studentId}&nbsp;{email}</p>
    <p className='time'>เวลาที่เช็คชื่อ:&nbsp;{timeStamp}&nbsp;น.</p>
    <p className="id">{id}</p>
  </div>
);

export default StudentHistory;
