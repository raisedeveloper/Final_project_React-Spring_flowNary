import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Button, Dialog, Modal, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { getFamilyUserList } from 'api/axiosGet';
import Iconify from 'components/iconify/iconify';
import { updateFamily } from 'api/axiosPost';
import { UserContext } from "api/LocalStorage";
import { getFamily } from "api/axiosGet";
import { deleteFamily } from "api/axiosPost";
import { isEmpty } from "api/emptyCheck";


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'profile', headerName: '프로필', width: 100,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: 1 }}>
        {params.value ? <Avatar src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${params.value}`} /> : <Avatar src="" />}
      </Box>
    ),
  },
  {
    field: 'name', headerName: '이름', width: 200,
    renderCell: (params) => (
      <Box>
        {params.row.status === 2 && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Iconify style={{ marginRight: '3px' }} icon="openmoji:crown" /> {/* Status가 2일 때만 왕관 아이콘을 표시 */}
            {params.value}
          </Box>
        )}
        {params.row.status === 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Iconify style={{ marginRight: '3px' }} icon="pepicons-print:person-circle-filled" /> {/* Status가 2일 때만 왕관 아이콘을 표시 */}
            {params.value}
          </Box>
        )}
      </Box>
    ),
  },

  {
    field: 'status', headerName: '구성원', width: 100,
    renderCell: (params) => (
      <Box>
        {params.value === 2 && '패밀리장'}
        {params.value === 1 && '관리자'}
        {params.value === 0 && '소속원'}
      </Box>
    )
  },
  {
    field: 'regTime',
    headerName: '가입시간',
    width: 200,
    renderCell: (params) => (
      <Box>
        {new Date(params.value).toLocaleString().substring(0, 20)}
      </Box>
    )
  },
];
const rows = [
  { id: 1, lastName: 'Snow', nickname: 'nick', status: '방장' },
  { id: 2, lastName: 'Lannister', nickname: 'Cersei', status: '가족' },
  { id: 3, lastName: 'Lannister', nickname: 'Jaime', status: '가족' },
  { id: 4, lastName: 'Stark', nickname: 'Arya', status: '가족' },
  { id: 5, lastName: 'Targaryen', nickname: 'Daenerys', status: '가족' },
  { id: 6, lastName: 'Melisandre', nickname: 'james', status: '가족' },
  { id: 7, lastName: 'Clifford', nickname: 'Ferrara', status: '가족' },
  { id: 8, lastName: 'Frances', nickname: 'Rossini', status: '가족' },
  { id: 9, lastName: 'Roxie', nickname: 'Harvey', status: '가족' },
  { id: 10, lastName: 'Roxie', nickname: 'Harvey', status: '가족' },
];



function FamilyUserList(props) {

  const { activeUser } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const faid = props.faid;
  const [fam, setFam] = useState(null);
  const [famname, setFamname] = useState('');
  console.log(faid);

  // faid로 getFamily 불러와서 패밀리네임 가져오기
  useEffect(() => {
    const fetchfam = async () => {
      const famtemp = await getFamily(faid);
      if (!isEmpty(famtemp)) {
        setFam(famtemp);
        setFamname(famtemp.name);
      }
    }

    fetchfam();
  }, [faid])


  // 모달창
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 패밀리 수정
  const handleFamilyUpdate = (name, faid) => {
    updateFamily(name, faid);
  }

  const handleDeleteButton = (faid) => {
    deleteFamily(faid)
  }


  const { data: familyUserList, isLoading, isError } = useQuery({
    queryKey: ['familyuserlist', faid],
    queryFn: () => getFamilyUserList(faid),
  })

  if (faid === -1) {
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <Box>
          데이터가 없습니다
        </Box>
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <Box>
          로딩 중...
        </Box>
      </Box>
    )
  }

  return (

    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <Box>
          <DataGrid
            rows={familyUserList}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Box>

        {activeUser.uid == fam.leaderuid && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: 3 }}>
            <Button
              variant="outlined"
              color="success"
              startIcon={<Iconify icon="mdi:pencil-outline" />}
              onClick={handleOpen}
              sx={{
                color: 'CornflowerBlue',
                borderColor: 'CornflowerBlue',
                padding: '8px 16px',
                marginRight: 2,
                fontSize: '16px',
                fontWeight: 'bold',
              }}>
              수정 하기
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleDeleteButton(faid)}
              startIcon={<Iconify icon="mdi:trash-can-outline" />}
              sx={{
                borderColor: 'red',
                '&:hover': {
                  bgcolor: 'darkred',
                },
                color: '#f55c45',
                padding: '8px 16px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              삭제
            </Button>
          </Box>
        )
        }
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modaltitle" fontWeight={'bold'} sx={{ color: 'lightslategray' }}>
            패밀리 수정
          </Typography>
          <TextField label="패밀리 이름" variant="outlined"
            value={famname}
            onChange={(e) => setFamname(e.target.value)}
            sx={{
              color: 'lightcoral',
              marginTop: '10px',
              '& .MuiInputLabel-outlined': {
                fontSize: '1rem',
                lineHeight: '1.3',
                color: 'lightcoral',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'lightcoral', // 기본 outline 색상 변경
                },
                '&:hover fieldset': {
                  borderColor: 'lightcoral', // 호버 상태에서 outline 색상 변경
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'lightcoral',
                  color: 'lightcoral', // 포커스 상태에서 outline 색상 변경
                },
                padding: '3px 3px', // 입력 필드의 패딩 조정
              }
            }}
          /> <br />
          <Button variant="outlined" onClick={handleFamilyUpdate(famname, faid)} sx={{ marginTop: '10px', color: 'lightcoral', borderColor: 'lightcoral', }}>수정</Button>

        </Box>
      </Modal>
    </>
  );
}

FamilyUserList.propTypes = {
  faid: PropTypes.number,
}

export default FamilyUserList;