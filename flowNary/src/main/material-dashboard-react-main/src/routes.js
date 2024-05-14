// Material Dashboard 2 React layouts
import Home from "layouts/home";
import Settings from "layouts/profile/setting";
import Album from "layouts/album";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

// aside 항목이름
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
    icon: <Icon fontSize="xx-large">receipt_long</Icon>,
    route: "/chatting",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "마이페이지",
    key: "mypage",
    icon: <Icon fontSize="xx-large">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "친구",
    key: "friends",
    icon: <Icon fontSize="xx-large">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "달력",
    key: "chalendar",
    icon: <Icon fontSize="xx-large">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "할 일",
    key: "to-do",
    icon: <Icon fontSize="xx-large">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "설정",
    key: "setting",
    icon: <Icon fontSize="xx-large">filter_vintage</Icon>,
    route: "/profile/setting",
    component: <Settings />,
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
    name: "회원가입",
    key: "sign-up",
    icon: <Icon fontSize="xx-large">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "설정",
    key: "setting",
    icon: <Icon fontSize="xx-large">assignment</Icon>,
    route: "/setting",
    component: <SignUp />,
  },
];

export default routes;
