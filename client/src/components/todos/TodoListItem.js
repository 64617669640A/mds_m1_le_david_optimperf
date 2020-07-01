import React from 'react';
import Button from '@material-ui/core/Button';
import './TodoListItem.css';

const TodoListItem = ({ todo, onRemovePressed }) => (
    <div className="todo-item-container">
        <h3>{todo.text}</h3>
        <div className="buttons-container">
            <Button variant="contained" color="primary">
                Mark As Complete
            </Button>
            <Button
                onClick={() => onRemovePressed(todo.text)}
                variant="contained"
                color="secondary">
                Remove
            </Button>
        </div>
    </div>
);

export default TodoListItem;