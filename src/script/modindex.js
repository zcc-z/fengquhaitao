import{
    $,
    ajaxpromise,
    cookie,
} from './common.js';

let list = $(".item",true);
let fixtop = $('.fix-top');

let toTop = $('.to-top');
let louti =$('.louti');
let lousteps = $('.louti li',true);
let louceng = $('.louceng',true);
let cartlist = $('.cartlist');
let menuli = $('.me',true);
let cartitem = $('.cart-item',true);
// let menucon = $('.menu-con');
let banner = $('.banner');
let right = $('.the-right');
let left = $('.the-left');
ajaxpromise({
    url:'http://10.31.163.84/fengqu/php/list.php'
}).then(function(data){
    let arr = JSON.parse(data);
    let str = '';
    for(let i=0;i<6;i++){
        str +=`
            <li class="float_l goods-detail"> 
                <a href="http://10.31.163.84/fengqu/src/details.html?sid=${arr[i].sid}" target="_blank">
                    <div class="img-box">
                        <img src="${arr[i].url}" alt="">
                    </div>
                    <p>${arr[i].title}</p>
                    <p><span>￥${arr[i].price}</span>
                        <del>￥${arr[i].oldprice}</del></p>
                </a>
            </li>
        `;
    }
    for(let j=0;j<list.length;j++){
        list[j].innerHTML+=str;
    }
});


// 回到顶部
// 吸顶效果
// 楼梯特效
var top = 0;
window.onscroll = ()=>{
    top = document.body.scrollTop || document.documentElement.scrollTop;
    // 楼梯
    if(top>=400){
        louti.style.display = 'block';
    }else{
        louti.style.display = 'none';
    }
    for(let i=0;i<louceng.length;i++){
        if(top>louceng[i].offsetTop-louceng[i].offsetHeight/2){
            for(let j=0;j<lousteps.length;j++){
                lousteps[j].className='';
            }
            lousteps[i].className='stepactive';
        }
    }
    // 回到顶部、吸顶效果
    if(top>=700){
        fixtop.style.display = 'block';
        toTop.style.display = 'block';    
    }else{
        toTop.style.display = 'none';
        fixtop.style.display = 'none';
    }
   
}
toTop.onclick = ()=>{
    let timer = setInterval(()=>{
        if(top>0){
            top-=10;
        }else{
            top=0;
            clearInterval(timer);
        }
        document.body.scrollTop = document.documentElement.scrollTop = top;

    },5)
}
 

louti.onclick = (e)=>{
    var e = e || window.e;
    if(e.target.parentNode.nodeName==='LI'){
        for(let i=0;i<lousteps.length;i++){
            lousteps[i].className = ``;
        }
        e.target.parentNode.className = 'stepactive';
    }   
}

// 二级菜单
for(let i=0;i<menuli.length;i++){
    menuli[i].onmouseover = ()=>{
        for(let j=0;j<menuli.length;j++){
            cartitem[j].style.display = 'none';
        }
        cartlist.style.display = 'block';
        cartitem[i].style.display = 'block';
        let top = document.body.scrollTop || document.documentElement.scrollTop;
        if(top>=banner.offsetTop){
            let jiange = top-banner.offsetTop;
            cartlist.style.top = jiange + 'px';
        }else{
            cartlist.style.top = 0;
        }
    }
    menuli[i].onmouseout=()=>{
        cartlist.style.display = 'none';    
    }
    cartlist.onmouseover = ()=>{
        cartlist.style.display = 'block';
    }
    cartlist.onmouseout = ()=>{
        cartlist.style.display = 'none';
    }
       
}

// 轮播图
let index = 0;
let imgs = $('.slider-img img',true);
let btns = $('.circle li',true);
let slider = $('.slider');
function move(){
    // 圆点的类名
    for(var i=0;i<btns.length;i++){
        btns[i].className = '';
        imgs[i].style.display = 'none';
    }
    btns[index].className='li-active';
    imgs[index].style.display = 'block';
}

left.onclick = function(){
    clearInterval(timer);
    index--;
    if(index<0){
        index=btns.length-1;
    }
    move();
    timer  = setInterval(function(){
        right.onclick();
    },2000);
}
right.onclick = function(){
    index++;
    if(index>=imgs.length){
        index=0;
    }
    move();
}
for(let i=0;i<btns.length;i++){
    btns[i].onclick = function(){
        clearInterval(timer);
        index=i;
        move();
    }
}
var timer  = setInterval(function(){
    right.onclick();
},2000)

slider.onmouseover = ()=>{
    left.style.display = 'block';
    right.style.display = 'block';
    clearInterval(timer);
}
slider.onmouseout = ()=>{
    left.style.display = 'none';
    right.style.display = 'none';
    timer  = setInterval(function(){
        right.onclick();
    },2000);
}



// 导航栏效果
let xiazai = $('.the-logo');
let logobox = $('.logo-box');
let att = $('.att');
let attention = $('.attention');
let toplis = $('.top li a',true);
xiazai.onmouseover = function(){
    logobox.style.display = 'block';
}
xiazai.onmouseout = function(){
    logobox.style.display = 'none';
}
att.onmouseover = function(){
    attention.style.display = 'block';
}
att.onmouseout = function(){
    attention.style.display = 'none';
}
for(let i=0;i<toplis.length;i++){
    toplis[i].onmouseover = function(){
        toplis[i].style.color = '#fff';
    }
    toplis[i].onmouseout = function(){
        toplis[i].style.color = '#ccc';
    }
}
// 商品的划过效果
for(let i=0;i<list.length;i++){
    list[i].onmouseover = (e)=>{
        var e = e || window.event;
        if(e.target.parentNode.parentNode.parentNode.nodeName=='LI'){
            e.target.parentNode.parentNode.parentNode.style.borderBottom = '3px solid red';
        }
    }
    list[i].onmouseout = (e)=>{
        var e = e || window.event;
        if(e.target.parentNode.parentNode.parentNode.nodeName=='LI'){
            e.target.parentNode.parentNode.parentNode.style.borderBottom = '1px solid #ccc';
        }
    }
}
// 判断登录情况
let toLogin = $(".toligon");
let toregistry = $(".toregistry");
let tui = $(".tui");
let wel = $(".welcome");
function iflogin(){
    if(cookie.get('username') && cookie.get('iflogin')){
        toLogin.style.display = 'none';
        toregistry.style.display ='none';
        tui.style.display = 'block';
        wel.style.display = 'block';
        wel.innerHTML = `欢迎您, ${cookie.get('username')}`;
    }else{
        toLogin.style.display = 'block';
        toregistry.style.display ='block';
        tui.style.display = 'none';
        wel.style.display = 'none';
    }    
}
iflogin();
tui.onclick = function(){
    cookie.remove('iflogin');
    iflogin();
}
