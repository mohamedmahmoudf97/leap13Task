<?php
    // $post_file = "http://nilepromotion.com/abanob/wp-content/uploads/2019/07/Akon-Lonely.mp3";
    $file_name = $_GET['file_name'] ;
    header('Content-Description: File Transfer');
    header('Content-Type: application/mp3');
    header('Expires: 0');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Pragma: public');
    header("Content-type: application/".basename($file_name));
    header("Accept-Ranges: bytes");
    header("Content-Disposition: attachment; filename=".basename($file_name));
    header("Content-Transfer-Encoding: Binary"); 


    ob_clean();
    flush();



    // $ch = curl_init( $post_file);
    // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    // $response = curl_exec($ch);
    // curl_close($ch);
    // file_put_contents(
    //     basename($post_file),
    //     $response
    // );


    // // script to download  mp3 songs
    // ob_end_clean();
    // readfile($post_file);
    // $file_name = $_GET['filename'];
    // $file_url = 'http://path_to_audio_folder.com/' . $file_name;
    // header('Content-Type: application/octet-stream');
    // header("Content-disposition: attachment; filename=\"".$file_name."\""); 
    readfile($file_name);
    exit;
    echo(json_encode(array('message'=>'done','data'=>$file_name ) ))

    ?>