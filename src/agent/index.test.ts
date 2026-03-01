import { describe, it, expect } from 'vitest';
import { createAgent } from './index.js';

describe('createAgent', () => {
  it('resolves without throwing', async () => {
    await expect(createAgent({})).resolves.toBeUndefined();
  });

  it('accepts options', async () => {
    await expect(createAgent({ name: 'my-agent' })).resolves.toBeUndefined();
  });
});
