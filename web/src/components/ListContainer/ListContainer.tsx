import { AnimatePresence, Variants, motion } from 'framer-motion'

interface IListContainerProps {
  items: any[]
}

const parentMotionVariants: Variants = {
  enter: { transition: { staggerChildren: 0.5 } },
}

const childMotionVariants: Variants = {
  enter: { opacity: 1, scale: 1, transition: { duration: 5 } },
  exit: { opacity: 0, scale: 0.8 },
}

const ListContainer = ({ items }: IListContainerProps) => {
  return (
    <motion.ul variants={parentMotionVariants}>
      {items.map((item, index) => (
        <motion.li
          key={index}
          variants={childMotionVariants}
          initial="exit"
          animate="enter"
          exit="exit"
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default ListContainer
