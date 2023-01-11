import { login, token, validateUser } from "./requests.js";

function modalLogin() {
  const modal = document.querySelector('.login__modal')
  const button = document.querySelector('#vector')
  const dialog = document.querySelector('dialog')


  button.addEventListener('click', () => {

    modal.showModal()
    button.src = '../assets/VectorX.svg'
  })


  dialog.addEventListener('click', (event) => {
    if (event.target.nodeName === 'DIALOG') {

      button.src = '../assets/Vector.svg'
      dialog.close();
    }
  })
}

async function changePages() {

  const button = document.querySelector('.header__btn__login')

  button.addEventListener('click', () => {
    window.location.href = "/";

  })

  const button1 = document.querySelector('.modal__btn__login')

  button1.addEventListener('click', () => {
    window.location.href = "/";

  })

  const button2 = document.querySelector('.header__btn__signup')

  button2.addEventListener('click', () => {
    window.location.replace('/src/pages/signup.html')
  })

  const button3 = document.querySelector('.modal__btn__signup')

  button3.addEventListener('click', () => {
    window.location.replace('/src/pages/signup.html')
  })

  const button4 = document.querySelector('#signup')

  button4.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.replace('/src/pages/signup.html')
  })
}

async function avoidPage() {
  const is_admin = await validateUser(token)
  console.log(is_admin)
  if (!is_admin.is_admin){
    console.log(is_admin)
    window.location.replace('/src/pages/user.html')

  }
}

changePages()
modalLogin()



export function renderlogin() {
    const inputs = document.querySelectorAll('form > input')
    const button = document.querySelector("#loginBtn")
    const lognData = {}

    button.addEventListener("click", async (event) => {
        event.preventDefault();
        inputs.forEach((input) => {

          lognData[input.id] = input.value
        })

        // console.log(lognData)
        login(lognData)
        return lognData
    })
}

renderlogin()