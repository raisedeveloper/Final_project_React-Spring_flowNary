// 기본
import React, { useEffect, useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import axios from "axios";
import PropTypes from 'prop-types';

// css 연결
import './setting.css';

// alert 창
import Swal from "sweetalert2";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip arrow placement="top" {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
}));

export default function SettingTel(props) {
  const [tel, setTel] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (tel === '') {
        setTel(props.tel);
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [props.tel, tel]);

  useEffect(() => {
    if (tel) {
      let telValue = tel.replace(/[^0-9]/g, '').toString(); // 숫자 이외의 문자 제거
      if (telValue.length > 11) { telValue = telValue.slice(0, 11); }
      if (telValue.length === 11) {
        telValue = telValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      } else if (telValue.length === 13) {
        telValue = telValue.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      }
      setTel(telValue);
      props.onTelChange(telValue)
    }
  }, [props, tel]);

  const checkTel = () => {
    axios.get('http://localhost:8090/user/tel', {
      params: {
        email: props.email
      }
    })
      .then(response => {
        const userList = response.data; // 응답 데이터 전체를 가져옵니다.
        if (!userList) {
          console.error('User list is undefined or null');
          return;
        }
        const tels = userList.map(user => user.tel);
        if (tels.includes(tel)) {
          Swal.fire({
            icon: "warning",
            text: "전화번호가 중복됩니다.",
          });
          props.changeCheckingTel(0);
          return;
        } else {
          Swal.fire({
            icon: "success",
            text: "전화번호 사용 가능합니다!",
          });
          props.changeCheckingTel(1);
          return;
        }
      }).catch(error => {
        console.error('Error fetching tels:', error);
      });
  }

  const handleTel = (e) => {
    setTel(e.target.value); props.changeCheckingTel(0);;
  };

  return (
    <>
      <Grid container style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Grid item xs={8} md={10} lg={10.8}>
          <LightTooltip title="' - ' 없이 숫자만 입력하세요.">
            <TextField
              fullWidth
              required
              placeholder="전화번호 *"
              variant="standard"
              name="tel"
              value={tel || ''}
              onChange={handleTel}
              sx={{ mt: 2, width: '100%' }}
            />
          </LightTooltip>
        </Grid>
        <Grid item xs={4} md={2} lg={1.2}>
          <Button onClick={checkTel} variant="contained" style={{ color: 'white' }}
            sx={{
              backgroundColor: 'rgb(54, 11, 92)',
              margin: '20px 0px 0px 5px',
              padding: 0,
              '&:hover': { backgroundColor: 'rgb(54, 30, 150)' }
            }} > 확인</Button>
        </Grid>
      </Grid >
    </>
  );

}



SettingTel.propTypes = {
  tel: PropTypes.string.isRequired, // tel props가 문자열 형식이고 필수임을 검사
  email: PropTypes.string.isRequired, // email props가 문자열 형식이고 필수임을 검사
  changeCheckingTel: PropTypes.func.isRequired, // changeCheckingTel props가 함수 형식이고 필수임을 검사
  onTelChange: PropTypes.func.isRequired, // onTelChange props가 함수 형식이고 필수임을 검사
};
