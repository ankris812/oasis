const fs = require('fs')
const path = require('path')

const main = () => {
  const dirPath = path.join(__dirname, 'src')
  const fileNames = fs.readdirSync(dirPath)

  const themeNames = fileNames.map((fileName) => {
    const withoutPrefix = fileName.replace('base16-', '')
    const withoutSuffix = withoutPrefix.replace('.css', '')
    return withoutSuffix
  })

  return { fileNames, themeNames }
}

module.exports = main()
