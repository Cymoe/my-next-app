'use client';

import React from 'react';
import TaskItem from './TaskItem';

// Define the Task interface
interface Task {
  id: number;
  title: string;
  due_date: string | undefined;  // Changed from string | null to string | undefined
  completed: boolean;
}

// Update the component to use the Task interface
export default function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return <div>No tasks found. Create a new task to get started!</div>
  }

  return (
    <ul className="mt-4 space-y-4">
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task}
        />
      ))}
    </ul>
  );
}
