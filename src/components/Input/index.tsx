interface Props {
  id: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors?: string
}
const Input = ({ id, type, placeholder, value, onChange, errors }: Props) => {
  return (
    <div>
      <input
        className={`border  rounded-2xl w-[340px] h-11 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors ? 'border-red-500' : 'border-br--Input'
        }`}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errors && <p className="text-red-500 text-xs italic">{errors}</p>}
    </div>
  )
}

export default Input
