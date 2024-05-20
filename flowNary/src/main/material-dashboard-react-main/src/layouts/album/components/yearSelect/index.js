import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import MDTypography from 'components/MDTypography';

function YearSelect({ selectedYear, onChange }) {
  // 년도 목록 생성 (예: 2000년부터 현재 년도까지)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, index) => 2020 + index).reverse();

  return (
    <>
      <MDTypography mt={5} id="year-select-label">  보고싶은 연도를 선택하세요.     </MDTypography>
      <FormControl>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={selectedYear}
          onChange={onChange}
          sx={{ width: "10vw", height: "5%", fontSize: 'large' }}
        >
          {years.map(year => (
            <MenuItem key={year} value={year}>
              {year > 2020 ? year : "2020 이전"} 년
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

YearSelect.propTypes = {
  selectedYear: PropTypes.number.isRequired, // selectedYear가 필수로 제공되어야 함을 지정
  onChange: PropTypes.func.isRequired, // onChange가 함수여야 함을 지정
};

export default YearSelect;
