import { CardMedia, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import TimelineItem from "examples/Timeline/TimelineItem";
import YearSelect from '../yearSelect';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyBoardList } from "api/axiosGet";
import { GetWithExpiry } from "api/LocalStorage";
import './album.css';

function ShowAlbumList() {
  const uid = parseInt(GetWithExpiry('uid'));
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const board = useQuery({
    queryKey: ['board', uid],
    queryFn: () => getMyBoardList(uid),
  });
  const [year, setYear] = useState(null);
  console.log(board.data);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <MDBox py={3}>
      <MDBox mt={4.5}>
        <YearSelect selectedYear={selectedYear} onChange={handleYearChange} />
        <Grid container mt={3} spacing={3} sx={{ border: '2px solid white', }}>
          {board && board.data && board.data.map((data, idx) => {
            const modTime = data.modTime;
            if (!modTime) return null; // modTime이 없으면 건너뜁니다.

            const yearFromModTime = new Date(modTime).getFullYear(); // modTime에서 연도를 추출합니다.
            if (yearFromModTime !== selectedYear) return null; // 선택한 연도와 다른 경우 건너뜁니다.

            return (
              <Grid item key={idx} xs={12} md={6} lg={4}>
                <MDBox>
                  <MDBox sx={{ width: '100%', height: '100%' }}>
                    <MDBox
                      variant="gradient"
                      borderRadius="lg"
                      sx={{
                        height: "15rem",
                        transition: 'box-shadow 0.3s',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        '&:hover': {
                          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
                        }
                      }}
                    >
                      <CardMedia
                        className="albumCardList"
                        component="img"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          p: 0, m: 0
                        }}
                        image={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${data.image}`} alt="Paella dish" />
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Grid>
            );
          })}
        </Grid>
      </MDBox >
    </MDBox >
  );
}

export default ShowAlbumList;
