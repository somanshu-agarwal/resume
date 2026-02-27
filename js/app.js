const DATA = {
    work: [
        {
            title: "FinTech Q2C Transformation",
            company: "FIS • 2024",
            desc: "Modernized quote-to-cash for global fintech via Azure middleware.",
            metrics: [["60%", "Faster"], ["6+", "Integrations"]],
            tags: ["Azure", "Middleware", "Enterprise"]
        },
        {
            title: "B2B Workflow Automation",
            company: "Sago • 2023",
            desc: "Automated RFQ-to-Invoice for international teams. Reduced manual work.",
            metrics: [["30%", "Less Manual"], ["10d", "Faster Cycle"]],
            tags: ["Automation", "APIs", "Salesforce"]
        }
    ],
    vibe: [
        {
            title: "Purushartha App",
            desc: "Life manager inspired by Indian philosophy. Balancing Dharma and Artha.",
            link: "https://purushartha.expo.app/",
            tags: ["React Native", "Philosophy"]
        },
        {
            title: "BareMinimum",
            desc: "B2C personal finance app for mindful, zero-based budgeting.",
            link: "https://github.com/somanshu-agarwal/bareminimum",
            tags: ["React", "Finance"]
        }
    ],
    design: [
        {
            title: "BidCube UX Revamp",
            desc: "Complete redesign of bidding management tool strategy and UI flow.",
            link: "https://www.figma.com/board/5P5LysmciTrtPB0YVpefUe/Bid-Cube-Revamp",
            tags: ["Figma", "UX Strategy"]
        },
        {
            title: "Sukanya Samriddhi",
            desc: "Financial calculator journey helping parents plan for education.",
            link: "https://www.figma.com/proto/4wTt0Xpeavnv2VHBrp1Jwu/Untitled",
            tags: ["B2C", "Financial UX"]
        }
    ],
    writing: [
        {
            title: "The problem with generic templates",
            date: "Feb 28, 2026",
            excerpt: "Why the current web aesthetic is making every PM portfolio look the same.",
            link: "https://blogbysomanshu.substack.com/"
        },
        {
            title: "Dharma in Product Design",
            date: "Feb 15, 2026",
            excerpt: "Applying ancient philosophy to rethink ethical user retention.",
            link: "https://blogbysomanshu.substack.com/"
        }
    ]
};

class PortfolioApp {
    init() {
        this.renderWork();
        this.renderVibe();
        this.renderDesign();
        this.renderWriting();
    }

    renderWork() {
        const grid = document.getElementById('work-grid');
        grid.innerHTML = DATA.work.map(p => `
            <div class="project-card">
                <div>
                    <div class="project-header"><h3>${p.title}</h3><span>${p.company}</span></div>
                    <p>${p.desc}</p>
                    <div class="project-metrics">
                        ${p.metrics.map(m => `<div class="metric"><span class="metric-value">${m[0]}</span><span class="metric-label">${m[1]}</span></div>`).join('')}
                    </div>
                </div>
                <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            </div>
        `).join('');
    }

    renderVibe() {
        const grid = document.getElementById('vibe-grid');
        grid.innerHTML = DATA.vibe.map(p => `
            <div class="project-card">
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
                <a href="${p.link}" target="_blank" class="btn btn-secondary btn-small">View Project ↗</a>
                <div class="project-tags" style="margin-top:15px">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            </div>
        `).join('');
    }

    renderDesign() {
        const grid = document.getElementById('design-grid');
        grid.innerHTML = DATA.design.map(p => `
            <div class="project-card">
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
                <a href="${p.link}" target="_blank" class="btn btn-secondary btn-small">View Figma ↗</a>
                <div class="project-tags" style="margin-top:15px">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            </div>
        `).join('');
    }

    renderWriting() {
        const feed = document.getElementById('substack-feed');
        feed.innerHTML = DATA.writing.map(post => `
            <article class="blog-entry" style="margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 2rem;">
                <span class="blog-date" style="color:#999; font-size:0.8rem;">${post.date}</span>
                <a href="${post.link}" target="_blank" style="text-decoration:none; color:inherit;"><h3>${post.title}</h3></a>
                <p style="color:var(--accent)">${post.excerpt}</p>
            </article>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    app.init();
});
