window.C=(m,p)=>new Promise(r=>BX.rest.callMethod(m,p||{},res=>r(res.error()?{err:String(res.error())}:res.data())));
window._cj={log:[],status:'run'};
(async()=>{const L=s=>_cj.log.push(s);try{
const b64=async u=>{const bl=await (await fetch(u+'?v='+Date.now())).blob();return await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result.split(',')[1]);fr.readAsDataURL(bl);});};
let ex=(await C('catalog.section.list',{select:['id','name'],filter:{iblockId:25,name:'Вьетнамские напитки'}})).sections||[];
const SEC=ex.length?ex[0].id:(await C('catalog.section.add',{fields:{iblockId:25,name:'Вьетнамские напитки',code:'vietnamese-drinks',iblockSectionId:3,sort:250}})).section.id;
L('sec '+SEC);
const have=await C('crm.product.list',{filter:{CODE:'sok-kok-o-may'},select:['ID']});
if(!have.length){const d=await b64('https://raw.githubusercontent.com/quynhanhihi/phinly-assets/main/menu/d13_coc.jpg');
 const r=await C('crm.product.add',{fields:{NAME:'Сок кок с о-май',CODE:'sok-kok-o-may',SECTION_ID:SEC,ACTIVE:'Y',CURRENCY_ID:'RUB',PRICE:350,SORT:1050,DESCRIPTION:'Nuoc coc o mai - свежевыжатый сок плода кок (амбареллы) со льдом и вьетнамской солёно-сладкой сливой о-май. Кислый, сладкий и чуть солёный - самый освежающий напиток Сайгона. 400 мл.',DESCRIPTION_TYPE:'text',PREVIEW_PICTURE:{fileData:['d13_coc.jpg',d]},DETAIL_PICTURE:{fileData:['d13_coc.jpg',d]}}});
 L('add '+(r.err||r));} else L('exists');
await C('landing.block.updatenodes',{lid:1,block:7,data:{'.landing-block-node-text@0':'Фирменные напитки, вьетнамский кофе, вьетнамские напитки, классика и кофе домой'}});
const p=await C('landing.site.publication',{id:3});L('pub '+p);
_cj.status='done';}catch(e){_cj.status='err '+e;}})();
'started';
