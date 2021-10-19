import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AuthenticateUserController from '../controllers/AuthenticateUserController';
import CreateMessageController from '../controllers/CreateMessageController';
import GetLastThreeMessagesController from '../controllers/GetLastThreeMessagesController';
import UserProfileController from '../controllers/UserProfileController';

const router = Router();

const authenticateUserController = new AuthenticateUserController();
const createMessageController = new CreateMessageController();
const getLastThreeMessagesController = new GetLastThreeMessagesController();
const userProfileController = new UserProfileController();

router.post('/authenticate', authenticateUserController.handle);
router.post('/messages', ensureAuthenticated, createMessageController.handle);
router.get('/messages/last-three', getLastThreeMessagesController.handle);
router.get('/profile', ensureAuthenticated, userProfileController.handle);

export default router;
