
var queryURL = ''
var queryURLUv = ''
var forecastURL = ''
var apikey = '&appid=33896cf38ccc73a31c23ba2656490aab'
var lon = ''
var lat = ''

$('#searchBtn').on("click", function (e) {
    event.preventDefault()
    var city = $('#searchTerm').val()
    generateQueryUrl(city)
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $('.temperature').text("Temperature:" + " " + (kelvinToF(response.main.temp)) + "°F")
        $('.humidity').text("Humidity: " + (response.main.humidity) + "%")
        $('.windSpeed').text("Wind Speed: " + (response.wind.speed) + "MPH")
        lon = response.coord.lon
        lat = response.coord.lat
        console.log(lon, lat)
        generateQueryUrlUv(lon, lat)
        $.ajax({
            url: queryURLUv,
            method: "GET"
        }).then(function (response) {
            $('.uvIndex').text("UV Index: " + " " + (response.value))
        })
    })
    
    forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + apikey
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        for (let i = 0; index < 5; i++) {
            const element = array[index];
            
        }
    })
})



//converts Kelvin to Fareinheit
function kelvinToF(kelvin) {
    var fareinheit = Math.round((kelvin - 273.15) * 9 / 5 + 32)
    return fareinheit

}

function generateQueryUrl(city) {

    queryURL = 'http://api.openweathermap.org/data/2.5/weather?' + 'q=' + city + apikey
    $('.cityName').text(city)

}

function generateQueryUrlUv(lon, lat) {

    queryURLUv = 'http://api.openweathermap.org/data/2.5/uvi?' + "lat=" + lat + '&lon=' + lon + apikey

}

