
var queryURL = ''
var queryURLUv = ''
var forecastURL = ''
var apikey = '&appid=33896cf38ccc73a31c23ba2656490aab'
var lon = ''
var lat = ''
let date = moment().format("MM") + "/" + moment().format("D") + "/" + moment().format("YYYY");

$('.sidebar').on("click", function (e){
    event.preventDefault()
    if(event.target.classList.contains('prevQuery')) {
        var city = event.target.textContent
        $('.cityName').text(city + " " + '(' + date + ')')
        generateQueryUrl(city)
        getWeather(city)
    }
})


$('#searchBtn').on("click", function (e) {
    event.preventDefault()
    if($('#searchTerm').val() != ''){
    var city = $('#searchTerm').val()
    generateQueryUrl(city)
    var sidebarEl = $('<div>').addClass('row card w-50 mx-auto p-2 my-1 prevQuery')
    sidebarEl.text(city)
    $('.cityName').text(city + " " + '(' + date + ')')
    $('.sidebar').append(sidebarEl)
    getWeather(city)
    }
})

function getWeather(city){
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    $('.temperature').text("Temperature:" + " " + (kelvinToF(response.main.temp)) + "°F")
    $('.humidity').text("Humidity: " + (response.main.humidity) + "%")
    $('.windSpeed').text("Wind Speed: " + (response.wind.speed) + "MPH")
    lon = response.coord.lon
    lat = response.coord.lat
    generateQueryUrlUv(lon, lat)
    $.ajax({
        url: queryURLUv,
        method: "GET"
    }).then(function (response) {
        $('.uvIndex').text("UV Index: " + " ")
        var p = $('<span>')
        p.addClass('uvIndexButton badge')
        p.text(response.value)
        $('.uvIndex').append(p)
        
        if(parseInt(response.value) < 3) {
            $('.uvIndexButton').addClass('badge-success')
        }
        if(parseInt(response.value) > 3 && parseInt(response.value) < 6) {
            $('.uvIndexButton').addClass('badge-warning')
        }
        if(parseInt(response.value) >= 6){
            $('.uvIndexButton').addClass('badge-danger')
        }
    })
})

forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + apikey
$.ajax({
    url: forecastURL,
    method: "GET"
}).then(function (response) {
    $('.forecast').empty()
    for (let i = 0; i < response.list.length; i++) {
    if(response.list[i].dt_txt.includes('00:00:00')){
    var div = $("<div>")
    var date = $('<p>').text(moment(response.list[i].dt_txt.replace(' 00:00:00', '')).format('MM/DD/YYYY'))
    var image = $('<img>')
    var clouds = $('<p>')
    clouds.append(image)
    image.attr('src', 'http://openweathermap.org/img/wn/' + response.list[i].weather[0].icon + '.png')
    var temp = $('<p>').text("Temperature: " + kelvinToF(response.list[i].main.temp) + '°F')
    var humidity = $('<p>').text('Humidity: ' + response.list[i].main.humidity + '%')
    
    $('.forecast').append(div)
    div.addClass('card d-flex justify-content-center align-text-center p-5 bg-info text-white')
    div.append(date, clouds, temp, humidity)
    }
    }
})
}



//converts Kelvin to Fareinheit
function kelvinToF(kelvin) {
    var fareinheit = Math.round((kelvin - 273.15) * 9 / 5 + 32)
    return fareinheit

}

function generateQueryUrl(city) {

    queryURL = 'http://api.openweathermap.org/data/2.5/weather?' + 'q=' + city + apikey
    

}

function generateQueryUrlUv(lon, lat) {

    queryURLUv = 'http://api.openweathermap.org/data/2.5/uvi?' + "lat=" + lat + '&lon=' + lon + apikey

}

