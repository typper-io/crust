import chalk from 'chalk'
import OpenAI from 'openai'

import { asyncExec, getConfig, formatXmlTags } from './utils'

export async function explainTerraform(output?: string) {
  try {
    console.log(chalk.blue('🔍 Explaining Terraform changes...'))

    console.log(chalk.gray('Getting configuration...'))

    const config = getConfig()

    if (!config) {
      return
    }

    const { openaiKey, terraformPlanCommand, language } = config

    const openai = new OpenAI({
      apiKey: openaiKey,
    })

    if (!output) {
      console.log(chalk.gray('Executing terraform plan...'))

      output = await asyncExec(terraformPlanCommand)
    }

    console.log(chalk.gray('Explaining changes...'))

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `
          You will be given a terraform plan output and you will need to format the changes that are being made in ${language}.
          Detail the changes with numbers and names.
          Also return one or more tips to the user based on the changes if there are any.
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

    const explanation = completion.choices[0].message.content

    if (!explanation) {
      console.error(chalk.red('No explanation found'))

      return
    }

    const formattedExplanation = formatXmlTags(explanation)

    console.log(formattedExplanation)
  } catch (error) {
    console.error(chalk.red('Error explaining terraform changes', error))
  }
}
