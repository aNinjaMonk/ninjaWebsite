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

    function scrollCarousel(container, direction) {
        const itemWidth = container.querySelector('.carousel-item').offsetWidth;
        container.scrollBy({
            left: direction * itemWidth,
            behavior: 'smooth'
        });
    }

    function displayBlogPosts(posts) {
        const blogSection = document.getElementById('blog-posts');
        blogSection.innerHTML = ''; // Clear existing posts

        const chunkSize = 3; // Number of posts to show at a time
        for (let i = 0; i < posts.length; i += chunkSize) {
            const chunk = posts.slice(i, i + chunkSize);
            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${i === 0 ? 'active' : ''}`;

            const row = document.createElement('div');
            row.className = 'row';

            chunk.forEach(post => {
                const col = document.createElement('div');
                col.className = 'col-md-4';
                col.innerHTML = `
                    <a href="${post.url}" class="text-decoration-none">
                        <div class="card h-100">
                            <img src="${post.feature_image}" class="card-img-top" alt="${post.title}">
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                            </div>
                        </div>
                    </a>
                `;
                row.appendChild(col);
            });

            carouselItem.appendChild(row);
            blogSection.appendChild(carouselItem);
        }

        // Add navigation buttons
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="bi bi-arrow-left-short" />';
        prevBtn.classList.add('btn', 'btn-icon-circle');
        prevBtn.addEventListener('click', () => scrollCarousel(carouselContainer, -1));

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="bi bi-arrow-right-short" />';
        nextBtn.classList.add('btn', 'btn-icon-circle', 'ms-2');
        nextBtn.addEventListener('click', () => scrollCarousel(carouselContainer, 1));

        const paginationControls = document.getElementById('pagination-controls');
        paginationControls.innerHTML = '<div class="col-md-10 offset-md-1 text-center"><a href="./blog" class="view-all">View All</a></div>';
        const btnControls = document.createElement('div');
        btnControls.classList.add('col-md-1', 'd-flex', 'align-right');
        btnControls.appendChild(prevBtn);
        btnControls.appendChild(nextBtn);
        paginationControls.appendChild(btnControls);
    }

    async function fetchBlogPosts() {
        const ghostApiUrl = 'https://www.ninjamonk.in/ghost/api/content/posts/';
        const apiKey = '4d87e10fa3f68a7d4dc524e491'; // Replace with your actual API key
        try {
            const response = await fetch(`${ghostApiUrl}?key=${apiKey}&limit=all&filter=tag:-clients`);
            const data = await response.json();
            displayBlogPosts(data.posts);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    }

    //blogCarousel();
    fetchBlogPosts(); // Initial call to fetch and display the blog posts
    portfolioGallery(); // Initial call to set up the gallery
    domainExperts();
});
