'use client';

import { useState, useEffect } from 'react';
import TaskList from './TaskList';
import CreateTaskForm from './CreateTaskForm';
import { getTasks } from './actions';
import { supabase } from './supabase';

export default function TaskListWrapper({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('tasks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setTasks(prevTasks => [payload.new as Task, ...prevTasks]);
        } else if (payload.eventType === 'UPDATE') {
          setTasks(prevTasks => prevTasks.map(task => 
            task.id === payload.new.id ? payload.new as Task : task
          ));
        } else if (payload.eventType === 'DELETE') {
          setTasks(prevTasks => prevTasks.filter(task => task.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
