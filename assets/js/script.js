let slideIndex = 0;
let currentSlideIndex = 0;
let slideArray = [];

function Slide(title, subtitle, background, link ) {
    this.title = title;
    this.subtitle = subtitle;
    this.background = background;
    this.link = link;
    this.id = "slide" + slideIndex;
    slideIndex++;
    slideArray.push(this);
}

// ви можете зробити скільки завгодно слайдів
let slide1 = new Slide(
    "Bramley Road",
    "London",
    "assets/img/logo.png",
    "https://www.rightmove.co.uk/properties/47076907#/"
);

let slide2 = new Slide(
    "Musbury Street",
    "Stepney Green",
    "assets/img/logo.png",
    "https://www.rightmove.co.uk/properties/97730972#/"
);
let slide3 = new Slide(
    "AOL",
    "America online",
    "assets/img/logo.png",
    "http://aol.com"
);
let slide4 = new Slide(
    "SpaceX",
    "Space Exploration Technologies Corporation",
    "assets/img/logo.png",
    "http://spacex.com"
);
function buildSlider(){
    let myHTML ="";
    for(let i = 0; i < slideArray.length; i++) {
        myHTML += "<div id='" + slideArray[i].id +
            "' class='singleSlide' style='background-image:url(" + slideArray[i].background + ");'>" +
            "<div class='slideOverlay'>" +
            "<h1>" + slideArray[i].title + "</h1>" +
            "<h4>" + slideArray[i].subtitle + "</h4>" +
            "<a class='slider' href='" + slideArray[i].link + "' target='_blank'>Open Link</a>" +
            "</div>" +
            "</div>";
    }

    document.getElementById("mySlider").innerHTML = myHTML;
    document.getElementById("slide" + currentSlideIndex).style.left = 0;
}

buildSlider();

function prevSlide(){
    let nextSlideIndex;
    if (currentSlideIndex === 0 ) {
        nextSlideIndex = slideArray.length - 1;
    } else {
        nextSlideIndex = currentSlideIndex - 1;
    }

    document.getElementById("slide" + nextSlideIndex).style.left = "-100%";
    document.getElementById("slide" + currentSlideIndex).style.left = 0;

    document.getElementById("slide" + nextSlideIndex).setAttribute("class", "singleSlide slideInLeft");
    document.getElementById("slide" + currentSlideIndex).setAttribute("class", "singleSlide slideOutRight");

    currentSlideIndex = nextSlideIndex;
}

function nextSlide(){
    let nextSlideIndex;
    if (currentSlideIndex === (slideArray.length - 1) ) {
        nextSlideIndex = 0;
    } else {
        nextSlideIndex = currentSlideIndex + 1;
    }

    document.getElementById("slide" + nextSlideIndex).style.left = "100%";
    document.getElementById("slide" + currentSlideIndex).style.left = 0;

    document.getElementById("slide" + nextSlideIndex).setAttribute("class", "singleSlide slideInRight");
    document.getElementById("slide" + currentSlideIndex).setAttribute("class", "singleSlide slideOutLeft");

    currentSlideIndex = nextSlideIndex;
}
