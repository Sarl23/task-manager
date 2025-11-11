import { supabase } from '../supabase'
import { Task } from '@/types/task'

export async function getTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('id', { ascending: false })
  
  if (error) throw error
  return data as Task[]
}

export async function createTask(task: Omit<Task, 'id'>) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([task])
    .select()
  
  if (error) throw error
  return data[0] as Task
}

export async function updateTaskCompleted(id: number, done: boolean) {
  const { data, error } = await supabase
    .from('tasks')
    .update({ done })
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data[0] as Task
}

export async function updateTask(id: number, updates: { title?: string; description?: string }) {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data[0] as Task
}

export async function deleteTask(id: number) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}