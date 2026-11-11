// Datos FICTICIOS de muestra para el prototipo. No contienen PII real.
// Toda coincidencia con datos reales es casual.

export const mutualista = {
  id: 'MUT-DEMO-0001',
  nombre: 'Marta García López',
  documento: '00000000A',
  rol: 'mutualista',
};

// Pólizas del mutualista de demo.
export const polizas = [
  { id: '10-0987654', ramo: 'Automóvil', ramoKey: 'auto', objeto: '1234 ABC · Seat León', estado: 'vigente' },
  { id: '30-0456789', ramo: 'Hogar', ramoKey: 'hogar', objeto: 'C/ Ejemplo 10 · Madrid', estado: 'vigente' },
  { id: '52-0001234', ramo: 'R. C. Profesional', ramoKey: 'rcp', objeto: 'Colegiado nº 00000', estado: 'recibo_pendiente' },
  { id: '30-0778812', ramo: 'Establecimiento sanitario', ramoKey: 'sanitario', objeto: 'Clínica · Madrid', estado: 'vigente' },
];

// KPIs del panel de inicio.
export const resumen = {
  polizasActivas: 3,
  recibosPendientes: 1,
  siniestrosAbiertos: 2,
  documentosNuevos: 2,
};

// Detalle de "Datos de Producto" por póliza (varía según el ramo).
export const productoByPoliza = {
  '30-0456789': {
    polizaId: '30-0456789',
    ramo: 'Hogar · Multirriesgo',
    ramoKey: 'hogar',
    estado: 'vigente',
    datos: {
      tomador: 'Marta García López',
      nif: '00000000A',
      domicilio: 'C/ Ejemplo 10, 3º B',
      provincia: 'Madrid',
      codigoPostal: '28001',
      objetoSeguro: 'Vivienda habitual',
    },
    cobertura: {
      formaPago: 'Anual · Domiciliado',
      fechaAntiguedad: '01/03/2019',
      desde: '01/03/2026',
      hasta: '28/02/2027',
      progreso: 74,
    },
    garantias: [
      { nombre: 'Continente', estado: 'incluida' },
      { nombre: 'Contenido', estado: 'incluida' },
      { nombre: 'Protección Jurídica', estado: 'incluida' },
      { nombre: 'Asistencia en el Hogar', estado: 'incluida' },
      { nombre: 'Asistencia Informática Remota', estado: 'incluida' },
    ],
    domiciliacion: {
      modo: 'Domiciliación bancaria',
      entidad: '0000',
      oficina: '0000',
      iban: 'ES00 ···· ···· ·· ····0000',
    },
  },
  '10-0987654': {
    polizaId: '10-0987654',
    ramo: 'Automóvil',
    ramoKey: 'auto',
    estado: 'vigente',
    datos: {
      tomador: 'Marta García López',
      nif: '00000000A',
      domicilio: 'C/ Ejemplo 10, 3º B',
      provincia: 'Madrid',
      codigoPostal: '28001',
      objetoSeguro: '1234 ABC · Seat León',
    },
    cobertura: {
      formaPago: 'Semestral · Domiciliado',
      fechaAntiguedad: '15/06/2021',
      desde: '15/06/2026',
      hasta: '14/06/2027',
      progreso: 52,
    },
    garantias: [
      { nombre: 'Responsabilidad Civil', estado: 'incluida' },
      { nombre: 'Daños propios', estado: 'incluida' },
      { nombre: 'Lunas', estado: 'incluida' },
      { nombre: 'Asistencia en viaje', estado: 'incluida' },
      { nombre: 'Defensa jurídica', estado: 'incluida' },
    ],
    domiciliacion: {
      modo: 'Domiciliación bancaria',
      entidad: '0000',
      oficina: '0000',
      iban: 'ES00 ···· ···· ·· ····0000',
    },
  },
  '52-0001234': {
    polizaId: '52-0001234',
    ramo: 'R. C. Profesional',
    ramoKey: 'rcp',
    estado: 'recibo_pendiente',
    datos: {
      tomador: 'Marta García López',
      nif: '00000000A',
      domicilio: 'C/ Ejemplo 10, 3º B',
      provincia: 'Madrid',
      codigoPostal: '28001',
      objetoSeguro: 'Responsabilidad civil profesional sanitaria · Colegiado nº 00000',
    },
    cobertura: {
      formaPago: 'Anual · Domiciliado',
      fechaAntiguedad: '10/09/2018',
      desde: '15/09/2026',
      hasta: '14/09/2027',
      progreso: 4,
    },
    garantias: [
      { nombre: 'Responsabilidad Civil Profesional', estado: 'incluida' },
      { nombre: 'Responsabilidad Civil de Explotación', estado: 'incluida' },
      { nombre: 'Defensa jurídica y fianzas', estado: 'incluida' },
      { nombre: 'Inhabilitación profesional', estado: 'incluida' },
    ],
    domiciliacion: {
      modo: 'Domiciliación bancaria',
      entidad: '0000',
      oficina: '0000',
      iban: 'ES00 ···· ···· ·· ····0000',
    },
  },
  '30-0778812': {
    polizaId: '30-0778812',
    ramo: 'Establecimiento sanitario',
    ramoKey: 'sanitario',
    estado: 'vigente',
    datos: {
      tomador: 'Clínica Ejemplo, S.L.',
      nif: 'B00000000',
      domicilio: 'Av. de la Salud 25',
      provincia: 'Madrid',
      codigoPostal: '28010',
      objetoSeguro: 'Centro médico · Clínica dental y de especialidades',
    },
    cobertura: {
      formaPago: 'Trimestral · Domiciliado',
      fechaAntiguedad: '20/01/2020',
      desde: '01/07/2026',
      hasta: '30/06/2027',
      progreso: 36,
    },
    garantias: [
      { nombre: 'Multirriesgo del establecimiento', estado: 'incluida' },
      { nombre: 'Responsabilidad Civil sanitaria', estado: 'incluida' },
      { nombre: 'Avería de maquinaria', estado: 'incluida' },
      { nombre: 'Pérdida de beneficios', estado: 'incluida' },
      { nombre: 'Protección jurídica', estado: 'incluida' },
    ],
    domiciliacion: {
      modo: 'Domiciliación bancaria',
      entidad: '0000',
      oficina: '0000',
      iban: 'ES00 ···· ···· ·· ····0000',
    },
  },
};

