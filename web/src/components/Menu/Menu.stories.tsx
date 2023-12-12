/* disabling the rule of hooks as it thinks you can't use hooks in the `render` function but you actually can */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Bars3Icon,
  Cog6ToothIcon,
  CreditCardIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid'
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react'

import { ChildrenPlaceholder } from 'src/lib/StorybookUtils'

import Button from '../Button/Button'

import Menu from './Menu'

const meta: Meta<typeof Menu> = {
  component: Menu,
  argTypes: {
    menuType: {
      table: {
        disable: true,
      },
    },
    trigger: {
      table: {
        disable: true,
      },
    },
    menuContent: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Menu>

export const Dropdown: Story = {
  argTypes: {
    side: {
      control: {
        type: 'radio',
        options: ['top', 'bottom', 'left', 'right'],
      },
    },
    sideOffset: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
  args: { side: 'bottom', sideOffset: 10 },
  // See https://github.com/storybookjs/storybook/issues/17720#issuecomment-1525784750
  parameters: {
    docs: {
      source: {
        code: 'disabled',
      },
    },
  },
  render: ({ side, sideOffset }) => {
    const [selectedRadioValue, setSelectedRadioValue] =
      React.useState('first item')
    const [firstItemChecked, setFirstItemChecked] = React.useState(false)
    const [secondItemChecked, setSecondItemChecked] = React.useState(false)
    const [thirdItemChecked, setThirdItemChecked] = React.useState(false)
    return (
      <Menu
        menuType="dropdown"
        trigger={
          <Button pill className="h-10 w-10">
            <Bars3Icon className="h-4 w-4" />
          </Button>
        }
        side={side}
        sideOffset={sideOffset}
        menuContent={[
          {
            type: 'standard',
            label: 'Standard Section',
            items: [
              {
                icon: <UserCircleIcon />,
                item: <button>Profile</button>,
                endText: '⇧⌘P',
                textValue: 'profile',
              },
              {
                icon: <CreditCardIcon />,
                item: <button>Billing</button>,
                textValue: 'billing',
                disabled: true,
              },
              {
                icon: <AcademicCapIcon />,
                label: 'Standard Submenu Section',
                subMenuContent: [
                  {
                    type: 'standard',
                    items: [
                      {
                        icon: <UserCircleIcon />,
                        item: <button>Profile</button>,
                        endText: '⇧⌘P',
                        textValue: 'profile',
                      },
                      {
                        icon: <CreditCardIcon />,
                        item: <button>Billing</button>,
                        textValue: 'billing',
                        disabled: true,
                      },
                    ],
                  },
                  {
                    type: 'standard',
                    items: [
                      {
                        icon: <UserCircleIcon />,
                        item: <button>Profile</button>,
                        endText: '⇧⌘P',
                        textValue: 'profile',
                      },
                      {
                        icon: <CreditCardIcon />,
                        item: <button>Billing</button>,
                        textValue: 'billing',
                        disabled: true,
                      },
                      {
                        icon: <AcademicCapIcon />,
                        label: 'Nested Standard Submenu Section',
                        subMenuContent: [
                          {
                            type: 'standard',
                            items: [
                              {
                                icon: <UserCircleIcon />,
                                item: <button>Profile</button>,
                                endText: '⇧⌘P',
                                textValue: 'profile',
                              },
                              {
                                icon: <AcademicCapIcon />,
                                label: 'Standard Submenu Section',
                                subMenuContent: [
                                  {
                                    type: 'standard',
                                    items: [
                                      {
                                        icon: <UserCircleIcon />,
                                        item: <button>Profile</button>,
                                        endText: '⇧⌘P',
                                        textValue: 'profile',
                                      },
                                      {
                                        icon: <CreditCardIcon />,
                                        item: <button>Billing</button>,
                                        textValue: 'billing',
                                        disabled: true,
                                      },
                                    ],
                                  },
                                  {
                                    type: 'standard',
                                    items: [
                                      {
                                        icon: <UserCircleIcon />,
                                        item: <button>Profile</button>,
                                        endText: '⇧⌘P',
                                        textValue: 'profile',
                                      },
                                      {
                                        icon: <CreditCardIcon />,
                                        item: <button>Billing</button>,
                                        textValue: 'billing',
                                        disabled: true,
                                      },
                                      {
                                        icon: <AcademicCapIcon />,
                                        label:
                                          'Nested Standard Submenu Section',
                                        subMenuContent: [
                                          {
                                            type: 'standard',
                                            items: [
                                              {
                                                icon: <AcademicCapIcon />,
                                                label:
                                                  'Standard Submenu Section',
                                                subMenuContent: [
                                                  {
                                                    type: 'standard',
                                                    items: [
                                                      {
                                                        icon: (
                                                          <UserCircleIcon />
                                                        ),
                                                        item: (
                                                          <button>
                                                            Profile
                                                          </button>
                                                        ),
                                                        endText: '⇧⌘P',
                                                        textValue: 'profile',
                                                      },
                                                      {
                                                        icon: (
                                                          <CreditCardIcon />
                                                        ),
                                                        item: (
                                                          <button>
                                                            Billing
                                                          </button>
                                                        ),
                                                        textValue: 'billing',
                                                        disabled: true,
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    type: 'standard',
                                                    items: [
                                                      {
                                                        icon: (
                                                          <UserCircleIcon />
                                                        ),
                                                        item: (
                                                          <button>
                                                            Profile
                                                          </button>
                                                        ),
                                                        endText: '⇧⌘P',
                                                        textValue: 'profile',
                                                      },
                                                      {
                                                        icon: (
                                                          <CreditCardIcon />
                                                        ),
                                                        item: (
                                                          <button>
                                                            Billing
                                                          </button>
                                                        ),
                                                        textValue: 'billing',
                                                        disabled: true,
                                                      },
                                                      {
                                                        icon: (
                                                          <AcademicCapIcon />
                                                        ),
                                                        label:
                                                          'Nested Standard Submenu Section',
                                                        subMenuContent: [
                                                          {
                                                            type: 'standard',
                                                            items: [
                                                              {
                                                                icon: (
                                                                  <UserCircleIcon />
                                                                ),
                                                                item: (
                                                                  <button>
                                                                    Profile
                                                                  </button>
                                                                ),
                                                                endText: '⇧⌘P',
                                                                textValue:
                                                                  'profile',
                                                              },
                                                              {
                                                                icon: (
                                                                  <CreditCardIcon />
                                                                ),
                                                                item: (
                                                                  <button>
                                                                    Billing
                                                                  </button>
                                                                ),
                                                                textValue:
                                                                  'billing',
                                                                disabled: true,
                                                              },
                                                            ],
                                                          },
                                                        ],
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                              {
                                                icon: <UserCircleIcon />,
                                                item: <button>Profile</button>,
                                                endText: '⇧⌘P',
                                                textValue: 'profile',
                                              },
                                              {
                                                icon: <CreditCardIcon />,
                                                item: <button>Billing</button>,
                                                textValue: 'billing',
                                                disabled: true,
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                icon: <CreditCardIcon />,
                                item: <button>Billing</button>,
                                textValue: 'billing',
                                disabled: true,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                item: <button>No Icon</button>,
                endText: 'we ❤️ tailwind',
                textValue: 'no icon',
              },
              {
                icon: <Cog6ToothIcon />,
                item: <button>Settings</button>,
                textValue: 'settings',
              },
            ],
          },
          {
            type: 'radio',
            label: 'Radio Section',
            selectedItemTextValue: selectedRadioValue,
            setSelectedItemTextValue: setSelectedRadioValue,
            items: [
              { item: <span>First item</span>, textValue: 'first item' },
              {
                item: <span>Second item</span>,
                textValue: 'second item',
              },
              {
                item: <span>Third item</span>,
                textValue: 'third item',
                endText: '⌘3',
              },
            ],
          },
          {
            type: 'check',
            label: 'Check Section',
            items: [
              {
                item: <span>First item</span>,
                textValue: 'first item',
                checked: firstItemChecked,
                setChecked: setFirstItemChecked,
              },
              {
                item: <span>Second item</span>,
                textValue: 'second item',
                endText: '⌘2',
                checked: secondItemChecked,
                setChecked: setSecondItemChecked,
              },
              {
                item: <span>Third item</span>,
                textValue: 'third item',
                checked: thirdItemChecked,
                setChecked: setThirdItemChecked,
              },
            ],
          },
        ]}
      />
    )
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[30rem] flex-col items-center justify-center ">
        <Story />
      </div>
    ),
  ],
}

export const Context: Story = {
  argTypes: {
    side: {
      table: {
        disable: true,
      },
    },
    sideOffset: {
      table: {
        disable: true,
      },
    },
  },
  // See https://github.com/storybookjs/storybook/issues/17720#issuecomment-1525784750
  parameters: {
    docs: {
      source: {
        code: 'disabled',
      },
    },
  },
  render: () => {
    const [selectedRadioValue, setSelectedRadioValue] =
      React.useState('first item')
    const [firstItemChecked, setFirstItemChecked] = React.useState(false)
    const [secondItemChecked, setSecondItemChecked] = React.useState(false)
    const [thirdItemChecked, setThirdItemChecked] = React.useState(false)
    return (
      <Menu
        menuType="context"
        trigger={
          <ChildrenPlaceholder className="h-72 w-96" text="Right click here." />
        }
        menuContent={[
          {
            type: 'standard',
            label: 'Standard Section',
            items: [
              {
                icon: <UserCircleIcon />,
                item: <button>Profile</button>,
                endText: '⇧⌘P',
                textValue: 'profile',
              },
              {
                icon: <CreditCardIcon />,
                item: <button>Billing</button>,
                textValue: 'billing',
                disabled: true,
              },
              {
                icon: <AcademicCapIcon />,
                label: 'Standard Submenu Section',
                subMenuContent: [
                  {
                    type: 'standard',
                    items: [
                      {
                        icon: <UserCircleIcon />,
                        item: <button>Profile</button>,
                        endText: '⇧⌘P',
                        textValue: 'profile',
                      },
                      {
                        icon: <CreditCardIcon />,
                        item: <button>Billing</button>,
                        textValue: 'billing',
                        disabled: true,
                      },
                    ],
                  },
                  {
                    type: 'standard',
                    items: [
                      {
                        icon: <UserCircleIcon />,
                        item: <button>Profile</button>,
                        endText: '⇧⌘P',
                        textValue: 'profile',
                      },
                      {
                        icon: <CreditCardIcon />,
                        item: <button>Billing</button>,
                        textValue: 'billing',
                        disabled: true,
                      },
                      {
                        icon: <AcademicCapIcon />,
                        label: 'Nested Standard Submenu Section',
                        subMenuContent: [
                          {
                            type: 'standard',
                            items: [
                              {
                                icon: <UserCircleIcon />,
                                item: <button>Profile</button>,
                                endText: '⇧⌘P',
                                textValue: 'profile',
                              },
                              {
                                icon: <AcademicCapIcon />,
                                label: 'Standard Submenu Section',
                                subMenuContent: [
                                  {
                                    type: 'standard',
                                    items: [
                                      {
                                        icon: <UserCircleIcon />,
                                        item: <button>Profile</button>,
                                        endText: '⇧⌘P',
                                        textValue: 'profile',
                                      },
                                      {
                                        icon: <CreditCardIcon />,
                                        item: <button>Billing</button>,
                                        textValue: 'billing',
                                        disabled: true,
                                      },
                                    ],
                                  },
                                  {
                                    type: 'standard',
                                    items: [
                                      {
                                        icon: <UserCircleIcon />,
                                        item: <button>Profile</button>,
                                        endText: '⇧⌘P',
                                        textValue: 'profile',
                                      },
                                      {
                                        icon: <CreditCardIcon />,
                                        item: <button>Billing</button>,
                                        textValue: 'billing',
                                        disabled: true,
                                      },
                                      {
                                        icon: <AcademicCapIcon />,
                                        label:
                                          'Nested Standard Submenu Section',
                                        subMenuContent: [
                                          {
                                            type: 'standard',
                                            items: [
                                              {
                                                icon: <AcademicCapIcon />,
                                                label:
                                                  'Standard Submenu Section',
                                                subMenuContent: [
                                                  {
                                                    type: 'standard',
                                                    items: [
                                                      {
                                                        icon: (
                                                          <UserCircleIcon />
                                                        ),
                                                        item: (
                                                          <button>
                                                            Profile
                                                          </button>
                                                        ),
                                                        endText: '⇧⌘P',
                                                        textValue: 'profile',
                                                      },
                                                      {
                                                        icon: (
                                                          <CreditCardIcon />
                                                        ),
                                                        item: (
                                                          <button>
                                                            Billing
                                                          </button>
                                                        ),
                                                        textValue: 'billing',
                                                        disabled: true,
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    type: 'standard',
                                                    items: [
                                                      {
                                                        icon: (
                                                          <UserCircleIcon />
                                                        ),
                                                        item: (
                                                          <button>
                                                            Profile
                                                          </button>
                                                        ),
                                                        endText: '⇧⌘P',
                                                        textValue: 'profile',
                                                      },
                                                      {
                                                        icon: (
                                                          <CreditCardIcon />
                                                        ),
                                                        item: (
                                                          <button>
                                                            Billing
                                                          </button>
                                                        ),
                                                        textValue: 'billing',
                                                        disabled: true,
                                                      },
                                                      {
                                                        icon: (
                                                          <AcademicCapIcon />
                                                        ),
                                                        label:
                                                          'Nested Standard Submenu Section',
                                                        subMenuContent: [
                                                          {
                                                            type: 'standard',
                                                            items: [
                                                              {
                                                                icon: (
                                                                  <UserCircleIcon />
                                                                ),
                                                                item: (
                                                                  <button>
                                                                    Profile
                                                                  </button>
                                                                ),
                                                                endText: '⇧⌘P',
                                                                textValue:
                                                                  'profile',
                                                              },
                                                              {
                                                                icon: (
                                                                  <CreditCardIcon />
                                                                ),
                                                                item: (
                                                                  <button>
                                                                    Billing
                                                                  </button>
                                                                ),
                                                                textValue:
                                                                  'billing',
                                                                disabled: true,
                                                              },
                                                            ],
                                                          },
                                                        ],
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                              {
                                                icon: <UserCircleIcon />,
                                                item: <button>Profile</button>,
                                                endText: '⇧⌘P',
                                                textValue: 'profile',
                                              },
                                              {
                                                icon: <CreditCardIcon />,
                                                item: <button>Billing</button>,
                                                textValue: 'billing',
                                                disabled: true,
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                icon: <CreditCardIcon />,
                                item: <button>Billing</button>,
                                textValue: 'billing',
                                disabled: true,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                item: <button>No Icon</button>,
                endText: 'we ❤️ tailwind',
                textValue: 'no icon',
              },
              {
                icon: <Cog6ToothIcon />,
                item: <button>Settings</button>,
                textValue: 'settings',
              },
            ],
          },
          {
            type: 'radio',
            label: 'Radio Section',
            selectedItemTextValue: selectedRadioValue,
            setSelectedItemTextValue: setSelectedRadioValue,
            items: [
              { item: <span>First item</span>, textValue: 'first item' },
              {
                item: <span>Second item</span>,
                textValue: 'second item',
              },
              {
                item: <span>Third item</span>,
                textValue: 'third item',
                endText: '⌘3',
              },
            ],
          },
          {
            type: 'check',
            label: 'Check Section',
            items: [
              {
                item: <span>First item</span>,
                textValue: 'first item',
                checked: firstItemChecked,
                setChecked: setFirstItemChecked,
              },
              {
                item: <span>Second item</span>,
                textValue: 'second item',
                endText: '⌘2',
                checked: secondItemChecked,
                setChecked: setSecondItemChecked,
              },
              {
                item: <span>Third item</span>,
                textValue: 'third item',
                checked: thirdItemChecked,
                setChecked: setThirdItemChecked,
              },
            ],
          },
        ]}
      />
    )
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[30rem] flex-col items-center justify-center ">
        <Story />
      </div>
    ),
  ],
}
