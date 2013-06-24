# Forcifier

Forcifier is a node package that provides utility functions for dealing with Force.com fields to make them pretty and easier to work with.

## Key Features

1. 'Deforces' a list fields names so "`id,Name,Field1__c,field2__c`" is converted to "`id,name,field1,field2`".
2. 'Enforces' a list of fields names so "`id,name,field1,field2`" is converted to "`id,name,field1__c,field2__c`".
3. 'Deforces' JSON keys from Force.com so that all keys will be lowercase and will have "`__c`" removed. For example, the following JSON returned by nforce will look like:

```json
{
  "totalSize": 2,
  "done": true,
  "records": [
    {
      "attributes": {
        "type": "Account",
        "url": "/services/data/v27.0/sobjects/Account/001K000000f9XMDIA2"
      },
      "Id": "001K000000f9XMDIA2",
      "Name": "ACME Corp Ltd.",
      "Logo__c": "logo-big.jpg"
    },
    {
      "attributes": {
        "type": "Account",
        "url": "/services/data/v27.0/sobjects/Account/001K000000f8R8aIAE"
      },
      "Id": "001K000000f8R8aIAE",
      "Name": "XYZ Corp",
      "Logo__c": "logo.png"
    }
  ]
}
```
Will have '__c' removed and all keys will be lowercase:

```json
{
  "totalsize": 2,
  "done": true,
  "records": {
    "0": {
      "attributes": {
        "type": "Account",
        "url": "/services/data/v27.0/sobjects/Account/001K000000f9XMDIA2"
      },
      "id": "001K000000f9XMDIA2",
      "name": "ACME Corp Ltd.",
      "logo": "logo-big.jpg"
    },
    "1": {
      "attributes": {
        "type": "Account",
        "url": "/services/data/v27.0/sobjects/Account/001K000000f8R8aIAE"
      },
      "id": "001K000000f8R8aIAE",
      "name": "XYZ Corp",
      "logo": "logo.png"
    }
  }
}
```

4. 'Enforces' JSON keys so that all non-standard salesforce.com fields will be appended with "__c". This is useful when you want to POST or PUT data back to Force.com. Enforcing your JSON will add '__c' to fields where necessary. So that:

```json
{
  "totalsize": 2,
  "done": true,
  "records": {
    "0": {
      "attributes": {
        "type": "Account",
        "url": "/services/data/v27.0/sobjects/Account/001K000000f9XMDIA2"
      },
      "id": "001K000000f9XMDIA2",
      "name": "ACME Corp Ltd.",
      "logo": "logo-big.jpg"
    },
    "1": {
      "attributes": {
        "type": "Account",
        "url": "/services/data/v27.0/sobjects/Account/001K000000f8R8aIAE"
      },
      "id": "001K000000f8R8aIAE",
      "name": "XYZ Corp",
      "logo": "logo.png"
    }
  }
}
```
Is transformed into the following with '__c' appended to keys where required. It does not change the case of
the keys as Force.com is case insensitive.

```json
{
  "totalsize": 2,
  "done": true,
  "records": {
    "0": {
      "attributes": {
        "type": "Account",
        "url": "/services/data/v27.0/sobjects/Account/001K000000f9XMDIA2"
      },
      "id": "001K000000f9XMDIA2",
      "name": "ACME Corp Ltd.",
      "logo__c": "logo-big.jpg"
    },
    "1": {
      "attributes": {
        "type": "Account",
        "url": "/services/data/v27.0/sobjects/Account/001K000000f8R8aIAE"
      },
      "id": "001K000000f8R8aIAE",
      "name": "XYZ Corp",
      "logo__c": "logo.png"
    }
  }
}
```



## Contributors

- [Jeff Douglas](https://github.com/jeffdonthemic) - Main developer, current maintainer.