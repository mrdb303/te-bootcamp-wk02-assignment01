
import Main from './Main.js';



const main = new Main;


let numOfSeconds = 0; // Start seconds count at zero
//let imagePath = "./images/";


// Get elements and classes
const stopWatch = document.getElementById("stopwatch");
const btnClick = document.getElementById("cookie-button");
const reset = document.getElementById("reset");
const buy = document.getElementsByClassName('buy');



// Set listeners
setListenersForBuyButtons();

function setListenersForBuyButtons(){
  for(let counter=0;counter < (main.getNumberOfProducts());counter++){
    buy[counter].addEventListener("click", buyStuff);
  }
}


// Cookie button
btnClick.addEventListener("click", function (){
  main.processCookieButtonClicked();
});


// The reset button
reset.addEventListener("click", function() {
  main.clearAllData();
});


// <------ Listeners end here --------->


// If local storage data exists, then load it.
// If not then start the game with initialised values.
main.loadNewOrLocalDataToObjectAndBrowser();



// Main timer
setInterval(function () {
  numOfSeconds = numOfSeconds + 1;
  main.incrementCookies();
  main.setStoredItems();

}, 1000);


// Additional timer to clear player messages, such as when a user attempts
// to buy an item that they can't afford yet. Messages last on screen
// for up to five seconds.
setInterval(function () {
    main.displayAnyFeedbackMessages();
},5000);


// For processing any buy/employ buttons.
function buyStuff(){
  let attr = this.getAttribute("data-varid");
  main.buyAnItem(attr);
}

