#!/usr/bin/env node 

var fs=require('fs');

var xmlJson=fs.readFileSync('data/nanomine_xml.json',{'encoding':'utf8'})

var pna=JSON.parse(xmlJson);


pna.forEach(
  function(v,i,a){
    fs.writeFileSync('data/'+v.schema+'-'+v.title,v.content);
    if(v.schema=='5abe807ce74a1d06fd9943a0'){
      console.log(i,v.title+' schema id: '+v.schema+' rec id:'+v._id);
      let idx = 0;
      let ct = 0;
      while(idx != -1){
        idx = v.content.indexOf('Loss tangent',idx)
        if(idx != -1) {
          ++ct; 
          console.log('\t ' + ct + ' found "Loss tangent" at: ' + idx)
          ++idx;
        }
      }
    }
  }
)
