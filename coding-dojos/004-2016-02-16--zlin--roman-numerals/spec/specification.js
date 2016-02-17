describe("Translation to arabic numerals", function() {

    it("'I' should be equal to 1", function() {
        expect(convert("I")).toEqual(1);
    });

    it("'II' should be equal to 2", function() {
        expect(convert("II")).toEqual(2);
    });

    it("'III' should be equal to 3", function() {
        expect(convert("III")).toEqual(3);
    });

    it("'V' should be equal to 5", function() {
        expect(convert("V")).toEqual(5);
    });

    it("'IV' should be equal to 4", function() {
        expect(convert("IV")).toEqual(4);
    });

    it("'IX' should be equal to 9", function() {
        expect(convert("IX")).toEqual(9);
    });

    it("'XI' should be equal to 11", function() {
        expect(convert("XI")).toEqual(11);
    });

    it("'VII' should be equal to 7", function() {
        expect(convert("VII")).toEqual(7);
    });

    it("'VIII' should be equal to 8", function() {
        expect(convert("VIII")).toEqual(8);
    });

    it("'XV' should be equal to 15", function() {
        expect(convert("XV")).toEqual(15);
    });
    it("'XX' should be equal to 20", function() {
        expect(convert("XX")).toEqual(20);
    });
    it("'XVIII' should be equal to 18", function() {
        expect(convert("XVIII")).toEqual(18);
    });
});
