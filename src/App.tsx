import { ChangeEvent, FormEvent, useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import clipboard from "./assets/clipboard.svg"
import { TaskType } from './components/Task'

import { Header } from './components/Header'
import { TaskManagement } from './components/TaskManagement'

import styles from "./App.module.css"
import './global.css'

export function App() {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [newContentTask, setContentTask] = useState("")
  const [counterCreatedTasks, setCounterCreatedTasks] = useState(tasks.length)
  const [counterCompletedTasks, setCounterCompletedTasks] = useState(tasks.filter(task => task.isCompleted).length)

  const isNewContentTaskEmpty = newContentTask.length === 0 || newContentTask.trim() === "";

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()
    
    const newTask: TaskType = {      
      content: newContentTask,
      isCompleted: false
    }

    let newTaks = [...tasks, newTask]

    setTasks(newTaks)
    setCounterCreatedTasks(newTaks.length)
    setContentTask("")
  }

  function handleNewContentTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setContentTask(event.target.value)    
  }

  function toggleCheckTask(contentTask: string) {
    const tasksChanged = tasks.map(task => {
      return task.content === contentTask ? { ...task, isCompleted: !task.isCompleted } :task
    })

    setTasks(tasksChanged)

    setCounterCompletedTasks(tasksChanged.filter(task => task.isCompleted).length)
  }

  function deleteTask(contentTask: string) {
    let tasksWithoutDeletedOne = tasks.filter(task => task.content !== contentTask)

    setTasks(tasksWithoutDeletedOne)
    setCounterCreatedTasks(tasksWithoutDeletedOne.length)
    setCounterCompletedTasks(tasksWithoutDeletedOne.filter(task => task.isCompleted).length)
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
          <input 
            type="text"
            value={newContentTask}
            placeholder="Adicione uma nova tarefa"
            onChange={handleNewContentTaskChange}
          />

          <button type='submit' disabled={isNewContentTaskEmpty}>
            Criar
            <PlusCircle size={16} />
          </button>
        </form>

        <main>
          <TaskManagement
            tasks={tasks}
            countedCreatedTasks={counterCreatedTasks}
            counterCompletedTasks={counterCompletedTasks}
            onToggleCheckTask={toggleCheckTask}
            onDeleteTask={deleteTask}
          />
        </main>

        {tasks.length === 0 && (
          <footer>
            <img src={clipboard} alt="ClipBoard" />
            <div className={styles.footerDescription}>
              <span>Você ainda não tem tarefas cadastradas</span>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}