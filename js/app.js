// Simple app.js for minimal portfolio with Substack integration
class MinimalPortfolio {
    constructor() {
        this.init();
    }

    init() {
        console.log('🚀 Minimal portfolio loaded');
        this.addSmoothScrolling();
        this.addScrollEffects();
        this.loadSubstackFeed(); // Load blog posts
    }

    addSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    addScrollEffects() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        document.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }

    // ===== Substack Feed Fetcher ===== //
    async loadSubstackFeed() {
        const feedContainer = document.getElementById('substack-feed');
        if (!feedContainer) return;

        const rssUrl = 'https://blogbysomanshu.substack.com/feed';
        const converterUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        try {
            const response = await fetch(converterUrl);
            const data = await response.json();

            if (data.status === 'ok') {
                feedContainer.innerHTML = '';

                // Take the first 3 posts only
                data.items.slice(0, 3).forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'project-card';
                    
                    const date = new Date(item.pubDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });

                    card.innerHTML = `
                        <div class="project-header">
                            <h3>${item.title}</h3>
                            <span class="project-year">${date}</span>
                        </div>
                        <p class="project-description">
                            ${this.stripHtml(item.description).substring(0, 140)}...
                        </p>
                        <div class="project-actions">
                            <a href="${item.link}" class="btn btn-small" target="_blank">
                                Read Article ↗
                            </a>
                        </div>
                        <div class="project-tags">
                            <span class="tag">Substack</span>
                            <span class="tag">Writing</span>
                        </div>
                    `;
                    
                    feedContainer.appendChild(card);
                });
                
                // Re-trigger scroll animations for the new cards
                this.addScrollEffects();
            }
        } catch (error) {
            console.error('Error fetching Substack feed:', error);
            feedContainer.innerHTML = `
                <div class="project-card" style="text-align: center;">
                    <p>Check out my <a href="https://blogbysomanshu.substack.com/">Substack</a> for the latest writing.</p>
                </div>
            `;
        }
    }

    stripHtml(html) {
       let tmp = document.createElement("DIV");
       tmp.innerHTML = html;
       return tmp.textContent || tmp.innerText || "";
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MinimalPortfolio();
});