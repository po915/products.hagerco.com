/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../routes';
import { StoreContext } from '../../state/StoreContext';

export default function Header(props) {
    const { state, actions, ...rest } = useContext(StoreContext);

    function logout() {
        actions.auth.logout().then(() => {
            if (props.location.state !== undefined) {
                props.history.push(props.location.state.from.pathname);
            } else {
                props.history.push(routes.INDEX);
            }
        });
    }

    return (
        <header>
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <a className="navbar-brand" href={routes.INDEX}>
                        <img className="navbar-brand-image" src="/public/images/hager-logo.png" alt="Hager Companies"/>
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={routes.PRODUCTS}>
                                    <img className="header-links-icon" src="/public/images/icon-head-contact.svg" />
                                        Product Search/Cross Ref
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={routes.DIST}>
                                    <img className="header-links-icon" src="/public/images/icon-head-distributors.svg" />
                                        Distributors
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={routes.REPS}>
                                    <img className="header-links-icon" src="/public/images/icon-head-reps.svg" />
                                        Reps
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://choosehager.com/contact/">
                                    <img className="header-links-icon" src="/public/images/icon-head-contact.svg" />
                                        Contact
                                </a>
                            </li>
                            <li className="nav-item">
                                {state.getIn(['auth', 'isLoggedIn'])
                                    ? (<Link className="nav-link" to="#" onClick={logout}><img className="header-links-icon" src="/public/images/icon-head-login.svg" />Logout</Link>)
                                    : (<Link className="nav-link" to={routes.LOGIN}><img className="header-links-icon" src="/public/images/icon-head-login.svg" />Login</Link>)
                                }
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
}
