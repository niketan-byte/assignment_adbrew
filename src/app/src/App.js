// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [error, setError] = useState(null);
//   const newTodoRef = useRef('');

//   // This function is for fetching all the todo items.
//   const fetchTodos = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/todos/');
//       if (response.status === 200) {
//         setTodos(response.data);
//         setError(null);
//       } else {
//         setError('Error fetching Todos');
//       }
//     } catch (error) {
//       setError('Network error');
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   // This function is for adding a new todo item.
//   const addTodo = async () => {
//     const newTodo = newTodoRef.current.value;

//     try {
//       const response = await axios.post('http://localhost:8000/todos/', {
//         description: newTodo // Ensure the key matches the backend expectation
//       });

//       if (response.status === 201) {
//         fetchTodos(); // Refresh the TODO list
//         newTodoRef.current.value = '';
//         window.alert('Todo added successfully!');
//         setError(null);
//       } else {
//         setError('Error adding todo');
//       }
//     } catch (error) {
//       setError('Network error');
//     }
//   };

//   // This function is for deleting all todo items.
//   const handleDeleteAll = async () => {
//     try {
//       const response = await axios.delete('http://localhost:8000/todos/');
//       if (response.status === 200) {
//         fetchTodos(); // Refresh the TODO list
//         window.alert('All Todos deleted successfully!');
//         setError(null);
//       } else {
//         setError('Error deleting todos');
//       }
//     } catch (error) {
//       setError('Network error');
//     }
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//       <div>
//         <h1>List of TODOs</h1>
//         {error ? (
//           <p>Error: {error}</p>
//         ) : todos.length === 0 ? (
//           <p>No items to display.</p>
//         ) : (
//           <ul>
//             {todos.map((todo, index) => (
//               <li key={index}>{todo.description}</li> // Ensure the key matches the backend data
//             ))}
//           </ul>
//         )}
//       </div>
//       <div>
//         <h1>Create a ToDo</h1>
//         <form>
//           <div>
//             <label htmlFor="todo">ToDo: </label>
//             <input type="text" ref={newTodoRef} />
//           </div>
//           <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'center' }}>
//             <button type="button" onClick={addTodo}>
//               Add ToDo!
//             </button>
//           </div>
//         </form>
//       </div>
//       <div style={{ marginTop: '20px' }}>
//         <button type="button" onClick={handleDeleteAll}>
//           Delete All TODOs
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const newTodoRef = useRef('');

  // This function is for fetching all the todo items.
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/todos/');
      if (response.status === 200) {
        setTodos(response.data); 
        setError(null);
      } else {
        setError('Error fetching Todos');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []); 

  // This function is for adding a new todo item.
  const addTodo = async () => {
    const newTodo = newTodoRef.current.value; 

    try {
      const response = await axios.post('http://localhost:8000/todos/', {
        todo: newTodo
      });

      if (response.status === 201) {
        setTodos([...todos, newTodo]);
        newTodoRef.current.value = ''; 
        window.alert('Todo added successfully!'); 
        setError(null);
      } else {
        setError('Error adding todo');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  return (
    <div style={{"display": "flex","justify-content":"center","align-items":"center","flex-direction":"column"}}>
      <div>
        <h1>List of TODOs</h1>
        {error ? (
          <p>Error: {error}</p> 
        ) : todos.length === 0 ? (
          <p>No items to display.</p>
        ) : (
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h1>Create a ToDo</h1>
        <form>
          <div>
            <label htmlFor="todo">ToDo: </label>
            <input
              type="text"
              ref={newTodoRef} 
            />
          </div>
          <div style={{ "marginTop": "5px","display": "flex","justify-content": "center"}}>
            <button type="button" onClick={addTodo}>
              Add ToDo!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;