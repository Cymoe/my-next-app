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

  async function handleSubmit(formData: FormData) {
    const newTask = await createTask(formData);
    if (newTask) {
      if (onTaskCreated) {
        onTaskCreated(newTask);
      } else {
        // If onTaskCreated is not provided, refresh the page
        router.refresh();
      }
      formRef.current?.reset();
    }
  }

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
