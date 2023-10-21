import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  AnimatePresence,
  motion,
  animate,
  useMotionValue,
  useTransform,
  transform,
} from 'framer-motion'

import Button from 'src/components/Button/Button'

// Wrap Radix Dialog components so they support framer-motion values.
const Backdrop = motion(DialogPrimitive.Overlay)
const Content = motion(DialogPrimitive.Content)

const staticTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
}

interface IOverlayProps {
  children: React.ReactNode
}

const Overlay = ({ children }: IOverlayProps) => {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    if (ref.current) {
      const height = ref.current.offsetHeight
      const width = ref.current.offsetWidth

      console.log('Height:', height)
      console.log('Width:', width)
    }
  }, [])

  const h = 300
  const y = useMotionValue(h)
  const overlayOpacity = useTransform(y, [0, h], [1, 0])

  return (
    // Instead of letting Radix Dialog handle the open/close state, Framer Motion will.
    <DialogPrimitive.Root open={true}>
      <DialogPrimitive.Trigger asChild>
        <Button onClick={() => setOpen(true)}>Open overlay</Button>
      </DialogPrimitive.Trigger>
      <AnimatePresence onExitComplete={() => setOpen(false)}>
        {open && (
          <>
            <Backdrop
              className="fixed inset-0 z-[9999] bg-neutral-700/80 backdrop-blur-sm"
              /** Unclear why this casing is needed */
              style={{ opacity: overlayOpacity as unknown as number }}
              onClick={() => setOpen(false)}
            />
            <Content key="content" asChild>
              <motion.div
                // h-screen is needed so that you can drag the Overlay away from the edge of the screen without it having an edge.
                className="absolute bottom-0 left-2 right-2 z-[10000] h-screen rounded-t-xl bg-white shadow-lg"
                initial={{ y: h }}
                animate={{ y: 0 }}
                exit={{ y: h }}
                transition={staticTransition}
                style={{
                  y,
                  top: `calc(100vh - ${h}px)`,
                }}
                drag="y"
                dragConstraints={{ top: 0 }}
                onDragEnd={(_e, { offset, velocity }) => {
                  if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
                    setOpen(false)
                  } else {
                    animate(y, 0, {
                      type: 'inertia',
                      bounceStiffness: 300,
                      bounceDamping: 40,
                      timeConstant: 300,
                      min: 0,
                      max: 0,
                    })
                  }
                }}
              >
                {/* drag affordance */}
                <div className="mx-auto mt-2 h-1.5 w-12 cursor-pointer rounded-full bg-gray-400" />
                <div className="mr-5 flex justify-end">
                  <Button onClick={() => setOpen(false)}>Done</Button>
                </div>
                <div ref={ref}>{children}</div>
              </motion.div>
            </Content>
          </>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  )
}

export default Overlay
