/* eslint-disable max-len */

/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/

/*
  ## Utility Functions
    Under this comment place any utility functions you need - like an inclusive random number selector
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
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

async function mainEvent() { // the async keyword means we can make API requests
  const form = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
  const filterButton = document.querySelector("#filter_button");
  const loadDataButton = document.querySelector("#data_load");
  const generateListButton = document.querySelector('#generate');
  
  const loadAnimation = document.querySelector("#data_load_animation");
  loadAnimation.style.display = 'none'; 
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
    /*
   ## Get request with query parameters

      const results = await fetch(`/api/foodServicePG?${new URLSearchParams(formProps)}`);

      The above request uses "string interpolation" to include an encoded version of your form values
      It works because it has a ? in the string
      Replace line 37 with it, and try it with a / instead to see what your server console says

      You can check what you sent to your server in your GET request
      By opening the "network" tab in your browser developer tools and looking at the "name" column
      This will also show you how long it takes a request to resolve
    */

    // This changes the response from the GET into data we can use - an "object"
    arrayFromJson = await results.json();
    loadAnimation.style.display = 'none'
    console.table(arrayFromJson); 
    
  });

  filterButton.addEventListener('click', (event) => {
    console.log('clicked FilterButton');

    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData);

    console.log(formProps);
    const newList = filterList(arrayFromJson, formProps.resto);
    injectHTML(newList)
    console.log(newList);
  })

  generateListButton.addEventListener('click', (event) => {
    console.log('generate new list');
    const resturantsList = cutResturantList(arrayFromJson);
    console.log(resturantsList)
    injectHTML(resturantsList)
  })
}

/*
  This adds an event listener that fires our main event only once our page elements have loaded
  The use of the async keyword means we can "await" events before continuing in our scripts
  In this case, we load some data when the form has submitted
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
