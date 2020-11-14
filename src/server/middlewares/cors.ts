import Cors from 'cors';

const corsMiddleware = Cors({
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  origin: true,
});

export default corsMiddleware;
