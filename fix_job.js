window.C=(m,p)=>new Promise(r=>BX.rest.callMethod(m,p||{},res=>r(res.error()?{err:String(res.error())}:res.data())));
window._fj={log:[],status:'run'};
(async()=>{const L=s=>_fj.log.push(s);try{
const RAW='https://raw.githubusercontent.com/quynhanhihi/phinly-assets/main/menu/';
const b64=async u=>{const bl=await (await fetch(u+'?'+Date.now())).blob();return await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result.split(',')[1]);fr.readAsDataURL(bl);});};
const map=[[105,'d01_coconut_coffee.jpg'],[107,'d02_coconut_matcha.jpg'],[109,'d03_coconut_cocoa.jpg'],[111,'d12_raf.jpg'],[113,'d04_phin_black.jpg'],[115,'d05_phin_milk.jpg'],[117,'d06_saigon.jpg'],[119,'d07_bacxiu.jpg'],[121,'d08_salt.jpg'],[123,'d09_egg.jpg'],[125,'d10_americano.jpg'],[127,'d11_matcha_latte.jpg']];
for(const [id,f] of map){const d=await b64(RAW+f);const r=await C('crm.product.update',{id,fields:{PREVIEW_PICTURE:{fileData:[f,d]},DETAIL_PICTURE:{fileData:[f,d]}}});L(id+(r.err?' E '+r.err:''));}
// headings: upright, uppercase, letter-spaced like the reference menu
const b=await C('landing.block.getlist',{lid:1,params:{edit_mode:1,get_content:true}});
for(const id of [3,7,11,19]){const x=b.find(q=>q.id==id); if(!x) continue;
 const d=new DOMParser().parseFromString(x.content,'text/html'); const w=d.body.firstElementChild;
 w.querySelectorAll('.landing-block-node-title, h1, h2').forEach(t=>{t.className=t.className.replace(/\bfont-italic\b|\bg-font-style-italic\b|\bg-font-italic\b/g,'').replace(/\bg-letter-spacing[-\w]*/g,'')+' text-uppercase g-letter-spacing-3';});
 const html=(w.classList.contains('block-wrapper')?w.innerHTML:w.outerHTML);
 const r=await C('landing.block.updatecontent',{lid:1,block:id,content:html});L('h'+id+' '+(r.err||r));}
const p=await C('landing.site.publication',{id:3});L('pub '+p);
_fj.status='done';}catch(e){_fj.status='err '+e;}})();
'started';
