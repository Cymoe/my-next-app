'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { updateTaskAction, deleteTaskAction } from './actions';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  due_date?: string;
}

export default function TaskItem({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleUpdate = async (formData: FormData) => {
    await updateTaskAction(task.id, formData);
    setIsEditing(false);
    router.refresh();
  };

  const handleDelete = async () => {
    await deleteTaskAction(task.id);
    router.refresh();
  };

  if (isEditing) {
    return (
      <li className="flex items-center justify-between mb-2">
        <form action={handleUpdate}>
          <input name="title" defaultValue={task.title} className="border p-1 mr-2" />
          <input name="due_date" type="date" defaultValue={task.due_date} className="border p-1 mr-2" />
          <button type="submit" className="px-2 py-1 bg-blue-500 text-white rounded mr-2">Save</button>
          <button type="button" onClick={() => setIsEditing(false)} className="px-2 py-1 bg-gray-500 text-white rounded">Cancel</button>
        </form>
      </li>
    );
  }

  return (
    <li className="flex items-center justify-between mb-2">
      <Link href={`/tasks/${task.id}`} className="text-blue-500 hover:underline">
        <span className={task.completed ? 'line-through' : ''}>
          {task.title} (Due: {task.due_date || 'No due date'})
        </span>
      </Link>
      <div>
        <button onClick={() => setIsEditing(true)} className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">Edit</button>
        <button onClick={handleDelete} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
      </div>
    </li>
  );
}
