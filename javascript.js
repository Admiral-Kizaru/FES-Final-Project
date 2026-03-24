// Local Mock Data (Simulating the API)
const allData = [
    { id: 1, title: "Modern Web Design", body: "Exploring the latest trends in UI/UX for 2026." },
    { id: 2, title: "JavaScript Performance", body: "How to optimize your code for faster load times." },
    { id: 3, title: "Responsive Layouts", body: "Using CSS Grid and Flexbox for mobile-first sites." },
    { id: 4, title: "API Integration", body: "A guide to fetching and displaying dynamic content." },
    { id: 5, title: "Component Systems", body: "Building reusable UI elements for scale." },
    { id: 6, title: "State Management", body: "Keeping your data in sync across your application." },
    { id: 7, title: "Security Best Practices", body: "Protecting your web applications from common threats." }
];

const grid = document.getElementById('resultsGrid');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');

function displayData() {
    const searchVal = searchInput.value.toLowerCase();
    const filterVal = filterSelect.value;

    let filtered = allData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchVal);
        const matchesFilter = filterVal === 'all' ? true : 
                             filterVal === 'even' ? item.id % 2 === 0 : 
                             item.id % 2 !== 0;
        return matchesSearch && matchesFilter;
    });

    // Limit to 6 items per your requirement
    const limited = filtered.slice(0, 6);

    if (limited.length === 0) {
        grid.innerHTML = `<div style="padding:40px; color:#94a3b8;">No results found...</div>`;
        return;
    }

    grid.innerHTML = limited.map(item => `
        <div class="card">
            <span>Resource #${item.id}</span>
            <h3>${item.title}</h3>
            <p>${item.body}</p>
        </div>
    `).join('');
}

// Event Listeners
searchInput.addEventListener('input', displayData);
filterSelect.addEventListener('change', displayData);

// Initialize Page
displayData();

// Wait for Lucide to load safely
window.addEventListener('load', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();
});
