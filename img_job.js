window.C=(m,p)=>new Promise(r=>BX.rest.callMethod(m,p||{},res=>r(res.error()?{err:String(res.error())}:res.data())));
window._ij={log:[],status:'run'};
(async()=>{const L=s=>_ij.log.push(s);try{
const RAW='https://raw.githubusercontent.com/quynhanhihi/phinly-assets/main/real/';
const b64=async u=>{const bl=await (await fetch(u)).blob();return await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result.split(',')[1]);fr.readAsDataURL(bl);});};
const map=[[53,'01_robusta.jpg'],[55,'02_arabica.jpg'],[57,'03_saigon.jpg'],[59,'04_beans.jpg'],[61,'05_3in1.jpg'],[63,'09_coconut.jpg'],[65,'06_phin_alu.jpg'],[67,'07_phin_steel.jpg'],[69,'08_milk.jpg'],[71,'10_salt.jpg'],[73,'11_set_first.jpg'],[75,'12_set_hanoi.jpg']];
for(const [id,f] of map){const d=await b64(RAW+f);const r=await C('catalog.product.update',{id,fields:{iblockId:25,previewPicture:{fileData:[f,d]},detailPicture:{fileData:[f,d]}}});L(id+(r.err?' ERR '+r.err:' ok'));}
for(const [blk,f,sel] of [[1,'hero.jpg','.landing-block-node-card-img@0'],[13,'brew.jpg','.landing-block-node-img@0']]){
 const u=await C('landing.block.uploadfile',{block:blk,picture:RAW+f});
 const data={};data[sel]={src:u.src,id:u.id,alt:'PHINLY'};
 const r=await C('landing.block.updatenodes',{lid:1,block:blk,data});L('blk '+blk+' '+(u.err||'')+' '+(r.err||r));}
const p=await C('landing.site.publication',{id:3});L('pub '+JSON.stringify(p));
_ij.status='done';}catch(e){_ij.status='err '+e;}})();
'started';
