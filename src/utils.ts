import chalk from 'chalk'
import { exec } from 'child_process'
import { readFileSync } from 'fs'
import path from 'path'
import { table } from 'table'
import os from 'os'

export function createTable(data: string[][]) {
  return table(data, {
    border: {
      topBody: `─`,
      topJoin: `┬`,
      topLeft: `┌`,
      topRight: `┐`,

      bottomBody: `─`,
      bottomJoin: `┴`,
      bottomLeft: `└`,
      bottomRight: `┘`,

      bodyLeft: `│`,
      bodyRight: `│`,
      bodyJoin: `│`,

      joinBody: `─`,
      joinLeft: `├`,
      joinRight: `┤`,
      joinJoin: `┼`,
    },
  })
}

export function asyncExec(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error)
      }
      resolve(stdout)
    })
  })
}

export type Config = {
  openaiKey: string
  terraformPlanCommand: string
  language: string
}

export function getConfig(): Config | null {
  try {
    const configPath = path.join(os.homedir(), '.crust.json')
    const config = JSON.parse(readFileSync(configPath, 'utf8')) as Config
    return config
  } catch (error) {
    console.error(chalk.red('\n❌ Configuration file not found!'))
    console.error(chalk.yellow('\nTo initialize the configuration, run:'))
    console.error(chalk.cyan('  crust init'))
    console.error(
      chalk.yellow(
        '\nThis will create a .crust.json file with default settings in your home directory.'
      )
    )
    return null
  }
}

export function formatXmlTags(text: string) {
  const tagMappings = {
    red: chalk.red,
    green: chalk.green,
    blue: chalk.blue,
    yellow: chalk.yellow,
    purple: chalk.magenta,
    cyan: chalk.cyan,
    white: chalk.white,
    bold: chalk.bold,
    italic: chalk.italic,
    underline: chalk.underline,
    strikethrough: chalk.strikethrough,
    reset: chalk.reset,
  }

  function processTags(input: string): string {
    const tagRegex = /<(\w+)>([\s\S]*?)<\/\1>/g
    let result = input
    let match

    while ((match = tagRegex.exec(input)) !== null) {
      const [fullMatch, tag, content] = match
      if (tagMappings[tag as keyof typeof tagMappings]) {
        const processedContent = processTags(content)
        result = result.replace(
          fullMatch,
          tagMappings[tag as keyof typeof tagMappings](processedContent)
        )
      }
    }

    return result
  }

  return processTags(text)
}
