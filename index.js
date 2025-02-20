
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORTS = [3001, 3002, 3003, 3004, 3005, 3006, 3007];

const createServer = (port) => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Middleware de log
    app.use((req, res, next) => {
        console.log(`[${port}] ${req.method} ${req.path}`);
        next();
    });

    // Rotas da API
    app.get('/', (req, res) => {
        res.json({ message: `API running on port ${port}`, status: 'active' });
    });

    app.get('/health', (req, res) => {
        res.json({ status: 'healthy', port });
    });

    // Rota para receber dados de outro projeto
    app.post('/data', (req, res) => {
        try {
            const data = req.body;
            console.log(`Received data on port ${port}:`, data);
            res.json({ success: true, message: 'Data received', port });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    // Error handling
    app.use((err, req, res, next) => {
        console.error(`Error on port ${port}:`, err);
        res.status(500).json({ error: 'Internal server error' });
    });

    app.listen(port, '0.0.0.0', () => {
        console.log(`Server running on port ${port}`);
    });

    return app;
};

const servers = PORTS.map(createServer);

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Shutting down servers...');
    servers.forEach(() => {
        server.close();
    });
});
