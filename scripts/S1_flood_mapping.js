// Preparation
// 1. Login to [EO Browser](https://apps.sentinel-hub.com/eo-browser) and search for two Sentinel-1 images. One before and one after a flood event.   
// 2. Copy the image IDs into a textfile (S1A_IW_GRDH...)

// Load image before and after the flood event
var before = ee.Image('COPERNICUS/S1_GRD/S1A_IW_GRDH_1SDV_20191121T171459_20191121T171524_030012_036D1B_6CCE').select('VV');
var after = ee.Image('COPERNICUS/S1_GRD/S1B_IW_GRDH_1SDV_20191127T171404_20191127T171429_019116_024140_38A7').select('VV');
 
Map.setCenter(9.95, 45.09, 10);
Map.addLayer(before, {min:-30,max:0}, 'Before flood A');
Map.addLayer(after, {min:-30,max:0}, 'After flood A');


// Threshold smoothed radar intensities to identify "flooded" areas.
var flood_threshold = -5;

var before_smooth = before.focal_median(); 
var after_smooth = after.focal_median();

// Create difference image and flood mask
var diff_smooth = after_smooth.subtract(before_smooth);
var diff_thresholded = diff_smooth.lt(flood_threshold); 

// Display map
Map.addLayer(diff_smooth, {min:-10, max:10}, 'difference', 0);
Map.addLayer(diff_thresholded.updateMask(diff_thresholded), {palette:"0000FF"},'flooded areas - blue',1)

// Things to try
// 1. What is the ideal threshold? Add the diff_smooth raster to the map and find out 
// 2. Increase/decrease the filter size and see how the result changes. 
