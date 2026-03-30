<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Data Hub - React</title>
    <link rel="stylesheet" href="style.css">
    <!-- Reliable CDNs that bypass local CORS blocks -->
    <script src="https://cdn.jsdelivr.net"></script>
    <script src="https://cdn.jsdelivr.net"></script>
    <script src="https://cdn.jsdelivr.net"></script>
</head>
<body>
    <div id="root"></div>

    <script>
        const e = React.createElement;
        const { useState, useEffect } = React;

        function App() {
            const [data, setData] = useState([]);
            const [loading, setLoading] = useState(true);
            const [search, setSearch] = useState('');
            const [filter, setFilter] = useState('all');

            // 1. Fetch Dynamic Data from API
            useEffect(() => {
                fetch('https://jsonplaceholder.typicode.com')
                    .then(res => res.json())
                    .then(json => {
                        setData(json);
                        // Artificial delay to show skeleton loading
                        setTimeout(() => setLoading(false), 1000);
                    })
                    .catch(err => console.error("Fetch Error:", err));
            }, []);

            // 2. Initialize Lucide Icons after every render
            useEffect(() => {
                if (window.lucide) window.lucide.createIcons();
            });

            // 3. Filtering Logic (Search + Even/Odd ID)
            const filteredData = data.filter(item => {
                const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
                const isEven = item.id % 2 === 0;
                const matchesFilter = filter === 'all' ? true : 
                                     filter === 'even' ? isEven : !isEven;
                return matchesSearch && matchesFilter;
            }).slice(0, 6); // Limit to 6 items

            // 4. Render Structure using standard JS (No Babel required)
            return e('div', { className: 'app-wrapper' },
                e('nav', { className: 'navbar' },
                    e('div', { className: 'nav-container' },
                        e('span', { className: 'logo' }, 'DATA', e('span', null, 'HUB')),
                        e('div', { className: 'nav-links' }, 
                            e('a', { href: '#' }, 'Home'),
                            e('a', { href: '#' }, 'Docs')
                        )
                    )
                ),
                e('main', { className: 'container' },
                    e('header', { className: 'hero' },
                        e('h1', null, 'Dynamic Resource Explorer'),
                        e('p', null, 'Fetching real-time data from external API endpoints.')
                    ),
                    e('section', { className: 'controls' },
                        e('div', { className: 'search-wrapper' },
                            e('i', { 'data-lucide': 'search' }),
                            e('input', { 
                                type: 'text', 
                                placeholder: 'Search by title...', 
                                value: search,
                                onChange: (v) => setSearch(v.target.value)
                            })
                        ),
                        e('div', { className: 'filter-wrapper' },
                            e('select', { value: filter, onChange: (v) => setFilter(v.target.value) },
                                e('option', { value: 'all' }, 'All IDs'),
                                e('option', { value: 'even' }, 'Even IDs Only'),
                                e('option', { value: 'odd' }, 'Odd IDs Only')
                            )
                        )
                    ),
                    e('div', { className: 'results-grid' },
                        loading ? 
                            // Render 6 Skeletons while loading
                            Array(6).fill(0).map((_, i) => 
                                e('div', { key: i, className: 'skeleton-card' },
                                    e('div', { className: 'skeleton-box', style: { width: '40%', height: '12px', background: '#eee', marginBottom: '10px' } }),
                                    e('div', { className: 'skeleton-box', style: { width: '90%', height: '24px', background: '#eee', marginBottom: '10px' } }),
                                    e('div', { className: 'skeleton-box', style: { width: '100%', height: '12px', background: '#eee' } })
                                )
                            ) :
                            filteredData.map(item => 
                                e('div', { 
                                    key: item.id, 
                                    className: 'card',
                                    onClick: () => window.open(`https://jsonplaceholder.typicode.com/${item.id}`, '_blank')
                                },
                                    e('span', null, `ID #${item.id}`),
                                    e('h3', null, item.title.substring(0, 35) + "..."),
                                    e('p', null, item.body.substring(0, 80) + "...")
                                )
                            )
                    )
                ),
                e('footer', { className: 'site-footer' }, 
                    e('div', { className: 'footer-grid' }, 
                        e('div', { className: 'footer-info' }, 
                            e('h3', null, 'DataHub'),
                            e('p', null, 'Clean. Fast. Dynamic.')
                        )
                    ),
                    e('div', { className: 'footer-bottom' }, '© 2026 DataHub API Project.')
                )
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(e(App));
    </script>
</body>
</html>
