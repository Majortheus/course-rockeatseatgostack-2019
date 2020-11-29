import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateAppointmentStore from './app/validators/AppointmentStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

// #region Without authMiddleware

// #region Users
routes.post('/users', validateUserStore, UserController.store);
// #endregion

// #region Sessions
routes.post(
  '/sessions',
  bruteForce.prevent,
  validateSessionStore,
  SessionController.store
);
// #endregion

// #endregion

// #region With authMiddleware
routes.use(authMiddleware);

// #region Users
routes.put('/users', validateUserUpdate, UserController.update);
// #endregion

// #region Providers
routes.get('/providers', ProviderController.index);
routes.get('/providers/:provider_id/available', AvailableController.index);
// #endregion

// #region Appointments
routes.get('/appointments', AppointmentController.index);
routes.post(
  '/appointments',
  validateAppointmentStore,
  AppointmentController.store
);
routes.delete('/appointments/:id', AppointmentController.delete);
// #endregion

// #region Schedule
routes.get('/schedules', ScheduleController.index);
// #endregion

// #region Notification
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);
// #endregion

// #region Files
routes.post('/files', upload.single('file'), FileController.store);
// #endregion

// #endregion

export default routes;
