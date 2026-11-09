window.C=(m,p)=>new Promise(r=>BX.rest.callMethod(m,p||{},res=>r(res.error()?{err:String(res.error())}:res.data())));
window._ct={log:[],status:'run'};
(async()=>{const L=s=>_ct.log.push(s);try{
const b=await C('landing.block.getlist',{lid:1,params:{edit_mode:1,get_content:true}});
const x=b.find(q=>q.id==21); const d=new DOMParser().parseFromString(x.content,'text/html'); const w=d.body.firstElementChild;
w.querySelectorAll('.landing-block-node-linkcontact-title,.landing-block-node-contact-title').forEach(t=>{t.className=t.className.replace(/\bg-color-[\w-]+/g,'').replace(/\bg-font-size-[\w-]+/g,'')+' g-color-white-opacity-0_8 g-font-size-14';t.style.color='rgba(255,255,255,.8)';});
w.querySelectorAll('.landing-block-node-linkcontact-text,.landing-block-node-contact-text').forEach(t=>{t.className=t.className.replace(/\bg-color-[\w-]+/g,'').replace(/\bg-font-size-[\w-]+/g,'')+' g-color-white g-font-size-18 g-font-weight-700';t.style.color='#ffffff';});
w.querySelectorAll('.landing-block-node-linkcontact-link,.landing-block-node-contact').forEach(t=>{t.style.color='#ffffff';});
const html=(w.classList.contains('block-wrapper')?w.innerHTML:w.outerHTML);
L('21 '+JSON.stringify(await C('landing.block.updatecontent',{lid:1,block:21,content:html})));
L('pub '+(await C('landing.site.publication',{id:3})));
_ct.status='done';}catch(e){_ct.status='err '+e;}})();
'started';
