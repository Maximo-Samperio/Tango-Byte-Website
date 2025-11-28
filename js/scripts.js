document.addEventListener('DOMContentLoaded', () => {
// 1. Initialize Bootstrap tooltips
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el);
});

// 2. Clone #home-cards → #projects-cards on projects.html
const homeCards = document.getElementById('home-cards');
if (homeCards) return;  // we’re on index.html, so stop

fetch('index.html')
    .then(resp => resp.text())
    .then(html => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const cards = temp.querySelector('#home-cards');
    document.getElementById('projects-cards').append(...cards.children);
    })
    .catch(console.error);
});

// FILTERS: Year, Genre, Technology
const filters = { year: new Set(), genre: new Set(), tech: new Set() };

// 1. Attach change listeners to all filter checkboxes
document.querySelectorAll('.form-check-input[data-group]').forEach(cb => {
cb.addEventListener('change', () => {
const group = cb.dataset.group;         // "year" | "genre" | "tech"
const value = cb.value;                 // e.g., "2025" or "Puzzle"

if (cb.checked) filters[group].add(value);
else filters[group].delete(value);

applyFilters();
});
});

// 2. Filtering function
function applyFilters() {
document.querySelectorAll('#home-cards .col-md-4').forEach(wrapper => {
const year  = wrapper.dataset.year;
const genre = wrapper.dataset.genre;
const tech  = wrapper.dataset.tech;
let visible = true;

// If a filter group has selections, the card must match at least one
if (filters.year.size  && !filters.year.has(year))  visible = false;
if (filters.genre.size && !filters.genre.has(genre)) visible = false;
if (filters.tech.size  && !filters.tech.has(tech))  visible = false;

wrapper.style.display = visible ? '' : 'none';
});
}