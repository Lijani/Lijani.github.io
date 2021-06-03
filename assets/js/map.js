mapboxgl.accessToken = 'pk.eyJ1IjoibGlqYW5pdndkdiIsImEiOiJja3A5empuNWIwcDlrMm9ueHMxeWczeTFxIn0.w60QFLlFGMi57Yhoyw_kUg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [28, -26], // starting position
    zoom: 9 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.on('mousemove', function (e) {
    document.getElementById('info').innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        JSON.stringify(e.point) +
        '<br />' +
        // e.lngLat is the longitude, latitude geographical position of the event
        JSON.stringify(e.lngLat.wrap());
});

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);


map.on('load', function () {
    // Add an image to use as a custom marker
    map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('custom-marker', image);
            
            map.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': 
                                    [28.435, -25.685]
                            },
                            'properties': {
                                'title': 'Mamelodi'
                            }
                        },
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [28.0508, -25.7578]
                            },
                            'properties': {
                                'title': 'Atteridgeville'
                            }
                        },
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates':
                                    [27.2914, -26.2348]
                            },
                            'properties': {
                                'title': 'Soweto'
                            }
                        },
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates':
                                    [28.42719, -26.13936]
                            },
                            'properties': {
                                'title': 'Daveyton'
                            }
                        },

                    ]
                }
            });

            // Add a symbol layer
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'icon-image': 'custom-marker',
                    // get the title name from the source's "title" property
                    'text-field': ['get', 'title'],
                    'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                    ],
                    'text-offset': [0, 1.25],
                    'text-anchor': 'top'
                }
            });
        }
    );
});




