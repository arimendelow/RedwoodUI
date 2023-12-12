import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { CheckIcon } from '@heroicons/react/24/outline'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import type {
  ContextMenuProps as IContextMenuRootProps,
  ContextMenuTriggerProps as IContextMenuTriggerProps,
  ContextMenuPortalProps as IContextMenuPortalProps,
  ContextMenuContentProps as IContextMenuContentProps,
  ContextMenuArrowProps as IContextMenuArrowProps,
  ContextMenuItemProps as IContextMenuItemProps,
  ContextMenuGroupProps as IContextMenuGroupProps,
  ContextMenuLabelProps as IContextMenuLabelProps,
  ContextMenuCheckboxItemProps as IContextMenuCheckboxItemProps,
  ContextMenuRadioGroupProps as IContextMenuRadioGroupProps,
  ContextMenuRadioItemProps as IContextMenuRadioItemProps,
  ContextMenuItemIndicatorProps as IContextMenuItemIndicatorProps,
  ContextMenuSeparatorProps as IContextMenuSeparatorProps,
  ContextMenuSubProps as IContextMenuSubProps,
  ContextMenuSubTriggerProps as IContextMenuSubTriggerProps,
  ContextMenuSubContentProps as IContextMenuSubContentProps,
} from '@radix-ui/react-context-menu'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import type {
  DropdownMenuProps as IDropdownMenuRootProps,
  DropdownMenuTriggerProps as IDropdownMenuTriggerProps,
  DropdownMenuPortalProps as IDropdownMenuPortalProps,
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
import { AnimatePresence, motion } from 'framer-motion'

import { cn } from 'src/lib/utils'

interface IMenuItemBase {
  textValue: string
  item: React.ReactNode
  /**
   * Something you want at the very end of the item,
   * like a keyboard shortcut.
   */
  endText?: string
  disabled?: boolean
}

interface ISubMenuItem {
  /**
   * An optional icon to render alongside the item.
   */
  icon?: React.ReactNode
  label: string
  /**
   * The content of the submenu.
   */
  subMenuContent: AnyMenuGroupType[]
  disabled?: boolean
}

interface IStandardMenuItem extends IMenuItemBase {
  /**
   * An optional icon to render alongside the item.
   */
  icon?: React.ReactNode
}

interface ICheckMenuItem extends IMenuItemBase {
  checked: boolean
  setChecked: (checked: boolean) => void
}

interface IRadioMenuItem extends IMenuItemBase {}

interface IStandardMenuGroup {
  label?: string
  type: 'standard'
  items: (IStandardMenuItem | ISubMenuItem)[]
}

interface ICheckMenuGroup {
  label?: string
  type: 'check'
  items: (ICheckMenuItem | ISubMenuItem)[]
}

interface IRadioMenuGroup {
  label?: string
  type: 'radio'
  items: (IRadioMenuItem | ISubMenuItem)[]
  selectedItemTextValue: string
  setSelectedItemTextValue: (textValue: string) => void
}

type AnyMenuGroupType = IStandardMenuGroup | ICheckMenuGroup | IRadioMenuGroup

type MenuType = 'context' | 'dropdown'

interface IMenuTypeProp {
  /**
   * The context and dropdown menu primitives are very similar. Rather than duplicating
   * the code for both, we switch the primitives being used based on this prop.
   * See here: https://github.com/radix-ui/primitives/discussions/992
   *
   * Named `menuType` to avoid conflict with `type` prop on, for example, the Arrow component.
   */
  menuType: MenuType
}

interface IMenuProps extends IMenuTypeProp, IMenuRootProps {
  /**
   * The element that will trigger the menu to open.
   * You *do not* need to pass `onClick` to this element, it will be handled for you.
   * - For a Context menu: The area that opens the context menu when right-clicking (or using the relevant keyboard shortcuts).
   * - For a Dropdown menu: The button that toggles the dropdown menu. By default, the `MenuContent` will position itself against the trigger.
   *
   */
  trigger: React.ReactNode
  /**
   * When rendering a Dropdown Menu, the preferred side of the trigger to render against when open.
   * Will be reversed when collisions occur and `avoidCollisions` is enabled.
   */
  side?: PopperContentProps['side']
  /**
   * When rendering a Dropdown Menu, the offset between the trigger and the content, in pixels.
   */
  sideOffset?: number
  /**
   * The content of the menu.
   */
  menuContent: AnyMenuGroupType[]
}

const Menu = ({
  menuType,
  trigger,
  side = 'bottom',
  sideOffset,
  menuContent,
  ...props
}: IMenuProps) => {
  const [open, setOpen] = React.useState(false)
  const MenuTrigger =
    menuType === 'context' ? ContextMenuTrigger : DropdownMenuTrigger
  return (
    <MenuRoot menuType={menuType} open={open} onOpenChange={setOpen} {...props}>
      <MenuTrigger
        // When a Dropdown menu, the trigger will be a button, so we want to use `asChild` to avoid a wrapping div.
        asChild={menuType === 'dropdown'}
      >
        {trigger}
      </MenuTrigger>
      <MenuPortal menuType={menuType} forceMount>
        <AnimatePresence>
          {open && (
            <MenuContent
              menuType={menuType}
              sideOffset={sideOffset}
              asChild
              side={side}
            >
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
                {menuContent.map((group, index) => (
                  <MenuGroupRenderer
                    menuType={menuType}
                    key={index}
                    group={group}
                    groupIndex={index}
                  />
                ))}
              </motion.div>
            </MenuContent>
          )}
        </AnimatePresence>
      </MenuPortal>
    </MenuRoot>
  )
}

interface IMenuGroupRendererProps extends IMenuTypeProp {
  group: AnyMenuGroupType
  groupIndex: number
}

const MenuGroupRenderer = ({
  menuType,
  group,
  groupIndex,
}: IMenuGroupRendererProps) => {
  const GroupComp = group.type === 'radio' ? MenuRadioGroup : MenuGroup
  return (
    <GroupComp
      menuType={menuType}
      value={group.type === 'radio' ? group.selectedItemTextValue : undefined}
      onValueChange={
        group.type === 'radio' ? group.setSelectedItemTextValue : undefined
      }
    >
      {group.label && <MenuLabel menuType={menuType}>{group.label}</MenuLabel>}
      {(groupIndex !== 0 || group.label) && (
        <MenuSeparator menuType={menuType} />
      )}
      {group.items.map((item, itemIndex) =>
        'subMenuContent' in item ? (
          <SubMenuRenderer menuType={menuType} key={itemIndex} item={item} />
        ) : (
          <MenuItemRenderer
            menuType={menuType}
            key={itemIndex}
            groupType={group.type}
            item={item}
            itemIndex={itemIndex}
          />
        )
      )}
    </GroupComp>
  )
}

interface IMenuItemRendererProps extends IMenuTypeProp {
  groupType: AnyMenuGroupType['type']
  item: IStandardMenuItem | ICheckMenuItem | IRadioMenuItem
  itemIndex: number
}

const MenuItemRenderer = ({
  menuType,
  groupType,
  item,
  itemIndex,
}: IMenuItemRendererProps) => {
  const ItemComp =
    groupType === 'standard'
      ? MenuItem
      : groupType === 'check'
      ? MenuCheckboxItem
      : MenuRadioItem

  return (
    <ItemComp
      menuType={menuType}
      key={itemIndex}
      disabled={item.disabled}
      value={item.textValue}
      className="flex w-full justify-between gap-2 pl-7"
      checked={
        groupType === 'check' ? (item as ICheckMenuItem).checked : undefined
      }
      onCheckedChange={
        groupType === 'check' ? (item as ICheckMenuItem).setChecked : undefined
      }
    >
      {groupType === 'standard' ? (
        (item as IStandardMenuItem).icon && (
          <span className="absolute left-1 h-4 w-4">
            {(item as IStandardMenuItem).icon}
          </span>
        )
      ) : (
        <MenuItemIndicator
          menuType={menuType}
          indicatorType={groupType}
          className="absolute left-1"
        />
      )}
      {item.item}
      {item.endText && (
        <span className="mr-1 tracking-widest opacity-50">
          {(item as IStandardMenuItem).endText}
        </span>
      )}
    </ItemComp>
  )
}

interface ISubMenuRendererProps extends IMenuTypeProp {
  item: ISubMenuItem
}

const SubMenuRenderer = ({ menuType, item }: ISubMenuRendererProps) => (
  <MenuSub menuType={menuType}>
    {/* Make sure to keep this className in line with the one on MenuItemRenderer's ItemComp */}
    <MenuSubTrigger
      menuType={menuType}
      className="flex w-full justify-between gap-2 pl-7"
    >
      {item.icon && (
        <span className="absolute left-1 h-4 w-4">{item.icon}</span>
      )}
      {item.label}
      <ChevronRightIcon className="h-5 w-5" />
    </MenuSubTrigger>
    <MenuPortal menuType={menuType}>
      <MenuSubContent menuType={menuType}>
        {item.subMenuContent.map((group, index) => (
          <MenuGroupRenderer
            menuType={menuType}
            key={index}
            group={group}
            groupIndex={index}
          />
        ))}
      </MenuSubContent>
    </MenuPortal>
  </MenuSub>
)

interface IMenuRootProps
  extends IMenuTypeProp,
    IContextMenuRootProps,
    IDropdownMenuRootProps {}

/**
 * Contains all the parts of a  menu.
 */
const MenuRoot = ({ menuType, ...props }: IMenuRootProps) => {
  const MenuPrimitive =
    menuType === 'context' ? ContextMenuPrimitive : DropdownMenuPrimitive
  return <MenuPrimitive.Root {...props} />
}

/**
 * The area that opens the context menu.
 * Wrap it around the target you want the context menu to open from when right-clicking (or using the relevant keyboard shortcuts).
 *
 * Unlike the other components, the Trigger is actually different for the context and dropdown menu primitives.
 * Therefore, rather than using the `IMenuTypeProp` to switch between them, we just use the correct component directly.
 */
const ContextMenuTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Trigger>,
  IContextMenuTriggerProps
>((props, ref) => <ContextMenuPrimitive.Trigger ref={ref} {...props} />)

/**
 * The button that toggles the dropdown menu.
 * By default, the `MenuContent` will position itself against the trigger.
 *
 * Unlike the other components, the Trigger is actually different for the context and dropdown menu primitives.
 * Therefore, rather than using the `IMenuTypeProp` to switch between them, we just use the correct component directly.
 */
const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  IDropdownMenuTriggerProps
>((props, ref) => <DropdownMenuPrimitive.Trigger ref={ref} {...props} />)

interface IMenuPortalProps
  extends IMenuTypeProp,
    IContextMenuPortalProps,
    IDropdownMenuPortalProps {}

/**
 * When used, portals the content part into the `body`.
 * */
const MenuPortal = ({ menuType, ...props }: IMenuPortalProps) => {
  const MenuPrimitive =
    menuType === 'context' ? ContextMenuPrimitive : DropdownMenuPrimitive
  return <MenuPrimitive.Portal {...props} />
}

interface IMenuContentProps
  extends IMenuTypeProp,
    IContextMenuContentProps,
    IDropdownMenuContentProps {}

/**
 * The component that pops out when the  menu is open.
 */
const MenuContent = React.forwardRef<HTMLDivElement, IMenuContentProps>(
  ({ menuType, className, sideOffset = 10, ...props }, ref) => {
    const MenuPrimitive =
      menuType === 'context' ? ContextMenuPrimitive : DropdownMenuPrimitive
    return (
      <MenuPrimitive.Content
        ref={ref}
        className={cn('dropdown-content-menu', className)}
        sideOffset={sideOffset}
        {...props}
      />
    )
  }
)

interface IMenuArrowProps
  extends IMenuTypeProp,
    IContextMenuArrowProps,
    IDropdownMenuArrowProps {}

/**
 * An optional arrow element to render alongside the  menu.
 * This can be used to help visually link the trigger with the `MenuContent`.
 * Must be rendered inside `MenuContent`.
 */
const MenuArrow = React.forwardRef<SVGSVGElement, IMenuArrowProps>(
  ({ menuType, ...props }, ref) => {
    const MenuPrimitive =
      menuType === 'context' ? ContextMenuPrimitive : DropdownMenuPrimitive
    return <MenuPrimitive.Arrow ref={ref} {...props} />
  }
)

interface IMenuItemProps
  extends IMenuTypeProp,
    IContextMenuItemProps,
    IDropdownMenuItemProps {}

/**
 * The component that contains the  menu items.
 */
const MenuItem = React.forwardRef<HTMLDivElement, IMenuItemProps>(
  ({ menuType, className, ...props }, ref) => {
    const MenuPrimitive =
      menuType === 'context' ? ContextMenuPrimitive : DropdownMenuPrimitive
    return (
      <MenuPrimitive.Item
        ref={ref}
        className={cn('dropdown-menu-item', className)}
        {...props}
      />
    )
  }
)

interface IMenuGroupProps
  extends IMenuTypeProp,
    IContextMenuGroupProps,
    IDropdownMenuGroupProps {}

/**
 * Used to group multiple `MenuItem`s.
 */
const MenuGroup = React.forwardRef<HTMLDivElement, IMenuGroupProps>(
  ({ menuType, ...props }, ref) => {
    const MenuPrimitive =
      menuType === 'context' ? ContextMenuPrimitive : DropdownMenuPrimitive
    return <MenuPrimitive.Group ref={ref} {...props} />
  }
)

interface IMenuLabelProps
  extends IMenuTypeProp,
    IContextMenuLabelProps,
    IDropdownMenuLabelProps {}

/**
 * Used to render a label. It won't be focusable using arrow keys.
 */
const MenuLabel = React.forwardRef<HTMLDivElement, IMenuLabelProps>(
  ({ menuType, className, ...props }, ref) => {
    const MenuPrimitive =
      menuType === 'context' ? ContextMenuPrimitive : DropdownMenuPrimitive
    return (
      <MenuPrimitive.Label
        ref={ref}
        className={cn(
          'text-color-primary px-2 pb-0.5 pt-1.5 text-start text-sm font-semibold',
          className
        )}
        {...props}
      />
    )
  }
)

interface IMenuCheckboxItemProps
  extends IMenuTypeProp,
    IContextMenuCheckboxItemProps,
    IDropdownMenuCheckboxItemProps {}

/**
 * An item that can be controlled and rendered like a checkbox.
 */
const MenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  IMenuCheckboxItemProps
>(({ menuType, className, ...props }, ref) => {
  const MenuPrimitive =
    menuType === 'context' ? ContextMenuPrimitive : DropdownMenuPrimitive
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      className={cn('dropdown-menu-item', className)}
      {...props}
    />
  )
})

