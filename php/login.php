<?php
    header('content:text/html;charset=utf-8');
    include './conn.php';

    if(isset($_POST['name']) && isset($_POST['pass'])){
        $name = $_POST['name'];
        $pass = $_POST['pass'];
        $sql = "select * from reg where username='$name' and password='$pass'";
        $res = $conn->query($sql);
        if($res->fetch_assoc()){
            echo true;
        }else{
            echo false;
        }
    }
?>