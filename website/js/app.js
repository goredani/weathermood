// API variables

let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&appid=036f458cba6d33bad05e4ba4d663d980";
const metric = "&units=metric"

// Event listener for the click

document.getElementById('generate').addEventListener('click', performAction);

// Getting the data from the website, merging, sending and updading the UI

function performAction(e) {
    const zip = document.getElementById('zip').value;
    const mood = document.getElementById('feelings').value;
    getWeather(baseURL, zip, apiKey, metric, mood)
    .then(function(data){
        let temp = data.main.temp;
        let d = new Date();
        let date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
        console.log(zip, date, temp, mood);
        postData('/addWeather', {name: zip, time: date, temp: temp, mood: mood})
        .then(
            updateUI()
        )
    })
    
}

// Retrieveing the weather data from the API

const getWeather = async (baseURL, zip, key, metric) => {
    const res = await fetch(baseURL+zip+key+metric) 
    try {
    const data = await res.json();
    return data;   
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

// Posting the data to the server

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
}

// Getting all the data from the server and posting it to the UI

const updateUI = async () => {
    const request = await fetch('/all');
    try{
    const allData = await request.json();
    let lastPost = allData.length - 1;
    
    let card = document.createElement("div");
    card.classList.add("card");
    let text = document.createElement("div");
    text.innerHTML = `<div><span class="temp">${allData[lastPost].temp}°c </span>
                    </div>
                    <div>
                    ${allData[lastPost].time}<br>
                    ${allData[lastPost].mood}
                    </div>`;
    card.appendChild(text);
    let entryHolder = document.getElementById("entryHolder");
    entryHolder.appendChild(card);
     
    }catch(error){
        console.log("error", error);
    }
   
}

