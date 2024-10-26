const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authMiddleware');
const todoController = require('../controllers/todoController');

// Define the routes
// router.post('/add', authenticateUser, todoController.addTodo);
// router.get('/get', authenticateUser, todoController.getTodos);
// router.put('/edit/:id', authenticateUser, todoController.editTodo);
// router.put('/update/:id', authenticateUser, todoController.updateTodo);
// router.delete('/delete/:id', authenticateUser, todoController.deleteTodo);

router.post('/add',  todoController.addTodo);
router.get('/get/:userId',  todoController.getTodos);
router.put('/edit/:id',  todoController.editTodo);
router.put('/update/:id',  todoController.updateTodo);
router.delete('/delete/:id/:userId',  todoController.deleteTodo);


module.exports = router;
