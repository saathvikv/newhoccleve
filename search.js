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
    // Collect both text and ME roots
    const words = Array.from(lineEl.querySelectorAll('.word'));
    const text = words.map(w => w.textContent).join(' ');
    const meRoots = words.map(w => w.getAttribute('data-me-root') || w.getAttribute('me_root') || '');
    lines.push({ lineNum, text, meRoots });
  });
  return lines;
}

// Helper to search all poems in SingularXML.xml
async function searchAllPoems(query) {
  const results = [];
  try {
    const response = await fetch('Poems_XML/SingularXML.xml');
    if (!response.ok) throw new Error('Could not fetch SingularXML.xml');
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    const poems = xmlDoc.querySelectorAll('poem');
    console.log('Number of poems found:', poems.length); // DEBUGGING line

    poems.forEach(poem => {
      const poemId = poem.getAttribute('id') || 'Unknown';
      // Try to get the title from poemsMetadata
      let title = poemId;
      if (typeof poemsMetadata !== 'undefined') {
        const meta = poemsMetadata.find(p =>
          (p.filename && p.filename.includes(poemId)) ||
          (p.id && p.id === poemId)
        );
        if (meta && meta.title) title = meta.title;
      }
      console.log(`Searching poem: ${title}`); // DEBUGGING line
      const lines = poem.querySelectorAll('l');
      lines.forEach(line => {
        const lineNum = line.getAttribute('n') || '';
        let lineText = '';
        let matchingRoots = [];
        const segs = line.querySelectorAll('seg');
        if (segs.length > 0) {
          lineText = Array.from(segs).map(seg => seg.textContent).join(' ');
          segs.forEach(seg => {
            const word = seg.textContent;
            const meRoot = seg.getAttribute('me_root') || '';
            if (word.toLowerCase().includes(query)) {
              matchingRoots.push(meRoot);
            }
          });
        } else {
          lineText = line.textContent.trim();
        }
        if (matchingRoots.length > 0) {
          results.push({ poemId, title, lineNum, lineText, matchingRoots });
        }
      });
    });
  } catch (err) {
    results.push({ error: 'Error loading or parsing SingularXML.xml: ' + err.message });
  }
  return results;
}

// Unified search trigger function
async function triggerSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    searchResults.innerHTML = 'Search results will appear here.';
    return;
  }
  searchResults.innerHTML = 'Searching...';

  const scope = document.querySelector('input[name="searchScope"]:checked').value;
  let results = [];

  if (scope === 'current') {
    const lines = getCurrentPoemLines();
    results = [];
    lines.forEach(({ lineNum, text, meRoots }) => {
      const words = text.split(/\s+/);
      let matchingRoots = [];
      words.forEach((word, idx) => {
        if (word.toLowerCase().includes(query)) {
          matchingRoots.push(meRoots[idx]);
        }
      });
      if (matchingRoots.length > 0) {
        results.push({ lineNum, lineText: text, matchingRoots });
      }
    });
    if (results.length === 0) {
      searchResults.innerHTML = 'No results found in current poem.';
    } else {
      searchResults.innerHTML = `<div><strong>${results.length}</strong> result(s) found in current poem:</div><ul>` +
        results.map(r =>
          `<li>Line <strong>${r.lineNum}</strong>: ${r.lineText}<br>` +
          `<span style="color:gray;font-size:smaller;">ME Root(s): ${r.matchingRoots.join(', ')}</span></li>`
        ).join('') +
        '</ul>';
    }
  } else {
    results = await searchAllPoems(query);
    if (results.length === 0 || results[0]?.error) {
      searchResults.innerHTML = results[0]?.error || 'No results found in all poems.';
    } else {
      searchResults.innerHTML = `<div><strong>${results.length}</strong> result(s) found in all poems:</div><ul>` +
        results.map(r =>
          `<li><strong>${r.title}</strong> (Line ${r.lineNum}): ${r.lineText}<br>` +
          `<span style="color:gray;font-size:smaller;">ME Root(s): ${r.matchingRoots.join(', ')}</span></li>`
        ).join('') +
        '</ul>';
    }
  }
}

// Attach search triggers
if (searchInput) {
  searchInput.addEventListener('input', triggerSearch);
}
document.querySelectorAll('input[name="searchScope"]').forEach(radio => {
  radio.addEventListener('change', triggerSearch);
});

// Advanced Search Modal Logic
const advancedSearchBtn = document.getElementById('advancedSearchBtn');
const advancedSearchModal = document.getElementById('advancedSearchModal');
const closeAdvancedSearch = document.getElementById('closeAdvancedSearch');

if (advancedSearchBtn && advancedSearchModal && closeAdvancedSearch) {
  advancedSearchBtn.addEventListener('click', () => {
    advancedSearchModal.style.display = 'flex';
  });
  closeAdvancedSearch.addEventListener('click', () => {
    advancedSearchModal.style.display = 'none';
  });
  // Optional: close modal when clicking outside content
  advancedSearchModal.addEventListener('click', (e) => {
    if (e.target === advancedSearchModal) {
      advancedSearchModal.style.display = 'none';
    }
  });
}
