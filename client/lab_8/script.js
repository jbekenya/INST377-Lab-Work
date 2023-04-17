function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  
  
  function injectHTML(list) {
    console.log('fired injectHTML');
    const target = document.querySelector("#restaurant_list")
    target.innerHTML = '';
    list.forEach((item, index) => {
      const str = `<li>${item.name}</li>`
      target.innerHTML += str
    })
  
    /*
    ## JS and HTML Injection
      There are a bunch of methods to inject text or HTML into a document using JS
      Mainly, they're considered "unsafe" because they can spoof a page pretty easily
      But they're useful for starting to understand how websites work
      the usual ones are element.innerText and element.innerHTML
      Here's an article on the differences if you want to know more:
      https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext
  
    ## What to do in this function
      - Accept a list of restaurant objects
      - using a .forEach method, inject a list element into your index.html for every element in the list
      - Display the name of that restaurant and what category of food it is
  */
  }
  
  function filterList(list, query) {
    return list.filter((item) => {
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery);
    })
  }
  
  function  cutResturantList(list){
    console.log("fired cut list")
    const range = [...Array(15).keys()];
    return newArray = range.map((item) => {
      const index = getRandomInt(0, list.length - 1);
      return list[index] 
    })
  }
  
  function initMap(){
    const carto = L.map('map').setView([38.98, -76.93], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(carto);
    return carto;
  }

  function markerPlace(array, map){
    console.log('array for markers', array);

    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          layer.remove();
        }
      });

    array.forEach((item) => {
        console.log('markerplace', item);
        const {coordinates} = item.geocoded_column_1;

        L.marker([coordinates[1], coordinates[0]]).addTo(map);
    })

  }

  async function mainEvent() { // the async keyword means we can make API requests
    const form = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
    //const filterButton = document.querySelector("#filter_button");
    const loadDataButton = document.querySelector("#data_load");
    const clearDataButton = document.querySelector("#data_clear");
    const generateListButton = document.querySelector('#generate');
    const textField = document.querySelector('#resto');
    
    const loadAnimation = document.querySelector("#data_load_animation");
    loadAnimation.style.display = 'none'; 
    generateListButton.classList.add('hidden');

    const carto = initMap();

    const storedData = localStorage.getItem('storedData');
    let parsedData = JSON.parse(storedData);
    if (parsedData?.length > 0){
        generateListButton.classList.remove('hidden');
    }

    let arrayFromJson = [];
  
  
    loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
      submitEvent.preventDefault(); // This prevents your page from going to http://localhost:3000/api even if your form still has an action set on it
      console.log('form submission'); // this is substituting for a "breakpoint"
      loadAnimation.style.display = 'inline-block';
  
      // You can also access all forms in a document by using the document.forms collection
      // But this will retrieve ALL forms, not just the one that "heard" a submit event - less good
  
      /*
        ## Retrieving information from an API
          The Fetch API is relatively new,
          and is much more convenient than previous data handling methods.
          Here we make a basic GET request to the server using the Fetch method
          to send a request to the routes defined in /server/routes/foodServiceRoutes.js
  
        // this is a basic GET request
        // It does not include any of your form values, though
      */
  
      const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  
      // This changes the response from the GET into data we can use - an "object"
      const storedList = await results.json();
      localStorage.setItem('storedData', JSON.stringify(storedList));
      parsedData =  storedList;

      if (parsedData?.length > 0){
        generateListButton.classList.remove('hidden');
      }

      loadAnimation.style.display = 'none'; 
      
    });
  
  
    generateListButton.addEventListener('click', (event) => {
      console.log('generate new list');
      arrayFromJson = cutResturantList(parsedData);
      console.log(arrayFromJson);
      injectHTML(arrayFromJson);
      markerPlace(arrayFromJson, carto);
    })

    textField.addEventListener('input', (event)=>{
        console.log('input', event.target.value);
        const newList = filterList(arrayFromJson, event.target.value)
        console.log(newList);
        injectHTML(newList);
        markerPlace(newList, carto);

    })

    clearDataButton.addEventListener("click", (event) => {
        console.log('clear browser data');
        localStorage.clear();
        console.log('localStorage check', localStorage.getItem("storedData"));
    })
  }

  
  
  /*
    This adds an event listener that fires our main event only once our page elements have loaded
    The use of the async keyword means we can "await" events before continuing in our scripts
    In this case, we load some data when the form has submitted
  */
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
  