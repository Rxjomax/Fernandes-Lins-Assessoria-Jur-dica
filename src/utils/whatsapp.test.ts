import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatBrazilPhone,
  buildWhatsAppUrl,
  buildGeneralWhatsAppUrl,
  buildAreaWhatsAppUrl,
  buildFormWhatsAppUrl,
  formatContactMessage,
  validateContactForm,
} from './whatsapp';

test('formatBrazilPhone formats 10-digit and 11-digit Brazilian numbers cleanly', () => {
  assert.equal(formatBrazilPhone(''), '');
  assert.equal(formatBrazilPhone('81'), '(81');
  assert.equal(formatBrazilPhone('8133445566'), '(81) 3344-5566');
  assert.equal(formatBrazilPhone('81986693251'), '(81) 98669-3251');
  assert.equal(formatBrazilPhone('(81) 98669-3251999'), '(81) 98669-3251');
});

test('buildWhatsAppUrl encodes message text and strips non-digits from phone', () => {
  const url = buildWhatsAppUrl('Olá, quero agendar.', '+55 (81) 98669-3251');
  assert.equal(
    url,
    'https://wa.me/5581986693251?text=Ol%C3%A1%2C%20quero%20agendar.'
  );
});

test('buildGeneralWhatsAppUrl and buildAreaWhatsAppUrl target the official Recife firm WhatsApp number', () => {
  const general = buildGeneralWhatsAppUrl();
  assert.ok(general.startsWith('https://wa.me/5581986693251?text='));

  const areaUrl = buildAreaWhatsAppUrl('Direito Criminal');
  assert.ok(areaUrl.startsWith('https://wa.me/5581986693251?text='));
  const decoded = decodeURIComponent(areaUrl.split('?text=')[1]);
  assert.match(decoded, /Fernandes & Lins/);
  assert.match(decoded, /Direito Criminal/);
});

test('validateContactForm rejects empty or malformed inputs with descriptive errors', () => {
  const errors = validateContactForm({
    name: 'Jo',
    whatsapp: '81999',
    area: '',
    summary: 'Curto',
  });
  assert.ok(errors.name);
  assert.ok(errors.whatsapp);
  assert.ok(errors.area);
  assert.ok(errors.summary);
});

test('validateContactForm passes valid payload and buildFormWhatsAppUrl includes all fields', () => {
  const payload = {
    name: 'Mariana Ribeiro',
    whatsapp: '81987654321',
    area: 'Direito Previdenciário',
    summary: 'Preciso de orientação sobre aposentadoria especial junto ao INSS.',
  };

  const errors = validateContactForm(payload);
  assert.deepEqual(errors, {});

  const message = formatContactMessage(payload);
  assert.match(message, /\*Nome:\* Mariana Ribeiro/);
  assert.match(message, /\*WhatsApp:\* \(81\) 98765-4321/);
  assert.match(message, /\*Área de interesse:\* Direito Previdenciário/);
  assert.match(message, /aposentadoria especial/);

  const url = buildFormWhatsAppUrl(payload);
  assert.ok(url.startsWith('https://wa.me/5581986693251?text='));
  assert.ok(decodeURIComponent(url).includes('Mariana Ribeiro'));
});
