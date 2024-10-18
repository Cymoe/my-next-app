import Link from 'next/link';
import { getTasks } from './actions'
import CreateTaskForm from './CreateTaskForm'
import TaskList from './TaskList'

export default async function TasksPage() {
  try {
    const tasks = await getTasks()
    
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <CreateTaskForm />
        <TaskList tasks={tasks} />
        <Link href="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Home
        </Link>
      </div>
    )
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return <div>Error loading tasks. Please try again later.</div>
  }
}
