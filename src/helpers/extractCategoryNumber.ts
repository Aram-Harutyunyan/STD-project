export const extractCategoryNumber = (category: string) => {
  const match = category.match(/\d+/)
  if (match) {
    return match[0]
  }
  return '1'
}

export default extractCategoryNumber
