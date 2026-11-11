// Validaciones de entrada (allow-list) para la API dummy.
// La validación en servidor es de seguridad; la del cliente es solo UX.

// Documento español: DNI (8 dígitos + letra), NIE (X/Y/Z + 7 dígitos + letra),
// o NIF de entidad (letra + 7 dígitos + dígito/letra de control).
const DNI = /^\d{8}[A-Z]$/;
const NIE = /^[XYZ]\d{7}[A-Z]$/;
const NIF = /^[A-HJ-NP-SUVW]\d{7}[0-9A-J]$/;

export function isValidDocumento(value) {
  if (typeof value !== 'string') return false;
  const v = value.trim().toUpperCase();
  if (v.length < 8 || v.length > 12) return false;
  return DNI.test(v) || NIE.test(v) || NIF.test(v);
}

// Identificador de póliza: NN-NNNNNNN (p. ej. 30-0456789).
const POLIZA_ID = /^\d{2}-\d{7}$/;
export function isValidPolizaId(value) {
  return typeof value === 'string' && POLIZA_ID.test(value);
}

// Email (allow-list de formato; longitud acotada).
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[A-Za-z]{2,24}$/;
export function isValidEmail(value) {
  return typeof value === 'string' && value.length <= 254 && EMAIL.test(value.trim());
}

// Teléfono móvil español: 6/7/8/9 + 8 dígitos, con prefijo +34 opcional.
const TEL = /^(?:\+34)?[6-9]\d{8}$/;
export function isValidTelefono(value) {
  return typeof value === 'string' && TEL.test(value.replace(/\s/g, ''));
}

// Nombre / razón social: 2–80 caracteres.
export function isValidNombre(value) {
  return typeof value === 'string' && value.trim().length >= 2 && value.trim().length <= 80;
}

// Texto libre acotado (descripciones, asuntos). Rango configurable.
export function isValidTexto(value, min = 1, max = 1000) {
  return typeof value === 'string' && value.trim().length >= min && value.trim().length <= max;
}

// Fecha en formato DD/MM/AAAA (validación de forma, no de calendario).
const FECHA = /^\d{2}\/\d{2}\/\d{4}$/;
export function isValidFecha(value) {
  return typeof value === 'string' && FECHA.test(value.trim());
}
