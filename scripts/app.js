const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const background = document.querySelector('.background');
const icon = document.querySelector('.icon img');
const errorDisplay = document.querySelector('.error-display');

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(data => updateUI(data))
        .catch(showError);
})

function updateUI({ location, weather }) {

    const country = location.country;
    const flagId = flagData[country];
    const localDateTime = location.localtime;
    const localTime = localDateTime.split(" ")[1];
    const hour = localTime.split(":")[0];

    let backgroundSrc = undefined;

    if ( hour >= 21 ) backgroundSrc = './img/night.svg';
    else if ( hour >= 18 ) backgroundSrc = './img/noon.svg';
    else if ( hour >= 9 ) backgroundSrc = './img/day.svg';
    else if ( hour >= 6 ) backgroundSrc = './img/morning.svg';
    else backgroundSrc = './img/night.svg';
 
    details.innerHTML = `
        <p> Local Time: ${localTime}</p>
        <h5 class="my-3">${location.name}</h5>
        <img src="https://flagcdn.com/${flagId}.svg" class="flag" alt="location flag">
        <div class="my-3">${weather.condition.text}</div>
        <div class="display-4 my-4">
            <span>${weather.temp_c}</span>
            <span>&deg;C</span>
        </div>
    `;

    icon.setAttribute('src', `https:${weather.condition.icon}`);
    background.setAttribute('src', backgroundSrc)

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
    
    errorDisplay.classList.add('d-none')
}

function showError() {
    card.classList.add('d-none');
    errorDisplay.classList.remove('d-none');
    errorDisplay.innerHTML = 'Something went wrong! Try again!'
}

async function updateCity(city) {
    const cityInfo = await getData(city);
    return {
        location: cityInfo.location,
        weather: cityInfo.current
    }
}
