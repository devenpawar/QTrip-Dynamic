import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  try {
    const params = new URLSearchParams(search);
    const city = params.get("city");
    //console.log("cityDebug", city);
    return city;
  } catch (err) {
    return null;
  }
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const url = config.backendEndpoint + `/adventures?city=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  adventures.forEach((adventure) => {
    const dataContainer = document.getElementById("data");
    const { id, image, duration, costPerHead, category, name } = adventure;
    const newElement = document.createElement("div");
    newElement.className = "col-6 col-lg-3 mt-2 position-relative";

    newElement.innerHTML = `
    <a id=${id} href="detail/?adventure=${id}">
      <div class="category-banner">
        ${category}
        </div>
      <div class="activity-card"> 
        <img src=${image} alt="image"/> 

        <div class="w-100 ">

        <div class="d-flex justify-content-between">
          <h5>
            ${name} 
          </h5>
          <p>
            ₹ ${costPerHead}
          </p> 
        </div>
        <div class="d-flex justify-content-between">
          <h5>
            Duration
          </h5>
          <p>
            ${duration} Hours
          </p> 
        </div>
        </div>
      </div>
    </a>
    `;

    dataContainer.append(newElement);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(adventureList, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = adventureList.filter((adventure) => {
    return adventure.duration >= low && adventure.duration <= high;
  });

  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(adventureList, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  const filteredList = adventureList.filter((adventure) => {
    return categoryList.includes(adventure.category);
  });

  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // Place holder for functionality to work in the Stubs

  let filteredResult = list;
  if (filters.duration) {
    const durationChoice = filters.duration.split("-");
    filteredResult = filterByDuration(
      filteredResult,
      parseInt(durationChoice[0]),
      parseInt(durationChoice[1])
    );
  }

  if (filters.category.length) {
    filteredResult = filterByCategory(filteredResult, filters.category);
  }
  return filteredResult;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  return localStorage.setItem("filters", JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  document.getElementById("duration-select").value = filters.duration;

  filters["category"].forEach((key) => {
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `
    <div> ${key}</div>
    `;

    document.getElementById("category-list").appendChild(ele);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
