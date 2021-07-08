import React, { useContext, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { StoreContext } from '../../../state/StoreContext';

const MILE_TO_METER = 1609;

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();

    places.forEach((place) => {

        if (typeof place.coordinates !== "undefined") {
            bounds.extend(new maps.LatLng(
                place.coordinates.lat,
                place.coordinates.lng,
            ));
        }
    });
    return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
        maps.event.addDomListener(window, 'resize', () => {
            map.fitBounds(bounds);
        });
    });
};


function EmbededMap(props) {
    const { center, radius, mapState, placesList, setMap, setGooglemaps, map, googlemaps, stateKey } = props;

    const [circle, setCircle] = useState();

    useEffect(() => {
        if (placesList.length > 0) {
            apiIsLoaded(map, googlemaps, placesList, stateKey);
        }
    }, [placesList]);

    const apiIsLoaded = (map, maps, placesList, stateKey) => {
        if (map && maps) {
            // Set map and maps as state in parent component
            setMap(map);
            setGooglemaps(maps);

            if (placesList.length > 0) {
                zoomToBoundsOfPlaces(map, maps, placesList);
                placeMarkers(map, maps, placesList, stateKey);
            }
        }
    };

    const zoomToBoundsOfPlaces = (map, maps, places) => {
        // Get bounds by our places
        const bounds = getMapBounds(map, maps, places);
        // Fit map to bounds
        map.fitBounds(bounds);
        // Bind the resize listener
        bindResizeListener(map, maps, bounds);
    }

    const formatInfoWindowContent = (item, stateKey) => {
        var content = ""

        if (stateKey === "distributors") {
            content =
                '<h6>' + item.name + '</h6>' +
                '<div>' + item.address.street + '</div>' +
                '<div>' + item.address.city + ', ' + item.address.state + ', ' + item.address.zip + '</div>' +
                '<br />'
        } else {
            content =
                '<h6>' + item.name + '</h6>' +
                '<div>' + item.address.city + ', ' + item.address.state + ', ' + item.address.zip + '</div>' +
                '<br />'
        }

        if (item.phone.hasOwnProperty('Communication_phone')) {
            for (const [index, entry] of item.phone.Communication_phone.entries()) {
                let addressType = entry.Address_type[0].toUpperCase() + entry.Address_type.substring(1)
                content = content + '<div>' + addressType + ': ' + entry.Telephone_number + '</div>'
            }
        } else {
            content = content + '<div>' + item.phone + '</div>'
        }

        if (item.website) {
            content += '<a href="' + item.website + '">' + item.website + '</a>'
        }

        if (item.email) {
            content += '<a href="mailto: ' + item.email + '">' + item.email + '</a>'
        }

        return content
    }

    const placeMarkers = (map, maps, list, stateKey) => {
        list.forEach((item) => {

            if (typeof item.coordinates !== "undefined") {
                const latLng = new maps.LatLng(
                    item.coordinates.lat,
                    item.coordinates.lng,
                );
                const marker = new maps.Marker({
                    position: latLng,
                    map: map,
                    title: item.name
                });

                var infowindow = new google.maps.InfoWindow({
                    content: formatInfoWindowContent(item, stateKey)
                });

                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });
            }

        })
    }

    const addCircleToMap = (map, center, radius) => {
        const radiusInMeters = MILE_TO_METER * radius;

        var radiusCircle = new google.maps.Circle({
            strokeColor: "#0000A0",
            strokeOpacity: 0.6,
            strokeWeight: 2,
            fillColor: "#ADD8E6",
            fillOpacity: 0.5,
            map: map,
            center: center,
            radius: radiusInMeters
        });

        // zoom map out to fit the bounds of the circle
        map.fitBounds(radiusCircle.getBounds());

        // so we can have a reference in state to clear it later
        setCircle(radiusCircle);
    }

    useEffect(() => {
        if (props.map && props.googlemaps) {
            // clear out all circles
            if (circle) {
                circle.setMap(null);
                setCircle(null);
            }

            if (center && radius) {
                props.map.setCenter(center);
                addCircleToMap(props.map, center, radius);
                // filterDistributors(results[0].geometry.location, radius);
            } else {
                // if the center is null, we want to zoom back out to fit everything 
                zoomToBoundsOfPlaces(props.map, props.googlemaps, placesList);
            }
        }
        // This param tells react not to re-render if center doesn't change
    }, [center, radius])


    return (
        <div className="distributor-map">
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GMAPS_API_KEY,
                    language: 'en',
                    libraries: 'geometry'
                }}
                defaultCenter={mapState.center}
                // center={center}
                hoverDistance={20}
                defaultZoom={8}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, placesList)}
            >
            </GoogleMapReact>
        </div>
    )
}




