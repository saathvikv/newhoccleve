

async function loadPoem(filename) {
  try {
    const response = await fetch(filename);
    if (!response.ok) throw new Error('Poem file not found');
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    const poemElement = xmlDoc.querySelector('poem');
    // Get title from poemsMetadata
    const meta = poemsMetadata.find(p => p.filename === filename);
    const displayTitle = meta?.title || poemElement?.getAttribute('id') || 'Unknown Poem';

    poemDisplay.innerHTML = ''; // Clear previous poem

    const poemIdEl = document.createElement('div');
    poemIdEl.textContent = displayTitle; // Show title
    poemIdEl.style.textAlign = 'center';
    poemIdEl.style.fontSize = '1.3em';
    poemIdEl.style.fontWeight = 'bold';
    poemIdEl.style.marginBottom = '1.5em'; // Add space below title
    poemDisplay.appendChild(poemIdEl);

    // Only process <lg> (stanza) tags inside <poem>
    const stanzas = poemElement ? poemElement.querySelectorAll('lg') : [];
    stanzas.forEach((stanza, stanzaIdx) => {
      const stanzaDiv = document.createElement('div');
      stanzaDiv.className = 'stanza';
      // stanzaDiv.innerHTML = `<div class="stanza-header">Stanza ${stanzaIdx + 1}</div>`;

      const lines = stanza.querySelectorAll('l');
      lines.forEach((line, idx) => {
        const lineNum = parseInt(line.getAttribute('n'), 10);
        const words = Array.from(line.querySelectorAll('seg'));

        const lineEl = document.createElement('div');
        lineEl.className = 'line';
        if (idx % 2 === 1) lineEl.classList.add('shaded'); // Shade every other line

        const numberEl = document.createElement('span');
        numberEl.className = 'line-number';

        if (lineNum % 5 !== 0) {
          numberEl.classList.add('hidden');
        }
        numberEl.textContent = lineNum;
        lineEl.appendChild(numberEl);

        words.forEach(wordSeg => {
          const span = document.createElement('span');
          span.className = 'word';
          span.textContent = wordSeg.textContent;
          span.dataset.pos = wordSeg.getAttribute('pos') || 'N/A';
          span.setAttribute('data-me-root', wordSeg.getAttribute('me_root') || '');
          span.style.marginRight = '0.25em';
          lineEl.appendChild(span);
        });

        stanzaDiv.appendChild(lineEl);
      });

      poemDisplay.appendChild(stanzaDiv);
    });
  } catch (err) {
    poemDisplay.textContent = 'Error loading poem.';
    console.error(err);
  }
}
window.loadPoem = loadPoem;


// --- Context Menu Search Integration ---
document.addEventListener('DOMContentLoaded', () => {
  const poemDisplay = document.getElementById('poemDisplay');
  if (!poemDisplay) return;

  // Create custom context menu
  const customMenu = document.createElement('div');
  customMenu.id = 'customContextMenu';
  customMenu.style.position = 'absolute';
  customMenu.style.display = 'none';
  customMenu.style.background = '#fff';
  customMenu.style.border = '1px solid #888';
  customMenu.style.padding = '0.5em 1em';
  customMenu.style.zIndex = 9999;
  customMenu.style.cursor = 'pointer';
  customMenu.textContent = 'Search in Hoccleve Archive';
  document.body.appendChild(customMenu);

  let selectedText = '';

  poemDisplay.addEventListener('contextmenu', function(e) {
    // Get selected text or word under cursor
    selectedText = window.getSelection().toString().trim();
    if (!selectedText && e.target.classList.contains('word')) {
      selectedText = e.target.textContent.trim();
    }
    if (selectedText) {
      e.preventDefault();
      customMenu.style.left = `${e.pageX}px`;
      customMenu.style.top = `${e.pageY}px`;
      customMenu.style.display = 'block';
    } else {
      customMenu.style.display = 'none';
    }
  });

  // Hide menu on click elsewhere
  document.addEventListener('click', () => {
    customMenu.style.display = 'none';
  });

  // When menu is clicked, trigger search
  customMenu.addEventListener('click', () => {
    customMenu.style.display = 'none';
    // Open sidebar if not open
    const floatingSearchBtn = document.getElementById('floatingSearchBtn');
    const sidePanel = document.getElementById('side-panel');
    const searchInput = document.getElementById('searchInput');
    if (sidePanel && sidePanel.style.display !== 'block') {
      floatingSearchBtn?.click();
    }
    setTimeout(() => {
      if (searchInput) {
        searchInput.value = selectedText;
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
      }
    }, 100); // Wait for sidebar to open
  });
});