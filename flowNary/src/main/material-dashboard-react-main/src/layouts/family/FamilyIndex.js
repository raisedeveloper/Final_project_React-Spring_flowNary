// Material Dashboard 2 React example components
import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Box, TextField, Avatar, ListItemText, Divider, List, ListItem, ListItemAvatar, Typography } from "@mui/material";


export default function family() {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ width: '80%', bgcolor: 'beige', boxShadow: 'none', p: 4 }}>
        <Typography id="modal-modal-title" variant="h6" component="div">
          내 가족 구성원 (Following)
        </Typography>

        <TextField
          label="Search"
          variant="outlined"
          onChange={handleSearch}
        />
        <hr />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'beige' }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/img/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="아이디 혹은 닉네임"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        실명 혹은 메일주소
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/img/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="아이디 혹은 닉네임"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        실명 혹은 메일주소
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>

              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/img/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="아이디 혹은 닉네임"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        실명 혹은 메일주소
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>

            </List>
          </div>
        </Typography>
      </Box>
      <br />
      <Box sx={{ width: '80%', bgcolor: 'beige', boxShadow: 'none', p: 4 }}>
      <Typography id="modal-modal-title" variant="h6" component="div">
          날 따르는 가족 구성원 (Follower)
        </Typography>
          <TextField
            label="Search"
            variant="outlined"
            onChange={handleSearch}
          />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'beige' }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/img/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="아이디 혹은 닉네임"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        실명 혹은 메일주소
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/img/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="아이디 혹은 닉네임"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        실명 혹은 메일주소
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>

              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/img/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="아이디 혹은 닉네임"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        실명 혹은 메일주소
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>

            </List>
          </div>
        </Typography>
      </Box>
    </DashboardLayout >
  );
}