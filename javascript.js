const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let allData = [];
const grid = document.getElementById('resultsGrid');

// 1. Show Skeleton Loading State
function showSkeletons() {
    grid.innerHTML = Array(6).fill(0).map(() => `
        <div class="skeleton-card">
            <div class="skeleton-box" style="width: 30%; height: 12px;"></div>
            <div class="skeleton-box" style="width: 80%; height: 24px;"></div>
            <div class="skeleton-box" style="width: 100%; height: 12px;"></div>
            <div class="skeleton-box" style="width: 60%; height: 12px;"></div>
        </div>
    `).join('');
}

// 2. Fetch Data from the API
async function fetchData() {
    showSkeletons();
    try {
        // Simulated delay to make the skeleton animation visible
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        allData = await response.json();
        
        displayData(); 
    } catch (error) {
        console.error('Fetch error:', error);
        grid.innerHTML = `<div style="padding:40px; color:red; grid-column: 1/-1; text-align:center;">Failed to load live data.</div>`;
    }
}

// 3. Display Logic (Search, Even/Odd Filter, and 6-item Limit)
function displayData() {
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    const idFilter = document.getElementById('filterSelect').value;

    let filtered = allData.filter(item => {
        // Search filter
        const matchesSearch = item.title.toLowerCase().includes(searchVal);
        
        // Even/Odd filter logic
        const isEven = item.id % 2 === 0;
        const matchesId = idFilter === 'all' || 
                         (idFilter === 'even' && isEven) || 
                         (idFilter === 'odd' && !isEven);

        return matchesSearch && matchesId;
    });

    // Limit to 6 items as requested
    const limited = filtered.slice(0, 6);

    if (limited.length === 0) {
        grid.innerHTML = `<div style="padding:40px; color:#94a3b8; grid-column: 1/-1; text-align:center;">No results found...</div>`;
        return;
    }

    grid.innerHTML = limited.map(item => `
        <div class="card">
            <span>ID #${item.id}</span>
            <h3>${item.title.substring(0, 35)}...</h3>
            <p>${item.body.substring(0, 80)}...</p>
        </div>
    `).join('');
}

// 4. Event Listeners
document.getElementById('searchInput').addEventListener('input', displayData);
document.getElementById('filterSelect').addEventListener('change', displayData);

// Initialize
fetchData();

// Render Icons after window loads
window.addEventListener('load', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();
});
