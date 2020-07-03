// /* Global Variables */
const zip     = document.getElementById('zip');
const feeling = document.getElementById('feelings');

const entry = document.getElementById('entryHolder');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// // Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// OpenWeatherApi configuration
let baseURL = 'https://api.openweathermap.org/data/2.5/weather';
let apiKey  = '5bc623eb5665f9a00227965645c24875';

let countryCode = 'us';


const fetchData = async (zipCode) => {
    const url = `${ baseURL }?zip=${ zipCode },${ countryCode }&appid=${ apiKey }`;
    
    try{
        const request = await fetch(url);
        const response = await request.json();
        const {
            main: {temp},
            name: city,
        } = response;
        let newData;
        const result = {name: city, date: newDate, temperature: temp, feelings: feeling.value};
        postData('/save', result);
        return result;
    }catch(error) {
        console.log('error', error);
    }
}

const postData = async (path, data) => {
    const response = await fetch(path, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log('error', error);
    }
}

const updateUI = async(data) => {
    const { name: city, date: newdate, temperature: temperature, feelings:text } = data;
    entry.innerHTML   = `ciry: ${ city }`;
    date.innerHTML    = `Date: ${ newDate }`;
    temp.innerHTML    = `temperature: ${ (temperature - 273.15).toPrecision(4) } deg`;
    content.innerHTML = `feeling: ${ text }`;
    document.querySelector('.entry').style.display = 'grid';
}

function getWeather(){
    fetchData(zip.value)
        .then(data => { 
            updateUI(data)
            // console.log(data) 
        });
}

document.getElementById('generate').addEventListener('click', getWeather);