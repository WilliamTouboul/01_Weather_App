const container = document.querySelector('.container');
const search_box = document.querySelector('.search_box input')
const search = document.querySelector('.search_box button');
const weatherBox = document.querySelector('.weather_box');
const weatherDetails = document.querySelector('.weather_details');
const err404 = document.querySelector('.not_found');


let get_weather = function (input_value) {
    const APIKey = 'e94e6c01e03f0788d5879395ffb41266';
    const city = input_value;

    if (city === '') {
        return
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            err404.style.display = "block";
            err404.classList.add('fadeIn')
            return;
        }

        err404.style.display = "none";
        err404.classList.remove('fadeIn');

        const image = document.querySelector('.weather_box img');
        const temperature = document.querySelector('.weather_box .temperature');
        const description = document.querySelector('.weather_box .description');
        const humidity = document.querySelector('.weather_details .humidity span')
        const wind = document.querySelector('.weather_details .wind span')

        console.log(json)

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            case 'Clouds':
                image.src = 'images/cloud.png';
                break;
            case 'Haze':
                image.src = 'images/haze.png';
                break;
            default:
                img.src = ''
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`

        weatherBox.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.style.display = '';
        weatherDetails.classList.add('fadeIn');
        container.style.height = '600px'
    })
}


search.addEventListener('click', function () {
    let city = search_box.value
    get_weather(city)
});

search_box.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        let city = search_box.value
        get_weather(city)
    } else {
        console.log('wrong key');
        return;
    }
})