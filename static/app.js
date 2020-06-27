let baseURL = 'https://api.openweathermap.org/data/2.5/weather';
let apiKey  = '5bc623eb5665f9a00227965645c24875';

let countryCode = 'us';
let zipCode     = '10001';

const fetchData = async () => {
    const url = `${ baseURL }?zip=${ zipCode },${ countryCode }&appid=${ apiKey }`;
    
    try{
        const request = await fetch(url);
        const response = await request.json();
        postData('/save', response);
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


fetchData();