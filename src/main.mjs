import {
  ANGLES,
  PERSONAS,
  buildPlan,
  compareVariants,
  detectLanguage,
  planToMarkdown,
  toggleFavorite,
} from './core.mjs';

const STORAGE_KEY = 'ugc-angle-lab.v1';

const copy = {
  en: {
    title: 'UGC Angle Lab',
    hero:
      'Turn a rough product brief into a hook bank, script, shot list, and variant test plan before you spend on production.',
    sample: 'Load sample',
    generate: 'Generate plan',
    exportMarkdown: 'Export Markdown',
    exportJson: 'Export JSON',
    reset: 'Reset',
    briefEyebrow: 'INPUT / PRODUCT BRIEF',
    briefTitle: 'Creative brief intake',
    personaEyebrow: 'STEP 1 / PERSONA',
    personaTitle: 'Choose the viewer lens',
    angleEyebrow: 'STEP 2 / ANGLE',
    angleTitle: 'Pick the persuasion frame',
    historyEyebrow: 'UTILITY / HISTORY',
    historyTitle: 'Recent generations',
    summaryEyebrow: 'OUTPUT / CREATIVE PLAN',
    summaryTitle: 'Editorial UGC working board',
    summaryPersona: 'Persona',
    summaryAngle: 'Angle',
    summaryCount: 'Hooks',
    hooksEyebrow: 'OUTPUT / HOOKS',
    hooksTitle: 'Hook bank',
    scriptEyebrow: 'OUTPUT / SCRIPT',
    scriptTitle: 'Scene-by-scene script',
    shotsEyebrow: 'OUTPUT / SHOTS',
    shotsTitle: 'Shot list board',
    matrixEyebrow: 'OUTPUT / TEST MATRIX',
    matrixTitle: 'Variant matrix',
    compareEyebrow: 'UTILITY / COMPARE',
    compareTitle: 'Compare two variants',
    compareHint: 'Choose up to 2 rows',
    favoritesCount: 'Favorites',
    favorite: 'Favorite',
    unfavorite: 'Favorited',
    compareAdd: 'Compare',
    compareRemove: 'Selected',
    emptyHooks: 'Generate a plan to see a bank of hooks tailored to your product, persona, and angle.',
    emptyScript: 'Your scene-by-scene script outline will appear here.',
    emptyShots: 'Your creator-ready shot list will appear here.',
    emptyMatrix: 'Generate a plan to map variants across channels.',
    emptyCompare: 'Pick two rows in the matrix to compare hook focus, channel setup, and learning direction.',
    emptyHistory: 'Your last few generations stay here locally so you can revisit or reload them fast.',
    autosave: 'Auto-saved locally',
    savedAt: 'Saved',
    labels: {
      product: 'Product',
      offer: 'Offer',
      audience: 'Audience',
      pain: 'Pain / trigger',
      objections: 'Objections',
      proofPoints: 'Proof points',
      cta: 'CTA',
    },
    sampleBrief: {
      product: 'Glow Brew Collagen Coffee',
      offer: 'Starter kit 30% off + free shaker',
      audience: 'Busy women in their 30s who want a beauty ritual that feels realistic before work',
      pain: 'Morning fatigue, skipped routines, and not wanting another complicated supplement',
      objections: 'Worried it tastes weird, feels overhyped, or will become another forgotten tub',
      proofPoints: 'Cafe-style taste, 12g protein, collagen peptides, and visible convenience in one morning habit',
      cta: 'Try the starter kit today',
    },
    promptReset: 'Clear the current brief, plan, favorites, and compare selections?',
    exportMarkdownFile: 'ugc-angle-lab-plan.md',
    exportJsonFile: 'ugc-angle-lab-plan.json',
    historyReload: 'Reload saved plan',
    compareSummary: 'Compare summary',
    comparisonA: 'Variant A',
    comparisonB: 'Variant B',
    historyTag: 'Saved plan',
    summaryFallback: 'Build a plan to see a polished UGC board.',
  },
  ko: {
    title: 'UGC Angle Lab',
    hero:
      '거친 제품 브리프를 입력하면 제작비를 쓰기 전에 훅 뱅크, 스크립트, 샷 리스트, 테스트 플랜까지 바로 정리합니다.',
    sample: '샘플 불러오기',
    generate: '플랜 생성',
    exportMarkdown: '마크다운 내보내기',
    exportJson: 'JSON 내보내기',
    reset: '초기화',
    briefEyebrow: '입력 / 제품 브리프',
    briefTitle: '크리에이티브 브리프 인테이크',
    personaEyebrow: '1단계 / 페르소나',
    personaTitle: '시청자 관점을 고르세요',
    angleEyebrow: '2단계 / 앵글',
    angleTitle: '설득 프레임을 고르세요',
    historyEyebrow: '유틸리티 / 히스토리',
    historyTitle: '최근 생성 기록',
    summaryEyebrow: '출력 / 크리에이티브 플랜',
    summaryTitle: '에디토리얼 UGC 워킹 보드',
    summaryPersona: '페르소나',
    summaryAngle: '앵글',
    summaryCount: '훅 수',
    hooksEyebrow: '출력 / 훅',
    hooksTitle: '훅 뱅크',
    scriptEyebrow: '출력 / 스크립트',
    scriptTitle: '씬별 스크립트',
    shotsEyebrow: '출력 / 샷',
    shotsTitle: '샷 리스트 보드',
    matrixEyebrow: '출력 / 테스트 매트릭스',
    matrixTitle: '변형 테스트 매트릭스',
    compareEyebrow: '유틸리티 / 비교',
    compareTitle: '두 변형 비교',
    compareHint: '최대 2개 선택',
    favoritesCount: '즐겨찾기',
    favorite: '즐겨찾기',
    unfavorite: '저장됨',
    compareAdd: '비교',
    compareRemove: '선택됨',
    emptyHooks: '플랜을 생성하면 제품·페르소나·앵글에 맞춘 훅 뱅크가 여기에 표시됩니다.',
    emptyScript: '씬별 스크립트 아웃라인이 여기에 표시됩니다.',
    emptyShots: '크리에이터용 샷 리스트가 여기에 표시됩니다.',
    emptyMatrix: '플랜을 생성하면 채널별 변형 테스트 구성이 여기에 표시됩니다.',
    emptyCompare: '매트릭스에서 두 행을 골라 훅 포커스와 채널 설정을 비교해 보세요.',
    emptyHistory: '최근 생성한 플랜은 로컬에 저장되어 빠르게 다시 불러올 수 있습니다.',
    autosave: '로컬 자동 저장',
    savedAt: '저장됨',
    labels: {
      product: '제품',
      offer: '오퍼',
      audience: '타깃 고객',
      pain: '문제 / 트리거',
      objections: '주요 반론',
      proofPoints: '근거 포인트',
      cta: 'CTA',
    },
    sampleBrief: {
      product: '글로우 브루 콜라겐 커피',
      offer: '스타터 키트 30% 할인 + 쉐이커 증정',
      audience: '출근 전 현실적인 뷰티 루틴을 만들고 싶은 30대 여성',
      pain: '아침 피로, 루틴 누락, 복잡한 보충제는 끝까지 못 챙긴다는 부담',
      objections: '맛이 이상할까 걱정되고 과장 광고처럼 느껴질 수 있으며 결국 방치할까 걱정됨',
      proofPoints: '카페 같은 맛, 단백질 12g, 콜라겐 펩타이드, 한 컵으로 끝나는 높은 편의성',
      cta: '오늘 스타터 키트로 시작해보세요',
    },
    promptReset: '현재 브리프, 플랜, 즐겨찾기, 비교 선택을 모두 지울까요?',
    exportMarkdownFile: 'ugc-angle-lab-plan-ko.md',
    exportJsonFile: 'ugc-angle-lab-plan-ko.json',
    historyReload: '저장된 플랜 다시 열기',
    compareSummary: '비교 요약',
    comparisonA: '변형 A',
    comparisonB: '변형 B',
    historyTag: '저장된 플랜',
    summaryFallback: '플랜을 생성하면 정리된 UGC 보드가 표시됩니다.',
  },
};

