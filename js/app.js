// Add your Substack posts here! 
const myWriting = [
    {
        title: "The problem with generic templates",
        date: "Feb 28, 2026",
        excerpt: "Why the current web aesthetic is making every PM portfolio look exactly the same.",
        link: "https://blogbysomanshu.substack.com/"
    },
    {
        title: "Dharma in Product Design",
        date: "Feb 15, 2026",
        excerpt: "How ancient philosophy helped me rethink user retention and ethical loops.",
        link: "https://blogbysomanshu.substack.com/"
    },
    {
        title: "Building in Public: The Purushartha Journey",
        date: "Jan 10, 2026",
        excerpt: "Technical challenges and philosophical breakthroughs while building a React Native app.",
        link: "https://blogbysomanshu.substack.com/"
    }
];

function initWriting() {
    const container = document.getElementById('substack-feed');
    if (!container) return;

    container.innerHTML = myWriting.map(post => `
        <article class="blog-entry">
            <span class="blog-date">${post.date}</span>
            <a href="${post.link}" target="_blank" style="text-decoration:none; color:inherit;">
                <h3>${post.title}</h3>
            </a>
            <p style="color: #666;">${post.excerpt}</p>
            <a href="${post.link}" target="_blank" style="font-size: 0.8rem; font-weight:bold; color:#000; text-decoration:none; margin-top:10px; display:inline-block;">Read Full Post ↗</a>
        </article>
    `).join('');
}

document.addEventListener('DOMContentLoaded', initWriting);
