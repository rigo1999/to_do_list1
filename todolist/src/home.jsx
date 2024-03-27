import React, { useState } from 'react';
import './styles.css';

const TodoList = () => {
    const [inputTask, setInputTask] = useState('');
    const [list, setList] = useState([]);
    const [editingTask, setEditingTask] = useState(null); // State for editing task

    const handleAddTodo = () => {
        if (inputTask !== "") {
            const newTask = {
                id: Math.random(),
                todo: inputTask,
            };
            setList([...list, newTask]);
            setInputTask('');
        } else {
            alert("Please enter a task");
        }
    };

    const handleDeleteTodo = (id) => {
        const newList = list.filter((todo) => todo.id !== id);
        setList(newList);
    };

    const handleInputChange = (event) => {
        setInputTask(event.target.value);
    };

    const handleEdit = (id) => {
        const taskToEdit = list.find((todo) => todo.id === id);
        if (taskToEdit) {
            setEditingTask({ id: taskToEdit.id, text: taskToEdit.todo });
        }
    
    };

    const handleSaveEdit = () => {
        if (editingTask) {
            const newList = list.map((todo) => {
                if (todo.id === editingTask.id) {
                    return { ...todo, todo: editingTask.text }; // Update edited task
                }
                return todo;
            });
            setList(newList);
            setEditingTask(null); // Clear editing state
        }
    };

    return (
        <div className="Todo">
            <h1>My To-Do List</h1>

            <div className="Top">
                <input className="input" type="text" value={inputTask} onChange={handleInputChange} placeholder="Enter a task" />
                <button className="btn" onClick={handleAddTodo}>ADD</button>
            </div>

            <ul>
                {list.map((todo) => (
                    <li className="task" key={todo.id}>
                        {editingTask?.id === todo.id ? ( // Check if this task is being edited
                            <div className="edit-task">
                                <input
                                id='edit_in'
                                    type="text"
                                    value={editingTask.text} // Pre-fill with existing task text
                                    onChange={(event) => setEditingTask({ ...editingTask, text: event.target.value })} // Update editingTask text on change
                                />
                                <div className='btn_edit'> <button id='save' onClick={handleSaveEdit}>Save </button>
                                    <button id='cancel' onClick={() => setEditingTask(null)}>Cancel</button></div>
                            </div>
                        ) : (
                            <div className='del_edi'>
                                    <div id='tile'>{todo.todo}</div>
                                <button id='delete' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                <button id='edit' onClick={() => handleEdit(todo.id)}>Edit</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
