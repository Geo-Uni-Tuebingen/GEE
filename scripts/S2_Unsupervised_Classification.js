// Unsupervised Classification.
// Basic introduction into landcover classification with the GEE, starting with unsupervised method.
// Load image data.
// Sentinel-2 Image Collection from 2019.
var point = ee.Geometry.Point([9.0487, 48.5377]);
var startDate = '2019-01-01';
var endDate = '2019-12-31';
var bandModel = ee.List(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B11', 'B12', ])
var imgCol = ee.ImageCollection('COPERNICUS/S2_SR')
.filterDate(startDate, endDate)
.filterBounds(point)
.filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', 5));
print('S2 image collection from '+startDate+' to '+endDate, imgCol);


// Image Collection turned into list to access Images.
var imgColList = imgCol.toList(imgCol.size());


// Access single Image from list.
var img = ee.Image(imgColList.get(17)).select(bandModel);
print('image to be classified', img);


// Visualize single image.
var RGB = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 1800
};
Map.addLayer(img, RGB, 'image RGB');
Map.centerObject(img, 12);


// Start unsupervised classification.
// Define area in which pixel values are smpled.
var rectangle_ = ee.Geometry.Rectangle([9.0224, 48.7354, 9.6486, 48.3901]);
Map.addLayer(ee.Image().paint(rectangle_, 0, 2), {}, 'sample rectangle');


// Calculate a Feature Collection with sampled training data.
var training = img.sample({
  region: rectangle_,
  scale: 10,
  numPixels: 5000,
  geometries: true
});
print('training data', training);
Map.addLayer(training, {color: 'B80000'}, 'sample points', false);


// Train a clusterer of your choice with the training data.
var clusterer = ee.Clusterer.wekaKMeans(8).train(training);
print('clusterer', clusterer);


// Apply that clusterer to the whole satellite scene.
var classification = img.cluster(clusterer);


// Add the classified image to the map.
// Assign random colors to the different classes.
Map.addLayer(classification.randomVisualizer(), {}, 'classification result', false);
Map.addLayer(classification.eq(1).updateMask(classification.eq(8)), {}, 'classification single classes');


// Further tasks.
// Take a look at the clusterer in the console. Which bands were sampled and which ones could be problematic?
// Use the console, or by displaying each cluster separately, and assign a more convenient color palette to the classification image.


// Updated Color palette for the classification result.
var vizParamsKMeans = {
  palette: [
    '1c7400', // dark green, forest
    '1c7400', // 
    'ff7b7b', // asphalt, buildings
    'b50000', // dark red, buildings
    '1c7400', // 
    '1c7400', // dark green, forest
    'ffdc00', // yellow, äcker
    'c7c6bf', // grey, industry
  ],
  min: 0,
  max: 7
};

Map.addLayer(classification, vizParamsKMeans, 'classification result');
