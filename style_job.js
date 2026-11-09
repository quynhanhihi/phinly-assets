window.C=(m,p)=>new Promise(r=>BX.rest.callMethod(m,p||{},res=>r(res.error()?{err:String(res.error())}:res.data())));
window._sj={log:[],status:'run'};
(async()=>{const L=s=>_sj.log.push(s);try{
const b=await C('landing.block.getlist',{lid:1,params:{edit_mode:1,get_content:true}});
const get=id=>b.find(x=>x.id==id);
const save=async(id,html)=>{const r=await C('landing.block.updatecontent',{lid:1,block:id,content:html});L(id+':'+(r.err||r));};
for(const id of [7,11,19,21]){let h=get(id).content.replace(/g-theme-business-bg-blue-dark-v1-opacity-0_9/g,'g-bg-primary');
 if(id==21) h=h.replace(/g-color-primary/g,'g-color-white').replace(/g-color-gray-dark-v5|g-color-gray-light-v1|g-color-gray-dark-v2/g,'g-color-white-opacity-0_8');
 await save(id,h);}
// form block: drop the demo contact cards (contacts live in the Контакты block)
const f=get(31); if(f){const d=new DOMParser().parseFromString(f.content,'text/html');
 d.querySelectorAll('.landing-block-card-contact').forEach(e=>e.remove());
 const wrap=d.body.firstElementChild; await save(31,wrap.outerHTML);}
const p=await C('landing.site.publication',{id:3});L('pub '+JSON.stringify(p));
_sj.status='done';}catch(e){_sj.status='err '+e;}})();
'started';
