export const createGalleryCardTemplate = imgInfo => {
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

const loaderBackdrop = document.querySelector(".loader-backdrop");

export const showLoader = () => {
    loaderBackdrop.classList.remove('is-hidden');
};

export const hideLoader = () => {
    loaderBackdrop.classList.add('is-hidden');
}