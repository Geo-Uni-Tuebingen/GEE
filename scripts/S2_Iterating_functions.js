// Iterating functions.
// Short example on how .iterate(); works.
var add_function = function(func_instance, func_list) {
  func_instance = ee.Number(func_instance);
  func_list = ee.List(func_list);
  
  var previous = ee.Number(func_list.get(-1));
  var newNumber = func_instance.add(previous);
  
  return func_list.add(newNumber);
};


// The function 'add_function' is iterated over each element of this list:
var list_ = ee.List([1, 1, 1, 1, 1, 1, 1]);


// 
var list1_ = list_.iterate(add_function, ee.List([1]));


// Inspect results in console.
print('list over which is iterated', list_);
print('list as a result of the iterated function', list1_);
