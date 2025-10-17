import React, { useEffect, useState } from 'react';
import API from '../api';

export default function TodoPage({ user }) {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [darkMode, setDarkMode] = useState(false);

const toggleDarkMode = () => setDarkMode(prev => !prev);

  const fetchTodos = async () => {
    try {
      const res = await API.get('/todos');
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTitle) return;
    const res = await API.post('/todos', { title: newTitle });
    setTodos([res.data, ...todos]);
    setNewTitle('');
  };

  const toggleTodo = async (id, completed) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t._id === id ? { ...t, completed: !completed } : t))
    );

    try {
      await API.put(`/todos/${id}`, { completed: !completed });
    } catch (err) {
      console.error('Toggle failed:', err);
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t._id === id ? { ...t, completed } : t))
      );
    }
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  const styles = {
    page: {
      minHeight: '100vh',
      padding: '50px 20px',
      display: 'flex',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #9b5de5, #ffffff)',
      fontFamily: 'Arial, sans-serif',
    },
    container: {
      width: '100%',
      maxWidth: '700px',
      background: '#fff',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    },
    header: {
      textAlign: 'center',
      color: '#6a1b9a',
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '30px',
    },
    form: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    input: {
      flex: 1,
      padding: '12px',
      borderRadius: '15px',
      border: '1px solid #d1c4e9',
      fontSize: '16px',
    },
    addBtn: {
      padding: '12px 25px',
      border: 'none',
      borderRadius: '15px',
      background: 'linear-gradient(90deg, #9b5de5, #6a1b9a)',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      textAlign: 'left',
      padding: '10px',
      background: '#f3e5f5',
      color: '#6a1b9a',
      borderBottom: '2px solid #d1c4e9',
    },
    td: {
      padding: '10px',
      borderBottom: '1px solid #d1c4e9',
      verticalAlign: 'middle',
    },
    todoTitle: {
      fontSize: '16px',
      color: 'black',
    },
    completed: {
      textDecoration: 'line-through',
      color: 'gray',
    },
    checkbox: {
      width: '18px',
      height: '18px',
      accentColor: '#9b5de5',
    },
    deleteBtn: {
      background: 'none',
      border: 'none',
      color: '#e53935',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    empty: {
      textAlign: 'center',
      color: '#757575',
      fontStyle: 'italic',
      padding: '15px 0',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.header}>Welcome, {user.name || user.email}</h2>
         <div style={{
  background: darkMode ? '#1e1e1e' : 'linear-gradient(135deg, #9b5de5, #ffffff)',
  color: darkMode ? '#fff' : '#000',
  minHeight: '100vh',
  padding: '50px 20px',
  transition: 'all 0.3s ease'
}}>
  <button onClick={toggleDarkMode} style={{ border:'none',marginBottom: '20px', padding: '8px 16px', cursor: 'pointer', borderRadius:'12px',background: 'linear-gradient(90deg, #9b5de5, #6a1b9a)',
      color: 'white',}}>
    {darkMode ? 'Light Mode' : 'Dark Mode'}
  </button>
        <form style={styles.form} onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Add a new todo..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.addBtn}>Add</button>
        </form>

        {todos.length === 0 ? (
          <p style={styles.empty}>No todos yet. Add one above!</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Done</th>
                <th style={styles.th}>Task</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((t) => (
                <tr key={t._id}>
                  <td style={styles.td}>
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => toggleTodo(t._id, t.completed)}
                      style={styles.checkbox}
                    />
                  </td>
                  <td style={styles.td}>
                    <span style={t.completed ? { ...styles.todoTitle, ...styles.completed } : styles.todoTitle}>
                      {t.title }
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => deleteTodo(t._id)} style={styles.deleteBtn}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </div>
      </div>
    </div>
  );
}
