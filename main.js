const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://oficina-virtual-mutualista.vercel.app'
  ],
  credentials: true
}));