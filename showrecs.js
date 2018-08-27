#!/usr/bin/env node 

var stext = null;
if(process.argv.length > 2) {
  stext = process.argv[2]
  console.log('search text: ' + stext);
}

var fs=require('fs');

var xmlJson=fs.readFileSync('data/nanomine_xml.json',{'encoding':'utf8'})

var pna=JSON.parse(xmlJson);

//list out the xmls for a schema and optionally search for text within each xml
pna.forEach(
  function(v,i,a){
    try {
      fs.mkdirSync('data/'+v.schema);
    } catch(e) {
      //nothing. Probably already exists.
    }
    fs.writeFileSync('data/'+v.schema+'/'+v.title,v.content);
    if(v.schema=='5b71eb00e74a1d7c81bec6c7'){ //081218
    //if(v.schema=='5b5f3559e74a1d4cdbaef171'){ //072618
    //if(v.schema=='5b1ebeb9e74a1d61fc43654d'){ //060718
    //if(v.schema=='5abe807ce74a1d06fd9943a0'){ //033018
    //if(v.schema=='5904922ce74a1d36e1b78b7f'){ //042917
      console.log(''+i+' '+v.title+' schema id: '+v.schema+' rec id:'+v._id);
      let idx = 0;
      let ct = 0;
      while(stext != null && idx != -1){
        idx = v.content.indexOf(stext,idx)
        if(idx != -1) {
          ++ct; 
          console.log('** ** ** \t ' + ct + ' found ' + stext + ' at: ' + idx + '  -- ' + v.content.substring(idx-15,idx+stext.length+15))
          ++idx;
        }
      }
    }
  }
)
