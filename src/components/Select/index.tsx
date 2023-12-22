interface SelectOption {
  id: number
  name: string
  slug: string
}

interface SelectProps {
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: SelectOption[]
  placeholder: string
  errors?: string
}

const Select = ({
  id,
  value,
  onChange,
  options,
  placeholder,
  errors,
}: SelectProps) => {
  return (
    <div>
      <select
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        id={id}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.slug}>
            {option.name}
          </option>
        ))}
      </select>
      {errors && <p className="text-red-500 text-xs italic">{errors}</p>}
    </div>
  )
}

export default Select
