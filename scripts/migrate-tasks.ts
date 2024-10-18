import { supabase } from '../lib/supabase'

async function migrateTasks() {
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')

  if (error) {
    console.error('Error fetching tasks:', error)
    return
  }

  for (const task of tasks) {
    try {
      const parsedTitle = JSON.parse(task.title)
      const { data, error } = await supabase
        .from('tasks')
        .update({ 
          title: parsedTitle.title, 
          due_date: parsedTitle.due_date 
        })
        .eq('id', task.id)

      if (error) {
        console.error(`Error updating task ${task.id}:`, error)
      } else {
        console.log(`Updated task ${task.id}`)
      }
    } catch (e) {
      console.error(`Error parsing task ${task.id}:`, e)
    }
  }
}

migrateTasks()

