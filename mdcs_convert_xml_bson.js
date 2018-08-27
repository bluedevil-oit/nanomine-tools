const mongo = require('mongodb').MongoClient
const objectId = require('mongodb').ObjectId

const dbName = 'mgi'

function convertXmlField(db, restData) {
   // use data record downloaded via rest(which converts bson to xml)
   //   and insert the xml into each record
   // NOTE: there should be only one record in the db with restData._id
   return new Promise((resolve, reject) => {
     db.collection('xmldata')
      .updateOne({'_id': objectId(restData._id)},
          {$set: {'xml_str': restData.content}}, function(err, result) {
        if(err) {
          reject(err)
        } else {
          if( result.result.n == 1 ) {
            //console.log('found ' + doc._id + ' = ' + restData._id)
            resolve(1)
          } else {
            resolve('doc is null')
          }
        }
      })
    })
}
function processDiskRecords(db, cb) {
  const fs = require('fs')
  const srecs = fs.readFileSync('data/nanomine_xml.json',{'encoding':'utf8'})
  const recs = JSON.parse(srecs)
  let p = []
  recs.forEach(function(v, idx){
    console.log('rec: ' + v._id + ' idx: ' + idx)
    p.push(convertXmlField(db, v))
  })
  Promise.all(p)
    .then(function(results){
      console.log('success! recs processed: ' + results.length) 
      cb()
    })
    .catch(function(err) {
      console.log('sorry, an error occurred: ' + err)
    })
}

mongo.connect(process.env['NM_MONGO_URI'], function (err, client) {
  if(err) {
    console.log('error opening db')
  } else {
    const db = client.db(dbName)
    processDiskRecords(db, function () {
      client.close()
    })
  }
})
