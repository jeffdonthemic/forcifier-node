var forcifier = require('../');
var  should = require("should");

describe('Forcifier', function() {

  describe('deforceList()', function() {

    it('should remove all __c  from a list and make each element lowercase', function() {
      var fields = 'ID, Name, Field1__c, field2__c';
      var results = forcifier.deforceList(fields);
      results.should.eql('id, name, field1, field2');
    });

  });

  describe('enforceList()', function() {

    it('should add __c to each non-standard field', function() {
      var fields = forcifier.skipList.join(',') + ',MY_FIELD,Another,And_Another';
      var results = forcifier.enforceList(fields).join(',');
      results.should.eql(forcifier.skipList.join(',')+ ',MY_FIELD__c,Another__c,And_Another__c');
    });

  });  

  describe('deforceJson()', function() {

    it('should remove all __c  each key and make them lowercase', function() {
      var my_json = {"totalSize":2,"done":true,"records":[{"attributes":{"type":"Account","url":"/services/data/v27.0/sobjects/Account/001K000000f9XMDIA2"},"Id":"001K000000f9XMDIA2","Name":"ACME Corp Ltd.","Logo__c":"logo-big.jpg"},{"attributes":{"type":"Account","url":"/services/data/v27.0/sobjects/Account/001K000000f8R8aIAE"},"Id":"001K000000f8R8aIAE","Name":"XYZ Corp","Logo__c":"logo.png"}]};
      var deforced = {"totalsize":2,"done":true,"records":{"0":{"attributes":{"type":"Account","url":"/services/data/v27.0/sobjects/Account/001K000000f9XMDIA2"},"id":"001K000000f9XMDIA2","name":"ACME Corp Ltd.","logo":"logo-big.jpg"},"1":{"attributes":{"type":"Account","url":"/services/data/v27.0/sobjects/Account/001K000000f8R8aIAE"},"id":"001K000000f8R8aIAE","name":"XYZ Corp","logo":"logo.png"}}};
      var results = forcifier.deforceJson(my_json);
      results.should.eql(deforced);
    });

  });  

  describe('enforceJson()', function() {

    it('should add __c  each non-standard key', function() {
      var my_json = {"totalsize":2,"done":true,"records":{"0":{"attributes":{"type":"Account","url":"/services/data/v27.0/sobjects/Account/001K000000f9XMDIA2"},"id":"001K000000f9XMDIA2","name":"ACME Corp Ltd.","logo":"logo-big.jpg"},"1":{"attributes":{"type":"Account","url":"/services/data/v27.0/sobjects/Account/001K000000f8R8aIAE"},"id":"001K000000f8R8aIAE","name":"XYZ Corp","logo":"logo.png"}}};
      var enforced = {"totalsize":2,"done":true,"records":{"0":{"attributes":{"type":"Account","url":"/services/data/v27.0/sobjects/Account/001K000000f9XMDIA2"},"id":"001K000000f9XMDIA2","name":"ACME Corp Ltd.","logo__c":"logo-big.jpg"},"1":{"attributes":{"type":"Account","url":"/services/data/v27.0/sobjects/Account/001K000000f8R8aIAE"},"id":"001K000000f8R8aIAE","name":"XYZ Corp","logo__c":"logo.png"}}};
      var results = forcifier.enforceJson(my_json);
      results.should.eql(enforced);
    });

  });  

});