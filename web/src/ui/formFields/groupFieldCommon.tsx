import { cn } from 'src/lib/utils'

interface IGroupFieldOptionLabelProps {
  optionValue: string
  optionLabel: string
  optionDescription?: string
  hasError?: boolean
}

const GroupFieldOptionLabel = ({
  optionValue,
  optionLabel,
  optionDescription,
  hasError,
}: IGroupFieldOptionLabelProps) => (
  <div className="ml-3 text-sm leading-6">
    <label
      className={cn(
        hasError ? 'text-color-primary-error' : 'text-color-primary'
      )}
      htmlFor={optionValue}
    >
      {optionLabel}
      {optionDescription && (
        <p
          className={cn(
            hasError ? 'text-color-tertiary-error' : 'text-color-tertiary'
          )}
        >
          {optionDescription}
        </p>
      )}
    </label>
  </div>
)

export { GroupFieldOptionLabel }
