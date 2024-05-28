import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Iconify from '../../../components/iconify';

// api
import axios from 'axios';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Grid } from '@mui/material';
import { MyLocation } from '@mui/icons-material';
import { getUserList } from 'api/axiosGet';
import { updateUserStatus } from 'api/axiosPost';
// ----------------------------------------------------------------------

export default function UserTableRow({ selected, handleClick }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(1);
  const [ currentUserId, setCurrentUserId ] = useState('');
  const rowsPerPage = 10;
  // 메뉴 열기 핸들러
  const handleOpenMenu = (event, userId) => {
    setOpen(event.currentTarget);
    setCurrentUserId(userId)
  };

  // 유저 정보 변경
  const handleUpdateStatus = (event) => {
    mutate({uid: currentUserId, status: 1});
  }

  // 메뉴 닫기 핸들러
  const handleCloseMenu = () => {
    setOpen(null);
    setCurrentUserId('')
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUserList(),
  });

  const { mutate } = useMutation({
    mutationFn: userData => { // {userId: userId, status: status}
      updateUserStatus(userData)
    },
    onSuccess: () => { 
      alert('성공ㅊㅊ');
      queryClient.refetchQueries(['users']);
     },
    onError: () => { alert('실패ㅠ') },
  });
  // users 데이터가 없거나 로딩 중일 때 처리
  if (isLoading) {
    return (
      <TableRow>
        <TableCell>로딩 중...</TableCell>
      </TableRow>
    );
  }

  if (isError) {
    return (
      <TableRow>
        <TableCell>에러 발생</TableCell>
      </TableRow>
    );
  }

  const paginatedUsers = users.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // 유저 데이터가 있을 때 각 유저 정보를 테이블 행으로 렌더링
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Container sx={{ padding: '2rem' }}>
          <Typography variant="h4" > 유저 목록 </Typography>
          <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
            <TableContainer component={Paper} sx={{ margin: '1.5rem' }}>
              <Table>
                <TableBody>
                  {paginatedUsers && paginatedUsers.map((user) => (
                    <TableRow hover tabIndex={-1} role="checkbox" selected={selected} key={user.id}>
                      <TableCell component="th" scope="row" padding="none" align="center">
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                          <Avatar sx={{ width: '3rem', height: '3rem' }}>
                            <div
                              style={{
                                width: '3rem',
                                height: '3rem',
                                borderRadius: '50%',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundImage: `url(https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${user.profile})`,
                              }}
                            />
                          </Avatar>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle2" noWrap>
                          {user.uname ? user.uname : "확인이 필요한 유저"}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {user.provider === 'google' ? '구글유저' : '기본유저'}
                      </TableCell>
                      <TableCell align="center">
                        {user.status === -1 ? '관리자' : user.status === 1 ? '비활성화' : '활성화'}
                      </TableCell>
                      <TableCell align="center">
                        {user.regDate}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={e => handleOpenMenu(e, user.uid)}>
                          <Iconify icon="eva:more-vertical-fill" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Popover
              open={!!open}
              anchorEl={open}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: { width: 200 },
              }}
            >
              <MenuItem onClick={handleCloseMenu} style={{ width: '100%' }}>
                <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                유저프로필 수정
              </MenuItem>

              <MenuItem onClick={handleUpdateStatus} sx={{ color: 'error.main' }}>
                <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                유저삭제
              </MenuItem>
            </Popover>

            <Pagination
              count={Math.ceil(users.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              shape="rounded"
            />
          </Stack>
        </Container>
      </DashboardLayout>
    </>
  );
}

UserTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
};
