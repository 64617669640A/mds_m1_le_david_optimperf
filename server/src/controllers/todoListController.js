import mongoose from 'mongoose'
import { TodoListSchema } from '../models/todoListModel'

const Todo = mongoose.model('Todo', TodoListSchema)

export const addNewTodo = (req, res) =>  {
    let newTodo = new Todo(req.body)

    newTodo.save((err, todo) => {
        if (err) res.send(err)
        res.json(todo)
    })
}

export const getTodo = (req, res) => {
    Todo.find({}, (err, todo) => {
        if (err) res.send(err)
        res.status(200).json({ todos: todo, totalTodo: Object.keys(todo).length })
    })
}

export const getTodoWithID = (req, res) => {
    Todo.findById(req.params.todoId, (err, todo) => {
        if (err) res.send(err)
        res.json(todo)
    })
}

export const updateTodo = (req, res) => {
    Todo.findByIdAndUpdate({ _id: req.params.todoId }, req.body, { new: true }, (err, todo) => {
        if (err) res.send(err);
        res.json(todo);
    })
}

export const deleteTodo = (req, res) => {
    Todo.findByIdAndRemove({ _id: req.params.todoId }, (err, todo) => {
        if (err) res.send(err)
        res.json({ message: 'Effacer todo avec succès'})
    })
}