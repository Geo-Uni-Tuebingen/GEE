// Preparation
// 1. Create a polygon (named geometry) to define your study area, ideally over an agricultural area
// 2a. Create a new geometry (+new layer) and digitize a landuse or landcover class,
// 2b. Edit its properties (gear icon) and change it from "Geometry" to "Feature" 
// 2c. Click "Add property" and enter _label_ in the first column and a name in the second. Confirm with "OK"
// 3. Repeat step 2 (+ new layer) with two additional classes 

// import S1 collection and select VH
var S1 = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
.select(['VH'])
.filterDate('2019-01-01', '2019-12-31')
.filterBounds(geometry);

print(S1)

// center the map
Map.centerObject(geometry)

// define the regions of interest
var regions1 = new ee.FeatureCollection([corn, annual_crop, pasture]);


Map.addLayer(S1, {min:-30, max:-5}, 'Sentinel-1 VH');

// define the colors of the lines in the chart
var COLOR = {
  Cov1: 'ff0000',
  Cov2: '0000ff',
  Cov3: '00ff00', 
  Cov4: "000000", 
  Cov5: "000000",
  Cov6: "000FF0"
};

// show the S1-HV time series chart for each vegetation type
var sfTimeSeries1 =
    Chart.image.seriesByRegion(S1, regions1, ee.Reducer.mean(),'VH', 30, 'system:time_start', 'label')
.setChartType('LineChart')
.setOptions({
  title: 'S1 VH averages over sugarcane, annual crop and pasture',
          vAxis: {title: 'VH [dB]',
          viewWindowMode:'explicit',
          viewWindow:{
            min:  -25, 
            max:  -10
          },
          },
          lineWidth: 1,
          pointSize: 3,
          series: {
              0: {color: COLOR.Cov1},
              1: {color: COLOR.Cov2},
              2: {color: COLOR.Cov3},
              3: {color: COLOR.Cov4}
}});


print(sfTimeSeries1);
