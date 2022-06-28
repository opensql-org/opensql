let FieldHelper = require('../src/util/FieldHelper');


describe('FieldHelper Module', () => {

    it('should be return string equal to POINT(4.5 8.6)', () => {
        expect(FieldHelper.POINT(4.5, 8.6)).toBe('POINT(4.5 8.6)');
    });

    it('should be return string equal to X(location) AS Lat , Y(location) AS Lon', () => {
        expect(FieldHelper.fieldPoint('location')).toBe('X(location) AS Lat , Y(location) AS Lon');
    });

    it('should be return string equal to DEFAULT false', () => {
        expect(FieldHelper.DEFAULT(false)).toBe('DEFAULT false');
    });

    it("should be return string equal to DEFAULT 'Low'", () => {
        expect(FieldHelper.DEFAULT("$Low")).toBe("DEFAULT 'Low'");
    });

});