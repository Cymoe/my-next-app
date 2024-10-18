'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '../../lib/supabase'

export async function getTasks() {
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return tasks
}

export async function createTask(formData: FormData) {
  const title = formData.get('title') as string
  const due_date = formData.get('due_date') as string

  const { data, error } = await supabase
    .from('tasks')
    .insert([{ title, due_date }])
    .select()

  if (error) throw error
  revalidatePath('/tasks')
  return data[0]
}

export async function updateTaskAction(id: number, formData: FormData) {
  const title = formData.get('title') as string
  const completed = formData.get('completed') === 'on'
  const due_date = formData.get('due_date') as string

  const { data, error } = await supabase
    .from('tasks')
    .update({ title, completed, due_date })
    .eq('id', id)
    .select()

  if (error) throw error
  revalidatePath('/tasks')
  revalidatePath(`/tasks/${id}`)
  return data[0]
}

export async function deleteTaskAction(id: number) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) throw error
  revalidatePath('/tasks')
}

export async function getTask(id: number) {
  const { data: task, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return task
}
