// 获取对象
function $(selector, all) {
    if (!all) {
        return document.querySelector(selector); //单个
    } else {
        return document.querySelectorAll(selector) //多个
    }
}

// 把对象转成字符串
function objtostring(obj){
    let arr=[];
    for(let i in obj){
        arr.push(i+'='+obj[i]);
    }
    return arr.join('&');
}

// ajaxpromise
function ajaxpromise(option){
    let promise = new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest();
        //   请求方式
        option.type = option.type || 'get';
        // 接口地址
        if(option.url==''){
            throw new Error("地址不能为空");
        }

        // 传输数据
        if(option.data){
            if(Object.prototype.toString.call(option.data).slice(8,-1) === 'Object'){
                option.data = objtostring(option.data);
            }
        }

        // get请求方式的url
        if(option.type==='get' && option.data){
            option.url += '?' + option.data;
        }

        // 是否异步
        if(option.async===false || option.async === 'false'){
            option.async =false;
        }else{
            option.async = true;
        }

        xhr.open(option.type,option.url,option.async);

        if(option.type==='post' && option.data){
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send(option.data);
        }else{
            xhr.send();
        }

        // 监听
        if(option.async){
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    } else {
                        reject('你的接口地址有误');
                    }
                }
            }        
        }else{
            if(xhr.status===200){
                resolve(xhr.responseText);
            }else{
                reject('你的接口地址有误');
            }
        }

    })
    return promise;
}

// cookie
let cookie = {
    set:function(key,value,day){
        let d = new Date();
        d.setDate(d.getDate()+day);
        document.cookie = `${key}=${encodeURIComponent(value)};expires=${d};path=/`;
    },
    get:function(key){
        let arr = decodeURIComponent(document.cookie).split('; ');
        for(let value of arr){
            let newarr = value.split('=');
            if(key===newarr[0]){
                return newarr[1];
            }
        }
    },
    remove:function(key){
        cookie.set(key,'',-1);
    }
}

export{
    $,
    ajaxpromise,
    cookie
}