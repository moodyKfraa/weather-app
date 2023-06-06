const todayDaySection = document.querySelector(`.main-container .content .date span.day`);
const todayMonthDaySection = document.querySelector(`.main-container .content .date span.month-day`);
const todayMonthSection = document.querySelector(`.main-container .content .date span.month`);
const locationSection = document.querySelector(`.main-container .content .location p`)
const tempDegreeSection = document.querySelector(`.main-container .content .temp .temp-degree h1`);
const tempImgSection = document.querySelector(`.main-container .content .temp img `);
const tempStateSection = document.querySelector(`.main-container .content .temp-state `);
const todayDate = new Date();
const days = [`Sunday` , `Monday` , `Tuesday` , `Wednesday` , `Thursday` , `Friday` , `Saturday`];
const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

const apiKey = `6670bcf8aaae44a98d4121516230506`;

function getAndSetWeatherDate(firstPart , secPart){
    let weatherObject;
    let weatherTemp ;
    let weatherTempStateImg;
    let weatherTempState;

    let myLocation;
    let locationReq = new XMLHttpRequest()
    locationReq.open(`GET` ,`http://ip-api.com/json/?fields=city` )
    locationReq.send();

    locationReq.onload = ()=>{
        myLocation = JSON.parse(locationReq.responseText).city;
    
        let weatherDataReq = new XMLHttpRequest()
        weatherDataReq.open(`GET` ,firstPart + myLocation + secPart )
        weatherDataReq.send()

        weatherDataReq.onload = ()=>{
            weatherObject = JSON.parse(weatherDataReq.responseText)
            weatherTemp = weatherObject.current.temp_c
            weatherTempStateImg =weatherObject.current.condition.icon
            weatherTempState = weatherObject.current.condition.text

            todayDaySection.innerText = days[todayDate.getDay()] ;
            todayMonthDaySection.innerText = todayDate.getDate() ;
            todayMonthSection.innerText = months[todayDate.getMonth()] ;    
            locationSection.innerText = weatherObject.location.name
            tempDegreeSection.innerText = weatherTemp
            tempImgSection.setAttribute(`src` , weatherTempStateImg)
            tempStateSection.innerText = weatherTempState
        }
    }
}
 
window.onload = ()=>{
    getAndSetWeatherDate(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=` , `&aqi=yes`)
    setInterval(()=>{
        getAndSetWeatherDate(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=` , `&aqi=yes`)
    },60000)
}
