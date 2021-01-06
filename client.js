$(document).ready(function () {
    $("#login_btn").click(function () {
        console.log("log in pressed");
        let username = $("#username").val().trim();
        let password = $("#password").val().trim();
        $.ajax({
            url:'http://localhost:3000/user/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type:"POST",
            dataType: 'json',
            data: { username:username, password:password },
            success: function(response){
                console.log(response);
                var msg = "";
                if(parseInt(response.status) <= 299){
                    msg = "Login Succesfully";
                    $("#logout_btn").show();
                    $('#login_btn').hide();
                }
                else{
                    msg = "Incorrect username or password!";
                }
                $("#login_message").html(msg);
            }
        });
    });
    $("#register_btn").click(function () {
        console.log("register pressed");
        let username = $("#register_username").val().trim();
        let password = $("#register_password").val().trim();
        let email = $("#register_email").val().trim();
        let fullname = $("#register_fullname").val().trim();
        $.ajax({
            url:'http://localhost:3000/user/register',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type:"POST",
            dataType: 'json',
            data: { username:username, password:password, email: email, fullname: fullname },
            success: function(response){
                console.log(response);
                var msg = "";
                if(parseInt(response.status) <= 299){
                    msg = "Register Succesfully";
                }
                else{
                    msg = "Register Unsuccesfully";
                }
                $("#register_message").html(msg);
            }
        });
    });

    $("#logout_btn").click(function () {
        console.log("logout pressed");
        $.ajax({
            url:'http://localhost:3000/user/logout',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type:"GET",
            dataType: 'json',
            // data: { username:username, password:password, email: email, fullname: fullname },
            success: function(response){
                console.log(response);
                var msg = "";
                // if(parseInt(response.status) <= 299){
                //     msg = "Logout Succesfully";
                //     $("#logout_btn").hide();
                //     $('#login_btn').show();
                // }
                // else{
                //     msg = "Logout Unsuccesfully";
                // }
                // $("#login_message").html(msg);
            }
        });
    });
});