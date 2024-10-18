'use client';

import TaskItem from './TaskItem';

export default function TaskList({ tasks }) {
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
