const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
// let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail mouseimage" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">
    ( "Height: ${image.imageHeight} ${"X"} Width: ${image.imageWidth} ")`;

    gallery.appendChild(div)
  })

}

const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
}

let sliders = [];
let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');
  console.log('added');

  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  }

  else if (item >= -1) {

    element.classList.toggle('removed');
    console.log('deselected');
    sliders = sliders.filter(img => img == -1);

    // console.log('removed');  get deseleted all items if clicked on already added image , have to again select atleast two images

  }
  else {
    alert('Hey, Already added !')
  }
}
let timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }


  // create slider previous next area

  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    if (timer > 0) {
      changeSlide(slideIndex)
    }
  }, duration);
}
// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    // alert('please check duration')
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
  const gettime = document.getElementById('duration').value;
  const convertTime = parseInt(gettime);
  if (convertTime <= 0) {
    alert("Oh! Dear time can't run backward ");
  }
  else { createSlider() };

})

// const gettime = document.getElementById('duration').value;
// function timeValue() {
//   if (gettime <= 0) {
//     console.log('time can not be negative')
//   }
// }

// Enter button that triggers search button

const getInputsearch = document.getElementById('search');
getInputsearch.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('search-btn').click();
    // console.log('clicked')
    document.querySelector('.main').style.display = 'none';
    clearInterval(timer);
    const search = document.getElementById('search');
    getImages(search.value)
    sliders.length = 0;
  }

})

// enter button that trigger create slider button

const getSlideSearch = document.getElementById('duration');
getSlideSearch.addEventListener('keyup', function () {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('create-slider').click();
    // console.log('clicked');
    const gettime = document.getElementById('duration').value;
    const convertTime = parseInt(gettime);
    if (convertTime <= 0) {
      alert('time can not be negative');
    }
    else { createSlider() };
  }
})


//added onmouseover effect
// and particular image height, width for each image



