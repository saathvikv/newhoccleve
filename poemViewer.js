const poemDiv = document.getElementById('poem');
const popup = document.getElementById('popup');

function clearPoem() {
  poemDiv.innerHTML = 'Select a poem to view.';
}

function showPoemsByManuscript(manuscriptType) {
  const poemGrid = document.getElementById('poemGrid');
  poemGrid.innerHTML = '';

  const filtered = poemsMetadata.filter(p => p.title_type === manuscriptType);

  if (filtered.length === 0) {
    poemGrid.textContent = 'No poems found for this manuscript.';
    return;
  }

  filtered.forEach(poem => {
    const btn = document.createElement('button');
    btn.textContent = poem.title;
    btn.title = poem.filename;
    btn.addEventListener('click', () => {
      loadPoem(poem.filename);
    });
    poemGrid.appendChild(btn);
  });

  clearPoem();
}

function loadPoem(filename) {
  fetch(filename)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${filename}`);
      return response.text();
    })
    .then(xmlText => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

      const poemElement = xmlDoc.querySelector('poem');
      const poemId = poemElement?.getAttribute('id') || 'Unknown Poem ID';

      const lines = xmlDoc.querySelectorAll('l');
      poemDiv.innerHTML = '';

      // Use metadata title if available
      const meta = poemsMetadata.find(p => p.filename === filename);
      const displayTitle = meta?.title || poemId;

      const poemIdEl = document.createElement('div');
      poemIdEl.id = 'poem-id';
      poemIdEl.textContent = displayTitle;
      poemDiv.appendChild(poemIdEl);

      lines.forEach(line => {
        const lineNum = parseInt(line.getAttribute('n'), 10);
        const words = Array.from(line.querySelectorAll('seg'));

        const lineEl = document.createElement('div');
        lineEl.className = 'line';

        const numberEl = document.createElement('span');
        numberEl.className = 'line-number';
        if (lineNum % 5 !== 0) numberEl.classList.add('hidden');
        numberEl.textContent = lineNum;
        lineEl.appendChild(numberEl);

        words.forEach(wordSeg => {
          const span = document.createElement('span');
          span.className = 'word';
          span.textContent = wordSeg.textContent;
          span.dataset.pos = wordSeg.getAttribute('pos') || 'N/A';
          span.dataset.root = wordSeg.getAttribute('me_root') || 'N/A';
          span.style.marginRight = '0.25em';

          span.addEventListener('mouseenter', () => showPopupAtWord(span));
          span.addEventListener('mouseleave', hidePopup);

          lineEl.appendChild(span);
        });

        poemDiv.appendChild(lineEl);
      });
    })
    .catch(err => {
      poemDiv.textContent = 'Error loading poem.';
      console.error(err);
    });
}

function showPopupAtWord(word) {
  popup.innerHTML =
    `<div><strong>POS:</strong> ${word.dataset.pos}</div>` +
    `<div><strong>ME Root:</strong> ${word.dataset.root}</div>`;

  const rect = word.getBoundingClientRect();
  const left = rect.right + window.pageXOffset - 40;
  const top = rect.bottom + window.pageYOffset - popup.offsetHeight;

  popup.style.left = `${left}px`;
  popup.style.top = `${top}px`;
  popup.style.display = 'block';
  popup.style.pointerEvents = 'none';
  popup.style.zIndex = '1000';
}

function hidePopup() {
  popup.style.display = 'none';
}
