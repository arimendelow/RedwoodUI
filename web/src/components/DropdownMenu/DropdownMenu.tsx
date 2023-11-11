import { CheckIcon } from '@heroicons/react/24/outline'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenuProps as IDropdownMenuRootProps,
  DropdownMenuTriggerProps as IDropdownMenuTriggerProps,
  DropdownMenuContentProps as IDropdownMenuContentProps,
  DropdownMenuArrowProps as IDropdownMenuArrowProps,
  DropdownMenuItemProps as IDropdownMenuItemProps,
  DropdownMenuGroupProps as IDropdownMenuGroupProps,
  DropdownMenuLabelProps as IDropdownMenuLabelProps,
  DropdownMenuCheckboxItemProps as IDropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroupProps as IDropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps as IDropdownMenuRadioItemProps,
  DropdownMenuItemIndicatorProps,
  DropdownMenuSeparatorProps as IDropdownMenuSeparatorProps,
  DropdownMenuSubProps as IDropdownMenuSubProps,
  DropdownMenuSubTriggerProps as IDropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps as IDropdownMenuSubContentProps,
} from '@radix-ui/react-dropdown-menu'
import { PopperContentProps } from '@radix-ui/react-popper'
import { AnimatePresence, motion } from 'framer-motion'

import { cn } from 'src/lib/utils'

// Base interface for dropdown items
interface IDropdownItemBase {
  textValue: string
  item: React.ReactNode
  disabled?: boolean
}

interface IStandardDropdownItem extends IDropdownItemBase {
  /**
   * An optional icon to render alongside the item.
   */
  icon?: React.ReactNode
  /**
   * Something you want at the very end of the item,
   * like a keyboard shortcut.
   */
  endText?: string
}

interface ICheckDropdownItem extends IDropdownItemBase {
  checked: boolean
  setChecked: (checked: boolean) => void
}

interface IRadioDropdownItem extends IDropdownItemBase {}

interface IStandardDropdownGroup {
  label?: string
  type: 'standard'
  items: IStandardDropdownItem[]
}

interface ICheckDropdownGroup {
  label?: string
  type: 'check'
  items: ICheckDropdownItem[]
}

interface IRadioDropdownGroup {
  label?: string
  type: 'radio'
  items: IRadioDropdownItem[]
  selectedItemTextValue: string
  setSelectedItemTextValue: (textValue: string) => void
}

type AnyDropdownGroupType =
  | IStandardDropdownGroup
  | ICheckDropdownGroup
  | IRadioDropdownGroup

interface IDropdownMenuProps extends IDropdownMenuRootProps {
  /**
   * The element that will trigger the dropdown menu to open.
   * You *do not* need to pass `onClick` to this element, it will be handled for you.
   */
  openButton: React.ReactNode
  /**
   * The preferred side of the trigger to render against when open.
   * Will be reversed when collisions occur and `avoidCollisions` is enabled.
   */
  side: PopperContentProps['side']

  content: AnyDropdownGroupType[]
}

const DropdownMenu = ({
  openButton,
  side = 'bottom',
  content,
  ...props
}: IDropdownMenuProps) => {
  const [open, setOpen] = React.useState(false)
  return (
    <DropdownMenuRoot open={open} onOpenChange={setOpen} {...props}>
      <DropdownMenuTrigger asChild>{openButton}</DropdownMenuTrigger>
      <DropdownMenuPortal forceMount>
        <AnimatePresence>
          {open && (
            <DropdownMenuContent asChild side={side}>
              <motion.div
                initial={{
                  opacity: 0,
                  transform: 'scale(0.9)',
                }}
                animate={{
                  opacity: 1,
                  transform: 'scale(1)',
                  transition: { duration: 0 },
                }}
                exit={{
                  opacity: 0,
                  transform: 'scale(0.9)',
                }}
                transition={{ ease: 'easeInOut', duration: 0.1 }}
              >
                {content.map((group, index) => {
                  const GroupComp =
                    group.type === 'radio'
                      ? DropdownMenuRadioGroup
                      : DropdownMenuGroup
                  return (
                    <GroupComp
                      key={index}
                      value={
                        group.type === 'radio'
                          ? group.selectedItemTextValue
                          : undefined
                      }
                      onValueChange={
                        group.type === 'radio'
                          ? group.setSelectedItemTextValue
                          : undefined
                      }
                    >
                      {group.label && (
                        <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                      )}
                      {(index !== 0 || group.label) && (
                        <DropdownMenuSeparator />
                      )}
                      {group.items.map((item, index) => {
                        const ItemComp =
                          group.type === 'standard'
                            ? DropdownMenuItem
                            : group.type === 'check'
                            ? DropdownMenuCheckboxItem
                            : DropdownMenuRadioItem

                        return (
                          <ItemComp
                            key={index}
                            disabled={item.disabled}
                            value={item.textValue}
                            className="flex w-full justify-between gap-2 pl-7"
                            checked={
                              group.type === 'check'
                                ? (item as ICheckDropdownItem).checked
                                : undefined
                            }
                            onCheckedChange={
                              group.type === 'check'
                                ? (item as ICheckDropdownItem).setChecked
                                : undefined
                            }
                          >
                            {group.type === 'standard' ? (
                              (item as IStandardDropdownItem).icon && (
                                <span className="absolute left-1 h-4 w-4">
                                  {(item as IStandardDropdownItem).icon}
                                </span>
                              )
                            ) : (
                              <DropdownMenuItemIndicator
                                type={group.type}
                                className="absolute left-1"
                              />
                            )}
                            {item.item}
                            {group.type === 'standard' &&
                              (item as IStandardDropdownItem).endText && (
                                <span className="mr-1 tracking-widest opacity-50">
                                  {(item as IStandardDropdownItem).endText}
                                </span>
                              )}
                          </ItemComp>
                        )
                      })}
                    </GroupComp>
                  )
                })}
              </motion.div>
            </DropdownMenuContent>
          )}
        </AnimatePresence>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  )
}

