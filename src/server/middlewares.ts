import { Express } from 'express';
import cookies from 'universal-cookie-express';
import helmet from 'helmet';

export default (app: Express) => {
    app.use(cookies()).use(helmet());
};
