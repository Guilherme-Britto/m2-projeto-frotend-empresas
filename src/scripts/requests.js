// import { renderEmpresas } from "./index.js";

const requestHeaders = {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
};

export function getUser() {
    const user = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))

    return user
}

export const { token } = getUser() || ""

export async function validateUser(data) {
    if(!token){
        return token
    }
    const validated = await fetch(`http://localhost:6278/auth/validate_user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data}`,
        }
    })

    const validatedJson = await validated.json();
    // console.log(validatedJson)
    return validatedJson
}

export const permission = await validateUser(token)

export async function getEmpresas() {
    const list = await fetch(`http://localhost:6278/companies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        }
    })

    const listJson = await list.json();
    // renderEmpresas(listJson)
    return listJson
}

export async function getSectors() {
    const list = await fetch(`http://localhost:6278/sectors`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        }
    })

    const listJson = await list.json();
    // showOptions(listJson)
    // console.log(listJson)
    return listJson
}


export async function getEmpresasBySector(element) {

    const list = await fetch(`http://localhost:6278/companies/${element}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        }
    })

    const listJson = await list.json();
    return listJson
}

export async function signup(data) {

    const createUser = await fetch(`http://localhost:6278/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    const createUserJson = await createUser.json();
    if (createUser.ok) {
        console.log("Cadastro realizado");
        window.location.replace('/src/pages/login.html')
    }
    return createUserJson;
}

export async function login(data) {
    const loginUser = await fetch(`http://localhost:6278/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    const loginUserJson = await loginUser.json();
    localStorage.setItem('@kenzieEmpresas:token', JSON.stringify(loginUserJson))
    if (loginUser.ok) {

        console.log(loginUserJson)
        window.location.replace('/src/pages/login.html')
    }
    return loginUserJson;
}

export async function companies(){

    const list = await fetch(`http://localhost:6278/companies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        }
    })

    const listJson = await list.json();
    console.log(listJson)
    return listJson
}