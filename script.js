let menu = document.querySelector('#menu-bars');
let header = document.querySelector('header');
let cards = document.querySelectorAll('.card');
let insideText = document.querySelectorAll('.insideText');



menu.onclick = () => {
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');
}

menu.onscroll = () =>{
    menu.classList.remove('fa-times');
    header.classList.remove('active');
}



window.addEventListener("scroll",()=>{
    const viewPortHeight = window.innerHeight;
 
    const cardPosition = card1.getBoundingClientRect();

    // console.log(cardPosition);
    
    // console.log(`test:${cardPosition.top+cardPosition.height/2}`);
    // console.log("windows height: " + window.innerHeight);
    // console.log("cardBotton:" + cardPosition.bottom);

    if(cardPosition.top+cardPosition.height/2 < viewPortHeight && cardPosition.bottom > 0){
        // console.log("windows height: " + window.innerHeight);
        // console.log(cardPosition);
        
        // console.log("cardTop"+cardPosition.top);
        // console.log("cardBotton:" + cardPosition.bottom);

        const scrollHeight = insideText[0].scrollHeight;


    
    }

   

})





for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("mouseenter",()=>{
        const scrollHeight = insideText[i].scrollHeight;
    
        if(!cards[i].classList.contains("expand")){
            insideText[i].style.height = `${scrollHeight}px`;
            cards[i].classList.add("expand");
        }
    
    })

    cards[i].addEventListener("mouseleave",()=>{
        const scrollHeight = insideText[i].scrollHeight;

        if(cards[i].classList.contains("expand")){
            insideText[i].style.height = 0;
            cards[i].classList.remove("expand");
        }
    
    })
}


