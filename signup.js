import { supabase } from './supabase-client.js'

let Form = document.getElementById("signup-form")

Form.addEventListener('submit', async function (stop) {
    stop.preventDefault()

    let FullName = document.getElementById("full-name").value
    let Email = document.getElementById("signup-email").value
    let Password = document.getElementById("signup-password").value
    let C_password = document.getElementById("confirm-password").value

    if (Password !== C_password) {
        document.getElementById("signup-error").classList.remove("hidden")
        return
    }

    let result = await supabase.auth.signUp({
        email: Email,
        password: Password
    })

    if (result.error) {
        console.log(result.error);
        document.getElementById("signup-error").classList.remove("hidden")
    } else {
        await supabase.from("profiles").insert({
            id: result.data.user.id,
            full_name: FullName
        })

        window.location.href = "login.html"
    }
})