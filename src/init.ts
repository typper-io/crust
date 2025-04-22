import { writeFile, access } from 'fs/promises'
import chalk from 'chalk'
import path from 'path'
import { question } from 'readline-sync'
import os from 'os'

export async function init() {
  const configPath = path.join(os.homedir(), '.crust.json')

  try {
    await access(configPath)

    console.log(chalk.yellow('⚠️  Configuration file already exists!'))

    const shouldOverwrite = question(
      'Do you want to overwrite the configuration? (y/n): '
    )

    if (shouldOverwrite.toLowerCase() !== 'y') {
      console.log(chalk.green('Operation cancelled.'))
      return
    }
  } catch (error) {
    // File doesn't exist, continue normally
  }

  console.log(chalk.blue('📝 Crust Initial Configuration'))
  console.log(chalk.gray("Let's set up your environment...\n"))

  const openaiKey = question('🔑 Enter your OpenAI API key: ')
  const terraformPlanCommand = question(
    '🔄 Command to execute terraform plan (e.g. terraform plan): '
  )

  const language = question('🌐 Language (e.g. en, pt-br): ')

  const config = {
    openaiKey,
    terraformPlanCommand,
    language,
  }

  await writeFile(configPath, JSON.stringify(config, null, 2))
  console.log(chalk.green('\n✅ Configuration saved successfully!'))
}
