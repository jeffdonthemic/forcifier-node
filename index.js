var  _ = require("underscore")
, s = require("string");

var skipList = ['id','isdeleted','name','createddate','createdbyid','lastmodifieddate',
  'lastmodifiedbyid','systemmodstamp','lastactivitydate','currencyisocode','type',
  'url','totalsize','done'];

function deforceList(fields) {
  return s(fields.toLowerCase()).replaceAll('__c','').s;
}

function enforceList(fields) {
  return _.map(fields.split(','), function(s) { 
    if (_.indexOf(skipList, s.toLowerCase()) == -1) { 
      return s + '__c'; 
    } else { 
      return s; 
    }
  });
}

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

function enforceJson(data) {
  var enforced = {};
  for (key in data) {
    if (_.isObject(data[key])) {
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