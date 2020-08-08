import {
    $,
    ajaxpromise,
    cookie
} from './common.js';

let carcon = $('.car-con');
let allcheck = $('.all-check');
let sidarr = [];
let numarr = [];
let pricearr = [];//存入选中商品的价格
let allpri = 0;
let checksid = [];//存入选中商品的sid
// 取出cookie中的数据
if(cookie.get('cookiesid') && cookie.get('cookienum')){
    sidarr = cookie.get('cookiesid').split(',');
    numarr = cookie.get('cookienum').split(',');
    for(let i =0;i<sidarr.length;i++){
        render(sidarr[i],numarr[i]);
    }
    let goodscon = $('.car-con');
    let goodssid = 0;
    // 全选
    
    allcheck.onclick = function(){ 
        pricearr = [];
        checksid =[];
        let goodscheck = $('#goods-check',true);    
        if(allcheck.checked){
           for(let i=0;i<goodscheck.length;i++){
                goodscheck[i].checked = 'checked';
           }
           let acp = $('#all-pri',true);
           let count = 0;
           let onegoods = $('.one-goods',true);
           let onegoodspri = $('#all-pri',true);
           for(let l=0;l<onegoods.length;l++){
                checksid.push(onegoods[l].getAttribute('data-sid'));
                pricearr.push(onegoodspri[l].innerHTML);
           }
           for(let j=0;j<acp.length;j++){
               count+=parseInt(acp[j].innerHTML);
           }
           $('.price-show').innerHTML = count;
        }else{
            pricearr = [];
            checksid =[];
            for(let i=0;i<goodscheck.length;i++){
                goodscheck[i].checked = false;
            }
            $('.price-show').innerHTML = 0;
        }
    }
    
    goodscon.onclick = function(e){
        var e = e || window.event;
        let gpri = 0;
        // 商品数量加
        if(e.target.className=='jia'){
            goodssid = e.target.parentNode.parentNode.parentNode.getAttribute('data-sid');
            let vz = e.target.previousElementSibling.value;
            vz++;
            if(vz>=100){
                vz=99;
            }    
            e.target.previousElementSibling.value = vz;
            numarr[sidarr.indexOf(goodssid)] =parseInt(vz);
            cookie.set('cookienum',numarr.toString(),7);
            gpri = e.target.parentNode.previousElementSibling.innerHTML; 
            e.target.parentNode.nextElementSibling.innerHTML= gpri * vz;
            
            cun();
            zongji();
        }
        // 商品数量减
        if(e.target.className=='jian'){
            goodssid = e.target.parentNode.parentNode.parentNode.getAttribute('data-sid');
            let vj = e.target.nextElementSibling.value;
            vj--;
            if(vj<=0){
                vj=1;
            }
            e.target.nextElementSibling.value = vj; 
            numarr[sidarr.indexOf(goodssid)] =parseInt(vj);
            cookie.set('cookienum',numarr.toString(),7);
            gpri = e.target.parentNode.previousElementSibling.innerHTML; 
            e.target.parentNode.nextElementSibling.innerHTML= gpri * vj;               
            cun();
            zongji();
        }
        // 删除商品
        if(e.target.className=='goods-remove'){            
            goodssid = e.target.parentNode.parentNode.parentNode.getAttribute('data-sid');
            e.target.parentNode.parentNode.parentNode.remove();
            sidarr.splice(sidarr.indexOf(goodssid),1);
            numarr.splice(sidarr.indexOf(goodssid),1);
            cookie.set('cookiesid',sidarr.toString(),7);
            cookie.set('cookienum',numarr.toString(),7);
            let goodsnum = $('#goods-check',true);
            let checkif = e.target.parentNode.parentNode.firstElementChild.firstElementChild.checked;
            if(checkif){
                let sid = e.target.parentNode.parentNode.parentNode.getAttribute('data-sid');
                pricearr.splice(checksid.indexOf(sid),1);
                checksid.splice(checksid.indexOf(sid),1);
                zongji();
            }
            if(checksid.length==$('.one-goods',true).length){
                allcheck.checked = 'checked';
            }else{
                allcheck.checked = false;
            }
            
        }
        // 全选
        
        if(e.target.id=='goods-check'){
        let flag = true;
        let goodscheck = $('#goods-check',true); 
            let goodsid = e.target.parentNode.parentNode.parentNode.getAttribute('data-sid');
            let allprice = e.target.parentNode.parentNode.lastElementChild.previousElementSibling;
            allpri = parseInt(allprice.innerHTML);
            if(checksid.indexOf(goodsid)==-1){
                checksid.push(goodsid);
                pricearr.push(allpri);
            }
           for(let i=0;i<goodscheck.length;i++){
               if(!goodscheck[i].checked){
                    let gsid = goodscheck[i].parentNode.parentNode.parentNode.getAttribute('data-sid');
                    let nocheck = checksid.indexOf(gsid);
                    if(nocheck!=-1){
                       checksid.splice(nocheck,1);
                        pricearr.splice(nocheck,1);
                    }
                   
                    flag = false;
                    continue;
               }
           } 
           if(flag){
                allcheck.checked = 'checked';
           }else{
                allcheck.checked = false;
           }           
           zongji();
        }
        function zongji(){
            let sum = 0;
            if(pricearr.length>0){
                for(let h=0;h<pricearr.length;h++){
                    sum +=parseInt(pricearr[h]);
                }
            }

            $('.price-show').innerHTML=  sum;
       }
       function cun(){
            let price = e.target.parentNode.nextElementSibling.innerHTML;
            let sid = e.target.parentNode.parentNode.parentNode.getAttribute('data-sid');
            let ifcheck = e.target.parentNode.parentNode.firstElementChild.firstElementChild.checked;
            if(ifcheck){
                pricearr.splice(checksid.indexOf(sid),1,price);
            }else{
                if(checksid.indexOf(sid)!=-1){
                    checksid = checksid.splice(checksid.indexOf(sid),1);
                    pricearr = pricearr.splice(checksid.indexOf(sid),1);
                }
                
            }
       }
    }
    // 商品数量的输入
    goodscon.onchange = function(ev){
        var ev = ev || window.event;
        if(ev.target.className==='val'){
            let ta = ev.target;
            let reg = /^\d{1,2}$/;
            let v = ta.value;
            if(reg.test(ta.value)){
                goodssid = ev.target.parentNode.parentNode.parentNode.getAttribute('data-sid');
                numarr[sidarr.indexOf(goodssid)] =parseInt(ta.value);
                cookie.set('cookienum',numarr.toString(),7);
                let gpri = ev.target.parentNode.previousElementSibling.innerHTML; 
                ev.target.parentNode.nextElementSibling.innerHTML= gpri * ta.value;  
                let price = ev.target.parentNode.nextElementSibling.innerHTML;
                let sid = ev.target.parentNode.parentNode.parentNode.getAttribute('data-sid');
                let ifcheck = ev.target.parentNode.parentNode.firstElementChild.firstElementChild.checked;
                if(ifcheck){
                    pricearr.splice(checksid.indexOf(sid),1,price);
                }else{
                    if(checksid.indexOf(sid)!=-1){
                        checksid.splice(checksid.indexOf(sid),1);
                        pricearr.splice(checksid.indexOf(sid),1);
                    }    
                }    
                // 计算总计
                let sum = 0;
                if(pricearr.length>0){
                    for(let h=0;h<pricearr.length;h++){
                        sum +=parseInt(pricearr[h]);
                    }
                }
    
                $('.price-show').innerHTML=  sum;
               
            }else{
                alert('商品数量格式错误，限购99件');
                let n =ev.target.parentNode.nextElementSibling.innerHTML/ev.target.parentNode.previousElementSibling.innerHTML;
                ev.target.value = parseInt(n);
            }            
        }
    }
}

function render(sid,num){
    ajaxpromise({
        url:'http://10.31.163.84/fengqu/php/details.php',
        data:{
            sid:sid
        }
    }).then(function(data){
        let obj = JSON.parse(data);
        let str = `
            <li class="one-goods active" data-sid="${obj.sid}">
                <ul class="clear_fix">
                    <li class="float_l ch">
                        <input type="checkbox" class="check float_l" id="goods-check">
                        <div class="goods-img float_l">
                            <img src="${obj.url}" alt="">
                        </div>
                    </li>
                    <li class="float_l goods-info">
                        <h6>${obj.title}</h6>
                        <p>品牌：${obj.brand}</p>
                    </li>
                    <li class="float_l goods-price" id="goods-pri">${obj.price}</li>
                    <li class="float_l goods-num" id="goods-num">
                        <span class="jian">-</span>
                        <input type="text" value="${num}" class="val">
                        <span class="jia">+</span>
                    </li>
                    <li class="float_l price" id="all-pri">${obj.price*num}</li>
                    <li class="float_l operation">
                        <a href="javascript:;" class="goods-remove">删除</a>
                    </li>
                </ul>
            </li>
        `;
        carcon.innerHTML += str;
    })
}
