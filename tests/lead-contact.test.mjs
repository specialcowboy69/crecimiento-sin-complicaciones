import assert from 'node:assert/strict';
import test from 'node:test';
import * as contact from '../app/lib/leadContact.ts';
test('contact validation uses numbering plans and optional email', () => {
  assert.equal(typeof contact.validateContactFields, 'function', 'shared contact validation must exist');
  for (const phone of ['', 'abc604990651', '60499', '111111111', '912345678']) assert.ok(contact.validateContactFields({phone, email:''}).phone, phone);
  for (const phone of ['604 990 651', '+34 (604) 990-651', '0034 604990651', '+44 7911 123456']) assert.deepEqual(contact.validateContactFields({phone, email:''}), {});
  assert.deepEqual(contact.validateContactFields({phone:'604990651', email:' persona@example.com '}), {});
  assert.ok(contact.validateContactFields({phone:'604990651', email:'invalid'}).email);
});
test('storage identifies mobile and preserves optional email and legacy contact', () => {
  assert.equal(typeof contact.resolveLeadContact, 'function', 'contact resolver must exist');
  assert.equal(contact.resolveLeadContact({phone:'604 990 651', email:''}), 'Móvil: +34604990651');
  assert.equal(contact.resolveLeadContact({phone:'604990651', email:' persona@example.com '}), 'Móvil: +34604990651 | Email: persona@example.com');
  assert.equal(contact.resolveLeadContact({contact:'old@example.com'}), 'old@example.com');
  for (const fields of [{phone:'',contact:'old@example.com'}, {phone:123456789,email:''}, {email:'old@example.com',contact:'legacy@example.com'}, {phone:'bad',contact:'old@example.com'}, {phone:'604990651',email:'bad'}]) assert.equal(contact.resolveLeadContact(fields), null);
});


test('complete normalized contact accepts 220 characters and rejects 221', () => {
  const prefix = 'Móvil: +34604990651 | Email: ';
  const email = `${'a'.repeat(220 - prefix.length - '@example.com'.length)}@example.com`;
  assert.deepEqual(contact.validateContactFields({ phone: '604 990 651', email: ` ${email} ` }), {});
  assert.equal(contact.resolveLeadContact({ phone: '604 990 651', email: ` ${email} ` }).length, 220);
  assert.ok(contact.validateContactFields({ phone: '604990651', email: `a${email}` }).email);
  assert.equal(contact.resolveLeadContact({ phone: '604990651', email: `a${email}`, contact: 'legacy@example.com' }), null);
});
