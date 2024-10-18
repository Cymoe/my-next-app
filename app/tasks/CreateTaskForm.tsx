'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { createTask } from './actions';
import { useRouter } from 'next/navigation';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="px-4 py-2 bg-green-500 text-white rounded">
      {pending ? 'Adding...' : 'Add Task'}
    </button>
  );
}

export default function CreateTaskForm({ onTaskCreated }: { onTaskCreated?: (task: any) => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const newTask = {
      id: Date.now(), // Temporary ID
      title: formData.get('title') as string,
      due_date: formData.get('due_date') as string,
      completed: false,
    };

    // Optimistic update
    if (typeof onTaskCreated === 'function') {
      onTaskCreated(newTask);
    }

    try {
      const createdTask = await createTask(formData);
      // Update the task with the real ID from the server
      if (typeof onTaskCreated === 'function') {
        onTaskCreated(createdTask);
      } else {
        // If onTaskCreated is not provided, refresh the page
        router.refresh();
      }
    } catch (error) {
      console.error('Error creating task:', error);
      // Remove the optimistic task if there was an error
      if (typeof onTaskCreated === 'function') {
        onTaskCreated(null);
      }
    }

    formRef.current?.reset();
  };

  return (
    <form 
      ref={formRef} 
      action={handleSubmit}
      className="mb-4 flex items-end"
    >
      <div className="flex flex-col mr-2">
        <label htmlFor="title" className="mb-1 text-sm">Task Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="New task"
          className="border p-2"
          required
        />
      </div>
      <div className="flex flex-col mr-2">
        <label htmlFor="due_date" className="mb-1 text-sm">Due Date</label>
        <input
          id="due_date"
          name="due_date"
          type="date"
          className="border p-2"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
