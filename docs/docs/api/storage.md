---
sidebar_position: 3
---

# storage

### **POST** createShelf

```json
{
  "name": "...",
  "comment": "...",
  "temperatureRange": {
    "minimalCelsius": 13.1,
    "maximalCelsius": 43.6
  },
  "maxWeightKg": 20.1,
  "maxAssortmentSize": {
    "widthMillimeters": 40.2,
    "heightMillimeters": 30.5,
    "lengthMillimeters": 40.9
  },
  "supportsHazardous": true,
  "cellsShape": {
    "rows": 2,
    "columns": 2
  }
}
```

### **GET** getShelf

```json
No body.
```

### **POST** updateShelf

```json
{
  "shelfId": "...",
  "newData": {
    "name": "...",
    "comment": "...",
    "temperatureRange": {
      "minimalCelsius": -10,
      "maximalCelsius": 40
    },
    "maxWeightKg": 50,
    "maxAssortmentSize": {
      "widthMillimeters": 3015.1,
      "heightMillimeters": 3120.2,
      "lengthMillimeters": 3500.3
    },
    "supportsHazardous": false
  }
}
```

### **POST** deleteShelf

```json
{
  "id": "..."
}
```

### **POST** createAssortment

```json
{
  "name": "test assortment",
  "temperatureRange": {
    "minimalCelsius": -10,
    "maximalCelsius": 40
  },
  "weightKg": 10,
  "size": {
    "widthMillimeters": 1000,
    "heightMillimeters": 1000,
    "lengthMillimeters": 1000
  },
  "comment": "test assortment description",
  "expiresAfterSeconds": 1400,
  "isHazardous": false,
  "imageContentBase64": null
}
```

### **GET** getAssortment

```json
No body.
```

### **POST** updateAssortment

```json
{
  "id": "...",
  "newData": {
    "name": "...",
    "comment": "...",
    "temperatureRange": {
      "minimalCelsius": -10,
      "maximalCelsius": 40
    },
    "weightKg": 10,
    "size": {
      "widthMillimeters": 1000,
      "heightMillimeters": 1000,
      "lengthMillimeters": 1000
    },
    "expiresAfterSeconds": 1400,
    "isHazardous": false,
    "imageContentBase64": null
  }
}
```

### **POST** deleteAssortment

```json
{
  "id": "80a9cba5-a237-463f-bbc1-43b2ad6eed69"
}
```

### **POST** importAssortment

```json
{
  "definitions": [
    {
      "name": "test shi",
      "temperatureRange": {
        "minimalCelsius": -10,
        "maximalCelsius": 40
      },
      "weightKg": 10,
      "size": {
        "widthMillimeters": 1000,
        "heightMillimeters": 1000,
        "lengthMillimeters": 1000
      },
      "comment": "...",
      "expiresAfterSeconds": 1400,
      "isHazardous": false,
      "imageContentBase64": null
    },
    {
      "name": "second test",
      "temperatureRange": {
        "minimalCelsius": -10,
        "maximalCelsius": 40
      },
      "weightKg": 10,
      "size": {
        "widthMillimeters": 1000,
        "heightMillimeters": 1000,
        "lengthMillimeters": 1000
      },
      "comment": "...",
      "expiresAfterSeconds": 1400,
      "isHazardous": false,
      "imageContentBase64": null
    }
  ]
}
```

### **POST** importShelves

```json
{
  "shelves": [
    {
      "name": "first shelf",
      "comment": "...",
      "temperatureRange": {
        "minimalCelsius": 13.1,
        "maximalCelsius": 43.6
      },
      "maxWeightKg": 20.1,
      "maxAssortmentSize": {
        "widthMillimeters": 40.2,
        "heightMillimeters": 30.5,
        "lengthMillimeters": 40.9
      },
      "supportsHazardous": true,
      "cellsShape": {
        "rows": 2,
        "columns": 2
      }
    },
    {
      "name": "second shelf",
      "comment": "...",
      "temperatureRange": {
        "minimalCelsius": 13.1,
        "maximalCelsius": 43.6
      },
      "maxWeightKg": 20.1,
      "maxAssortmentSize": {
        "widthMillimeters": 40.2,
        "heightMillimeters": 30.5,
        "lengthMillimeters": 40.9
      },
      "supportsHazardous": true,
      "cellsShape": {
        "rows": 2,
        "columns": 2
      }
    }
  ]
}
```

### **POST** putUpAssortment

```json
{
  "shelfId": "...",
  "cellId": "...",
  "assortmentDefinitionId": "..."
}
```

### **POST** takeDownAssortment

```json
{
  "id": "..."
}
```

### **POST** takeDownOldestAssortmentByDefinition

```json
{
  "definitionId": "..."
}
```

### **GET** getNextAssortmentToBeTakenDownByDefinition

```json
No body.
```

### **POST** PutUpAssortmentAutomatically

```json
{
  "definitionId": "..."
}
```

### **GET** getAllAssortments

```json
No body.
```

### **GET** getAssortmentInstance

```json
No body.
```
