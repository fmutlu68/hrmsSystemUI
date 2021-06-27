/*eslint-disable*/
import React, { useState } from "react";
import classNames from "classnames";
import { PropTypes } from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
// core components
import AdminNavbarLinks from "components/Navbars/EmployerUser/AdminNavbarLinks.js";

import styles from "assets/materialDashboard/jss/material-dashboard-react/components/sidebarStyle.js";
import {
  Hidden,
  Drawer,
  List,
  ListItem,
  Icon,
  ListItemText,
  makeStyles,
  Collapse,
} from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  let location = useLocation();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return location.pathname === routeName;
  }
  const { color, logo, image, logoText, routes } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.layout === "/employer" && prop.display !== false) {
          var listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path),
          });
          var whiteFontClasses = classNames({
            [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path),
          });
          if (prop.isAccordion === true) {
            const [open, setOpen] = React.useState(false);
            return (
              <div>
                <ListItem
                  button
                  className={classes.itemLink + listItemClasses}
                  onClick={() => setOpen(!open)}
                >
                  {prop.icon(classes.itemIcon)}
                  <ListItemText
                    primary={prop.name}
                    className={classNames(classes.itemText, whiteFontClasses, {
                      [classes.itemTextRTL]: props.rtlActive,
                    })}
                    disableTypography={true}
                  />
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {prop.components.map((child, pKey) => {
                      listItemClasses = classNames({
                        [" " + classes[color]]: activeRoute(
                          prop.layout + child.path
                        ),
                      });
                      whiteFontClasses = classNames({
                        [" " + classes.whiteFont]: activeRoute(
                          prop.layout + child.path
                        ),
                      });
                      return (
                        <NavLink
                          to={prop.layout + child.path}
                          className={classes.item}
                          activeClassName="active"
                          key={pKey + child.name}
                        >
                          <ListItem
                            button
                            className={classes.itemLink + listItemClasses}
                          >
                            {child.icon(classes.itemIcon)}
                            <ListItemText
                              primary={child.name}
                              className={classNames(
                                classes.itemText,
                                whiteFontClasses,
                                {
                                  [classes.itemTextRTL]: props.rtlActive,
                                }
                              )}
                              disableTypography={true}
                            />
                          </ListItem>
                        </NavLink>
                      );
                    })}
                  </List>
                </Collapse>
              </div>
            );
          } else {
            return (
              <NavLink
                to={prop.layout + prop.path}
                className={classes.item}
                activeClassName="active"
                key={key + prop.name}
              >
                <ListItem button className={classes.itemLink + listItemClasses}>
                  {prop.icon(classes.itemIcon)}
                  <ListItemText
                    primary={prop.name}
                    className={classNames(classes.itemText, whiteFontClasses, {
                      [classes.itemTextRTL]: props.rtlActive,
                    })}
                    disableTypography={true}
                  />
                </ListItem>
              </NavLink>
            );
          }
        } else {
          return null;
        }
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        href="https://www.creative-tim.com?ref=mdr-sidebar"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive,
        })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        HRMS SYSTEM
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
