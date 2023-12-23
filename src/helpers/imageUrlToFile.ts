const imageUrlToFile = async (
  imageUrl: string,
  fileName: string,
): Promise<File | null> => {
  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const file = new File([blob], `${fileName}.jpg`, { type: blob.type })
    return file
  } catch (error) {
    console.error('Error converting image URL to File:', error)
    return null
  }
}
export default imageUrlToFile
