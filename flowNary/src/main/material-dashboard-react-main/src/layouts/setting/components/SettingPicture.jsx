import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Box, Button, Typography, Avatar } from "@mui/material";

export default function SettingPicture(props) {
  const [preview, setPreview] = useState('');
  const [image, setImage] = useState('');

  const handleImageEdit = () => { 
    document.getElementById('hidden-input').click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    } else {
      setImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
        props.onChangePicture(file); // 파일 객체 대신 데이터 URL을 전달
      };
    }
  };
  
  const handleImageDelete = () => {
    setPreview('');
    props.onChangePicture(null); // 파일 삭제 시 null 전달
  };
  
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      backgroundColor:'#D8BFD8',
      borderRadius: '15px',
      padding: '0.75em 0.25em'
    }}>
      <Avatar
        alt="+"
        src={preview || `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${props.profile}`}
        sx={{ width: 80, height: 80, ml: 3, mr: 2, cursor: 'pointer' }}
        onClick={handleImageEdit}
      />
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        hidden
        id="hidden-input"
      />

      <Typography variant="h6"
        sx={{
          flexGrow: 1, fontWeight: 'bold',
          display: {
            xs: 'none',
            md: 'none',
            lg: 'flex'
          },
        }}>{props.nickname}</Typography>
      <Button
        variant='contained'
        onClick={handleImageEdit}
        style={{
          marginRight: '2.5em',
          backgroundColor: 'rgb(54, 11, 92)',
          color:'white'
        }}>사진수정 </Button>
      <Button
        variant='contained'
        onClick={handleImageDelete}
        style={{
          marginRight: '2.5em',
          backgroundColor: 'rgb(99, 11, 92)',
          color:'white'
        }}>사진삭제</Button>
    </Box >
  );
}


SettingPicture.propTypes = {
  profile: PropTypes.string.isRequired, // profile props가 문자열 형식이고 필수임을 검사
  nickname: PropTypes.string.isRequired, // nickname props가 문자열 형식이고 필수임을 검사
  onChangePicture: PropTypes.func.isRequired, // onChangePicture props가 함수 형식이고 필수임을 검사
};
