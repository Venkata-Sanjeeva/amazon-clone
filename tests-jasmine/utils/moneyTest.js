import { formatCurrency } from "../../scripts/utils/money.js";

// describe is like a test suite, which means group of tests will together called as suite

describe("test suite: formatCurrency", () => {
    it("convert cents into dollars", () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it("works with 0", () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it("rounds up to the nearest cent", () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
})
