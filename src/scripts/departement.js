import { companies, getDepartmentByCompanie, createDepartment, deleteDepartment, editDepartment, outOfWork } from "./requests.js";


async function renderDepartment(element) {
    
    const ul = document.querySelector(".departments")

    const list = await getDepartmentByCompanie(element)

    ul.innerText = ""
    list.forEach(item => {
        console.log(item)
        const card = createCard(item)

        ul.append(card)

    })

    // modalView()
    modalEdit()
    renderDeleteDepartment()
}

function createCard(element) {
    const li = document.createElement('li')
    const h3 = document.createElement('h3')
    const span = document.createElement('span')
    const span1 = document.createElement('span')
    const div = document.createElement('div')
    const img = document.createElement('img')
    const img1 = document.createElement('img')
    const img2 = document.createElement('img')


    li.classList = "cards"
    h3.innerText = element.description
    span.innerText = element.name
    span1.innerText = element.companies.name

    li.classList = "card"
    img.src = "../assets/VectorEye.svg"
    img1.src = "../assets/VectorEdit.svg"
    img2.src = "../assets/VectorTrash.svg"

    img.id = element.uuid
    img.classList = `viewDepartmentBtn`

    img.addEventListener('click', () => {

        const modal = document.querySelector('.viewDepartmentModal')

        modal.showModal()

        const p = document.querySelector('#descriptionView')
        const span = document.querySelector('#nameView')

        p.innerText = element.description
        span.innerText = element.name

        showOptionsUser()
        hireUser(element.id)
    })

    img1.id = element.uuid
    img1.classList = `editDepartmentBtn ${element.description}`

    img2.id = element.uuid
    img2.classList = "deleteDepartment"

    div.append(img, img1, img2)
    li.append(h3, span, span1, div)

    return li
}

async function showOptions() {

    const list = await companies()

    const select = document.querySelector("#companies")

    list.forEach(element => {

        const option = createOption(element)

        select.appendChild(option)
    })
    renderSelected()
}

function createOption(element) {
    const option = document.createElement('option')

    option.innerText = element.name
    option.value = element.uuid

    return option
}

async function renderSelected() {
    const select = document.querySelector("#companies")

    renderDepartment("")

    select.addEventListener('change', (event) => {

        renderDepartment(event.target.value)
    })
}

function modalCreate() {

    const modal = document.querySelector('.createDepartmentModal')
    const button = document.querySelector('.createDepartmentBtn')

    button.addEventListener('click', () => {

        modal.showModal()
        showOptionsDepartmentModal()
        renderNewDepartment()
    })
}

async function showOptionsDepartmentModal() {

    const list = await companies()

    const select = document.querySelector("#companiesForDepartments")

    list.forEach(element => {

        const option = createOption(element)

        select.appendChild(option)
    })
}

async function renderNewDepartment() {

    const inputs = document.querySelectorAll('.createDepartmentForm > input')
    const button = document.querySelector(".createDepartmentForm > button")
    const select = document.querySelector("#companiesForDepartments")
    const newDepartment = {}

    button.addEventListener("click", async (event) => {
        event.preventDefault()

        inputs.forEach((input) => {

            newDepartment[input.id] = input.value
        })
        newDepartment["company_uuid"] = select.value


        createDepartment(newDepartment)
        return newDepartment
    })

}

async function renderDeleteDepartment() {

    const inputs = document.querySelectorAll('.deleteDepartment')
    inputs.forEach(element => {

        element.addEventListener('click', (event) => {

            deleteDepartment(element.id)
        })

    })

}

function modalEdit() {

    const modal = document.querySelector('.editDepartmentModal')
    const buttons = document.querySelectorAll('.editDepartmentBtn')

    buttons.forEach(element => {

        element.addEventListener('click', () => {

            modal.showModal()

            const input = document.querySelector('#descriptionEdit')

            const description = element.classList.value.slice(18)

            input.value = description
            renderEdit(element.id)
        })
    })
}

async function renderEdit(id) {
    const input = document.querySelector('.editDepartmentForm > input')
    const button = document.querySelector('.editDepartmentForm > button')


    const editDepartmentData = {}

    button.addEventListener("click", async (event) => {
        event.preventDefault()

        editDepartmentData.description = input.value
        editDepartment(editDepartmentData, id)
    })
}

// function modalView(name) {

//     const modal = document.querySelector('.viewDepartmentModal')
//     const buttons = document.querySelectorAll('.viewDepartmentBtn')

//     buttons.forEach(element => {

//         element.addEventListener('click', () => {

//             modal.showModal()

//             const p = document.querySelector('#descriptionView')
//             const span = document.querySelector('#nameView')

//             const description = element.classList.value.slice(18)

//             console.log(span)
//             console.log(name)

//             p.innerText = description
//             span.innerText = name

//             showOptionsUser()
//             hireUser(element.id)
//         })
//     })
// }

async function showOptionsUser() {

    const list = await outOfWork()

    const select = document.querySelector("#companiesView")

    list.forEach(element => {

        const option = createOptionUser(element)

        select.appendChild(option)
    })

}

function createOptionUser(element) {
    const option = document.createElement('option')

    option.innerText = element.username
    option.value = element.uuid

    return option
}

async function hireUser(departmentId){

    const hire = {}

    const select = document.querySelector("#companiesView")

    const button = document.querySelector('.hireBtn')
    console.log(departmentId)

    button.addEventListener('click', (event) =>  {
        event.preventDefault()

        hire["department_uuid"] = departmentId
        hire["user_uuid"] = select.value
 
        console.log(hire)
    })



}


showOptions()
modalCreate()