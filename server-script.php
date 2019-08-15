<?php
// set TZ
date_default_timezone_set("America/Chicago");
// gather post data
$datetime = date("m/d") . " " . date("h:ia");
$comment = stripslashes($_POST['comment']);
$user = stripslashes($_POST['user']);
// construct post
$post = "\r" . " " . $user . " @ " . $datetime . " » " . $comment . "\r";
// if no user or comment
if (empty($comment) || empty($user)){
    // nothing
}
// else append the post to the comments file
else
{
    file_put_contents("comments.txt", $post, FILE_APPEND);
}
// refer back to page if not using async with ajax post methods
// header('Location: ' . $_SERVER['HTTP_REFERER']);
?>