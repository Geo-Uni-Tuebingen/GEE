// Preparation
// 1. Create a polygon (named geometry) to define your study area, ideally over an urban area

// Load collection
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD');

// Reduce collection
var s1 = sentinel1
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  //.select('VV')
  .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
  .filterDate(ee.Date('2019-01-01'), ee.Date('2019-12-31'))
  .filterBounds(geometry);

// Print size of filtered image collection
print('Number of images: ', s1.size());

// Temporal average (per pixel) over the entire collection // remove  filter above
var vv_all = s1.select('VV')
var vh_all = s1.select('VH')

var vv = vv_all.mean()
var vh = vh_all.mean()
var std = vh_all.reduce(ee.Reducer.stdDev());

var RGB = ee.Image.cat(vv, vh, std);
Map.addLayer(RGB.clip(geometry), {min: [-15, -20, 0], max: [-5, -10, 8]}, 'composite');
Map.centerObject(geometry)

// Things to try
// 1. Instead of comparing polarizations, create an RGB of VV polarizations of three different years.
