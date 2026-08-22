const express = require('express');
const morgan = require('morgan');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;

// Monitoreo: metricas basicas (Prometheus)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

// Monitoreo: Logs centralizados
app.use(morgan('combined'));

// Archivos estaticos
app.use(express.static(path.join(__dirname, '../public')));

// Base de datos (SQLite en memoria para simplicidad de despliegue)
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE user (id INT, info TEXT)");
    db.run("INSERT INTO user VALUES (1, 'Administrador')");
});

// Rutas
app.get('/api/status', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
}

module.exports = app;