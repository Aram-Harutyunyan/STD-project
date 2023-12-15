interface Props {
  title: string
  value: string
}
const TitleValue = ({ title, value }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="font-bold">{title}</div>
      <div>{value}</div>
    </div>
  )
}

export default TitleValue
