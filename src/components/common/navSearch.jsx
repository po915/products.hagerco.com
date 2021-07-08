import React, { useContext, useEffect } from 'react';

import HagerNavbar from "./hagerNavbar"
import SearchResults from "./searchResults"

export default function NavSearch() {
    return (
        <>
            <HagerNavbar />
            <SearchResults />
        </>
    )
}