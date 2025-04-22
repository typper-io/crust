import chalk from 'chalk'
import OpenAI from 'openai'

import { asyncExec, getConfig, formatXmlTags } from './utils'

type AnalyzeSecurityProps = {
  output?: string
  openaiKey?: string
  language?: string
  terraformPlanCommand?: string
}

export async function analyzeSecurity({
  output,
  openaiKey,
  language,
  terraformPlanCommand,
}: AnalyzeSecurityProps) {
  try {
    console.log(chalk.blue('🔍 Analyzing security issues...'))

    console.log(chalk.gray('Getting configuration...'))

    const config = getConfig({
      openaiKey,
      terraformPlanCommand,
    })

    if (!config && (!openaiKey || !terraformPlanCommand)) {
      return
    }

    if (!openaiKey) {
      openaiKey = config!.openaiKey
    }

    if (!language) {
      language = config!.language
    }

    if (!terraformPlanCommand) {
      terraformPlanCommand = config!.terraformPlanCommand
    }

    const openai = new OpenAI({
      apiKey: openaiKey,
    })

    if (!output) {
      console.log(chalk.gray('Executing terraform plan...'))

      output = await asyncExec(terraformPlanCommand)
    }

    console.log(chalk.gray('Analyzing security issues...'))

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `
          You will be given a terraform plan output and you will need to analyze the security issues in the changes and return in ${
            language || 'English'
          }.
          Also return one or more tips to the user fix the issues based on the changes if there are any.
          Use xml to colorize and format the information in paragraphs. Use concise emojis to make the output more engaging.
          DON'T use markdown, use xml tags.
          The valid xml tags are: <red>, <green>, <blue>, <yellow>, <purple>, <cyan>, <white>, <bold>, <italic>, <underline>, <strikethrough>.`,
        },
        {
          role: 'user',
          content: output,
        },
      ],
    })

    const securityIssues = completion.choices[0].message.content

    if (!securityIssues) {
      console.error(chalk.red('No security issues found'))

      return
    }

    const formattedSecurityIssues = formatXmlTags(securityIssues)

    console.log(formattedSecurityIssues)
  } catch (error) {
    console.error(chalk.red('Error analyzing security issues', error))
  }
}
