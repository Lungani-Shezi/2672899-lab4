const button = document.getElementById("search-btn");
const img = document.getElementById("flag");
const spin  = document.getElementById("loading-spinner");
const grid  = document.getElementById("border-grid");

spin.hidden = true;

const fetchCountry = async () => {

    try{
        spin.hidden = false
        const search = document.getElementById("country-input").value.toLowerCase();
        const url = `https://restcountries.com/v3.1/name/${search}`;
        const response = await fetch(url);

        if (!response.ok){
            throw new Error("Cant fetch data");
        }

        const data = await response.json();

        document.getElementById('country-info').innerHTML = `<section><h2>${data[0].name.common}</h2> <p><strong>Capital:</strong> ${data[0].capital[0]}</p> <p><strong>Population:</strong> ${data[0].population.toLocaleString()}</p> <p><strong>Region:</strong> ${data[0].region}</p> <img src="${data[0].flags.svg}" alt="${data[0].name.common} flag" width="150"></section>`;
        
        const borderingCountries = document.getElementById('bordering-countries');

        if (data[0].borders && data[0].borders.length>0){
            borderingCountries.innerHTML = "<section><h3>Bordering Countries</h3></section>"

            for (let code of data[0].borders){
                const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);

                if (!borderResponse.ok) continue;

                const borderData = await borderResponse.json();
                const borderCountry = borderData[0];

                borderingCountries.innerHTML += `<p>${borderCountry.name.common}</p> <img src="${borderCountry.flags.svg}" width = "100">`
            }
        }
    }
    catch(error){
        console.error(error);
    }finally{
        spin.hidden =true;
    }
}

button.addEventListener("click",fetchCountry)