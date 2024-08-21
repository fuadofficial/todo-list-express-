import { useState, useRef, useEffect } from "react";
import AddItem from "../AddItem/AddItem";
import TodoList from "../TodoList/TodoList";
import axios from "axios";
import "./Home.css";

const API_URL = "http://localhost:3000/api/todo"

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const inputRef = useRef();

    useEffect(() => {
        fetchTodo()
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

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
            if (inputValue) {
                if(editIndex){
                    
                }
                const response = await axios(API_URL, {
                    method: "POST",
                    data: {
                        todo: inputValue
                    }
                })
            } else {
                alert("Please enter your value!")
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue("");
        inputRef.current.focus();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addValue();
        }
    };

    const deleteItem = (index) => {
        setTodos(todos.filter((_, item) => item !== index));
        if (index === editIndex) {
            setEditIndex(null);
            setInputValue("");
        }
        inputRef.current.focus();
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
        </div>
    );
};

export default Home;
