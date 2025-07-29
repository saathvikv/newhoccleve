

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
          span.dataset.root = wordSeg.getAttribute('me_root') || 'N/A';
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