import React, {Fragment, useEffect, useState} from 'react';
import EditTodo from './EditTodo';

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch('http://localhost:3003/todos');
            const jsonData = await response.json();

            setTodos(jsonData);
            // console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodos();
    },[]);

    // delete todo function
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:3003/todos/${id}`, {
                method: 'DELETE'
            });

            setTodos(todos.filter(todo => todo.todo_uid !== id));
            // console.log(deleteTodo);
        } catch (err) {
            console.error(err.message);
        }
    };

    return(
        <Fragment>
            <h2 className="text-center mt-5">Todo Lists</h2>
            <table className="table mt-3 text-center">
                <thead className="thead-dark">
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                
                    {
                        todos.map(todo => (
                            <tr key={todo.todo_uid}>
                                <td>{todo.description}</td>
                                <td>
                                    <EditTodo todo={todo}/>
                                </td>
                                <td>
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => deleteTodo(todo.todo_uid)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;