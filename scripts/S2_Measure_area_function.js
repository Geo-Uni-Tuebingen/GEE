// Measure area function.
// Calculate area of forest loss and gain.
// Prepare function that sums up all pixel values inside an area of interest.
var measure_area = function(func_image, func_study_area) {
  func_image = ee.Image(func_image); 
  func_study_area =ee.FeatureCollection(func_study_area);
  // Create an image, whose pixel values are equal to that pixel's area in square meter.
  var func_area = func_image.multiply(ee.Image.pixelArea()).rename('area_in_sqm');
  // Sum up all the pixel values for overall area.
  var func_stats = func_area.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: func_study_area,
    scale: 10,
    maxPixels: 1e9
  });
  
  return func_stats;
};
