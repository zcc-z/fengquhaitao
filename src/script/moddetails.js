import{
    $,
    ajaxpromise,
    cookie
} from './common.js'

let sid = location.search.substring(1).split('=')[1];
// console.log(sid);
let d = $('.goods-dir');
let smallpic = $('.smallpic');
let ulbox = $('.det-ulbox');
let tit = $('.det-right h4');
let pri = $('.price span');
let opri = $('.price em');
let brand = $('.brand');
let add = $('.add-car');
let num = $('.num');
let bpic = $('.bpic');
let jian = $('.jian');
let jia = $('.jia');

// 数据渲染
ajaxpromise({
    url:'http://10.31.163.84/fengqu/php/details.php',
    data:{
        sid:sid
    }
}).then(function(data){
    let obj = JSON.parse(data);
    d.innerHTML = obj.title;
    smallpic.src = obj.url;
    let urlarr = obj.urllist.split(',');
    let strhtml = '';
    for(let i=0;i<urlarr.length;i++){
        
        if(i==0){
            bpic.src = obj.url;
            strhtml +=`
                <li class="ulactive">
                    <img src="${urlarr[i]}" alt="">
                </li>
            `;
        }else{
            strhtml +=`
                <li>
                    <img src="${urlarr[i]}" alt="">
                </li>
            `;
        }
    }
    ulbox.innerHTML = strhtml;
    tit.innerHTML = obj.title;
    pri.innerHTML = '￥'+ obj.price;
    opri.innerHTML = '￥'+ obj.oldprice;
    brand.innerHTML = obj.brand;
});

// 加入购物车操作
let sidarr = [];
let numarr = [];

// 获取cookie存入数组
function cookietoArray(){
    if(cookie.get('cookiesid') && cookie.get('cookienum')){
        sidarr = cookie.get('cookiesid').split(',');
        numarr = cookie.get('cookienum').split(',');
    }else{
        sidarr = [];
        numarr  = [];
    }
}

// 存cookie
jian.onclick = function(){
    if(num.value>1){
        num.value--;
    }else{
        num.value=1;
    }    
}
jia.onclick = function(){
    if(num.value<100){
        num.value++;
    }else{
        num.value=1;
    }   
}
add.onclick = function(){
    cookietoArray();
    if(isNaN(num.value)|| num.value===''||num.value<='0'|| num.value>100){
        alert('格式不正确，将主动存入1');
        num.value=1;
    }else{
        num.value = parseInt(num.value);
    }
    if(sidarr.indexOf(sid)===-1){//商品第一次添加
        numarr.push(num.value);
        sidarr.push(sid);
        cookie.set('cookiesid',sidarr.toString(),7);
        cookie.set('cookienum',numarr.toString(),7);
    }else{//商品已经添加过
        numarr[sidarr.indexOf(sid)] = parseInt(numarr[sidarr.indexOf(sid)]) + parseInt(num.value);
        cookie.set('cookienum',numarr.toString(),7);
    }

    alert('已经存入购物车');
}


// 放大镜

class Scale{
    constructor(){
        this.smallpic = $('.smallpic');
        this.sf = $('.sf');
        this.bf = $('.bf');
        this.bigpic = $('.bpic');
        this.spic = $('.spic');
        this.wrap = $('.wrap');
    }
    init(){
        this.spic.onmouseover = ()=>{
            this.bf.style.visibility = 'visible';
            
            this.sf.style.width = this.spic.offsetWidth * this.bf.offsetWidth /this.bigpic.offsetWidth + 'px';
            this.sf.style.height = this.spic.offsetHeight * this.bf.offsetHeight / this.bigpic.offsetHeight + 'px';

            this.bili = this.bigpic.offsetWidth / this.spic.offsetWidth;
            this.bf.onmousemove = (ev)=>{
                var ev = ev || window.event;
                let leftPosition = ev.pageX -this.wrap.offsetLeft-this.bf.offsetLeft-this.sf.offsetWidth/2;
                let topPosition = ev.pageY -this.wrap.offsetTop-this.sf.offsetHeight/2;
                

                if(leftPosition < 0 ){
                    leftPosition = 0;
                }else if(leftPosition >= this.spic.offsetWidth-this.sf.offsetWidth){
                    leftPosition = this.spic.offsetWidth - this.sf.offsetWidth-2;
                }
                if(topPosition < 0 ){
                    topPosition = 0;
                }else if(topPosition >= this.spic.offsetHeight-this.sf.offsetHeight){
                   topPosition = this.spic.offsetHeight - this.sf.offsetHeight-2;
                }

                this.bigpic.style.left = -this.bili*leftPosition + 'px';
                this.bigpic.style.top = - this.bili*topPosition + 'px';
            }
        }
        this.bf.onmouseout=()=>{
            this.bf.style.visibility='hidden';
        }
        this.picchange();
    }
    picchange(){
       ulbox.onclick = (e)=>{
            var e = e || window.event;
            if(e.target.parentNode.nodeName==='LI'){
                let count=  e.target.parentNode.parentNode.children.length
                for(let lis =0;lis<count;lis++){
                    e.target.parentNode.parentNode.children[lis].className = '';
                }
                this.smallpic.src = e.target.src;
                this.bigpic.src = e.target.src;
                e.target.parentNode.className = 'ulactive';
            }
       }
    }
}

new Scale().init();
