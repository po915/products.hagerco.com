import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthRoute from '../helpers/routers';
import Home from '../pages/home/home';
import Content from '../pages/content/content';
import Login from '../pages/login/login';
import MyHager from '../pages/myHager/myHager';
import ProductItem from '../pages/product/productItem/productItem';
import ProductCategory from '../pages/product/productCategory/productCategory';
import Products from '../pages/searchResults/products';
import AccessControl from '../pages/accessControl/accessControl';
import Distributors from '../pages/distributor/distributors';
import Reps from '../pages/reps/reps';
import Show404 from '../pages/error/404';
import * as routes from '../routes';
import Blog from '../pages/blog/blog';
import AllProductCategories from '../pages/product/productCategory/allProductCategories';


export default function Main() {
  return (
    <>
      <Switch>
        <Route exact path={routes.INDEX} component={Home} />
        <Route path={routes.LOGIN} component={Login} />
        <Route path={routes.DIST} component={Distributors} />
        <Route path={routes.REPS} component={Reps} />
        <AuthRoute path={routes.MY_HAGER} component={MyHager} />
        <Route path={routes.PRODUCT_ITEM} component={ProductItem} />
        <Route path={routes.PRODUCT_CATEGORY} component={ProductCategory} />
        <Route path={routes.PRODUCTS} component={AllProductCategories} />
        <Route path={routes.ERROR} component={Show404} />
        <Route exact path={routes.ACCESS_CONTROL} component={AccessControl} />
        <Route path={routes.BLOG} component={Blog} />
        <Route component={Content} />
        
        
        
      </Switch>
    </>
  );
}
