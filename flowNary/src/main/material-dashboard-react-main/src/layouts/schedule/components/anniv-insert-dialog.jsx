import { useState } from 'react';

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
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Iconify from 'components/iconify';
import useAnniv from './useAnniv';

export default function AnnivInsertDialog() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [anniv, setAnniv] = useState({ aname: '', adate: '' });

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { 
    setOpen(false); 
    setAnniv({ aname: '', adate: '' });
    setChecked(false);
  };
  const handleChange = e => {
    setAnniv({...anniv, [e.target.name]: e.target.value});
  }
  const { insertRecord } = useAnniv();
  const handleSubmit = () => {
    const newAnniv = {...anniv, email: sessionStorage.getItem('sessionEmail'), isHoliday: checked}
    insertRecord.mutate(newAnniv);
    // console.log(newAnniv);
    handleClose();
  }

  return (
    <>
      <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleClickOpen}>
        Anniversary
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{fontWeight: 'bold', fontSize: 18}}>기념일 등록</Typography>
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, }} >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ width: '30ch' }} alignItems="center">
            <TextField autoFocus required margin="dense" id="aname"
              name="aname" label="이름" type="text" fullWidth
              defaultValue={anniv.aname} onChange={handleChange}
            />
            <TextField required margin="dense" id="adate"
              name="adate" label="날짜" type="text" fullWidth placeholder="20240101"
              defaultValue={anniv.adate} onChange={handleChange}
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
          <Button onClick={handleSubmit} variant="contained">등록</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