const loadedState = loadRawState();
const initialLanguage = detectLanguage(navigator.language, loadedState?.lang);

const state = {
  lang: initialLanguage,
  brief: loadedState?.brief || blankBrief(),
  selectedPersonaId: loadedState?.selectedPersonaId || PERSONAS[initialLanguage][0].id,
  selectedAngleId: loadedState?.selectedAngleId || ANGLES[initialLanguage][0].id,
  favorites: loadedState?.favorites || [],
  compareSelection: loadedState?.compareSelection || [],
  history: loadedState?.history || [],
  plan: loadedState?.plan || null,
  savedAt: loadedState?.savedAt || null,
};

const elements = {
  title: document.querySelector('title'),
  heroCopy: document.querySelector('#heroCopy'),
  autosaveStatus: document.querySelector('#autosaveStatus'),
  sampleButton: document.querySelector('#sampleButton'),
  generateButton: document.querySelector('#generateButton'),
  exportMarkdownButton: document.querySelector('#exportMarkdownButton'),
  exportJsonButton: document.querySelector('#exportJsonButton'),
  resetButton: document.querySelector('#resetButton'),
  briefForm: document.querySelector('#briefForm'),
  briefEyebrow: document.querySelector('#briefEyebrow'),
  briefTitle: document.querySelector('#briefTitle'),
  personaEyebrow: document.querySelector('#personaEyebrow'),
  personaTitle: document.querySelector('#personaTitle'),
  angleEyebrow: document.querySelector('#angleEyebrow'),
  angleTitle: document.querySelector('#angleTitle'),
  historyEyebrow: document.querySelector('#historyEyebrow'),
  historyTitle: document.querySelector('#historyTitle'),
  summaryEyebrow: document.querySelector('#summaryEyebrow'),
  summaryTitle: document.querySelector('#summaryTitle'),
  summaryPersonaLabel: document.querySelector('#summaryPersonaLabel'),
  summaryAngleLabel: document.querySelector('#summaryAngleLabel'),
  summaryCountLabel: document.querySelector('#summaryCountLabel'),
  summaryPersonaValue: document.querySelector('#summaryPersonaValue'),
  summaryAngleValue: document.querySelector('#summaryAngleValue'),
  summaryCountValue: document.querySelector('#summaryCountValue'),
  personaCards: document.querySelector('#personaCards'),
  angleCards: document.querySelector('#angleCards'),
  hooksEyebrow: document.querySelector('#hooksEyebrow'),
  hooksTitle: document.querySelector('#hooksTitle'),
  favoritesCount: document.querySelector('#favoritesCount'),
  hooksList: document.querySelector('#hooksList'),
  scriptEyebrow: document.querySelector('#scriptEyebrow'),
  scriptTitle: document.querySelector('#scriptTitle'),
  scriptList: document.querySelector('#scriptList'),
  shotsEyebrow: document.querySelector('#shotsEyebrow'),
  shotsTitle: document.querySelector('#shotsTitle'),
  shotsList: document.querySelector('#shotsList'),
  matrixEyebrow: document.querySelector('#matrixEyebrow'),
  matrixTitle: document.querySelector('#matrixTitle'),
  compareHint: document.querySelector('#compareHint'),
  matrixTableWrap: document.querySelector('#matrixTableWrap'),
  compareEyebrow: document.querySelector('#compareEyebrow'),
  compareTitle: document.querySelector('#compareTitle'),
  comparePanel: document.querySelector('#comparePanel'),
  historyList: document.querySelector('#historyList'),
  langButtons: [...document.querySelectorAll('.lang-btn')],
  fieldLabels: [...document.querySelectorAll('[data-label]')],
};

