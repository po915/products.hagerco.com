import * as routes from "../../components/routes"
import { SECTION_ENUM } from "../../util"

export default function NavbarActions(state, dispatch, backend) {
  const fetchDesignDropdown = async () => {
    try {
      const designMenu = {
        active: {
          level: 0,
        },
        loading: false,
        levels: {
          0: {
            title: "Design",
            links: [],
            linkCols: 1,
            callout: {
              image: "/public/images/knob-2.jpg",
              title: "Something Called Out",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
              href: "#",
            },
          },
        },
      }

      // Fetch article category ID + articles
      const designIDResult = await backend.content.getCategoryID("Design Pros")
      const designID = designIDResult.result[0].id
      const articlesResult = await backend.content.getCategoryArticles(designID)
      for (let i = 0; i < articlesResult.articles.length; i++) {
        const article = articlesResult.articles[i]
        designMenu.levels[0].links.push({
          name: article.name,
          id: article.id,
          href: article.url,
          actionType: null,
          action: null,
        })
      }
      dispatch({ type: "SET_DESIGN_DROPDOWN", payload: { designMenu } })
    } catch (e) {
      dispatch({ type: "SET_DESIGN_DROPDOWN", payload: null })
    }
  }

  const fetchResourcesDropdown = async () => {
    try {
      const resourcesMenu = {
        active: {
          level: 0,
        },
        loading: false,
        levels: {
          0: {
            title: "Resources",
            links: [],
            linkCols: 1,
            callout: {
              image: "/public/images/knob-2.jpg",
              title: "Something Called Out",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
              href: "#",
            },
          },
        },
      }

      // Fetch article category ID + articles
      const resourcesIDResult = await backend.content.getCategoryID("Resources")
      const resourcesID = resourcesIDResult.result[0].id
      const articlesResult = await backend.content.getCategoryArticles(
        resourcesID
      )
      for (let i = 0; i < articlesResult.articles.length; i++) {
        const article = articlesResult.articles[i]
        resourcesMenu.levels[0].links.push({
          name: article.name,
          id: article.id,
          href: article.url,
          actionType: null,
          action: null,
        })
      }
      dispatch({ type: "SET_RESOURCES_DROPDOWN", payload: { resourcesMenu } })
    } catch (e) {
      dispatch({ type: "SET_RESOURCES_DROPDOWN", payload: null })
    }
  }

  const fetchAccessControlDropdown = async () => {
    try {
      const accessMenu = {
        active: {
          level: 0,
        },
        loading: false,
        levels: {
          0: {
            title: "Access Control",
            links: [],
            linkCols: 1,
            callout: {
              image: "/public/images/card-lock.jpg",
              title: "Something Called Out",
              text: "Lorem",
              href: "#",
            },
          },
        },
      }

      const accessIDResult = await backend.content.getCategoryID(
        "Access Control"
      )
      const accessID = accessIDResult.result[0].id
      const articlesResult = await backend.content.getCategoryArticles(accessID)
      for (let i = 0; i < articlesResult.articles.length; i++) {
        const article = articlesResult.articles[i]
        accessMenu.levels[0].links.push({
          name: article.name,
          id: article.id,
          href: article.url,
          actionType: null,
          action: null,
        })
      }
      dispatch({ type: "SET_ACCESS_DROPDOWN", payload: { accessMenu } })
    } catch (e) {
      dispatch({ type: "SET_ACCESS_DROPDOWN", payload: null })
    }
  }

  const fetchProductsDropdown = async () => {
    try {
      // Build product category navbar menu and store in navbar state
      const productsMenu = {
        active: {
          level: 0,
          id: null,
        },
        loading: false,
        levels: {
          0: {
            title: "Hager Products",
            links: [],
            linkCols: 2,
          },
        },
      }

      // Fetch categories, then for each category fetch items and build navbar menu
      const productCategories = await backend.products.getCategories()

      for (let i = 0; i < productCategories.result.length; i++) {
        const category = productCategories.result[i]
        if (!category.hasOwnProperty("parent")) {
          productsMenu.levels[0].links.push({
            name: category.name,
            id: category.id,
            images: category.images,
            href: null,
            actionType: "next_level",
            action: "fetchProductCategoryChildrenDropdown(category.id)",
          })
        }
      }
      dispatch({ type: "SET_PRODUCTS_DROPDOWN", payload: { productsMenu } })
    } catch (e) {
      dispatch({ type: "SET_PRODUCTS_DROPDOWN", payload: null })
    }
  }

  const fetchProductCategoryDropdown = async (categoryID) => {
    const categoryMenu = {
      links: [],
      linkCols: 1,
      backLink: "Back to all products",
      activePreview: null,
    }

    function buildLinks(obj) {
      for (let j = 0; j < obj.length; j++) {
        const item = obj[j]
        const image = "/public/images/icon-search.svg"

        if (Object.prototype.hasOwnProperty.call(item, "mainImages")) {
          image = item.mainImages[0]
        }

        categoryMenu.links.push({
          name: item.name,
          id: item.id,
          image: image,
          text: item.use,
          href: routes.PRODUCT_CATEGORY.replace(":id", item.id),
          actionType: "set_preview",
          linkText: "Go to product page",
        })
      }
    }

    try {
      const category = await backend.products.getCategoryDetails(categoryID)
      categoryMenu.title = category.name

      //this is to differentiate between single line product lines and product families
      if (!Object.prototype.hasOwnProperty.call(category, "children")) {
        const categoryItems = await backend.products.getCategoryItems(
          categoryID
        )
        buildLinks(categoryItems.result)
      } else if (Object.prototype.hasOwnProperty.call(category, "children")) {
        const categoryItems = await backend.products.getCategoryDetails(
          categoryID
        )
        const sortedItems = categoryItems.children.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        )
        buildLinks(sortedItems)
      }
      dispatch({
        type: "SET_PRODUCT_CATEGORY_DROPDOWN",
        payload: { categoryID, categoryMenu },
      })
    } catch (e) {
      dispatch({
        type: "SET_PRODUCT_CATEGORY_DROPDOWN",
        payload: { categoryID, categoryMenu },
      })
    }
  }

  const fetchMegaMenuContent = (section, level, id) => {
    switch (section) {
      case SECTION_ENUM.PRODUCTS:
        switch (level) {
          case 0:
            fetchProductsDropdown()
            break
          case 1:
            fetchProductCategoryDropdown(id)
            break
          default:
            break
        }
        break
      default:
        break
    }
  }

  return {
    fetchDesignDropdown,
    fetchResourcesDropdown,
    fetchAccessControlDropdown,
    fetchMegaMenuContent,
    fetchProductsDropdown,
    fetchProductCategoryDropdown,
  }
}
