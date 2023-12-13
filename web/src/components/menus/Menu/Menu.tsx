import { ChevronRightIcon } from '@heroicons/react/20/solid'
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
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import type {
  MenubarProps as IMenubarRootProps,
  MenubarMenuProps as IMenubarMenuProps,
  MenubarTriggerProps as IMenubarTriggerProps,
  MenubarPortalProps as IMenubarPortalProps,
  MenubarContentProps as IMenubarContentProps,
  MenubarArrowProps as IMenubarArrowProps,
  MenubarItemProps as IMenubarItemProps,
  MenubarGroupProps as IMenubarGroupProps,
  MenubarLabelProps as IMenubarLabelProps,
  MenubarCheckboxItemProps as IMenubarCheckboxItemProps,
  MenubarRadioGroupProps as IMenubarRadioGroupProps,
  MenubarRadioItemProps as IMenubarRadioItemProps,
  MenubarItemIndicatorProps as IMenubarItemIndicatorProps,
  MenubarSeparatorProps as IMenubarSeparatorProps,
  MenubarSubProps as IMenubarSubProps,
  MenubarSubTriggerProps as IMenubarSubTriggerProps,
  MenubarSubContentProps as IMenubarSubContentProps,
} from '@radix-ui/react-menubar'
import { PopperContentProps } from '@radix-ui/react-popper'
import { AnimatePresence, AnimationProps, motion } from 'framer-motion'

import { MenuItemIndicatorRenderer } from 'src/components/menus/menuCommon'
import type {
  AnyMenuGroupType,
  ICheckMenuItem,
  IMenubarSection,
  IRadioMenuItem,
  IStandardMenuItem,
  ISubMenuItem,
} from 'src/components/menus/menuCommon'
import { cn } from 'src/lib/utils'

type MenuType = 'context' | 'dropdown' | 'menubar'

interface IMenuTypeProp {
  /**
   * The context, dropdown, and menubar menus are very similar. Rather than duplicating
   * the code for both, we switch the primitives being used based on this prop.
   * See here: https://github.com/radix-ui/primitives/discussions/992
   *
   * Named `menuType` to avoid conflict with `type` prop on, for example, the Arrow component.
   */
  menuType: MenuType
}

/**
 * Props for rendering either a Context or Dropdown menu.
 */
interface IContextDropdownMenuProps {
  /**
   * The element that will trigger the menu to open.
   * You *do not* need to pass `onClick` to this element, it will be handled for you.
   * - For a Context menu: The area that opens the context menu when right-clicking (or using the relevant keyboard shortcuts).
   * - For a Dropdown menu: The button that toggles the dropdown menu. By default, the `MenuContent` will position itself against the trigger.
   */
  trigger: React.ReactNode
  /**
   * The content of the menu.
   */
  content: AnyMenuGroupType[]
}

/**
 * Props for rendering a Menubar.
 * The primary difference is that it contains multiple sections, each with their own trigger and content.
 */
interface IMenubarProps {
  menuSections: IMenubarSection[]
}

interface IMenuProps
  extends IMenuTypeProp,
    IMenuRootProps,
    IDropdownPositioningProps {
  menuContent: IContextDropdownMenuProps | IMenubarProps
}

interface IDropdownPositioningProps {
  /**
   * When rendering a Dropdown Menu, the preferred side of the trigger to render against when open.
   * Will be reversed when collisions occur and `avoidCollisions` is enabled.
   */
  side?: PopperContentProps['side']
  /**
   * When rendering a Dropdown Menu or Menubar, the offset between a trigger and related content, in pixels.
   */
  sideOffset?: number
}

const Menu = (props: IMenuProps) => {
  if (props.menuType === 'menubar') {
    return <Menubar {...props} />
  } else {
    return <ContextDropdownMenu {...props} />
  }
}

/**
 * Spread this on the `motion.div` holding the menu content to animate it.
 */
const menuAnimationProps: AnimationProps = {
  initial: {
    opacity: 0,
    transform: 'scale(0.9)',
    transformOrigin: `var(--radix-popper-transform-origin)`,
  },
  animate: {
    opacity: 1,
    transform: 'scale(1)',
    transition: { duration: 0 },
    transformOrigin: `var(--radix-popper-transform-origin)`,
  },
  exit: {
    opacity: 0,
    transform: 'scale(0.9)',
    transformOrigin: `var(--radix-popper-transform-origin)`,
  },
  transition: { ease: 'easeInOut', duration: 0.1 },
}

