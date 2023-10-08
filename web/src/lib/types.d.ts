interface IBaseComponentProps {
  /**
   * Additional class names to apply to the component.
   */
  className?: string
  /**
   * When true, instead of rendering this component, its children will be rendered instead and
   * its props and behavior will be applied to the child.
   * See here for more details: https://www.radix-ui.com/primitives/docs/guides/composition
   */
  asChild?: boolean
}
