/* eslint-disable react/prop-types */
import "./TodoList.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const TodoList = ({ todos, deleteItem, editItem }) => {

  return (
    <div className="todo-list-container">
      {todos.map((data, index) => {
        return (
          <div className="list" key={index}>
            <div className="data">
              <span>{data.todo}</span>
            </div>
            <div className="buttons">
              <button onClick={() => editItem(index,data.todo)}>
                <FaEdit />
              </button>
              <button onClick={() => deleteItem(index)}>
                <MdDelete />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
