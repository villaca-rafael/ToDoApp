import { Counter } from "./Counter"
import { Task, TaskType } from "./Task";

import styles from "./TaskManagement.module.css"

interface TaskManagementProps {
   tasks: TaskType[];
   countedCreatedTasks: number;
   counterCompletedTasks: number;
   onToggleCheckTask: (contentTask: string) => void;
   onDeleteTask: (contentTask: string) => void;
}

export function TaskManagement({ tasks, countedCreatedTasks, counterCompletedTasks, onToggleCheckTask, onDeleteTask }: TaskManagementProps) {
   return (
      <div className={styles.taskManagement}>
         <header className={styles.header}>
            <div className={styles.createdTasks}>
               <span>Tarefas Criadas</span>
               <Counter count={countedCreatedTasks.toString()} />
            </div>

            <div className={styles.completedTasks}>
               <span>Concluídas</span>
               <Counter count={countedCreatedTasks == 0 ? counterCompletedTasks.toString() : `${counterCompletedTasks} de ${countedCreatedTasks}`} />
            </div>
         </header>

         {tasks.length >= 1 && (
            <div className={styles.tasks}>
               {tasks.map(task => {
                  return (
                     <Task
                        key={task.content}
                        task={task}
                        onToggleCheckTask={onToggleCheckTask}
                        onDeleteTask={onDeleteTask}
                     />
                  )
               })}
            </div>
         )} 
      </div>
   )
}