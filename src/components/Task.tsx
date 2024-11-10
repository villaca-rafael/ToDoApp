import { CheckCircle, Circle, Trash } from "phosphor-react"

import styles from "./Task.module.css"

export interface TaskType {
   content: string;
   isCompleted: boolean;
}

interface TaskProps {
   task: TaskType;
   onToggleCheckTask: (contentTask: string) => void;
   onDeleteTask: (contentTask: string) => void;
}

export function Task( { task, onToggleCheckTask, onDeleteTask }: TaskProps) {
   function handleToggleCheckTask() {
      onToggleCheckTask(task.content)
   }

   function handleDeleteTask() {
      onDeleteTask(task.content)
   }

   return (
      <div className={styles.task}>
         <button 
            className={task.isCompleted ? styles.buttonChecked : styles.buttonNotChecked} 
            onClick={handleToggleCheckTask}
         >
            {task.isCompleted ? <CheckCircle weight="fill" size={24} /> : <Circle size={24} />}
         </button>

         <div className={task.isCompleted ? styles.taskContentChecked : styles.taskContentNotChecked}>
            {task.content}
         </div>

         <button 
            className={styles.taskTrash}
            onClick={handleDeleteTask}
         >
            <Trash size={24} />
         </button>
      </div>
   )
}