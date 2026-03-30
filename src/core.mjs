const CHANNELS = ['TikTok', 'Meta Reels', 'YouTube Shorts'];

export const PERSONAS = {
  en: [
    {
      id: 'skeptical-converter',
      label: 'Skeptical converter',
      lens: 'Needs proof before trying a beauty-adjacent wellness product.',
      emotion: 'Cautious but curious',
      creatorNote: 'Ground everything in concrete proof, demo, and taste reaction.',
    },
    {
      id: 'routine-builder',
      label: 'Routine builder',
      lens: 'Wants one habit that fits into a packed morning.',
      emotion: 'Overloaded and looking for ease',
      creatorNote: 'Show frictionless morning moments and a realistic routine.',
    },
    {
      id: 'results-chaser',
      label: 'Results chaser',
      lens: 'Actively trying to feel and look better without adding complexity.',
      emotion: 'Motivated and impatient',
      creatorNote: 'Lean into visible outcomes, specificity, and momentum.',
    },
  ],
  ko: [
    {
      id: 'skeptical-converter',
      label: '의심 많은 전환형',
      lens: '뷰티/웰니스 제품은 증거가 있어야 시도하는 사람.',
      emotion: '조심스럽지만 궁금함',
      creatorNote: '체험·근거·맛 반응 중심으로 신뢰를 만든다.',
    },
    {
      id: 'routine-builder',
      label: '루틴 정착형',
      lens: '바쁜 아침에 자연스럽게 넣을 수 있는 습관을 찾는 사람.',
      emotion: '지치고 간편함을 원함',
      creatorNote: '번거롭지 않은 아침 루틴과 현실적인 사용 장면을 보여준다.',
    },
    {
      id: 'results-chaser',
      label: '결과 집착형',
      lens: '복잡함 없이 바로 체감과 변화를 원하는 사람.',
      emotion: '의욕적이고 조급함',
      creatorNote: '전후 변화, 구체성, 꾸준한 동력을 강조한다.',
    },
  ],
};

export const ANGLES = {
  en: [
    {
      id: 'proof-stack',
      label: 'Proof stack',
      premise: 'Layer objections away with tangible proof points.',
      prompt: 'Stack the strongest proof until skepticism turns into action.',
    },
    {
      id: 'before-after',
      label: 'Before / after reset',
      premise: 'Contrast the old rushed habit with the new smoother one.',
      prompt: 'Make the upgrade feel instantly relatable and visible.',
    },
    {
      id: 'tiny-habit',
      label: 'Tiny habit win',
      premise: 'Sell the ease of the habit, not the complexity of the product.',
      prompt: 'Focus on the small routine moment that unlocks consistency.',
    },
  ],
  ko: [
    {
      id: 'proof-stack',
      label: '근거 누적',
      premise: '명확한 근거를 쌓아 의심을 행동으로 바꾼다.',
      prompt: '가장 강한 증거를 순서대로 쌓아 설득한다.',
    },
    {
      id: 'before-after',
      label: '전후 리셋',
      premise: '예전의 번거로운 루틴과 지금의 매끄러운 루틴을 대비한다.',
      prompt: '업그레이드가 바로 이해되고 보이게 만든다.',
    },
    {
      id: 'tiny-habit',
      label: '초소형 습관',
      premise: '제품 복잡성보다 습관의 쉬움을 판다.',
      prompt: '꾸준함을 만드는 아주 작은 순간에 집중한다.',
    },
  ],
};

const UI_TEXT = {
  en: {
    planTitle: 'UGC Angle Lab Plan',
    productBrief: 'Product brief',
    persona: 'Persona',
    angle: 'Angle',
    hookBank: 'Hook bank',
    script: 'Script outline',
    shotList: 'Shot list',
    testMatrix: 'Test matrix',
    compareSummaryPrefix: 'Hook focus',
  },
  ko: {
    planTitle: 'UGC Angle Lab 플랜',
    productBrief: '제품 브리프',
    persona: '페르소나',
    angle: '앵글',
    hookBank: '훅 뱅크',
    script: '스크립트 아웃라인',
    shotList: '샷 리스트',
    testMatrix: '테스트 매트릭스',
    compareSummaryPrefix: '훅 포커스',
  },
};

function pickLocalized(items, id) {
  return items.find((item) => item.id === id) || items[0];
}

function sentence(value, fallback) {
  const trimmed = String(value || '').trim();
  return trimmed || fallback;
}

export function detectLanguage(locale, storedLanguage) {
  if (storedLanguage === 'ko' || storedLanguage === 'en') {
    return storedLanguage;
  }
  return String(locale || '').toLowerCase().startsWith('ko') ? 'ko' : 'en';
}

