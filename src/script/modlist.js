import{
    ajaxpromise,
    $
} from './common.js';

let list = $('.goods-list');
let price = $('.the-price');
ajaxpromise({
    url:'http://10.31.163.84/fengqu/php/list.php'
}).then(function(data){
    let arr = JSON.parse(data);
    let str = ``;
    let obj= {};
    let arrprice = [];
    let sidarr =[];
    let count =0;
    // 分页
    // let detailmain = $('.details-main');
    let pagebox = $('.page-box');
    let pagecount = Math.ceil(arr.length/16);
    let strli = '';
    let str1 = '';
    let str2 = '';
    let page = $('.page');
    for(let i=0;i<pagecount;i++){
        strli +=`
            <li class="float_l">${i+1}</li>
        `;
    }
    pagebox.innerHTML = strli;
    var pagenum = 1;
    pagechange(pagenum)
    page.addEventListener('click',(ev)=>{
        list.innerHTML = ' ';
        var ev = ev || window.event;
        if(ev.target.nodeName === 'LI'){
            pagenum = ev.target.innerHTML; 
            for(let f=0;f<ev.target.parentNode.children.length;f++){
                ev.target.parentNode.children[f].style.backgroundColor= '#fff';
            } 
            ev.target.style.backgroundColor= 'red';
            pagechange(pagenum);     
        document.documentElement.scrollTop = document.body.scrollTop =0;
        }
    })
    function pagechange(p){
        str1 ='';
        str2 = '';
        if(pagenum==1){
            list.innerHTML = '';
            for(let k=0;k<arr.length;k++){
                if(k<16){
                      str1 +=`
                            <li class="float_l">
                                <a href="http://10.31.163.84/fengqu/src/details.html?sid=${arr[k].sid}" target="_blank">
                                    <div class="img-show">
                                    <img src="" alt="" class="lazy" data-src="${arr[k].url}">
                                    </div>
                                    <p>${arr[k].title}</p>
                                    <span>￥${arr[k].price}</span><del>￥${arr[k].oldprice}</del><span>加入购物车</span>
                                </a>
                            </li>
                        `;   
                        list.innerHTML = str1;
                }
            }
        }else if(pagenum==2){
            list.innerHTML = '';
            for(let k=0;k<arr.length;k++){
                if(k<arr.length && k>=16){
                    str2 +=`
                    <li class="float_l">
                        <a href="http://10.31.163.84/fengqu/src/details.html?sid=${arr[k].sid}" target="_blank">
                            <div class="img-show">
                            <img src="" alt="" class="lazy" data-src="${arr[k].url}">
                            </div>
                            <p>${arr[k].title}</p>
                            <span>￥${arr[k].price}</span><del>￥${arr[k].oldprice}</del><span>加入购物车</span>
                        </a>
                    </li>
                    `;  
                    list.innerHTML = str2;     
                }
            }
        }
        imgLazy()
    }
    


    // 默认排序数据渲染
    
    for(let value of arr){
        // 价格排序
        for(let i=0;i<arr.length;i++){
            arrprice.push(arr[i].price);
        }
        obj[value.sid]=value.price;
        price.onclick = ()=>{
            pagebox.style.display ='none';
            
            sidarr = [];
            count++;
            if(count%2!=0){
                arrprice.sort(function(a,b){
                    return a-b;
                });
                price.style.background = '#aaa';
            }else{
                arrprice.sort(function(a,b){
                    return b-a;
                });
                price.style.background = '#cac';
            }
                
            for(let v of arrprice){
                    for(let i in obj){
                        if(v==obj[i]){
                            if(sidarr.indexOf(i)==-1){
                                sidarr.push(i);
                            }
                    }       
                }  
            }  
            list.innerHTML=``;
            str =``;
            for(let j of sidarr){
                for(let value of arr){
                    if(j==value.sid){
                        str +=`
                        <li class="float_l">
                            <a href="http://10.31.163.84/fengqu/src/details.html?sid=${value.sid}" target="_blank">
                                <div class="img-show">
                                    <img src="" alt="" class="lazy" data-src="${value.url}">
                                </div>
                                <p>${value.title}</p>
                                <span>￥${value.price}</span><del>￥${value.oldprice}</del><span>加入购物车</span>
                            </a>
                        </li>
                    `;
                    }
                }
            }
            list.innerHTML=str;
            imgLazy();
        }    
    }
    // 图片懒加载
    function imgLazy(){
        let imglis = $('.lazy',true);
        for(let i=0;i<4;i++){
            imglis[i].src = imglis[i].getAttribute('data-src');
        }
        let top1=0;
        window.onscroll = ()=>{
            top1= document.body.scrollTop || document.documentElement.scrollTop;
            for(let i=4;i<imglis.length;i++){
                if(top1>imglis[i].offsetTop-window.innerHeight/2){
                    imglis[i].src = imglis[i].getAttribute('data-src');
                }
            }
        }
    }
    imgLazy();
});

