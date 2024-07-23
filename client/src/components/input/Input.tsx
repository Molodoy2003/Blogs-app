import { Input as NextInput } from '@nextui-org/react'
import { FC } from 'react'
import { Control, useController } from 'react-hook-form'

type Props = {
  name: string
  label: string
  placeholder?: string
  type?: string
  control: Control<any>
  required?: string
  endContent?: JSX.Element
}

const Input: FC<Props> = ({
  name,
  label,
  placeholder,
  type,
  control,
  required = '',
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({ name, control, rules: { required } })

  return (
    <NextInput
      label={label}
      type={type}
      placeholder={placeholder}
      value={field.value}
      name={field.name}
      onBlur={field.onBlur}
      onChange={field.onChange}
      isInvalid={invalid}
      errorMessage={`${errors[name]?.message ?? ''}`}
    />
  )
}

export default Input
