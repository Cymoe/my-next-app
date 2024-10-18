import { createClient } from '@supabase/supabase-js'

// Use production environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

const seedTasks = [
  { title: 'Set up project repository', due_date: '2024-03-01' },
  { title: 'Design database schema', due_date: '2024-03-05' },
  { title: 'Implement user authentication', due_date: '2024-03-10' },
  { title: 'Create API endpoints', due_date: '2024-03-15' },
  { title: 'Develop frontend components', due_date: '2024-03-20' }
]

async function seedProductionTasks() {
  // Check if tasks already exist
  const { data: existingTasks } = await supabase
    .from('tasks')
    .select('id')
    .limit(1)

  if (existingTasks && existingTasks.length > 0) {
    console.log('Tasks already exist. Skipping seeding.')
    return
  }

  for (const task of seedTasks) {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)

    if (error) {
      console.error('Error inserting task:', error)
    } else {
      console.log('Inserted task:', task.title)
    }
  }
}

seedProductionTasks()
