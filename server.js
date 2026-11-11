// =============================================================================
// Oficina Virtual de A.M.A. — API de negocio DUMMY (prototipo)
// Datos ficticios. Controles de seguridad de Sapiens aplicados de forma
// proporcional a un prototipo local con datos no reales.
// =============================================================================
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import crypto from 'node:crypto';
import {
  mutualista, polizas, resumen, productoByPoliza, recibosByPoliza,
  recibos, siniestros, tiposSiniestroByRamo, documentos, mensajes,
} from './src/data.js';
import {
  isValidDocumento, isValidPolizaId, isValidEmail, isValidTelefono, isValidNombre,
  isValidTexto, isValidFecha,
} from './src/validate.js';

// --- Configuración (fail securely: aborta si el puerto no es válido) ---------
const PORT = Number(process.env.PORT ?? 8000);
if (!Number.isInteger(PORT) || PORT <= 0 || PORT > 65535) {
  console.error('[ama-api] PORT no válido. Abortando.');
  process.exit(1);
}
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS ?? 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',').map((s) => s.trim()).filter(Boolean);

const app = express();
app.disable('x-powered-by');

// --- Cabeceras de seguridad (CSP, nosniff, anti-clickjacking, etc.) ----------
app.use(helmet());

// --- Cuerpo JSON con límite de tamaño (evita abusos) -------------------------
app.use(express.json({ limit: '32kb' }));

