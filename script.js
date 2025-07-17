// Poem metadata array
const poemsMetadata = [
  {"filename":"Poems_XML/01-hoc.xml","title":"The Compleynte of the Virgin before the Cross","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/02-hoc.xml","title":"Address to Sir John Oldcastle","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/03-hoc.xml","title":"La Male Regle","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/04-hoc.xml","title":"Balade to King Henry V","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/05-hoc.xml","title":"Two Balades to Henry V and the Knights of the Garter [Ballad #1]","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/06-hoc.xml","title":"Two Balades to Henry V and the Knights of the Garter [Ballad #2]","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/07-hoc.xml","title":"Ad Beatam Virginem","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/08-hoc.xml","title":"Balade, after K. Richard II's Bones . . .","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/09-hoc.xml","title":"Balade to my gracious Lord of York","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/10-hoc.xml","title":"Ad Beatam Vriginem, the 'Mother of God'","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/11-hoc.xml","title":"Balade to the Duke of Bedford","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/12-hoc.xml","title":"Balade to my Lord the Chancellor","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/13-hoc.xml","title":"Balade and Roundel or Chanceon to Mr. Henry Somer, Subtreasurer","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/14-hoc.xml","title":"Balade to King Henry V","title_type":"HUNTINGTON HM 744"},
  {"filename":"Poems_XML/15-hoc.xml","title":"Balade to King Henry V, for Money","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/16-hoc.xml","title":"Balade to my maister Carpenter","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/17-hoc.xml","title":"Balade by the Court of Good Company","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/18-hoc.xml","title":"Balade to the Virgin and Christ","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/19-hoc.xml","title":"The Letter of Cupid to Lovers, his Subjects","title_type":"HUNTINGTON HM 744"},
  {"filename":"Poems_XML/21-hoc.xml","title":"Verba compilatoris ad librum [envoi at end of regiment]","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/22-hoc.xml","title":"Inoucacio ad patrem","title_type":"HUNTINGTON HM 744"},
  {"filename":"Poems_XML/23-hoc.xml","title":"ad filium honor et gloria","title_type":"HUNTINGTON HM 744"},
  {"filename":"Poems_XML/24-hoc.xml","title":"ad spiritum sanctum","title_type":"HUNTINGTON HM 744"},
  {"filename":"Poems_XML/25-hoc.xml","title":"Ad Beatam Virginem","title_type":"HUNTINGTON HM 744"},
  {"filename":"Poems_XML/26-hoc.xml","title":"item de beata virgine (prologus)","title_type":"HUNTINGTON HM 744"},
  {"filename":"Poems_XML/27-hoc.xml","title":"item de beata virgine (fabula)","title_type":"HUNTINGTON HM 744"},
  {"filename":"Poems_XML/28-hoc.xml","title":"the story of the monk who clad the virgin","title_type":"HUNTINGTON HM 744"},
  {"filename":"Poems_XML/29-hoc.xml","title":"Three Roundels - Hoccleve's appeal to Lady Money","title_type":"HUNTINGTON HM 744"},
  {"filename":"Poems_XML/30-hoc.xml","title":"Three Roundels - Lady Money's scornful answer","title_type":"HUNTINGTON HM 744"},
  {"filename":"Poems_XML/31-hoc.xml","title":"Three Roundels - Hoccleve's Humorous praise of his lady","title_type":"HUNTINGTON HM 744"},
  {"filename":"Poems_XML/32-hoc.xml","title":"epilogue to three roundels","title_type":"HUNTINGTON HM 744"},
  {"filename":"Poems_XML/33-hoc.xml","title":"Lerne to Dye.","title_type":"HUNTINGTON HM 744"},
  {"filename":"Poems_XML/34-hoc.xml","title":"Thomas Hoccleve's Complaint","title_type":"Unknown"},
  {"filename":"Poems_XML/35-hoc.xml","title":"Dialog with a Friend","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/37-hoc.xml","title":"Lerne to Dye.","title_type":"HUNTINGTON HM 111"},
  {"filename":"Poems_XML/39-hoc.xml","title":"Hoccleve's Dedication to Lady Westmoreland","title_type":"HUNTINGTON HM 111"}
];

// DOM Elements
const poemDiv = document.getElementById('poem');
const popup = document.getElementById('popup');
const sidePanel = document.getElementById('side-panel');
const closePanelBtn = document.getElementById('closePanel');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const viewByTitleBtn = document.getElementById('viewByTitleBtn');
const viewByManuscriptBtn = document.getElementById('viewByManuscriptBtn');
const poemListDiv = document.getElementById('poemList');
const manuscriptSelector = document.getElementById('manuscriptSelector');


// Helper to clear poem display and list
function clearPoem() {
  poemDiv.innerHTML = 'Select a poem to view.';
}

function clearPoemList() {
  poemListDiv.innerHTML = '';
}

// Show poem buttons by title (all poems)
function showPoemsByTitle() {
  manuscriptSelector.style.display = 'none';
  clearPoemList();

  poemsMetadata.forEach(poem => {
    const btn = document.createElement('button');
    btn.textContent = poem.title;
    btn.title = poem.filename;
    btn.addEventListener('click', () => {
      loadPoem(poem.filename);
    });
    poemListDiv.appendChild(btn);
  });

  clearPoem();
}

// Show manuscript selector for filtering
function showManuscriptSelector() {
  manuscriptSelector.style.display = 'block';
  clearPoemList();
  clearPoem();
}

// Show poems filtered by manuscript type
function showPoemsByManuscript(manuscriptType) {
  clearPoemList();

  const filtered = poemsMetadata.filter(p => p.title_type === manuscriptType);

  if (filtered.length === 0) {
    poemListDiv.textContent = 'No poems found for this manuscript.';
    return;
  }

  filtered.forEach(poem => {
    const btn = document.createElement('button');
    btn.textContent = poem.title;
    btn.title = poem.filename;
    btn.addEventListener('click', () => {
      loadPoem(poem.filename);
    });
    poemListDiv.appendChild(btn);
  });

  clearPoem();
}

// Event Listeners for main view buttons
viewByTitleBtn.addEventListener('click', () => {
  showPoemsByTitle();
});

viewByManuscriptBtn.addEventListener('click', () => {
  showManuscriptSelector();
});

// Manuscript buttons
document.querySelectorAll('.manuscriptBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const manuscriptType = btn.getAttribute('data-type');
    showPoemsByManuscript(manuscriptType);
  });
});


// Load poem XML and display it
async function loadPoem(filename) {
  try {
    const response = await fetch(filename);
    if (!response.ok) throw new Error(`Failed to load ${filename}`);
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    const poemElement = xmlDoc.querySelector('poem');
    const poemId = poemElement?.getAttribute('id') || 'Unknown Poem ID';

    const lines = xmlDoc.querySelectorAll('l');
    poemDiv.innerHTML = ''; // Clear previous poem

    // Poem title from metadata to show instead of poem id
    const meta = poemsMetadata.find(p => p.filename === filename);
    const displayTitle = meta?.title || poemId;

    const poemIdEl = document.createElement('div');
    poemIdEl.id = 'poem-id';
    poemIdEl.textContent = displayTitle;
    poemDiv.appendChild(poemIdEl);

    lines.forEach((line) => {
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


// Popup handlers
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
