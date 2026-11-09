window.C=(m,p)=>new Promise(r=>BX.rest.callMethod(m,p||{},res=>r(res.error()?{err:String(res.error())}:res.data())));
window._n4={log:[],status:'run'};
(async()=>{const L=s=>_n4.log.push(s);try{
const RAW='https://raw.githubusercontent.com/quynhanhihi/phinly-assets/main/menu/';
const b64=async u=>{const bl=await (await fetch(u+'?v='+Date.now())).blob();return await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result.split(',')[1]);fr.readAsDataURL(bl);});};
let vd=(await C('catalog.section.list',{select:['id','name'],filter:{iblockId:25,name:'Вьетнамские напитки'}})).sections||[];
const VD=vd.length?vd[0].id:19;
const P=[
['d14_com.jpg','Кокосовый шейк с комом',5,420,'kokosovyy-sheyk-s-komom','Взбитые ледяные кокосовые сливки с комом - хрустящими хлопьями молодого зелёного риса, осенним деликатесом Ханоя. Сливочный, сладкий и с лёгким ароматом риса. 400 мл.',1150],
['d15_shan.jpg','Чай с апельсином и манго',VD,390,'chay-s-apelsinom-i-mango','Вьетнамский горный чай шан туйет с соком апельсина и спелого манго, со льдом и долькой апельсина. 450 мл.',1040],
['d16_sau.jpg','Содовая с сау',VD,350,'sodovaya-s-sau','Ханойский фрукт сау в сладком сиропе, газированная вода и лайм. Перемешайте - получится кисло-сладкая освежающая содовая. 400 мл.',1030],
['d17_tac.jpg','Лимонад с кумкватом и о-май',VD,350,'limonad-s-kumkvatom-i-o-may','Сайгонский tac xi muoi: сок кумквата, солёная слива о-май, немного мёда и лёд. Кислый, сладкий и чуть солёный. 450 мл.',1020]];
for(const [img,name,sec,price,code,txt,sort] of P){
 const ex=await C('crm.product.list',{filter:{CODE:code},select:['ID']});
 const d=await b64(RAW+img);
 const fields={NAME:name,CODE:code,SECTION_ID:sec,ACTIVE:'Y',CURRENCY_ID:'RUB',PRICE:price,SORT:sort,DESCRIPTION:txt,DESCRIPTION_TYPE:'text',PREVIEW_PICTURE:{fileData:[img,d]},DETAIL_PICTURE:{fileData:[img,d]}};
 const r=ex.length?await C('crm.product.update',{id:ex[0].ID,fields}):await C('crm.product.add',{fields});
 L(code+' '+(r.err||r));}
const p=await C('landing.site.publication',{id:3});L('pub '+p);
_n4.status='done';}catch(e){_n4.status='err '+e;}})();
'started';
