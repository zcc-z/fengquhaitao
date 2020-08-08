<?php
    header("content-type:text/html;charset=utf-8");
    // 1、利用php操作数据库
    // new mysqli(主机名，用户名，密码，数据库的名称)；
   define('HOST','localhost');
   define('USERNAME','root');
   define('PASSWORD','root');
   define('DBNAME','mydb2004');

   $conn  = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
    // @ 容错处理 ，让错误信息不显示
    if($conn->connect_error){
        die('数据库连接失败'.$conn->connect_error);
    }
    // $conn->close();
?>