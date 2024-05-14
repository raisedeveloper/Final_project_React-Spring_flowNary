import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Avatar, Typography, Grid, Box } from "@mui/material";
import { styled } from "@mui/system";

// 배경 스타일 설정
const Background = styled(Box)({
  background: "url('https://via.placeholder.com/400x200')", // 배경 이미지 URL
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "150px",
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
});

function ProfileCard({ profile }) {
  return (
    <Card sx={{ width: { xs: '100%', sm: 500, md: 600, lg: 700, xl: 820 }, borderRadius: "16px", boxShadow: 3, margin: 'auto' }}>
      <Background />
      <CardContent sx={{ textAlign: "center", mt: -8 }}>
        <Avatar
          alt={profile.name}
          src={profile.image}
          sx={{ width: 100, height: 100, margin: "0 auto", border: "4px solid white" }}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {profile.name} <span style={{ color: "gray" }}>{profile.age}</span>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {profile.location}
        </Typography>

        {/* 팔로워 기타 등등 */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={4}>
            <Typography variant="h6">{profile.followers}</Typography>
            <Typography variant="body2" color="textSecondary">
              팔로워
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">{profile.likes}</Typography>
            <Typography variant="body2" color="textSecondary">
              좋아요
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">{profile.photos}</Typography>
            <Typography variant="body2" color="textSecondary">
              게시글
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    followers: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired,
    photos: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileCard;
