const typeahead = document.getElementById('typeahead');
const suggestionsList = document.getElementById('suggestions-list');

let debounceTimer;

typeahead.addEventListener('input', () => {
  clearTimeout(debounceTimer);

  const text = typeahead.value;

  if (!text) {
    suggestionsList.innerHTML = '';
    return;
  }

  debounceTimer = setTimeout(async () => {
    try {
      const url = `https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      const suggestions = await response.json();

      suggestionsList.innerHTML = '';
      suggestions.forEach(term => {
        const li = document.createElement('li');
        li.textContent = term;
        li.addEventListener('click', () => {
          typeahead.value = term;
          suggestionsList.innerHTML = '';
        });
        suggestionsList.appendChild(li);
      });
    } catch (error) {
      // Silently handle network errors (e.g., intercept in test environments)
    }
  }, 500);
});