import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  'https://adjnbxmurtwfykpfthei.supabase.co',
  'sb_publishable_WGnKsKQ2RiZDYae8ohc5GA_xXjCStUg'
)


let Form = document.getElementById("form")

Form.addEventListener('submit', async (stop) => {
    stop.preventDefault()


    let Email = document.getElementById("email").value
    let Password = document.getElementById("password").value

    let result = await supabase.auth.signInWithPassword({
        email: Email,
        password: Password
    })

    if (result.error) {
        console.log(result.error);
        document.getElementById("login-error").classList.remove("hidden")
    } else {
        window.location.href = "index.html"
    }




})