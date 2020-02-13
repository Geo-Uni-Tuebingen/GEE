// Introduction to functions.
// Define easy function with one parameter.
// Adds 5 to whatever number is passed to this function as argument.
var add_something = function(func_number) {
  func_number = ee.Number(func_number);
  
  var func_number_added = func_number.add(5);
  
  return func_number_added;
};


// This is the same, but shorter.
var add_something_shorter = function(func_number) {
  func_number = ee.Number(func_number);
  
  return func_number.add(5);
}


// Call function.
var oldNumber = 5;
print('old number before function', oldNumber);
var newNumber = add_something(oldNumber);
print('result from function "add_something"', newNumber);
var newNumberShorter = add_something_shorter(oldNumber);
print('result from function "add_something" in the short version', newNumberShorter);





// Define function with two parameters.
var add_something_to_something = function(func_number_1, func_number_2) {
  func_number_1 = ee.Number(func_number_1);
  func_number_2 = ee.Number(func_number_2);
  
  return func_number_1.add(func_number_2);
};


var result_from_add_something_to_something = add_something_to_something(3, 8);
print('result from function "add_something_to_something"', result_from_add_something_to_something);





// Classical for-loop is not possible in GEE, use .map() instead.
var list_with_numbers = ee.List([1, 8, 45, 13, 7]);
var list_with_result = list_with_numbers.map(add_something);
print('result of the mapped function "add_something" over a list with numbers', list_with_result);





// Further tasks.
// Think about how to return more than one object from a function.
