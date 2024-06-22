let dropdownselects = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");

for(let select of dropdownselects ){
    for(currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText=currcode;
        newoption.value= currcode;
        if(select.name==="from" && currcode==="USD"){
            newoption.selected = "selected";
        }else if(select.name === "to" && currcode==="INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}
const updateflag = (Element)=>{
    let currcode= Element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let name = Element.name;
    let img = document.querySelector(`.${name} img`);
    img.src = newsrc;
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault(); 
    updateexchangerate();
});
const updateexchangerate = async ()=>{
    let amount = document.querySelector(".amount input");
    let amountval = amount.value;
    if(amountval==="" ||  amountval<1){
        amountval = 1;
        amount.value = 1;
    }
    let from  = document.querySelector(".from select");
    let to = document.querySelector(".to select");
    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json(); 
    let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
    let msgbox = document.querySelector(".msgbox");
    msgbox.innerText = `${amountval} ${from.value} = ${amountval*rate} ${to.value}`
}
window.addEventListener("load",updateexchangerate());

