const express = require('express');
const router = express.Router();
const { taskController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.use(authMiddleware);

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id', taskController.patchTask);

module.exports = router;
