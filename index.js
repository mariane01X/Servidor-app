const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

// Middleware de log
app.use((req, res, next) => {
    console.log(`[${PORT}] ${req.method} ${req.path}`);
    next();
});

// Rotas da API
app.get('/', (req, res) => {
    res.json({ message: 'Servidor online', status: 'active' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', port: PORT });
});

// Rota para receber dados
app.post('/data', (req, res) => {
    try {
        const data = req.body;
        console.log('Dados recebidos:', data);
        res.json({ success: true, message: 'Dados recebidos com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error(`Error:`, err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});