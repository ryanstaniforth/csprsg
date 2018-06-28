import * as crypto from 'crypto';
import { InvalidLengthError, UnableToGenerateRandomness } from './errors';

export const generateSecureRandomString = async (length: number): Promise<string> => {
    const largest32BitUnsignedInt = 4294967294;

    if (length <= 0 || length > largest32BitUnsignedInt) {
        throw new InvalidLengthError();
    }

    const isRequestedLengthEven = length % 2 === 0;

    // Each byte generated transforms to two hex characters.
    // If the requested length is odd, increase it to be even before halving.
    const bytesNeeded = (isRequestedLengthEven ? length : length + 1) / 2;

    return new Promise<string>((resolve, reject): void => {
        const callback = (error: Error | null, buffer: Buffer): void => {
            if (error !== null) {
                reject(new UnableToGenerateRandomness());
            } else {
                let randomString = buffer.toString('hex');

                if (!isRequestedLengthEven) {
                    // Remove the extra unwanted character.
                    randomString = randomString.substr(0, length);
                }

                resolve(randomString);
            }
        };

        try {
            crypto.randomBytes(bytesNeeded, callback);
        } catch (error) {
            throw new UnableToGenerateRandomness();
        }
    });
};
