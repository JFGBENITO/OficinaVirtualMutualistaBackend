import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: '*' }));

// === HEALTH CHECK (PRIMERO) ===
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', version: '0.1.0', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ message: 'API Oficina Virtual AMA - OK', time: new Date().toISOString() });
});

// === DATOS DUMMY ===
const users = {
  '12345678X': { nombre: 'Juan García López', email: 'juan@ejemplo.com', telefono: '600123456' },
  '87654321A': { nombre: 'María López García', email: 'maria@ejemplo.com', telefono: '600654321' },
};

const polizas = [
  { id: 'AUTO-2024-001', ramo: 'Automóvil', ramoKey: 'auto', objeto: 'Renault Megane', estado: 'vigente', vigencia: '01/01/2024 - 31/12/2024' },
  { id: 'HOGAR-2024-002', ramo: 'Hogar', ramoKey: 'hogar', objeto: 'Piso Calle Mayor 123', estado: 'recibo_pendiente', vigencia: '01/03/2024 - 28/02/2025' },
  { id: 'RCP-2024-003', ramo: 'RCP', ramoKey: 'rcp', objeto: 'Profesional Abogacía', estado: 'vigente', vigencia: '01/06/2024 - 31/05/2025' },
];

const siniestros = [
  { id: 'SIN-2024-00145', polizaId: 'AUTO-2024-001', tipo: 'Choque', fecha: '15/11/2024', descripcion: 'Accidente en autopista', estado: 'abierto', hitos: ['Comunicado', 'Enviado a perito', 'Peritaje en proceso'] },
  { id: 'SIN-2024-00146', polizaId: 'HOGAR-2024-002', tipo: 'Robo', fecha: '10/11/2024', descripcion: 'Robo con fractura de puerta', estado: 'abierto', hitos: ['Comunicado', 'Verificación documental'] },
];

const recibos = [
  { id: 'REC-2024-001', polizaId: 'AUTO-2024-001', importe: 350.50, estado: 'pagado', fecha: '01/11/2024' },
  { id: 'REC-2024-002', polizaId: 'HOGAR-2024-002', importe: 420.75, estado: 'pendiente', fecha: '15/11/2024' },
  { id: 'REC-2024-003', polizaId: 'RCP-2024-003', importe: 180.00, estado: 'emitido', fecha: '20/11/2024' },
];

const documentos = [
  { id: 'DOC-001', nombre: 'Póliza AUTO-2024-001.pdf', tipo: 'póliza', fecha: '01/01/2024' },
  { id: 'DOC-002', nombre: 'Recibo REC-2024-001.pdf', tipo: 'recibo', fecha: '01/11/2024' },
  { id: 'DOC-003', nombre: 'Condiciones Generales.pdf', tipo: 'condiciones', fecha: '01/01/2024' },
];

const mensajes = [
  { id: 'MSG-001', asunto: 'Confirmación de registro', ultimoMensaje: 'Bienvenido a la Oficina Virtual', fecha: '10/11/2024', leido: true },
  { id: 'MSG-002', asunto: 'Estado de tu siniestro', ultimoMensaje: 'Tu siniestro está en peritaje', fecha: '15/11/2024', leido: false },
];

// === RUTAS DE AUTENTICACIÓN ===
app.post('/api/auth/login', (req, res) => {
  const { documento, password } = req.body;
  if (password !== 'DemoAMA11') {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }
  const user = users[documento?.toUpperCase()];
  if (!user) {
    return res.status(401).json({ error: 'Usuario no encontrado' });
  }
  const token = 'token-demo-' + Math.random().toString(36).substr(2, 9);
  res.json({ token, user: { documento, nombre: user.nombre, email: user.email } });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ mensaje: 'Sesión cerrada' });
});

// === RUTAS DE USUARIO ===
app.get('/api/mutualista', (req, res) => {
  res.json({ nombre: 'Juan García López', documento: '12345678X', email: 'juan@ejemplo.com', telefono: '600123456' });
});

// === RUTAS DE PÓLIZAS ===
app.get('/api/resumen', (req, res) => {
  res.json({ polizasActivas: 3, recibosPendientes: 1, siniestrosAbiertos: 2, documentosNuevos: 3 });
});

app.get('/api/polizas', (req, res) => {
  res.json(polizas);
});

app.get('/api/polizas/:id/producto', (req, res) => {
  const poliza = polizas.find(p => p.id === req.params.id);
  if (!poliza) return res.status(404).json({ error: 'Póliza no encontrada' });
  res.json(poliza);
});

// === RUTAS DE SINIESTROS ===
app.get('/api/siniestros', (req, res) => {
  res.json(siniestros);
});

app.post('/api/siniestros', (req, res) => {
  const { polizaId, tipo, fecha, descripcion } = req.body;
  if (!polizaId || !tipo || !fecha || !descripcion) {
    return res.status(400).json({ error: 'Campos requeridos' });
  }
  const nuevoSiniestro = {
    id: 'SIN-2024-' + Math.floor(Math.random() * 10000),
    polizaId, tipo, fecha, descripcion,
    estado: 'abierto',
    hitos: ['Comunicado']
  };
  siniestros.push(nuevoSiniestro);
  res.status(201).json(nuevoSiniestro);
});

// === RUTAS DE PAGOS ===
app.get('/api/pagos', (req, res) => {
  res.json(recibos);
});

// === RUTAS DE DOCUMENTOS ===
app.get('/api/documentos', (req, res) => {
  res.json(documentos);
});

// === RUTAS DE MENSAJES ===
app.get('/api/mensajes', (req, res) => {
  res.json(mensajes);
});

// === RUTAS DE CONTACTO ===
app.post('/api/contact/call-me', (req, res) => {
  const { nombre, documento, telefono } = req.body;
  if (!nombre || !documento || !telefono) {
    return res.status(400).json({ error: 'Campos requeridos' });
  }
  res.json({ mensaje: 'Solicitud recibida. Te llamaremos pronto.', ref: 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase() });
});

app.post('/api/auth/register-request', (req, res) => {
  const { nombre, documento, email, telefono } = req.body;
  if (!nombre || !documento || !email || !telefono) {
    return res.status(400).json({ error: 'Campos requeridos' });
  }
  res.json({ mensaje: 'Registro solicitado. Confirma tu email.', ref: 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase() });
});

app.post('/api/auth/password-reminder', (req, res) => {
  const { identificador, email } = req.body;
  if (!identificador || !email) {
    return res.status(400).json({ error: 'Campos requeridos' });
  }
  res.json({ mensaje: 'Instrucciones enviadas a tu email.' });
});

// === ERROR HANDLING ===
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada', path: req.path });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// === INICIAR SERVIDOR ===
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API Oficina Virtual AMA corriendo en puerto ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
});
