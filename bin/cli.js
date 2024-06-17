#!/usr/bin/env node

import { Command } from 'commander';
import select from '@inquirer/select';
import { input } from '@inquirer/prompts';
import fs from 'fs';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const port = process.env.CLI_PORT || '3003';
const host = process.env.CLI_HOST || 'http://localhost';

const program = new Command();

program
  .name('ghapi')
  .description('Test Task for NodeJS Knowledge')
  .version('1.0.0');

program
  .command('repo <id>')
  .description('Gets repo by ID or name from database')
  .action(async (id) => {
    const response = await fetch(`${host}:${port}/repos/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    displayData(data);
  });
program
  .command('repos')
  .description('Gets repos from database')
  .action(async () => {
    const perPage = await input({
      message: 'Enter items count per page: ',
      default: '5',
    });
    const page = await input({
      message: 'Enter page number: ',
      default: '1',
    });
    const response = await fetch(
      `${host}:${port}/repos?page=${page}&per_page=${perPage}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    displayData(data);
  });
program
  .command('sync')
  .description('Start force sync with GitHub')
  .action(async () => {
    const response = await fetch(`${host}:${port}/polling/sync`, {
      method: 'POST',
    });
    console.log(`The data is synchronized`);
  });

program.parse(process.argv);

async function displayData(data) {
  const answer = await select({
    message: 'Choose where to display the result:',
    choices: [
      {
        name: 'Console',
        value: 'console',
        description: 'Select the console to display a small amount of data',
      },
      {
        name: 'File',
        value: 'file',
        description: 'Select a file to display a large amount of data',
      },
    ],
  });
  switch (answer) {
    case 'console':
      console.log(data);
      break;
    case 'file':
      const fileName = await input({
        message: 'Enter file name: ',
        default: 'result.json',
      });
      fs.writeFile(fileName, JSON.stringify(data, null, 2), function (err) {
        if (err) throw err;
        console.log('Saved to: ', fileName);
      });

      break;
  }
}
