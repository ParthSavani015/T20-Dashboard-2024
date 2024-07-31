function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  async function fetchJSON(file) {
    const response = await fetch(file);
    return await response.json();
  }
  
  async function searchResults(query) {
    const highlights = await fetchJSON('json/highlights.json');
    const potm = await fetchJSON('json/POTM.json'); // Add POTM.json to the search
  
    let resultsHTML = `<p>Results for "<strong>${query}</strong>":</p><div class="results-container">`;
  
    function searchInData(data) {
      return data.filter(item =>
        Object.values(item).some(val =>
          typeof val === 'string' && val.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  
    function createCard(item) {
      return `
        <div class="highlight-card">
          <img src="${item.Image}" class="highlight-image" alt="${item.Title}">
          <h3>${item.Title}</h3>
          <p>${item.Description}</p>
          <a href="${item.Link}" target="_blank">Watch</a>
        </div>
      `;
    }
  
    const highlightResults = searchInData(highlights);
    const potmResults = searchInData(potm); // Add POTM.json results
  
    highlightResults.forEach(item => {
      resultsHTML += createCard(item);
    });
  
    potmResults.forEach(item => {
      resultsHTML += createCard(item);
    });
  
    resultsHTML += '</div>';
    document.getElementById('results').innerHTML = resultsHTML || '<p>No results found.</p>';
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const query = getQueryParameter('query');
    if (query) {
      searchResults(query);
    } else {
      document.getElementById('results').innerHTML = '<p>No search query provided.</p>';
    }
  });
  