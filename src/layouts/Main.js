import React, { useState } from "react";
import { Segment, Visibility } from "semantic-ui-react";
import { Route, Redirect } from "react-router-dom";
import MainNavbar from "../components/Navbars/MainNavbar";

import routes from "../routes.js";

export default function Main() {
  const [fixed, setFixed] = useState({})

  let hideFixedMenu = () => setFixed({ fixed : false })
  let showFixedMenu = () => setFixed({ fixed : true })

  let loadChildrenRoutes = (routes) => {
    return routes.map((prop, key)=> {
      if (prop.layout === "/main" && prop.children !== undefined && prop.children !== null){
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            component={prop.children}
            key={key}
          />
        );
      }else {
        return null;
      }
    });
  }

  let loadRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/main") {
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div>
      <Visibility 
      once={true}
      onBottomPassed={showFixedMenu}
      onBottomPassedReverse={hideFixedMenu}
      >
        <Segment
          inverted
          textAlign="center"
          style={{ minHeight: 680, padding: "1em 0em" }}
          vertical
        >
          <MainNavbar getFixed={fixed}/>
          {loadRoutes(routes)}
            <Redirect from="*" to="/main/welcome" />
        </Segment>
      </Visibility>
      {loadChildrenRoutes(routes)}
    </div>
  );
}
