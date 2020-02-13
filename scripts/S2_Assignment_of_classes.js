// Select the classes. -1 = forest gain, 0 = no change, 1 = forest loss (when subtracting new from old).
var allGain = ee.Image(differenceImage.eq(-1));
var allLoss = ee.Image(differenceImage.eq(1));
var allNeutral = ee.Image(differenceImage.eq(0));
