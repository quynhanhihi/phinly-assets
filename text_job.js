window.C=(m,p)=>new Promise(r=>BX.rest.callMethod(m,p||{},res=>r(res.error()?{err:String(res.error())}:res.data())));
window._tj={log:[],status:'run'};
(async()=>{const L=s=>_tj.log.push(s);try{
const b=await C('landing.block.getlist',{lid:1,params:{edit_mode:1,get_content:true}});
for(const id of [7,11,19]){const x=b.find(q=>q.id==id); if(!x) continue;
 const d=new DOMParser().parseFromString(x.content,'text/html'); const w=d.body.firstElementChild;
 w.querySelectorAll('.landing-block-node-text').forEach(t=>{
  t.className=t.className.replace(/\bg-color-[\w-]+/g,'').replace(/\bg-font-size-[\w-]+/g,'').replace(/\bg-opacity-[\w-]+/g,'').replace(/\s+/g,' ').trim()+' g-color-white g-font-size-20 g-line-height-1_6';
  t.style.color='#ffffff'; t.style.opacity='1';});
 const html=(w.classList.contains('block-wrapper')?w.innerHTML:w.outerHTML);
 const r=await C('landing.block.updatecontent',{lid:1,block:id,content:html}); L(id+' '+(r.err||r));}
const p=await C('landing.site.publication',{id:3});L('pub '+p);
_tj.status='done';}catch(e){_tj.status='err '+e;}})();
'started';
