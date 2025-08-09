// === advancedSearch.js ===

// Modal show/hide logic
const posAliases = {
    "#adjv%ppl": "Adjective/Verb Participle (Plural)",
    "#n": "Noun form",
    "ad#n": "Adjective/Noun form",
    "adj": "Adjective",
    "adj#n": "Adjective/Noun form",
    "adj#n%comp": "Adjective/Noun (Comparative)",
    "adj%comp": "Adjective (Comparative)",
    "adj%pl": "Adjective (Plural)",
    "adj%sg": "Adjective (Singular)",
    "adj%sup": "Adjective (Superlative)",
    "adj-pl": "Adjective (Plural)",
    "adj1": "Adjective Type 1",
    "adj1%comp": "Adjective Type 1 (Comparative)",
    "adj1_art": "Adjective Type 1 (Article form)",
    "adj2": "Adjective Type 2",
    "adj3": "Adjective Type 3",
    "adj_art": "Adjective (Article form)",
    "adjas_n": "Adjective/As Noun",
    "adjas_n%sup": "Adjective/As Noun (Superlative)",
    "adjasn": "Adjective/As Noun",
    "adjsup": "Adjective (Superlative)",
    "adv": "Adverb",
    "adv#conj": "Adverb/Conjunction form",
    "adv#interj": "Adverb/Interjection form",
    "adv#prep": "Adverb/Preposition form",
    "adv%comp": "Adverb (Comparative)",
    "adv%sup": "Adverb (Superlative)",
    "adv1": "Adverb Type 1",
    "adv1#adj": "Adverb Type 1/Adjective form",
    "adv2": "Adverb Type 2",
    "adv??chk": "Adverb (Uncertain form)",
    "adv[chk]": "Adverb (Checked form)",
    "adv[not-ben]": "Adverb (Not in Benedictine text)",
    "adv_adj": "Adverb/Adjective",
    "adv_conj": "Adverb/Conjunction",
    "adv_phr": "Adverbial Phrase",
    "art_def": "Definite Article",
    "art_gram_adj": "Article/Grammatical Adjective",
    "blood": "Blood (noun)",
    "conj": "Conjunction",
    "conj#prep": "Conjunction/Preposition",
    "conj*": "Conjunction variant",
    "conj1": "Conjunction Type 1",
    "conjs": "Conjunctions (Plural)",
    "cpd": "Compound",
    "dash": "Dash/Hyphen",
    "de": "De (particle/preposition)",
    "def_art": "Definite Article",
    "ende": "Ende (particle/word)",
    "feithe": "Feithe (unknown)",
    "fr_prep": "French Preposition",
    "ger": "Gerund",
    "ger%pl": "Gerund (Plural)",
    "ger1": "Gerund Type 1",
    "ger1%pl": "Gerund Type 1 (Plural)",
    "ger2": "Gerund Type 2",
    "ger2%gen": "Gerund Type 2 (Genitive)",
    "ger??": "Gerund (Uncertain)",
    "ger[not-ben]": "Gerund (Not Benedictine text)",
    "gram_adj": "Grammatical Adjective",
    "gram_adj%pl": "Grammatical Adjective (Plural)",
    "gram_adjas_n": "Grammatical Adj./As Noun",
    "have": "Verb 'have'",
    "him-self{*him-self%pron": "Reflexive pronoun",
    "indef_art": "Indefinite Article",
    "inf": "Infinitive",
    "interj": "Interjection",
    "lat": "Latin term",
    "lat_n": "Latin noun",
    "lat_n#propn": "Latin Proper Noun",
    "maiden{*maid": "Maiden (unknown)",
    "n": "Noun",
    "n#adj": "Noun/Adjective form",
    "n#pl": "Noun (Plural)",
    "n#propn": "Proper Noun",
    "n#propn%gen": "Proper Noun (Genitive)",
    "n#propn%gen[not-med]": "Proper Noun (Genitive, not medical)",
    "n#propn[not-med]": "Proper Noun (not medical)",
    "n#propn_lat": "Proper Noun (Latin)",
    "n%gen": "Noun (Genitive)",
    "n%gen_pl": "Noun (Genitive Plural)",
    "n%pl": "Noun (Plural)",
    "n%pl%gen": "Noun (Plural Genitive)",
    "n%pl_art": "Noun (Plural Article)",
    "n%pl_gen": "Noun (Plural Genitive)",
    "n%propn": "Proper Noun",
    "n1": "Noun Type 1",
    "n1#propn": "Proper Noun Type 1",
    "n1#propn%gen": "Proper Noun Type 1 (Genitive)",
    "n1%gen": "Noun Type 1 (Genitive)",
    "n1%pl": "Noun Type 1 (Plural)",
    "n1%propn": "Proper Noun Type 1",
    "n1_art": "Noun Type 1 (Article form)",
    "n2": "Noun Type 2",
    "n2#propn": "Proper Noun Type 2",
    "n2%gen": "Noun Type 2 (Genitive)",
    "n2%gen_pl": "Noun Type 2 (Genitive Plural)",
    "n2%pl": "Noun Type 2 (Plural)",
    "n3": "Noun Type 3",
    "n3%gen": "Noun Type 3 (Genitive)",
    "n3%pl": "Noun Type 3 (Plural)",
    "n3%pl_gen": "Noun Type 3 (Plural Genitive)",
    "n4": "Noun Type 4",
    "n4%pl": "Noun Type 4 (Plural)",
    "n6%pl": "Noun Type 6 (Plural)",
    "n8": "Noun Type 8",
    "n[??form?chk]": "Noun (Uncertain form)",
    "n[get-hw]": "Noun (Headword form)",
    "n[med:_fader_kin:_phrase:_the_kin_of_one's_father]": "Noun (Medical kin phrase)",
    "n[om:chk:wit?]": "Noun (OM check)",
    "n_adj": "Noun/Adjective form",
    "n_adj%pl": "Noun/Adjective (Plural)",
    "n_art": "Noun (Article form)",
    "n_impers": "Impersonal Noun",
    "num#adj": "Number/Adjective",
    "num#n": "Number/Noun",
    "num#pron": "Number/Pronoun",
    "num_rom": "Roman numeral",
    "part": "Particle",
    "ppl": "Participle",
    "ppl#adj": "Participle/Adjective form",
    "ppl1_abs": "Participle Type 1 (Absolute)",
    "ppl_abs": "Participle (Absolute)",
    "prep": "Preposition",
    "prep#adv": "Preposition/Adverb form",
    "prep[not-ben]": "Preposition (Not Benedictine text)",
    "prep_fr": "French Preposition",
    "prep_part": "Prepositional Particle",
    "pron": "Pronoun",
    "pron%gen": "Pronoun (Genitive)",
    "pron%nom": "Pronoun (Nominative)",
    "pron%obj": "Pronoun (Objective)",
    "pron%pl": "Pronoun (Plural)",
    "pron%pl%nom": "Pronoun (Plural Nominative)",
    "pron%pl_gen": "Pronoun (Plural Genitive)",
    "pron%pl_nom": "Pronoun (Plural Nominative)",
    "pron%pl_ob": "Pronoun (Plural Objective)",
    "pron%pl_obj": "Pronoun (Plural Objective)",
    "pron1%fem_gen": "Pronoun 1st Person Feminine (Genitive)",
    "pron1%gen": "Pronoun 1st Person (Genitive)",
    "pron1%nom": "Pronoun 1st Person (Nominative)",
    "pron2": "Pronoun 2nd Person",
    "pron2%": "Pronoun 2nd Person",
    "pron2%fem_obj": "Pronoun 2nd Person Feminine (Objective)",
    "pron2%obj": "Pronoun 2nd Person (Objective)",
    "pron2%pl": "Pronoun 2nd Person (Plural)",
    "pron[chk]": "Pronoun (Checked)",
    "pron_gram_adj": "Pronoun/Grammatical Adjective",
    "pron_interr": "Interrogative Pronoun",
    "pron_rel": "Relative Pronoun",
    "prp#adj": "Prepositional Adjective",
    "rom_num": "Roman Numeral",
    "sor": "Sor (unknown)",
    "v": "Verb",
    "v#adj": "Verb/Adjective form",
    "v#adj%ppl": "Verb/Adjective (Participle)",
    "v#adj%ppr": "Verb/Adjective (Participle Present)",
    "v#adj%prp": "Verb/Adjective (Prepositional form)",
    "v#inf": "Verb (Infinitive)",
    "v#ppl": "Verb (Participle)",
    "v%i": "Verb (Imperative)",
    "v%imp": "Verb (Imperative)",
    "v%inf": "Verb (Infinitive)",
    "v%inf_part": "Verb (Infinitive Participle)",
    "v%inf_vblpart": "Verb (Infinitive Verbal Participle)",
    "v%p_abs": "Verb (Participle Absolute)",
    "v%pl": "Verb (Plural)",
    "v%pp_absl": "Verb (Past Participle Absolute)",
    "v%ppl": "Verb (Participle)",
    "v%ppl[not-ben;chk]": "Verb (Participle, not Benedictine; Checked)",
    "v%ppl[not-ben]": "Verb (Participle, not Benedictine)",
    "v%ppl_abs": "Verb (Participle Absolute)",
    "v%ppl_n": "Verb (Participle Noun form)",
    "v%pr": "Verb (Present)",
    "v%pr??": "Verb (Present, uncertain)",
    "v%pr_1": "Verb (Present, 1st person)",
    "v%pr_1[chk]": "Verb (Present, 1st person; Checked)",
    "v%pr_2": "Verb (Present, 2nd person)",
    "v%pr_3": "Verb (Present, 3rd person)",
    "v%pr_3[chk]": "Verb (Present, 3rd person; Checked)",
    "v%pr_3[emend_to_gynne?]": "Verb (Present, 3rd person; Emended to 'gynne'?)",
    "v%pr_3_neg": "Verb (Present, 3rd person, Negative)",
    "v%pr_pl": "Verb (Present, Plural)",
    "v%pr_pron": "Verb (Present, Pronoun form)",
    "v%prp": "Verb (Prepositional)",
    "v%prp[ger??]": "Verb (Prepositional; Gerund uncertain)",
    "v%prp_abs": "Verb (Prepositional Absolute)",
    "v%prp_abs_abs": "Verb (Prepositional Absolute Absolute)",
    "v%pt_1": "Verb (Past tense, 1st person)",
    "v%pt_1_neg": "Verb (Past tense, 1st person Negative)",
    "v%pt_2": "Verb (Past tense, 2nd person)",
    "v%pt_3": "Verb (Past tense, 3rd person)",
    "v%pt_3_neg": "Verb (Past tense, 3rd person Negative)",
    "v%pt_pl": "Verb (Past tense, Plural)",
    "v%pt_pl_neg": "Verb (Past tense, Plural Negative)",
    "v1#adj%ppl": "Verb Type 1/Adjective (Participle)",
    "v1#adj%prp": "Verb Type 1/Adjective (Prepositional)",
    "v1%imp": "Verb Type 1 (Imperative)",
    "v1%imp[??]": "Verb Type 1 (Imperative, uncertain)",
    "v1%inf": "Verb Type 1 (Infinitive)",
    "v1%ppl": "Verb Type 1 (Participle)",
    "v1%ppl_abs": "Verb Type 1 (Participle Absolute)",
    "v1%pr_1": "Verb Type 1 (Present, 1st person)",
    "v1%pr_1-neg": "Verb Type 1 (Present, 1st person Negative)",
    "v1%pr_1_neg": "Verb Type 1 (Present, 1st person Negative)",
    "v1%pr_2": "Verb Type 1 (Present, 2nd person)",
    "v1%pr_3": "Verb Type 1 (Present, 3rd person)",
    "v1%pr_3_neg": "Verb Type 1 (Present, 3rd person Negative)",
    "v1%pr_pl": "Verb Type 1 (Present, Plural)",
    "v1%prp": "Verb Type 1 (Prepositional)",
    "v1%prp_abs": "Verb Type 1 (Prepositional Absolute)",
    "v1%pt_1": "Verb Type 1 (Past tense, 1st person)",
    "v1%pt_2": "Verb Type 1 (Past tense, 2nd person)",
    "v1%pt_3": "Verb Type 1 (Past tense, 3rd person)",
    "v1%pt_pl": "Verb Type 1 (Past tense, Plural)",
    "v1_2%inf": "Verb Type 1_2 (Infinitive)",
    "v1_2%ppl": "Verb Type 1_2 (Participle)",
    "v2": "Verb Type 2",
    "v2#adj%ppl": "Verb Type 2/Adjective (Participle)",
    "v2%imp": "Verb Type 2 (Imperative)",
    "v2%inf": "Verb Type 2 (Infinitive)",
    "v2%ppl": "Verb Type 2 (Participle)",
    "v2%ppl_abs": "Verb Type 2 (Participle Absolute)",
    "v2%pr_1": "Verb Type 2 (Present, 1st person)",
    "v2%pr_2": "Verb Type 2 (Present, 2nd person)",
    "v2%pr_3": "Verb Type 2 (Present, 3rd person)",
    "v2%pr_pl": "Verb Type 2 (Present, Plural)",
    "v2%prp": "Verb Type 2 (Prepositional)",
    "v2%prp_abs": "Verb Type 2 (Prepositional Absolute)",
    "v2%pt_1": "Verb Type 2 (Past tense, 1st person)",
    "v2%pt_2": "Verb Type 2 (Past tense, 2nd person)",
    "v2%pt_3": "Verb Type 2 (Past tense, 3rd person)",
    "v2%pt_pl": "Verb Type 2 (Past tense, Plural)",
    "v3#adj%ppl": "Verb Type 3/Adjective (Participle)",
    "v3%imp": "Verb Type 3 (Imperative)",
    "v3%inf": "Verb Type 3 (Infinitive)",
    "v3%ppl": "Verb Type 3 (Participle)",
    "v3%ppl_abs": "Verb Type 3 (Participle Absolute)",
    "v3%pr_1": "Verb Type 3 (Present, 1st person)",
    "v3%pr_2": "Verb Type 3 (Present, 2nd person)",
    "v3%pr_3": "Verb Type 3 (Present, 3rd person)",
    "v3%pr_pl": "Verb Type 3 (Present, Plural)",
    "v3%pt-pl": "Verb Type"
}

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

// Populate POS dropdown using posAliases constant
function populatePosDropdown() {
  posInput.innerHTML = '<option value="">Select POS tag...</option>';
  Object.entries(posAliases).forEach(([tag, alias]) => {
    const opt = document.createElement('option');
    opt.value = tag;
    opt.textContent = alias;
    posInput.appendChild(opt);
  });
}
populatePosDropdown();

// Advanced Search form submit handler
const advancedSearchForm = document.getElementById('advancedSearchForm');
const advancedSearchResults = document.getElementById('advancedSearchResults');

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