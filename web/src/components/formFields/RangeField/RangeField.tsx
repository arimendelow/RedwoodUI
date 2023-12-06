import * as RangePrimitive from '@radix-ui/react-slider'

import { useController } from '@redwoodjs/forms'

import { cn } from 'src/lib/utils'

import InputFieldWrapper, {
  IInputFieldWrapperProps,
} from '../InputFieldWrapper/InputFieldWrapper'

interface IRangeFieldProps
  extends Omit<
      IInputFieldWrapperProps,
      'children' | 'className' | 'maxLength' | 'currentLength' | 'endComponent'
    >,
    // Omit the name prop from IRangeRootProps because we want the one from IInputFieldWrapperProps
    Omit<IRangeRootProps, 'name' | 'children' | 'asChild'> {
  wrapperClassName?: string
}

const RangeField = React.forwardRef<HTMLSpanElement, IRangeFieldProps>(
  (
    {
      /** START for wrapper */
      name,
      label,
      description,
      optional,
      hideErrorMessage,
      wrapperClassName,
      /** END for wrapper */
      ...props
    },
    ref
  ) => {
    const {
      field,
      fieldState: { error: fieldError },
    } = useController({
      name,
      defaultValue: props.defaultValue,
      rules: { required: !optional },
    })

    const { ref: rhfRef, ...rhfFieldProps } = field
    return (
      <InputFieldWrapper
        name={name}
        label={label}
        description={description}
        optional={optional}
        hideErrorMessage={hideErrorMessage}
        className={wrapperClassName}
      >
        <RangeRoot onValueChange={field.onChange} {...rhfFieldProps} {...props}>
          <SliderTrack
            className={cn(fieldError && 'bg-red-800/20 dark:bg-red-700/20')}
          >
            <RangeSlider className={cn(fieldError && 'bg-red-700')} />
          </SliderTrack>
          <SliderThumb
            // Need to do this to allow RHF to focus the error input.
            ref={(el) => {
              rhfRef(el)
              if (ref) {
                // Handling external ref if provided
                if (typeof ref === 'function') {
                  ref(el)
                } else {
                  ref.current = el
                }
              }
            }}
            className={cn(fieldError && 'bg-red-700')}
          />
        </RangeRoot>
      </InputFieldWrapper>
    )
  }
)

interface IRangeRootProps
  extends React.ComponentPropsWithoutRef<typeof RangePrimitive.Root> {}

/**
 * Contains all the parts of a Range. It will render an input for each thumb when used within a form to ensure events propagate correctly.
 */
const RangeRoot = React.forwardRef<HTMLSpanElement, IRangeRootProps>(
  ({ className, ...props }, ref) => (
    <RangePrimitive.Root
      ref={ref}
      className={cn(
        'relative flex h-5 w-full touch-none select-none items-center',
        className
      )}
      {...props}
    />
  )
)

interface ISliderTrackProps
  extends React.ComponentPropsWithoutRef<typeof RangePrimitive.Track> {}

/**
 * The track that contains the `RangeSlider`.
 */
const SliderTrack = ({ className, ...props }: ISliderTrackProps) => (
  <RangePrimitive.Track
    className={cn(
      'relative h-1 flex-grow rounded-full bg-dark/20 dark:bg-light/20 ',
      className
    )}
    {...props}
  />
)

interface IRangeSliderProps
  extends React.ComponentPropsWithoutRef<typeof RangePrimitive.Range> {}

/**
 * The range part. Must live inside `SliderTrack`
 */
const RangeSlider = ({ className, ...props }: IRangeSliderProps) => (
  <RangePrimitive.Range
    className={cn('absolute h-full rounded-full bg-primary-700', className)}
    {...props}
  />
)

interface ISliderThumbProps
  extends React.ComponentPropsWithoutRef<typeof RangePrimitive.Thumb> {}

/**
 * A draggable thumb. You can render multiple thumbs.
 */
const SliderThumb = React.forwardRef<HTMLSpanElement, ISliderThumbProps>(
  ({ className, ...props }, ref) => {
    return (
      <RangePrimitive.Thumb
        ref={ref}
        className={cn(
          'focus-ring block h-5 w-5 rounded-full bg-primary-700 ring-2 ring-light dark:ring-dark',
          className
        )}
        {...props}
      />
    )
  }
)

export default RangeField
export { RangeRoot, SliderTrack, RangeSlider, SliderThumb }
