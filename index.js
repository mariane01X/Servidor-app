
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORTS = [3001, 3002, 3003, 3004, 3005, 3006, 3007];

const createServer = (port) => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.get('/', (req, res) => {
        res.send(`Server running on port ${port}`);
    });

    app.listen(port, '0.0.0.0', () => {
        console.log(`Server running on port ${port}`);
    });

    return app;
};

const servers = PORTS.map(createServer);
