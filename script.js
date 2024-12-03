let menu = document.querySelector('#menu-bars');
let header = document.querySelector('header');
let cards = document.querySelectorAll('.card');
let insideText = document.querySelectorAll('.insideText');
let closeBtn = document.getElementById("closeBtn");
let modal = document.querySelector('.modal');
let readMoreBtn = document.querySelectorAll('.readMore');
let readMoreModal = document.getElementById("readMoreModal")

const readMoreData = {
    readMore1: [{
        text: "progress1-1",
        image: "ExperiencePic/KINOYUME.jpg"
    }, {
        text: "progres1-2",
        image: "ExperiencePic/slot.png"
    }], readMore2: [
        {
            text: "progress2-1",
            image: "ExperiencePic/KINOYUME.jpg"
        }, {
            text: "progress2-2",
            image: "ExperiencePic/slot.png"
        }
    ], readMore3: [
        {
            text: "progress3-1",
            image: "ExperiencePic/KINOYUME.jpg"
        }, {
            text: "progress3-2",
            image: "ExperiencePic/slot.png"
        }
    ]
}

closeBtn.addEventListener("click", () => {

    modal.classList.add('hide');
})


menu.onclick = () => {
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');
}

menu.onscroll = () => {
    menu.classList.remove('fa-times');
    header.classList.remove('active');
}

function readMore(button) {
    const buttonId = button.id;
    const data = readMoreData[buttonId];
    console.log(data);
    readMoreModal.innerHTML = data.map((d)=>{
        return `<div class = "readMoreInfo">
        <img src="${d.image}" alt="" class = "infoImage">
        <p>
            ${d.text}
        </p>
    </div>`
    }).join("");

    modal.classList.remove('hide');

}
// readMoreBtn.forEach(function(button){

//     button.addEventListener("onclick",()=>{
//         console.log(this.id);
//     })
// }) 


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

var swiper = new Swiper(".mySwiper", {


    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        640: {
            slidesPerView: 3,
        }
    }

});


window.embeddedChatbotConfig = {
    chatbotId: "ruz-riTxjh4cV7ZSzO08a",
    domain: "www.chatbase.co"
}


var typed = new Typed(".auto-type", {
    strings:
        ["a motivated Computer Science student with hands-on front-end development experience.",
            "passionate about creating user-focused digital solutions.",
            "thrive to learn new technologies, integrating AI to enhance user experiences."],
    typeSpeed: 50,
    backSpeed: 20,
    loop: true,
})








// for (let i = 0; i < cards.length; i++) {
//     cards[i].addEventListener("mouseenter", () => {
//         const scrollHeight = insideText[i].scrollHeight;

//         if (!cards[i].classList.contains("expand")) {
//             insideText[i].style.height = `${scrollHeight}px`;
//             cards[i].classList.add("expand");
//         }

//     })

//     cards[i].addEventListener("mouseleave", () => {
//         const scrollHeight = insideText[i].scrollHeight;

//         if (cards[i].classList.contains("expand")) {
//             insideText[i].style.height = 0;
//             cards[i].classList.remove("expand");
//         }

//     })
// }


