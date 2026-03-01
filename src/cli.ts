import { Command } from 'commander';
import { createAgent } from './agent/index.js';

export async function runCli(): Promise<void> {
  const program = new Command();

  program
    .name('cody')
    .description('CLI for creating a coding agent')
    .version('1.0.0');

  program
    .command('create')
    .description('Create a new coding agent')
    .option('-n, --name <name>', 'Agent name')
    .action(async (options) => {
      await createAgent(options);
    });

  program.parse();
}
