import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';
const source = await readFile(new URL('../app/api/leads/route.ts', import.meta.url), 'utf8');
const firebase = 'data:text/javascript,' + encodeURIComponent('export function getLeadsDataConnect() { return {executeMutation: (...args) => globalThis.__contactMutation(...args)} }');
const compiled = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText
 .replace('"next/server"', JSON.stringify(new URL('../node_modules/next/server.js', import.meta.url).href))
 .replace('"@/app/lib/firebaseDataConnect"',JSON.stringify(firebase))
 .replace('"@/app/lib/leadAttribution"',JSON.stringify(new URL('../app/lib/leadAttribution.ts',import.meta.url).href))
 .replace('"@/app/lib/leadContact"',JSON.stringify(new URL('../app/lib/leadContact.ts',import.meta.url).href));
const {POST} = await import('data:text/javascript,'+encodeURIComponent(compiled));
const base = {sourcePage:'SEO local',sourcePath:'/seo/local',formType:'Auditoría gratuita',name:'Ana',company:'Negocio',interestedService:'SEO local'};
async function send(payload) {return POST(new Request('https://example.com/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...base,...payload})}));}
test('API rejects invalid new contact even when legacy contact is present before storage', async (t) => {
 const stored=[];globalThis.__contactMutation=(...args)=>stored.push(args);t.after(()=>delete globalThis.__contactMutation);
 for(const payload of [{phone:'',email:''},{phone:'abc604990651',email:''},{phone:'60499'},{phone:'604990651',email:'bad'},{email:'ana@example.com'},{phone:null},{phone:'604990651',email:123}]) assert.equal((await send({...payload,contact:'legacy@example.com'})).status,400);
 assert.equal(stored.length,0);
});
test('API persists normalized mobile, optional email and unchanged origin through existing mutation', async(t)=>{
 const stored=[];globalThis.__contactMutation=(...args)=>stored.push(args);t.after(()=>delete globalThis.__contactMutation);
 for(const payload of [{phone:'604 990 651',email:''},{phone:'+34 (604) 990-651',email:' ana@example.com '},{contact:'legacy@example.com'}]) assert.equal((await send(payload)).status,200);
 assert.deepEqual(stored.map(([operation,payload])=>({operation,contact:payload.contact,sourcePage:payload.sourcePage,sourcePath:payload.sourcePath,formType:payload.formType,interestedService:payload.interestedService})),['Móvil: +34604990651','Móvil: +34604990651 | Email: ana@example.com','legacy@example.com'].map(contact=>({operation:'CreateLead',contact,sourcePage:'SEO local',sourcePath:'/seo/local',formType:'Auditoría gratuita',interestedService:'SEO local'})));
});
