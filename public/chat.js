$(function () {
    //make connection
    var socket = io.connect('192.168.1.4:3000')
    console.log(socket);
    //buttons and inputs
    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")

    //Emit message
    send_message.click(function () {
        console.log(message.val());
        socket.emit('new_message', { message: message.val() })
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    //Emit a username
    send_username.click(function () {
        console.log(username.val());
        socket.emit('change_username', { username: username.val() })
    })

    //Emit typing
    message.bind("keypress", () => {
        console.log(message.val());
        socket.emit('typing')
    })

    //Listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
    })
});