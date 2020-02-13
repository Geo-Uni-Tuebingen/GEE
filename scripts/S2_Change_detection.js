// Change Detection.
// Basic change detection of forest loss and gain over one year using NDVI-threshold.
// Define two images, one year apart without clouds.
var imageOld = ee.Image(ee.List(imgCol.toList(imgCol.size())).get(0));
print('first single image for change detection', imageOld);
var imageNew = ee.Image(ee.List(imgCol.toList(imgCol.size())).get(8));
print('second single image for change detection', imageNew);


// Clip both images to study area extent.
var imageOldClipped = imageOld.clip(studyArea);
var imageNewClipped = imageNew.clip(studyArea);


// Calculate NDVI for both images.
var NDVIoldImage = imageOldClipped.normalizedDifference(['B8', 'B4']);
var NDVInewImage = imageNewClipped.normalizedDifference(['B8', 'B4']);


// Setting thresholds.
var thresholdOldImage = NDVIoldImage.gte(0.6);
var thresholdNewImage = NDVInewImage.gte(0.6);


// Masking RGB image.
var imageOldMasked = imageOldClipped.updateMask(thresholdOldImage);
var imageNewMasked = imageNewClipped.updateMask(thresholdNewImage);


// Calculate difference image.
var differenceImage = thresholdOldImage.subtract(thresholdNewImage).rename('difference');
print('difference image', differenceImage);


// Visualization of change.
Map.addLayer(imageOldClipped, RGB, 'old image', false);
Map.addLayer(imageNewClipped, RGB, 'new image', false);

Map.addLayer(NDVIoldImage, paletteRedGreen, 'old NDVI image', false);
Map.addLayer(NDVInewImage, paletteRedGreen, 'new NDVI image', false);

Map.addLayer(thresholdOldImage, {}, 'old threshold image', false);
Map.addLayer(thresholdNewImage, {}, 'new threshold image', false);

Map.addLayer(imageOldMasked, RGB, 'old image masked', false);
Map.addLayer(imageNewMasked, RGB, 'new image masked', false);


var differenceColors = {
  palette: ['128100', 'b8fffb', 'a20000'],
  min: -1,
  max: 1
};
Map.addLayer(differenceImage, differenceColors, 'difference image', false);


// Further task.
// Try and rewrite the above part into a function. The function should have two parameters (old_image and new_image) and should return the difference image.
