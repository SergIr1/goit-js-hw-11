import SimpleLightbox from "simplelightbox";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import closeModalIcon from "/img/close-modal-btn.svg"
import { createGalleryCardTemplate, showLoader, hideLoader } from "/js/render-functions.js";
import { fetchPhotosByQuery } from "/js/pixabay-api.js"; 


const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector(".js-gallery");


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

        fetchPhotosByQuery(searchQuery).then(data => {

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