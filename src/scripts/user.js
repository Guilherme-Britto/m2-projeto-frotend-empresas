import { permission, getUserInfo, editUserOwn, getCoworkers ,getUserCompainieDepartments } from "./requests.js";

async function avoidPage() {

    const is_admin = await permission

    if (!is_admin) {
        window.location.href = "/"
    }
    else if (is_admin.is_admin) {
        window.location.replace('/src/pages/admin.html')
    }
    else return
}

function logout() {
    const button = document.querySelector(".btn__first")

    button.addEventListener('click', () => {
        localStorage.clear()
        window.location.href = "/"
    })
}

async function renderUserInfo(info) {

    const section = document.querySelector(".userInfo__container")

    const userInfo = await getUserInfo()

    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    const div = document.createElement('div')
    const span = document.createElement('span')
    const span1 = document.createElement('span')
    const span2 = document.createElement('span')

    img.src = "../assets/VectorEditBlue.svg"

    h2.innerText = userInfo.username
    span.innerText = userInfo.email
    span1.innerText = userInfo.professional_level
    span2.innerText = userInfo.kind_of_work

    img.addEventListener('click', () => {

        const modal = document.querySelector(".editUserModal")

        modal.showModal()

        renderEditedUser()
    })

    div.append(span, span1, span2)

    section.append(img, h2, div)
}

async function renderEditedUser (){

    const inputs = document.querySelectorAll(".editUserForm > input")

    const button = document.querySelector(".editUserForm > button")

    const editedUser = {}

    button.addEventListener('click', () =>{

        inputs.forEach(input => {

            editedUser[input.id] = input.value
        })
    
        editUserOwn(editedUser)
    })
}

async function renderCoworkers() {

    const list = await getCoworkers()
    const userInfo = await getUserInfo()
    const section = document.querySelector(".coworkers__container")

    if(!userInfo.department_uuid){
        section.innerHTML = ""
        const p = document.createElement('p')
        p.innerText = "Você ainda não foi contratado"

        return section.append(p)
    }
    const coworkersList = list[0].users
    const ul = document.querySelector(".coworkers__list")

    coworkersList.forEach(element => {

        const card = createCoworkerCard(element)

        ul.appendChild(card)
    })

    const div = document.querySelector(".companieInfo")
    const h2 = document.createElement('h2')

    const departmentsList = await getUserCompainieDepartments()

    h2.innerText = `${departmentsList.name} - ${list[0].name}`

    div.append(h2)
}

function createCoworkerCard(element) {

    const li = document.createElement('li')
    const span1 = document.createElement('span')
    const span2 = document.createElement('span')

    li.classList = "coworker__card"
    span1.classList = "spanName"

    span1.innerText = element.username
    span2.innerText = element.professional_level

    li.append(span1, span2)
    return li
}

logout()
avoidPage()
renderUserInfo()
renderCoworkers()