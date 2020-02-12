// Basic Google Earth Data Types.
// Print objects to display them in the console and to learn more about them.
// Be careful wenn defining variables, dont use reserved words like string, number, map...
// Variables must be one word, or words connected by special characters.


// Strings.
var this_is_a_string = ee.String('Hello World');
print('this is a string', this_is_a_string);


// Lists.
var this_is_a_list = ee.List(['first', 'second', 'third', 'fourth']);
print('this is a list', this_is_a_list);


// Dictionaries.
var this_is_a_dictionary = ee.Dictionary({'key': 'value', 'first entry': 1, 'second entry': 2});
print('this is a dictionary', this_is_a_dictionary);
// Objects that are allready defined by a variable can be used as the value of a key/value-pair.
// Unfortunately, key/value-pairs in dictionaries don't keep the sequence in which they are created, but are rather sorted alphabetically after the values.
var this_is_a_special_dictionary = ee.Dictionary({'key': 'value', 'first entry': 1, 'second entry': 2, 'allready defined variable:': this_is_a_list});
print('this is a special dictionary', this_is_a_special_dictionary);
// Defining dictionaries can become an endless text-row, so:
var this_is_a_special_dictionary_1 = ee.Dictionary({
  'key': 'value',
  'first entry': 1,
  'second entry': 2,
  'allready defined variable:': this_is_a_list
});
print('this is an uncluttered special dictionary', this_is_a_special_dictionary_1);


// Dates.
var this_is_a_date = ee.Date('2020-02-02');
print('this is a date', this_is_a_date);


// Images.
var this_is_an_image = ee.Image('COPERNICUS/S2_SR/20191201T000241_20191201T000239_T55HGA');
print('this is an image', this_is_an_image);
var this_is_also_an_image = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_208023_20130429');
print('this is also an image', this_is_also_an_image);


// Image Collections.
var this_is_an_image_collection = ee.ImageCollection('COPERNICUS/S2');
print('this is an image collection', this_is_an_image_collection);


// Sometimes you want to know what type of object you are dealing with:
var type_of_this_is_a_dictionary = this_is_a_dictionary.name();
print('type of "this_is_a_dictionary"', type_of_this_is_a_dictionary);


// Additional tasks:
// Read in the Docs-tab at the left of the GEE-IDE about different methods of the different objects we just talked about.
// Get an overview what you can do with the different objects and the pre-defined functions.
// Try easy-to-use functions like .get() to select for example the value of a key/value-pair of a dictionary.
