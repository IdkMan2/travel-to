import assert from 'assert';

export function assertEnvKeysDefined(keys: string[]): void | never {
  for (const key of keys) {
    assert.strictEqual(typeof process.env[key], 'string', `Env key \`${key}\` is not defined.`);
  }
}
