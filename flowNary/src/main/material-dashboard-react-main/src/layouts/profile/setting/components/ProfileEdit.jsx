import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Grid, Card, CardContent, TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Header = styled(Box)({
  background: '#BA99D1',
  borderRadius: '8px 8px 0 0', // 상단만 라운드 처리
  color: 'white',  
  textAlign: 'center',
  marginBottom: '1rem',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // 그림자 효과 추가
});

function ProfileEdit({ profile, handleProfileChange, handleSubmit }) {
  const [formData, setFormData] = useState(profile);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    handleProfileChange({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <Card>
      <Header style={{height:'2.05rem'}}>        
        <Typography variant="subtitle1" sx={{ opacity: 0.825 }}>상세 정보</Typography>
      </Header>
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company (disabled)"
                name="company"
                value={formData.company}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={onChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email address"
                name="email"
                value={formData.email}
                onChange={onChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={onChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={onChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={onChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={15}>
              <TextField
                fullWidth
                label="상태 메세지"
                name="statusMessage"
                value={formData.statsMessage}
                onChange={onChange}
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">프로필 수정</Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}

ProfileEdit.propTypes = {
  profile: PropTypes.shape({
    company: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    postalCode: PropTypes.string,
    aboutMe: PropTypes.string,
  }).isRequired,
  handleProfileChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ProfileEdit;
