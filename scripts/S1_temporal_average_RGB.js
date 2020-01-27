// Preparation
// 1. Create a polygon (named geometry) to define your study area, ideally over an urban area

// Load collection
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD');

// Reduce the collection
var s1 = sentinel1
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  .filterDate(ee.Date('2018-01-01'), ee.Date('2018-12-31'))
  .filterBounds(geometry);

// Print size of filtered image collection
print('Number of images: ', vv.size());

// Temporal average (per pixel) over the entire collection
var vv_all = s1.select('VV')
var vh_all = s1.select('VH')

var vv = vv_all.mean()
var vh = vh_all.mean()
var cross = vv.divide(vh);

var RGB = ee.Image.cat(vv, vh, cross);
Map.addLayer(RGB.clip(geometry), {min: [-15, -20, 0], max: [-5, -10, 2]}, 'composite');
Map.centerObject(geometry)


// Things to try
// 1. Instead of comparing polarizations, create an RGB of VV polarizations of three different years.
