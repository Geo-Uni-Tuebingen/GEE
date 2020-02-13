// Spectral Indices.
// Load Sentinel 2 Image.
var img = ee.Image('COPERNICUS/S2_SR/20190215T221309_20190215T221543_T60HVC');
print('image used in the first few tasks', img);


// Calculate NDVI with GEE-function.
var NDVIimage = img.normalizedDifference(['B8', 'B4']);


// Visualize NDVI and RGB.
var RGB = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 1800
};
var paletteRedGreen = {
  palette: ['red', 'yellow', 'green'],
  min: -0.2,
  max: 1
};
Map.addLayer(img, RGB, 'single RGB image', false);
Map.addLayer(NDVIimage, paletteRedGreen, 'single NDVI image', false);
