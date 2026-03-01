import { describe, it, expect, beforeAll } from 'vitest';
import { spawn } from 'child_process';
import { resolve } from 'path';

const cliPath = resolve(process.cwd(), 'dist/index.js');

async function runCli(args: string[]): Promise<{ stdout: string; stderr: string; code: number | null }> {
  return new Promise((resolvePromise) => {
    const proc = spawn('node', [cliPath, ...args], {
      cwd: process.cwd(),
    });
    let stdout = '';
    let stderr = '';
    proc.stdout?.on('data', (d) => (stdout += d.toString()));
    proc.stderr?.on('data', (d) => (stderr += d.toString()));
    proc.on('close', (code) => resolvePromise({ stdout, stderr, code }));
  });
}

describe('CLI', () => {
  beforeAll(async () => {
    // Ensure build exists (run build if dist is missing)
    const { existsSync } = await import('fs');
    if (!existsSync(cliPath)) {
      const { execSync } = await import('child_process');
      execSync('npm run build', { cwd: process.cwd(), stdio: 'inherit' });
    }
  });

  it('shows help with --help', async () => {
    const { stdout } = await runCli(['--help']);
    expect(stdout).toContain('Usage: cody');
    expect(stdout).toContain('create');
    expect(stdout).toContain('Create a new coding agent');
  });

  it('shows version with -V', async () => {
    const { stdout } = await runCli(['-V']);
    expect(stdout.trim()).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('runs create command', async () => {
    const { stdout, stderr, code } = await runCli(['create']);
    expect(code).toBe(0);
    // createAgent is a no-op for now; add assertions when you add logic
    expect(stdout).toBeDefined();
    expect(stderr).toBeDefined();
  });
});
