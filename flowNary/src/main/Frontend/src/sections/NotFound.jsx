import React from "react";
import { useNavigate } from "react-router-dom";
import SnsBar from './common/aside&bar/SnsBar';
import { Button } from "@mui/material";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ height: '100vh' }}>
      <SnsBar />
      <img src="/img/NotFound.png" alt="error" style={{ width: '100vw', height: '90vh', zIndex: '1' }} />
      <Button
        onClick={() => {
          navigate('/');
        }}
        variant="contained" 
        style={{
          fontSize: 'x-large',
          position: 'absolute',
          bottom: '80%',
          left: '12%',
          width: '20%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2, // 버튼의 z-index를 설정하여 이미지 위에 배치합니다.
          backgroundColor:'rgb(38, 11, 73)'
        }}
      >홈으로</Button>
    </div>
  )

}