console.log("Iniciando el programa...")
const url_API = "https://fakestoreapi.com"

const argumentos = process.argv.slice(2)

const argumentos_validos = ["GET", "POST", "PUT", "DELETE"]

console.log(argumentos) 

async function programa_principal(argumentos = []) {
    if (!argumentos[0] in argumentos_validos){
        console.log("Comando incorrecto")
        return
    }
    switch (argumentos[0]){
        case "GET":
            if (!argumentos[1].includes("/") && argumentos[1] == "products"){
                try{
                    const response = await fetch(`${url_API}/products`, {
                        method: "GET"
                    })
                    if (response.status !== 200){
                        throw new Error("Falla en la solicitud")
                        break
                    }
                    const data = await response.json()
                    data.forEach(element => {
                        console.log(element)
                    });
                    break
                }catch(error){
                    console.log(error)
                    break
                } 
            }else if (argumentos[1].includes("/") && argumentos[1].includes("products")) {
                let id_sin_separar = argumentos[1].split("/")
                try{
                    const id = parseInt(id_sin_separar[1])
                    const response = await fetch(`${url_API}/products/${id}`,{
                        method: "GET"
                    })
                    if (response.status !== 200){
                        throw new Error("Error en la solicitud")
                        break;
                    }
                    const data = await response.json()
                    console.log(data)
                    break;
                }catch(error){
                    console.log(error)
                    break
                }
            }else{
                console.log("Comando incorrecto")
                break
            }
        case "POST":
            if(argumentos.length == 5 && argumentos[1] == "products"){
                const [ , , nombre, precio, categoria] = argumentos
                const response = await fetch(`${url_API}/products`,{
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            nombre: nombre,
                            precio: precio,
                            categoria: categoria
                        }
                    )
                })
                if (!response.ok){
                    throw new Error("Error en la solicitud")
                }
                const data = await response.json()
                console.log(data)
                break;
            }else{
                console.log("solicitud incompleta")
                break;
            }
        case "DELETE":
            if(argumentos[1].includes("/") && argumentos[1].includes("products")){
                let id_sin_separar = argumentos[1].split("/")
                try{
                    const id = parseInt(id_sin_separar[1])
                    const response = await fetch(`${url_API}/products/${id}`,{
                        method: "DELETE"
                    })
                    if (!response.ok){
                        throw new Error("Error en la solicitud")
                        break;
                    }
                    const data = await response.json()
                    console.log(data)
                    break;
                }catch(error){
                    console.log(error)
                    break
                }
            }else{
                console.log("solicitud incorrecta")
            }
    }
}

programa_principal(argumentos)