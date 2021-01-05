$(document).ready(function () {
    $("#login_btn").click(function () {
        console.log("log in button pressed");
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
                if(response == 1){
                    msg = "Login Succesfully";
                }
                else{
                    msg = "Invalid username or password!";
                }
                $("#message").html(response);
            }
        });
    });
    $("#register_btn").click(function () {
        console.log("register button pressed");
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
                if(response == 1){
                    msg = "Regiser Succesfully";
                }
                else{
                    msg = "Regiser Unsuccesfully";
                }
                $("#message").html(response);
            }
        });
    });
});