window.C=(m,p)=>new Promise(r=>BX.rest.callMethod(m,p||{},res=>r(res.error()?{err:String(res.error())}:res.data())));
window._mj={log:[],status:'run'};
(async()=>{const L=s=>_mj.log.push(s);try{
const RAW='https://raw.githubusercontent.com/quynhanhihi/phinly-assets/main/';
const b64=async u=>{const bl=await (await fetch(u)).blob();return await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result.split(',')[1]);fr.readAsDataURL(bl);});};
// sections
await C('catalog.section.update',{id:3,fields:{iblockId:25,name:'Меню PHINLY',description:''}});
await C('catalog.section.update',{id:5,fields:{iblockId:25,name:'Фирменные напитки',code:'signature',sort:100}});
await C('catalog.section.update',{id:11,fields:{iblockId:25,name:'Вьетнамский кофе',code:'vietnamese-coffee',sort:200}});
await C('catalog.section.update',{id:13,fields:{iblockId:25,name:'Классика',code:'classic',sort:300}});
let home=(await C('catalog.section.list',{select:['id','name'],filter:{iblockId:25,name:'Кофе домой'}})).sections||[];
let HOME=home.length?home[0].id:(await C('catalog.section.add',{fields:{iblockId:25,name:'Кофе домой',code:'coffee-home',iblockSectionId:3,sort:400}})).section.id;
L('home '+HOME);
// remove previous products
const old=(await C('crm.product.list',{filter:{CATALOG_ID:25},select:['ID']}))||[];
for(const p of old){const r=await C('crm.product.delete',{id:p.ID});if(r.err)L('del '+p.ID+' '+r.err);}
L('deleted '+old.length);
const P=[
['menu/d01_coconut_coffee.jpg','Кокосовый кофе',5,420,'kokosovyy-kofe','Вьетнамская робуста и взбитые ледяные кокосовые сливки. Хит Ханоя: сладкий, сливочный и бодрящий. 350 мл.'],
['menu/d02_coconut_matcha.jpg','Кокосовый матча',5,450,'kokosovyy-matcha','Японский матча с кокосовым молоком и льдом. Мягкий травяной вкус без горечи. 350 мл.'],
['menu/d03_coconut_cocoa.jpg','Кокосовый какао',5,450,'kokosovyy-kakao','Густое какао с кокосовыми сливками и шапкой из шоколадной крошки. Без кофеина. 350 мл.'],
['menu/d12_raf.jpg','Раф по-вьетнамски',5,420,'raf-po-vetnamski','Эспрессо из робусты, сливки и сгущённое молоко, взбитые в нежную пену. 300 мл.'],
['menu/d04_phin_black.jpg','Фин чёрный',11,290,'fin-chernyy','Классический вьетнамский кофе, заваренный в стальном фине. Крепкий, с нотами тёмного шоколада. Подаём со стаканом льда.'],
['menu/d05_phin_milk.jpg','Фин со сгущёнкой',11,330,'fin-so-sgushchenkoy','Кофе из фина, который капает прямо на сгущённое молоко. Перемешайте и добавьте лёд - получится ca phe sua da.'],
['menu/d06_saigon.jpg','Кофе со льдом по-сайгонски',11,350,'kofe-po-saygonski','Ca phe sua da: крепкий фин, сгущёнка и много льда. Самый популярный кофе на улицах Хошимина. 400 мл.'],
['menu/d07_bacxiu.jpg','Бак сиу',11,350,'bak-siu','Bac xiu - сайгонский кофе, где молока больше, чем кофе. Мягкий и сладкий, для тех, кто любит латте. 400 мл.'],
['menu/d08_salt.jpg','Солёный кофе',11,390,'solenyy-kofe','Ca phe muoi из Хюэ: чёрный кофе под шапкой из солёных сливок. Солоноватая пена раскрывает сладость кофе. 350 мл.'],
['menu/d09_egg.jpg','Яичный кофе',11,430,'yaichnyy-kofe','Ca phe trung по ханойскому рецепту 1946 года: горячий кофе под воздушным кремом из желтка и сгущёнки.'],
['menu/d10_americano.jpg','Вина-американо',13,250,'vina-amerikano','Американо на вьетнамской робусте. Плотнее и крепче привычного американо. 300 мл, горячий или со льдом.'],
['menu/d11_matcha_latte.jpg','Матча латте',13,390,'matcha-latte','Матча, молоко и лёд. Можно заменить молоко на кокосовое или овсяное. 350 мл.'],
['real/01_robusta.jpg','Робуста Буонметхуот, молотый, 250 г',HOME,690,'robusta-buonmethuot','Робуста из Буонметхуота, которую мы используем в кофейне. Молотая под фин. Ноты тёмного шоколада.'],
['real/02_arabica.jpg','Арабика Далат, молотый, 250 г',HOME,890,'arabica-dalat','Мягкая арабика с плантаций Далата. Ноты карамели и ореха. Подходит для фина и френч-пресса.'],
['real/03_saigon.jpg','Купаж «Сайгон», 500 г',HOME,1290,'kupazh-saigon','Смесь робусты и арабики, как в уличных кофейнях Хошимина. Молотый, для фина и турки.'],
['real/04_beans.jpg','Кофе в зёрнах «Тэй Нгуен», 1 кг',HOME,2190,'kofe-v-zernakh-tay-nguyen','Зерновой кофе средней обжарки с Центрального нагорья Вьетнама. Для кофемашин и турки.']];
let sort=2000;
for(const [img,name,sec,price,code,txt] of P){const d=await b64(RAW+img);const f=img.split('/')[1];
 const r=await C('crm.product.add',{fields:{NAME:name,CODE:code,SECTION_ID:sec,ACTIVE:'Y',CURRENCY_ID:'RUB',PRICE:price,SORT:(sort-=100),DESCRIPTION:txt,DESCRIPTION_TYPE:'text',PREVIEW_PICTURE:{fileData:[f,d]},DETAIL_PICTURE:{fileData:[f,d]}}});
 L((r.err?'E '+r.err:r)+' '+code);}
