const requireStyle = require('require-style')

try {
  requireStyle('./src/base16-monokai.css')
  console.log('✔ pass')
} catch (err) {
  console.log('✘ fail')
  throw err
}

try {
  const css = require('./')
  css.fileNames.length >= 100
  console.log('✔ pass')
} catch (err) {
  console.log('✘ fail')
  throw err
}

try {
  const css = require('./')
  css.themeNames.length >= 100
  console.log('✔ pass')
} catch (err) {
  console.log('✘ fail')
  throw err
}

try {
  const css = require('./')
  const same = css.themeNames.length === css.fileNames.length
  if (same === false) {
    throw new Error('themeNames and fileNames should be the same length')
  }
  console.log('✔ pass')
} catch (err) {
  console.log('✘ fail')
  throw err
}
