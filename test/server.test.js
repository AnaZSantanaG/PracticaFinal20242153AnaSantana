const request = require('supertest');
const app = require('../src/server');

describe('Pruebas de Integración y Unitarias', () => {
    test('GET / debe devolver el frontend', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Aplicacion Web - Pipeline DevOps');
    });

    test('GET /api/status debe devolver OK', async () => {
        const res = await request(app).get('/api/status');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'OK');
    });

    test('GET /metrics debe exponer metricas', async () => {
        const res = await request(app).get('/metrics');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('process_cpu_user_seconds_total');
    });
});