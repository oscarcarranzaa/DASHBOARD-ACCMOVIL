import styles from './loader.module.css'

export default function HeaderSkeleton() {
  return (
    <div className="opacity-50">
      <div className="flex items-center grid-rows-2 mr-6 ">
        <div className={`${styles.titleBox} w-32`}></div>
        <div
          className={`${styles.imageBox} ml-3 w-10 h-10 inline-block row-span-1`}
        ></div>
      </div>
    </div>
  )
}
