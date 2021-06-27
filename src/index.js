import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import MainLayout from "layouts/Main.js";
import EmployerUserLayout from "layouts/EmployerUser";
import EmployeeUserLayout from "layouts/EmployeeUser";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "semantic-ui-css/semantic.min.css";

import "assets/materialDashboard/css/material-dashboard-react.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { Provider } from "react-redux";
import { configureStore } from "store/configureStore";

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <BrowserRouter>
          <Switch>
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Route path="/main" render={(props) => <MainLayout {...props} />} />
            <Route
              path="/employer"
              render={(props) => <EmployerUserLayout {...props} />}
            />
            <Route
              path="/employee"
              render={(props) => <EmployeeUserLayout {...props} />}
            />
            <Redirect from="/*" to="/main/welcome" />
          </Switch>
        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  </Provider>,
  document.getElementById("root")
);
