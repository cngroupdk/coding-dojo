describe("Translation to arabic numerals", function() {
    require("src/index");

    it("'I' should be equal to 1", function() {
        var a = romanToArabic("I");
        expect(a).toEqual(1);
    });

});
