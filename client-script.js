var postLength;
var newPosts = false;
// jquery
$(document).ready(function () {
    // populate the user text box with user cookie
    $("#user").val(getCookie("user"));
    // load comment data for new post checking
    jQuery.get('comments.txt?v=1', { now: jQuery.now() }, function (data) {
        postLength = data.length;
        document.getElementById("comments").textContent = data;
    });

    // load in the comments from the text file
    //  $("#comments").load("comments.txt?v=1");
    // fade in discussion panel
    $("#discussion-panel").hide().fadeIn('slow');
    // scroll to bottom of comments
    $('.comment-container').animate({
        scrollTop: 500000
    }, 'fast');

    $("#comment").focus();

    // set a timer function to refresh comments panel
    setInterval(function () {
        // check to see if there are new comments
        jQuery.get('comments.txt?v=1', { now: jQuery.now() }, function (data) {
            // if new comments, then reload and rescroll comment div
            console.log("pinging for new comments: " + (postLength != data.length));
            if ((postLength != data.length)) {
                console.log("Reloading comments...");
                // raw javascript assignment because jquery apparently cant do it reliably
                document.getElementById("comments").textContent = data;
                // $("#comments").load("comments.txt?v=1");
                $('.comment-container').animate({
                    scrollTop: 9999999999
                }, 'fast');
                $("#loader").fadeOut('fast');
            }
            postLength = data.length;
        });
    }, 2500);


    // attempt to make a logged in user list
    // setInterval(function () {
    //     // check to see if there are new comments
    //     jQuery.get('users.txt?v=1', { now: jQuery.now() }, function (data) {

    //         console.log(data);

    //         var array = data.split('\r\n');
    //         for(var i = 0; i < array.length; i++){
    //             var timestamp = array[i].split('-')[1];
    //             var now = Math.round((new Date()).getTime() / 1000);
    //             // console.log("difference: " + (now - timestamp));
    //             if((now - timestamp) > 1400){
    //                 console.log("user " + array[i].split('-')[0] + " just left! ");
    //             }
    //         }

    //     });
    // }, 2500);
    // setInterval(function() {
    //     $.ajax({
    //         type: "POST",
    //         url: "logged-users.php",
    //         cache: false,
    //         data: {
    //             user: $('#user').val()
    //         },
    //         success:function(msg)
    //         {
    //             //console.log the response
    //             console.log(msg);
    //         }
    //     });
    // }, 3000);


    // onclick async submit to send user and comment to server
    $('#asyncsubmit').click(function () {
        // check to see if user or comment fields are blank
        if ($('#user').val() == "" || $('#comment').val() == "") {
             alert("Please enter a user and comment to leave a post!");
        } else {
            // set user cookie from user text box
            setCookie("user", $('#user').val(), 7);
            $.ajax({
                url: 'create-post.php',
                type: 'POST',
                cache: false,
                data: {
                    user: $('#user').val(),
                    comment: $('#comment').val()
                },
                success: function (msg) {
                    $('#comment').val("");
                    $("#comment").focus();
                    $("#loader").hide().fadeIn('slow');
                    // window.location.reload(true);
                }
            });
        }
    });
});

// pure javascript
// cookie parsing copied from W3C
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}