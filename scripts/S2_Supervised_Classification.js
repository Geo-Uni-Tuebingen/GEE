// Supervised Classification.
// Basic introduction into landcover classification with the GEE, commencing with supervised classification.
// Load image data.
// Sentinel-2 Image Collection from 2019.
var point = ee.Geometry.Point([9.0487, 48.5377]);
var startDate = '2019-01-01';
var endDate = '2019-12-31';
var bandModel = ee.List(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B11', 'B12'])
var imgCol = ee.ImageCollection('COPERNICUS/S2_SR')
.filterDate(startDate, endDate)
.filterBounds(point)
.filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', 5));
print('S2 image collection from '+startDate+' to '+endDate, imgCol);


// Image Collection turned into list to access Images.
var imgColList = imgCol.toList(imgCol.size());


// Access single Image from list.
var img = ee.Image(imgColList.get(17))//.select(bandModel);
print('image to be classified', img);


// Visualize single image.
var RGB = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 1800
};
Map.addLayer(img, RGB, 'image RGB');
Map.centerObject(img, 12);


// Start supervised classification.
// Collect sample area.
var rectangle_forest_1 = ee.Geometry.Rectangle([9.67828, 48.31498, 9.68257, 48.31093]);
var rectangle_forest_2 = ee.Geometry.Rectangle([9.59583, 48.288157, 9.599392, 48.285059]);
var rectangle_forest_3 = ee.Geometry.Rectangle([9.525349, 48.280888, 9.527967, 48.277718]);

var rectangle_city_1 = ee.Geometry.Rectangle([9.725568, 48.284122, 9.728014, 48.282709]);
var rectangle_city_2 = ee.Geometry.Rectangle([9.741296, 48.282851, 9.743292, 48.281009]);
var rectangle_city_3 = ee.Geometry.Rectangle([9.641415, 48.236681, 9.64457, 48.235552]);

var rectangle_water_1 = ee.Geometry.Rectangle([9.714396, 48.240284, 9.717271, 48.239384]);
var rectangle_water_2 = ee.Geometry.Rectangle([9.83986, 48.2097, 9.842, 48.20561]);

var rectangle_acker_1 = ee.Geometry.Rectangle([9.8502, 48.20653, 9.6486, 48.3901]);
var rectangle_acker_2= ee.Geometry.Rectangle([9.75918, 48.1968, 9.76184, 48.19569]);
var rectangle_acker_3 = ee.Geometry.Rectangle([9.85058, 48.19726, 9.85277, 48.19497]);

var rectangle_meadow_1 = ee.Geometry.Rectangle([9.83411, 48.20879, 9.85213, 48.20504]);
var rectangle_meadow_2 = ee.Geometry.Rectangle([9.85861, 48.20873, 9.86084, 48.2067]);
var rectangle_meadow_3 = ee.Geometry.Rectangle([9.87029, 48.20421, 9.87333, 48.20341]);

var rectangle_industry_1 = ee.Geometry.Rectangle([9.7073, 48.29944, 9.71108, 48.29424]);
var rectangle_industry_2 = ee.Geometry.Rectangle([9.725997, 48.272455, 9.729151, 48.270884]);

// Combine every sample polygon to one Feature Collection.
var training_polygons = ee.FeatureCollection([
  ee.Feature(rectangle_forest_1, {'class': 0}),
  ee.Feature(rectangle_forest_2, {'class': 0}),
  ee.Feature(rectangle_forest_3, {'class': 0}),
  ee.Feature(rectangle_city_1, {'class': 1}),
  ee.Feature(rectangle_city_2, {'class': 1}),
  ee.Feature(rectangle_city_3, {'class': 1}),
  ee.Feature(rectangle_water_1, {'class': 2}),
  ee.Feature(rectangle_water_2, {'class': 2}),
  //ee.Feature(rectangle_acker_1, {'class': 3}),
  ee.Feature(rectangle_acker_2, {'class': 3}),
  ee.Feature(rectangle_acker_3, {'class': 3}),
  //ee.Feature(rectangle_meadow_1, {'class': 4}),
  ee.Feature(rectangle_meadow_2, {'class': 4}),
  ee.Feature(rectangle_meadow_3, {'class': 4}),
  ee.Feature(rectangle_industry_1, {'class': 5}),
  ee.Feature(rectangle_industry_2, {'class': 5}),
]);
Map.addLayer(training_polygons, {}, 'training polygons');


// Calculate a Feature Collection with sampled training data.
var training = img.sampleRegions({
  collection: training_polygons,
  properties: ['class'],
  scale: 10
});
print('training data', training);


// Create a classifier.
var classifier_ = ee.Classifier.randomForest({
  numberOfTrees: 250,
});

// Train the classifier with the training data.
var trainedClassifier = classifier_.train(training, 'class', bandModel);
print('trained classifier', trainedClassifier);


// Apply that clusterer to the whole satellite scene (classify image).
var classification = img.classify(trainedClassifier);


// Add the classified image to the map.
// Assign random colors to the different classes.
Map.addLayer(classification.randomVisualizer(), {}, 'classification result', false);


// Updated Color palette for the classification result.
var vizParamsKMeans = {
  palette: [
    '1c7400', // dark green, forest
    'b50000', // dark red, buildings
    '00c1ff', // blue, water
    'e8c114', // acker
    '9bff2b', // light green, meadow
    'b3b1aa' // grey, industry
  ],
  min: 0,
  max: 5
};

Map.addLayer(classification, vizParamsKMeans, 'classification result');
