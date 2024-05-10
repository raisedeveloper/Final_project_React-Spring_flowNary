import React from "react";
import { Stack } from "@mui/material";

// conponents 연결
import SnsBar from '../../common/aside&bar/SnsBar';
import Aside from "../../common/aside&bar/Aside";
import MySearchList from "../MySearchList";

export default function Search() {

  return (
    <>
      <SnsBar />
      <Stack direction="row" spacing={0} sx={{ height: "100vh" }}>
        <Stack direction="column" spacing={2} sx={{ flex: 0.3}}>
          <Aside />
        </Stack>
        <Stack direction="column" spacing={2} sx={{ flex: 1.5 }}>
          <MySearchList />
        </Stack>
      </Stack>
    </>
  )
}

