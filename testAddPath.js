const libxmljs = require('libxmljs2')
const fs = require('fs')
const util = require('util')

const dataDir = './data/5b71eb00e74a1d7c81bec6c7/'

const xmlIn = dataDir + 'L101_S2_Dang_2007.xml'

let xmlInFile = fs.readFileSync(xmlIn, 'utf8')

let path = '/PolymerNanocomposite/alpha/beta/gamma/zeta'
path = '/PolymerNanocomposite/DATA_SOURCE/LabGenerated/RelatedDOI'

function dump(obj) {
  return util.inspect(obj, {'depth': 5, 'showHidden': true})
}
function xmlEnsurePath(xmlDoc, path) {
  // ensure path exists and create nodes if necessary.
  // returns new document containing path
  let rv = null
  let nodes = path.replace(/^\/*/, '').split('/') // strip leading slashes and split by path separator
  let subPath = ''
  let goodSubnode = null
  let newDoc = null
  nodes.forEach(function (v, idx) {
    subPath += '/' + v
    let subNode = xmlDoc.find(subPath)
    if (subNode && subNode.length > 0) {
      // console.log('found subPath: ' + subPath)
      goodSubNode = subNode
    } else {
      // console.log('subPath: ' + subPath + ' NOT FOUND')
      if (goodSubNode && goodSubNode.length > 0) {
        // create new element node at subPath + nodes[idx]
        // console.log('goodSubNode: ' + dump(goodSubNode))
        // console.log('goodSubNode: ' + goodSubNode.toString())
        // console.log('goodSubNode[0]: ' + goodSubNode[0].toString())
        // console.log('goodSubNode.type(): ' + goodSubNode[0].type())
        let newNode = goodSubNode[0].node(v, null)
        // console.log('newNode: ' + newNode.toString())
        newDoc = newNode.doc()
        goodSubNode = newNode
      } else if (goodSubNode) {
        // console.log('goodSubNode is not null, but length <= 0')
        // console.log('goodSubNode.toString() = ' + goodSubNode.toString())
        // console.log('goodSubNode.type() = ' + goodSubNode.type())
        let newNode = goodSubNode.node(v, null)
        goodSubNode = newNode
        newDoc = newNode.doc()
        // console.log('added child: ' + newNode.toString())
        // console.log('new doc string: ' + newDoc.toString())

      } else {
        console.log('goodSubNode is null')
      }
    }
  })
  rv = newDoc
  return rv
}

let xmlDoc = libxmljs.parseXmlString(xmlInFile)
let newDoc = ensurePath(xmlDoc, path)
// console.log('newDoc type: ' + dump(newDoc))
let elem = newDoc.find(path)
elem[0].text('unpublished/FlibbertyJibbit')
console.log(newDoc.toString())
console.log(elem[0].text())