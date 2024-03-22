
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/global/global.scss';
import '../style/page/homePageStyle.scss'
import NoSupport from '../component/NoSupport';
import Button100 from '../component/Button100';

export default function HomePage() {
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


  const handleStartButton = () => {
    navigate('/StudentCheckIn/CreateAccountIndexPage');
  };

  return (
    <div className="main">
      {isSmallScreen ? (
        <NoSupport />
      ) : (
        <div className="homePage">
          <div className="heroSection">
            <h1 className="header">
              ระบบเช็คชื่อ<br />
              นักศึกษา
            </h1>
            <p className="schoolName">College of Computing</p>
          </div>
          <div className="actionSection">
            <Button100 onClick={handleStartButton} >เริ่มต้น</Button100>
          </div>
        </div>
      )}
    </div>
  );
}