// Recibos de muestra por póliza.
export const recibosByPoliza = {
  '30-0456789': [
    { numero: 'R-2026-00012', emision: '01/03/2026', efecto: '01/03/2026', vencimiento: '15/03/2026', situacion: 'pagado', importe: 285.4 },
  ],
  '10-0987654': [
    { numero: 'R-2026-00048', emision: '15/06/2026', efecto: '15/06/2026', vencimiento: '30/06/2026', situacion: 'pagado', importe: 412.9 },
  ],
};

// ---- Pagos / recibos (vista transversal a todas las pólizas) ----------------
export const recibos = [
  { numero: 'R-2026-00090', polizaId: '52-0001234', ramo: 'R. C. Profesional', ramoKey: 'rcp', concepto: 'Prima anual', emision: '01/09/2026', vencimiento: '15/09/2026', situacion: 'pendiente', importe: 198.75 },
  { numero: 'R-2026-00101', polizaId: '30-0778812', ramo: 'Establecimiento sanitario', ramoKey: 'sanitario', concepto: 'Prima trimestral (4T)', emision: '20/09/2026', vencimiento: '01/10/2026', situacion: 'emitido', importe: 640.0 },
  { numero: 'R-2026-00048', polizaId: '10-0987654', ramo: 'Automóvil', ramoKey: 'auto', concepto: 'Prima semestral', emision: '15/06/2026', vencimiento: '30/06/2026', situacion: 'pagado', importe: 412.9 },
  { numero: 'R-2026-00012', polizaId: '30-0456789', ramo: 'Hogar', ramoKey: 'hogar', concepto: 'Prima anual', emision: '01/03/2026', vencimiento: '15/03/2026', situacion: 'pagado', importe: 285.4 },
  { numero: 'R-2025-00931', polizaId: '10-0987654', ramo: 'Automóvil', ramoKey: 'auto', concepto: 'Prima semestral', emision: '15/12/2025', vencimiento: '30/12/2025', situacion: 'pagado', importe: 412.9 },
];

// ---- Siniestros -------------------------------------------------------------
export const siniestros = [
  {
    id: 'S-2026-00298', polizaId: '52-0001234', ramo: 'R. C. Profesional', ramoKey: 'rcp',
    tipo: 'Reclamación de terceros', fecha: '28/08/2026', estado: 'abierto',
    tramitador: 'Departamento de R.C. Profesional', referencia: 'RCP/2026/298',
    descripcion: 'Reclamación recibida de un paciente por presunta praxis. En estudio por el equipo jurídico.',
    hitos: [
      { fecha: '28/08/2026', titulo: 'Siniestro comunicado', hecho: true },
      { fecha: '29/08/2026', titulo: 'Asignación de letrado', hecho: true },
      { fecha: '—', titulo: 'Valoración pericial', hecho: false },
      { fecha: '—', titulo: 'Resolución', hecho: false },
    ],
  },
  {
    id: 'S-2026-00231', polizaId: '10-0987654', ramo: 'Automóvil', ramoKey: 'auto',
    tipo: 'Daños propios', fecha: '12/08/2026', estado: 'tramitacion',
    tramitador: 'Centro de siniestros A.M.A.', referencia: 'AUTO/2026/231',
    descripcion: 'Colisión en aparcamiento sin terceros implicados. Vehículo peritado; pendiente de autorización de taller.',
    hitos: [
      { fecha: '12/08/2026', titulo: 'Siniestro comunicado', hecho: true },
      { fecha: '13/08/2026', titulo: 'Peritación realizada', hecho: true },
      { fecha: '18/08/2026', titulo: 'Autorización de reparación', hecho: true },
      { fecha: '—', titulo: 'Cierre y liquidación', hecho: false },
    ],
  },
  {
    id: 'S-2026-00187', polizaId: '30-0456789', ramo: 'Hogar', ramoKey: 'hogar',
    tipo: 'Daños por agua', fecha: '03/05/2026', estado: 'cerrado',
    tramitador: 'Centro de siniestros A.M.A.', referencia: 'HOGAR/2026/187',
    descripcion: 'Fuga en instalación de baño con daños en el falso techo del vecino inferior. Indemnizado y cerrado.',
    hitos: [
      { fecha: '03/05/2026', titulo: 'Siniestro comunicado', hecho: true },
      { fecha: '05/05/2026', titulo: 'Visita del reparador', hecho: true },
      { fecha: '14/05/2026', titulo: 'Indemnización abonada', hecho: true },
      { fecha: '16/05/2026', titulo: 'Siniestro cerrado', hecho: true },
    ],
  },
];

