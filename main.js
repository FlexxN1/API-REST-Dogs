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
const API_URL_KEY = "api_key=live_L4trDPWbVw3jAksPTYyMDwIqB3xR9ETrGUwdd3tZ7V3InBUaICBJ8ORo1ipK4Sfu";

const API_URL_RANDOM = [
    'https://api.thecatapi.com/v1/images/search',
    '?order=Desc',
    '&limit=3'
].join('');

const API_URL_FAVOURITIES = [
    'https://api.thecatapi.com/v1/favourites',
    '?order=Desc',
    '&limit=3',
    `&${API_URL_KEY}`
].join('');


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
        
        img.src = data[0].url;
        img1.src = data[1].url;
        img2.src = data[2].url;
    }
}

async function reloadFavoritesMichis() {
    const res = await fetch(API_URL_FAVOURITIES);
    const data = await res.json();
    console.log("favoritos")
    console.log(data)
    if(res.status !== 200){
        spanErro.innerText = "Hubo un error: " + res.status + data.message;
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