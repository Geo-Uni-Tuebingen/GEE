// Map Algebra.
// Select IR and Red band from single Image.
var red_band = img.select('B4');
var NIR_band = img.select('B8');


// Calculate the NDVI using mathematical operators and see if the result is the same as with the GEE-function.
var NDVIimageMathematical = NIR_band.subtract(red_band).divide(NIR_band.add(red_band)).rename('NDVI');
Map.addLayer(NDVIimageMathematical, paletteRedGreen, 'single NDVI image calculated with mathematical operators', false);


// Calculating indices etc. by combining different bands can also be accomplished using expressions.
var NDVIimageExpression = img.expression(
  '(NIR - RED)/(NIR + RED)', {
    'NIR' : img.select('B8'),
    'RED' : img.select('B4')
  }
);
Map.addLayer(NDVIimageExpression, paletteRedGreen, 'single NDVI image calculated with expression', false);


// Further tasks:
// Using the expression-method, try to calculate the Enhanced Vegetation Indice (EVI).
var EVIimage = img.expression(
  '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
    'NIR': img.select('B8').divide(10000),
    'RED': img.select('B4').divide(10000),
    'BLUE': img.select('B2').divide(10000)
  }
).rename('EVI');
Map.addLayer(EVIimage, paletteRedGreen, 'single EVI image calculated with expression', false);
