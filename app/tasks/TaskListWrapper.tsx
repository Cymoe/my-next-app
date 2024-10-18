'use client';

import { useState, useEffect } from 'react';
import TaskList from './TaskList';
import CreateTaskForm from './CreateTaskForm';
import { getTasks } from './actions';

export default function TaskListWrapper({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };
    fetchTasks();
  }, []);

  const addTask = (newTask) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const updateTask = (updatedTask) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const deleteTask = (deletedTaskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== deletedTaskId));
  };

  return (
    <>
      <CreateTaskForm onTaskCreated={addTask} />
      <TaskList 
        tasks={tasks} 
        onUpdate={updateTask} 
        onDelete={deleteTask} 
      />
    </>
  );
}
