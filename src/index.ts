#!/usr/bin/env node

process.removeAllListeners('warning')

import { Command } from 'commander'
import { analyzeSecurity } from './security'
import { analyzeCost } from './cost'
import { explainTerraform } from './explain'
import { init } from './init'
import { asyncExec, getConfig } from './utils'
import chalk from 'chalk'

const program = new Command()

program
  .name('crust')
  .description('CLI for Terraform infrastructure analysis')
  .version('1.0.0')

program.command('init').description('Initialize Crust').action(init)

program
  .command('security')
  .description('Analyzes security issues in terraform plan/apply output')
  .option('--openai-api-key <key>', 'OpenAI API key')
  .option('--language <language>', 'Language to use for the analysis')
  .option('--terraform-plan-command <command>', 'Terraform plan command')
  .action(async (options) => {
    return analyzeSecurity({
      openaiKey: options.openaiApiKey,
      language: options.language,
      terraformPlanCommand: options.terraformPlanCommand,
    })
  })

program
  .command('cost')
  .description('Analyzes the cost of terraform changes')
  .option('--openai-api-key <key>', 'OpenAI API key')
  .option('--terraform-plan-command <command>', 'Terraform plan command')
  .action(async (options) => {
    return analyzeCost({
      openaiKey: options.openaiApiKey,
      terraformPlanCommand: options.terraformPlanCommand,
    })
  })

program
  .command('explain')
  .description('Explains terraform/terragrunt plan output')
  .option('--openai-api-key <key>', 'OpenAI API key')
  .option('--language <language>', 'Language to use for the analysis')
  .option('--terraform-plan-command <command>', 'Terraform plan command')
  .action(async (options) => {
    return explainTerraform({
      openaiKey: options.openaiApiKey,
      language: options.language,
      terraformPlanCommand: options.terraformPlanCommand,
    })
  })

program
  .command('all')
  .description(
    'Analyzes security, cost, and explains terraform/terragrunt plan output'
  )
  .option('--openai-api-key <key>', 'OpenAI API key')
  .option('--terraform-plan-command <command>', 'Terraform plan command')
  .option('--language <language>', 'Language to use for the analysis')
  .action(async (options) => {
    console.log(chalk.blue('🔍 Running all checks...'))

    console.log(chalk.gray('Getting configuration...'))

    const config = getConfig({
      openaiKey: options.openaiApiKey,
      terraformPlanCommand: options.terraformPlanCommand,
    })

    if (!config && (!options.openaiApiKey || !options.terraformPlanCommand)) {
      return
    }

    if (!options.terraformPlanCommand) {
      options.terraformPlanCommand = config!.terraformPlanCommand
    }

    const { terraformPlanCommand } = options

    console.log(chalk.gray('Executing terraform plan...'))

    const output = await asyncExec(terraformPlanCommand)

    await analyzeSecurity({
      output,
      openaiKey: options.openaiApiKey,
      language: options.language,
      terraformPlanCommand: options.terraformPlanCommand,
    })
    await analyzeCost({
      output,
      openaiKey: options.openaiApiKey,
      terraformPlanCommand: options.terraformPlanCommand,
    })
    await explainTerraform({
      output,
      openaiKey: options.openaiApiKey,
      language: options.language,
      terraformPlanCommand: options.terraformPlanCommand,
    })
  })

program.parse()
