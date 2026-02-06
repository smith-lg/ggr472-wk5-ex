mapboxgl.accessToken = 'pk.eyJ1IjoibGdzbWl0aCIsImEiOiJja29uNGs1cmYwYnN2MnBwMzM2cDQyN2NrIn0.lZvjUUK8Pc2JDq0tuSRrKQ'; //Add default public map token from your Mapbox account

const map = new mapboxgl.Map({
    container: 'my-map', // map container ID
    style: 'mapbox://styles/lgsmith/cls22i48i01qd01p14y5x9a6s', //style URL
    // alternatively you can use mapbox-owned style from https://docs.mapbox.com/api/maps/styles/#mapbox-styles
    center: [-79.39, 43.66], // starting position [lng, lat]
    zoom: 12, // starting zoom
});

//Listen for load event, once map finishes loading, trigger the following functions
map.on('load', () => {

// 1. ADD DATA SOURCES
    // Add a data source containing GeoJSON data
    // Data from GeoJSON file can be pasted directly into the data property but this will get messy very quickly!
    map.addSource('uoft-ss-data', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "Sidney Smith Hall"
                    },
                    "geometry": {
                        "coordinates": [
                            -79.39865237301687,
                            43.662343395037766
                        ],
                        "type": "Point"
                    }
                }
            ]
        }
    });

    // Add a data source from a GeoJSON file
    // Alternative (and better) approach is to point to your data via URL
    map.addSource('uoft-buildings-data', {
        type: 'geojson',
        data: 'https://smith-lg.github.io/ggr472-wk5-ex/data/buildings.geojson'
        // Format for raw data link in online repo whilst still working on website - 'https://raw.githubusercontent.com/yourusername/respoitoryname/main/yourfile.geojson'
        // Update to following format once website is published - //'https://yourusername.github.io/repositoryname/yourfile.geojson'
    });

    // Add a data source from a Mapbox tileset
    map.addSource('toronto-ct-data', { // Create your own source ID
        type: 'vector',
        url: 'mapbox://lgsmith.3oqn8y6b' // Update to your mapbox tileset ID
    });

// 2. VISUALIZE DATA LAYERS
    map.addLayer({
        'id': 'uoft-ss-pnt',
        'type': 'circle',
        'source': 'uoft-ss-data',
        'paint': {
            'circle-radius': 6,
            'circle-color': '#B42222'
        }
    });

    map.addLayer({
        id: 'buildings-pnt',
        type: 'circle',
        source: 'uoft-buildings-data',
        paint: {
            'circle-radius': 5,
            'circle-color': '#007cbf'
        }
    });

    map.addLayer({
        id: 'toronto-ct-fill', // Create your own layer ID
        type: 'fill', // Note this is different to point data
        source: 'toronto-ct-data', // Must match source ID from addSource Method
        paint: {
            'fill-color': '#888888', // Test alternative colours and style properties
            'fill-opacity': 0.4,
            'fill-outline-color': 'black'
        },
        'source-layer': 'torontoct-avthxr' // Tileset NAME (diff to ID), get this from mapbox tileset page
    },
        'buildings-pnt'
        // Drawing order - places layer below points
        // Here the addlayer method takes 2 arguments (the layer as an object and a string for another layer's name)
        // If the other layer already exists, the new layer will be drawn before that one
    );


// 3. EXAMPLE FORMATS FOR REFERENCE (INC LABELS)
    // //GeoJSON must direct to URL 
    // map.addSource('your-source-id', {
    //     type: 'geojson',
    //     data: 'https://yourusername.github.io/repositoryname/yourfile.geojson'
    //     //'https://raw.githubusercontent.com/yourusername/respoitoryname/main/yourfile.geojson'
    // });

    // //Draw GeoJSON point geometry as circles
    // map.addLayer({
    //     'id': 'your-layer-id',
    //     'type': 'circle',
    //     'source': 'your-source-id',
    //     'paint': {
    //         'circle-radius': 5,
    //         'circle-color': 'blue'
    //     }
    // });

    // //Draw GeoJSON labels using 'name' property
    // //Note that your GeoJSON may not have the property 'name' but alternatives may be used
    // map.addLayer({
    //     'id': 'your-layer-id',
    //     'type': 'symbol',
    //     'source': 'your-source-id',
    //     'layout': {
    //         'text-field': ['get', 'name'],
    //         'text-variable-anchor': ['bottom'],
    //         'text-radial-offset': 0.5,
    //         'text-justify': 'auto'
    //     }
    // });

});