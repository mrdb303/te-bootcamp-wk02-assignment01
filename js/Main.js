/*
- Main class acts as a controller for interaction with Inventory.
- Inventory class handles the modelling aspects of the data.
-
*/


import Inventory from "./Inventory.js";
import OutToDom from "./OutToDom.js";

export default class Main {

  constructor() {
     this.inv = new Inventory;
     this.numOfProducts = this.inv.getNumberOfShopItems();
     this.out = new OutToDom;
     
  }


  getNumberOfProducts(){
    return this.numOfProducts;
  }


  setNumberOfProducts(value){
    this.numOfProducts = value;
  }


  renderPageCounters(){
    let count = this.inv.getCookies();
    this.out.outputTextByElementIDCommaFormat(count, "num-cookies");

    count = this.inv.getCPC();
    this.out.outputTextByElementIDCommaFormat(count, "cookies-per-sec");
  }


  loadNewOrLocalDataToObjectAndBrowser(){
    this.getStoredItemsIfPresent();
    this.loadAssetImages();  // does nothing for now
    this.renderPageCounters();
    this.renderCostData();
    this.displayPurchaseTotals(); 
  }


  resetPageCounters(){
    document.getElementById("num-cookies").innerText = 0;
    document.getElementById("cookies-per-sec").innerText = 1;
    this.inv.resetTotals();

    for(let counter=0;counter < (this.numOfProducts);counter++){
      document.getElementsByClassName("total-val")[counter].innerText = 0;
    }
  }


  getStoredItemsIfPresent(){
    let storageItemExists = this.doesStorageItemExist('inventory');
    if((storageItemExists)){
      let inv = localStorage.getItem("inventory");
      const parsed = JSON.parse(inv);
      this.inv.setLocallyStoredObject(parsed);
    } 
  }


  buyAnItem(attr){
    this.inv.purchaseAnItem(attr);
    document.getElementById("cookies-per-sec").innerText = this.inv.getCPC();
    let err = this.inv.getCurrentUserMessage();
    document.getElementById('error').innerText = err;

    this.renderPageCounters();
    this.displayPurchaseTotals();

    if(this.inv.wasLastPurchaseSuccessful()){
      this.out.applyFontSizeChangeEffect(attr, 'total-val', "1.1rem", "1.7rem");
    }
  }


  incrementCookies(){
    this.inv.addCookies();
    let cookieCount = this.inv.getCookies();
    this.out.outputTextByElementIDCommaFormat(cookieCount , "num-cookies");
  }


  clearStorage(){
    this.inv.initialise();
    localStorage.clear();
  }


  // Push to own row
  loadAssetImages(){
    //const allImageNames = assets.getAssetImageNames();
    //const imageWrap = document.getElementsByClassName('item-desc');
    for(let counter=0; counter < (this.numOfProducts); counter++){
      //imageWrap[counter].innerHTML = `<img src="${imagePath}${allImageNames[counter]}"/>`;
      //console.log(imageWrap[counter].innerHTML);
    }
      // item
  }

  displayAnyFeedbackMessages(){
    const message = this.inv.getCurrentUserMessage();
    document.getElementById('error').innerText = message;
  }


  processCookieButtonClicked(){
    this.inv.addCookies();
    let htmlText = this.formatWithCommas(this.inv.getCookies());
    document.getElementById("num-cookies").innerText = htmlText;
    

    htmlText = this.formatWithCommas(this.inv.getCPC());
    document.getElementById("cookies-per-sec").innerText = htmlText;
    this.setStoredItems();

    this.out.outputClickedCookie('cookie-button','./images/cookie.png', './images/cookie_smaller.png');
  }
  
  
  setStoredItems(){
    const obj = this.inv.getLocallyStoredObject();
    localStorage.setItem("inventory", JSON.stringify(obj));
  }



  renderCostData(){
    const shopItems = this.inv.getCurrentItemsData();
    for(let counter=0;counter < (this.numOfProducts);counter++){
      let value = this.inv.shopItems[counter].item;
      this.out.outputTextByClassName(value, "item-desc", counter);

      value = this.inv.shopItems[counter].price;
      this.out.outputTextByClassNameCommaFormat(value, "price", counter);

      value = this.inv.shopItems[counter].bonus;
      this.out.outputTextByClassNameCommaFormat(value, "bonus", counter);
    }
  }


  //duplicate
  formatWithCommas(value){
    const numberFormatter = Intl.NumberFormat('en-US');
    return numberFormatter.format(value);
  }
  

   // for a view class
   displayPurchaseTotals(){
    const shopItems = this.inv.getCurrentItemsData();

    shopItems.forEach(function (values, id) {
    document.getElementsByClassName("total-val")[id].innerText=shopItems[id].total;
    });
  }



  doesStorageItemExist(itemVal){
    if(localStorage.getItem(itemVal) !== null){
      return true;
    }
    return false;
  }


  clearAllData(){
    this.clearStorage();
    this.setStoredItems();
    this.inv.initialise();
    this.resetPageCounters();
  }




}

