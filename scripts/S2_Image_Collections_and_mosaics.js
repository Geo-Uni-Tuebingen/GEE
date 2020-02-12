// Image Collections and mosaics.
// Combine several pictures into an Image Collection. 
// To compare before and after fire, two Image Collections are created.
// Loading Images for the first Image Collection (01.12.2019).
var img1_1 = ee.Image('COPERNICUS/S2_SR/20191201T000241_20191201T000239_T55HFA');
var img1_2 = ee.Image('COPERNICUS/S2_SR/20191201T000241_20191201T000239_T55HGA');
var img1_3 = ee.Image('COPERNICUS/S2_SR/20191201T000241_20191201T000239_T56HKF');
// Loading Images for the second Image Collection (26.12.2019).
var img2_1 = ee.Image('COPERNICUS/S2_SR/20191226T000239_20191226T000235_T55HFA');
var img2_2 = ee.Image('COPERNICUS/S2_SR/20191226T000239_20191226T000235_T55HGA');
var img2_3 = ee.Image('COPERNICUS/S2_SR/20191226T000239_20191226T000235_T56HKF');


// Combine them into an Image Collection.
// ImageCollection from 01.12.2019.
var imgCol_2019_12_01 = ee.ImageCollection.fromImages([img1_1, img1_2, img1_3]);
// ImageCollection from 26.12.2019.
var imgCol_2019_12_26 = ee.ImageCollection.fromImages([img2_1, img2_2, img2_3]);


// Create two mosaics.
// Mosaic 01.12.2019.
var mosaic_2019_12_01 = imgCol_2019_12_01.mosaic();
// Mosaic 26.12.2019.
var mosaic_2019_12_26 = imgCol_2019_12_26.mosaic();


// Add the mosaics to the map.
Map.addLayer(mosaic_2019_12_01, vizParamsRGB, 'mosaic 01.12.2019');
Map.addLayer(mosaic_2019_12_26, vizParamsRGB, 'mosaic 26.12.2019');
