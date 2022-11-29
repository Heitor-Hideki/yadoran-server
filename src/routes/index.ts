import { Router } from 'express';

import { sessionsRouter } from './sessions.routes';
import { userRouter } from './users.routes';

const routes = Router();

routes.use('/v1/sessions', sessionsRouter);
routes.use('/v1/users', userRouter);

export default routes;
