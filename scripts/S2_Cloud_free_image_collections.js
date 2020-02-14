// Cloud-free image collections.
// Demonstrate cloud band of Sentinel-2.
// Load single Sentinel-2 image.
var singleImage = ee.Image('COPERNICUS/S2_SR/20190720T221611_20190720T221605_T60HVC');


// Visualize cloud band and RGB image.
var vizParamsRGB = {bands: ['B4','B3','B2'], max: 1800};
Map.addLayer(singleImage, vizParamsRGB, 'RGB image for cloud mask demonstrration');


// Select pre-processed cloud band.
var cloudBand = singleImage.select('QA60');
Map.addLayer(cloudBand.randomVisualizer(), {}, 'QA60 cloud band');


// Reclassify cloud band to make binary cloud mask.
var cloudMask = cloudBand.remap([0, 1024, 2048], [0, 1, 1]);
Map.addLayer(cloudMask.randomVisualizer(), {}, 'cloud mask derived from QA 60');


// Mask RGB image with created cloud mask.
var singleImageMasked = singleImage.updateMask(cloudMask);
Map.addLayer(singleImageMasked, vizParamsRGB, 'masked RGB image');
// That didn't work, because only parts where cloud mask is 1 are not masked. So we need to remap again.
var cloudMask_theRightWay = cloudMask.remap([0, 1], [1,0]);
var singleImageMasked_theRightWay = singleImage.updateMask(cloudMask_theRightWay);
Map.addLayer(singleImageMasked_theRightWay, vizParamsRGB, 'masked RGB image the right way');


// Further tasks.
// Try to write the above steps into a function that can be mapped over an Image Collection to create a 'cloud-free' image collection.


var studyArea = ee.FeatureCollection('users/albremoteforest/Rotorua_Forests_Small');
var point_ = ee.Geometry.Point([176.52978039222648,-38.57330180562921]);
// Function that adds NDVI band and clips each element of a Collection.
var adding_NDVI_band = function(func_image) {
  func_image = ee.Image(func_image);
  
  var func_NDVI = func_image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  
  return func_image.addBands(func_NDVI).clip(studyArea);

};


// Function that masks out clouds from each element in a collection.
var masking_clouds = function(func_image) {
  func_image = ee.Image(func_image);
  
  var func_cloudBand = func_image.select('QA60');
  var func_cloudMask = func_cloudBand.remap([0, 1024, 2048], [0, 1, 1]);
  func_cloudMask = func_cloudMask.remap([0, 1], [1,0]);
  
  return func_image.updateMask(func_cloudMask);

};


// Define variables.
var start_date = '2019-01-01';
var end_date = '2019-12-31';

// Filter Image Collection.
var imgCol = ee.ImageCollection('COPERNICUS/S2_SR')
.filterDate(start_date, end_date)
.filterBounds(studyArea)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 49);
print('image collection from '+start_date+' to '+end_date, imgCol);


// Image Collection with NDVI-band.
var imgColNDVI = imgCol.map(adding_NDVI_band);
print('image collection with added NDVI band', imgColNDVI);


// Cloud-free Image Collection with NDVI-band.
var imgColNDVI_cloudFree = imgColNDVI.map(masking_clouds);
print('cloud free image collection with added NDVI band', imgColNDVI_cloudFree);


// Visualization.
Map.addLayer(ee.Image(ee.List(imgCol.toList(imgCol.size())).get(20)), vizParamsRGB, 'image from imgCol');
Map.addLayer(ee.Image(ee.List(imgColNDVI.toList(imgColNDVI.size())).get(20)), vizParamsRGB, 'image from imgCol with NDVI band');
Map.addLayer(ee.Image(ee.List(imgColNDVI_cloudFree.toList(imgColNDVI_cloudFree.size())).get(20)), vizParamsRGB, 'image from cloud-free imgCol with NDVI band');
Map.centerObject(point_, 12);


// Time series.
// Display time series diagram in console.
// Reflectance values are taken at the geometry 'point'.
print(ui.Chart.image.series(imgColNDVI.select('NDVI'), point_));
