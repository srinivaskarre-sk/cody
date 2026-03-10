import { Command } from 'commander';
import { createAgent } from './agent/index.js';

export async function runCli(): Promise<void> {
  const program = new Command();

  const runCreate = async (options: { name?: string }) => {
    await createAgent(options);
  };

  program
    .name('cody')
    .description('CLI for creating a coding agent')
    .version('1.0.0')
    .option('-n, --name <name>', 'Agent name')
    .action(runCreate);

  program
    .command('create')
    .description('Create a new coding agent (default)')
    .option('-n, --name <name>', 'Agent name')
    .action(runCreate);

  program.parse();
}
