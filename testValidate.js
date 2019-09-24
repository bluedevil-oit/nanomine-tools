const libxmljs = require('libxmljs2')
const fs = require('fs')
const util = require('util')

const dataDir = './data/5b71eb00e74a1d7c81bec6c7/'


let xmlIn = dataDir + 'L101_S2_Dang_2007.xml'
const xsdIn = './data/' + 'PNC_schema_081218.xsd'

if (process.argv.length > 1) {
  xmlIn = process.argv[2]
}
console.log('Processing: ' + xmlIn)
let xmlInFile = fs.readFileSync(xmlIn, 'utf8')
let xsdInFile = fs.readFileSync(xsdIn, 'utf8')

function dump(obj) {
  return util.inspect(obj, {'depth': 5, 'showHidden': true})
}

let xmlDoc = libxmljs.parseXmlString(xmlInFile)
let xsdDoc = libxmljs.parseXmlString(xsdInFile)
let docValid = xmlDoc.validate(xsdDoc)
console.log('Document valid: ' + docValid)
if (docValid === false) {
  console.log(dump(xmlDoc.validationErrors))
} else {
  console.log('Doc is valid.')
  if (Array.isArray(xmlDoc.validationErrors)) {
    console.log('   validationErrors.length is: ' + xmlDoc.validationErrors.length)
  } else {
    console.log('   validationErrors is: ' + xmlDoc.validationErrors)
  }
}

// console.log('newDoc type: ' + dump(newDoc))

