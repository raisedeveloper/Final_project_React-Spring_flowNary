import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import useAnniv from './useAnniv';

export default function AnnivDetailDialog({ anniv, index, middot }) {
  const { adate, aname, email, id, isHoliday } = anniv;
  const sessionEmail = sessionStorage.getItem('sessionEmail');

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(isHoliday);
  const [newAnniv, setNewAnniv] = useState({ id, adate, aname, email });
  const { updateRecord, deleteRecord } = useAnniv();

  const handleClickOpen = () => { 
    if (sessionEmail === email)
      setOpen(true); 
  };
  const handleClose = () => { 
    setOpen(false); 
    setNewAnniv({ id, adate, aname, email });
    setChecked(isHoliday);
  };
  const handleChange = e => {
    setNewAnniv(newAnniv => ({...newAnniv, [e.target.name]: e.target.value}));
  }
  const handleUpdate = () => {
    const newAnniv2 = {...newAnniv, isHoliday: checked}
    updateRecord.mutate(newAnniv2);
    handleClose();
  }
  const handleDelete = () => {
    deleteRecord.mutate(id);
    setOpen(false); 
  }

  return (
    <>
      {(middot && index !== 0) && 
        <Typography variant='string' display='inline'>·</Typography>}
      <Link href='#' variant='body1'
        sx={{ color: 'inherit', textDecoration: 'none', 
          '&:hover': { cursor: 'pointer', textDecoration: 'underline', },
        }}
        onClick={handleClickOpen}
      >
        <Typography variant='body1' display='inline'>
          {aname.indexOf('대체') >= 0 ? aname.substring(0,5) : aname}
        </Typography>
      </Link>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>기념일 조회/수정/삭제</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ width: '30ch' }} alignItems="center">
            <TextField autoFocus required margin="dense" id="aname"
              name="aname" label="이름" type="text" fullWidth
              defaultValue={aname} onChange={handleChange}
            />
            <TextField required margin="dense" id="adate"
              name="adate" label="날짜" type="text" fullWidth placeholder="20240101"
              defaultValue={adate} onChange={handleChange}
            />
            <FormGroup>
              <FormControlLabel label="공휴일"
                control={
                  <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
                }  
              />
            </FormGroup>
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

AnnivDetailDialog.propTypes = {
  anniv: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  middot: PropTypes.string.isRequired,
};