function blankBrief() {
  return {
    product: '',
    offer: '',
    audience: '',
    pain: '',
    objections: '',
    proofPoints: '',
    cta: '',
  };
}

function loadRawState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState() {
  state.savedAt = new Date().toISOString();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      lang: state.lang,
      brief: state.brief,
      selectedPersonaId: state.selectedPersonaId,
      selectedAngleId: state.selectedAngleId,
      favorites: state.favorites,
      compareSelection: state.compareSelection,
      history: state.history,
      plan: state.plan,
      savedAt: state.savedAt,
    }),
  );
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatTimestamp(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat(state.lang === 'ko' ? 'ko-KR' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function applySampleData() {
  state.brief = { ...copy[state.lang].sampleBrief };
  syncForm();
  generatePlan();
}

function resetAll() {
  if (!window.confirm(copy[state.lang].promptReset)) return;
  state.brief = blankBrief();
  state.plan = null;
  state.favorites = [];
  state.compareSelection = [];
  state.history = [];
  syncForm();
  persistAndRender();
}

function syncForm() {
  const formData = new FormData(elements.briefForm);
  Object.keys(state.brief).forEach((key) => {
    if (formData.has(key)) {
      elements.briefForm.elements[key].value = state.brief[key] || '';
    }
  });
}

function getSelectedPersonas() {
  return PERSONAS[state.lang] || PERSONAS.en;
}

function getSelectedAngles() {
  return ANGLES[state.lang] || ANGLES.en;
}

function ensureSelectionExists() {
  if (!getSelectedPersonas().some((item) => item.id === state.selectedPersonaId)) {
    state.selectedPersonaId = getSelectedPersonas()[0].id;
  }
  if (!getSelectedAngles().some((item) => item.id === state.selectedAngleId)) {
    state.selectedAngleId = getSelectedAngles()[0].id;
  }
}

function generatePlan() {
  ensureSelectionExists();
  state.plan = buildPlan(
    state.brief,
    {
      personaId: state.selectedPersonaId,
      angleId: state.selectedAngleId,
    },
    state.lang,
  );
  state.compareSelection = [];
  pushHistory(state.plan);
  persistAndRender();
}

function pushHistory(plan) {
  const headline = plan.hooks[0]?.headline || plan.brief.product;
  const entry = {
    id: globalThis.crypto?.randomUUID?.() || `${Date.now()}`,
    lang: plan.lang,
    createdAt: plan.generatedAt,
    title: headline,
    note: `${plan.persona.label} · ${plan.angle.label}`,
    plan,
  };

  state.history = [entry, ...state.history.filter((item) => item.title !== entry.title).slice(0, 7)];
}

function persistAndRender() {
  saveState();
  render();
}

function setLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  ensureSelectionExists();
  if (state.plan) {
    state.plan = buildPlan(
      state.brief,
      { personaId: state.selectedPersonaId, angleId: state.selectedAngleId },
      state.lang,
    );
  }
  persistAndRender();
}

function bindEvents() {
  elements.briefForm.addEventListener('input', (event) => {
    const { name, value } = event.target;
    if (!name) return;
    state.brief[name] = value;
    saveState();
    renderHeaderOnly();
  });

  elements.sampleButton.addEventListener('click', applySampleData);
  elements.generateButton.addEventListener('click', generatePlan);
  elements.exportMarkdownButton.addEventListener('click', exportMarkdown);
  elements.exportJsonButton.addEventListener('click', exportJson);
  elements.resetButton.addEventListener('click', resetAll);

  elements.langButtons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
  });

  elements.personaCards.addEventListener('click', (event) => {
    const card = event.target.closest('[data-persona-id]');
    if (!card) return;
    state.selectedPersonaId = card.dataset.personaId;
    if (state.plan) {
      state.plan = buildPlan(state.brief, { personaId: state.selectedPersonaId, angleId: state.selectedAngleId }, state.lang);
    }
    persistAndRender();
  });

  elements.angleCards.addEventListener('click', (event) => {
    const card = event.target.closest('[data-angle-id]');
    if (!card) return;
    state.selectedAngleId = card.dataset.angleId;
    if (state.plan) {
      state.plan = buildPlan(state.brief, { personaId: state.selectedPersonaId, angleId: state.selectedAngleId }, state.lang);
    }
    persistAndRender();
  });

  elements.hooksList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-favorite-id]');
    if (!button) return;
    state.favorites = toggleFavorite(state.favorites, button.dataset.favoriteId);
    persistAndRender();
  });

  elements.matrixTableWrap.addEventListener('click', (event) => {
    const button = event.target.closest('[data-compare-id]');
    if (!button) return;
    toggleCompareSelection(button.dataset.compareId);
  });

  elements.historyList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-history-id]');
    if (!button) return;
    const entry = state.history.find((item) => item.id === button.dataset.historyId);
    if (!entry) return;
    state.lang = entry.lang;
    state.plan = entry.plan;
    state.brief = { ...entry.plan.brief };
    state.selectedPersonaId = entry.plan.persona.id;
    state.selectedAngleId = entry.plan.angle.id;
    state.compareSelection = [];
    syncForm();
    persistAndRender();
  });
}

