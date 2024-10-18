'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getTask, updateTaskAction, deleteTaskAction } from '../actions';

export default function TaskPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useState(() => {
    async function fetchTask() {
      const fetchedTask = await getTask(parseInt(params.id));
      setTask(fetchedTask);
    }
    fetchTask();
  }, [params.id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  const handleUpdate = async (formData: FormData) => {
    await updateTaskAction(task.id, formData);
    const updatedTask = await getTask(task.id);
    setTask(updatedTask);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTaskAction(task.id);
    router.push('/tasks');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      {isEditing ? (
        <form action={handleUpdate} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              name="title"
              type="text"
              defaultValue={task.title}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="due_date">
              Due Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="due_date"
              name="due_date"
              type="date"
              defaultValue={task.due_date}
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="completed"
                defaultChecked={task.completed}
                className="mr-2"
              />
              <span className="text-gray-700">Completed</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save Changes
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <p className="text-gray-700">{task.title}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Due Date
            </label>
            <p className="text-gray-700">{task.due_date || 'No due date'}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <p className="text-gray-700">{task.completed ? 'Completed' : 'Pending'}</p>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Edit
            </button>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Delete
            </button>
          </div>
        </div>
      )}
      <Link href="/tasks" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back to Tasks
      </Link>
    </div>
  );
}
