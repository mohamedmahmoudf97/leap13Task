<?php
include_once('db_connection.php');
class User extends DbConnection{
    public function __construct(){
        parent::__construct();
    }
    public function check_login($username, $password){
        $sql = "SELECT * FROM `users` WHERE `username` = '$username' AND `password` = '$password'";
        $query = $this->connection->query($sql);
        if ($query) {
            if($query->num_rows > 0){
                $row = $query->fetch_array();
                return $row['id'];
                }else{
                    return false;
                    }
            }else{
                return false;
        }
    }
}