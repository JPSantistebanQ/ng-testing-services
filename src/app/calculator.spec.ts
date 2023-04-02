import { Calculator } from './calculator';

describe('Calculator', () => {
    let calculator: Calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe("Tests for multiply", () => {
        it('should multiply two numbers', () => {
            const rta = calculator.multiply(3, 3);
            expect(rta).toBe(9);
        });
    });

    describe("Tests for divide", () => {
        it('should divide two numbers', () => {
            const rta = calculator.divide(3, 3);
            expect(rta).toBe(1);
        });

        it('should return null when divide by zero', () => {
            const rta = calculator.divide(3, 0);
            expect(rta).toBeNull();
        });

    });
});