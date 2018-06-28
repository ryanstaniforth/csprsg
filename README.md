# CSPRSG

Cryptographically Secure Pseudo Random *String* Generator

```typescript
import {
    generateSecureRandomString,
    InvalidLengthError,
    UnableToGenerateRandomness
} from 'csprsg';

(async () => {
    let s: string;
    
    try {
        s = await generateSecureRandomString(100);
    } catch (error) {
        // Handle either InvalidLengthError or UnableToGenerateRandomness
    }
})();
```
