window.C=(m,p)=>new Promise(r=>BX.rest.callMethod(m,p||{},res=>r(res.error()?{err:String(res.error())}:res.data())));
window._lj={log:[],status:'run'};
(async()=>{const L=s=>_lj.log.push(s);try{
const RAW='https://raw.githubusercontent.com/quynhanhihi/phinly-assets/main/';
const LID=1;
const b=await C('landing.block.getlist',{lid:LID,params:{edit_mode:1,get_content:true}});
const doc=id=>new DOMParser().parseFromString((b.find(x=>x.id==id)||{content:''}).content,'text/html');
const cnt=(id,sel)=>doc(id).querySelectorAll(sel).length;
const up=async(block,file)=>{const r=await C('landing.block.uploadfile',{block,picture:RAW+file});L('up '+file+' '+(r.err||r.src||JSON.stringify(r).slice(0,80)));return r;};
const nodes=async(block,data)=>{const r=await C('landing.block.updatenodes',{lid:LID,block,data});L('nodes '+block+' '+(r.err||r));};
const trim=async(block,sel,keep)=>{let n=cnt(block,sel);while(n>keep){const r=await C('landing.block.removecard',{lid:LID,block,selector:sel+'@'+(n-1)});if(r.err){L('rm '+block+' '+r.err);break;}n--;}};

// 1. header menu (block 27)
const logo=await up(27,'logo_header.png');
await trim(27,'.landing-block-node-menu-list-item',4);
let n=cnt(27,'.landing-block-node-menu-list-item');
while(n<4){await C('landing.block.clonecard',{lid:LID,block:27,selector:'.landing-block-node-menu-list-item@0'});n++;}
await nodes(27,{
 '.landing-block-node-menu-logo':[{src:logo.src,id:logo.id,alt:'PHINLY - вьетнамский кофе'}],
 '.landing-block-node-menu-logo-link':[{href:'#landing1',text:'',target:'_self'}],
 '.landing-block-node-menu-list-item-link':[
  {text:'Каталог',href:'#b9',target:'_self'},
  {text:'О нас',href:'#b3',target:'_self'},
  {text:'Доставка и оплата',href:'#b11',target:'_self'},
  {text:'Контакты',href:'#b21',target:'_self'}]});

// 2. cover (block 1)
const hero=await up(1,'hero.jpg');
await trim(1,'.landing-block-node-card',1);
await nodes(1,{
 '.landing-block-node-card-img':[{src:hero.src,id:hero.id}],
 '.landing-block-node-card-subtitle':['Кофе как в Ханое - у вас дома'],
 '.landing-block-node-card-title':['Робуста из Буонметхуота, арабика из Далата и всё для заваривания в фине. Доставка по Москве за 1 день'],
 '.landing-block-node-card-button':[{text:'Перейти в каталог',href:'#b9',target:'_self'}]});

// 3. about
await nodes(3,{'.landing-block-node-title':['О нас'],'.landing-block-node-text':['PHINLY - московский стартап, основанный студентами из Вьетнама. Мы привозим кофе напрямую с ферм Центрального нагорья, обжариваем его малыми партиями и рассказываем, как заварить настоящий вьетнамский кофе в фине у себя дома.']});

// 4. advantages
await trim(5,'.landing-block-node-card',3);
await nodes(5,{'.landing-block-node-card-title':['Прямые поставки','Свежая обжарка','Доставка за 1 день'],
 '.landing-block-node-card-text':['Работаем напрямую с фермами Буонметхуота и Далата, без посредников.','Обжариваем кофе малыми партиями каждую неделю, поэтому он всегда ароматный.','По Москве в пределах МКАД. Бесплатно при заказе от 2 000 ₽.']});

// 5. catalog title
await nodes(7,{'.landing-block-node-title':['Каталог'],'.landing-block-node-text':['Молотый и зерновой кофе, фины, сгущёнка и подарочные наборы']});

// 6. delivery
await nodes(11,{'.landing-block-node-title':['Доставка и оплата'],'.landing-block-node-text':['Курьером по Москве в пределах МКАД - на следующий день, 300 ₽, бесплатно от 2 000 ₽.<br>Пункты выдачи СДЭК по всей России - от 2 до 5 дней.<br>Самовывоз - Москва, ул. Стремянная, 36.<br>Оплата картой онлайн, через СБП или наличными курьеру.']});

// 7. brew block
const brew=await up(13,'brew.jpg');
await nodes(13,{'.landing-block-node-img':[{src:brew.src,id:brew.id,alt:'Вьетнамский фин'}],'.landing-block-node-title':['Как заварить кофе в фине'],
 '.landing-block-node-text':['1. Налейте в чашку 2 ложки сгущёнки и поставьте сверху фин.<br>2. Насыпьте 2 ложки молотого кофе и слегка прижмите прессом.<br>3. Влейте немного горячей воды (90-95 °C) и подождите 30 секунд.<br>4. Долейте воду до верха и накройте крышкой.<br>5. Через 4-5 минут перемешайте и добавьте лёд. Кофе готов!']});

// 8. remove gallery title+grid
for(const id of [15,17]){const r=await C('landing.block.delete',{lid:LID,block:id});L('del '+id+' '+(r.err||r));}

// 9. contacts title + contacts
await nodes(19,{'.landing-block-node-title':['Контакты'],'.landing-block-node-text':['Есть вопросы о кофе или заказе? Позвоните нам или напишите - бариста PHINLY ответит и поможет выбрать.']});
await nodes(21,{
 '.landing-block-node-linkcontact-link':[{href:'tel:+74951234567',text:'',target:'_self'},{href:'mailto:hello@phinly.ru',text:'',target:'_self'}],
 '.landing-block-node-linkcontact-title':['Телефон','Email'],
 '.landing-block-node-linkcontact-text':['+7 (495) 123-45-67','hello@phinly.ru'],
 '.landing-block-node-contact-title':['Адрес'],
 '.landing-block-node-contact-text':['Москва, ул. Стремянная, 36']});

// 10. footer
const fid=await C('landing.landing.addblock',{lid:LID,fields:{CODE:'17.copyright',AFTER_ID:21}});
L('footer '+JSON.stringify(fid));
_lj.footer=fid;
const site=await C('landing.site.update',{id:3,fields:{TITLE:'PHINLY - вьетнамский кофе'}});
const land=await C('landing.landing.update',{lid:LID,fields:{TITLE:'PHINLY - вьетнамский кофе с доставкой по Москве'}});
L('titles '+JSON.stringify([site,land]));
_lj.status='done';
}catch(e){_lj.status='err '+e;}})();
'started';
