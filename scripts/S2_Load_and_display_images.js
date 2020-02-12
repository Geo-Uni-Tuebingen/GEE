// Load and display Images.
// Load a single Image from Sentinel-2 collection.
var img = ee.Image('COPERNICUS/S2_SR/20191201T000241_20191201T000239_T55HGA');


// Add this Image to the map.
Map.addLayer(img, {bands: ['B4', 'B3', 'B2'], min: 0, max: 5000}, 'single image');
Map.centerObject(img, 10);


// Further tasks.
// Play around with different band combinations in the visualization part of Map.addLayer();
// Try to 'outsource' the visualization part (asign it to a variable) so it can be used more easily when displaying several pictures in the same script.
// Inspect the metadata of the image by printing it to the console. Write down important properties of the image that could be useful in an automated script.
// Save specific properties of that image as a variable (use .get()).
