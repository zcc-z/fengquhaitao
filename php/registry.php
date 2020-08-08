<?php
    header('content-type:text/html;charset=utf-8');
    include('./conn.php');
    // 判断用户名是否重复
    if(isset($_POST['name'])){
        $name = $_POST['name'];
        $res = $conn->query("select * from reg where username='$name'");
        if($res->fetch_assoc()){
            echo  true;
        }else{
            echo false;
        }
    }

    // 插入数据库
    if(isset($_POST['submit'])){
        $name = $_POST['name'];
        $pass = $_POST['pass'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        $conn ->query("insert reg values(null,'$name','$pass','$phone','$email')");
        // header("location:http://localhost/fengqu/src/login.html");
    }
?>