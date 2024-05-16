import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';

function YearSelect({ selectedYear, onChange }) {
  // 년도 목록 생성 (예: 2000년부터 현재 년도까지)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, index) => 2020 + index).reverse();

  return (
    <FormControl>
      <InputLabel id="year-select-label">Year</InputLabel>

      <Select
        labelId="year-select-label"
        id="year-select"
        value={selectedYear}
        onChange={onChange}
      >
        {years.map(year => (
          <MenuItem key={year} value={year}>
            {year > 2020 ? { year } : "2020 이전"}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

YearSelect.propTypes = {
  selectedYear: PropTypes.number.isRequired, // selectedYear가 필수로 제공되어야 함을 지정
  onChange: PropTypes.func.isRequired, // onChange가 함수여야 함을 지정
};

export default YearSelect;