// --- CORS con allow-list (sin comodín; solo orígenes conocidos) --------------
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error('Origen no permitido'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// --- Logging estructurado (sin secretos ni PII) ------------------------------
app.use((req, res, next) => {
  const started = Date.now();
  res.on('finish', () => {
    console.log(JSON.stringify({
      ts: new Date().toISOString(), method: req.method, path: req.path,
      status: res.statusCode, ms: Date.now() - started,
    }));
  });
  next();
});

// --- Sesiones en memoria: tokens opacos generados con CSPRNG -----------------
const SESSIONS = new Map(); // token -> { userId, exp }
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 min
const TOKEN_RE = /^Bearer ([a-f0-9]{64})$/;

function issueToken(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  SESSIONS.set(token, { userId, exp: Date.now() + SESSION_TTL_MS });
  return token;
}
function requireAuth(req, res, next) {
  const m = TOKEN_RE.exec(req.get('authorization') ?? '');
  if (!m) return res.status(401).json({ error: 'No autorizado' });
  const sess = SESSIONS.get(m[1]);
  if (!sess || sess.exp < Date.now()) {
    SESSIONS.delete(m[1]);
    console.warn(JSON.stringify({ ts: new Date().toISOString(), level: 'auth', msg: 'token inválido o expirado' }));
    return res.status(401).json({ error: 'Sesión no válida o expirada' });
  }
  req.userId = sess.userId;
  next();
}

// --- Rate limiting en memoria para el login (defensa en profundidad) ---------
const loginHits = new Map(); // ip -> { count, reset }
function loginRateLimit(req, res, next) {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const w = loginHits.get(ip);
  if (!w || w.reset < now) { loginHits.set(ip, { count: 1, reset: now + 60_000 }); return next(); }
  if (w.count >= 10) return res.status(429).json({ error: 'Demasiados intentos. Inténtalo más tarde.' });
  w.count += 1;
  next();
}

// ============================ RUTAS =========================================

// SECURITY-DEVIATION (prototipo): login DUMMY. No verifica credenciales reales
// ni almacena contraseñas. En producción debe integrarse con el API de Login
// Único de A.M.A. (OIDC/OAuth2), validando tokens (firma/issuer/audience/exp).
app.post('/api/auth/login', loginRateLimit, (req, res) => {
  const { documento, password } = req.body ?? {};
  if (typeof documento !== 'string' || !isValidDocumento(documento) ||
      typeof password !== 'string' || password.length < 1 || password.length > 128) {
    return res.status(400).json({ error: 'Datos de acceso no válidos' }); // mensaje genérico
  }
  const token = issueToken(mutualista.id);
  res.json({ token, user: { nombre: mutualista.nombre, rol: mutualista.rol } });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  const m = TOKEN_RE.exec(req.get('authorization') ?? '');
  if (m) SESSIONS.delete(m[1]);
  res.json({ ok: true });
});

app.get('/api/mutualista', requireAuth, (req, res) => {
  res.json({ id: mutualista.id, nombre: mutualista.nombre, rol: mutualista.rol });
});

app.get('/api/resumen', requireAuth, (req, res) => res.json(resumen));

app.get('/api/polizas', requireAuth, (req, res) => res.json(polizas));

app.get('/api/polizas/:id/producto', requireAuth, (req, res) => {
  const { id } = req.params;
  if (!isValidPolizaId(id)) return res.status(400).json({ error: 'Identificador no válido' });
  // Autorización a nivel de objeto: la póliza debe pertenecer al mutualista (evita IDOR/BOLA).
  if (!polizas.some((p) => p.id === id)) return res.status(404).json({ error: 'No encontrado' });
  const prod = productoByPoliza[id];
  if (!prod) return res.status(404).json({ error: 'Datos de producto no disponibles' });
  res.json(prod);
});

app.get('/api/polizas/:id/recibos', requireAuth, (req, res) => {
  const { id } = req.params;
  if (!isValidPolizaId(id)) return res.status(400).json({ error: 'Identificador no válido' });
  if (!polizas.some((p) => p.id === id)) return res.status(404).json({ error: 'No encontrado' });
  res.json(recibosByPoliza[id] ?? []);
});

// --- Pagos / recibos (transversal a todas las pólizas del mutualista) --------
app.get('/api/pagos', requireAuth, (req, res) => res.json(recibos));

// --- Siniestros --------------------------------------------------------------
app.get('/api/siniestros', requireAuth, (req, res) => res.json(siniestros));

// CU: Comunicar un siniestro (dummy). No persiste; devuelve una referencia.
app.post('/api/siniestros', requireAuth, (req, res) => {
  const { polizaId, tipo, fecha, descripcion } = req.body ?? {};
  if (!isValidPolizaId(polizaId)) return res.status(400).json({ error: 'Identificador de póliza no válido' });
  // Autorización a nivel de objeto: la póliza debe pertenecer al mutualista (evita IDOR/BOLA).
  const pol = polizas.find((p) => p.id === polizaId);
  if (!pol) return res.status(404).json({ error: 'Póliza no encontrada' });
  // Allow-list de tipos admitidos para el ramo de la póliza.
  const tiposOk = tiposSiniestroByRamo[pol.ramoKey] ?? [];
  if (typeof tipo !== 'string' || !tiposOk.includes(tipo)) {
    return res.status(400).json({ error: 'Tipo de siniestro no válido para esta póliza' });
  }
  if (!isValidFecha(fecha)) return res.status(400).json({ error: 'Fecha no válida (DD/MM/AAAA)' });
  if (!isValidTexto(descripcion, 10, 1000)) {
    return res.status(400).json({ error: 'La descripción debe tener entre 10 y 1000 caracteres' });
  }
  res.json({
    ok: true, ref: newRef('SIN'),
    mensaje: 'Hemos registrado tu comunicación de siniestro. Un tramitador de A.M.A. se pondrá en contacto contigo.',
  });
});

// --- Documentos --------------------------------------------------------------
app.get('/api/documentos', requireAuth, (req, res) => res.json(documentos));

// --- Mensajes / comunicaciones ----------------------------------------------
app.get('/api/mensajes', requireAuth, (req, res) => res.json(mensajes));

// --- Rate limiting genérico para endpoints públicos (defensa en profundidad) -
const publicHits = new Map(); // ip -> { count, reset }
function publicRateLimit(req, res, next) {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const w = publicHits.get(ip);
  if (!w || w.reset < now) { publicHits.set(ip, { count: 1, reset: now + 60_000 }); return next(); }
  if (w.count >= 20) return res.status(429).json({ error: 'Demasiadas solicitudes. Inténtalo más tarde.' });
  w.count += 1;
  next();
}
const newRef = (prefix) => `${prefix}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

// SECURITY-DEVIATION (prototipo): el "captcha" es un SIMULADOR de cliente y aquí
// solo se comprueba su presencia. En producción debe ser reCAPTCHA v3 verificado
// en servidor contra Google (token + score), nunca confiando en el cliente.
function captchaPresent(v) {
  return v === true || (typeof v === 'string' && v.trim().length > 0);
}

// CU002 — Solicitud de registro (dummy). No persiste datos reales.
app.post('/api/auth/register-request', publicRateLimit, (req, res) => {
  const { nombre, documento, email, telefono, consentimientos, captcha } = req.body ?? {};
  if (!captchaPresent(captcha)) return res.status(400).json({ error: 'Verificación anti-robot requerida' });
  if (!isValidNombre(nombre) || !isValidDocumento(documento) ||
      !isValidEmail(email) || !isValidTelefono(telefono)) {
    return res.status(400).json({ error: 'Datos de registro no válidos' });
  }
  if (consentimientos !== true) {
    return res.status(400).json({ error: 'Debe aceptar los consentimientos obligatorios' });
  }
  res.json({
    ok: true, ref: newRef('REG'),
    mensaje: 'Hemos recibido tu solicitud de registro. Te enviaremos una contraseña provisional por SMS.',
  });
});

// CU004 — Le llamamos (dummy).
app.post('/api/contact/call-me', publicRateLimit, (req, res) => {
  const { nombre, documento, telefono, privacidad, captcha } = req.body ?? {};
  if (!captchaPresent(captcha)) return res.status(400).json({ error: 'Verificación anti-robot requerida' });
  if (!isValidNombre(nombre) || !isValidDocumento(documento) || !isValidTelefono(telefono)) {
    return res.status(400).json({ error: 'Datos de contacto no válidos' });
  }
  if (privacidad !== true) return res.status(400).json({ error: 'Debe aceptar la política de privacidad' });
  res.json({
    ok: true, ref: newRef('LLA'),
    mensaje: 'Gracias. Un agente de A.M.A. te llamará lo antes posible.',
  });
});

// CU003 — Recordar contraseña (dummy). Respuesta neutra (no revela si existe).
app.post('/api/auth/password-reminder', publicRateLimit, (req, res) => {
  const { identificador, email, captcha } = req.body ?? {};
  if (!captchaPresent(captcha)) return res.status(400).json({ error: 'Verificación anti-robot requerida' });
  const idOk = isValidDocumento(identificador) || isValidEmail(identificador) || isValidTelefono(identificador);
  if (!idOk || !isValidEmail(email)) return res.status(400).json({ error: 'Datos no válidos' });
  res.json({
    ok: true,
    mensaje: 'Si los datos son correctos, recibirás instrucciones para restablecer tu contraseña.',
  });
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// --- 404 y manejador de errores (mensajes genéricos, sin stack al cliente) ---
app.use((req, res) => res.status(404).json({ error: 'Recurso no encontrado' }));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(JSON.stringify({ ts: new Date().toISOString(), level: 'error', msg: err.message }));
  res.status(500).json({ error: 'Error interno' });
});

// Escucha solo en loopback (local-only).
app.listen(PORT, '127.0.0.1', () => {
  console.log(`[ama-api] API dummy escuchando en http://127.0.0.1:${PORT}`);
  console.log(`[ama-api] CORS permitido para: ${ALLOWED_ORIGINS.join(', ')}`);
});
