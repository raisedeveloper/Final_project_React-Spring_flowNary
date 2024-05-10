// 기본
import React from "react";
import { Stack } from "@mui/material";

// components 연결
import SnsBar from '../../common/aside&bar/SnsBar';
import Aside from "../../common/aside&bar/Aside";
import Follow from "../Follow";

// 아직 할 것 많음
export default function Follower() {
    // const [followers, setFollowers] = useState(1);
    return (
        <>
            <SnsBar />
            <Stack direction="row" spacing={0} sx={{ height: "100vh" }}>
                <Stack direction="column" spacing={2} sx={{ flex: 0.3, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Aside />
                </Stack>
                <Stack direction="column" spacing={2} sx={{ flex: 0.2 }}>
                </Stack>
                <Stack direction="column" spacing={2} sx={{ flex: 0.8 }}>
                    <Follow />
                </Stack>
                <Stack direction="column" spacing={2} sx={{ flex: 0.5 }}>
                </Stack>
            </Stack>
        </>
    )
}