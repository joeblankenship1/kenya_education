(function(){
    // Create an account with MapBox to get a token, paste between ' ' below
    L.mapbox.accessToken = 'pk.eyJ1Ijoiam9lYmxhbmtlbnNoaXAxIiwiYSI6ImNqZGRjY2F3ZjAwNTMyd3FoOG83c3A4aWsifQ.bXiHMzyYHgFukGwVPUddAw';
    // Define the MapBox object for our map
    // adjust center and zoom as needed to accomodate data extent
    var map = L.mapbox.map('map', 'mapbox.light', {
        zoomSnap: .1,
        center: [-.23, 37.8],
        zoom: 6.5,
        minZoom: 5,
        maxZoom: 9,
        maxBounds: L.latLngBounds([-6.22, 27.72],[5.76, 47.83])
    });

    // create Leaflet control for the legend
    var legendControl = L.control({
        position: 'bottomright'
    });

    // when the control is added to the map
    legendControl.onAdd = function (map) {

        // select the legend using id attribute of legend
        var legend = L.DomUtil.get("legend");

        // disable scroll and click functionality
        L.DomEvent.disableScrollPropagation(legend);
        L.DomEvent.disableClickPropagation(legend);

        // return the selection
        return legend;

    }
    // add legend to map
    legendControl.addTo(map);

    // do the same thing for the UI slider
    var sliderControl = L.control({
        position: 'bottomleft'
    });

    sliderControl.onAdd = function(map) {
        // select the slider using id attribute of slider
        var controls = L.DomUtil.get("slider");
        // disable scroll and click functionality
        L.DomEvent.disableScrollPropagation(controls);
        L.DomEvent.disableClickPropagation(controls);
        // return the selection
        return controls;

    }
    // add slider to map
    sliderControl.addTo(map);
    // use MapBox omnivore to add our kenya data to the map
    omnivore.csv('data/kenya_education_2014.csv').addTo(map);
    // if there is an error loading the CSV data, log the error to console
    omnivore.csv('data/kenya_education_2014.csv')
        .on('ready', function(e) {
            console.log(e.target)
        })
        .on('error', function(e) {
            console.log(e.error[0].message);
    });

})();
