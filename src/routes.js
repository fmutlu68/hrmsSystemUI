import Dashboard from "views/Admin/Dashboard.js";
import Settings from "views/Admin/Settings";

import JobPostingList from "views/Main/JobPostingList";
import Welcome from "views/Main/Welcome";
import WelcomeChild from "views/Main/WelcomeChild";

import EmployerUserDashboard from "views/EmployerUser/Dashboard/Dashboard";
import MyPostings from "views/EmployerUser/JobPostings/MyPostings"

import { Add, Home, List, Work } from "@material-ui/icons";
import {Icon} from "semantic-ui-react"
import AddNewPosting from "views/EmployerUser/JobPostings/AddNewPosting";
import ActivatePostings from "views/Admin/ActivatePostings";

<Icon name=""/>
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
    path: "/noactivatedpostings",
    component: ActivatePostings,
    name: "Onaylanacak İlanlar",
    layout: "/admin",
    iconName: "list",
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
    path: "/home",
    component: EmployerUserDashboard,
    name: "Anasayfam",
    layout: "/employer",
    icon: (style) => {
      return (
        <Home className={style}></Home>
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
            <List className={style}></List>
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
            <Add className={style}></Add>
          );
        },
      }
    ],
    name: "İş İlanı İşlemleri",
    layout: "/employer",
    icon: (style) => {
      return (
        <Work className={style}></Work>
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
        <List className={style}></List>
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
        <Add className={style}></Add>
      );
    },
  }
];
export default routes;
