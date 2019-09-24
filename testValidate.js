const libxmljs = require('libxmljs2')
const fs = require('fs')
const util = require('util')

const dataDir = './data/5b71eb00e74a1d7c81bec6c7/'

const xmlIn = dataDir + 'L101_S2_Dang_2007.xml'
const xsdIn = './data/' + 'PNC_schema_081218.xsd'

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
}

// console.log('newDoc type: ' + dump(newDoc))

