import { dampenValue, getTranslateY, set } from './OverlayHelpers'
import { usePositionFixed } from './usePositionFixed'
import { isIOS, usePreventScroll } from './usePreventScroll'

const CLOSE_THRESHOLD = 0.25

const SCROLL_LOCK_TIMEOUT = 500

const BORDER_RADIUS = 8

const NESTED_DISPLACEMENT = 16

const WINDOW_TOP_OFFSET = 26

interface IOverlayContext {
  /**
   * The ref of the backdrop
   */
  backdropRef: React.RefObject<HTMLDivElement>
  /**
   * The ref of the content container
   */
  contentContainerRef: React.RefObject<HTMLDivElement>
}

export const OverlayContext = React.createContext<IOverlayContext>({
  backdropRef: { current: null },
  contentContainerRef: { current: null },
})

interface IOverlayContextProviderProps {
  children: React.ReactNode
  /**
   * When set to true, interaction with outside elements will be disabled and only dialog content will be visible to screen readers.
   */
  modal: boolean
  /**
   * Whether this overlay is nested on another overlay
   */
  nested: boolean
  /**
   * Whether the overlay can be dismissed
   */
  dismissible: boolean
}
export const OverlayContextProvider = ({
  children,
  modal,
  nested,
  dismissible,
}: IOverlayContextProviderProps) => {
  // START Element Refs
  const backdropRef = React.useRef<HTMLDivElement>(null)
  const contentContainerRef = React.useRef<HTMLDivElement>(null)
  // END Element Refs

  // START Variable Refs
  const contentContainerHeightRef = React.useRef(
    contentContainerRef.current?.getBoundingClientRect().height || 0
  )
  const initialContentContainerHeight = React.useRef(0)
  const openTime = React.useRef<Date | null>(null)
  const dragStartTime = React.useRef<Date | null>(null)
  const dragEndTime = React.useRef<Date | null>(null)
  const lastTimeDragPrevented = React.useRef<Date | null>(null)
  const isAllowedToDrag = React.useRef<boolean>(false)
  const nestedOpenChangeTimer = React.useRef<NodeJS.Timeout | null>(null)
  const pointerStartY = React.useRef(0)
  const keyboardIsOpen = React.useRef(false)
  const previousDiffFromInitial = React.useRef(0)
  // END Variable Refs

  // START States
  const [isOpen = false, setIsOpen] = React.useState<boolean>(false)
  const [hasBeenOpened, setHasBeenOpened] = React.useState<boolean>(false)
  // Not visible = translateY(100%)
  const [visible, setVisible] = React.useState<boolean>(false)
  const [mounted, setMounted] = React.useState<boolean>(false)
  const [isDragging, setIsDragging] = React.useState<boolean>(false)
  const [justReleased, setJustReleased] = React.useState<boolean>(false)
  // END States

  // START Callbacks
  const { restorePositionSetting } = usePositionFixed({
    isOpen,
    modal,
    nested,
    hasBeenOpened,
  })

  function getScale() {
    return (window.innerWidth - WINDOW_TOP_OFFSET) / window.innerWidth
  }

  function onPress(event: React.PointerEvent<HTMLDivElement>) {
    if (!dismissible || isDragging) return
    if (
      contentContainerRef.current &&
      !contentContainerRef.current.contains(event.target as Node)
    )
      return
    drawerHeightRef.current =
      contentContainerRef.current?.getBoundingClientRect().height || 0
    setIsDragging(true)
    dragStartTime.current = new Date()

    // iOS doesn't trigger mouseUp after scrolling so we need to listen to touched in order to disallow dragging
    if (isIOS()) {
      window.addEventListener(
        'touchend',
        () => (isAllowedToDrag.current = false),
        { once: true }
      )
    }

    // Ensure we maintain correct pointer capture even when going outside of the drawer
    ;(event.target as HTMLElement).setPointerCapture(event.pointerId)

    pointerStartY.current = event.clientY
  }

  function shouldDrag(el: EventTarget, isDraggingDown: boolean) {
    let element = el as HTMLElement
    const date = new Date()
    const highlightedText = window.getSelection()?.toString()
    const swipeAmount = contentContainerRef.current
      ? getTranslateY(contentContainerRef.current)
      : null

    // Allow scrolling when animating
    if (openTime.current && date.getTime() - openTime.current.getTime() < 500) {
      return false
    }

    if (swipeAmount > 0) {
      return true
    }

    // Don't drag if there's highlighted text
    if (highlightedText && highlightedText.length > 0) {
      return false
    }

    // Disallow dragging if drawer was scrolled within `scrollLockTimeout`
    if (
      lastTimeDragPrevented.current &&
      date.getTime() - lastTimeDragPrevented.current.getTime() <
        scrollLockTimeout &&
      swipeAmount === 0
    ) {
      lastTimeDragPrevented.current = new Date()
      return false
    }

    // Keep climbing up the DOM tree as long as there's a parent
    while (element) {
      // Check if the element is scrollable
      if (element.scrollHeight > element.clientHeight) {
        if (element.getAttribute('role') === 'dialog') {
          return true
        }

        if (
          isDraggingDown &&
          element !== document.body &&
          !swipeAmount &&
          swipeAmount >= 0
        ) {
          lastTimeDragPrevented.current = new Date()

          // Element is scrolled to the top, but we are dragging down so we should allow scrolling
          return false
        }

        if (element.scrollTop !== 0) {
          lastTimeDragPrevented.current = new Date()

          // The element is scrollable and not scrolled to the top, so don't drag
          return false
        }
      }

      // Move up to the parent element
      element = element.parentNode as HTMLElement
    }

    // No scrollable parents not scrolled to the top found, so drag
    return true
  }

  function onDrag(event: React.PointerEvent<HTMLDivElement>) {
    // We need to know how much of the drawer has been dragged in percentages so that we can transform background accordingly
    if (isDragging) {
      const draggedDistance = pointerStartY.current - event.clientY
      const isDraggingDown = draggedDistance > 0

      if (!isAllowedToDrag.current && !shouldDrag(event.target, isDraggingDown))
        return

      // If shouldDrag gave true once after pressing down on the drawer, we set isAllowedToDrag to true and it will remain true until we let go, there's no reason to disable dragging mid way, ever, and that's the solution to it
      isAllowedToDrag.current = true
      set(contentContainerRef.current, {
        transition: 'none',
      })

      set(overlayRef.current, {
        transition: 'none',
      })

      // Run this only if snapPoints are not defined or if we are at the last snap point (highest one)
      if (draggedDistance > 0 && !snapPoints) {
        const dampenedDraggedDistance = dampenValue(draggedDistance)

        set(contentContainerRef.current, {
          transform: `translate3d(0, ${Math.min(
            dampenedDraggedDistance * -1,
            0
          )}px, 0)`,
        })
        return
      }

      // We need to capture last time when drag with scroll was triggered and have a timeout between
      const absDraggedDistance = Math.abs(draggedDistance)

      const percentageDragged = absDraggedDistance / drawerHeightRef.current

      const opacityValue = 1 - percentageDragged

      // ARI YOU ARE HERE - YOU NEED TO FIGURE OUT HOW TO HANDLE THIS
      if (
        shouldFade ||
        (fadeFromIndex && activeSnapPointIndex === fadeFromIndex - 1)
      ) {
        onDragProp?.(event, percentageDragged)

        set(
          overlayRef.current,
          {
            opacity: `${opacityValue}`,
            transition: 'none',
          },
          true
        )
      }
    }
  }
  // END Callbacks

  usePreventScroll({
    isDisabled:
      !isOpen || isDragging || !modal || justReleased || !hasBeenOpened,
  })

  return (
    <OverlayContext.Provider value={{ backdropRef, contentContainerRef }}>
      {children}
    </OverlayContext.Provider>
  )
}

export const useOverlayContext = () => {
  const context = React.useContext(OverlayContext)
  if (context === undefined) {
    throw new Error(
      'useOverlayContext must be used within a OverlayContextProvider'
    )
  }
  return context
}
