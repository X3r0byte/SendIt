<?php
$user = stripslashes($_POST['user']);
$post =  $user . "\r";
$date = date_create();
$timestamp = date_timestamp_get($date);

$myfile = file_get_contents("users.txt");

if (strpos($myfile, $user) !== false) {
    // it is there
}
else{
    // it is not there
     file_put_contents("users.txt", $user . "-" . $timestamp . "\r\n", FILE_APPEND);
}
// file_put_contents("users.txt", $myfile . " ", FILE_APPEND);
// refer back to page if not using async with ajax post methods
// header('Location: ' . $_SERVER['HTTP_REFERER']);
?>