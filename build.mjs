import {readFile,mkdir,writeFile,copyFile,rm} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
const output=resolve('public');
const files=JSON.parse(await readFile('astramora-source.json','utf8'));
await rm(output,{recursive:true,force:true});await mkdir(output,{recursive:true});
await copyFile('index.html',resolve(output,'index.html'));
for(const [path,content] of Object.entries(files)){
 if(!path.startsWith('astramora/')||path.split('/').some(x=>x==='..'||x==='.')||typeof content!=='string')throw Error('Invalid source path');
 const target=resolve(output,path);if(!target.startsWith(output+'/'))throw Error('Invalid target');
 await mkdir(dirname(target),{recursive:true});await writeFile(target,content);
}
console.log('MaisonWRLD + ASTRAMORA : '+Object.keys(files).length+' fichiers préparés.');
