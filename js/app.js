document.addEventListener('DOMContentLoaded', () => {
    
    // --- Substack Feed Fetcher ---
    const feedContainer = document.getElementById('substack-feed');
    const substackUrl = 'https://blogbysomanshu.substack.com/feed';
    // We use rss2json as a free proxy to bypass CORS issues when fetching RSS in the browser
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(substackUrl)}`;

    // Utility function to strip HTML tags from the Substack description snippet
    const stripHtml = (html) => {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    if (feedContainer) {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                if (data.status === 'ok' && data.items.length > 0) {
                    // Clear the "Loading logs..." placeholder
                    feedContainer.innerHTML = '';
                    
                    // Grab the 3 most recent posts
                    data.items.slice(0, 3).forEach(item => {
                        const li = document.createElement('li');
                        li.className = 'log-item';
                        
                        // Format the date nicely (e.g., "Oct 24, 2024")
                        const date = new Date(item.pubDate).toLocaleDateString('en-US', {
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric'
                        });

                        // Clean up the description text and truncate it
                        const cleanDescription = stripHtml(item.description).substring(0, 160).trim();

                        li.innerHTML = `
                            <div class="log-meta">
                                <span>${date}</span>
                                <span class="tag">Writing</span>
                            </div>
                            <div class="log-title">
                                <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title} ↗</a>
                            </div>
                            <p>${cleanDescription}...</p>
                        `;
                        
                        feedContainer.appendChild(li);
                    });
                } else {
                    throw new Error('No items found in feed');
                }
            })
            .catch(error => {
                console.error('Error fetching Substack feed:', error);
                feedContainer.innerHTML = `
                    <li class="log-item">
                        <p>Failed to load recent logs. <a href="https://blogbysomanshu.substack.com/" target="_blank">Read my writing directly on Substack ↗</a></p>
                    </li>
                `;
            });
    }

    // --- Smooth Scrolling for Anchor Links (Optional Fallback) ---
    // Note: CSS `scroll-behavior: smooth` handles this natively in modern browsers,
    // but this ensures perfect behavior if you decide to add fixed headers later.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
