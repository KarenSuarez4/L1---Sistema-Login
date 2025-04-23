const assert = require('assert');

describe('Pruebas de la aplicación', () => {
    it('debería retornar verdadero', () => {
        assert.strictEqual(true, true);
    });

    it('debería sumar correctamente', () => {
        assert.strictEqual(1 + 1, 2);
    });
});