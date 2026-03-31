// TASK 12.4 - Search & Filter

let allUsers = [];

const container = document.getElementById("users-container");
const loading = document.getElementById("loading");
const noResults = document.getElementById("no-results");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const cityFilter = document.getElementById("city-filter");

// Fetch users from API
async function fetchUsers() {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );
    if (!response.ok) throw new Error("Failed to fetch");
    return await response.json();
}

// Display users in DOM
function displayUsers(users) {
    if (users.length === 0) {
        container.innerHTML = "";
        noResults.classList.remove("hidden");
        return;
    }

    noResults.classList.add("hidden");
    container.innerHTML = users.map(user => `
        <div class="user-card">
            <h2>${user.name}</h2>
            <p>📧 ${user.email}</p>
            <p>🏢 ${user.company.name}</p>
            <p>📍 ${user.address.city}</p>
        </div>
    `).join("");
}

// Populate city dropdown
function populateCities(users) {
    const cities = [...new Set(users.map(u => u.address.city))].sort();
    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
}

// Apply all filters and sorting
function applyFilters() {
    const query = searchInput.value.toLowerCase();
    const sortVal = sortSelect.value;
    const city = cityFilter.value;

    let filtered = allUsers.filter(user => {
        const matchSearch =
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query);
        const matchCity =
            city === "all" || user.address.city === city;
        return matchSearch && matchCity;
    });

    if (sortVal === "az") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortVal === "za") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    displayUsers(filtered);
}

// Initialize
async function init() {
    try {
        allUsers = await fetchUsers();
        loading.classList.add("hidden");
        populateCities(allUsers);
        displayUsers(allUsers);

        // Set up search
        searchInput.addEventListener("input", applyFilters);

        // Set up sort
        sortSelect.addEventListener("change", applyFilters);

        // Set up city filter
        cityFilter.addEventListener("change", applyFilters);

    } catch (error) {
        loading.textContent = "Error loading users.";
        console.error(error);
    }
}

init();