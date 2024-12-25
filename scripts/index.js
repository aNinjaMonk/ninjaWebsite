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
        alert('Previous Button Clicked');
        _gs('event', 'Previous Button Clicked');
    });

    document.getElementById('nextBtn').addEventListener('click', function() {
        if (currentIndex < totalItems - visibleItems) {
            currentIndex++;
            updateGallery();
        }
        _gs('event', 'Next Button Clicked');
    });

    updateGallery(); // Initial call to set up the gallery

    // Track clicks on team member LinkedIn buttons
    const linkedinButtons = document.querySelectorAll('.team .btn');
    linkedinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const memberName = this.closest('.card').querySelector('.card-title').textContent;
            _gs('event', 'LinkedIn Click', { member: memberName });
        });
    });
});
