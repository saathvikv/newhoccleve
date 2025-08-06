// === advancedSearch.js ===

// Modal show/hide logic
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
  advancedSearchModal.addEventListener('click', (e) => {
    if (e.target === advancedSearchModal) {
      advancedSearchModal.style.display = 'none';
    }
  });
}

// Inputs and checkboxes
const useMeRoot = document.getElementById('useMeRoot');
const useWord = document.getElementById('useWord');
const usePos = document.getElementById('usePos');

const meRootInput = document.getElementById('meRootInput');
const wordInput = document.getElementById('wordInput');
const posInput = document.getElementById('posInput');

function updateInputStates() {
  meRootInput.disabled = !useMeRoot.checked;
  wordInput.disabled = !useWord.checked;
  posInput.disabled = !usePos.checked;

  meRootInput.style.opacity = useMeRoot.checked ? '1' : '0.5';
  wordInput.style.opacity = useWord.checked ? '1' : '0.5';
  posInput.style.opacity = usePos.checked ? '1' : '0.5';
}
[useMeRoot, useWord, usePos].forEach(cb => cb.addEventListener('change', updateInputStates));
updateInputStates();

// Advanced Search form submit handler
const advancedSearchForm = document.getElementById('advancedSearchForm');
const advancedSearchResults = document.getElementById('advancedSearchResults');
const searchAgainBtn = document.getElementById('searchAgainBtn');
const searchAgainContainer = document.getElementById('searchAgainContainer');

if (advancedSearchForm && advancedSearchResults) {
  advancedSearchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const useMeRootChecked = useMeRoot.checked;
    const useWordChecked = useWord.checked;
    const usePosChecked = usePos.checked;

    const meRootVal = meRootInput.value.trim().toLowerCase();
    const wordVal = wordInput.value.trim().toLowerCase();
    const posVal = posInput.value;

    advancedSearchResults.innerHTML = 'Searching...';

    try {
      const response = await fetch('Poems_XML/allPoems.xml');
      if (!response.ok) throw new Error('Could not fetch allPoems.xml');
      const xmlText = await response.text();

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

      const poems = xmlDoc.querySelectorAll('poem');
      const results = [];

      poems.forEach(poem => {
        const poemId = poem.getAttribute('id') || 'Unknown';
        let title = poemId;
        if (typeof poemsMetadata !== 'undefined') {
          const meta = poemsMetadata.find(p =>
            (p.filename && p.filename.includes(poemId)) || (p.id && p.id === poemId)
          );
          if (meta && meta.title) title = meta.title;
        }

        poem.querySelectorAll('l').forEach(line => {
          const lineNum = line.getAttribute('n') || '';
          const segs = Array.from(line.querySelectorAll('seg'));

          const matches = segs.filter(seg => {
            const word = seg.textContent.trim().toLowerCase();
            const meRoot = seg.getAttribute('me_root')?.toLowerCase() || '';
            const pos = seg.getAttribute('pos') || '';

            let match = true;
            if (useWordChecked) match = match && word.includes(wordVal);
            if (useMeRootChecked) match = match && meRoot.includes(meRootVal);
            if (usePosChecked) match = match && pos === posVal;

            return match;
          });

          if (matches.length > 0) {
            const lineText = segs.map(seg => seg.textContent).join(' ');
            const matchingRoots = matches.map(seg => seg.getAttribute('me_root') || '');
            results.push({ poemId, title, lineNum, lineText, matchingRoots });
          }
        });
      });

      if (results.length === 0) {
        advancedSearchResults.innerHTML = 'No results found.';
      } else {
        advancedSearchResults.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div><strong>${results.length}</strong> result(s) found:</div>
            <button id="searchAgainBtn" style="margin-left: auto;">Search Again</button>
          </div>
          <ul>` +
          results.map(r =>
            `<li><strong>${r.title}</strong> (Line ${r.lineNum}): ${r.lineText}<br>` +
            `<span style="color:gray;font-size:smaller;">ME Root(s): ${r.matchingRoots.join(', ')}</span></li>`
          ).join('') +
          '</ul>';
      }

      // Add event listener to new button
      const newSearchAgainBtn = document.getElementById('searchAgainBtn');
      if (newSearchAgainBtn) {
        newSearchAgainBtn.addEventListener('click', () => {
            advancedSearchModal.style.display = 'flex';
            advancedSearchResults.innerHTML = ''; // Clear the results
            advancedSearchModal.scrollTop = 0; 
        });
    }



    } catch (err) {
      advancedSearchResults.innerHTML = 'Error: ' + err.message;
    }
  });
}
