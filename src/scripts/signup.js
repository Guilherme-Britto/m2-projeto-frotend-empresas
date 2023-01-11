import { signup, token, validateUser} from "./requests.js";

function modalLogin() {
    const modal = document.querySelector('.login__modal')
    const button = document.querySelector('#vector')
    const dialog = document.querySelector('dialog')


    button.addEventListener('click', () => {

        button.src = '../assets/VectorX.svg'
        modal.showModal()
    })


    dialog.addEventListener('click', (event) => {
        if (event.target.nodeName === 'DIALOG') {

            button.src = '../assets/Vector.svg'
            dialog.close()
        }
    })
}

function changePages() {
    const button = document.querySelector('.header__btn__login')

    button.addEventListener('click', () => {
        window.location.href = "/"

    })

    const button1 = document.querySelector('.modal__btn__login')

    button1.addEventListener('click', () => {
        window.location.href = "/"

    })

    const button2 = document.querySelector('.header__btn__signup')

    button2.addEventListener('click', () => {
        window.location.replace('/src/pages/login.html')

    })

    const button3 = document.querySelector('.modal__btn__signup')

    button3.addEventListener('click', () => {
        window.location.replace('/src/pages/login.html')

    })

    const button4 = document.querySelector('#home')

    button4.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = "/"

    })
}

async function avoidPage() {

    const is_admin = await validateUser(token)

    if (!is_admin) {
        return is_admin
    }
    else if (!is_admin.is_admin) {
        console.log(is_admin)
        window.location.replace('/src/pages/user.html')
    }
    else {
        window.location.replace('/src/pages/admin.html')
    }
}

avoidPage()

changePages()
modalLogin()

export function renderSignup() {
    const inputs = document.querySelectorAll('form > input')
    const button = document.querySelector("#signupBtn")
    const select = document.querySelector("#professional_level")
    const newUser = {}

    button.addEventListener("click", async (event) => {
        event.preventDefault()
        inputs.forEach((input) => {

            newUser[input.id] = input.value
        })

        newUser[select.id] = select.value

        // console.log(newUser)
        signup(newUser)
        return newUser
    })

}

renderSignup()
