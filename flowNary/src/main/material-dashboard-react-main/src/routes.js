// Material Dashboard 2 React layouts
import Home from "layouts/home";
import Tables from "layouts/tables";
import Album from "layouts/album";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "홈",
    key: "home",
    icon: <Icon fontSize="xx-large">roofing</Icon>,
    route: "/home",
    component: <Home />,
  },
  {
    type: "collapse",
    name: "앨범",
    key: "album",
    icon: <Icon fontSize="xx-large">collections</Icon>,
    route: "/album",
    component: <Album />,
  },
  {
    type: "collapse",
    name: "채팅",
    key: "chatting",
    icon: <Icon fontSize="xx-large">send</Icon>,
    route: "/chatting",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "마이페이지",
    key: "myPage",
    icon: <Icon fontSize="xx-large">contact_page</Icon>,
    route: "/myPage",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "f_패밀리",
    key: "follow",
    icon: <Icon fontSize="xx-large">diversity_1</Icon>,
    route: "/follow",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "알림",
    key: "notifications",
    icon: <Icon fontSize="xx-large">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "특별한 날",
    key: "chalendar",
    icon: <Icon fontSize="xx-large">calendar_month</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "할 일",
    key: "to-do",
    icon: <Icon fontSize="xx-large">playlist_add_check</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "로그인",
    key: "sign-in",
    icon: <Icon fontSize="xx-large">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "로그아웃",
    key: "sign-up",
    icon: <Icon fontSize="xx-large">logout</Icon>,
    route: "/home",
    component: <SignUp />,
  },
];

export default routes;
