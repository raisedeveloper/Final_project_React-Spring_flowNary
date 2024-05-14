// 기본
import React, { useEffect, useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import PropTypes from 'prop-types';

// css 연결
import './setting.css';

// alert 창
import Swal from "sweetalert2";

// 생년월일
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ko';

export default function SettingBirth(props) {
  const [birth, setBirth] = useState(props.birth);

  useEffect(() => {
    const interval = setInterval(() => {
      if (props.birth !== '') {
        setBirth(props.birth);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [props.birth]);

  const handleBirth = (e) => {
    setBirth(dayjs(e));
    props.onBirthChange(e);
    props.changeCheckingBirth(0);
  };

  const checkBirth = () => {
    // 현재 날짜를 가져오기
    const now = new Date();
    const currentYear = now.getFullYear(); // 현재 연도 가져오기
    const currentMonth = now.getMonth() + 1; // 현재 월 가져오기
    const currentDay = now.getDate(); // 현재 일 가져오기

    if (!birth) {
      Swal.fire({
        icon: "warning",
        text: "생일을 입력하세요",
      });
      return;
    }

    // 사용자가 입력한 생년월일을 연도, 월, 일로 나누기
    const userYear = parseInt(birth.slice(0, 4));
    const userMonth = parseInt(birth.slice(5, 7));
    const userDay = parseInt(birth.slice(8, 10));

    // 현재 날짜와 사용자가 입력한 생년월일의 차이 계산
    let yearDiff = currentYear - userYear;

    // 만약 현재 날짜의 월과 사용자의 생년월일의 월을 비교하여 현재 날짜가 사용자의 생년월일보다 작은 경우, 1년을 감소
    if (currentMonth < userMonth || (currentMonth === userMonth && currentDay < userDay)) {
      yearDiff--;
    }
    if (userYear > currentYear) {
      Swal.fire({
        icon: "warning",
        text: "현재 날짜 이상은 입력 불가능합니다.",
      });
      props.changeCheckingBirth(0);
      return;
    } else if (yearDiff < 7) {
      Swal.fire({
        icon: "warning",
        text: "7세 이하는 등록 불가능합니다.",
      });
      props.changeCheckingBirth(0);
      return;
    } else if (userYear <= 1900) {
      Swal.fire({
        icon: "warning",
        text: "1900년 이상만 가능합니다.",
      });
      props.changeCheckingBirth(0);
      return;
    } else {
      Swal.fire({
        icon: "success",
        text: "적정 연령입니다.",
      });
      props.changeCheckingBirth(1);
      return;
    }
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Grid container style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Grid item xs={8} md={10} lg={10.8}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker sx={{ mt: 2, width: '100%' }} label="생년월일 *" onChange={handleBirth} slots={{ textField: TextField }}
              value={dayjs(birth) || ''} formatDensity="spacious"  format="YYYY / MM / DD" />
          </DemoContainer>
        </Grid>
        <Grid item xs={4} md={2} lg={1.2}>
          <Button onClick={checkBirth} variant="contained"
            style={{ color: 'white' }}
            sx={{
              backgroundColor: 'rgb(54, 11, 92)',
              margin: '20px 0px 0px 5px',
              padding: 0,
              '&:hover': { backgroundColor: 'rgb(54, 30, 150)' } 
            }}>확인</Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );

}

SettingBirth.propTypes = {
  birth: PropTypes.string.isRequired, // birth props가 문자열 형식이고 필수임을 검사
  onBirthChange: PropTypes.func.isRequired, // onBirthChange props가 함수 형식이고 필수임을 검사
  changeCheckingBirth: PropTypes.func.isRequired, // changeCheckingBirth props가 함수 형식이고 필수임을 검사
};
