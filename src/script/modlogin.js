import{
    $,
    ajaxpromise,
    cookie
} from './common.js';

let user = $('.username');
let pass = $('.password');
let submit = $('.info-submit');
let rem = $('.check');


if(cookie.get('username')){
    user.value = cookie.get('username');
    if(cookie.get('password')){
        pass.value = cookie.get('password');
    }
}
rem.checked = 'checked';
submit.onclick = function(){
    ajaxpromise({
        type:'post',
        url:'http://10.31.163.84/fengqu/php/login.php',
        data:{
            name: user.value,
            pass: pass.value
        }
    }).then(function(data){
        if(data){
            if(rem.checked){
                cookie.set('username',user.value,7);
                cookie.set('password',pass.value,7);
            }else{
                cookie.set('username',user.value,7);
                cookie.remove('password');
            }
            document.cookie = `iflogin=true;path=/`;
            location.href = 'http://10.31.163.84/fengqu/src/index.html'
        }else{
            alert('用户名或者密码错误');
        }
    })
}