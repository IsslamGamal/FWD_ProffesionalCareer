/* !Description:  Personal API Key for OpenWeatherMap API */
const baseWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?';
const CountryCode = 'zip=';
const apiKEY = '&units=metric&appid=6ea8521d6cb2d8898d98bb4d11adc027';

/* !Description: The Needed Dom element importing */ 
const button = document.querySelector('#generate');
const zipInput = document.getElementById('zip');
const feelingsInput = document.querySelector('#feelings');
const dateUI    = document.getElementById('date');
const tempUI    = document.getElementById('temp');
const contentUI = document.getElementById('content');



/* !Description: Post Data to the Server API */ 
const postData = async  (url ='', data = {})=>{
   const response = await fetch (url, {
       method: 'POST',
       credentials: 'same-origin',
       headers: { 'content-type': 'application/json'},
       body: JSON.stringify(data),
   });

   try {
       const jsData = await response.json();
       console.log(jsData);
       return jsData;
    }catch (error){
       console.log('error',error);
    }
};


/* !Description:  Event listener to add function to existing HTML DOM element */
button.addEventListener('click', collectAppData);

async function collectAppData()
{
    /* !Comment: Get the inserted Zip code by the User */ 
    let zipCode = zipInput.value;
    /* !Comment: Gather the weather API URL elements togther */
    let url = `${baseWeatherURL}${CountryCode}${zipCode}${apiKEY}`;
    console.log(url);
    /* !Comment: Fetch the weather API data */
    let weatherData = await fetch(url);

    /* !Commen: Translate the requested data from JSON to JS code */
    weatherData = await weatherData.json();

    /* !Comment: Check if the imported data is a valid weather data */ 
    if (weatherData.cod === 200)
    {
        /* !Comment: Get the Feeling field Input from the user */ 
        const favNote = feelingsInput.value;
        /* !Comment: Pick the temperature data from the requested API data */
        const temperature = weatherData.main.temp;
        /* !Comment: Check tha current data of the Request */ 
        let requestDate = new Date();
        requestDate = requestDate.getDate() +'-' + requestDate.getMonth()+1 +'-' + requestDate.getFullYear();

        /* !Comment: Send the Post data request to the Server */ 
        await postData('/postWeatherRequest', {
            tempData: temperature,
            favData: favNote,
            dateData: requestDate
            });
        
        /* !Comment: and Finaly Update the Application UI */ 
        await updateAppUI();
    }
    else
    {
        /* !Comment: Alert the user for the missing information */
        alert(weatherData.message)
    }
}

/* !Descritpion: Updating the Application UI API */ 
async function updateAppUI(){
    /* !Comment: Fetch the Server URL */
    const getResopnse = await fetch('/getWeatherRequest');
    /* !COmment: Translate the requested data from the Server to JS code */ 
    const updateData  = await getResopnse.json();


    /* !COmment: Update the UI elements by the recieved Data */ 
    dateUI.innerHTML    = updateData.dateData;
    tempUI.innerHTML    = updateData.tempData;
    contentUI.innerHTML = updateData.favData;
}
