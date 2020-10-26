import React, {Fragment, useState} from 'react';

const EditTodo = ({todo}) => {
    const [description, setDescription] = useState(todo.description);

    const updateDescription = async e => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch(`http://localhost:3003/todos/${todo.todo_uid}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });    

            window.location = '/';
        } catch (err) {
            console.error(err.message);
        }
    }
    
    return (
    <Fragment>
        {/* Button to Open the Modal */}
        <button type="button" className="btn btn-secondary" data-toggle="modal" data-target={`#id${todo.todo_uid}`}>
            Edit
        </button>

        {/* The Modal */}
        <div className="modal" id={`id${todo.todo_uid}`} onClick={() => setDescription(todo.description)}>
            <div className="modal-dialog">
                <div className="modal-content">

                {/* Modal Header  */}
                <div className="modal-header">
                    <h4 className="modal-title">Edit Todo</h4>
                    <button 
                        type="button" 
                        className="close" 
                        data-dismiss="modal"
                        onClick={() => setDescription(todo.description)}
                    >
                        &times;
                    </button>
                </div>

                {/* Modal body */}
                <div className="modal-body">
                    <div className="form-group">
                        <label className="text-left font-weight-bold">Description: </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={description} 
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    
                </div>

                {/* Modal footer */}
                <div className="modal-footer">
                    <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={e => updateDescription(e)}>Edit</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                </div>

                </div>
            </div>
        </div>
    </Fragment>
    );
};

export default EditTodo;