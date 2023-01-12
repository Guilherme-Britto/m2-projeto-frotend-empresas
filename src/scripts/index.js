import { getEmpresas, getSectors, getEmpresasBySector, permission } from "./requests.js";

async function avoidPage() {

  const is_admin = await permission

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

export async function renderEmpresas(element) {

  const ul = document.querySelector(".companies__container")

  const list = await getEmpresasBySector(element)

  ul.innerText = ""
  list.forEach(element => {
    const card = createCard(element)

    ul.append(card)
  })
}

function createCard(element) {
  const li = document.createElement('li')
  const h2 = document.createElement('h2')
  const p = document.createElement('p')
  const span = document.createElement('span')
  const div = document.createElement('div')

  li.classList = "companies__div"
  h2.innerText = element.name
  p.innerText = element.opening_hours
  span.innerText = element.sectors.description

  div.append(h2, p, span)
  li.append(div)

  return li
}

async function showOptions() {

  const list = await getSectors()

  const select = document.querySelector("#sectors__companies")

  list.forEach(element => {
    const option = createOption(element)

    select.appendChild(option)
  })
  renderSelected()
}

function createOption(element) {
  const option = document.createElement('option')

  option.innerText = element.description
  option.value = element.description

  return option
}

async function renderSelected() {
  const select = document.querySelector("select")

  renderEmpresas("")

  select.addEventListener('change', (event) => {

    renderEmpresas(event.target.value)
  })
}

function changePages() {
  const button = document.querySelector('.header__btn__login')

  button.addEventListener('click', () => {
    window.location.replace('/src/pages/login.html')

  })

  const button1 = document.querySelector('.modal__btn__login')

  button1.addEventListener('click', () => {
    window.location.replace('/src/pages/login.html')

  })

  const button2 = document.querySelector('.header__btn__signup')

  button2.addEventListener('click', () => {
    window.location.replace('/src/pages/signup.html')

  })

  const button3 = document.querySelector('.modal__btn__signup')

  button3.addEventListener('click', () => {
    window.location.replace('/src/pages/signup.html')

  })
}

function modalLogin() {
  const modal = document.querySelector('.login__modal')
  const button = document.querySelector('#vector')
  const dialog = document.querySelector('dialog')


  button.addEventListener('click', () => {

    modal.showModal()

    button.src = './src/assets/VectorX.svg'
  })


  dialog.addEventListener('click', (event) => {
    if (event.target.nodeName === 'DIALOG') {

      button.src = './src/assets/Vector.svg'

      dialog.close();
    }
  })
}

modalLogin()
showOptions()
changePages()