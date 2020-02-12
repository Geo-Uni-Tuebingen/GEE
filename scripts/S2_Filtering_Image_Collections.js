// Filtering Image Collections. 
// Define Image Collection for time series.
// Filter for Images between certain dates, that are within a specific geometry, have less then 10 % cloud coverage and are lying within the tile '55HGA'.
var imgColTimeSeries = ee.ImageCollection('COPERNICUS/S2_SR')
.filterDate('2019-01-01', '2020-02-01')
.filterBounds(point)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
.filter(ee.Filter.eq('MGRS_TILE', '55HGA'))
.select('B12');
print('Image Collection for time series', imgColTimeSeries);


// To be able to select certain Images from that Image Collection, it first needs to be transformed into a list.
// Prepare Image Collection to select Images from.
var imgColTimeSeriesList = imgColTimeSeries.toList(imgColTimeSeries.size());
var imageFrom_imgColTimeSeries = ee.Image(imgColTimeSeriesList.get(1));
print('image selected from image collection', imageFrom_imgColTimeSeries);
