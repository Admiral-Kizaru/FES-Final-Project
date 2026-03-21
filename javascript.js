const transactions = [
    { id: 1, name: "Amazon Web Services", date: "2026-03-20", amount: 150.00, category: "Infrastructure" },
    { id: 2, name: "Starbucks Coffee", date: "2026-03-18", amount: 12.50, category: "Food" },
    { id: 3, name: "Apple Store", date: "2026-03-21", amount: 1299.00, category: "Hardware" },
    { id: 4, name: "Figma Subscription", date: "2026-03-15", amount: 45.00, category: "Software" },
];

const listEl = document.getElementById('transactionList');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const totalEl = document.getElementById('totalAmount');

function render(data) {
    listEl.innerHTML = data.map(t => `
        <li class="t-card">
            <div class="t-info">
                <h4>${t.name}</h4>
                <p>${t.category} • ${t.date}</p>
            </div>
            <div class="t-amount">$${t.amount.toFixed(2)}</div>
        </li>
    `).join('');
    
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    totalEl.innerText = `$${total.toLocaleString()}`;
}

function updateUI() {
    let filtered = transactions.filter(t => 
        t.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );

    const sortType = sortSelect.value;
    filtered.sort((a, b) => {
        if (sortType === 'highest') return b.amount - a.amount;
        if (sortType === 'lowest') return a.amount - b.amount;
        if (sortType === 'newest') return new Date(b.date) - new Date(a.date);
        if (sortType === 'oldest') return new Date(a.date) - new Date(b.date);
    });

    render(filtered);
}

// Event Listeners
searchInput.addEventListener('input', updateUI);
sortSelect.addEventListener('change', updateUI);

// Initial Load
render(transactions);
lucide.createIcons(); // Renders the icons
