// SRTM, CORINE and more conditionals.
// Load data. 
// Load and display SRTM data.
var polygon = ee.Geometry.Rectangle([9.2503, 48.5659, 9.5785, 48.4622]);
var point = ee.Geometry.Point([9.400459020668677,48.49082810152753]);
var srtmData = ee.Image('CGIAR/SRTM90_V4');
print('SRTM data', srtmData);


// Calculate slope map from SRTM.
var srtmSlope = ee.Terrain.slope(srtmData);


// Create hillshade.
var srtmHillshade = ee.Terrain.hillshade(srtmData);


Map.addLayer(srtmData, {min: 0, max: 2000}, 'srtm elevation');
Map.addLayer(srtmHillshade, {min: 0, max: 180}, 'srtm hillshade', true, 0.6);
Map.addLayer(srtmSlope, {min: 0, max: 120}, 'srtm slope');


// Load CORINE land cover data set.
var clc = ee.ImageCollection("COPERNICUS/CORINE/V20/100m")
.filterBounds(point)
print('CORINE Land Cover dataset', clc);


var clc2018 = ee.Image(ee.List(clc.toList(clc.size())).get(4));
print('CORINE Land Cover dataset from 2018', clc2018);
Map.addLayer(clc2018.randomVisualizer(), {}, 'CORINE Land Cover data set from 2018');


// Select all forest areas from CLC and all areas with more than 30% slope from SRTM and combine areas that fulfill both requirements in one image.
var hangwaelder = clc2018.eq(311).and(srtmSlope.gte(20));
// Or select all forest areas from CLC and all areas between 20% and 30% slope from SRTM and combine areas that fulfill both requirements in one image.
//var hangwaelder = clc2018.eq(311).and(srtmSlope.gte(20).and(srtmSlope.lte(30)));
hangwaelder = hangwaelder.updateMask(hangwaelder);
Map.addLayer(hangwaelder, {}, 'hangwaelder');
