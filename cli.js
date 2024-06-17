#!/usr/bin/env node

import { Command } from "commander";
import { port } from "./src/configs/dotenv.config.js";

const program = new Command();

program
  .name("ghapi")
  .description('Test Task for NodeJS Knowledge')
  .version('1.0.0');

program
  .command('repo <id>')
  .description('Gets repo by ID or name from database')
  .action(
    async (id) => {
      const response = await fetch(`http://localhost:${port}/repo/${id}`);
      console.log(response); }
  );
program
  .command('repos <page> <per_page>')
  .description('Gets <per_page> repos on <page> page from database')
  .action();
program
  .command('sync')
  .description('Start force sync with GitHub')
  .action();
program.parse(process.argv);