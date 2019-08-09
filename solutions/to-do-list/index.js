const express = require('express');
const app = express();

app.use(express.json());

const tasks = [{ id: 1, title: 'buy the milk' }, { id: 2, title: 'rent a car' }, { id: 3, title: 'feed the cat' }];

// get all tasks
app.get('/tasks', (req, res) => {
    res.send(tasks);
});


// add a task
app.post('/tasks', (req, res) => {
    const task = {
        id: tasks.length + 1,
        title: req.body.title
    }
    tasks.push(task);
    res.send(task);
});

// delete a task
app.delete('/tasks/:id', (req, res) => {
    const task = tasks.find(g => g.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('The task with the given ID was not found.');

    const index = tasks.indexOf(task);
    tasks.splice(index, 1);

    res.send(task);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));