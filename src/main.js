import SimpleLightbox from "simplelightbox";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import closeModalIcon from "./img/close-modal-btn.svg"

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector(".js-gallery");

// console.log(fetch("https://pixabay.com/api/?key=48343538-15a5755b500219024f825f792"));

const createGalleryCardTemplate = imgInfo => {
    return `<li class="gallery-card">
                <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" width="${imgInfo.webformatWidth = 360}" height="${imgInfo.webformatHeight = 200}">
    <ul class="gallery-list">
      <li class="gallery-item">
        <h2 class="gallery-title">Likes</h2>
        <p class="gallery-text">${imgInfo.likes}</p>
      </li>
      <li class="gallery-item">
        <h2 class="gallery-title">Views</h2>
        <p class="gallery-text">${imgInfo.views}</p>
      </li>
      <li class="gallery-item">
        <h2 class="gallery-title">Comments</h2>
        <p class="gallery-text">${imgInfo.comments}</p>
      </li>
      <li class="gallery-item">
      <h2 class="gallery-title">Downloads</h2>
      <p class="gallery-text">${imgInfo.downloads}</p>
      </li>
    </ul>         
                </li>`
}

const onSearchFormSubmit = event => {
    event.preventDefault();
    
    const searchQuery = event.currentTarget.elements.user_query.value.trim();

    if (searchQuery === "") {
        alert("The field is empty");
        return;
    }
    console.log(searchQuery);

    fetch(`https://pixabay.com/api/?key=48343538-15a5755b500219024f825f792&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`).then(response => {
    if (!response.ok) {
        throw new Error(response.status);
    };

    return response.json();
    }).then(data => {
        if (data.total === 0) {
            iziToast.settings({
    close: true, // Включает крестик
    closeIconColor: '#FF0000', // Красный цвет крестика по умолчанию
});
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                timeout: 3500,
                position: "topRight",
                maxWidth: 432,
                titleColor: "#ffffff",
                messageColor: "#ffffff",
                backgroundColor: "#ef4040",
                close: false,
                closeIcon: false,
                closeIconColor: '#ffffff',
                closeOnEscape: true,
                closeOnClick: true,
                icon: 'font-icon',
                iconUrl: closeModalIcon,
            });
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