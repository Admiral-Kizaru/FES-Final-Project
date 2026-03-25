const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let allData = []; // This will hold the dynamic data from the API
let activeCat = 'All';

// 1. Fetch Data from the API
async function fetchData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        allData = await response.json();
        
        // Map the API data to match your existing 'category' logic
        // JSONPlaceholder doesn't have categories, so we'll assign them based on userId
        allData = allData.map(item => ({
            ...item,
            category: item.userId % 3 === 0 ? 'Software' : 
                      item.userId % 3 === 1 ? 'Food' : 'Hardware'
        }));

        displayData(); // Initial render once data is loaded
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('resultsGrid').innerHTML = 
            `<div style="padding:40px; color:red;">Failed to load live data. Check your connection.</div>`;
    }
}

// 2. Display Logic (Search, Filter, and 6-item Limit)
function displayData() {
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    const grid = document.getElementById('resultsGrid');

    let filtered = allData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchVal);
        const matchesCat = activeCat === 'All' || item.category === activeCat;
        return matchesSearch && matchesCat;
    });

    // Limit to 6 items as requested
    const limited = filtered.slice(0, 6);

    if (limited.length === 0) {
        grid.innerHTML = `<div style="padding:40px; color:#94a3b8;">No results found...</div>`;
        return;
    }

    grid.innerHTML = limited.map(item => `
        <div class="card">
            <span>Resource #${item.id}</span>
            <h3>${item.title.substring(0, 35)}...</h3>
            <p>${item.body.substring(0, 80)}...</p>
            <div class="pill ${item.category}">${item.category}</div>
        </div>
    `).join('');
}

// 3. Category Filter Logic
function filterByCategory(cat) {
    activeCat = cat;
    document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.innerText === cat));
    displayData();
}

// Event Listeners
document.getElementById('searchInput').addEventListener('input', displayData);

// Initialize
fetchData();

// Icons
window.addEventListener('load', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();
});
