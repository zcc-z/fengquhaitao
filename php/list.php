<?php
    header('content-type:html/text;charset=utf-8');
    include './conn.php';

    // 查询数据
    $res = $conn->query("select * from fengqugoods");

    $arr = array();
    for($i=0;$i<$res->num_rows;$i++){
        $arr[$i] = $res->fetch_assoc();
    }

    echo json_encode($arr);
?>