#!/usr/bin/env node
var fs=require('fs')
var verJson = fs.readFileSync('data/nanomine_template_versions.json',{'encoding':'utf8'})
var ver = JSON.parse(verJson)
//console.log(Object.keys(ver[0]))
ver.forEach(function(v,a,i){
//  console.log('current: ' + v.current+' isDeleted: ' + v.isDeleted + ' id: '+v.id);
})

function isTemplateActive(tmplId) {
  var rv = false;
//  console.log('checking '+ tmplId);
  ver.forEach(function(v,a,i){
    if(v.current == tmplId && v.isDeleted == false) {
      rv = true;
    }
  })
  return rv;
}

var tmplJson = fs.readFileSync('data/nanomine_templates.json',{'encoding':'utf8'})
var tmpl = JSON.parse(tmplJson)
tmpl.forEach(function(v,a,i){
  //console.log(Object.keys(v));
  if(isTemplateActive(v.id)) {
    console.log(v.title+' '+v.filename+' '+v.id);
    fs.writeFileSync('data/'+v.filename,v.content);
  }
})