interface IMenuRadioGroupProps
  extends IMenuTypeProp,
    IContextMenuRadioGroupProps,
    IDropdownMenuRadioGroupProps {}

/**
 * Used to group multiple `MenuRadioItem`s.
 */
const MenuRadioGroup = React.forwardRef<HTMLDivElement, IMenuRadioGroupProps>(
  ({ menuType, ...props }, ref) => {
    const MenuPrimitive =
      menuType === 'context' ? ContextMenuPrimitive : DropdownMenuPrimitive
    return <MenuPrimitive.RadioGroup ref={ref} {...props} />
  }
)

interface IMenuRadioItemProps
  extends IMenuTypeProp,
    IContextMenuRadioItemProps,
    IDropdownMenuRadioItemProps {}

/**
 * An item that can be controlled and rendered like a radio.
 */
const MenuRadioItem = React.forwardRef<HTMLDivElement, IMenuRadioItemProps>(
  ({ menuType, className, ...props }, ref) => {
    const MenuPrimitive =
      menuType === 'context' ? ContextMenuPrimitive : DropdownMenuPrimitive
    return (
      <MenuPrimitive.RadioItem
        ref={ref}
        className={cn('dropdown-menu-item', className)}
        {...props}
      />
    )
  }
)

interface IMenuItemIndicatorProps
  extends IMenuTypeProp,
    IContextMenuItemIndicatorProps,
    IDropdownMenuItemIndicatorProps {
  indicatorType: 'check' | 'radio'
}

