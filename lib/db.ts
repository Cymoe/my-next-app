import { supabase } from './supabase'

// Remove any SQLite-related code
// Keep only Supabase-related functionality

export { supabase }

export async function getTasks() {
  console.log('Fetching tasks...')
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }

  console.log('Raw tasks data:', JSON.stringify(tasks, null, 2))
  return tasks
}

export function createTask() {
  // Implementation
}

export function updateTask() {
  // Implementation
}

export function deleteTask() {
  // Implementation
}
