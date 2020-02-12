// Metadata and Console output.
// Inspect the metadata of the image by printing it to the console. Write down important properties of the image that could be useful in an automated script.
print('Single S2 image', img);


// Save specific properties of that image as a variable.
// Image acquisition date as variable.
var acquisitionDate = img.get('system:time_start');
print('acquisition date of single S2 image, bad format', acquisitionDate);
print('acquisition date of single S2 image, good format', ee.Date(acquisitionDate));
