import { Router } from 'express';
import { taskController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = Router();

router.use(authMiddleware);

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id', taskController.patchTask);

export default router;
