import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the dat
  try {
    const url = config.backendEndpoint + `/cities`;
    const rawCitiesData = await fetch(url);
    const finalCityList = await rawCitiesData.json();
    return finalCityList;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const container = document.querySelector("#data");
  const element = document.createElement("div");
  element.className = "col-12 col-lg-3 mb-3";
  element.innerHTML = `
    <a id=${id} href="./pages/adventures/?city=${id}">
      <div class="tile">
        <img src=${image} alt="image">

        <div class="tile-text" >

          <h5>${city}</h5>
          <p>${description}</p> 

        </div>
      
      </div>
    </a>`;

  container.append(element);
}

export { init, fetchCities, addCityToDOM };