function toggleCompareSelection(id) {
  if (state.compareSelection.includes(id)) {
    state.compareSelection = state.compareSelection.filter((value) => value !== id);
  } else if (state.compareSelection.length >= 2) {
    state.compareSelection = [state.compareSelection[1], id];
  } else {
    state.compareSelection = [...state.compareSelection, id];
  }
  persistAndRender();
}

function exportMarkdown() {
  if (!state.plan) return;
  download(copy[state.lang].exportMarkdownFile, planToMarkdown(state.plan, state.lang), 'text/markdown;charset=utf-8');
}

function exportJson() {
  if (!state.plan) return;
  download(copy[state.lang].exportJsonFile, JSON.stringify(state.plan, null, 2), 'application/json;charset=utf-8');
}

function download(filename, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function renderHeaderOnly() {
  const t = copy[state.lang];
  elements.autosaveStatus.textContent = state.savedAt ? `${t.savedAt} · ${formatTimestamp(state.savedAt)}` : t.autosave;
}

function renderText() {
  const t = copy[state.lang];
  document.documentElement.lang = state.lang;
  elements.title.textContent = t.title;
  elements.heroCopy.textContent = state.plan ? state.plan.hooks[0]?.headline || t.hero : t.hero;
  elements.autosaveStatus.textContent = state.savedAt ? `${t.savedAt} · ${formatTimestamp(state.savedAt)}` : t.autosave;
  elements.sampleButton.textContent = t.sample;
  elements.generateButton.textContent = t.generate;
  elements.exportMarkdownButton.textContent = t.exportMarkdown;
  elements.exportJsonButton.textContent = t.exportJson;
  elements.resetButton.textContent = t.reset;
  elements.briefEyebrow.textContent = t.briefEyebrow;
  elements.briefTitle.textContent = t.briefTitle;
  elements.personaEyebrow.textContent = t.personaEyebrow;
  elements.personaTitle.textContent = t.personaTitle;
  elements.angleEyebrow.textContent = t.angleEyebrow;
  elements.angleTitle.textContent = t.angleTitle;
  elements.historyEyebrow.textContent = t.historyEyebrow;
  elements.historyTitle.textContent = t.historyTitle;
  elements.summaryEyebrow.textContent = t.summaryEyebrow;
  elements.summaryTitle.textContent = t.summaryTitle;
  elements.summaryPersonaLabel.textContent = t.summaryPersona;
  elements.summaryAngleLabel.textContent = t.summaryAngle;
  elements.summaryCountLabel.textContent = t.summaryCount;
  elements.hooksEyebrow.textContent = t.hooksEyebrow;
  elements.hooksTitle.textContent = t.hooksTitle;
  elements.scriptEyebrow.textContent = t.scriptEyebrow;
  elements.scriptTitle.textContent = t.scriptTitle;
  elements.shotsEyebrow.textContent = t.shotsEyebrow;
  elements.shotsTitle.textContent = t.shotsTitle;
  elements.matrixEyebrow.textContent = t.matrixEyebrow;
  elements.matrixTitle.textContent = t.matrixTitle;
  elements.compareEyebrow.textContent = t.compareEyebrow;
  elements.compareTitle.textContent = t.compareTitle;
  elements.compareHint.textContent = t.compareHint;
  elements.favoritesCount.textContent = `${t.favoritesCount}: ${state.favorites.length}`;

  elements.fieldLabels.forEach((node) => {
    node.textContent = t.labels[node.dataset.label];
  });

  elements.langButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.lang === state.lang);
  });
}

