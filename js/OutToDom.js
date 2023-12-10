/*
- A standalone helper class for writing HTML information to the browser.
- Is not coupled to any external data.
-
*/



export default class OutToDom {


  applyFontSizeChangeEffect(id, className, fontSize, newFontSize){
    const delayTime = 10;
    const origFontSize = fontSize;
    const largeFontSize = newFontSize;

    let boxSelected = document.getElementsByClassName(className);
      boxSelected[id].style.fontSize = largeFontSize;
      setTimeout(() => {
      boxSelected[id].style.fontSize = origFontSize;
      }, 180);
      setTimeout(() => {}, delayTime);
  }


  outputTextByElementIDCommaFormat(value, idName){
    document.getElementById(idName).innerText = this.formatWithCommas(value);;
  }


  outputTextByClassNameCommaFormat(value, idName, idNum){
    document.getElementsByClassName(idName)[idNum].innerText = this.formatWithCommas(value);;
  }


  outputTextByClassNameCommaFormat(value, idName, idNum){
    document.getElementsByClassName(idName)[idNum].innerText = this.formatWithCommas(value);;
  }


  outputTextByClassName(value, className, idNum){
  document.getElementsByClassName(className)[idNum].innerText = value;
  }


  formatWithCommas(value){
    const numberFormatter = Intl.NumberFormat('en-US');
    return numberFormatter.format(value);
  }


  formatElementIdCommas(number, element){
  number = this.formatWithCommas(number);
  document.getElementById(element).innerText = number;
  }

  outputClickedCookie(name, imageNameCurrent, imageNameClk){
    const delayTime = 10;

    let boxSelected = document.getElementById(name);
    boxSelected.src = imageNameClk;
    setTimeout(() => {
    boxSelected.src = imageNameCurrent;
    }, 180);
    setTimeout(() => {}, delayTime);
  }

}