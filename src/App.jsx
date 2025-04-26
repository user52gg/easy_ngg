import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Загружаем задачи из localStorage при инициализации
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, text: 'Изучить React', completed: false },
      { id: 2, text: 'Написать приложение', completed: false },
      { id: 3, text: 'Разместить на GitHub', completed: false }
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  // Сохраняем задачи в localStorage при их изменении
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim()) {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <div className="app">
      <h1>Список задач</h1>
      <div className="task-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите задачу..."
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Добавить</button>
      </div>
      
      <div className="filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          Все ({tasks.length})
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''} 
          onClick={() => setFilter('active')}
        >
          Активные ({activeCount})
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => setFilter('completed')}
        >
          Выполненные ({completedCount})
        </button>
        {completedCount > 0 && (
          <button className="clear-btn" onClick={clearCompleted}>
            Очистить выполненные
          </button>
        )}
      </div>
      
      <ul className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span className="task-text">{task.text}</span>
              <span className="task-status">
                {task.completed ? '✓ Выполнена' : '⏳ В работе'}
              </span>
              <button 
                className="delete-btn" 
                onClick={() => deleteTask(task.id)}
              >
                Удалить
              </button>
            </li>
          ))
        ) : (
          <p className="no-tasks">Нет задач по выбранному фильтру</p>
        )}
      </ul>
    </div>
  );
}

export default App;
