import { getAllUsers, editUser, deleteUser, getDepartmentByCompanie } from "./requests.js";

async function renderUser() {


    const ul = document.querySelector(".users")

    const list = await getAllUsers()

    ul.innerText = ""
    list.forEach(async element => {

        const card = await createCard(element)

        ul.append(card)
    })
}

async function createCard(element) {
    const li = document.createElement('li')
    const h3 = document.createElement('h3')
    const span = document.createElement('span')
    const span1 = document.createElement('span')
    const div = document.createElement('div')
    // const img = document.createElement('img')
    const img1 = document.createElement('img')
    const img2 = document.createElement('img')

    img1.addEventListener('click', () => {

        const modal = document.querySelector('.editUserModal')

        modal.showModal()

        renderEditUser(element.uuid)
    })
    img2.addEventListener('click', () => {

        const modal = document.querySelector('.deleteUserModal')

        modal.showModal()

        const h3 = document.querySelector('.deleteUserForm > h3')

        h3.innerText = `Realmente deseja remover o Usuário ${element.username}`

        renderDeleteUser(element.uuid)
    })


    li.classList = "cards"
    h3.innerText = element.username
    span.innerText = element.professional_level

    const departmentsList = await getDepartmentByCompanie("")
    const department = departmentsList.find(function(item){
        if(item.uuid == element.department_uuid)

        return item
    })
    if (element.department_uuid == undefined) {
        span1.innerText = "Não contratado"
    } else {
        span1.innerText = department.companies.name
    }

    li.classList = "card"
    img1.src = "../assets/VectorEdit.svg"
    img2.src = "../assets/VectorTrash.svg"

    div.append(img1, img2)
    li.append(h3, span, span1, div)

    return li
}

async function renderEditUser(id) {

    const selects = document.querySelectorAll('.editUsertForm > select')
    const button = document.querySelector('.editUsertForm > button')

    const editUserData = {}

    button.addEventListener("click", async (event) => {
        event.preventDefault()
        selects.forEach((element) => {

            editUserData[element.id] = element.value

        })

        editUser(editUserData, id)
    })
}

async function renderDeleteUser(id) {

    const button = document.querySelector('.deleteUserForm > button')

    button.addEventListener("click", async (event) => {
        event.preventDefault()

        deleteUser(id)
    })
}




renderUser()
