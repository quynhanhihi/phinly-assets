window.C=(m,p)=>new Promise(r=>BX.rest.callMethod(m,p||{},res=>r(res.error()?{err:String(res.error())}:res.data())));
window._fj3={log:[],status:'run'};
(async()=>{const L=s=>_fj3.log.push(s);try{
const RAW='https://raw.githubusercontent.com/quynhanhihi/phinly-assets/main/';
const b64=async u=>{const bl=await (await fetch(u+'?v='+Date.now())).blob();return await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result.split(',')[1]);fr.readAsDataURL(bl);});};
const map=[[113,'menu/d05_phin_milk.jpg'],[115,'menu/d04_phin_black.jpg'],[127,'menu/d11_matcha_latte.jpg'],[111,'menu/d12_raf.jpg'],[117,'menu/d06_saigon.jpg'],[129,'real/01_robusta.jpg'],[131,'real/02_arabica.jpg'],[133,'real/03_saigon.jpg'],[135,'real/04_beans.jpg']];
for(const [id,f] of map){const d=await b64(RAW+f);const n=f.split('/')[1];const r=await C('crm.product.update',{id,fields:{PREVIEW_PICTURE:{fileData:[n,d]},DETAIL_PICTURE:{fileData:[n,d]}}});L(id+(r.err?' E '+r.err:''));}
const p=await C('landing.site.publication',{id:3});L('pub '+p);
_fj3.status='done';}catch(e){_fj3.status='err '+e;}})();
'started';
