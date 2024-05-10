// 기본
import React from "react";
import { Box, Grid, Stack } from "@mui/material";

// css/conponents 연결
import '../profile.css'
import SnsBar from '../../common/aside&bar/SnsBar';
import Aside from "../../common/aside&bar/Aside";
import MyBoardList from "../MyBoardList";

export default function Profile() {
    return (
        <>
            <SnsBar />
            <Stack direction="row" spacing={0} sx={{ height: "100vh" }}>
                <Stack direction="column" spacing={2} sx={{ flex: 0.3}}>
                    <Aside />
                </Stack>
                <Stack direction="column" spacing={2} sx={{ flex: 1.5 }}>
                    <Box sx={{ width: '100%' }}>
                        {/* 전체 화면을 그리드로 분할 */}
                        <Grid container sx={{ padding: '20px' }}>
                            <Grid item xs={0} lg={2}> </Grid>
                            <Grid item xs={12} lg={8}> {/* 내용 들어가는 공간 */}
                                <MyBoardList />
                            </Grid>
                            <Grid item xs={0} lg={2}> </Grid>
                        </Grid>
                    </Box>
                </Stack>
            </Stack>
        </>
    )
}