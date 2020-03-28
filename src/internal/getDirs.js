'use strict'

const fs = require('fs')
const path = require('path')

module.exports = function getDirs (root, dir, exclude) {
  const dirs = []
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const absolutePath = path.join(dir, file)
    const relativePath = path.relative(root, absolutePath)
    const stat = fs.statSync(absolutePath)

    /* istanbul ignore else */
    if (stat.isDirectory()) {
      if (exclude.includes(file)) {
        return
      }

      dirs.push(relativePath)
    }
  })

  return dirs
}
