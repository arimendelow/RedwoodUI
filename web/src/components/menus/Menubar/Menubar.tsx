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
  MenubarItemIndicatorProps,
  MenubarSeparatorProps as IMenubarSeparatorProps,
  MenubarSubProps as IMenubarSubProps,
  MenubarSubTriggerProps as IMenubarSubTriggerProps,
  MenubarSubContentProps as IMenubarSubContentProps,
} from '@radix-ui/react-menubar'
import { PopperContentProps } from '@radix-ui/react-popover'

import {
  AnyMenuGroupType,
  MenuItemIndicatorRenderer,
} from 'src/components/menus/menuCommon'
import { cn } from 'src/lib/utils'

interface IMenuSection {
  /**
   * The label to use for the trigger of this section.
   */
  label: string
  /**
   * The content of the section.
   */
  sectionContent: AnyMenuGroupType[]
}

interface IMenuBarProps extends IMenubarRootProps {
  menuSections: IMenuSection[]
  /**
   * The preferred side of the trigger to render content against when open.
   * Will be reversed when collisions occur and avoidCollisions is enabled.
   */
  side?: PopperContentProps['side']
  /**
   * The offset between a given trigger and its content, in pixels.
   */
  sideOffset?: number
}

const Menubar = ({
  menuSections,
  side,
  sideOffset,
  ...props
}: IMenuBarProps) => {
  return (
    <MenubarRoot {...props}>
      {menuSections.map((menuSection, index) => {
        const sectionValue = `menubar-section-${index}`
        return (
          <MenubarMenu key={sectionValue} value={sectionValue}>
            <MenubarTrigger>{menuSection.label}</MenubarTrigger>
            <MenubarPortal>
              <MenubarContent side={side} sideOffset={sideOffset}>
                {menuSection.sectionContent.map((group, index) => (
                  <MenubarGroupRenderer></MenubarGroupRenderer>
                ))}
              </MenubarContent>
            </MenubarPortal>
          </MenubarMenu>
        )
      })}
    </MenubarRoot>
  )
}

/**
 * Contains all the parts of a menubar.
 */
const MenubarRoot = (props: IMenubarRootProps) => (
  <MenubarPrimitive.Root {...props} />
)

/**
 * A top level menu item, contains a trigger with content combination.
 */
const MenubarMenu = (props: IMenubarMenuProps) => (
  <MenubarPrimitive.Menu {...props} />
)

/**
 * The button that toggles the content. By default, the `MenubarContent` will position itself against the trigger.
 */
const MenubarTrigger = React.forwardRef<
  HTMLButtonElement,
  IMenubarTriggerProps
>((props, ref) => <MenubarPrimitive.Trigger ref={ref} {...props} />)

/**
 * When used, portals the content part into the body.
 */
const MenubarPortal = (props: IMenubarPortalProps) => (
  <MenubarPrimitive.Portal {...props} />
)

/**
 * The component that pops out when a menu is open.
 */
const MenubarContent = React.forwardRef<HTMLDivElement, IMenubarContentProps>(
  ({ className, sideOffset = 10, ...props }, ref) => {
    return (
      <MenubarPrimitive.Content
        ref={ref}
        className={cn('dropdown-content-menu', className)}
        sideOffset={sideOffset}
        {...props}
      />
    )
  }
)

/**
 * An optional arrow element to render alongside the  menu.
 * This can be used to help visually link the trigger with the `MenubarContent`.
 * Must be rendered inside `MenubarContent`.
 */
const MenubarArrow = React.forwardRef<SVGSVGElement, IMenubarArrowProps>(
  (props, ref) => {
    return <MenubarPrimitive.Arrow ref={ref} {...props} />
  }
)

/**
 * The component that contains the menubar items.
 */
const MenubarItem = React.forwardRef<HTMLDivElement, IMenubarItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <MenubarPrimitive.Item
        ref={ref}
        className={cn('dropdown-menu-item', className)}
        {...props}
      />
    )
  }
)

/**
 * Used to group multiple `MenubarItem`s.
 */
const MenubarGroup = React.forwardRef<HTMLDivElement, IMenubarGroupProps>(
  (props, ref) => {
    return <MenubarPrimitive.Group ref={ref} {...props} />
  }
)

/**
 * Used to render a label. It won't be focusable using arrow keys.
 */
const MenubarLabel = React.forwardRef<HTMLDivElement, IMenubarLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <MenubarPrimitive.Label
        ref={ref}
        className={cn('dropdown-menu-label', className)}
        {...props}
      />
    )
  }
)

/**
 * An item that can be controlled and rendered like a checkbox.
 */
const MenubarCheckboxItem = React.forwardRef<
  HTMLDivElement,
  IMenubarCheckboxItemProps
>(({ className, ...props }, ref) => {
  return (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      className={cn('dropdown-menu-item', className)}
      {...props}
    />
  )
})

/**
 * Used to group multiple `MenubarRadioItem`s.
 */
const MenubarRadioGroup = React.forwardRef<
  HTMLDivElement,
  IMenubarRadioGroupProps
>((props, ref) => {
  return <MenubarPrimitive.RadioGroup ref={ref} {...props} />
})

/**
 * An item that can be controlled and rendered like a radio.
 */
const MenubarRadioItem = React.forwardRef<
  HTMLDivElement,
  IMenubarRadioItemProps
>(({ className, ...props }, ref) => {
  return (
    <MenubarPrimitive.RadioItem
      ref={ref}
      className={cn('dropdown-menu-item', className)}
      {...props}
    />
  )
})

interface IMenubarItemIndicatorProps extends MenubarItemIndicatorProps {
  indicatorType: 'check' | 'radio'
}

/**
 * Renders when the parent `MenubarCheckboxItem` or
 * `MenubarRadioItem` is checked.
 */
const MenubarItemIndicator = React.forwardRef<
  HTMLDivElement,
  IMenubarItemIndicatorProps
>(({ indicatorType, ...props }, ref) => {
  return (
    <MenubarPrimitive.ItemIndicator ref={ref} {...props}>
      <MenuItemIndicatorRenderer indicatorType={indicatorType} />
    </MenubarPrimitive.ItemIndicator>
  )
})

/**
 * Used to visually separate items in a menubar menu.
 */
const MenubarSeparator = React.forwardRef<
  HTMLDivElement,
  IMenubarSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <MenubarPrimitive.Separator
      ref={ref}
      className={cn('dropdown-menu-separator', className)}
      {...props}
    />
  )
})

/**
 * Contains all the parts of a submenu.
 */
const MenubarSub = (props: IMenubarSubProps) => {
  return <MenubarPrimitive.Sub {...props} />
}

/**
 * An item that opens a submenu. Must be rendered inside `MenubarSub`.
 */
const MenubarSubTrigger = React.forwardRef<
  HTMLDivElement,
  IMenubarSubTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      className={cn('dropdown-menu-item', className)}
      {...props}
    />
  )
})

/**
 * The component that pops out when a submenu is open. Must be rendered inside `MenubarSub`.
 */
const MenubarSubContent = React.forwardRef<
  HTMLDivElement,
  IMenubarSubContentProps
>(({ className, ...props }, ref) => {
  return (
    <MenubarPrimitive.SubContent
      ref={ref}
      className={cn('dropdown-content-menu', className)}
      {...props}
    />
  )
})

export default Menubar

export {
  MenubarRoot,
  MenubarMenu,
  MenubarTrigger,
  MenubarPortal,
  MenubarContent,
  MenubarArrow,
  MenubarItem,
  MenubarGroup,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarItemIndicator,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
