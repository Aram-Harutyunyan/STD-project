interface Props {
  id: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  errors?: string
}

const TextArea = ({ id, placeholder, value, onChange, errors }: Props) => {
  return (
    <div>
      <textarea
        className="mt-1 p-2 min-h-[120px] block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errors && <p className="text-red-500 text-xs italic">{errors}</p>}
    </div>
  )
}

export default TextArea
