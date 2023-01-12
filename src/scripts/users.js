import { getAllUsers } from "./requests.js";

async function renderUser() {


    const ul = document.querySelector(".users")

    const list = await getAllUsers()

    ul.innerText = ""
    list.forEach(element => {

        const card = createCard(element)

        ul.append(card)
    })
}

function createCard(element) {
    const li = document.createElement('li')
    const h3 = document.createElement('h3')
    const span = document.createElement('span')
    // const span1 = document.createElement('span')
    const div = document.createElement('div')
    const img = document.createElement('img')
    const img1 = document.createElement('img')
    const img2 = document.createElement('img')


    li.classList = "cards"
    h3.innerText = element.username
    span.innerText = element.professional_level
    // span1.innerText = element.description

    li.classList = "card"
    img.src = "../assets/VectorEye.svg"
    img1.src = "../assets/VectorEdit.svg"
    img2.src = "../assets/VectorTrash.svg"

    div.append(img, img1, img2)
    li.append(h3,span,div)

    return li
}

renderUser()