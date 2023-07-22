import * as RadixDropdown from '@radix-ui/react-dropdown-menu'
import { classed, type ComponentProps } from '@tw-classed/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'

const DropdownContent = classed(
  motion.div,
  'border rounded-md bg-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 px-1 py-1 shadow'
)

interface Props extends ComponentProps<typeof RadixDropdown.Content> {
  trigger: ReactNode
  children?: ReactNode
}

export const Dropdown = ({ trigger, children, ...contentProps }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <RadixDropdown.Root open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
        <RadixDropdown.Trigger asChild>{trigger}</RadixDropdown.Trigger>

        <AnimatePresence>
          {isOpen && (
            <RadixDropdown.Portal forceMount>
              <RadixDropdown.Content
                asChild
                forceMount
                align="end"
                sideOffset={8}
                className="z-50"
                {...contentProps}
              >
                <DropdownContent
                  initial={{ y: 3, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 3, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {children}
                </DropdownContent>
              </RadixDropdown.Content>
            </RadixDropdown.Portal>
          )}
        </AnimatePresence>
      </RadixDropdown.Root>
    </>
  )
}
