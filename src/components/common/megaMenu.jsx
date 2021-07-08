/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { StoreContext } from "../../state/StoreContext"
import MenuLoading from "../pages/loading/menuLoading"

export default function MegaMenu() {
  const { state, dispatch, actions, ...rest } = useContext(StoreContext)
  const navbarState = state.get("navbar").toJS() // Convert navbar state from Immutable Map to JS for easier parsing

  // Get active section from state, don't display megamenu if no active section
  const { activeSection } = navbarState

  if (activeSection == null) {
    return <></>
  }

  // UI functions
  function onLinkClick(e) {
    dispatch({ type: "SET_ACTIVE_SECTION", payload: { section: null } })
  }

  function setActiveLevel(e, nextLevel, id) {
    e.preventDefault()
    dispatch({ type: "SET_ACTIVE_LEVEL", payload: { level: nextLevel, id } })
    dispatch({ type: "SET_BREADCRUMB", payload: { breadcrumb: id } })
  }

  function mouseOverItem(e) {
    dispatch({
      type: "SET_ACTIVE_SECTION",
      payload: { section: activeSection },
    })
  }

  function mouseLeaveItem(e) {
    dispatch({ type: "SET_ACTIVE_SECTION", payload: { section: null } })
  }

  // Get megamenu section + level
  const section = navbarState.dropdownContent[activeSection]
  const activeLevel = section.active.level
  const activeID = section.active.id
  const level = section.levels[activeLevel]

  // Fetch content after initial render if not in state from previous fetch
  useEffect(() => {
    if (
      level === undefined ||
      (activeID !== null && level[activeID] === undefined)
    ) {
      dispatch({
        type: "SET_SECTION_LOADING",
        payload: { section: activeSection },
      })
      actions.navbar.fetchMegaMenuContent(activeSection, activeLevel, activeID)
    }
  }, [activeLevel, activeID])

  // Resets menu to top of the hierarchy when we render
  useEffect(() => {
    const id = null
    dispatch({ type: "SET_ACTIVE_LEVEL", payload: { level: 0, id } })
  }, [])

  // Get menu details from section + level
  let menu
  if (level !== undefined && activeID != null) {
    menu = level[activeID]
  } else {
    menu = level
  }

  // Return loading if state set to loading or cannot find level/menu content in state
  if (section.loading || level === undefined || menu === undefined) {
    return (
      <MenuLoading
        mouseOverItem={mouseOverItem}
        mouseLeaveItem={mouseLeaveItem}
      />
    )
  }

  return (
    <div
      className="megamenu-wrapper"
      onPointerEnter={mouseOverItem}
      onPointerLeave={mouseLeaveItem}>
      <div className="container">
        <div className="megamenu col-md-6">
          <div className="megamenu-inner">
            {activeLevel > 0 ? (
              <a
                href=""
                className="megamenu-back"
                onClick={(e) => setActiveLevel(e, activeLevel - 1, null)}>
                {menu.backLink}
              </a>
            ) : (
              ""
            )}
            <div className="display-2 text-primary mb-4">{menu.title}</div>
            <div className="row">
              {menu.links.length > 0 ? (
                <MegaMenuLinkList
                  links={menu.links}
                  linkCols={menu.linkCols}
                  level={activeLevel}
                  onLinkClick={onLinkClick}
                  setActiveLevel={setActiveLevel}
                />
              ) : (
                <div className="col">No products found for this category.</div>
              )}
              {menu.activePreview != null ? (
                <MegaMenuPreview
                  image={menu.activePreview.image}
                  name={menu.activePreview.name}
                  text={menu.activePreview.text}
                  href={menu.activePreview.href}
                  linktext={menu.activePreview.linkText}
                  onLinkClick={onLinkClick}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MegaMenuLinkList({
  links,
  linkCols,
  level,
  onLinkClick,
  setActiveLevel,
}) {
  const { dispatch, ...rest } = useContext(StoreContext)

  function setActivePreview(e, link) {
    e.preventDefault()
    dispatch({ type: "SET_ACTIVE_PREVIEW", payload: { preview: link } })
  }

  // Set list style
  let colStyle
  let listStyle
  if (linkCols === 1) {
    colStyle = "col-6"
    listStyle = "megamenu-list megamenu-list-divider"
  } else {
    colStyle = "col"
    listStyle = "megamenu-list"
  }

  // Divide links into linkCols columns
  const linkColLength = Math.ceil(links.length / linkCols)
  const splitLinks = []
  for (let i = 0; i < links.length; i += linkColLength) {
    splitLinks.push(links.slice(i, i + linkColLength))
  }

  // Render each column
  return splitLinks.map((lst, i) => (
    <div className={colStyle} key={i}>
      <ul className={listStyle} key={i}>
        {lst.map((link, j) => (
          <li key={j}>
            {(() => {
              switch (link.actionType) {
                case "next_level":
                  return (
                    <a
                      href="#"
                      onClick={(e) => setActiveLevel(e, level + 1, link.id)}>
                      {link.name}
                    </a>
                  )
                case "set_preview":
                  return (
                    <a href="#" onClick={(e) => setActivePreview(e, link)}>
                      {link.name}
                    </a>
                  )
                default:
                  return (
                    <Link to={link.href} onClick={onLinkClick}>
                      {link.name}
                    </Link>
                  )
              }
            })()}
          </li>
        ))}
      </ul>
    </div>
  ))
}

function MegaMenuCallout({ image, title, text, href }) {
  return (
    <div
      className="col megamenu-callout"
      data-stellar-background-ratio=".5"
      style={{ backgroundImage: `url(${image})` }}>
      <div className="overlay" />
      <div className="megamenu-inner text-light">
        <div className="display-3 mt-3 mb-4">{title}</div>
        <p>{text}</p>
        <Link className="btn btn-outline-primary text-light mt-3" to={href}>
          Learn More
        </Link>
      </div>
    </div>
  )
}

function MegaMenuPreview({ image, name, text, href, linktext, onLinkClick }) {
  return (
    <div className="col">
      <div className="d-inline-flex align-items-start">
        <img className="megamenu-preview-img" src={image} alt="..." />
        <div className="megamenu-preview-info ml-4">
          <div className="display-4 red-bar-below mb-3">{name}</div>
          <p>{text}</p>
          <Link className="btn btn-primary" onClick={onLinkClick} to={href}>
            {linktext}
          </Link>
        </div>
      </div>
    </div>
  )
}
