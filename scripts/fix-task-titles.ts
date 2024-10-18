import { supabase } from '../lib/supabase'

async function fixTaskTitles() {
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
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ 
          title: parsedTitle.title,
          due_date: parsedTitle.due_date || task.due_date
        })
        .eq('id', task.id)

      if (updateError) {
        console.error(`Error updating task ${task.id}:`, updateError)
      } else {
        console.log(`Updated task ${task.id}`)
      }
    } catch (e) {
      console.log(`Task ${task.id} title is not JSON, skipping`)
    }
  }
}

fixTaskTitles()

