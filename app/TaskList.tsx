'use client';

import { useEffect, useState } from 'react';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(setTasks);
  }, []);

  const toggleTask = async (id, completed) => {
    const updatedTask = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    }).then(res => res.json());

    setTasks(tasks.map(task => task.id === id ? updatedTask : task));
  };

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <ul className="mt-4">
      {tasks.map(task => (
        <li key={task.id} className="flex items-center justify-between mb-2">
          <span className={task.completed ? 'line-through' : ''}>
            {task.title}
          </span>
          <div>
            <button onClick={() => toggleTask(task.id, task.completed)} className="mr-2 px-2 py-1 bg-blue-500 text-white rounded">
              Toggle
            </button>
            <button onClick={() => deleteTask(task.id)} className="px-2 py-1 bg-red-500 text-white rounded">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

