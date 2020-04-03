import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryFinishedController from './app/controllers/DeliveryFinishedController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import authMiddleware from './app/middlewares/auth';
import adminCheck from './app/middlewares/admin';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

routes.post('/sessions', SessionController.store);

routes.get('/sessions/deliveryman/:id', SessionController.show);
routes.get('/deliveryman/:id', DeliveryController.index);
routes.get('/deliveryman/:id/delivery/:deliveryid', DeliveryController.show);
routes.put('/deliveryman/:id/delivery/:deliveryid', DeliveryController.update);

routes.get('/deliveryman/:id/deliveries', DeliveryFinishedController.index);

routes.get('/problems', DeliveryProblemController.index);
routes.get('/delivery/:id/problems', DeliveryProblemController.show);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', adminCheck, RecipientController.store);
routes.put('/recipients/:id', adminCheck, RecipientController.update);
routes.delete('/recipients/:id', adminCheck, RecipientController.delete);

routes.get('/deliverymans', adminCheck, DeliverymanController.index);
routes.get('/deliverymans/:id', adminCheck, DeliverymanController.show);
routes.post('/deliverymans', adminCheck, DeliverymanController.store);
routes.put('/deliverymans/:id', adminCheck, DeliverymanController.update);
routes.delete('/deliverymans/:id', adminCheck, DeliverymanController.delete);

routes.get('/deliveries', adminCheck, OrderController.index);
routes.get('/deliveries/:id', adminCheck, OrderController.show);
routes.post('/deliveries', adminCheck, OrderController.store);
routes.put('/deliveries/:id', adminCheck, OrderController.update);
routes.delete('/deliveries/:id', adminCheck, OrderController.delete);

export default routes;
