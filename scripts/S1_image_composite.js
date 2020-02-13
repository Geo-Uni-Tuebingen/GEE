// Preparation
// 1. Login to [EO Browser](https://apps.sentinel-hub.com/eo-browser) and search for a Sentinel-1 GRD image of your choice.  
// 2. Copy the image ID into a textfile (S1A_IW_GRDH...)
// 3. Search two more images from the same area, but from different dates (e.g. different season or same time, but different year)


// Create a composite
var image1 = ee.Image('COPERNICUS/S1_GRD/S1B_IW_GRDH_1SDV_20200102T224440_20200102T224505_019644_025201_2BAE').select('VV');
var image2 = ee.Image('COPERNICUS/S1_GRD/S1A_IW_GRDH_1SDV_20180106T224504_20180106T224529_020040_02225C_20EB').select('VV');
var image3 = ee.Image('COPERNICUS/S1_GRD/S1A_IW_GRDH_1SDV_20160105T224500_20160105T224525_009365_00D8C5_0DEF').select('VV');

var RGB = ee.Image.cat(image1,image2,image3);

Map.addLayer(RGB, {min: -8,  max: -3,}, 'RGB');

Map.centerObject(image1)


// Things to try
// 1. What do the colors say about temporal dynamics in the images?
// 2. Adjust the color range to get different contrasts (either in the code or in the *RGB visualization parameters*) 
// 3. Add VH polarization to the map -> what is different?
