// Clipping. 
// Load clipping geometry.
var studyArea = ee.FeatureCollection('users/albremoteforest/Rotorua_Forests_Small');
var imgClipped = img.clip(studyArea);


// Calculate and visualize NDVI for clipped Image.
var NDVIimageClipped = imgClipped.normalizedDifference(['B8', 'B4']);
Map.addLayer(imgClipped, RGB, 'single RGB image clipped', false);
Map.addLayer(NDVIimageClipped, paletteRedGreen, 'single NDVI image clipped', false);
