import React from "react";
import {Collapse, List, ListItem, ListItemText} from "@material-ui/core";
import classNames from "classnames";
import {NavLink, useLocation} from "react-router-dom";

export default function SidebarItem({...props}) {
    const {prop, classes, parentLayout, key} = props;
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const {isAccordion, display, layout, path, components, icon, name} = prop;
    let listItemClasses = classNames({
        [" " + classes["blue"]]: activeRoute(prop.layout + prop.path),
    });
    let whiteFontClasses = classNames({
        [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path),
    });
    function activeRoute(routeName) {
        return location.pathname === routeName;
    }
    if (parentLayout === layout && display !== false){
                    if (isAccordion){
                        return (
                            <div>
                                <ListItem
                                    button
                                    className={classes.itemLink + listItemClasses}
                                    onClick={() => setOpen(!open)}
                                >
                                    {icon(classes.itemIcon)}
                                    <ListItemText
                                        primary={prop.name}
                                        className={classNames(classes.itemText, whiteFontClasses)}
                                        disableTypography={true}
                                    />
                                </ListItem>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {components.map((child, key) => {
                                            listItemClasses = classNames({
                                                [" " + classes["blue"]]: activeRoute(
                                                    layout + child.path
                                                ),
                                            });
                                            whiteFontClasses = classNames({
                                                [" " + classes.whiteFont]: activeRoute(
                                                    layout + child.path
                                                ),
                                            });
                                            return (
                                                <NavLink
                                                    to={layout + child.path}
                                                    className={classes.item}
                                                    activeClassName="active"
                                                    key={key + child.name}
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
                                                                whiteFontClasses
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
                    }else {
                        return (
                            <NavLink
                                to={layout + path}
                                className={classes.item}
                                activeClassName="active"
                                key={key + name}
                            >
                                <ListItem button className={classes.itemLink + listItemClasses}>
                                    {icon(classes.itemIcon)}
                                    <ListItemText
                                        primary={name}
                                        className={classNames(classes.itemText, whiteFontClasses)}
                                        disableTypography={true}
                                    />
                                </ListItem>
                            </NavLink>
                        );
                    }
                }else {
                    return null;
                };
}