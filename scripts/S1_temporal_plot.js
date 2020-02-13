// Preparation
// 1. Create a polygon (named geometry) to define your study area, ideally over an agricultural area
// 2a. Create a new geometry (+new layer) and digitize a landuse or landcover class,
// 2b. Edit its properties (gear icon): Enter a name and change it from "Geometry" to "Feature" 
// 2c. Click "Add property" and enter label in the first column and a name in the second. Confirm with "OK"
// 3. Repeat step 2 (+ new layer) with two additional classes 

// import S1 collection and select VH
var S1 = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
.select(['VH'])
.filterDate('2019-01-01', '2019-12-31')
.filterBounds(geometry);


// Center the map
Map.centerObject(geometry)

// Create variable for all points
var regions1 = new ee.FeatureCollection([corn, annual_crop, pasture]); // use the class names of the polygons here

// Add one layer to the map
Map.addLayer(S1, {min:-30, max:-5}, 'Sentinel-1 VH');


// show the S1-HV time series chart for each vegetation type
var S1_timeseries =
    Chart.image.seriesByRegion(S1, regions1, ee.Reducer.mean(),'VH', 30, 'system:time_start', 'label')
    .setChartType('LineChart')
    .setOptions({
    title: 'S1 VH averages over sugarcane, annual crop and pasture', // adjust the title according to the class names
          vAxis: {title: 'VH [dB]',
          viewWindowMode:'explicit',
          viewWindow:{
            min:  -30, 
            max:  -10}},
          lineWidth: 1,
          pointSize: 2,
          series: {
              0: {color: 'ff0000'},
              1: {color: '0000ff'},
              2: {color: '00ff00'}}});


print(S1_timeseries);
