// import { renderEmpresas, showOptions } from "./index.js";

const requestHeaders = {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
  };


export  async function getEmpresas() {
    const list = await fetch(`http://localhost:6278/companies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          }
    })

    const listJson = await list.json();
    renderEmpresas(listJson)
    return listJson
}

export  async function getSectors() {
    const list = await fetch(`http://localhost:6278/sectors`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          }
    })

    const listJson = await list.json();
    showOptions(listJson)
    // console.log(listJson)
    return listJson
}

export  async function getEmpresasBySector(element) {
    const list = await fetch(`http://localhost:6278/companies/${element}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          }
    })

    const listJson = await list.json();
    renderEmpresas(listJson)
    return listJson
}

export  async function signup(data) {
    console.log(JSON.stringify(data))
    const createUser = await fetch(`http://localhost:6278/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            body: JSON.stringify(data)
          }
    })

    const createUserJson = await createUser.json();
    if (createUserJson.ok) {
      console.log("Foi familia");
    }
    return createUserJson;
}