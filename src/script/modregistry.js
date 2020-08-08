
import{
    $,
    ajaxpromise,
} from './common.js'


let username = $('.username');
let password = $('.password');
let phone = $('.phone'); 
let email = $('.email'); 
let submit = $('.info-submit');
let user = username.nextElementSibling;
let pass = password.nextElementSibling;
let repass = $('.repass');
let repa = repass.nextElementSibling;
let ph = phone.nextElementSibling;
let em = email.nextElementSibling;
let yzm = $('.yzm');
let yz = yzm.nextElementSibling;
let changeyzm = $('.changeyzm');
let arr = [];
// 记录每项的正误
let userflag=false;
let passflag = false;
let repassflag = false;
let phoneflag = false;
let emailflag = false;
let yzmflag = false;
// 验证用户名并判断重名
username.onblur = function(){
    let reg = /^[a-zA-Z][0-9a-zA-Z]{5,12}$/;
    // 验证用户名
    if(reg.test(username.value)){
        ajaxpromise({
            url:'http://10.31.163.84/fengqu/php/registry.php',
            type:'post',
            data:{
                name: username.value,
            }
        }).then(function(data){
            if(data){
                user.innerHTML = '用户名已被占用';
                user.style.color = 'red';
                userflag = false;
            }else{
                user.innerHTML = '用户名可以使用';
                user.style.color = 'green';
                userflag = true;
            }
        })
    }else{
        user.innerHTML = '格式不正确';
        user.style.color = 'red';
        userflag = false;
    }
}
// 验证密码
password.oninput = function(){
    if(password.value.length>=6 && password.value.length <=12){
        let reg1 = /\d+/;
        let reg2 = /[a-z]/;
        let reg3 = /[A-Z]/;
        let reg4 = /[\W\_]/;
        let count = 0;
        if(reg1.test(password.value)){
            count++;
        }
        if(reg2.test(password.value)){
            count++;
        }
        if(reg3.test(password.value)){
            count++;
        }
        if(reg4.test(password.value)){
            count++;
        }
        switch(count){
            case 1:
                pass.innerHTML = '弱';
                pass.style.color = 'red';
                break;
            case 2:
            case 3:
                pass.innerHTML='中';
                pass.style.color = 'orange';
                break;
            case 4:
                pass.innerHTML = '强';
                pass.style.color = 'green';
        }
        passflag = true;
    }else{
        pass.style.color = 'red';
        pass.innerHTML = '密码长度6-12位';
        passflag = false;
    }
}
// 确认密码
repass.onblur = function(){
    if(repass.value!=password.value){
        repa.innerHTML = '两次密码不一致';
        repa.style.color = 'red'; 
        repassflag = false;
    }else{
        repa.innerHTML = '通过验证';
        repa.style.color = 'green'; 
        repassflag = true;
    }
}
// 手机号码
phone.onblur = function(){
    let reg = /^1[3589][0-9]{9}$/;
    if(reg.test(phone.value)){
        ph.innerHTML = '通过验证';
        ph.style.color = 'green';
        phoneflag = true;
    }else{
        ph.innerHTML = '号码格式错误';
        ph.style.color = 'red';
        phoneflag = false;
    }
}
// 验证邮箱
email.onblur = function(){
    let reg =  /^(\w+[+-.]*\w+)\@(\w+\w+)\.(\w+\w+)$/;
    if(reg.test(email.value)){
        em.innerHTML = '通过验证';
        em.style.color = 'green';
        emailflag = true;
    }else{
        em.innerHTML = '格式错误';
        em.style.color = 'red';
        emailflag = false;
    }
}

// 验证码
let yzmarr = [];
for(let i=48;i<=57;i++){
    arr.push(String.fromCharCode(i));
}
for(let i=65;i<=90;i++){
    yzmarr.push(String.fromCharCode(i));
}
for(let i=97;i<=122;i++){
    yzmarr.push(String.fromCharCode(i));
}
yz.onclick = function(){
    let inner = '';
    for(let i=0;i<4;i++){
        let index =  parseInt(Math.random()*yzmarr.length);
        inner += yzmarr[index];
    }
    yz.innerHTML = inner;
}
yz.onclick();
yzm.onblur = function(){
    if(yzm.value==yz.innerHTML){
        changeyzm.style.color = 'green';
        changeyzm.innerHTML = '验证通过';
        yzmflag = true;
    }else{
        changeyzm.style.color = 'red';
        changeyzm.innerHTML = '验证码错误';
        yz.onclick();
        yzm.value = '';
        yzmflag = false;
    }
}


submit.onclick= function(){
    if(userflag && passflag && repassflag && phoneflag && emailflag && yzmflag){
        ajaxpromise({
            url:'http://10.31.163.84/fengqu/php/registry.php',
            type:'post',
            data:{
                name: username.value,
                pass: password.value,
                phone: phone.value,
                email: email.value,
                submit:true
            }
        }).then(function(){
            location.href = 'http://10.31.163.84/fengqu/src/login.html';
        })
    }else{
        alert('数据填写出错，请纠错');
        yz.onclick();
        yzmflag = false;
        yzm.value = '';
    }
    
}
