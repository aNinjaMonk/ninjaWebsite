document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.querySelector('.portfolio-gallery .row');
    const items = gallery.children;
    const totalItems = items.length;
    const visibleItems = 3;
    let currentIndex = 0;

    function updateGallery() {
        for (let i = 0; i < totalItems; i++) {
            items[i].style.display = (i >= currentIndex && i < currentIndex + visibleItems) ? 'block' : 'none';
        }
    }

    document.getElementById('prevBtn').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
        }
    });

    document.getElementById('nextBtn').addEventListener('click', function() {
        if (currentIndex < totalItems - visibleItems) {
            currentIndex++;
            updateGallery();
        }
    });

    updateGallery(); // Initial call to set up the gallery
});
