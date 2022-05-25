export default function (originalList, languageQuantity = 0) {
  return originalList.filter(item => {
    return item.languages.length >= parseInt(languageQuantity)
  })
}
