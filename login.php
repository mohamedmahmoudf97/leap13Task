<?php
include_once('User.php');
$user = new User();
if(isset($_POST['user_name']) && isset($_POST['password']) ){
    $user_name = $_POST['user_name'];
    $password  = $_POST['password'];
    $check = $user->check_login($user_name,$password);
    if ($check) {
        echo json_encode(array(
            'connection'=>true,
            'login' => true,
        ));
    }else{
        echo json_encode(array(
            'connection'=>true,
            'login' => FALSE,
        ));
    }
}