_mj.status='products';
// page texts
const nodes=async(block,data)=>{const r=await C('landing.block.updatenodes',{lid:1,block,data});L('n'+block+' '+(r.err||r));};
await nodes(27,{'.landing-block-node-menu-list-item-link@0':{text:'Меню',href:'#b9',target:'_self'}});
await nodes(1,{'.landing-block-node-card-title@0':'Кокосовый кофе, фин со сгущёнкой и солёный кофе по вьетнамским рецептам. Привезём за 60 минут по Москве','.landing-block-node-card-button@0':{text:'Смотреть меню',href:'#b9',target:'_self'}});
await nodes(3,{'.landing-block-node-text@0':'PHINLY - вьетнамская кофейня с доставкой по Москве, основанная студентами из Вьетнама. Мы варим кофе из робусты Буонметхуота по рецептам Ханоя и Сайгона: в фине, со сгущёнкой, с кокосовыми сливками и солёной пенкой. А ещё продаём наш кофе домой.'});
await nodes(5,{'.landing-block-node-card-title@2':'Доставка за 60 минут','.landing-block-node-card-text@2':'Привозим напитки в термопакете по Москве в пределах МКАД. Бесплатно при заказе от 1 500 ₽.','.landing-block-node-card-title@0':'Вьетнамская робуста','.landing-block-node-card-text@0':'Варим только на кофе с ферм Буонметхуота и Далата.','.landing-block-node-card-title@1':'Рецепты из Вьетнама','.landing-block-node-card-text@1':'Кокосовый, солёный и яичный кофе - как в кофейнях Ханоя и Хюэ.'});
await nodes(7,{'.landing-block-node-title@0':'Меню','.landing-block-node-text@0':'Фирменные напитки, вьетнамский кофе, классика и кофе домой'});
_mj.status='done';}catch(e){_mj.status='err '+e;}})();
'started';
