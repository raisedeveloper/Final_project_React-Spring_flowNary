import { faker } from '@faker-js/faker';
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import AppOrderTimeline from './app-order-timeline';
import AppCurrentVisits from './app-current-visits';
import AppWebsiteVisits from './app-website-visits';
import AppWidgetSummary from './app-widget-summary';
import AppCurrentSubject from './app-current-subject';
import AppTrafficBySite from './app-traffic-by-site';

import Iconify from '../../../components/iconify';
import { Container, Grid, Typography } from "@mui/material";

export default function statistics() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          반가워요, 돌아오셨군요! 👋
        </Typography>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={2} lg={2} sx={{ mb: 5, mr: 5 }}>
            <AppWidgetSummary
              title="이번 주 게시물 수"
              total={714000}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          </Grid>
          <Grid xs={12} sm={6} md={2} lg={2} sx={{ mb: 5, mr: 5 }}>
            <AppWidgetSummary
              title="신규 가입자 수"
              total={1352831}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={2} lg={2} sx={{ mb: 5, mr: 5 }}>
            <AppWidgetSummary
              title="전체 게시물 수"
              total={1723315}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={2} lg={2} sx={{ mb: 5, mr: 3.5 }}>
            <AppWidgetSummary
              title="보고된 버그 수"
              total={234}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
            />
          </Grid>
          <Grid xs={12} md={6} lg={8} sx={{ mb: 5 }}>
            <AppWebsiteVisits
              title="웹 사이트 방문자 수"
              subheader="(+43%) 작년 대비"
              chart={{
                labels: [
                  '01/01/2024',
                  '02/01/2024',
                  '03/01/2024',
                  '04/01/2024',
                  '05/01/2024',
                  '06/01/2024',
                  '07/01/2024',
                  '08/01/2024',
                  '09/01/2024',
                  '10/01/2024',
                  '11/01/2024',
                  '12/01/2024',
                ],
                series: [
                  {
                    name: '게시물 업데이트',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  {
                    name: '방문자 수',
                    type: 'area',
                    fill: 'gradient',
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: '공유자 수',
                    type: 'line',
                    fill: 'solid',
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="최근 방문자"
              chart={{
                series: [
                  { label: '8-20세', value: 4525 },
                  { label: '20-40세', value: 3265 },
                  { label: '40-60세', value: 3443 },
                  { label: '50-70세', value: 3541 },
                  { label: '60-80세', value: 4025 },
                  { label: '80세 이상', value: 2152 },
                ],
              }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={7}>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </DashboardLayout >
  );
}


