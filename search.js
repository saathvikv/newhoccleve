// Floating search button and panel logic
const floatingSearchBtn = document.getElementById('floatingSearchBtn');
const sidePanel = document.getElementById('side-panel');
const closePanelBtn = document.getElementById('closePanel');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Show search panel
if (floatingSearchBtn) {
  floatingSearchBtn.addEventListener('click', () => {
    sidePanel.style.display = 'block';
    sidePanel.style.zIndex = '1100';
    searchInput.focus();
  });
}

// Hide search panel
if (closePanelBtn) {
  closePanelBtn.addEventListener('click', () => {
    sidePanel.style.display = 'none';
    searchInput.value = '';
    searchResults.innerHTML = 'Search results will appear here.';
  });
}

// Helper to get current poem lines from #poemDisplay
function getCurrentPoemLines() {
  const lines = [];
  document.querySelectorAll('#poemDisplay .line').forEach((lineEl, idx) => {
    const lineNum = lineEl.querySelector('.line-number')?.textContent || (idx + 1);
    const text = Array.from(lineEl.querySelectorAll('.word')).map(w => w.textContent).join(' ');
    lines.push({ lineNum, text });
  });
  return lines;
}

// Helper to search all poems in SingularXML.xml
async function searchAllPoems(query) {
  const results = [];
  try {
    const response = await fetch('Poems_XML/SingularXML.xml');
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    // Find all <l> elements anywhere in the document
    const allLines = xmlDoc.querySelectorAll('l');
    allLines.forEach(line => {
      // Find the closest parent <poem> to get the poem id
      let parentPoem = line.closest('poem');
      const poemId = parentPoem ? parentPoem.getAttribute('id') || 'Unknown' : 'Unknown';
      const lineNum = line.getAttribute('n') || '';
      let lineText = '';
      const segs = line.querySelectorAll('seg');
      if (segs.length > 0) {
        lineText = Array.from(segs).map(seg => seg.textContent).join(' ');
      } else {
        lineText = line.textContent.trim();
      }
      if (lineText.toLowerCase().includes(query)) {
        results.push({ poemId, lineNum, lineText });
      }
    });
  } catch (err) {
    results.push({ error: 'Error loading or parsing SingularXML.xml' });
  }
  return results;
}

// Search input handler
if (searchInput) {
  searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      searchResults.innerHTML = 'Search results will appear here.';
      return;
    }
    searchResults.innerHTML = 'Searching...';

    const scope = document.querySelector('input[name="searchScope"]:checked').value;
    let results = [];

    if (scope === 'current') {
      // Search current poem
      const lines = getCurrentPoemLines();
      lines.forEach(({ lineNum, text }) => {
        if (text.toLowerCase().includes(query)) {
          results.push({ lineNum, lineText: text });
        }
      });
      if (results.length === 0) {
        searchResults.innerHTML = 'No results found in current poem.';
      } else {
        searchResults.innerHTML = `<div><strong>${results.length}</strong> result(s) found in current poem:</div><ul>` +
          results.map(r => `<li>Line <strong>${r.lineNum}</strong>: ${r.lineText}</li>`).join('') +
          '</ul>';
      }
    } else {
      // Search all poems
      results = await searchAllPoems(query);
      if (results.length === 0 || results[0]?.error) {
        searchResults.innerHTML = results[0]?.error || 'No results found in all poems.';
      } else {
        searchResults.innerHTML = `<div><strong>${results.length}</strong> result(s) found in all poems:</div><ul>` +
          results.map(r => `<li>Poem <strong>${r.poemId}</strong>, Line <strong>${r.lineNum}</strong>: ${r.lineText}</li>`).join('') +
          '</ul>';
      }
    }
  });
}