function createHookTemplates(lang) {
  if (lang === 'ko') {
    return [
      ({ product, proofPoints, pain }) => `${product}, 그냥 커피가 아니라 ${pain}을 바꾼다는 말이 왜 나오는지 ${proofPoints}로 보여드릴게요.`,
      ({ product, offer }) => `처음 보는 분들은 ${offer}부터 보세요. ${product}를 가장 부담 없이 테스트하는 방법입니다.`,
      ({ product, objections }) => `저도 '${objections}' 쪽이었는데, ${product}는 반응이 달랐어요.`,
      ({ audience, product }) => `${audience}라면 ${product}를 아침에 넣는 순간 루틴 난도가 확 낮아집니다.`,
      ({ product, proofPoints }) => `${product}가 과장처럼 안 느껴지는 이유는 ${proofPoints} 같은 디테일 때문입니다.`,
      ({ cta, product }) => `${cta} 전에, 왜 다들 ${product}를 '계속 먹게 되는 포맷'이라고 하는지 먼저 보세요.`,
    ];
  }

  return [
    ({ product, pain, proofPoints }) => `${product} sounds like a gimmick until you see how it tackles ${pain} with ${proofPoints}.`,
    ({ product, offer }) => `If you're curious but cautious, ${offer} is the cleanest way to test ${product}.`,
    ({ product, objections }) => `I had the exact same objection — '${objections}' — until ${product} proved otherwise.`,
    ({ audience, product }) => `For ${audience}, ${product} turns one chaotic morning moment into an easy win.`,
    ({ product, proofPoints }) => `${product} feels credible because the proof is specific: ${proofPoints}.`,
    ({ cta, product }) => `Before you ${cta.toLowerCase()}, watch why ${product} keeps making the repeat-purchase shortlist.`,
  ];
}

export function buildHooks(brief, persona, angle, lang) {
  const templates = createHookTemplates(lang);
  return templates.map((template, index) => ({
    id: `hook-${index + 1}`,
    headline: template(brief),
    rationale:
      lang === 'ko'
        ? `${persona.label} 관점에서 '${angle.label}' 프레이밍을 사용해 ${index + 1}번째 훅을 구성했습니다.`
        : `Built from the ${persona.label} lens using the ${angle.label} framing for hook ${index + 1}.`,
    score: 88 - index * 4,
  }));
}

export function buildScript(brief, persona, angle, hooks, lang) {
  const [primaryHook] = hooks;

  if (lang === 'ko') {
    return [
      {
        id: 'scene-1',
        title: '패턴 인터럽트',
        beat: '익숙한 불만을 바로 꺼내며 스크롤을 멈춘다.',
        voiceover: `${primaryHook.headline}`,
      },
      {
        id: 'scene-2',
        title: '공감 세팅',
        beat: `${persona.label}의 감정선을 보여주며 상황을 구체화한다.`,
        voiceover: `${brief.audience}인 저는 늘 ${brief.pain} 때문에 아침 루틴이 무너졌어요.`,
      },
      {
        id: 'scene-3',
        title: '제품 도입',
        beat: `${angle.label} 앵글로 제품과 제안을 연결한다.`,
        voiceover: `${brief.offer}로 시작한 ${brief.product}는 ${angle.premise}`,
      },
      {
        id: 'scene-4',
        title: '근거 제시',
        beat: '반대 이유를 미리 꺼내고 근거로 처리한다.',
        voiceover: `걱정했던 건 ${brief.objections}이었는데, ${brief.proofPoints}가 생각보다 설득력이 컸어요.`,
      },
      {
        id: 'scene-5',
        title: '행동 유도',
        beat: '작게 시작해도 되는 CTA로 마무리한다.',
        voiceover: `${brief.cta}. 오늘 루틴에 넣을 수 있을 만큼 간단한지 직접 확인해보세요.`,
      },
    ];
  }

  return [
    {
      id: 'scene-1',
      title: 'Pattern interrupt',
      beat: 'Stop the scroll with a strong, specific opener.',
      voiceover: primaryHook.headline,
    },
    {
      id: 'scene-2',
      title: 'Relatable setup',
      beat: `Show the ${persona.label} tension in a believable routine moment.`,
      voiceover: `As someone in ${brief.audience}, I kept running into ${brief.pain} every morning.`,
    },
    {
      id: 'scene-3',
      title: 'Product reveal',
      beat: `Bridge the offer to the ${angle.label} angle.`,
      voiceover: `I started with ${brief.offer}, and ${brief.product} instantly felt like a smarter swap because ${angle.premise.toLowerCase()}`,
    },
    {
      id: 'scene-4',
      title: 'Proof + objection handling',
      beat: 'Address the main objection with evidence and texture.',
      voiceover: `My biggest hesitation was ${brief.objections}, but ${brief.proofPoints} made the decision feel grounded instead of hypey.`,
    },
    {
      id: 'scene-5',
      title: 'Call to action',
      beat: 'Close with a low-friction next step.',
      voiceover: `${brief.cta}. If your routine needs one easier win, this is a strong place to test.`,
    },
  ];
}