function renderSelections() {
  const personasMarkup = getSelectedPersonas()
    .map(
      (persona) => `
        <button type="button" class="selection-card ${persona.id === state.selectedPersonaId ? 'is-active' : ''}" data-persona-id="${persona.id}">
          <strong>${escapeHtml(persona.label)}</strong>
          <p>${escapeHtml(persona.lens)}</p>
          <div class="hook-meta">
            <span class="meta-chip">${escapeHtml(persona.emotion)}</span>
          </div>
        </button>
      `,
    )
    .join('');

  const anglesMarkup = getSelectedAngles()
    .map(
      (angle) => `
        <button type="button" class="selection-card ${angle.id === state.selectedAngleId ? 'is-active' : ''}" data-angle-id="${angle.id}">
          <strong>${escapeHtml(angle.label)}</strong>
          <p>${escapeHtml(angle.premise)}</p>
          <div class="hook-meta">
            <span class="meta-chip">${escapeHtml(angle.prompt)}</span>
          </div>
        </button>
      `,
    )
    .join('');

  elements.personaCards.innerHTML = personasMarkup;
  elements.angleCards.innerHTML = anglesMarkup;
}

function renderSummary() {
  const plan = state.plan;
  const t = copy[state.lang];
  elements.summaryPersonaValue.textContent = plan?.persona.label || '—';
  elements.summaryAngleValue.textContent = plan?.angle.label || '—';
  elements.summaryCountValue.textContent = String(plan?.hooks.length || 0);
  if (!plan) {
    elements.heroCopy.textContent = t.hero;
  }
}

