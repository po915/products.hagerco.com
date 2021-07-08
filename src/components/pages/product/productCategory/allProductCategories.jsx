import React, { useContext, useEffect } from "react"
import { StoreContext } from "../../../../state/StoreContext"
//import ProductCategoryTile from './productCategoryTile';
import ErrorRedirect from "../../error/errorRedirect"
import Loading from "../../loading/loading"
import { Link } from "react-router-dom"
import * as routes from "../../../routes"

export default function AllProductCategories({ location }) {
  const { state, actions, dispatch, ...rest } = useContext(StoreContext)

  useEffect(() => {
    actions.products.fetchParentCategories().then(() => {
      dispatch({ type: "SET_PRODUCT_LOADING", payload: { loading: false } })
    })
    return () => {
      dispatch({
        type: "SET_PARENT_PRODUCT_CATEGORIES",
        payload: { parentCategories: null },
      })
    }
  }, [location.pathname])
  const productsState = state.get("products").toJS()

  if (productsState === null && !productsState.loading) {
    return <></>
  } else if (productsState === null) {
    return ErrorRedirect(location)
  } else if (productsState.loading) {
    document.title = "Loading..."
    return <Loading />
  }
  const parentCategories = productsState.parentCategories

  if (parentCategories !== undefined && parentCategories !== null) {
    return (
      <>
        <section
          className="hc-section text-light"
          data-stellar-background-ratio=".5"
          style={{ backgroundImage: `url(./public/images/room-1.jpg)` }}>
          <span className="overlay"></span>
          <div className="container-fluid">
            <h1 className="red-bar-above mb-0">Products</h1>
          </div>
        </section>
        <section className="hc-section">
          <div className="container-fluid">
            <ListCategories categoryList={parentCategories} />
          </div>
        </section>
      </>
    )
  } else {
    document.title = "Loading..."
    return <Loading />
  }
}

function ListCategories(categoryList) {
  var renderedList = []
  if (categoryList !== undefined) {
    for (let i = 0; i < categoryList.categoryList.length; i++) {
      if (categoryList.categoryList[i].images !== null) {
        renderedList.push(
          <ProductCategoryTile
            key={categoryList.categoryList[i].id}
            category={categoryList.categoryList[i]}
          />
        )
      }
    }
  }
  if (renderedList === undefined) {
    return <></>
  }
  if (renderedList !== undefined) {
    return (
      <div className="row">
        <div className="col-xl-12 col-md-12 col-sm-12">
          <div className="row">{renderedList}</div>
        </div>
        {/* <div className="col-xl-3 col-md-3 col-sm-12">
                    <div className="jumbotron jumbotron-fluid" data-stellar-background-ratio=".5" style={{ backgroundImage: `url(./public/images/room-1.jpg)` }}>
                        <div className="callout">
                            <h4 className="mb-3">Announcement</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam. Duis aute irure dolor in reprehenderit.</p>
                            <a href="#" className="btn btn-primary mt-3">Learn More</a>
                        </div>
                    </div>
                </div> */}
      </div>
    )
  } else if (categoryList === undefined) {
    return <></>
  }
}

function ProductCategoryTile({ category }) {
  const href = routes.PRODUCT_CATEGORY.replace(":id", category.id)

  if (category.mainImages !== undefined) {
    return (
      <div className="col-xl-4 col-md-6 col-sm-6 col-12 mb-4">
        <Link to={href} className="hc-card-image-wrapper">
          <div
            className="hc-card-image"
            data-stellar-background-ratio=".5"
            style={{ backgroundImage: `url(${category.mainImages[0]})` }}>
            <div className="overlay">
              <div className="hc-card-title-wrapper">
                <div className="hc-card-title">
                  <h5>{category.name}</h5>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  } else {
    return (
      <div className="col-xl-4 col-6 mb-4">
        <Link to={href} className="hc-card-image-wrapper">
          <div className="hc-card-image" data-stellar-background-ratio=".5">
            <div className="overlay">
              <div className="hc-card-title-wrapper">
                <div className="hc-card-title">
                  <h5>{category.name}</h5>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}
