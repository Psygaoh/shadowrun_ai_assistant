#!/usr/bin/env node
import { spawn } from 'node:child_process';

const mode = process.argv[2] ?? 'dev';
const supportedModes = new Set(['dev', 'deploy', 'reset']);

if (!supportedModes.has(mode)) {
  console.error(`Unsupported mode "${mode}". Use one of: ${Array.from(supportedModes).join(', ')}`);
  process.exit(1);
}

const env = { ...process.env };

if (!env.DIRECT_URL) {
  if (env.DATABASE_URL) {
    env.DIRECT_URL = env.DATABASE_URL;
    console.log('DIRECT_URL not set, defaulting to DATABASE_URL for this command.');
  } else {
    console.error('Neither DIRECT_URL nor DATABASE_URL is defined. Please set at least DATABASE_URL.');
    process.exit(1);
  }
}

const isWindows = process.platform === 'win32';
const command = isWindows ? 'npx.cmd' : 'npx';
const args = ['prisma', 'migrate', mode];

const child = spawn(command, args, {
  stdio: 'inherit',
  env,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