export function buildShotList(script, persona, lang) {
  return script.map((scene, index) => ({
    id: `shot-${index + 1}`,
    sceneId: scene.id,
    shot:
      lang === 'ko'
        ? `${scene.title} 장면용 핸드헬드 + 디테일 컷`
        : `Handheld + detail coverage for ${scene.title}`,
    creatorNote:
      lang === 'ko'
        ? `${persona.creatorNote} / 컷 ${index + 1}은 자연광, 실제 생활 공간에서 촬영.`
        : `${persona.creatorNote} / Capture scene ${index + 1} in natural light with lived-in texture.`,
  }));
}

export function buildTestMatrix(hooks, persona, angle, lang) {
  return hooks.map((hook, index) => ({
    id: `variant-${index + 1}`,
    variant: lang === 'ko' ? `변형 ${index + 1}` : `Variant ${index + 1}`,
    hook: hook.headline,
    channel: CHANNELS[index % CHANNELS.length],
    persona: persona.label,
    angle: angle.label,
    hypothesis:
      lang === 'ko'
        ? `${angle.label} 앵글이 ${persona.label}에게 더 높은 클릭과 시청 유지율을 만들 것.`
        : `${angle.label} will increase thumb-stop rate and qualified clicks for the ${persona.label} persona.`,
  }));
}

export function buildPlan(rawBrief, selection = {}, lang = 'en') {
  const localizedPersonas = PERSONAS[lang] || PERSONAS.en;
  const localizedAngles = ANGLES[lang] || ANGLES.en;
  const persona = pickLocalized(localizedPersonas, selection.personaId);
  const angle = pickLocalized(localizedAngles, selection.angleId);

  const brief = {
    product: sentence(rawBrief.product, lang === 'ko' ? '신제품' : 'New product'),
    offer: sentence(rawBrief.offer, lang === 'ko' ? '체험 오퍼' : 'Starter offer'),
    audience: sentence(rawBrief.audience, lang === 'ko' ? '핵심 고객' : 'target audience'),
    pain: sentence(rawBrief.pain, lang === 'ko' ? '해결하고 싶은 불편' : 'daily pain point'),
    objections: sentence(rawBrief.objections, lang === 'ko' ? '의심 요소' : 'top objection'),
    proofPoints: sentence(rawBrief.proofPoints, lang === 'ko' ? '핵심 증거' : 'proof points'),
    cta: sentence(rawBrief.cta, lang === 'ko' ? '지금 확인하기' : 'Try it now'),
  };

  const hooks = buildHooks(brief, persona, angle, lang);
  const script = buildScript(brief, persona, angle, hooks, lang);
  const shotList = buildShotList(script, persona, lang);
  const testMatrix = buildTestMatrix(hooks, persona, angle, lang);

  return {
    generatedAt: new Date().toISOString(),
    lang,
    brief,
    persona,
    angle,
    hooks,
    script,
    shotList,
    testMatrix,
  };
}

export function toggleFavorite(current, itemId) {
  return current.includes(itemId)
    ? current.filter((value) => value !== itemId)
    : [...current, itemId];
}

export function compareVariants(matrix, selectedIds = []) {
  const rows = matrix.filter((row) => selectedIds.includes(row.id)).slice(0, 2);
  const first = rows[0];
  const second = rows[1];

  if (rows.length < 2) {
    return {
      rows,
      summary: 'Select two variants to compare.',
    };
  }

  return {
    rows,
    summary: `Hook focus: Variant A leans on "${first.hook}" while Variant B leans on "${second.hook}". Keep the better-performing opener and hold the channel constant for cleaner learning.`,
  };
}

export function planToMarkdown(plan, lang = 'en') {
  const text = UI_TEXT[lang] || UI_TEXT.en;

  const bullet = (value) => `- ${value}`;

  return [
    `# ${text.planTitle}`,
    '',
    `## ${text.productBrief}`,
    bullet(`Product: ${plan.brief.product}`),
    bullet(`Offer: ${plan.brief.offer}`),
    bullet(`Audience: ${plan.brief.audience}`),
    bullet(`Pain: ${plan.brief.pain}`),
    bullet(`Objections: ${plan.brief.objections}`),
    bullet(`Proof points: ${plan.brief.proofPoints}`),
    bullet(`CTA: ${plan.brief.cta}`),
    '',
    `## ${text.persona}`,
    bullet(plan.persona.label),
    bullet(plan.persona.lens),
    '',
    `## ${text.angle}`,
    bullet(plan.angle.label),
    bullet(plan.angle.premise),
    '',
    `## ${text.hookBank}`,
    ...plan.hooks.map((hook) => bullet(`${hook.headline} (${hook.score})`)),
    '',
    `## ${text.script}`,
    ...plan.script.map((scene) => bullet(`${scene.title}: ${scene.voiceover}`)),
    '',
    `## ${text.shotList}`,
    ...plan.shotList.map((shot) => bullet(`${shot.shot} — ${shot.creatorNote}`)),
    '',
    `## ${text.testMatrix}`,
    ...plan.testMatrix.map((row) => bullet(`${row.variant} / ${row.channel} / ${row.hook}`)),
    '',
  ].join('\n');
}
