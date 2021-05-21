const images = [
    'images/field1.jpg',
    'images/purple.jpg',
    'images/jar.jpg',
    'images/green.jpg',
    'images/green1.jpg',
    'images/purple1.jpg',
    'images/magnolias.jpg',
    'images/daisy1.jpg'
];

const initScreen = () => {
    images.forEach((image, idx) => {
        document.querySelector('.cards').innerHTML += `
            <li class="card">
                <div class="image" 
                    style="background-image:url('${image}')"
                    data-index="${idx}"></div>
            </li>`;
    });
};


//initScreen();


// const showImage = (ev) => {
//     const elem = ev.currentTarget;
//     console.log(elem.style.backgroundImage);
//     document.querySelector('.featured_image').style.backgroundImage = elem.style.backgroundImage;

// };




       
// const imageElements = document.querySelectorAll('.image');
// let currentIndex = 0;
// for (const elem of imageElements) {
//     elem.onclick = showImage;
//     currentIndex += 1;

// }

    
//Hint 2: currentIndex as a global variable:
let currentIndex = 0;

// create event handler:
const showImage = (ev) => {
    const elem = ev.currentTarget;
    currentIndex = parseInt(elem.dataset.index);
    console.log("currentIndex:", currentIndex);
    displayImage();
    
};

const showNext = () => {
    currentIndex += 1;
    if (currentIndex >= images.length) {
        currentIndex = 0;

    }
    console.log("currentIndex:", currentIndex);
    // update .featured_image
    displayImage();
    
};

const showPrev = () => {
    currentIndex -= 1;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;

    }
    console.log("currentIndex:", currentIndex);
    // update .featured_image
    displayImage();
    
};

const displayImage = () => {
    const currim = images[currentIndex];
    document.querySelector('.featured_image').style.backgroundImage = `url('${currim}')`;

    


}
// attach event handler to all of the image tags 
// (after initScreen() has been invoked).
const attachEventHandlers =()=> {
    const imageElements = document.querySelectorAll('.image');
    for (const elem of imageElements) {
        elem.onclick = showImage;
    }



    document.querySelector('.next').onclick = showNext;
    document.querySelector('.prev').onclick = showPrev;
    document.querySelector('.featured_image').onclick = showNext;
};   


initScreen();
attachEventHandlers();