/**
 * Renders when the parent `MenuCheckboxItem` or
 * `MenuRadioItem` is checked.
 */
const MenuItemIndicator = React.forwardRef<
  HTMLDivElement,
  IMenuItemIndicatorProps
>(({ menuType, indicatorType, ...props }, ref) => {
  const MenuPrimitive =
    menuType === 'context' ? ContextMenuPrimitive : DropdownMenuPrimitive
  return (
    <MenuPrimitive.ItemIndicator ref={ref} {...props}>
      {indicatorType === 'check' ? (
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
    </MenuPrimitive.ItemIndicator>
  )
})

interface IMenuSeparatorProps
  extends IMenuTypeProp,
    IContextMenuSeparatorProps,
    IDropdownMenuSeparatorProps {}

/**
 * Used to visually separate items in the  menu.
 */
const MenuSeparator = React.forwardRef<HTMLDivElement, IMenuSeparatorProps>(
  ({ menuType, className, ...props }, ref) => {
    const MenuPrimitive =
      menuType === 'context' ? ContextMenuPrimitive : DropdownMenuPrimitive
    return (
      <MenuPrimitive.Separator
        ref={ref}
        className={cn(
          'mx-2 my-1 h-px bg-neutral-900/10 dark:bg-neutral-50/20',
          className
        )}
        {...props}
      />
    )
  }
)

interface IMenuSubProps
  extends IMenuTypeProp,
    IContextMenuSubProps,
    IDropdownMenuSubProps {}

/**
 * Contains all the parts of a submenu.
 */
const MenuSub = ({ menuType, ...props }: IMenuSubProps) => {
  const MenuPrimitive =
    menuType === 'context' ? ContextMenuPrimitive : DropdownMenuPrimitive
  return <MenuPrimitive.Sub {...props} />
}

interface IMenuSubTriggerProps
  extends IMenuTypeProp,
    IContextMenuSubTriggerProps,
    IDropdownMenuSubTriggerProps {}

/**
 * An item that opens a submenu. Must be rendered inside `MenuSub`.
 */
const MenuSubTrigger = React.forwardRef<HTMLDivElement, IMenuSubTriggerProps>(
  ({ menuType, className, ...props }, ref) => {
    const MenuPrimitive =
      menuType === 'context' ? ContextMenuPrimitive : DropdownMenuPrimitive
    return (
      <MenuPrimitive.SubTrigger
        ref={ref}
        className={cn('dropdown-menu-item', className)}
        {...props}
      />
    )
  }
)

interface IMenuSubContentProps
  extends IMenuTypeProp,
    IContextMenuSubContentProps,
    IDropdownMenuSubContentProps {}

/**
 * The component that pops out when a submenu is open. Must be rendered inside `MenuSub`.
 */
const MenuSubContent = React.forwardRef<HTMLDivElement, IMenuSubContentProps>(
  ({ menuType, className, ...props }, ref) => {
    const MenuPrimitive =
      menuType === 'context' ? ContextMenuPrimitive : DropdownMenuPrimitive
    return (
      <MenuPrimitive.SubContent
        ref={ref}
        className={cn('dropdown-content-menu', className)}
        {...props}
      />
    )
  }
)

export default Menu
export {
  MenuRoot,
  ContextMenuTrigger,
  DropdownMenuTrigger,
  MenuPortal,
  MenuContent,
  MenuArrow,
  MenuItem,
  MenuGroup,
  MenuLabel,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuItemIndicator,
  MenuSeparator,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
}
