// Mapping functions.
// Classical for-loops or if/else-statements are not possible within the Code Editor due to the server-/client- structure. For-loops however are implemented by the .map()-function.
// Create Image Collection over one year (2019) and MGRS-tile 60HVC. Additionaly, only chose pictures with less than 5% cloud cover.
// Define Variables.
var startDate = '2019-01-01';
var endDate = '2019-12-31';
var imgCol = ee.ImageCollection('COPERNICUS/S2_SR')
.filterDate(startDate, endDate)
.filterBounds(studyArea)
.filterMetadata('MGRS_TILE', 'equals', '60HVC')
.filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', 5));
print('S2 image collection from '+startDate+' to '+endDate, imgCol);


// Define function that calculates NDVI.
var calculate_NDVI = function(func_image) {
  func_image = ee.Image(func_image);
  
  return func_image.normalizedDifference(['B8', 'B4']);
  
};


// Map that function over all elements of an Image Collection.
var imgColNDVI = imgCol.map(calculate_NDVI);
print('Image Collection after mapping NDVI-function', imgColNDVI);


// Further task:
// Adjust the function 'calculate_NDVI' in a way that the calculated NDVI is added to the Images of the Image Collection as an additional band.
// Extended 'calculate_NDVI' - function.
var calculate_NDVI_as_additional_band = function(func_image) {
  func_image = ee.Image(func_image);
  
  var ndvi_band = func_image.normalizedDifference(['B8', 'B4']).rename('NDVI_band');
  
  return func_image.addBands(ndvi_band);
};


// Map extended function over all elements of an Image Collection.
var imgColNDVIasAdditionalBand = imgCol.map(calculate_NDVI_as_additional_band);
print('Image Collection after mapping extended NDVI-function',  imgColNDVIasAdditionalBand);
