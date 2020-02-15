// Preparation
// 1. Create a polygon (named geometry) to define your study area, ideally over an urban area

// Load collection
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD');

// Reduce collection
var s1 = sentinel1
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .select('VV')
  .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
  .filterDate(ee.Date('2017-01-01'), ee.Date('2019-12-31'))
  .filterBounds(geometry);

// Print size of filtered image collection
print('Number of images: ', s1.size());

// Temporal average (per pixel) over the entire collection
var S1mean = s1.mean().clip(geometry); 
Map.addLayer(S1mean, {min: -15, max: 0}, 'SAR_mean', 1);
Map.centerObject(geometry);


// Things to try
// 1. Load a single image and compare the image quality
var single = ee.Image('COPERNICUS/S1_GRD/S1B_IW_GRDH_1SDV_20200207T171516_20200207T171541_020166_0262C7_16C8')
  .select('VV');
Map.addLayer(single.clip(geometry), {min: [-15], max: [0]}, 'SAR_single', 1);
