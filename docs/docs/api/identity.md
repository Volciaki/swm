---
sidebar_position: 2
---

# identity

### **GET** listUsers

```json
No body.
```

### **POST** login

```json
{
  "email": "...",
  "passwordRaw": "..."
}
```

### **POST** twoFactorAuthentication

```json
{
  "authenticationId": "...",
  "value": "..."
}
```

### **POST** deleteUser

```json
{
  "id": "..."
}
```

### **POST** createUser

```json
{
  "name": "...",
  "email": "...",
  "passwordRaw": "...",
  "isAdmin": false,
  "twoFactorAuthenticationEnabled": false
}
```

### **POST** requestPasswordReset

```json
{
  "userId": "..."
}
```

### **POST** passwordReset

```json
{
  "authenticationId": "...",
  "authenticationValue": "...",
  "newPasswordRaw": "..."
}
```

### **GET** getSession

```json
No body.
```

### **GET** getUserByEmail

```json
No body.
```

### **GET** getUserById

```json
No body.
```

### **POST** logout

```json
No body.
```

### **POST** updateUser

```json
{
  "id": "...",
  "newData": {
    "name": "...",
    "email": "...",
    "passwordRaw": "",
    "isAdmin": false,
    "twoFactorAuthenticationEnabled": false
  }
}
```
