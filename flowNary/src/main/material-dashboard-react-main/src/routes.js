// Material Dashboard 2 React layouts
import Home from "layouts/home";
import Settings from "layouts/setting";
import Album from "layouts/album";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Mypage from "layouts/mypage";
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
    visible: true,
  },
  {
    type: "collapse",
    name: "앨범",
    key: "album",
    icon: <Icon fontSize="xx-large">collections</Icon>,
    route: "/album",
    component: <Album />,
    visible: true,
  },
  {
    type: "collapse",
    name: "채팅",
    key: "chatting",
    icon: <Icon fontSize="xx-large">send</Icon>,
    route: "/chatting",
    component: <Billing />,
    visible: true,
  },
  {
    type: "collapse",
    name: "마이페이지",
    key: "mypage",
    icon: <Icon variant="outlined" fontSize="xx-large">contact_page</Icon>,
    route: "/mypage",
    component: <Mypage />,
    visible: true,
  },
  {
    type: "collapse",
    name: "f_패밀리",
    key: "friends",
    icon: <Icon fontSize="xx-large">diversity_1</Icon>,
    route: "/friends",
    component: <Profile />,
    visible: true,
  },
  {
    type: "collapse",
    name: "알림",
    key: "notifications",
    icon: <Icon fontSize="xx-large">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
    visible: true,
  },
  {
    type: "collapse",
    name: "특별한 날",
    key: "chalendar",
    icon: <Icon fontSize="xx-large">calendar_month</Icon>,
    route: "/chalendar",
    component: <Profile />,
    visible: true,
  },
  {
    type: "collapse",
    name: "할 일",
    key: "to-do",
    icon: <Icon fontSize="xx-large">person</Icon>,
    route: "/to-do",
    component: <Profile />,
    visible: true,
  },
  {
    type: "collapse",
    name: "설정",
    key: "profile/settings",
    icon: <Icon fontSize="xx-large">filter_vintage</Icon>,
    route: "/profile/settings",
    component: <Settings />,
    visible: true,
  },
  {
    type: "collapse",
    name: "로그인",
    key: "sign-in",
    icon: <Icon fontSize="xx-large">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    visible: true,
  },
  {
    type: "collapse",
    name: "로그아웃",
    key: "sign-out",
    icon: <Icon fontSize="xx-large">logout</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    visible: true,
  },
  {
    type: "collapse",
    name: "회원가입",
    key: "sign-up",
    icon: <Icon fontSize="xx-large">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
    visible: false,
  },
];

export default routes;
