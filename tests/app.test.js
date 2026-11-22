const request = require('supertest');
const app = require('../src/app');
 
describe('Notes API', () => {
  test('GET /health retourne ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
 
  test('POST /notes crée une note', async () => {
    const res = await request(app).post('/notes').send({ text: 'Apprendre le DevOps' });
    expect(res.statusCode).toBe(201);
    expect(res.body.text).toBe('Apprendre le DevOps');
  });
 
  test('POST /notes sans texte retourne 400', async () => {
    const res = await request(app).post('/notes').send({});
    expect(res.statusCode).toBe(400);
  });
 
  test('DELETE /notes/:id supprime une note existante', async () => {
    const created = await request(app).post('/notes').send({ text: 'à supprimer' });
    const res = await request(app).delete(`/notes/${created.body.id}`);
    expect(res.statusCode).toBe(204);
  });
 
  test('DELETE /notes/:id inconnu retourne 404', async () => {
    const res = await request(app).delete('/notes/9999');
    expect(res.statusCode).toBe(404);
  });

  test('GET /notes/count retourne le nombre de notes', async () => {
    const res = await request(app).get('/notes/count');
    expect(res.statusCode).toBe(200);
    expect(typeof res.body.count).toBe('number');
  });

});