function renderHooks() {
  const t = copy[state.lang];
  if (!state.plan) {
    elements.hooksList.className = 'list-stack empty-state';
    elements.hooksList.innerHTML = `<p>${escapeHtml(t.emptyHooks)}</p>`;
    return;
  }

  elements.hooksList.className = 'list-stack';
  elements.hooksList.innerHTML = state.plan.hooks
    .map((hook) => {
      const favoriteId = hook.id;
      const isFavorite = state.favorites.includes(favoriteId);
      return `
        <article class="hook-card">
          <div class="hook-head">
            <strong>${escapeHtml(hook.headline)}</strong>
            <button type="button" class="favorite-button ${isFavorite ? 'is-active' : ''}" data-favorite-id="${escapeHtml(favoriteId)}">
              ${escapeHtml(isFavorite ? t.unfavorite : t.favorite)}
            </button>
          </div>
          <p>${escapeHtml(hook.rationale)}</p>
          <div class="hook-meta">
            <span class="meta-chip">Score ${hook.score}</span>
          </div>
        </article>
      `;
    })
    .join('');
}

function renderScript() {
  const t = copy[state.lang];
  if (!state.plan) {
    elements.scriptList.className = 'list-stack empty-state';
    elements.scriptList.innerHTML = `<p>${escapeHtml(t.emptyScript)}</p>`;
    return;
  }

  elements.scriptList.className = 'list-stack';
  elements.scriptList.innerHTML = state.plan.script
    .map(
      (scene, index) => `
        <article class="scene-card">
          <strong>${index + 1}. ${escapeHtml(scene.title)}</strong>
          <p>${escapeHtml(scene.voiceover)}</p>
          <div class="scene-meta">
            <span class="meta-chip">${escapeHtml(scene.beat)}</span>
          </div>
        </article>
      `,
    )
    .join('');
}

function renderShots() {
  const t = copy[state.lang];
  if (!state.plan) {
    elements.shotsList.className = 'list-stack empty-state';
    elements.shotsList.innerHTML = `<p>${escapeHtml(t.emptyShots)}</p>`;
    return;
  }

  elements.shotsList.className = 'list-stack';
  elements.shotsList.innerHTML = state.plan.shotList
    .map(
      (shot) => `
        <article class="shot-card">
          <strong>${escapeHtml(shot.shot)}</strong>
          <p>${escapeHtml(shot.creatorNote)}</p>
        </article>
      `,
    )
    .join('');
}

