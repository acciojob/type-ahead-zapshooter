const typeahead = document.getElementById('typeahead');
const suggestionsList = document.getElementById('suggestions-list');

let debounceTimer;

function clearSuggestions() {
  suggestionsList.innerHTML = '';
}

function renderSuggestions(suggestions) {
  clearSuggestions();
  suggestions.forEach(term => {
    const li = document.createElement('li');
    li.textContent = term;
    li.addEventListener('click', () => {
      typeahead.value = term;
      clearSuggestions();
    });
    suggestionsList.appendChild(li);
  });
}

typeahead.addEventListener('input', () => {
  clearTimeout(debounceTimer);

  const text = typeahead.value;

  if (!text) {
    clearSuggestions();
    return;
  }

  debounceTimer = setTimeout(() => {
    const url = `https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${encodeURIComponent(text)}`;

    fetch(url)
      .then(response => response.json())
      .then(suggestions => renderSuggestions(suggestions))
      .catch(() => {});
  }, 500);
});