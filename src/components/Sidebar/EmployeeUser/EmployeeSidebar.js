import React from "react";
import classNames from "classnames";
// core components
import AdminNavbarLinks from "components/Navbars/EmployerUser/AdminNavbarLinks.js";
import SidebarItem from "../customComponents/SidebarItem";

import styles from "assets/materialDashboard/jss/material-dashboard-react/components/sidebarStyle.js";
import {
    Hidden,
    Drawer,
    List,
    makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(styles);


export default function EmployeeSidebar(props) {
    const classes = useStyles();
    const { image, routes } = props;
    var links = (
        <List className={classes.list}>
            {routes.map((prop, key) => {
                return (
                    <SidebarItem key={key} prop={prop} classes={classes} parentLayout="/employee" />
                );
            })}
        </List>
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