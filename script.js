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



// window.addEventListener("scroll", () => {
//     const viewPortHeight = window.innerHeight;

//     for (let i = 0; i < cards.length; i++) {
//         const cardPosition = cards[i].getBoundingClientRect();

//         // Check if the card is within the viewport
//         if (cardPosition.top + cardPosition.height / 2 < viewPortHeight && cardPosition.bottom > 0) {
//             // Expand the card if it's not already expanded
//             if (!cards[i].classList.contains("expand")) {
//                 const scrollHeight = insideText[i].scrollHeight;
//                 insideText[i].style.height = `${scrollHeight}px`;
//                 cards[i].classList.add("expand");
//             }
//         } else {
//             // Collapse the card if it's expanded and no longer in the viewport
//             if (cards[i].classList.contains("expand")) {
//                 insideText[i].style.height = "0";
//                 cards[i].classList.remove("expand");
//             }
//         }
//     }
// });






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


