'use client';

import { useState } from 'react';

export default function CreateTaskForm() {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    setTitle('');
    // You might want to refresh the task list here
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
        className="border p-2 mr-2"
      />
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
        Add Task
      </button>
    </form>
  );
}

