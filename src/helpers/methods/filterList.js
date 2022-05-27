export default function (originalList, languageQuantity, languages) {
  let filteredLisByLanguageQuantity = originalList.filter(item => {
    if (languageQuantity === 2) return item.languages.length >= 2
    else if (languageQuantity === 1) return item.languages.length === 1
    else return item
  })

  let filteredList = []

  filteredLisByLanguageQuantity.filter(item => {
    if (!languages.length) return filteredList.push(item)

    return item.languages.find(el => {
      for (let i = 0; i < languages.length; i++) {
        if (el.code === languages[i]) return filteredList.push(item)
      }
    })
  })

  return filteredList
}
