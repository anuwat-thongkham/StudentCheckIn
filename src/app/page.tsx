"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../style/global/global.scss';
import '../style/page/homePageStyle.scss'
import NoSupport from '@/component/noSupport';
import Button100 from '@/component/button100';

export default function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth > 512);
    };
    handleResize(); // Call once to initialize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            <Button100>เข้าสู่ระบบ</Button100>
          </div>
        </div>
      )}
    </div>
  );
}
