import { companies, getDepartmentByCompanie, createDepartment, deleteDepartment } from "./requests.js";


async function renderDepartment(element) {

    const ul = document.querySelector(".departments")

    const list = await getDepartmentByCompanie(element)

    ul.innerText = ""
    list.forEach(item => {
        const card = createCard(item)

        ul.append(card)
        renderDeleteDepartment()

    })
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

showOptions()
modalCreate()