interface Props {
  type: 'button' | 'submit'
  name: string
  handleClick?: () => void
  width?: number
  height?: number
}
const Button = ({ type, name, handleClick }: Props) => {
  return (
    <button
      className="bg-blue-500 w-18 hover:bg-blue-700 text-white font-bold py-[10px] px-[70px] rounded-2xl focus:outline-none"
      type={type}
      onClick={handleClick}
    >
      {name}
    </button>
  )
}

export default Button