/**
 * The Context or Dropdown menu.
 */
const ContextDropdownMenu = ({
  menuContent: menuContentProp,
  menuType,
  sideOffset,
  side,
}: IMenuProps) => {
  const MenuTrigger =
    menuType === 'context' ? ContextMenuTrigger : DropdownMenuTrigger

  // We know this is a ContextDropdownMenu because we're in the ContextDropdownMenu component.
  const menuContent = menuContentProp as IContextDropdownMenuProps

  const [open, setOpen] = React.useState(false)
  return (
    <MenuRoot menuType={menuType} open={open} onOpenChange={setOpen}>
      <MenuTrigger
        // When a Dropdown menu, the trigger will be a button, so we want to use `asChild` to avoid a wrapping div.
        asChild={menuType === 'dropdown'}
        onClick={(e) => {
          console.log(e)
        }}
      >
        {menuContent.trigger}
      </MenuTrigger>
      <AnimatePresence>
        {open && (
          <MenuPortal forceMount menuType={menuType}>
            <MenuContent
              id="menu-content"
              menuType={menuType}
              sideOffset={sideOffset}
              asChild
              side={side}
            >
              <motion.div {...menuAnimationProps}>
                {menuContent.content.map((group, index) => (
                  <MenuGroupRenderer
                    menuType={menuType}
                    key={index}
                    group={group}
                    groupIndex={index}
                  />
                ))}
              </motion.div>
            </MenuContent>
          </MenuPortal>
        )}
      </AnimatePresence>
    </MenuRoot>
  )
}

/**
 * The Menubar
 */
