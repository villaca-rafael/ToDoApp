import styles from "./Counter.module.css"

interface CounterProps {
   count: string;
}

export function Counter({ count }: CounterProps) {
   return (
      <span className={styles.count}>{count}</span>
   )
}