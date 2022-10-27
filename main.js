//forma 1
/* const URL = 'https://api.thedogapi.com/v1/images/search?limit=3&page=2';*/


//forma 2
/* querystring = [
    '?',
    'limit=3',
    '&order=Desc',
].join('');

const URL = `https://api.thecatapi.com/v1/images/search${querystring}`; */

const spanErro = document.getElementById("rnadomMichisError")
const API_URL_KEY = "live_L4trDPWbVw3jAksPTYyMDwIqB3xR9ETrGUwdd3tZ7V3InBUaICBJ8ORo1ipK4Sfu";

const API_URL_RANDOM = [
    'https://api.thecatapi.com/v1/images/search',
    '?order=Desc',
    '&limit=3'
].join('');

const API_URL_FAVOURITIES = [
    'https://api.thecatapi.com/v1/favourites',
    '?order=Desc'
].join('');

const API_URL_UPLOAD = [
    'https://api.thecatapi.com/v1/images/upload'
].join('');

const API_URL_DELETE = (id) => [
    'https://api.thecatapi.com/v1/favourites/',
    `${id}`
].join('');
    
const api = axios.create({
    baseURL: "https://api.thecatapi.com/v1"
});
api.defaults.headers.common["X-API-KEY"] = API_URL_KEY

const span = document.getElementById("uploadingForm");
span.style.display = "none"


const spinner = document.getElementById("spin");
spinner.style.display= "none"

//forma 3 
async function reloadRandomMichis() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log("random")
    console.log(data)
    if(res.status !== 200){
        spanErro.innerHTML = "Hubo un error: " + res.status;
    }else{
        const img = document.querySelector('#img');
        const img1 = document.querySelector('#img1');
        const img2 = document.querySelector('#img2');
        const btn1 = document.getElementById("btn-1");
        const btn2 = document.getElementById("btn-2");
        const btn3 = document.getElementById("btn-3");
        
        img.src = data[0].url;
        img1.src = data[1].url;
        img2.src = data[2].url;

        btn1.onclick = () => saveFavouriteMichis(data[0].id)
        btn2.onclick = () => saveFavouriteMichis(data[1].id)
        btn3.onclick = () => saveFavouriteMichis(data[2].id)
    }
}

async function reloadFavoritesMichis() {
    const res = await fetch(API_URL_FAVOURITIES, {
        method: "GET",
        headers: {
            "X-API-KEY": API_URL_KEY
        }
    });
    const data = await res.json();
    console.log("favoritos")
    console.log(data)
    if(res.status !== 200){
        spanErro.innerText = "Hubo un error: " + res.status + data.message;
    }else {
        const favoritesMichis = document.getElementById("favorites");
        favoritesMichis.innerHTML = "";

        data.forEach(michi => {
            const article = document.createElement("article");
            const img = document.createElement("img");
            const btn = document.createElement("button");
            const btnText = document.createTextNode("Sacar el michi de favoritos");

            btn.appendChild(btnText);
            img.src = michi.image.url;
            btn.onclick = () => deleteFavouriteMichi(michi.id);
            article.appendChild(img);
            article.appendChild(btn);
            favoritesMichis.appendChild(article);   
            
        });
    }
}

async function saveFavouriteMichis(id){

    //usando la librearia de AXIOS
    const { data, status } = await api.post("/favourites", {
        image_id: id
    })


    //usando Fetch
    /* const res = await fetch(API_URL_FAVOURITIES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_URL_KEY
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    const data = await res.json();

    console.log("michi")
    console.log(res)*/


    if(status !== 200){
        spanErro.innerText = "Hubo un error: " + status + data.message;
    }else{
        console.log("Michi guardado en favoritos")
        reloadFavoritesMichis()
    }
};

async function deleteFavouriteMichi(id){
    const res = await fetch(API_URL_DELETE(id), {
        method: "DELETE",
        headers: {
            "X-API-KEY": API_URL_KEY
        }
    });
    const data = await res.json();

    
    if(res.status !== 200){
        spanErro.innerText = "Hubo un error: " + res.status + data.message;
    }else {
        console.log("Michi eliminado de favoritos");
        reloadFavoritesMichis();
    }
};
const bottonSubmit = document.getElementById("bottonSubmit")
const file = document.getElementById("file");
const label = document.querySelector(".label");

function spiner(){
    const subeMichi = document.querySelector(".uploadMichiText");
    
    subeMichi.addEventListener("click", function(){
        swal("Advertencia!", "Solo puedes subir fotos que contengan un Michi, de lo contrario el algoritmo no lo subira!");
        span.style.display = "flex"
        bottonSubmit.disabled = true

    })
}
spiner()


bottonSubmit.addEventListener("click", ()=> {
    bottonSubmit.style.display = "none"
    file.style.display = "none"
    michiUp.style.display = "none"
    label.style.display = "none"
    spinner.style.display = "flex"

});

async function uploadMichiPhoto(){

    const form = document.getElementById("uploadingForm");
    const formData = new FormData(form);

    console.log(formData.get('file'))

    const res = await fetch(API_URL_UPLOAD, {
        method: "POST",
        headers: {
            //"Content-Type": "multipart/form-data",
            "X-API-KEY": API_URL_KEY
        },
        body: formData
    })
    const data = await res.json();

    if (res.status !== 201) {
        console.log(`Hubo un error al subir michi: ${res.status} ${data.message}`)
        swal('Random Cats', 'Lo sentimos, no pudimos subir tu Michi! ☹', 'error')

    }
    else {
        swal('Random Cats', 'Foto del Michi subida! 😀🥳🎉', 'success');
        spinner.style.display = "none"
        bottonSubmit.style.display = "flex"
        file.style.display = "flex"
        michiUp.style.display = "flex"
        label.style.display = "flex"

        console.log({ data });
        console.log(data.url);
        saveFavouriteMichis(data.id) //para agregar el michi cargado a favoritos.
    }
};



//para ver el preview de la imagen a subir
const imageUp = document.getElementById('file');
const michiUp = document.getElementById('michiUp');
michiUp.style.display = "none"
imageUp.onchange = evt => {
    const [file] = imageUp.files
    if (file) {
        michiUp.style.display = "block"
        michiUp.src = URL.createObjectURL(file)
        bottonSubmit.disabled = false
        
    }
}

reloadRandomMichis()
reloadFavoritesMichis()
/* fetch(URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector("img")
        img.src = data[0].url
})*/