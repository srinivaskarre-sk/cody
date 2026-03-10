/**
 * Coding agent logic — add your implementation here.
 */

import inquirer from 'inquirer';

export async function createAgent(_options: Record<string, unknown>): Promise<void> {
  console.log('Starting agent...');
  while (true) {
    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'message',
        message: 'Enter a message',
      },
    ]);
    console.log(input);
    if (input.message === 'exit') {
      break;
    }
    console.log('Received message:', input.message);
  }
}
