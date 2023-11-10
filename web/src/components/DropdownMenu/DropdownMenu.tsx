import { CheckBadgeIcon } from '@heroicons/react/24/outline'
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
  DropdownMenuItemIndicatorProps as IDropdownMenuItemIndicatorProps,
  DropdownMenuSeparatorProps as IDropdownMenuSeparatorProps,
  DropdownMenuSubProps as IDropdownMenuSubProps,
  DropdownMenuSubTriggerProps as IDropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps as IDropdownMenuSubContentProps,
} from '@radix-ui/react-dropdown-menu'
import { PopperContentProps } from '@radix-ui/react-popper'

import { cn } from 'src/lib/utils'

// Base interface for dropdown items
interface IDropdownItem {
  textValue: string
  item: React.ReactNode
}

// Extended interface for items in a 'check' type dropdown
interface ICheckDropdownItem extends IDropdownItem {
  checked: boolean
  setChecked: (checked: boolean) => void
}

// Extended interface for items in a 'radio' type dropdown
interface IRadioDropdownItem extends IDropdownItem {}

// Standard dropdown group interface
interface IStandardDropdownGroup {
  label?: string
  type: 'standard'
  items: IDropdownItem[]
}

// Check dropdown group interface
interface ICheckDropdownGroup {
  label?: string
  type: 'check'
  items: ICheckDropdownItem[]
}

// Radio dropdown group interface
interface IRadioDropdownGroup {
  label?: string
  type: 'radio'
  items: IRadioDropdownItem[]
  selectedItemTextValue: string
  setSelectedItemTextValue: (textValue: string) => void
}

// Union type for all dropdown group variants
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
  return (
    <DropdownMenuRoot {...props}>
      <DropdownMenuTrigger asChild>{openButton}</DropdownMenuTrigger>
      <DropdownMenuPortal forceMount>
        <DropdownMenuContent side={side}>
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
                {(index !== 0 || group.label) && <DropdownMenuSeparator />}
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
                      value={item.textValue}
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
                      <DropdownMenuItemIndicator />
                      {item.item}
                    </ItemComp>
                  )
                })}
              </GroupComp>
            )
          })}
        </DropdownMenuContent>
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
    className={cn(
      'bg-default absolute-z[1000] min-w-[8rem] overflow-hidden rounded-default border border-neutral-300 text-center',
      className
    )}
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
>((props, ref) => <DropdownMenuPrimitive.Label ref={ref} {...props} />)

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

/**
 * Renders when the parent `DropdownMenuCheckboxItem` or
 * `DropdownMenuRadioItem` is checked. You can style this element directly,
 * or you can use it as a wrapper to put an icon into, or both.
 */
const DropdownMenuItemIndicator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.ItemIndicator>,
  IDropdownMenuItemIndicatorProps
>((props, ref) => (
  <DropdownMenuPrimitive.ItemIndicator ref={ref} {...props}>
    <CheckBadgeIcon className="h-5 w-5" />
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
    className={cn('my-1 h-px bg-neutral-200', className)}
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
