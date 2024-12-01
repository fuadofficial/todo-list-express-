import { useState, useRef, useEffect } from "react";
import AddItem from "../AddItem/AddItem";
import TodoList from "../TodoList/TodoList";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Home.css";

const API_URL = "http://localhost:4000/api/todo";

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const inputRef = useRef();

    useEffect(() => {
        fetchTodo()
        inputRef.current.focus();
    }, []);

    const fetchTodo = async () => {
        try {
            const response = await axios(API_URL)
            setTodos(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const addValue = async () => {
        try {
            if (inputValue !== "") {
                if (editIndex !== null) {
                    const response = await axios(API_URL, {
                        method: 'PUT',
                        data: {
                            _id: todos[editIndex]._id,
                            todo: inputValue,
                            isCompleted: todos[editIndex].isCompleted
                        }
                    });
                    setTodos((prevTodos) =>
                        prevTodos.map((todo, index) =>
                            index === editIndex ? response.data : todo
                        )
                    );
                    setEditIndex(null);
                } else {
                    // Add new todo
                    const response = await axios(API_URL, {
                        method: 'POST',
                        data: {
                            todo: inputValue
                        }
                    });
                    setTodos((prevTodos) => [...prevTodos, response.data]);
                }
                setInputValue("");
            } else {
                alert("Please enter a value!");
            }
        } catch (error) {
            console.error(error.response?.data?.message || "An error occurred");
        }
        inputRef.current.focus();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addValue();
        }
    };

    const deleteItem = async (index) => {
        try {
            const todoId = todos[index]._id;
            await axios.delete(API_URL, {
                data: { _id: todoId },
            });
            setTodos((prevTodos) => prevTodos.filter((_, id) => id !== index));
            inputRef.current.focus();
            toast.success("Task deleted successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete the task.");
        }
    };

    const editItem = (index) => {
        setInputValue(todos[index].todo);
        setEditIndex(index);
        inputRef.current.focus();
    };

    return (
        <div className="home-container">
            <div className="todo-list">
                <div className="heading">
                    <h1>MOBILE SHOP</h1>
                </div>
                <div className="add-item">
                    <AddItem
                        handleKeyDown={handleKeyDown}
                        inputValue={inputValue}
                        handleChange={handleChange}
                        addValue={addValue}
                        inputRef={inputRef}
                    />
                </div>
                <div className="todo-list">
                    <TodoList todos={todos} deleteItem={deleteItem} editItem={editItem} />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
                transition:Bounce
            />
        </div>
    );
};

export default Home;
