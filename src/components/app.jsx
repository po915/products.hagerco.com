/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import 'react-dom';
import 'reactstrap';
import Header from './common/header';
import HagerNavbar from './common/hagerNavbar';
import NavSearch from './common/navSearch';
import MegaMenu from './common/megaMenu';
import Footer from './common/footer';
import Main from './common/main';
import { StoreContext } from '../state/StoreContext';

export default function App() {
  const { state, actions, ...rest } = useContext(StoreContext);
  const activeSection = state.getIn(['navbar', 'activeSection']);

  return (
    <Route
      path="*"
      render={props => (
        <>
          <Header {...props} />
          {/* <HagerNavbar /> */}
          <NavSearch />
          { activeSection == null
            || state.getIn(['navbar', 'dropdownContent', activeSection]) == null
            ? ''
            : (<MegaMenu />)
          }
          <Main {...props} />
          <Footer {...props} />
        </>
      )}
    />
  );
}
