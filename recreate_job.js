window.C=(m,p)=>new Promise(r=>BX.rest.callMethod(m,p||{},res=>r(res.error()?{err:String(res.error())}:res.data())));
window._rj={log:[],status:'run'};
(async()=>{const L=s=>_rj.log.push(s);try{
const RAW='https://raw.githubusercontent.com/quynhanhihi/phinly-assets/main/real/';
const b64=async u=>{const bl=await (await fetch(u)).blob();return await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result.split(',')[1]);fr.readAsDataURL(bl);});};
const P=[
['01_robusta.jpg','Робуста Буонметхуот, молотый, 250 г',5,690,'robusta-buonmethuot','Крепкая робуста с плантаций Буонметхуота - кофейной столицы Вьетнама. Ноты тёмного шоколада и лёгкая горчинка. Идеальна для заваривания в фине и для кофе со сгущённым молоком.'],
['02_arabica.jpg','Арабика Далат, молотый, 250 г',5,890,'arabica-dalat','Мягкая арабика с горных плантаций Далата. Ноты карамели и ореха, приятная кислинка. Подходит для фина, френч-пресса и турки.'],
['03_saigon.jpg','Купаж «Сайгон», молотый, 500 г',5,1290,'kupazh-saigon','Классическая смесь робусты и арабики, как в уличных кофейнях Хошимина. Насыщенный вкус, плотное тело, долгое послевкусие.'],
['04_beans.jpg','Кофе в зёрнах «Тэй Нгуен», 1 кг',5,2190,'kofe-v-zernakh-tay-nguyen','Зерновой кофе средней обжарки с Центрального нагорья Вьетнама. Для кофемашин, гейзерных кофеварок и турки.'],
['05_3in1.jpg','Кофе 3 в 1, 20 пакетиков',5,490,'kofe-3-v-1','Растворимый вьетнамский кофе с сахаром и сливками. Удобно взять с собой в офис, в дорогу или на учёбу.'],
['09_coconut.jpg','Смесь для кокосового кофе, 250 г',5,590,'smes-kokosovyy-kofe','Готовая смесь для популярного ханойского кокосового кофе. Добавьте лёд и эспрессо - и напиток готов за 2 минуты.'],
['06_phin_alu.jpg','Фин алюминиевый на 1 чашку',11,390,'fin-alyuminievyy','Традиционный вьетнамский фильтр для заваривания кофе прямо в чашку. Лёгкий, компактный, прост в уходе.'],
['07_phin_steel.jpg','Фин из нержавеющей стали «Премиум»',11,790,'fin-premium-stal','Прочный стальной фин, который не окисляется и служит годами. Плотный пресс и равномерная экстракция.'],
['08_milk.jpg','Сгущённое молоко вьетнамское, 380 г',11,290,'sgushchennoe-moloko','Густая сладкая сгущёнка для классического ca phe sua da - вьетнамского кофе со льдом и молоком.'],
['10_salt.jpg','Набор «Солёный кофе»',13,990,'nabor-solenyy-kofe','Всё для хитового ca phe muoi из Хюэ: робуста, морская соль и сливки для солёной пенки. Рецепт в комплекте.'],
['11_set_first.jpg','Набор «Первый фин»',13,1390,'nabor-pervyy-fin','Робуста 250 г, алюминиевый фин и сгущённое молоко 380 г. Всё, чтобы приготовить первую чашку вьетнамского кофе дома.'],
['12_set_hanoi.jpg','Подарочный набор «Ханой»',13,2490,'podarochnyy-nabor-khanoy','Робуста и арабика, стальной фин, сгущённое молоко и фирменная эмалированная кружка в подарочной коробке.']];
// delete old REST-created products and test items
const old=await C('catalog.product.list',{select:['id','name'],filter:{iblockId:25}});
for(const p of (old.products||[])){const r=await C('crm.product.delete',{id:p.id});L('del '+p.id+(r.err?' E '+r.err:''));}
let sort=1200;
for(const [img,name,sec,price,code,txt] of P){
 const d=await b64(RAW+img);
 const r=await C('crm.product.add',{fields:{NAME:name,CODE:code,SECTION_ID:sec,ACTIVE:'Y',CURRENCY_ID:'RUB',PRICE:price,SORT:(sort-=100),DESCRIPTION:txt,DESCRIPTION_TYPE:'text',PREVIEW_PICTURE:{fileData:[img,d]},DETAIL_PICTURE:{fileData:[img,d]}}});
 L('add '+(r.err?'E '+r.err:r)+' '+code);
}
_rj.status='done';}catch(e){_rj.status='err '+e;}})();
'started';