// Tipos de siniestro admitidos por póliza (allow-list para el alta / CU).
export const tiposSiniestroByRamo = {
  auto: ['Daños propios', 'Colisión con terceros', 'Robo', 'Lunas', 'Asistencia en viaje'],
  hogar: ['Daños por agua', 'Incendio', 'Robo', 'Rotura de cristales', 'Responsabilidad civil'],
  rcp: ['Reclamación de terceros', 'Requerimiento judicial'],
  sanitario: ['Daños materiales', 'Avería de maquinaria', 'Responsabilidad civil sanitaria', 'Pérdida de beneficios'],
};

// ---- Documentos -------------------------------------------------------------
export const documentos = [
  { id: 'DOC-0001', nombre: 'Condiciones particulares — R. C. Profesional', tipo: 'poliza', polizaId: '52-0001234', ramo: 'R. C. Profesional', fecha: '01/09/2026', formato: 'PDF', tamano: '318 KB', nuevo: true },
  { id: 'DOC-0002', nombre: 'Recibo R-2026-00090', tipo: 'recibo', polizaId: '52-0001234', ramo: 'R. C. Profesional', fecha: '01/09/2026', formato: 'PDF', tamano: '96 KB', nuevo: true },
  { id: 'DOC-0003', nombre: 'Certificado de seguro — Automóvil', tipo: 'certificado', polizaId: '10-0987654', ramo: 'Automóvil', fecha: '15/06/2026', formato: 'PDF', tamano: '142 KB', nuevo: false },
  { id: 'DOC-0004', nombre: 'Condiciones generales — Hogar', tipo: 'condiciones', polizaId: '30-0456789', ramo: 'Hogar', fecha: '01/03/2026', formato: 'PDF', tamano: '1,2 MB', nuevo: false },
  { id: 'DOC-0005', nombre: 'Informe de peritación — Siniestro S-2026-00231', tipo: 'comunicacion', polizaId: '10-0987654', ramo: 'Automóvil', fecha: '13/08/2026', formato: 'PDF', tamano: '540 KB', nuevo: false },
  { id: 'DOC-0006', nombre: 'Condiciones particulares — Establecimiento sanitario', tipo: 'poliza', polizaId: '30-0778812', ramo: 'Establecimiento sanitario', fecha: '01/07/2026', formato: 'PDF', tamano: '410 KB', nuevo: false },
];

// ---- Mensajes / comunicaciones ---------------------------------------------
export const mensajes = [
  {
    id: 'M-2026-0007', asunto: 'Tu recibo de R. C. Profesional está pendiente', remitente: 'A.M.A. · Recibos',
    fecha: '02/09/2026', leido: false, categoria: 'pagos',
    cuerpo: 'Te informamos de que el recibo R-2026-00090, correspondiente a tu póliza de R. C. Profesional, está pendiente de pago. Puedes regularizarlo desde la sección Pagos de tu Oficina Virtual. Si ya lo has abonado, ignora este aviso.',
  },
  {
    id: 'M-2026-0006', asunto: 'Actualización de tu siniestro S-2026-00231', remitente: 'A.M.A. · Centro de siniestros',
    fecha: '18/08/2026', leido: false, categoria: 'siniestros',
    cuerpo: 'Hemos autorizado la reparación de tu vehículo en el taller concertado. Puedes concertar cita cuando quieras; el importe cubierto se abonará directamente al taller. Cualquier duda, estamos a tu disposición.',
  },
  {
    id: 'M-2026-0005', asunto: 'Bienvenida a la nueva Oficina Virtual de A.M.A.', remitente: 'A.M.A.',
    fecha: '01/08/2026', leido: true, categoria: 'general',
    cuerpo: 'Te damos la bienvenida a tu nueva Oficina Virtual. Desde aquí podrás consultar tus pólizas, recibos, siniestros y documentos, además de comunicarte con nosotros de forma segura. Gracias por confiar en A.M.A.',
  },
  {
    id: 'M-2026-0004', asunto: 'Recordatorio: revisión anual de tu póliza de Hogar', remitente: 'A.M.A. · Atención al mutualista',
    fecha: '15/07/2026', leido: true, categoria: 'general',
    cuerpo: 'Se acerca la renovación de tu póliza de Hogar. Te recomendamos revisar los capitales asegurados para asegurarte de que siguen ajustados al valor de tu vivienda y su contenido.',
  },
];
