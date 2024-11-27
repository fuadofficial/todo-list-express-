const express = require('express')
const router = express.Router()
const Todo = require('../model/todoModel')

router.get('/', async (req, res) => {
    const todoList = await Todo.find().select('todo isCompleted ');

    res.status(200).json(todoList);
});

router.post('/', async (req, res) => {
    try {
        const { todo } = req.body

        const todoItem = {
            todo: todo,
            isCompleted: false
        }

        const createTodo = await Todo.create(todoItem);

        res.status(200).json(createTodo);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.put('/', async (req, res) => {
    try {
        const { _id, todo, isCompleted } = req.body;

        const fieldToUpdate = {
            todo,
            isCompleted
        }

        const updateData = await Todo.findByIdAndUpdate(_id, fieldToUpdate, { new: true })

        if (updateData) {
            return res.status(200).json(updateData)
        }

        res.status(400).json({
            message: `item with id: ${id} does not exist for update`
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

router.delete('/', async (req, res) => {
    try {
        const { _id } = req.body;

        const deletedField = await Todo.findByIdAndDelete(_id)

        if (deletedField) {
            // const allTodos = await Todo.find()
            return res.status(200).json(deletedField);
        }
        res.status(404).json({
            message: `Item : ${id} , doesn't exist for delete`,
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
});

module.exports = router