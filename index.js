var  _ = require("underscore")
, s = require("string");

// list of system field NOT to add '__c' to
var skipList = ['id','isdeleted','name','createddate','createdbyid','lastmodifieddate',
  'lastmodifiedbyid','systemmodstamp','lastactivitydate','currencyisocode','type',
  'url','totalsize','done'];

// removes '__c' from each items in the list
function deforceList(fields) {
  return s(fields.toLowerCase()).replaceAll('__c','').s;
}

// adds '__c' to any field not in the skipList
function enforceList(fields) {
  return _.map(fields.split(','), function(s) { 
    if (_.indexOf(skipList, s.toLowerCase()) == -1) { 
      return s + '__c'; 
    } else { 
      return s; 
    }
  });
}

// removes '__c' from each key in the JSON and makes keys lowercase
function deforceJson(data) {
  var deforced = {};
  for (key in data) {
    if (_.isObject(data[key]) && !_.isFunction(data[key])) {
      deforced[key.toLowerCase()] = deforceJson(data[key]);
    } else {
      deforced[s(key.toLowerCase()).replaceAll('__c','').s] = data[key];
    }
  }
  return deforced;
}

// adds '__c' to any key not in the skipList
function enforceJson(data) {
  var enforced = {};
  for (key in data) {
    if (_.isObject(data[key]) && !_.isFunction(data[key])) {
      enforced[key.toLowerCase()] = enforceJson(data[key]);
    } else {
      if (_.indexOf(skipList, key) == -1) {
        enforced[key + '__c'] = data[key];
      } else {
        enforced[key] = data[key];
      }
    }
  }
  return enforced;
}

exports.deforceList = deforceList;
exports.enforceList = enforceList;
exports.deforceJson = deforceJson;
exports.enforceJson = enforceJson; 
exports.skipList = skipList;