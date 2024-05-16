import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { genTime, nearTime } from './util';
import useSched from './useSched';

export default function SchedInsertDialog({ ymd, day, color, isOtherMonth }) {
  const { startTime, endTime } = nearTime();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [sched, setSched] = useState({ title: '', sdate: ymd, place: '', memo: '' });
  const [selectedStartTime, setSelectedStartTime] = useState(startTime);
  const [selectedEndTime, setSelectedEndTime] = useState(endTime);
  const timeList = genTime();

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { 
    setOpen(false); 
    setSched({ title: '', sdate: ymd, startTime, endTime, place: '', memo: '' });
    setChecked(false);
  };
  const handleChange = e => {
    setSched({...sched, [e.target.name]: e.target.value});
  };
  const handleStartTime = e => { setSelectedStartTime(e.target.value); };
  const handleEndTime = e => { setSelectedEndTime(e.target.value); };
  const { insertRecord } = useSched();
  const handleSubmit = () => {
    const newSched = {...sched, startTime:selectedStartTime, endTime: selectedEndTime,
      email: sessionStorage.getItem('sessionEmail'), isImportant: checked}
    insertRecord.mutate(newSched);
    // console.log(newSched);
    handleClose();
  };

  return (
    <>
      <Link href='#'
        sx={{ color: 'inherit', textDecoration: 'none',
          '&:hover': { cursor: 'pointer', textDecoration: 'underline', },
        }}
        onClick={handleClickOpen}>
        <Typography sx={{ fontWeight: 'bold', opacity: isOtherMonth ? 0.5 : 1 }} 
          color={color}>
          {day}
        </Typography>
      </Link>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>일정 등록</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={1} sx={{ width: '40ch' }} alignItems="center">
            <Grid container alignItems='center'>
              <Grid item xs={3}>
                <FormGroup>
                  <FormControlLabel label="중요"
                    control={
                      <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
                    }  
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={9}>
                <TextField autoFocus required margin="dense" id="title"
                  name="title" label="일정명" type="text" fullWidth
                  defaultValue={sched.title} onChange={handleChange}
                />
              </Grid> 
            </Grid>
            <Grid container alignItems='center' spacing={1}>
              <Grid item xs={6}>
                <TextField required margin="dense" id="sdate"
                  name="sdate" label="날짜" type="text" fullWidth
                  value={sched.sdate} onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="startTime">시작시간</InputLabel>
                  <Select required margin="dense" name='startTime' label="시작시간" id='startTime'
                    value={selectedStartTime} onChange={handleStartTime}>
                    {timeList.map((item) => 
                      <MenuItem value={item} key={'s'+item}>
                        {item}
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid> 
            </Grid>
            <Grid container alignItems='center' spacing={1}>
              <Grid item xs={6}>
                <TextField required margin="dense"
                  type="text" fullWidth disabled
                  value={sched.sdate} onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="endTime">종료시간</InputLabel>
                  <Select required margin="dense" name='endTime' label="종료시간" id='endTime'
                    value={selectedEndTime} onChange={handleEndTime}>
                    {timeList.map((item) => 
                      <MenuItem value={item} key={'e'+item}>
                        {item}
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid> 
            </Grid>
            <TextField required margin="dense" id="place"
              name="place" label="장소" type="text" fullWidth
              defaultValue={sched.place} onChange={handleChange}
            />
            <TextField margin="dense" id="memo"
              name="memo" label="메모" type="text" fullWidth
              defaultValue={sched.memo} onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained">제출</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

SchedInsertDialog.propTypes = {
  ymd: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isOtherMonth: PropTypes.bool.isRequired,
};