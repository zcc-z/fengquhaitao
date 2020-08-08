<?php
    header('content-type:text/html;charset=utf-8');
    include './conn.php';
    if(isset($_GET['sid'])){
        $sid  = $_GET['sid'];
        $res = $conn->query("select * from fengqugoods where sid='$sid'");
        if($res->num_rows){
            echo json_encode($res->fetch_assoc());
        }
    }
?>