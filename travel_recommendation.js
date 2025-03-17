const divText = document.getElementsByClassName('background')[0];
let resultsDiv = document.createElement('div');
resultsDiv.classList.add('results');
const searchBar = document.getElementById('search_bar');
const searchButton = document.getElementById('search_btn');
const resetButton = document.getElementById('reset_btn');
function getTravelData(){
    fetch('travel_recommandation_api.json')
    .then(response => {
        if (!response.ok){
            throw new Error('failed to fetch data');
        }
        return response.json();
    })
    .then(data => {
        const searchQuery = searchBar.value.toLowerCase().trim();
        let found = false;
        divText.innerHTML = `<h2>Travel Recommendations</h2>`;
        if(searchQuery !== ''){
         resultsDiv.innerHTML ="";

            //serach for countries
        data.countries.forEach(country => {
            if(country.name.toLowerCase().trim().includes(searchQuery)) {
                found = true;
                
                country.cities.forEach(city => {
                    const time  = { timeZone: country.timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                    const country_time= new Date().toLocaleTimeString('en-US', time);
                    resultsDiv.innerHTML += `
                    <div class="city">
                    <h3>Country: ${country.name}</h3>
                    <h4>City: ${city.name}</h4>
                    <img src="${city.imageUrl}" alt="${city.name}" />
                    <p>${city.description}</p>
                    <br><br><br>
                    <h4>Current Time in ${city.name}:</h4>
                    <p><strong>${country_time}</strong></p>
                    </div>`;
                });
                searchBar.value = '';
                
            }
            
        });
        //search for temples
        if (searchQuery === 'temple' || searchQuery === 'temples'){
            data.temples.forEach(temple => {
                found = true;
                resultsDiv.innerHTML += `
                <div class="temple">
                <h3>Temple: ${temple.name}</h3>
                <img src="${temple.imageUrl}" alt="${temple.name}" />
                <p>${temple.description}</p>
                </div>
                `;
            });
            searchBar.value = '';
        }
        
        // Search in beaches
        if (searchQuery === 'beach' || searchQuery === 'beaches'){ 
        data.beaches.forEach(beach => {
                found = true;
                resultsDiv.innerHTML += `
                <div class="beach">
                <h3>Beach: ${beach.name}</h3>
                <img src="${beach.imageUrl}" alt="${beach.name}" />
                <p>Description: <br>
                ${beach.description}
                </p>
                </div>
                `;
            }
        );
        searchBar.value = '';
    }
        //if nothing is found 
        if(!found){
            resultsDiv.innerHTML = `<h3>No results Found for ${searchQuery}</h3>`;
            searchBar.value = '';
        }
        divText.appendChild(resultsDiv);
    }
        })
        .catch(error => {
            console.error(error);
            divText.innerHTML = `<h2>Failed to fetch data, Please Try Again Later </h2>
            <p>Error: ${error.message}</p>`;
        }); 
    }
    
//Reset function declaration
function reset(){
    divText.innerHTML = '';
    searchBar.value = '';
    searchBar.focus();
}

searchButton.addEventListener('click', getTravelData);
resetButton.addEventListener('click', reset);

