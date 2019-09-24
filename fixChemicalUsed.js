const libxmljs = require('libxmljs2')
const fs = require('fs')
const util = require('util')

const inDataDir = '/Users/erikd/nanomine-stuff/sebastian-experimental/'
const outDataDir = '/Users/erikd/nanomine-stuff/sebastian-experimental/updated/'

let files = fs.readdirSync(inDataDir).filter(nm => nm.match(/.*[Xx][Mm][Ll]/))

const xsdIn = './data/' + 'PNC_schema_081218.xsd'
let xsdInFile = fs.readFileSync(xsdIn, 'utf8')
let xsdDoc = libxmljs.parseXmlString(xsdInFile)

function dump(obj) {
  return util.inspect(obj, {'depth': 5, 'showHidden': true})
}

// console.log('files: ' + files)
// console.log('count: ' + files.length)
files.forEach((v, idx) => {

  let xmlIn = inDataDir + v

  console.log('Processing: ' + xmlIn)

  let xmlInFile = fs.readFileSync(xmlIn, 'utf8')


  let xmlDoc = libxmljs.parseXmlString(xmlInFile)

  let chemUsed = xmlDoc.find('//ChemicalUsed')
  if (chemUsed) {
    chemUsed.forEach((v, idx) => {
      let child = v.child(0)
      if (child.name() === 'description') {
        console.log('This one is OK' + v.toString())
      } else {
        console.log('need to fix up')
        let theText = v.text().trim().replace(/ {2}/g,'')
        v.text('')
        child = v.node('description', null)
        child.text(theText)
        console.log(v.toString())
      }
    })
  }

  // let docValid = xmlDoc.validate(xsdDoc)
  // console.log('Document valid: ' + docValid)
  // if (docValid === false) {
  //   console.log(dump(xmlDoc.validationErrors))
  // } else {
  //   console.log('Doc is valid.')
  //   if (Array.isArray(xmlDoc.validationErrors)) {
  //     console.log('   validationErrors.length is: ' + xmlDoc.validationErrors.length)
  //   } else {
  //     console.log('   validationErrors is: ' + xmlDoc.validationErrors)
  //   }
  // }
})
// console.log('newDoc type: ' + dump(newDoc))

