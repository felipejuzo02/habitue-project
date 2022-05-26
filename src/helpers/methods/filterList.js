export default function (originalList, languageQuantity) {
  return originalList.filter(item => {
    if (languageQuantity === 0) return item
    else if (languageQuantity === 1) return item.languages.length === 1
    else return item.languages.length >= 2
  })
}