/**
 * Contains all the parts of a dropdown menu.
 */
const DropdownMenuRoot = (props: IDropdownMenuRootProps) => (
  <DropdownMenuPrimitive.Root {...props} />
)

/**
 * The button that toggles the dropdown menu. By default,
 * the `DropdownMenuContent` will position itself against the trigger.

 */
const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  IDropdownMenuTriggerProps
>((props, ref) => <DropdownMenuPrimitive.Trigger ref={ref} {...props} />)

/**
 * When used, portals the content part into the `body`.
 *
 * Didn't bother redefining the component here as it's unlikely we'll need to make any additions to it
 * */
const DropdownMenuPortal = DropdownMenuPrimitive.Portal

/**
 * The component that pops out when the dropdown menu is open.
 */
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  IDropdownMenuContentProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Content
    ref={ref}
    className={cn('dropdown-content-menu', className)}
    {...props}
  />
))

/**
 * An optional arrow element to render alongside the dropdown menu.
 * This can be used to help visually link the trigger with the `DropdownMenuContent`.
 * Must be rendered inside `DropdownMenuContent`.
 */
const DropdownMenuArrow = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Arrow>,
  IDropdownMenuArrowProps
>((props, ref) => <DropdownMenuPrimitive.Arrow ref={ref} {...props} />)

/**
 * The component that contains the dropdown menu items.
 */
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  IDropdownMenuItemProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn('dropdown-menu-item', className)}
    {...props}
  />
))

/**
 * Used to group multiple `DropdownMenuItem`s.
 */
const DropdownMenuGroup = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Group>,
  IDropdownMenuGroupProps
>((props, ref) => <DropdownMenuPrimitive.Group ref={ref} {...props} />)

/**
 * Used to render a label. It won't be focusable using arrow keys.
 */
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  IDropdownMenuLabelProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'text-color-default px-2 pb-0.5 pt-1.5 text-start text-sm font-semibold',
      className
    )}
    {...props}
  />
))

/**
 * An item that can be controlled and rendered like a checkbox.
 */
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  IDropdownMenuCheckboxItemProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn('dropdown-menu-item', className)}
    {...props}
  />
))

/**
 * Used to group multiple `DropdownMenuRadioItem`s.
 */
const DropdownMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioGroup>,
  IDropdownMenuRadioGroupProps
>((props, ref) => <DropdownMenuPrimitive.RadioGroup ref={ref} {...props} />)

/**
 * An item that can be controlled and rendered like a radio.
 */
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  IDropdownMenuRadioItemProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn('dropdown-menu-item', className)}
    {...props}
  />
))

interface IDropdownMenuItemIndicatorProps
  extends DropdownMenuItemIndicatorProps {
  type: 'check' | 'radio'
}

/**
 * Renders when the parent `DropdownMenuCheckboxItem` or
 * `DropdownMenuRadioItem` is checked.
 */
const DropdownMenuItemIndicator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.ItemIndicator>,
  IDropdownMenuItemIndicatorProps
>(({ type, ...props }, ref) => (
  <DropdownMenuPrimitive.ItemIndicator ref={ref} {...props}>
    {type === 'check' ? (
      <CheckIcon className="h-4 w-4" />
    ) : (
      // dot icon
      <svg
        className="h-4 w-4"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
          fill="currentColor"
        />
      </svg>
    )}
  </DropdownMenuPrimitive.ItemIndicator>
))

/**
 * Used to visually separate items in the dropdown menu.
 */
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  IDropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn(
      'mx-2 my-1 h-px bg-neutral-900/10 dark:bg-neutral-50/20',
      className
    )}
    {...props}
  />
))

/**
 * Contains all the parts of a submenu.
 */
const DropdownMenuSub = (props: IDropdownMenuSubProps) => (
  <DropdownMenuPrimitive.Sub {...props} />
)

/**
 * An item that opens a submenu. Must be rendered inside `DropdownMenuSub`.
 */
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  IDropdownMenuSubTriggerProps
>((props, ref) => <DropdownMenuPrimitive.SubTrigger ref={ref} {...props} />)

/**
 * The component that pops out when a submenu is open. Must be rendered inside `DropdownMenuSub`.
 */
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  IDropdownMenuSubContentProps
>((props, ref) => <DropdownMenuPrimitive.SubContent ref={ref} {...props} />)

export default DropdownMenu
export {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuArrow,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItemIndicator,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
