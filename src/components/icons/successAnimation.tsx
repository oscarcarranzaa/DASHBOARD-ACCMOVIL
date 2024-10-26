import styles from './successAnimation.module.css'
export default function SuccessAnimation() {
  return (
    <>
      <div className="success-animation">
        <svg
          className={styles.checkmark}
          width="100"
          height="100"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className={styles.checkmark__circle}
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className={styles.checkmark__check}
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
    </>
  )
}
