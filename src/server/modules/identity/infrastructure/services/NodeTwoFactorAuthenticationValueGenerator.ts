import { TwoFactorAuthenticationValueGenerator } from "../../application/services/TwoFactorAuthenticationValueGenerator";

// Generates a random digit in range 0-9, including both ends.
const getRandomDigit = () => Math.floor(Math.random() * 10);

export class NodeTwoFactorAuthenticationValueGenerator implements TwoFactorAuthenticationValueGenerator {
    generate() {
        const amountOfDigits = 6;
        let string = "";

        for (let i = 0; i < amountOfDigits; i++) {
            string += getRandomDigit().toString();
        }

        return string;
    }
}
