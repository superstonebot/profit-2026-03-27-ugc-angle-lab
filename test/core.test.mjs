import test from 'node:test';
import assert from 'node:assert/strict';
import {
  detectLanguage,
  buildPlan,
  toggleFavorite,
  compareVariants,
  planToMarkdown,
} from '../src/core.mjs';

const brief = {
  product: 'Glow Brew Collagen Coffee',
  offer: 'Starter kit 30% off',
  audience: 'Busy women in their 30s who want easy beauty routines',
  pain: 'Morning fatigue and inconsistent beauty habits',
  objections: 'Skeptical about taste and visible results',
  proofPoints: '12g protein, collagen peptides, cafe taste test wins',
  cta: 'Try the starter kit today',
};

test('detectLanguage prefers stored value then Korean locale fallback', () => {
  assert.equal(detectLanguage('en-US', 'ko'), 'ko');
  assert.equal(detectLanguage('ko-KR', undefined), 'ko');
  assert.equal(detectLanguage('fr-FR', undefined), 'en');
});

test('buildPlan creates hooks, script scenes, shot list, and test matrix', () => {
  const plan = buildPlan(brief, { personaId: 'skeptical-converter', angleId: 'proof-stack' }, 'en');

  assert.equal(plan.persona.id, 'skeptical-converter');
  assert.equal(plan.angle.id, 'proof-stack');
  assert.equal(plan.hooks.length, 6);
  assert.equal(plan.script.length, 5);
  assert.equal(plan.shotList.length, 5);
  assert.equal(plan.testMatrix.length, 6);
  assert.match(plan.hooks[0].headline, /Glow Brew Collagen Coffee/);
  assert.match(plan.script[0].voiceover, /Glow Brew Collagen Coffee/);
  assert.match(plan.testMatrix[0].channel, /TikTok|Meta Reels|YouTube Shorts/);
});

test('toggleFavorite adds and removes ids without duplicates', () => {
  const first = toggleFavorite([], 'hook-1');
  const second = toggleFavorite(first, 'hook-1');
  const third = toggleFavorite(['hook-1'], 'hook-2');

  assert.deepEqual(first, ['hook-1']);
  assert.deepEqual(second, []);
  assert.deepEqual(third, ['hook-1', 'hook-2']);
});

test('compareVariants returns the selected variant rows and a summary', () => {
  const plan = buildPlan(brief, { personaId: 'skeptical-converter', angleId: 'proof-stack' }, 'en');
  const compared = compareVariants(plan.testMatrix, [plan.testMatrix[0].id, plan.testMatrix[1].id]);

  assert.equal(compared.rows.length, 2);
  assert.match(compared.summary, /Hook focus/i);
  assert.notEqual(compared.rows[0].hook, compared.rows[1].hook);
});

test('planToMarkdown exports a readable production brief', () => {
  const plan = buildPlan(brief, { personaId: 'routine-builder', angleId: 'before-after' }, 'en');
  const markdown = planToMarkdown(plan, 'en');

  assert.match(markdown, /^# UGC Angle Lab Plan/m);
  assert.match(markdown, /## Product brief/m);
  assert.match(markdown, /## Hook bank/m);
  assert.match(markdown, /## Shot list/m);
  assert.match(markdown, /Starter kit 30% off/);
});
