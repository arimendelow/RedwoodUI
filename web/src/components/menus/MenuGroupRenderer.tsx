import { MenubarRadioGroup } from '@radix-ui/react-menubar'

import { MenuRadioGroup } from './Menu/Menu'

interface IMenuGroupRendererProps {
  menuType: 'menubar' | 'context' | 'dropdown'
  group: AnyMenuGroupType
  groupIndex: number
}

const MenuGroupRenderer = ({
  menuType,
  group,
  groupIndex,
}: IMenuGroupRendererProps) => {
  /**
   * There are a few different components that we use to parent groups:
   * - If it's a radio group, then
   */
  const GroupComp = (() => {
    switch (group.type) {
      case 'radio':
        if (menuType === 'menubar') {
          return MenubarRadioGroup
        } else {
          return MenuRadioGroup
        }
    }
  })()
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
