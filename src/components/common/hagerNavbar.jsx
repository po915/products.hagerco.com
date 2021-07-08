import React, { useContext, useEffect } from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { SECTION_ENUM } from '../../util';
import * as routes from '../routes';
import { StoreContext } from '../../state/StoreContext';

export default function HagerNavbar() {
    const { state, dispatch, actions } = useContext(StoreContext);

    // Load navbar section items
    useEffect(() => {
        actions.navbar.fetchProductsDropdown();
        actions.navbar.fetchDesignDropdown();
        actions.navbar.fetchResourcesDropdown();
        actions.navbar.fetchAccessControlDropdown();
        // other dropdown fetches go here
    }, []);

    function mouseOverItem(e, section) {
        dispatch({ type: 'SET_ACTIVE_SECTION', payload: { section } });
    }

    // eslint-disable-next-line no-unused-vars
    function mouseLeaveItem(e) {
        dispatch({ type: 'SET_ACTIVE_SECTION', payload: { section: null } });
    }

    function setActiveClass(section) {
        return `nav-link ${state.getIn(['navbar', 'activeSection']) === section ? 'active' : ''}`;
    }

    function onSearchChange(event) {
        if (event.target.value.length) {
            // console.log("searchDidChange", event.target.value);
            actions.search.searchForTerm(event.target.value);
        }
    }

    return (
        <Navbar className="navbar-expand-lg navbar-light hager-nav">
            <div className="container-fluid">
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink className="nav-link" to={routes.ABOUT}>WHO WE ARE</NavLink>
                    </NavItem>
                    <NavItem
                        onPointerEnter={e => mouseOverItem(e, SECTION_ENUM.PRODUCTS)}
                        onPointerLeave={mouseLeaveItem}
                    >
                        <NavLink className={setActiveClass(SECTION_ENUM.PRODUCTS)} to={routes.PRODUCTS}>
                            PRODUCTS
            </NavLink>
                    </NavItem>
                    <NavItem
                        onPointerEnter={e => mouseOverItem(e, SECTION_ENUM.ACCESSCONTROL)}
                        onPointerLeave={mouseLeaveItem}
                    >
                        <NavLink
                            className={setActiveClass(SECTION_ENUM.ACCESS_CONTROL)}
                            to={routes.ACCESS_CONTROL}
                        >
                            ACCESS CONTROL
            </NavLink>
                    </NavItem>
                    <NavItem
                        onPointerEnter={e => mouseOverItem(e, SECTION_ENUM.DESIGN)}
                        onPointerLeave={mouseLeaveItem}
                    >
                        <NavLink
                            className={setActiveClass(SECTION_ENUM.DESIGN)}
                            to={routes.DESIGN}
                        >
                            DESIGN
            </NavLink>
                    </NavItem>
                    <NavItem
                        onPointerEnter={e => mouseOverItem(e, SECTION_ENUM.RESOURCE)}
                        onPointerLeave={mouseLeaveItem}
                    >
                        <NavLink
                            className={setActiveClass(SECTION_ENUM.RESOURCE)}
                            to={routes.RESOURCES}
                        >
                            RESOURCES
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to={routes.MY_HAGER}>MyHAGER</NavLink>
                    </NavItem>
                </Nav>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control hager-search w-100 mr-sm-2" type="search" placeholder="Search products" aria-label="Search" onChange={(e) => onSearchChange(e)}/>
                </form>
            </div>
        </Navbar>
    );
}
