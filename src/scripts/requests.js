

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
    if (!token) {
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

        window.location.replace('/src/pages/login.html')
    }
    return loginUserJson;
}

export async function companies() {

    const list = await fetch(`http://localhost:6278/companies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        }
    })

    const listJson = await list.json();

    return listJson
}

export async function getDepartmentByCompanie(element) {

    const list = await fetch(`http://localhost:6278/departments/${element}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    const listJson = await list.json();
    return listJson
}

export async function getAllUsers() {

    const list = await fetch(`http://localhost:6278/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })


    const listJson = await list.json();

    return listJson
}

export async function createDepartment(data) {
    const newDepartment = await fetch(`http://localhost:6278/departments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    })

    if (newDepartment.ok) {

        window.location.replace('/src/pages/admin.html')
        }

    return newDepartment;
}

export async function deleteDepartment(uuid) {

    const deletedDepartment = await fetch(`http://localhost:6278/departments/${uuid}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    if (deletedDepartment.ok) {

    window.location.replace('/src/pages/admin.html')
    }
    
    return deletedDepartment;
}

export async function editDepartment(data, id) {

    const editedDepartment = await fetch(`http://localhost:6278/departments/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    })

    if (editedDepartment.ok) {

        window.location.replace('/src/pages/admin.html')
        }

    return editedDepartment;
}

export async function outOfWork() {

    const list = await fetch(`http://localhost:6278/admin/out_of_work`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    const listJson = await list.json();

    return listJson
}