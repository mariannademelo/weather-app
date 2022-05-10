const token = "WrAi0jdxDvRZwAZVBfUrFS9Ik7Lrh5iI"

const getWeather = async (id) => {
    const baseUri = "http://dataservice.accuweather.com/currentconditions/v1/"
    const query = `${id}?apikey=${token}&language=pt-br&details=true`
    const response = await fetch(baseUri + query)
    const data = await response.json()

    return data[0]
}

const getForecast = async (id) => {
    const baseUri = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"
    const query = `${id}?apikey=${token}&metric=true` 
    const response = await fetch(baseUri + query)
    const data = await response.json()
    console.log(data) //small change
    return data   
}

const getCity = async (city) => {
    const baseUri = "http://dataservice.accuweather.com/locations/v1/cities/search"
    const query = `?apikey=${token}&q=${city}`
    const response = await fetch(baseUri + query)
    const data = await response.json()
    
    return data[0]
}