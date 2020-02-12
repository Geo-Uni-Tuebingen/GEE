// Band selection.
// Use the Inspector (right upper corner in the GEE-IDE) to analyze the satellite image. Find a band that is suitable for fire detection.
// Select that band.
var singleBand = img.select('B12');


// Display single band using palette.
// First define new visualization parameters.
var vizParamsPal = {
  palette: ['c1adad', 'b80000'],
  min: 0,
  max: 12000
};


// Then add the single band to the map.
Map.addLayer(singleBand, vizParamsPal, 'B12 of single S2 image');
