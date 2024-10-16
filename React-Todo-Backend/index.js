const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors({
    origin: 'https://duty-dash.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Specify the allowed HTTP methods
    credentials: true, // Enable CORS credentials if needed
}));

try {
    mongoose.connect('mongodb+srv://visweish:visweish03@cluster0.30sjeoa.mongodb.net/TodoApp?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected!!!')
} catch (e) {
    console.log('MongoDB connection error: ', e)
}

const taskSchema = new mongoose.Schema({
    taskName: { type: String },
    taskDesc: { type: String },
    taskDate: { type: Date },
    addedBy: { type: String },
    completed: { type: String, default: "uncompleted" }
})
const Task = mongoose.model('tasks', taskSchema)

// Routes
app.get('/', async (req, res) => {
    res.json("Backend work for react todo");
});

app.post('/add-task', async (req, res) => {
    console.log(req.body);
    let { taskName, taskDesc, taskDate, addedBy } = req.body;
    let result = new Task({
        taskName: taskName,
        taskDesc: taskDesc,
        taskDate: taskDate,
        addedBy: addedBy,
    })
    result.save()
    console.log(result)
    console.log('Data saved')
    res.send(result)
})


app.get('/api-tasks', async (req, res) => {
    let tasks = await Task.find()
    res.json(tasks)
})

app.get('/api-tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).json({ message: 'Task not found' })
        }
        res.json(task)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.put('/api-tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' })
        }
        res.json(updatedTask)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.patch('/api-tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            task.completed = req.body.completed;
            await task.save();
            res.status(200).json({ message: 'Task updated successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});


app.delete('/api-tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Failed to delete task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Starting the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Session started on port ${PORT}`);
});
