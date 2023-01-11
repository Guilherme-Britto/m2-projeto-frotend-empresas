import { permission, companies } from "./requests.js";


async function avoidPage() {

    const is_admin = await permission

    if (!is_admin) {
        window.location.href = "/"
    }
    else if (!is_admin.is_admin) {
      console.log(is_admin)
      window.location.replace('/src/pages/user.html')
    }
    else return
  }


function logout(){
    const button = document.querySelector(".btn__first")

    button.addEventListener('click', () => {
        console.log(button)
        localStorage.clear()
        window.location.href = "/"
    })
}

logout()
avoidPage()

companies()