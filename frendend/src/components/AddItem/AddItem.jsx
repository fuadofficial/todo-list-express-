/* eslint-disable react/prop-types */
import "./AddItem.css";

const AddItem = ({ inputValue, handleChange, addValue, inputRef,handleKeyDown  }) => {
  return (
    <div className="add-item-container">
      <input
        placeholder="Add new item..."
        type="text"
        value={inputValue}
        onChange={handleChange}
        ref={inputRef} 
        onKeyDown={handleKeyDown}
      />
      <button onClick={addValue}>Add</button>
    </div>
  );
};

export default AddItem;
