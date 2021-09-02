import { Router } from 'express';
import appointmentsRouter from '../../../../modules/appointments/infra/http/routes/appointmentsRouter';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessionsRouter';
import usersRouter from '../../../../modules/users/infra/http/routes/usersRouter';
import passwordRouter from '../../../../modules/users/infra/http/routes/passwordRoutes';
import profileRoutes from '../../../../modules/users/infra/http/routes/profileRoutes';
import providersRoutes from '../../../../modules/appointments/infra/http/routes/providersRoutes';

const routes = Router();
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRoutes);
routes.use('/providers', providersRoutes);

export default routes;