const Menubar = ({
  menuContent: menuContentProp,
  menuType,
  sideOffset,
  side,
}: IMenuProps) => {
  // We know this is a Menubar because we're in the Menubar component.
  const menuContent = menuContentProp as IMenubarProps

  const [openSection, setOpenSection] = React.useState('')

  const [animationDuration, setAnimationDuration] = React.useState(0.1)

  React.useEffect(() => {
    console.log('animation duration', animationDuration)
  }, [animationDuration])

  return (
    <MenuRoot
      menuType={menuType}
      value={openSection}
      onValueChange={(value) => {
        if (value === '') {
          setAnimationDuration(0.1)
        } else {
          setAnimationDuration(0)
        }
        setOpenSection(value)
      }}
      className="flex rounded-md border border-neutral-200 bg-light p-1"
    >
      {menuContent.menuSections.map((menuSection) => {
        return (
          <MenubarMenu key={menuSection.label} value={menuSection.label}>
            <MenubarTrigger className="flex select-none items-center justify-between gap-[2px] rounded px-3 py-2 text-[13px] font-medium leading-none text-dark outline-none data-[highlighted]:bg-primary-700 data-[state=open]:bg-primary-700">
              {menuSection.label}
            </MenubarTrigger>
            <AnimatePresence>
              {openSection === menuSection.label && (
                <MenuPortal forceMount menuType={menuType}>
                  <MenuContent
                    onFocusOutside={(event) => {
                      // Without disabling onFocusOutside, there's weird behavior when going from one menu to another.
                      event.preventDefault()
                    }}
                    menuType={menuType}
                    sideOffset={sideOffset}
                    side={side}
                    asChild
                  >
                    <motion.div
                      key={menuSection.label}
                      initial={{
                        opacity: 0,
                        transform: 'scale(0.9)',
                        transformOrigin: `var(--radix-popper-transform-origin)`,
                      }}
                      animate={{
                        opacity: 1,
                        transform: 'scale(1)',
                        transition: { duration: 0 },
                        transformOrigin: `var(--radix-popper-transform-origin)`,
                      }}
                      exit={{
                        opacity: 0,
                        transform: 'scale(0.9)',
                        transformOrigin: `var(--radix-popper-transform-origin)`,
                      }}
                      transition={{
                        ease: 'easeInOut',
                        duration: animationDuration,
                      }}
                    >
                      {menuSection.sectionContent.map((group, index) => (
                        <MenuGroupRenderer
                          menuType={menuType}
                          key={index}
                          group={group}
                          groupIndex={index}
                        />
                      ))}
                    </motion.div>
                  </MenuContent>
                </MenuPortal>
              )}
            </AnimatePresence>
          </MenubarMenu>
        )
      })}
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

const getMenuPrimitive = (menuType: MenuType) => {
  switch (menuType) {
    case 'context':
      return ContextMenuPrimitive
    case 'dropdown':
      return DropdownMenuPrimitive
    case 'menubar':
      return MenubarPrimitive
  }
}

interface IMenuRootProps
  extends IMenuTypeProp,
    IContextMenuRootProps,
    IDropdownMenuRootProps,
    IMenubarRootProps {}

/**
 * Contains all the parts of a menu.
 */
const MenuRoot = ({ menuType, ...props }: IMenuRootProps) => {
  const MenuPrimitive = getMenuPrimitive(menuType)
  return <MenuPrimitive.Root {...props} />
}

/**
 * For a Menubar, this is the top level menu item, containing the trigger with content combination
 * for a given section.
 */
const MenubarMenu = (props: IMenubarMenuProps) => (
  <MenubarPrimitive.Menu {...props} />
)

/**
 * The area that opens the context menu.
 * Wrap it around the target you want the context menu to open from when right-clicking (or using the relevant keyboard shortcuts).
 *
 * Unlike the other components, the Trigger is actually different for the types of menu.
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
 * Unlike the other components, the Trigger is actually different for the types of menu.
 * Therefore, rather than using the `IMenuTypeProp` to switch between them, we just use the correct component directly.
 */
const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  IDropdownMenuTriggerProps
>((props, ref) => <DropdownMenuPrimitive.Trigger ref={ref} {...props} />)

/**
 * The button that toggles the content for a Menubar section.
 * By default, the `MenubarContent` will position itself against the trigger.
 */
const MenubarTrigger = React.forwardRef<
  HTMLButtonElement,
  IMenubarTriggerProps
>((props, ref) => <MenubarPrimitive.Trigger ref={ref} {...props} />)

interface IMenuPortalProps
  extends IMenuTypeProp,
    IContextMenuPortalProps,
    IDropdownMenuPortalProps,
    IMenubarPortalProps {}

/**
 * When used, portals the content part into the `body`.
 * */
const MenuPortal = ({ menuType, ...props }: IMenuPortalProps) => {
  const MenuPrimitive = getMenuPrimitive(menuType)
  return <MenuPrimitive.Portal {...props} />
}

interface IMenuContentProps
  extends IMenuTypeProp,
    IContextMenuContentProps,
    IDropdownMenuContentProps,
    IMenubarContentProps {}

/**
 * The component that pops out when the menu is open.
 */
const MenuContent = React.forwardRef<HTMLDivElement, IMenuContentProps>(
  ({ menuType, className, sideOffset = 10, ...props }, ref) => {
    const MenuPrimitive = getMenuPrimitive(menuType)
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
    IDropdownMenuArrowProps,
    IMenubarArrowProps {}

/**
 * An optional arrow element to render alongside the menu.
 * This can be used to help visually link the trigger with the `MenuContent`.
 * Must be rendered inside `MenuContent`.
 */
const MenuArrow = React.forwardRef<SVGSVGElement, IMenuArrowProps>(
  ({ menuType, ...props }, ref) => {
    const MenuPrimitive = getMenuPrimitive(menuType)
    return <MenuPrimitive.Arrow ref={ref} {...props} />
  }
)

interface IMenuItemProps
  extends IMenuTypeProp,
    IContextMenuItemProps,
    IDropdownMenuItemProps,
    IMenubarItemProps {}

/**
 * The component that contains the menu items.
 */
const MenuItem = React.forwardRef<HTMLDivElement, IMenuItemProps>(
  ({ menuType, className, ...props }, ref) => {
    const MenuPrimitive = getMenuPrimitive(menuType)
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
    IDropdownMenuGroupProps,
    IMenubarGroupProps {}

/**
 * Used to group multiple `MenuItem`s.
 */
const MenuGroup = React.forwardRef<HTMLDivElement, IMenuGroupProps>(
  ({ menuType, ...props }, ref) => {
    const MenuPrimitive = getMenuPrimitive(menuType)
    return <MenuPrimitive.Group ref={ref} {...props} />
  }
)

interface IMenuLabelProps
  extends IMenuTypeProp,
    IContextMenuLabelProps,
    IDropdownMenuLabelProps,
    IMenubarLabelProps {}

/**
 * Used to render a label. It won't be focusable using arrow keys.
 */
const MenuLabel = React.forwardRef<HTMLDivElement, IMenuLabelProps>(
  ({ menuType, className, ...props }, ref) => {
    const MenuPrimitive = getMenuPrimitive(menuType)
    return (
      <MenuPrimitive.Label
        ref={ref}
        className={cn('dropdown-menu-label', className)}
        {...props}
      />
    )
  }
)

interface IMenuCheckboxItemProps
  extends IMenuTypeProp,
    IContextMenuCheckboxItemProps,
    IDropdownMenuCheckboxItemProps,
    IMenubarCheckboxItemProps {}

/**
 * An item that can be controlled and rendered like a checkbox.
 */
const MenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  IMenuCheckboxItemProps
>(({ menuType, className, ...props }, ref) => {
  const MenuPrimitive = getMenuPrimitive(menuType)
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
    IDropdownMenuRadioGroupProps,
    IMenubarRadioGroupProps {}

/**
 * Used to group multiple `MenuRadioItem`s.
 */
const MenuRadioGroup = React.forwardRef<HTMLDivElement, IMenuRadioGroupProps>(
  ({ menuType, ...props }, ref) => {
    const MenuPrimitive = getMenuPrimitive(menuType)
    return <MenuPrimitive.RadioGroup ref={ref} {...props} />
  }
)

interface IMenuRadioItemProps
  extends IMenuTypeProp,
    IContextMenuRadioItemProps,
    IDropdownMenuRadioItemProps,
    IMenubarRadioItemProps {}

/**
 * An item that can be controlled and rendered like a radio.
 */
const MenuRadioItem = React.forwardRef<HTMLDivElement, IMenuRadioItemProps>(
  ({ menuType, className, ...props }, ref) => {
    const MenuPrimitive = getMenuPrimitive(menuType)
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
    IDropdownMenuItemIndicatorProps,
    IMenubarItemIndicatorProps {
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
  const MenuPrimitive = getMenuPrimitive(menuType)
  return (
    <MenuPrimitive.ItemIndicator ref={ref} {...props}>
      <MenuItemIndicatorRenderer indicatorType={indicatorType} />
    </MenuPrimitive.ItemIndicator>
  )
})

interface IMenuSeparatorProps
  extends IMenuTypeProp,
    IContextMenuSeparatorProps,
    IDropdownMenuSeparatorProps,
    IMenubarSeparatorProps {}

/**
 * Used to visually separate items in the menu.
 */
const MenuSeparator = React.forwardRef<HTMLDivElement, IMenuSeparatorProps>(
  ({ menuType, className, ...props }, ref) => {
    const MenuPrimitive = getMenuPrimitive(menuType)
    return (
      <MenuPrimitive.Separator
        ref={ref}
        className={cn('dropdown-menu-separator', className)}
        {...props}
      />
    )
  }
)

interface IMenuSubProps
  extends IMenuTypeProp,
    IContextMenuSubProps,
    IDropdownMenuSubProps,
    IMenubarSubProps {}

/**
 * Contains all the parts of a submenu.
 */
const MenuSub = ({ menuType, ...props }: IMenuSubProps) => {
  const MenuPrimitive = getMenuPrimitive(menuType)
  return <MenuPrimitive.Sub {...props} />
}

interface IMenuSubTriggerProps
  extends IMenuTypeProp,
    IContextMenuSubTriggerProps,
    IDropdownMenuSubTriggerProps,
    IMenubarSubTriggerProps {}

/**
 * An item that opens a submenu. Must be rendered inside `MenuSub`.
 */
const MenuSubTrigger = React.forwardRef<HTMLDivElement, IMenuSubTriggerProps>(
  ({ menuType, className, ...props }, ref) => {
    const MenuPrimitive = getMenuPrimitive(menuType)
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
    IDropdownMenuSubContentProps,
    IMenubarSubContentProps {}

/**
 * The component that pops out when a submenu is open. Must be rendered inside `MenuSub`.
 */
const MenuSubContent = React.forwardRef<HTMLDivElement, IMenuSubContentProps>(
  ({ menuType, className, ...props }, ref) => {
    const MenuPrimitive = getMenuPrimitive(menuType)
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
