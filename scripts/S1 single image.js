/* Preparation
1. Login to [EO Browser](https://apps.sentinel-hub.com/eo-browser) and search for a Sentinel-1 GRD image of your choice.  
2. Copy the image ID into a textfile (S1A_IW_GRDH...)
*/
  
# Load the image
var S1 = ee.Image('COPERNICUS/S1_GRD/S1A_IW_GRDH_1SDV_20190418T162031_20190418T162056_026846_030497_5081').select('VV');
  
Map.addLayer((S1), {min: [-15], max: [0]}, 'SAR_mean', 1);
Map.centerObject(S1);
