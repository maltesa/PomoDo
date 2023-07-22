import { AnimatePresence, motion } from 'framer-motion'

const variants = {
  opened: { height: 'auto', opacity: 1 },
  closed: { height: 0, opacity: 0 },
}

interface Props {
  isOpen: boolean
  children?: React.ReactNode
}
export function Reveal({ isOpen, children }: Props) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={variants.closed}
          animate={variants.opened}
          exit={variants.closed}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
