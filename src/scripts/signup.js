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

function changePages() {
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
        window.location.replace('/src/pages/login.html')

    })

    const button3 = document.querySelector('.modal__btn__signup')

    button3.addEventListener('click', () => {
        window.location.replace('/src/pages/login.html')

    })
}

changePages()
modalLogin()

import { signup } from "./requests.js";

export function renderSignup() {
    const inputs = document.querySelectorAll('form > input')
    const button = document.querySelector("#signupBtn")
    const newUser = {}

    button.addEventListener("click", async (event) => {
        event.preventDefault();
        inputs.forEach((input) => {

        newUser[input.id] = input.value;
        })

        console.log(newUser)
        signup(newUser)
        return newUser
    })

}

renderSignup()

        // newUser = {
        //     username: "kezinho",
        //     password: "1234",
        //     email:"kenzinho@mail.com",
        // }