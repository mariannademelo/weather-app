const weatherDetails = document.querySelector(".weather__details")
const forecast = document.querySelector(".forecast__details")
const submitBtn = document.querySelector(".forecast__submit")
const form = document.querySelector("form")

const showDate = () => {
    let date = new Date()
    date = date.getDate()+" "+(date.toLocaleString('pt-br', {month:'short'}))+" "+date.getFullYear();
    return date
}

const showTime = () => {
    const date = new Date();
    const hours = date.getHours();
    console.log(hours)
    return hours
}

const changeBg = () => {
    if(showTime() >= 1 && showTime() < 4) {
        document.body.style.backgroundImage = "url('../back-nightt.gif')";
    } else if(showTime() >= 4 && showTime() < 7) {
        document.body.style.backgroundImage = "url('../back-nightt.gif')";
    } else if(showTime() >= 7 && showTime() < 16) {
        document.body.style.backgroundImage = "url('../back-day.gif')";
    } else if(showTime() >= 16 && showTime() < 19) {
        document.body.style.backgroundImage = "url('../back-afternoon.gif')";
    } else if(showTime() >= 19 && showTime() <= 24) {
        document.body.style.backgroundImage = "url('../back-nightt.gif')";
    }
}

const getWeekDay = (apiDate) => {
    let date = new Date(apiDate)
    date = date.getDay()
    
    switch(date) {
        case 0:
            return "Domingo";
            break;
        case 1:
            return "Segunda";
            break;
        case 2:
            return "Terça";
            break;
        case 3: 
            return "Quarta";
            break;
        case 4: 
            return "Quinta";
            break;
        case 5: 
            return "Sexta";
            break;
        case 6:
            return "Sábado"
            break;
    }
}

const getShortWeekDay = (apiDate) => {
    let date = new Date(apiDate)
    date = date.getDay()
    
    switch(date) {
        case 0:
            return "Dom";
            break;
        case 1:
            return "Seg";
            break;
        case 2:
            return "Ter";
            break;
        case 3: 
            return "Quar";
            break;
        case 4: 
            return "Qui";
            break;
        case 5: 
            return "Sex";
            break;
        case 6:
            return "Sáb"
            break;
    }
}

const weatherUI = async (data) => {
    const { cityDets, weatherDets, forecastDets } = data
    let input = document.querySelector("[data-element='input']");
    input.value = cityDets.EnglishName;

    weatherDetails.innerHTML = `
        <div class="details__first">
            <h3 class="details__day">${getWeekDay(weatherDets.LocalObservationDateTime)}</h3>
            <h4 class="details__date">${showDate()}</h4>
        </div>
        <div class="details__sec">
            <h2 class="details__degree">${weatherDets.Temperature.Metric.Value}ºC</h2>
            <h3 class="details__spec">${weatherDets.WeatherText}</h3>
        </div>
    `

    forecast.innerHTML = `
        <div class="forecast__first">
            <ul>
                <li>
                    <p>Precipitação</p>
                    <p class="forecast__precip">${weatherDets.PrecipitationSummary.Past6Hours.Metric.Value}mm</p>
                </li>
                <li>
                    <p>Umidade</p>
                    <p class="forecast__precip">${weatherDets.RelativeHumidity}%</p>
                </li>
                <li>
                    <p>Vento</p>
                    <p class="forecast__precip">${weatherDets.Wind.Speed.Metric.Value} km/h</p>
                </li>
            </ul>
        </div>
        <div class="forecast__sec">
            <ul>
                <li>
                    <p>${getShortWeekDay(forecastDets.DailyForecasts[1].Date)}</p>
                    <p>${forecastDets.DailyForecasts[1].Temperature.Maximum.Value}ºC</p>
                </li>
                <li>
                    <p>${getShortWeekDay(forecastDets.DailyForecasts[2].Date)}</p>
                    <p>${forecastDets.DailyForecasts[2].Temperature.Maximum.Value}ºC</p>
                </li>
                <li>
                    <p>${getShortWeekDay(forecastDets.DailyForecasts[3].Date)}</p>
                    <p>${forecastDets.DailyForecasts[3].Temperature.Maximum.Value}ºC</p>
                </li>
                <li>
                    <p>${getShortWeekDay(forecastDets.DailyForecasts[4].Date)}</p>
                    <p>${forecastDets.DailyForecasts[4].Temperature.Maximum.Value}ºC</p>
                </li>
            </ul>
        </div>
    `
    changeBg();
}

const fetchWeather = async (city) => {
    const cityDets = await getCity(city)
    const weatherDets = await getWeather(cityDets.Key)
    const forecastDets = await getForecast(cityDets.Key)
    form.reset()
    return { cityDets, weatherDets, forecastDets }
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const newCity = form.forecast.value.trim()
    fetchWeather(newCity)
        .then(data => weatherUI(data))
        .catch(err => console.log(err))
})