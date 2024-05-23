import { Button, CardMedia, Grid, Modal } from "@mui/material";
import MDBox from "components/MDBox";
import YearSelect from '../yearSelect';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyBoardList } from "api/axiosGet";
import { GetWithExpiry } from "api/LocalStorage";
import Carousel from "react-material-ui-carousel";

function ShowAlbumList() {
  const uid = parseInt(GetWithExpiry('uid'));
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [open, setOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (images, index) => {
    setCurrentImages(images);
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentImages([]);
  };

  const { data: board, isLoading, error } = useQuery({
    queryKey: ['board', uid],
    queryFn: () => getMyBoardList(uid),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <MDBox py={3}>
      <MDBox mt={4.5}>
        <YearSelect selectedYear={selectedYear} onChange={handleYearChange} />
        <Grid container mt={3} spacing={3} sx={{ border: '2px solid white' }}>
          {Array.isArray(board) && board.map((data, idx) => {
            const modTime = data.modTime;
            if (!modTime) return null;

            const yearFromModTime = new Date(modTime).getFullYear();
            if (yearFromModTime !== selectedYear) return null;

            const images = data.image.includes(',') ? data.image.split(',').map(img => img.trim()) : [data.image.trim()];

            return (
              <Grid item key={idx} xs={12} md={6} lg={4}>
                <MDBox>
                  <MDBox sx={{ width: '100%', height: '100%' }}>
                    <MDBox
                      onClick={() => handleOpen(images, 0)}
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
                          p: 0,
                          m: 0,
                        }}
                        image={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${images[0]}`}
                        alt="Main Image"
                      />
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Grid>
            );
          })}

          <Modal open={open} onClose={handleClose}>
            <MDBox
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70%',
                height: 'auto',
                bgcolor: 'transparent',
                boxShadow: 'none',
                p: 0,
              }}
            >
              <Carousel
                autoPlay={false}
                index={currentIndex}
                onChange={(index) => setCurrentIndex(index)}
                navButtonsProps={{
                  style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }
                }}
                navButtonsWrapperProps={{
                  style: {
                    top: 'calc(50% - 20px)',
                    height: '40px',
                  }
                }}
              >
                {currentImages.map((imageUrl, index) => (
                  <img
                    key={index}
                    style={{ minWidth: '80%', maxWidth: '100%', maxHeight: '80vh', margin: '0 auto', display: 'block' }}
                    src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${imageUrl}`}
                    alt={`Slide ${index}`}
                  />
                ))}
              </Carousel>
            </MDBox>

          </Modal>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default ShowAlbumList;


