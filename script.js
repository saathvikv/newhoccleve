const poemSelector = document.getElementById('poemSelector');
const poemDiv = document.getElementById('poem');
const popup = document.getElementById('popup');
const sidePanel = document.getElementById('side-panel');
const closePanelBtn = document.getElementById('closePanel');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Populate poem select 01-39 (skip 20 and 38)
for (let i = 1; i <= 39; i++) {
  if (i === 20 || i === 38) continue;
  const num = String(i).padStart(2, '0');
  const option = document.createElement('option');
  
  option.value = `Poems_XML/${num}-hoc.xml`;
  option.textContent = `Poem ${num}`;
  poemSelector.appendChild(option);
}

poemSelector.addEventListener('change', () => {
  const filename = poemSelector.value;
  if (filename) {
    loadPoem(filename);
  }
});

async function loadPoem(filename) {
  try {
    const response = await fetch(filename);
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    const poemElement = xmlDoc.querySelector('poem');
    const poemId = poemElement?.getAttribute('id') || 'Unknown Poem ID';

    const lines = xmlDoc.querySelectorAll('l');
    poemDiv.innerHTML = ''; // Clear previous poem

    const poemIdEl = document.createElement('div');
    poemIdEl.id = 'poem-id';
    poemIdEl.textContent = `Poem ID: ${poemId}`;
    poemDiv.appendChild(poemIdEl);

    lines.forEach((line, index) => {
      const lineNum = parseInt(line.getAttribute('n'), 10);
      const words = Array.from(line.querySelectorAll('seg'));

      const lineEl = document.createElement('div');
      lineEl.className = 'line';

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

        span.addEventListener('mouseenter', () => showPopupAtWord(span));
        span.addEventListener('mouseleave', hidePopup);
        span.addEventListener('contextmenu', e => {
          e.preventDefault();
          openSidePanel();
        });

        lineEl.appendChild(span);
      });

      poemDiv.appendChild(lineEl);
    });
  } catch (err) {
    poemDiv.textContent = 'Error loading poem.';
    console.error(err);
  }
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

function openSidePanel() {
  sidePanel.style.display = 'block';
  sidePanel.style.zIndex = '1100';
}

closePanelBtn.addEventListener('click', () => {
  sidePanel.style.display = 'none';
  searchInput.value = '';
  searchResults.innerHTML = 'Search results will appear here.';
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    searchResults.innerHTML = 'Search results will appear here.';
    return;
  }
  searchResults.innerHTML = `Searching for: <strong>${query}</strong>... (implement your search logic here)`;
});