const MapMarker = (props) => {

    const style = {
        color: '#e48873',
    };

    const hoverStyle = {
        ...style,
        color: '#f44336',
    };

    const markerStyle = props.$hover ? hoverStyle : style;

    return (
        <FontAwesomeIcon icon={faMapMarker} size={'2x'} style={markerStyle}>{props.name}</FontAwesomeIcon>
    )
};

function MapSearch(props) {
    const { searchQuery, setSearchQuery, radius, setRadius } = props;

    useEffect(() => {

    }, [searchQuery]);

    const handleKeyDown = (e) => {
        if (e.keyCode == 13) {
            if (e.target.value == '') {
                setSearchQuery(null);
            } else {
                setSearchQuery(e.target.value);
            }
        }
    }

    const handleRadiusChange = (e) => {
        setRadius(e.target.value);
    }

    const handleSearchClear = (e) => {
        if (e.target.value == "") {
            setSearchQuery(null);
        }
    }

    return (
        <div className="mb-4">
            <div className="row">
                <div className="col-12 col-sm-8 map-controls">
                    <label>Enter City, State or Zip Code</label>
                    <input type="search" className="form-control" onKeyDown={(e) => handleKeyDown(e)} onInput={(e) => handleSearchClear(e)} placeholder="Enter City, State or Zip Code..." />
                </div>
                <div className="col-12 col-sm-4 map-controls">
                    <label>Select Radius</label>
                    <select className="form-control" value={radius} onChange={(e) => handleRadiusChange(e)}>
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                        <option>40</option>
                        <option>100</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

function MapListItem({ item, stateKey }) {

    const phoneNums = [];
    const badges = [];

    if (item.phone.hasOwnProperty('Communication_phone')) {
        for (const [index, entry] of item.phone.Communication_phone.entries()) {
            phoneNums.push(<div key={index} className="text-secondary">{entry.Address_type[0].toUpperCase() + entry.Address_type.substring(1)}: {entry.Telephone_number}</div>)
        }
    } else {
        phoneNums.push(<p key={0} className="text-secondary mb-0">{item.phone}</p>)
    }

    if (item.hasOwnProperty('sellerType')) {
        for (const [index, entry] of item.sellerType.entries()) {
            const formattedType = ""
            switch (entry) {
                case "commercial":
                    formattedType = "Commercial"
                    break;
                case "residential":
                    formattedType = "Residential"
                    break;
                case "archSpecCon":
                    formattedType = "Architechtural"
                    break;
                default:
                    formattedType = entry
            }
            badges.push(<span key={index} className="badge bg-primary mr-1 rep-type-badge">{formattedType}</span>)
        }
    }

    return (
        <div className="distributor">
            <p className="display-4 mb-0">{item.name}</p>
            <div>
                {badges}
            </div>
            <address className="mb-0">
                {
                    stateKey === "distributors" &&
                    <div>{item.address.street}</div>
                }
                <div>{item.address.city}, {item.address.state}, {item.address.country} {item.address.zip}</div>
            </address>
            <div>
                {phoneNums}
            </div>
            <p className="mb-0"><a href={"//" + item.website} target="_blank">{item.website}</a></p>
            <p><a href={"mailto: " + item.email}>{item.email}</a></p>
        </div>
    )
}

function MapList({ placesList, stateKey }) {
    return (
        <div className="distributor-list">
            {
                placesList.map((item, key) =>
                    <MapListItem key={key} item={item} stateKey={stateKey}/>
                )
            }
        </div>
    )
}


function MapPane({ fetchPlaces, stateKey }) {
    const { state, actions, dispatch, ...rest } = useContext(StoreContext);
    const mapState = state.get('map').toJS();
    const placesState = state.get(stateKey).toJS();
    const placesList = placesState.list ? placesState.list : [];

    const [map, setMap] = useState();
    const [googlemaps, setGooglemaps] = useState();

    const [searchQuery, setSearchQuery] = useState();
    const [filteredPlaces, setFilteredPlaces] = useState();
    const [radius, setRadius] = useState(40);
    const [center, setCenter] = useState();

    useEffect(() => {
        // Pass this function in as a prop
        // actions.distributors.fetchDistributors();
        fetchPlaces()
    }, []);

    useEffect(() => {
        // When the search term is set, run the geocoding query
        if (searchQuery) {
            searchForLocation(searchQuery);
        } else {
            // If there is no search term, we set the center back to null
            // we also clear out the filtered distributors list
            setCenter(null);
            setFilteredPlaces(null);
        }

    }, [searchQuery]);

    useEffect(() => {
        // When the center is set, we run our filter
        if (center && radius) {
            filterPlacesByRadius(center, radius)
        } else {

        }

    }, [center, radius]);

    // Take in a query, and return a geocoded cordinate
    // set the coordinate as state
    const searchForLocation = (query) => {
        if (map && googlemaps && query) {
            const Geocoder = new googlemaps.Geocoder();

            const request = {
                'address': query
            };

            Geocoder.geocode(request, (results, status) => {
                if (status == 'OK') {
                    setCenter(results[0].geometry.location);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            })
        }
    }

    // filter distributors based off of search 
    const filterPlacesByRadius = (center, radius) => {
        const filteredList = [];

        placesList.forEach((item) => {
            if (item.coordinates === undefined) {
                // console.log(item)
                return
            }

            const location = new googlemaps.LatLng(
                item.coordinates.lat,
                item.coordinates.lng,
            )
            const distance = googlemaps.geometry.spherical.computeDistanceBetween(location, center);

            if (distance < radius * MILE_TO_METER) {
                filteredList.push(item);
            }
        })

        setFilteredPlaces(filteredList);
    }

    return (
        <div>
            <MapSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                radius={radius}
                setRadius={setRadius}
            />
            <div className="distributor-locator">
                <div className="distributor-locator-inner row no-gutter">
                    <div className="col-12 col-sm-4 col-md-3 col-lg-3 distributor-list list-column">
                        <MapList stateKey={stateKey} placesList={filteredPlaces ? filteredPlaces : placesList} />
                    </div>
                    <div className="col-12 col-sm-8 col-md-9 col-lg-9 map-column">
                        <EmbededMap
                            stateKey={stateKey}
                            center={center}
                            radius={radius}
                            map={map}
                            googlemaps={googlemaps}
                            mapState={mapState}
                            setMap={setMap}
                            setGooglemaps={setGooglemaps}
                            placesList={filteredPlaces ? filteredPlaces : placesList}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


function RepsMapPane({ fetchPlaces, stateKey }) {
    const { state, actions, dispatch, ...rest } = useContext(StoreContext);
    const mapState = state.get('map').toJS();
    const placesState = state.get(stateKey).toJS();
    const placesList = placesState.list ? placesState.list : [];

    const repsFilter = state.getIn([stateKey, 'repsFilter']);

    const [map, setMap] = useState();
    const [googlemaps, setGooglemaps] = useState();

    const [searchQuery, setSearchQuery] = useState();
    const [filteredPlaces, setFilteredPlaces] = useState();
    const [radius, setRadius] = useState(40);
    const [center, setCenter] = useState();
    const [zipcode, setZipcode] = useState();

    useEffect(() => {
        fetchPlaces()
    }, []);

    useEffect(() => {
        // When the search term is set, run the geocoding query
        if (searchQuery) {
            searchForLocation(searchQuery);
        } else {
            // If there is no search term, we set the center back to null
            // we also clear out the filtered distributors list
            setCenter(null);
            setFilteredPlaces(null);
            setZipcode(null)
        }

    }, [searchQuery]);


    useEffect(() => {
        if (!zipcode) {
            return 
        }

        actions.reps.searchReps(zipcode)

    }, [zipcode]);


    useEffect(() => {
        if (repsFilter) {
            filterPlacesByZipcode(repsFilter)
        }
    }, [repsFilter]);


    const filterPlacesByZipcode = (filter) => {
        const filtered = placesList.filter( place => filter.includes(place.id) )

        setFilteredPlaces(filtered)
    }
    

    // Take in a query, and return a geocoded cordinate
    // set the coordinate as state
    const searchForLocation = (query) => {
        if (map && googlemaps && query) {
            const Geocoder = new googlemaps.Geocoder();

            const request = {
                'address': query
            };

            Geocoder.geocode(request, (results, status) => {
                if (status == 'OK') {
                    setCenter(results[0].geometry.location);
                    const zipcode = results[0].address_components.find(addr => addr.types[0] === "postal_code").short_name;
                    console.log(zipcode)
                    setZipcode(zipcode)
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            })
        }
    }


    return (
        <div>
            <MapSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                radius={radius}
                setRadius={setRadius}
            />
            <div className="distributor-locator">
                <div className="distributor-locator-inner row no-gutter">
                    <div className="col-12 col-sm-4 col-md-3 col-lg-3 distributor-list list-column">
                        <MapList stateKey={stateKey} placesList={filteredPlaces ? filteredPlaces : placesList} />
                    </div>
                    <div className="col-12 col-sm-8 col-md-9 col-lg-9 map-column">
                        <EmbededMap
                            stateKey={stateKey}
                            center={center}
                            radius={radius}
                            map={map}
                            googlemaps={googlemaps}
                            mapState={mapState}
                            setMap={setMap}
                            setGooglemaps={setGooglemaps}
                            placesList={filteredPlaces ? filteredPlaces : placesList}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export {
    MapPane,
    RepsMapPane
}