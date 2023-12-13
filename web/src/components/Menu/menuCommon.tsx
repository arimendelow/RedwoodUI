import { CheckIcon } from '@heroicons/react/24/outline'

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

interface IMenubarSection {
  /**
   * The label to use for the trigger of this section.
   */
  label: string
  /**
   * The content of the section.
   */
  sectionContent: AnyMenuGroupType[]
}

interface IMenuItemIndicatorRendererProps {
  indicatorType: 'check' | 'radio'
}

/**
 * Used as the Check and Radio indicator for the menu items (eg `MenuItemIndicator` and `MenubarItemIndicator`).
 */
const MenuItemIndicatorRenderer = ({
  indicatorType,
}: IMenuItemIndicatorRendererProps) => {
  return indicatorType === 'check' ? (
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
  )
}

export { MenuItemIndicatorRenderer }

export type {
  IMenuItemBase,
  ISubMenuItem,
  IStandardMenuItem,
  ICheckMenuItem,
  IRadioMenuItem,
  IStandardMenuGroup,
  ICheckMenuGroup,
  IRadioMenuGroup,
  AnyMenuGroupType,
  IMenubarSection,
}
