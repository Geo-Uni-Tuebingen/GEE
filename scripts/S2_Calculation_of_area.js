// Measure area of all classes.
var areaAllGain = measure_area(allGain, studyArea);
print('forest area gained', areaAllGain);
var areaAllLoss = measure_area(allLoss, studyArea);
print('forest area loss', areaAllLoss);
var areaAllNeutral = measure_area(allNeutral, studyArea);
print('forest area neutral', areaAllNeutral);


// Measure area of the whole study area.
var wholeArea = differenceImage.remap([-1, 0, 1], [1, 1, 1]);
var areaWholeStudyArea = measure_area(wholeArea, studyArea);
print('area of the whole study area', areaWholeStudyArea);


// Validation of measuring result.
print('area gain, area loss and area neutral summed up', ee.Number(areaAllGain.get('area_in_sqm')).add(ee.Number(areaAllLoss.get('area_in_sqm'))).add(ee.Number(areaAllNeutral.get('area_in_sqm'))));
