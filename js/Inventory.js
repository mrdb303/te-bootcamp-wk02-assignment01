/*
- Inventory class to handle available items for purchase, prices,
- bonus values, image locations and id's for matching to event listeners.
- Generates user information messages for when items are too expensive.
- Constructs an object containing all inventory and returns it for output
- purposes.
-
- No interaction with the DOM.

- D Brien 2023
*/


export default class Inventory {

  constructor() {
    this.initialise();
  }


  // This can be called after the object has been instanciated,
  // so requires a location outside of the constructor.
  initialise(){
    this.shopItems = [
      { shopId: 0, item: "Grandma", price: 10, bonus: 1, 
      fileName: "granny.png", total: 0},
      { shopId: 1, item: "Oven", price: 100, bonus: 5, 
      fileName: "oven.png", total: 0},
      { shopId: 2, item: "Factory", price: 1000, bonus: 50, 
      fileName: "factory.png", total: 0},
      { shopId: 3, item: "Mine", price: 10000, bonus: 100, 
      fileName: "mine.png", total: 0},
      { shopId: 4, item: "Bank", price: 100000, bonus: 700, 
      fileName: "bank.png", total: 0},
      { shopId: 5, item: "Big Factory", price: 300000, bonus: 1300, 
      fileName: "factorybig.png", total: 0}
    ];

    this.cookies = 0;
    this.cookieProductionPerClick = 1;
    this.numberOfShopItems = this.shopItems.length;
    
    this.userMessage = "";
    this.lastPurchaseSuccessful = false;
    this.availableMessages = [
      "You can't afford to buy the ? upgrade",
      "The ? is out of your price range",
      "You'll have to work harder to buy the ?",
      "Sorry, not enough left over for the ? upgrade",
      "The ? costs more than what you have",
      "Your pockets aren't deep enough for the ?",
      "You need more cookies to buy the ? upgrade",
      "The ? costs more than what you have stashed away"
    ]
  }


  getCurrentItemsData() {
    return this.shopItems;
  }


  purchaseAnItem(id){

    if(this.cookies >= this.shopItems[id].price){
      this.shopItems[id].total += 1;
      this.cookies -= Number(this.shopItems[id].price);
      this.cookieProductionPerClick += this.shopItems[id].bonus;
      this.lastPurchaseSuccessful = true;
      this.userMessage = "";
    } else {
      let message = this.getRandomUserMessage(this.shopItems[id].item);
      this.userMessage = message;
      this.lastPurchaseSuccessful = false;
    }
  }


  getRandomUserMessage(item){
    let count = this.availableMessages.length - 1;
    let number = this.getRandomInt(0,count);
    let message = this.availableMessages[number];
    message = message.replace("?", item);
    return message;
  }


  getNumberOfShopItems(){
    return this.numberOfShopItems;
  }


  setCookies(cookies){
    this.cookies = cookies;
  }


  getCookies(){
    return this.cookies;
  }


  // CPC: Cookie Production per click
  getCPC(){
    return this.cookieProductionPerClick;
  }


  setCPC(value){
    this.cookieProductionPerClick = value;
  }


  addCookies(){
    this.cookies += this.cookieProductionPerClick;
  }


  resetTotals(){
    for(let counter = 0;counter < (this.numberOfShopItems);counter++){
       this.shopItems[counter].total = 0;
    }
  }


  getLocallyStoredObject(){
    const totals = [];
    for(let counter = 0;counter < (this.numberOfShopItems);counter++){
      totals.push(this.shopItems[counter].total);
    }
    
    let obj = {total: totals, cookieTotal: this.cookies, 
      cookiesPC: this.cookieProductionPerClick
    };

    obj.cookiesPC = this.cookieProductionPerClick;
    return obj; 
  }


  setLocallyStoredObject(obj){
    for(let counter = 0;counter < (this.numberOfShopItems);counter++){
      this.shopItems[counter].total = Number(obj.total[counter]);
    }
    this.cookies = Number(obj.cookieTotal);
    this.cookieProductionPerClick = Number(obj.cookiesPC);
  }


  wasLastPurchaseSuccessful(){
    return this.lastPurchaseSuccessful;
  }


  getAssetImageNames(){
    const images = [];
    for(let counter = 0;counter < (this.numberOfShopItems);counter++){
      images.push(this.shopItems[counter].fileName);
    }
    return images;
  }


  getCurrentUserMessage(){
    const currentUserMessage = this.userMessage;
    this.userMessage ="";
    return currentUserMessage;
  } 


  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

}