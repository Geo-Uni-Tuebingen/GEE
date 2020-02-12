// Simple geometries.
// Create a single point interactively with the point-tool (upper left corner of the map), and by script.
var point = ee.Geometry.Point([149.7291622160584, -35.467568138495274]);


// Add the script-point to the map.
Map.addLayer(point);
