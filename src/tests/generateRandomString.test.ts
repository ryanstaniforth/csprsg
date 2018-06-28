import { InvalidLengthError } from '../errors';
import { generateSecureRandomString } from '../generateSecureRandomString';

describe('generateSecureRandomString', () => {
    test('is a promise', async () => {
        expect(generateSecureRandomString(1))
            .toBeInstanceOf(Promise);
    });

    test('promise resolves to string', async () => {
        expect(typeof await generateSecureRandomString(1))
            .toBe('string');
    });

    test('string has correct length', async () => {
        for (const i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
            expect((await generateSecureRandomString(i)).length)
                .toBe(i);
        }
    });

    test('invalid length argument throws error', async () => {
        expect.assertions(2);

        try {
            await generateSecureRandomString(-1);
        } catch (error) {
            expect(error)
                .toBeInstanceOf(InvalidLengthError);
        }

        try {
            await generateSecureRandomString(4294967295);
        } catch (error) {
            expect(error)
                .toBeInstanceOf(InvalidLengthError);
        }
    });
});
