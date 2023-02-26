import styles from "./index.module.css";

export default function Foo() {
  return <div className={styles.foo + ' ' + styles["foo-bar"]}>
    Foo | 2
    </div>;
}