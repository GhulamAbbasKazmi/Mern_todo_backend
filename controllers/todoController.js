const TodoModel = require('../models/Todo');

// Add a new todo
exports.addTodo = (req, res) => {
    const { task, userId } = req.body; // Get userId from request body
    TodoModel.create({ task, user: userId })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: 'An error occurred', details: err }));
};

// Get all todos for the authenticated user
exports.getTodos = (req, res) => {
    const { userId } = req.params;
    TodoModel.find({ user: userId })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: 'An error occurred', details: err }));
};

// Edit (toggle done) a todo
exports.editTodo = (req, res) => {
    const { id } = req.params;
    const { userId } = req.body; // Get userId from request body

    TodoModel.findOne({ _id: id, user: userId })
        .then(todo => {
            if (!todo) return res.status(404).json({ error: 'Todo not found' });

            // Toggle the 'done' field
            todo.done = !todo.done;

            return todo.save();
        })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: 'An error occurred', details: err }));
};

// Update a todo's task
exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const { task, userId } = req.body; // Get userId from request body

    TodoModel.findOneAndUpdate({ _id: id, user: userId }, { task: task }, { new: true })
        .then(result => {
            if (!result) return res.status(404).json({ error: 'Todo not found' });
            res.json(result);
        })
        .catch(err => res.status(500).json({ error: 'An error occurred', details: err }));
};

// Delete a todo
exports.deleteTodo = (req, res) => {
    const { id, userId } = req.params;
    // const { userId } = req.body; 

    TodoModel.findOneAndDelete({ _id: id, user: userId })
        .then(result => {
            if (!result) return res.status(404).json({ error: 'Todo not found' });
            res.json({ message: 'Todo deleted successfully' });
        })
        .catch(err => res.status(500).json({ error: 'An error occurred', details: err }));
};
