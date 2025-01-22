import SimpleLightbox from "simplelightbox";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector(".js-gallery");

// console.log(fetch("https://pixabay.com/api/?key=48343538-15a5755b500219024f825f792"));

const createGalleryCardTemplate = imgInfo => {
    return `<li class="gallery-card">
                <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" width="${imgInfo.webformatWidth=360}" height="${imgInfo.webformatHeight=180}">
            </li>`
};

const onSearchFormSubmit = event => {
    event.preventDefault();
    
    const searchQuery = event.currentTarget.elements.user_query.value.trim();

    if (searchQuery === "") {
        alert("The field is empty");
        return;
    }
    console.log(searchQuery);

    fetch(`https://pixabay.com/api/?key=48343538-15a5755b500219024f825f792&q=${searchQuery}&image_type=photo`).then(response => {
    if (!response.ok) {
        throw new Error(response.status);
    };

    return response.json();
    }).then(data => {
        if (data.total === 0) {
            alert('The image behind this keyword is unknown');

            galleryEl.innerHTML = "";

            searchFormEl.reset();

            return;
        }

        galleryEl.innerHTML = data.hits.map(el => createGalleryCardTemplate(el)).join("");

    console.log(data);
}).catch(err => {
    if (err.message === "404") {
        alert('error');
    }
    
});
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);

// inputEl.addEventListener('focus', () => {
//     inputEl.setAttribute('placeholder', 'hous|');
// });

// inputEl.addEventListener('blur', () => {
//     inputEl.setAttribute('placeholder', 'Search images...');
// })