function renderMatrix() {
  const t = copy[state.lang];
  if (!state.plan) {
    elements.matrixTableWrap.className = 'table-wrap empty-state';
    elements.matrixTableWrap.innerHTML = `<p>${escapeHtml(t.emptyMatrix)}</p>`;
    return;
  }

  elements.matrixTableWrap.className = 'table-wrap';
  const rows = state.plan.testMatrix
    .map((row) => {
      const active = state.compareSelection.includes(row.id);
      return `
        <tr>
          <td><strong>${escapeHtml(row.variant)}</strong></td>
          <td>${escapeHtml(row.channel)}</td>
          <td>${escapeHtml(row.hook)}</td>
          <td>${escapeHtml(row.hypothesis)}</td>
          <td>
            <button type="button" class="compare-chip ${active ? 'is-active' : ''}" data-compare-id="${row.id}">
              ${escapeHtml(active ? t.compareRemove : t.compareAdd)}
            </button>
          </td>
        </tr>
      `;
    })
    .join('');

  elements.matrixTableWrap.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Variant</th>
          <th>Channel</th>
          <th>Hook</th>
          <th>Hypothesis</th>
          <th>Compare</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderCompare() {
  const t = copy[state.lang];
  if (!state.plan) {
    elements.comparePanel.className = 'compare-panel empty-state';
    elements.comparePanel.innerHTML = `<p>${escapeHtml(t.emptyCompare)}</p>`;
    return;
  }

  const compared = compareVariants(state.plan.testMatrix, state.compareSelection);
  if (compared.rows.length < 2) {
    elements.comparePanel.className = 'compare-panel empty-state';
    elements.comparePanel.innerHTML = `<p>${escapeHtml(t.emptyCompare)}</p>`;
    return;
  }

  elements.comparePanel.className = 'compare-panel';
  elements.comparePanel.innerHTML = `
    <article class="compare-card">
      <strong>${escapeHtml(t.compareSummary)}</strong>
      <p>${escapeHtml(compared.summary)}</p>
    </article>
    <article class="compare-card">
      <strong>${escapeHtml(t.comparisonA)}</strong>
      <p>${escapeHtml(compared.rows[0].hook)}</p>
      <div class="hook-meta">
        <span class="meta-chip">${escapeHtml(compared.rows[0].channel)}</span>
        <span class="meta-chip">${escapeHtml(compared.rows[0].persona)}</span>
      </div>
    </article>
    <article class="compare-card">
      <strong>${escapeHtml(t.comparisonB)}</strong>
      <p>${escapeHtml(compared.rows[1].hook)}</p>
      <div class="hook-meta">
        <span class="meta-chip">${escapeHtml(compared.rows[1].channel)}</span>
        <span class="meta-chip">${escapeHtml(compared.rows[1].persona)}</span>
      </div>
    </article>
  `;
}

function renderHistory() {
  const t = copy[state.lang];
  if (!state.history.length) {
    elements.historyList.className = 'history-list empty-state';
    elements.historyList.innerHTML = `<p>${escapeHtml(t.emptyHistory)}</p>`;
    return;
  }

  elements.historyList.className = 'history-list';
  elements.historyList.innerHTML = state.history
    .map(
      (entry) => `
        <button type="button" class="history-item" data-history-id="${entry.id}" title="${escapeHtml(t.historyReload)}">
          <strong>${escapeHtml(entry.title)}</strong>
          <p>${escapeHtml(entry.note)}</p>
          <time datetime="${entry.createdAt}">${escapeHtml(formatTimestamp(entry.createdAt))}</time>
        </button>
      `,
    )
    .join('');
}

function render() {
  renderText();
  syncForm();
  renderSelections();
  renderSummary();
  renderHooks();
  renderScript();
  renderShots();
  renderMatrix();
  renderCompare();
  renderHistory();
}

bindEvents();
render();
