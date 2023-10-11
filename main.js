import senators from "./data/senators.js";

// GLOBAL VARIABLES
const PARTY = "party";
const STATE = "state";
const RANK = "rank";
const GENDER = "gender";


document.addEventListener("DOMContentLoaded", async () => {
  const FILTER_OPTIONS = loadFilterOptions();
  drawFilters(FILTER_OPTIONS);

});


function loadFilterOptions() {
  var filterOptions = {
    [PARTY]: new Set(),
    [STATE]: new Set(),
    [RANK]: new Set(),
    [GENDER]: new Set(),
  };

  senators.objects.forEach((senator) => {
    filterOptions[PARTY].add(senator.party);
    filterOptions[STATE].add(senator.state);
    filterOptions[RANK].add(senator.senator_rank);
    filterOptions[GENDER].add(senator.person.gender);
  });

  return filterOptions;
}


function drawFilters(filterOptions) {
  let filterContainer = document.getElementById("filter-container");
  Object.entries(filterOptions).forEach(([key, val]) => {
    let filterId = key;
    let filterOptions = val;

    // Create a label
    let filterLabelEl = document.createElement("label");
    filterLabelEl.setAttribute("for", filterId);
    filterLabelEl.innerText = capitalizeFirstLetter(filterId);

    // Create select
    let selectEl = document.createElement("select", { multiple: true });

    // Create options
    Array.from(filterOptions).sort().forEach((option) => {
      let optionEl = document.createElement("option", { value: option });
      optionEl.innerText = option;
      selectEl.appendChild(optionEl);
    });
    
    filterContainer.appendChild(filterLabelEl);
    filterContainer.appendChild(selectEl);
  });
}

// Utility functions
function capitalizeFirstLetter(str){
  return str[0].toUpperCase() + str.slice(1);
}
