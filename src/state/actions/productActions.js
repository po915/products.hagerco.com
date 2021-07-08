export default function ProductActions(state, dispatch, backend) {
    async function fetchImages(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = await backend.products.getProductResource(arr[i]);
        }
    }
    const fetchItemDetails = async (id) => {
        try {
            const itemDetails = await backend.products.getItemDetails(id);
            const parentCategoryDetails = await backend.products.getCategoryDetails(itemDetails.categories[0].id);

            itemDetails.breadcrumb = [
                { name: 'Products', href: '/products' },
                { name: parentCategoryDetails.parent[0].name, href: `/productCategory/${parentCategoryDetails.parent[0].id}` },
                { name: parentCategoryDetails.name, href: `/productCategory/${parentCategoryDetails.id}` },
                { name: itemDetails.name, href: itemDetails.id },
            ];
            itemDetails.showFunctions = false;
            itemDetails.showAccessories = false;

            if (itemDetails.hasOwnProperty("categories")) {
                var hasParent = true;
                var parentId = itemDetails.categories[0].id;
                var parentDetails = null;

                while (hasParent) {
                    parentDetails = await backend.products.getCategoryDetails(parentId)
                    if (parentDetails.hasOwnProperty("parent") === true) {
                        parentId = parentDetails.parent[0].id
                    } else {
                        hasParent = false
                    }
                }

                dispatch({ type: 'SET_PRODUCT_ITEM_TOP_LEVEL_CATEGORY', payload: parentDetails })
            }
            if (itemDetails.hasOwnProperty("certificationImages")) {

                const certUrls = await Promise.all(itemDetails.certificationImages.map(async (image) => {
                    const imageUrl = await backend.image.getImageURL(image)
                    return imageUrl
                }))

                itemDetails.certifications = certUrls

                dispatch({ type: 'SET_PRODUCT_ITEM_CERT_IMAGES', payload: certUrls })
            }

            dispatch({ type: 'SET_PRODUCT_ITEM_DETAILS', payload: { status: true, itemDetails } });

        } catch (e) {
            // console.log(e)

            dispatch({ type: 'SET_PRODUCT_ITEM_DETAILS', payload: { status: false, itemDetails: null } });
        }
    };

    const fetchCategoryItems = async (id) => {
        try {
            const categoryItems = await backend.products.getCategoryItems(id);

            for (let i = 0; i < categoryItems.result.length; i++) {
                if (categoryItems.result[i].images !== undefined) {
                    await fetchImages(categoryItems.result[i].images);
                }
            }

            if (categoryItems.hasOwnProperty("result")) {
                categoryItems.result.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
            }


            dispatch({ type: 'SET_CATEGORY_ITEMS', payload: { categoryItems: categoryItems.result } });
        } catch (e) {
            dispatch({ type: 'SET_CATEGORY_ITEMS', payload: { categoryItems: null } });
        }
    };

    const fetchCategories = async () => {
        try {
            const productCategories = await backend.products.getCategories();
            dispatch({ type: 'SET_PRODUCT_CATEGORIES', payload: { categories: productCategories.result } });
        } catch (e) {
            dispatch({ type: 'SET_PRODUCT_CATEGORIES', payload: { categories: null } });
        }
    };

    const fetchParentCategories = async () => {
        try {
            const parentCategories = await backend.products.getParentCategories();
            dispatch({ type: 'SET_PARENT_PRODUCT_CATEGORIES', payload: { parentCategories: parentCategories } });
        } catch (e) {
            dispatch({ type: 'SET_PARENT_PRODUCT_CATEGORIES', payload: { parentCategories: null } });
        }
    };

    const fetchCertificationImages = async () => {
        try {
            const parentCategories = await backend.products.getParentCategories();
            dispatch({ type: 'SET_PARENT_PRODUCT_CATEGORIES', payload: { parentCategories: parentCategories } });
        } catch (e) {
            dispatch({ type: 'SET_PARENT_PRODUCT_CATEGORIES', payload: { parentCategories: null } });
        }
    }

    const fetchCategoryDetails = async (id, previous) => {
        try {
            const categoryDetails = await backend.products.getCategoryDetails(id);

            var parentItem = null

            if (categoryDetails.hasOwnProperty("children")) {
                categoryDetails.children.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
            }

            // If this product category has no parent
            if (categoryDetails.parent === undefined || categoryDetails.parent === null) {
                categoryDetails.breadcrumb = [
                    { name: 'Products', href: '/products' },
                    { name: `${categoryDetails.name}`, href: `${id}` }
                ]
            } else {
                if (categoryDetails.parent.length > 0) {
                    if (previous !== null && previous !== undefined) {
                        const parentIndex = categoryDetails.parent.findIndex(val => {
                            return val.id == previous
                        })

                        if (parentIndex > -1) {
                            parentItem = categoryDetails.parent[parentIndex]
                        } else {
                            parentItem = categoryDetails.parent[0]
                        }

                        categoryDetails.breadcrumb = [
                            { name: 'Products', href: '/products' },
                            { name: `${parentItem.name}`, href: `${parentItem.id}` },
                            { name: `${categoryDetails.name}`, href: `${id}` }
                        ];
                    } else {

                        parentItem = categoryDetails.parent[0]


                        categoryDetails.breadcrumb = [
                            { name: 'Products', href: '/products' },
                            { name: `${parentItem.name}`, href: `${parentItem.id}` },
                            { name: `${categoryDetails.name}`, href: `${id}` }
                        ];
                    }

                } else if (typeof categoryDetails.parent === 'object') {
                    parentItem = categoryDetails.parent

                    categoryDetails.breadcrumb = [
                        { name: 'Products', href: '/products' },
                        { name: `${parentItem.name}`, href: `${parentItem.id}` },
                        { name: `${categoryDetails.name}`, href: `${id}` }
                    ];
                }


            }

            dispatch({ type: 'SET_PRODUCT_CATEGORY_DETAILS', payload: { categoryDetails } });
        } catch (e) {
            dispatch({ type: 'SET_PRODUCT_CATEGORY_DETAILS', payload: { categoryDetails: null } });
        }
    };

    const fetchProductItems = async (itemArr) => {
        try {
            const productItems = [];
            for (let i = 0; i < itemArr.length; i++) {
                const productItem = await backend.products.getProductItem(itemArr[i]);
                if (productItem[i].images !== undefined) {
                    await fetchImages(productItem[i].images);
                }
                productItems.push(productItem);
            }
            dispatch({ type: 'SET_PRODUCT_ITEMS', payload: { productItems } });
        } catch (e) {
            dispatch({ type: 'SET_PRODUCT_ITEMS', payload: { productItems: null } });
        }
    };

    return {
        fetchItemDetails,
        fetchCategories,
        fetchParentCategories,
        fetchCategoryDetails,
        fetchCategoryItems,
        fetchProductItems
    };
}

