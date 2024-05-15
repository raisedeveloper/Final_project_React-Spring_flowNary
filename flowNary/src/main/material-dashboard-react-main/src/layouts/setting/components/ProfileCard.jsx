import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, CardContent, Avatar, Typography, Grid, Box } from "@mui/material";
import { styled } from "@mui/system";

// 배경 스타일 설정
const Background = styled(Box)({
  background: "url('/images/flowLight.png')", // 배경 이미지 URL
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "150px",
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
});

function ProfileCard(props) {
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
    <Card sx={{ width: { xs: '100%', sm: 500, md: 600, lg: 700, xl: 820 }, borderRadius: "16px", boxShadow: 3, margin: 'auto' }}>
      <Background />
      <CardContent sx={{ textAlign: "center", mt: -8 }}>
        <Avatar
          alt="+"
          src={preview || `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${props.profile}`}
          sx={{ width: 100, height: 100, margin: "0 auto", cursor: 'pointer' }}
          onClick={handleImageEdit}
        />
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          hidden
          id="hidden-input"
        />
        <span>닉네임: {props.profile.nickname}</span><br />
        <span>상태메시지: {props.profile.statusMessage}</span>
        <Typography variant="h6"
          sx={{
            flexGrow: 1, fontWeight: 'bold',
            display: {
              xs: 'none',
              md: 'none',
              lg: 'flex'
            },
          }}>{props.nickname}</Typography>
        <br />
        <Button
          variant='contained'
          onClick={handleImageEdit}
          style={{
            marginRight: '2.5em',
            backgroundColor: 'rgb(54, 11, 92)',
            color: 'white'
          }}>사진수정 </Button>
        <Button
          variant='contained'
          onClick={handleImageDelete}
          style={{
            marginLeft: '2.5em',
            backgroundColor: 'rgb(99, 11, 92)',
            color: 'white'
          }}>사진삭제</Button>
      </CardContent>
    </Card>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    statusMessage: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    followers: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired,
    photos: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onChangePicture: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  handlePicture: PropTypes.func.isRequired,
};

export default ProfileCard;