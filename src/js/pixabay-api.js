export const fetchPhotosByQuery = searchQuery => {
    return fetch(`https://pixabay.com/api/?key=48343538-15a5755b500219024f825f792&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
}