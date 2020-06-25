import {
    addNewTodo,
    getTodo,
    getTodoWithID,
    updateTodo,
    deleteTodo
} from '../controllers/todoListController.js'

const routes = (app) => {
    app.route('/todo')
    .get((req, res, next) => {
        console.log(`Request de: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getTodo)
    .post(addNewTodo)

    app.route('/todo/:todoId')
    .get(getTodoWithID)
    .put(updateTodo)
    .delete(deleteTodo)
}

export default routes;