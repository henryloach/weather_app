const key = 'f0b89425f4f44adaab9131217222903';

async function getData(city) {
    const baseUrl = 'https://api.weatherapi.com/v1';
    const method = '/current.json'
    const query = `?key=${key}&q=${city}`;
    const url = baseUrl + method + query;

    const response = await fetch(url);
    const data = await response.json();

    return data;
}