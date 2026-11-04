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

// RECMACHINE: editable sources, owned image archive and four archived video files.
const rec=JSON.parse(await readFile('recmachine-source.json','utf8'));
for(const [path,content]of Object.entries(rec.files)){
 if(!path.startsWith('recmachine/')||path.split('/').some(x=>x==='..'||x==='.')||typeof content!=='string')throw Error('Invalid RECMACHINE source');
 const target=resolve(output,path);if(!target.startsWith(output+'/'))throw Error('Invalid target');await mkdir(dirname(target),{recursive:true});await writeFile(target,content);
}
for(const [path,content]of Object.entries(rec.assets)){
 if(!path.startsWith('recmachine/assets/')||path.split('/').some(x=>x==='..'||x==='.')||typeof content!=='string')throw Error('Invalid RECMACHINE media');
 const target=resolve(output,path);if(!target.startsWith(output+'/'))throw Error('Invalid target');await mkdir(dirname(target),{recursive:true});await writeFile(target,Buffer.from(content,'base64'));
}
for(const name of ['si-tu-maimes','24x','performance','spacelab'])await copyFile('rec-'+name+'.mp4',resolve(output,'recmachine/assets/'+name+'.mp4'));
console.log('RECMACHINE : catalogue, images et vidéos archivées préparés.');

await copyFile("recmachine-monitor.zip",resolve(output,"recmachine/assets/recmachine-monitor.zip"));

// OANA: public civic environment, without fabricated projects or votes.
const oana=JSON.parse(await readFile('oana-source.json','utf8'));
for(const [path,content] of Object.entries(oana)){
 if(!path.startsWith('oana/')||path.split('/').some(x=>x==='..'||x==='.')||typeof content!=='string')throw Error('Invalid OANA path');
 const target=resolve(output,path);if(!target.startsWith(output+'/'))throw Error('Invalid OANA target');
 await mkdir(dirname(target),{recursive:true});await writeFile(target,content);
}
console.log('OANA : institution virtuelle et parcours de participation préparés.');
