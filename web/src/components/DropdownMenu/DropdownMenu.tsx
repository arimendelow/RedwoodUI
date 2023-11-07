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

interface IDropdownMenuProps extends IDropdownMenuRootProps {}

const DropdownMenu = ({ ...props }: IDropdownMenuProps) => {
  return <DropdownMenuRoot {...props}></DropdownMenuRoot>
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
>((props, ref) => <DropdownMenuPrimitive.Content ref={ref} {...props} />)

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
>((props, ref) => <DropdownMenuPrimitive.Item ref={ref} {...props} />)

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
>((props, ref) => <DropdownMenuPrimitive.CheckboxItem ref={ref} {...props} />)

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
>((props, ref) => <DropdownMenuPrimitive.RadioItem ref={ref} {...props} />)

/**
 * Renders when the parent `DropdownMenuCheckboxItem` or
 * `DropdownMenuRadioItem` is checked. You can style this element directly,
 * or you can use it as a wrapper to put an icon into, or both.
 */
const DropdownMenuItemIndicator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.ItemIndicator>,
  IDropdownMenuItemIndicatorProps
>((props, ref) => <DropdownMenuPrimitive.ItemIndicator ref={ref} {...props} />)

/**
 * Used to visually separate items in the dropdown menu.
 */
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  IDropdownMenuSeparatorProps
>((props, ref) => <DropdownMenuPrimitive.Separator ref={ref} {...props} />)

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
