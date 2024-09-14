const express = require('express')
const router = express.Router()
const Todo = require('../model/todoModel')

router.get('/', async (req, res) => {
    const todoList = await Todo.find()
    res.status(200).json(todoList);
});

router.post('/', async (req, res) => {
    try {
        const { todo,isCompleted } = req.body;

        // Check if the required "todo" field exists in the request body
        if (!todo) {
            return res.status(400).json({
                message: `Invalid request: Required attribute "todo" is missing.`,
            });
        }

        const todoItem = { todo, isCompleted }

        // Create a new todo item in the database
        await Todo.create(todoItem);

        res.status(201).json('Todo item added successfully');
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});


router.put('/', (req, res) => {
    const { id, todo, isCompleted } = req.body;
    const requiredFields = ['id', 'todo', 'isCompleted'];
    const missingFields = [];

    requiredFields.forEach(field => {
        if (req.body[field] === undefined || req.body[field] === '') {
            missingFields.push(field);
        }
    });

    if (missingFields.length) {
        return res.status(400).json({
            message: missingFields.map(field => `Field '${field}' is required`).join(', '),
        });
    }

    const index = todoList.findIndex((item) => item.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: `Item with id: ${id} doesn't exist.`,
        });
    }

    todoList[index].todo = todo;
    todoList[index].isCompleted = isCompleted;

    res.status(200).json(todoList);
});

router.delete('/', (req, res) => {
    const { id } = req.body;
    const todoIndex = todoList.findIndex((item) => item.id === id);
    if (todoIndex !== -1) {
        todoList.splice(todoIndex, 1);
        return res.json(todoList);
    }
    res.status(404).json({
        message: `Item : ${id} , doesn't exist`,
    });
});

module.exports = router