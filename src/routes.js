import Dashboard from "views/Admin/Dashboard.js";
import Settings from "views/Admin/Settings";

import JobPostingList from "views/Main/JobPostingList";
import Welcome from "views/Main/Welcome";
import WelcomeChild from "views/Main/WelcomeChild";

import EmployerUserDashboard from "views/EmployerUser/Dashboard/Dashboard";
import MyPostings from "views/EmployerUser/JobPostings/MyPostings"

import {Add, GroupWorkSharp, Home, List, Work, VerifiedUser} from "@material-ui/icons";
import AddNewPosting from "views/EmployerUser/JobPostings/AddNewPosting";
import ActivatePostings from "views/Admin/ActivatePostings";
import Login from "views/Main/Login";
import Register from "views/Main/Register/Register";
import EmployeeRegister from "views/Main/Register/EmployeeRegister";
import EmployerRegister from "views/Main/Register/EmployerRegister";
import MyBackgrounds from "./views/EmployeeUser/MyBackgrounds";
import UpdateBackground from "./views/EmployeeUser/UpdateBackground";
import EditProfile from "./views/EmployerUser/Profile/EditProfile";
import ActivateOperations from "./views/Admin/ActivateOperations";
import EditAdminProfile from "./views/Admin/EditAdminProfile";
import JobPostings from "./views/EmployeeUser/JobPostings";

var routes = [
  {
    path: "/home",
    name: "Anasayfa",
    iconName: "home",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Ayarlar",
    iconName: "setting",
    component: Settings,
    layout: "/admin"
  },
  {
    path: "/noactivatedoperations",
    name: "Onaylanmamış İşlemler",
    iconName: "list",
    component: ActivateOperations,
    layout: "/admin"
  },
  {
    path: "/noactivatedpostings",
    component: ActivatePostings,
    name: "Onaylanacak İlanlar",
    layout: "/admin",
    iconName: "list",
  },
  {
    path: "/profile",
    name: "Profilim",
    iconName: "user circle",
    component: EditAdminProfile,
    layout: "/admin",
  },
  {
    path: "/welcome",
    component: Welcome,
    layout: "/main",
    children: WelcomeChild,
  }, 
  {
    path: "/postings",
    component: JobPostingList,
    layout: "/main",
  }, 
  {
    path: "/login",
    component: Login,
    layout: "/main",
  }, 
  {
    path: "/register",
    component: Register,
    layout: "/main",
  },
  {
    path: "/register/employer",
    component: EmployerRegister,
    layout: "/main",
  },
  {
    path: "/register/employee",
    component: EmployeeRegister,
    layout: "/main",
  },
  {
    path: "/home",
    component: EmployerUserDashboard,
    name: "Anasayfam",
    layout: "/employer",
    icon: (style) => {
      return (
        <Home className={style}/>
      );
    }
  },
  {
    components: [
      {
        path: "/mypostings",
        component: MyPostings,
        name: "İş İlanlarım",
        layout: "/employer",
        icon: (style) => {
          return (
            <List className={style}/>
          );
        },
      },
      {
        path: "/add",
        component: AddNewPosting,
        name: "İş İlanı Ekle",
        layout: "/employer",
        icon: (style) => {
          return (
            <Add className={style}/>
          );
        },
      }
    ],
    name: "İş İlanı İşlemleri",
    layout: "/employer",
    icon: (style) => {
      return (
        <Work className={style}/>
      );
    },
    isAccordion: true,
  },
  {
    path: "/mypostings",
    component: MyPostings,
    name: "İş İlanlarım",
    layout: "/employer",
    display: false,
    icon: (style) => {
      return (
        <List className={style}/>
      );
    },
  },
  {
    path: "/add",
    component: AddNewPosting,
    name: "İş İlanı Ekle",
    layout: "/employer",
    display: false,
    icon: (style) => {
      return (
        <Add className={style}/>
      );
    },
  },
  {
    path: "/editprofile",
    layout: "/employer",
    name: "Profilimi Düzenle",
    component: EditProfile,
    icon: (style) => {
      return (<VerifiedUser className={style} />);
    }
  },
  {
    path:"/home",
    layout: "/employee",
    name: "Anasayfam",
    icon: (style) => (<Home className={style}/>)
  },
  {
    path:"/backgrounds",
    layout: "/employee",
    name: "Özgeçmişlerim",
    component: MyBackgrounds,
    icon: (style) => (<Work className={style}/>)
  },
  {
    path:"/background/update",
    layout: "/employee",
    component: UpdateBackground,
    name: "Özgeçmiş Güncelle",
    display: false,
  },
  {
    path:"/postings",
    layout: "/employee",
    name: "İş İlanları",
    component: JobPostings,
    icon: (style) => (<GroupWorkSharp className={style}/>)
  },
];
export default routes;
