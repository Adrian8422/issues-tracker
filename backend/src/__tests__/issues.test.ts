import request from 'supertest';
import app from '../app';



describe('Issues Endpoints', () => {
  let authToken: string;

  beforeAll(async () => {
    // Login para obtener token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: '123456'
      });
    
    authToken = loginResponse.body.token;
  });

  describe('GET /api/issues', () => {
    it('should get issues list', async () => {
      const response = await request(app)
        .get('/api/issues')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('issues');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.issues)).toBe(true);
    });

    it('should reject unauthorized requests', async () => {
      const response = await request(app)
        .get('/api/issues');

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/issues', () => {
    it('should create a new issue', async () => {
      const newIssue = {
        title: 'Test Issue',
        description: 'Test Description',
        priority: 'medium'
      };

      const response = await request(app)
        .post('/api/issues')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newIssue);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(newIssue.title);
      expect(response.body.status).toBe('open');
    });

    it('should reject invalid data', async () => {
      const response = await request(app)
        .post('/api/issues')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'A' // Muy corto
        });

      expect(response.status).toBe(400);
    });
  });
});
