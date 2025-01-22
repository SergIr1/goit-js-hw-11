import SimpleLightbox from "simplelightbox";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import closeModalIcon from "./img/close-modal-btn.svg"

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector(".js-gallery");
const loaderBackdrop = document.querySelector(".loader-backdrop");

function showLoader() {
    loaderBackdrop.classList.remove('is-hidden');
}

function hideLoader() {
    loaderBackdrop.classList.add('is-hidden');
}

const createGalleryCardTemplate = imgInfo => {
    return `<li class="gallery-card">
                <a href="${imgInfo.largeImageURL}"><img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" width="${imgInfo.webformatWidth = 360}" height="${imgInfo.webformatHeight = 200}"></a>
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
                </li>`;
};

let gallery = new SimpleLightbox('.js-gallery a', { captionsData: 'alt', captionDelay: 250 });

const onSearchFormSubmit = event => {
    event.preventDefault();
    
    const searchQuery = event.currentTarget.elements.user_query.value.trim();

    if (searchQuery === "") {
            iziToast.warning({
        message: 'The field is empty! Please enter a search query!',
        timeout: 2500,
        position: "topRight",
        backgroundColor: "#f0ad4e",
        messageColor: "#ffffff",
    });
        return;
    };

    showLoader();

    fetch(`https://pixabay.com/api/?key=48343538-15a5755b500219024f825f792&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`).then(response => {
    if (!response.ok) {
        throw new Error(response.status);
        };

    return response.json();
    }).then(data => {

        if (data.total === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                timeout: 3500,
                position: "topRight",
                maxWidth: 432,
                titleColor: "#ffffff",
                messageColor: "#ffffff",
                backgroundColor: "#ef4040",
                close: false,
                closeIcon: true,
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

        searchFormEl.reset();

        // let gallery = new SimpleLightbox('.js-gallery a', { captionsData: 'alt', captionDelay: 250 });

        gallery.refresh();
        
}).catch(err => {
    if (err.message === "404") {
        console.error('Error:', err.message);
    iziToast.error({
        message: 'Something went wrong. Please try again later.',
        timeout: 5000,
        position: "topRight",
        backgroundColor: "#ef4040",
    });
    }
    
}).finally(() => {
    hideLoader();
});
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);