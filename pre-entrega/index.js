console.log("Iniciando el programa...")
const url_API = "https://fakestoreapi.com"

const argumentos = process.argv.slice(2)

const argumentos_validos = ["GET", "POST", "PUT", "DELETE"]

console.log(argumentos) 

async function programa_principal(argumentos) {
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
                    })
                }catch(error){
                    console.log(error)
                    break
                }
            }
    }
}

programa_principal(argumentos)