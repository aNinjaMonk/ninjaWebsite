document.addEventListener("DOMContentLoaded", function() {

    // Portfolio Gallery
    function portfolioGallery() {
        const gallery = document.querySelector('.portfolio-gallery .row');
        const items = gallery.children;
        const totalItems = items.length;
        const visibleItems = 3;
        let currentIndex = 0;

        for (let i = 0; i < totalItems; i++) {
            items[i].style.display = (i >= currentIndex && i < currentIndex + visibleItems) ? 'block' : 'none';
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
    }

    // Track clicks on team member LinkedIn buttons
    const linkedinButtons = document.querySelectorAll('.team .btn');
    linkedinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const memberName = this.closest('.card').querySelector('.card-title').textContent;
            _gs('event', 'LinkedIn Click', { member: memberName });
        });
    });

    function domainExperts() {
        // Change domain-experts text every 5 seconds
        const domainExpertsElement = document.getElementById("domain-experts");
        const domainExpertValues = ["Tech Innovators", "Industry Leaders", "Visionary Entrepreneurs", "Creative Thinkers"];
        let currentExpertIndex = 0;

        function updateDomainExpertText() {
            currentExpertIndex = (currentExpertIndex + 1) % domainExpertValues.length;
            domainExpertsElement.textContent = domainExpertValues[currentExpertIndex];
        }

        setInterval(updateDomainExpertText, 5000); // Change text every 5 seconds
    }

    async function fetchBlogPosts(page = 1, limit = 3) {
        const ghostApiUrl = 'https://www.ninjamonk.in/ghost/api/content/posts/';
        const apiKey = '4d87e10fa3f68a7d4dc524e491'; // Replace with your actual API key
        try {
            const response = await fetch(`${ghostApiUrl}?key=${apiKey}&limit=${limit}&page=${page}&filter=tag:-clients`);
            const data = await response.json();
            displayBlogPosts(data.posts, page, limit, data.meta.pagination.pages);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    }

    function displayBlogPosts(posts, currentPage, limit, totalPages) {
        const blogSection = document.getElementById('blog-posts');
        blogSection.innerHTML = ''; // Clear existing posts
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'col-md-4';
            postElement.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${post.feature_image}" class="card-img-top" alt="${post.title}">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.excerpt}</p>
                        <a href="${post.url}" target="_blank" class="btn btn-outline-danger">Read More</a>
                    </div>
                </div>
            `;
            blogSection.appendChild(postElement);
        });

        // Add pagination controls
        const paginationControls = document.getElementById('pagination-controls');
        paginationControls.innerHTML = ''; // Clear existing controls

        if (currentPage > 1) {
            const firstButton = document.createElement('button');
            firstButton.className = 'btn btn-secondary me-2';
            firstButton.innerHTML = '<i class="fas fa-angle-double-left"></i>'; // First icon
            firstButton.onclick = () => fetchBlogPosts(1, limit);
            paginationControls.appendChild(firstButton);

            const prevButton = document.createElement('button');
            prevButton.className = 'btn btn-secondary me-2';
            prevButton.innerHTML = '<i class="fas fa-angle-left"></i>'; // Previous icon
            prevButton.onclick = () => fetchBlogPosts(currentPage - 1, limit);
            paginationControls.appendChild(prevButton);
        }

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = `btn ${i === currentPage ? 'btn-primary' : 'btn-secondary'} me-2`;
            pageButton.textContent = i;
            pageButton.onclick = () => fetchBlogPosts(i, limit);
            paginationControls.appendChild(pageButton);
        }

        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.className = 'btn btn-secondary me-2';
            nextButton.innerHTML = '<i class="fas fa-angle-right"></i>'; // Next icon
            nextButton.onclick = () => fetchBlogPosts(currentPage + 1, limit);
            paginationControls.appendChild(nextButton);

            const lastButton = document.createElement('button');
            lastButton.className = 'btn btn-secondary';
            lastButton.innerHTML = '<i class="fas fa-angle-double-right"></i>'; // Last icon
            lastButton.onclick = () => fetchBlogPosts(totalPages, limit);
            paginationControls.appendChild(lastButton);
        }
    }

    fetchBlogPosts(); // Initial call to fetch and display the first page of blog posts
    portfolioGallery(); // Initial call to set up the gallery
    domainExperts();
});
