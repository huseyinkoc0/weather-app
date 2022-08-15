
const apikey="7665bc713dd55bd6547410c8151f6744"

const main=document.getElementById("main")
const form=document.getElementById("form")
const search=document.getElementById("search")

const url=(location) =>
`
https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;


async function getWeatherByLocation(location){

    const resp= await fetch(url(location), {
        origin: "cors"});
    const respData=await resp.json();

   addWeatherToPage(respData);
    console.log(respData);
}

function addWeatherToPage(data){
    const temp=KtoC(data.main.temp)
    const weather=document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML=`
    
    <h2><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>${temp}°C<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/></h2>
    
    <small>${data.weather[0].main}</small>
    <small>Wind ${data.wind.speed}KM</small>
    `

    //cleanup
    main.innerHTML='';


    main.appendChild(weather);

}



//Kelvin To Celcius
function KtoC(K){
    return Math.ceil(K-273.15);
}


form.addEventListener("submit", (e) =>{
    e.preventDefault();
    const city=search.value;
    if(city){
        getWeatherByLocation(city);
    }


});