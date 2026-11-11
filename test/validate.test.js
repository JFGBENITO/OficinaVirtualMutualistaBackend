// Pruebas de validación de entrada (allow-list). Runner nativo de Node (sin dependencias).
// Ejecutar: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isValidDocumento, isValidPolizaId } from '../src/validate.js';

test('documento: acepta formatos válidos (DNI/NIE/NIF)', () => {
  assert.equal(isValidDocumento('00000000A'), true);   // DNI
  assert.equal(isValidDocumento('X1234567L'), true);   // NIE
  assert.equal(isValidDocumento('B12345674'), true);   // NIF entidad
});

test('documento: rechaza entradas no válidas (input-validation deny-case)', () => {
  assert.equal(isValidDocumento(''), false);
  assert.equal(isValidDocumento('123'), false);
  assert.equal(isValidDocumento("'; DROP TABLE polizas;--"), false);
  assert.equal(isValidDocumento('<script>alert(1)</script>'), false);
  assert.equal(isValidDocumento(12345678), false);      // tipo no string
});

test('idPoliza: acepta el formato NN-NNNNNNN y rechaza el resto', () => {
  assert.equal(isValidPolizaId('30-0456789'), true);
  assert.equal(isValidPolizaId('30_0456789'), false);
  assert.equal(isValidPolizaId('../../etc/passwd'), false);
  assert.equal(isValidPolizaId('30-04567890000'), false);
});
