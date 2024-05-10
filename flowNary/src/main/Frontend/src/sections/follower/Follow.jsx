// 기본
import React from 'react';
import { Avatar, Button, Container, FormControl, Input, InputAdornment, Stack } from "@mui/material";

// 아이콘
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

export default function Aside() {
    return (
        <div>
            {/* 팔로우한 유저 */}
            <Stack sx={{ padding: '20px' }} justifyContent="center">
                <Container sx={{ border: '1px solid black', borderRadius: '20px', minHeight: '360px' }}>
                    <Stack>
                        <FormControl variant="standard">
                            <Input sx={{ height: '50px', fontSize: '25px' }} placeholder="팔로우한 유저 찾기" startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle sx={{ fontSize: '35px' }}></AccountCircle>
                                </InputAdornment>
                            } endAdornment={
                                <InputAdornment>
                                    <Button>
                                        <SearchIcon sx={{ fontSize: '35px' }}></SearchIcon>
                                    </Button>
                                </InputAdornment>
                            } />
                        </FormControl>
                    </Stack>
                    <Stack sx={{ marginTop: '10px' }}>
                        <Stack direction='row' alignItems='center'>
                            <Avatar sx={{ marginRight: '10px' }}>
                                안
                            </Avatar>
                            안순현
                        </Stack>
                    </Stack>
                </Container>
            </Stack>

            {/* 팔로잉한 유저 */}
            <Stack sx={{ padding: '20px' }} justifyContent="center">
                <Container sx={{ border: '1px solid black', borderRadius: '20px', minHeight: '360px' }}>
                    <Stack>
                        <FormControl variant="standard">
                            <Input sx={{ height: '50px', fontSize: '25px' }} placeholder="팔로잉한 유저 찾기" startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle sx={{ fontSize: '35px' }}></AccountCircle>
                                </InputAdornment>
                            } endAdornment={
                                <InputAdornment>
                                    <Button>
                                        <SearchIcon sx={{ fontSize: '35px' }}></SearchIcon>
                                    </Button>
                                </InputAdornment>
                            } />
                        </FormControl>
                    </Stack>
                    <Stack sx={{ marginTop: '10px' }}>
                        <Stack direction='row' alignItems='center'>
                            <Avatar sx={{ marginRight: '10px' }}>
                                안
                            </Avatar>
                            안순현
                        </Stack>
                    </Stack>
                </Container>
            </Stack>
        </div>
    );
}