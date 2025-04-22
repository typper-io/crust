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
  .action(async () => {
    return analyzeSecurity()
  })

program
  .command('cost')
  .description('Analyzes the cost of terraform changes')
  .action(async () => {
    return analyzeCost()
  })

program
  .command('explain')
  .description('Explains terraform/terragrunt plan output')
  .action(async () => {
    return explainTerraform()
  })

program
  .command('all')
  .description(
    'Analyzes security, cost, and explains terraform/terragrunt plan output'
  )
  .action(async () => {
    console.log(chalk.blue('🔍 Running all checks...'))

    console.log(chalk.gray('Getting configuration...'))

    const config = getConfig()

    if (!config) {
      return
    }

    const { terraformPlanCommand } = config

    console.log(chalk.gray('Executing terraform plan...'))

    const output = await asyncExec(terraformPlanCommand)

    await analyzeSecurity(output)
    await analyzeCost(output)
    await explainTerraform(output)
  })

program.parse()
