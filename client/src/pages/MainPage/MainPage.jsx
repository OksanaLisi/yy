import React, { useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './MainPage.scss';

const MainPage = () => {
    const [textCheck, setTextCheck] = useState('');
    const [textAdd, setTextAdd] = useState('');
    const { userId } = useContext(AuthContext);
    const [todos, setTodos] = useState([]);
    const [duplicateMessage, setDuplicateMessage] = useState('');
    const [deletingTodo, setDeletingTodo] = useState(null);

    const getTodo = useCallback(async () => {
        try {
            const response = await axios.get('https://ppcf-91cf71bd56b4.herokuapp.com/api/todo', {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setTodos(response.data);
        } catch (error) {
            console.log(error);
            res.json(error) 
        }
    }, [userId]);

    const createTodo = useCallback(async () => {
        if (!textAdd) return;
    
        const words = textAdd.split(/\s+/); 
    
        const newTodos = [];
        const duplicateMessages = [];
    

        await Promise.all(words.map(async word => {
            const lowerCaseWord = word.toLowerCase();
            const isDuplicate = todos.some(todo => todo.text.toLowerCase() === lowerCaseWord);
            if (isDuplicate) {
                duplicateMessages.push(`${word}: This domain name already exists.`);
            } else {
                try {
                    const response = await axios.post('https://ppcf-91cf71bd56b4.herokuapp.com/api/todo/add', { text: word }, {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    newTodos.push(response.data);
                } catch (error) {
                    console.log(error);
                    res.json(error) 
                }
            }
        }));
    
  
        setTodos([...todos, ...newTodos]);
        setDuplicateMessage(duplicateMessages.join('\n')); 
        setTextAdd('');
    }, [textAdd, todos]);
    
    const checkTodo = useCallback(async () => {
        if (!textCheck) return;
    
        const words = textCheck.split(/\s+/); 
    
        const duplicateMessages = [];
    
        words.forEach(word => {
            const lowerCaseWord = word.toLowerCase();
            const isDuplicate = todos.some(todo => todo.text.toLowerCase() === lowerCaseWord);
            if (isDuplicate) {
                duplicateMessages.push(`${word}: This domain name already exists.`);
            } else {
                duplicateMessages.push(`${word}: This domain name is FREE`);
            }
        });
    
        setDuplicateMessage(duplicateMessages.join('\n')); 
    }, [textCheck, todos]);
    

    const removeTodos = useCallback(async (todo) => {
        setDeletingTodo(todo); 
    }, []);

    const confirmDelete = async (id) => {
        try {
            await axios.delete(`https://ppcf-91cf71bd56b4.herokuapp.com/api/todo/delete/${id}`, {
                headers: { 'Content-Type': 'application/json' }
            });
            await getTodo();
            setDeletingTodo(null);
        } catch (error) {
            console.log(error);
            res.json(error) 
        }
    };

    useEffect(() => {
        getTodo();
    }, [getTodo]);

    return (
        <div className="container">
            <div className="main-page" id="blured">
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                type="text"
                                id="textCheck"
                                name="inputCheck"
                                className="validate"
                                value={textCheck}
                                onChange={e => {
                                    setTextCheck(e.target.value);
                                    setDuplicateMessage('');
                                }}
                            />
                            <label htmlFor="inputCheck">Check domain name</label>
                            {duplicateMessage && <p className="red-text">{duplicateMessage}</p>}
                        </div>
                    </div>
                    <div className="row">
                        <button className="login-reg-button" onClick={checkTodo}>
                            Check
                        </button>
                    </div>
                </form>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                type="text"
                                id="textAdd"
                                name="inputAdd"
                                className="validate"
                                value={textAdd}
                                onChange={e => {
                                    setTextAdd(e.target.value);
                                    setDuplicateMessage('');
                                }}
                            />
                            <label htmlFor="inputAdd">Add domain name</label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="login-reg-button" onClick={createTodo}>
                            Add New
                        </button>
                    </div>
                </form>

                <h3>Active domains</h3>
                <div className="todos">
                    {todos.slice().reverse().map((todo, index) => (
                        <div className="">
                            <div className="row flex todos-item" key={index}>
                                <div className="col todos-num">{todos.length - index}</div>
                                <div className="col todos-text">{todo.text}</div>
                                <div className="col todos-buttons">
                                    <i
                                        className="material-icons red-text"
                                        onClick={() => removeTodos(todo)}
                                    >
                                        delete
                                    </i>
                                </div>
                            </div>
                            {deletingTodo && deletingTodo._id === todo._id && (
                                <div className="confirmation-modal">
                                    <div className="confirmation-back">
                                        <p>Delete <span>{todo.text}</span>?</p>
                                        <div>
                                            <button className="login-reg-button" onClick={() => confirmDelete(todo._id)}>Confirm</button>
                                            <button className="login-reg-button-grey" onClick={() => setDeletingTodo(null)}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
