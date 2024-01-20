//chat Socket.io

let socket 

let user = sessionStorage.getItem("user") || ""

if (user) {

        document.getElementById("userNombre").innerHTML = user + " :"

        initIo()
} else {

Swal.fire(
    {

        title: 'auth',

        input: 'text',

        text: 'set user name',

        inputValidator: value => {

            return !value.trim() && 'please write an username'
        },

        allowOutsideClick: false,
    })

    .then(result => {

        user = result.value


        sessionStorage.setItem("user", user)

        document.getElementById("userNombre").innerHTML = user + " :"

        initIo()

    })
}

const inputChat = document.getElementById('idChatInput')

inputChat.addEventListener("keyup", event => {

    if (event.key === 'Enter') {
        sendMessage(event.currentTarget.value)
    }
})

document.getElementById('send').addEventListener("click", event => {
    sendMessage(inputChat.value)
    
})

function sendMessage(message) {

    if (message.trim().length > 0) {

        socket.emit("message", {

            user,
            message
        }
        )

        inputChat.value = ""
    }

}

function initIo() {

    socket = io()

    socket.on("logs", messages => {

        const box = document.getElementById("idChatBox")

        let html = ""

        messages.reverse().forEach(msg => {

            html += `<p> <i> ${msg.user}   <i>:   ${msg.message}  </p>`

        })

        box.innerHTML = html

    })
}

