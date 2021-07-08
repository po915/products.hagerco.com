import * as db from './staticDb';

export default function CenshareBackend() {
    const baseURL = 'https://onlinechannel.hagerco.com/hcms/v1.11/entity';
    const graphURL = 'https://onlinechannel.hagerco.com/hcms/v1.11/graphql';
    // const searchURL = 'https://onlinechannel.hagerco.com/hcms/v1.11/query';

    const fetchResource = async url => fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(Error('Error retrieving data from Censhare API.'));
    }).catch(error => {
        Promise.reject(error)
    });
    const fetchEndpoint = endpoint => fetchResource(`${baseURL}/${endpoint}`);
    const fetchGraphQL = endpoint => fetchResource(`${graphURL}'/${endpoint}`);

    // Navbar related calls
    const navbar = () => { };

    const image = () => {
        const endpoints = {
            image: id => `image?query=${id}`
        };
        const getImage = id => fetchEndpoint(endpoints.image(id));
        const getImageURL = (id) => fetchResource(id);
        return {
            getImage,
            getImageURL
        };
    };
    // Home page related calls
    const home = () => {
        const getProductImages = () => db.featuredProducts;
        const getProjectImages = () => db.projectImages;
        const getNewsImages = () => ({ images: db.newsImages, featured: db.featuredNewsImages });
        const getCarousel = () => db.carouselItems;

        return {
            getProductImages,
            getProjectImages,
            getNewsImages,
            getCarousel,
        };
    };

    // Product related calls
    const products = () => {
        const endpoints = {
            categories: () => 'productCategory?limit=1000&order=name',
            categoryDetails: id => `productCategory/${id}`,
            categoryItems: id => `product?query=categories.id=${id}&limit=1000&order=name`,
            itemDetails: id => `product/${id}`,
            productItem: id => `productItem/${id}`
        };

        const graphEndpoints = {
            categories: () => ''
        }

        const getParentCategories = async () => {
            const categories = await fetchEndpoint(endpoints.categories());
            var parentCategories = [];
            for (let i = 0; i < categories.result.length; i++) {
                var cate = categories.result[i]
                if (!cate.hasOwnProperty('parent')) {
                    parentCategories.push(cate);
                }
            }
            return parentCategories;
        };
        const getCategories = () => fetchEndpoint(endpoints.categories());
        const getCategoryDetails = id => fetchEndpoint(endpoints.categoryDetails(id));
        const getCategoryItems = id => fetchEndpoint(endpoints.categoryItems(id));
        const getItemDetails = id => fetchEndpoint(endpoints.itemDetails(id));
        const getProductItem = id => fetchEndpoint(endpoints.productItem(id));
        const getProductResource = url => fetchResource(url);

        return {
            getParentCategories,
            getCategories,
            getCategoryDetails,
            getCategoryItems,
            getItemDetails,
            getProductItem,
            getProductResource
        };
    };

    // Article content related calls
    const content = () => {
        const endpoints = {
            article: path => `article?query=url="${path}"`,
            categoryID: category => `articleCategory?query=name="${category}"`,
            categoryArticles: categoryID => `articleCategory/${categoryID}`,
        };

        const getArticle = path => fetchEndpoint(endpoints.article(path));
        const getCategoryID = category => fetchEndpoint(endpoints.categoryID(category));
        const getCategoryArticles = categoryID => fetchEndpoint(endpoints.categoryArticles(categoryID));
        const getContentLink = contentURL => fetchResource(contentURL);

        return {
            getArticle,
            getCategoryID,
            getCategoryArticles,
            getContentLink,
        };
    };


    // Distributor related calls
    const distributors = () => {
        const endpoints = {
            distributors: () => `distributor?limit=1000`
        };

        const getDistributors = () => fetchEndpoint(endpoints.distributors());

        return {
            getDistributors
        };
    };

    // Distributor related calls
    const reps = () => {
        const endpoints = {
            locations: (zipcode) => `location/?query=name=${zipcode}`,
            reps: () => `representative?limit=1000`
        };

        const getReps = () => fetchEndpoint(endpoints.reps());

        const searchReps = (zipcode) => fetchEndpoint(endpoints.locations(zipcode));

        return {
            getReps,
            searchReps
        };
    };

    const search = () => {
        const endpoints = {
            products: term => `product?query=$text("censhare:text.meta", "${term}", "en")`,
            documents: term => `document?query=$text("censhare:text.meta", "${term}", "en")`
        }

        const searchProducts = (term) => fetchEndpoint(endpoints.products(term))
        const searchDocuments = (term) => fetchEndpoint(endpoints.documents(term))

        return {
            searchProducts,
            searchDocuments
        }
    }

    return {
        distributors: distributors(),
        reps: reps(),
        navbar: navbar(),
        home: home(),
        products: products(),
        content: content(),
        image: image(),
        search: search()
    };
}
