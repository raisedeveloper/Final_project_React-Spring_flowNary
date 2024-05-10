// 기본
import React from "react";
import { Stack } from "@mui/material";

// components 연결
import SnsBar from '../../common/aside&bar/SnsBar';
import Aside from "../../common/aside&bar/Aside";
import IndexButton from "../IndexButton";

export default function Mypage() {
    return (
        <>
            <SnsBar />
            <Stack direction="row" spacing={0} sx={{ height: "100vh" }}>
                <Stack direction="column" spacing={2} sx={{ flex: 0.3 }}>
                    <Aside />
                </Stack>
                <Stack direction="column" spacing={2} sx={{ flex: 1.5 }}>
                    <Stack alignItems="center" just sx={{ flexGrow: 1 }}>
                        <IndexButton />
                    </Stack>
                </Stack>

            </Stack>

        </>
    )
}