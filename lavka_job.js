window.C=(m,p)=>new Promise(r=>BX.rest.callMethod(m,p||{},res=>r(res.error()?{err:String(res.error())}:res.data())));
window._lv={log:[],status:'run'};
(async()=>{const L=s=>_lv.log.push(s);try{
const RAW='https://raw.githubusercontent.com/quynhanhihi/phinly-assets/main/shop/';
const b64=async u=>{const bl=await (await fetch(u+'?v='+Date.now())).blob();return await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result.split(',')[1]);fr.readAsDataURL(bl);});};
const sec=async(name,code,sort)=>{const ex=(await C('catalog.section.list',{select:['id'],filter:{iblockId:25,name}})).sections||[];return ex.length?ex[0].id:(await C('catalog.section.add',{fields:{iblockId:25,name,code,iblockSectionId:3,sort}})).section.id;};
const TEA=await sec('Чай','tea',500), GIFT=await sec('Подарочные наборы','gift-sets',600), SOUV=await sec('Сувениры','souvenirs',700);
L('secs '+[TEA,GIFT,SOUV]);
const P=[
['t01_jasmine.jpg','Чай шан туйет с жасмином, 20 пак.',TEA,490,'chay-zhasmin','Зелёный чай шан туйет с горных плантаций севера Вьетнама, ароматизированный цветками жасмина. 20 пакетиков по 2 г.'],
['t02_ginger.jpg','Чай шан туйет с имбирём, 20 пак.',TEA,490,'chay-imbir','Чёрный чай шан туйет с сушёным имбирём. Согревающий, с пряной ноткой. 20 пакетиков по 2 г.'],
['t03_cinnamon.jpg','Чай шан туйет с корицей, 20 пак.',TEA,490,'chay-koritsa','Чай шан туйет с вьетнамской корицей из провинции Йенбай. Сладковатый и тёплый аромат. 20 пакетиков по 2 г.'],
['t04_lotus.jpg','Чай шан туйет с лотосом, 20 пак.',TEA,550,'chay-lotos','Зелёный чай с ароматом лотоса - традиционный чай ханойских чайных. 20 пакетиков по 2 г.'],
['g01_hanoi.jpg','Подарочный набор «Ханой»',GIFT,2490,'nabor-hanoy','Робуста Буонметхуот 250 г, чай с жасмином и эмалированная кружка PHINLY в крафтовой коробке с открыткой.'],
['g02_saigon.jpg','Подарочный набор «Сайгон»',GIFT,2690,'nabor-saigon','Арабика Далат 250 г, чай с корицей и эмалированная кружка PHINLY в крафтовой коробке с открыткой.'],
['s01_mug.jpg','Эмалированная кружка PHINLY, 350 мл',SOUV,890,'kruzhka-phinly','Кружка из эмалированной стали в стиле вьетнамских кофеен 80-х. Подходит для горячих и холодных напитков.'],
['s02_tote.jpg','Шоппер PHINLY',SOUV,990,'shopper-phinly','Плотный хлопковый шоппер цвета хаки с красными ручками и логотипом PHINLY.']];
let sort=900;
for(const [img,name,s,price,code,txt] of P){const ex=await C('crm.product.list',{filter:{CODE:code},select:['ID']});const d=await b64(RAW+img);
 const fields={NAME:name,CODE:code,SECTION_ID:s,ACTIVE:'Y',CURRENCY_ID:'RUB',PRICE:price,SORT:(sort-=10),DESCRIPTION:txt,DESCRIPTION_TYPE:'text',PREVIEW_PICTURE:{fileData:[img,d]},DETAIL_PICTURE:{fileData:[img,d]}};
 const r=ex.length?await C('crm.product.update',{id:ex[0].ID,fields}):await C('crm.product.add',{fields}); L(code+' '+(r.err||r));}
// landing: title (copy of Меню block) + 4 tiles grid, after the catalog
let blocks=await C('landing.block.getlist',{lid:1,params:{edit_mode:1}});
let titleId=_lv.title, gridId;
if(!blocks.find(b=>b.code=='32.6.img_grid_4cols_1')){
 gridId=await C('landing.landing.addblock',{lid:1,fields:{CODE:'32.6.img_grid_4cols_1',AFTER_ID:9}}); L('grid '+JSON.stringify(gridId));
 titleId=await C('landing.landing.copyblock',{lid:1,block:7,params:{AFTER_ID:9}}); L('title '+JSON.stringify(titleId));
} else { gridId=blocks.find(b=>b.code=='32.6.img_grid_4cols_1').id; }
_lv.grid=gridId; _lv.titleId=titleId;
blocks=await C('landing.block.getlist',{lid:1,params:{edit_mode:1,get_content:true}});
const g=blocks.find(b=>b.id==gridId); const gd=new DOMParser().parseFromString(g.content,'text/html');
_lv.gridNodes=[...new Set([...gd.querySelectorAll('[class*=landing-block-]')].map(e=>[...e.classList].find(c=>c.startsWith('landing-block-'))))].join(',');
const imgs=gd.querySelectorAll('.landing-block-node-img').length; L('imgs '+imgs);
const tiles=[['cat_coffee.jpg','Кофе'],['cat_tea.jpg','Чай'],['cat_gift.jpg','Подарочные наборы'],['cat_souvenir.jpg','Сувениры']];
const data={};
for(let i=0;i<Math.min(4,imgs);i++){const u=await C('landing.block.uploadfile',{block:gridId,picture:RAW+tiles[i][0]});data['.landing-block-node-img@'+i]={src:u.src,id:u.id,alt:tiles[i][1]};}
L('gridupd '+JSON.stringify(await C('landing.block.updatenodes',{lid:1,block:gridId,data})));
if(titleId&&typeof titleId!=='object'){L('t '+JSON.stringify(await C('landing.block.updatenodes',{lid:1,block:titleId,data:{'.landing-block-node-title@0':'Лавка','.landing-block-node-text@0':'Кофе, чай, подарочные наборы и сувениры PHINLY - чтобы вьетнамская кофейня была у вас дома'}})));}
// menu: 5th item
const mb=blocks.find(b=>b.id==27); const mc=new DOMParser().parseFromString(mb.content,'text/html').querySelectorAll('.landing-block-node-menu-list-item').length;
if(mc<5) await C('landing.block.clonecard',{lid:1,block:27,selector:'.landing-block-node-menu-list-item@0'});
L('menu '+JSON.stringify(await C('landing.block.updatenodes',{lid:1,block:27,data:{'.landing-block-node-menu-list-item-link@0':{text:'Меню',href:'#b9',target:'_self'},'.landing-block-node-menu-list-item-link@1':{text:'Лавка',href:'#b'+titleId,target:'_self'},'.landing-block-node-menu-list-item-link@2':{text:'О нас',href:'#b3',target:'_self'},'.landing-block-node-menu-list-item-link@3':{text:'Доставка и оплата',href:'#b11',target:'_self'},'.landing-block-node-menu-list-item-link@4':{text:'Контакты',href:'#b21',target:'_self'}}})));
const p=await C('landing.site.publication',{id:3});L('pub '+p);
_lv.status='done';}catch(e){_lv.status='err '+e;}})();
'started';
