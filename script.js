const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff; 

const showHideIcons = () => {
    // SHOWING AND HIDING PREV/NEXT ICON ACCORDING TO CARUSEL LEFT VALUE
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // GETTING MAX SCROLLABLE WIDTH
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; //GETTING FIRST IMG WIDTH & ADDING 14 MARGIN VALUE
        // IF CLICKED ICON IS LEFT, REDUCE WIDTH VALUE FROM THE CAROUSEL SCROLL LEFT ELSE ADD TO IT
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // CALLING SHOWHIDE ICONS AFTER 60MS
    })
})

const autoSide = () => {
    // IF THERE IS NO IMAGE LEFT TO SCROLL THEN RETURN FROM HERE
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff) // MAKING POSITIONDIFF VALUE TO POSITIVE
    let firstImgWidth = firstImg.clientWidth + 14;
    // GETTING DIFFERENCE VALUE THAT NEEDS TO ADD OR REDUCE FROM CAROUSEL LEFT TO TAKE MIDDLE IMG CENTER
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // IF USER IS SCROLLING TO THE RIGHT
    positionDiff= Math.abs(positionDiff) // MAKING POSITIONDIFF VALUE TO POSITIVE
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // IF USER IS SCROLLING TO THE LEFT
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // UPDATATING GLOBAL VARIABLES VALUE ON MOUSE DOWN EVENT
    isDragStart = true; 
    carousel.style.scrollBehavior = "auto";
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
} 

const dragging = (e) => { 
    // SCROLLING IMAGES/CAROUSEL TO LEFT ACCORDING TO MOUSE POINTER
    if(!isDragStart) return; 
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff; 
    showHideIcons();
} 

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    carousel.style.scrollBehavior = "smooth";
    if(!isDragging) return;
    isDragging = false;
    autoSide();
}


carousel.addEventListener("mousedown", dragStart); 
carousel.addEventListener("touchstart", dragStart); 

carousel.addEventListener("mousemove", dragging); 
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

function atualizarProcedimento(titulo, texto, imagem) {
  const procedimentoDiv = document.querySelector(".procedimento");
  procedimentoDiv.querySelector(".titulo-procedimento").textContent = titulo;
  procedimentoDiv.querySelector("p").textContent = texto;
  procedimentoDiv.style.backgroundImage = `url(${imagem})`;
}