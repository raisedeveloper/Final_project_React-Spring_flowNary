import { useEffect, useState } from 'react';
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

import { genTime } from './util';
import useSched from './useSched';

export default function SchedDetailDialog({ sched }) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [newSched, setNewSched] = useState({ });
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const timeList = genTime();

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { 
    setOpen(false); 
    setNewSched({ title: sched.title, sdate: sched.sdate, place: sched.place, memo: sched.memo });
    setChecked(sched.isImportant);
  };
  const handleChange = e => {
    setNewSched(newSched => ({...newSched, [e.target.name]: e.target.value}));
  };
  const handleStartTime = e => { setSelectedStartTime(e.target.value); };
  const handleEndTime = e => { setSelectedEndTime(e.target.value); };
  const { updateRecord, deleteRecord } = useSched();
  const handleUpdate = () => {
    const newSched2 = {...newSched, startTime:selectedStartTime, endTime: selectedEndTime,
      id: sched.id, email: sched.email, isImportant: checked}
    updateRecord.mutate(newSched2);
    handleClose();
  };
  const handleDelete = () => {
    deleteRecord.mutate(sched.id);
    setOpen(false);
  }

  useEffect(() => {
    setChecked(sched.isImportant);
    setNewSched({ title: sched.title, sdate: sched.sdate, place: sched.place, memo: sched.memo });
    setSelectedStartTime(sched.startTime);
    setSelectedEndTime(sched.endTime);
  }, []);

  return (
    <>
      <Link href='#'
        sx={{ color: 'inherit', textDecoration: 'none',
          '&:hover': { cursor: 'pointer', textDecoration: 'underline', },
        }}
        onClick={handleClickOpen}>
        <Typography sx={{ fontWeight: sched.isImportant ? 'bold' : 'normal' }}>
          {sched.startTime} {sched.title}
        </Typography>
      </Link>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>상세일정 조회/수정/삭제</Typography>
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
                  defaultValue={sched.sdate} onChange={handleChange}
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
          <Button onClick={handleUpdate} variant="contained">수정</Button>
          <Button onClick={handleDelete} variant="contained" color='error'>삭제</Button>
          <Button onClick={handleClose} variant="outlined">확인</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

SchedDetailDialog.propTypes = {
  sched: PropTypes.object.isRequired,
};