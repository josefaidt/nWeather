const path = require('path')
const fs = require('fs')

const _dirname = process.cwd()
const schemaPath = path.join(_dirname, 'src/schema.graphql')
const typeDefPath = path.join(_dirname, 'src/typeDefs.js')

const read = schemaFilePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(schemaFilePath, (err, data) => {
      if (err) reject(new Error(err))
      resolve(data.toString())
    })
  })
}

const write = schemaString => {
  const outputString = `module.exports = \`\n${schemaString}\`\n`
  return new Promise((resolve, reject) => {
    console.time('typeDef build')
    fs.writeFile(typeDefPath, outputString, err => {
      if (err) reject(new Error(err))
      resolve('typeDefs.js write completed successfully')
      console.timeEnd('typeDef build')
    })
  })
}

console.log('Building typeDefs...')
read(schemaPath)
  .then(write)
  .then(console.info)
  .catch(console.error)
