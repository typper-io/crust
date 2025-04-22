import chalk from 'chalk'
import OpenAI from 'openai'
import { AwsPricingApi } from './pricing/aws'
import { asyncExec, createTable, getConfig } from './utils'
import { z } from 'zod'
import { zodResponseFormat } from 'openai/helpers/zod'

const Changes = z.object({
  oldResources: z.array(
    z.object({
      serviceCode: z.enum([
        'AmazonEC2',
        'AmazonS3',
        'AmazonRDS',
        'AmazonLambda',
        'AmazonRoute53',
        'AmazonCloudFront',
        'AmazonRedshift',
        'AmazonSQS',
      ]),
      friendlyName: z.string(),
      instanceType: z.string().nullable(),
      region: z.string().nullable(),
      quantity: z.number().nullable(),
    })
  ),
  newResources: z.array(
    z.object({
      serviceCode: z.enum([
        'AmazonEC2',
        'AmazonS3',
        'AmazonRDS',
        'AmazonLambda',
        'AmazonRoute53',
        'AmazonCloudFront',
        'AmazonRedshift',
        'AmazonSQS',
      ]),
      friendlyName: z.string(),
      instanceType: z.string().nullable(),
      region: z.string().nullable(),
      quantity: z.number().nullable(),
    })
  ),
  cloudProvider: z.enum(['aws', 'azure', 'gcp']),
})

type AnalyzeCostProps = {
  output?: string
  openaiKey?: string
  terraformPlanCommand?: string
}
export async function analyzeCost({
  output,
  openaiKey,
  terraformPlanCommand,
}: AnalyzeCostProps) {
  try {
    console.log(chalk.gray('Getting configuration...'))

    const config = getConfig({
      openaiKey,
      terraformPlanCommand,
    })

    if (!config && !openaiKey && !terraformPlanCommand) {
      return
    }

    if (!openaiKey) {
      openaiKey = config!.openaiKey
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

    console.log(chalk.gray('Mapping changes...'))

    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Based on the terraform plan output, return the old and new resources that are being created or updated to calculate the cost.`,
        },
        {
          role: 'user',
          content: output,
        },
      ],
      response_format: zodResponseFormat(Changes, 'changes'),
    })

    const changes = completion.choices[0].message.parsed

    const { oldResources, newResources, cloudProvider } = changes || {}

    if (cloudProvider !== 'aws') {
      console.error(
        chalk.yellow(
          'Cloud provider not supported yet. You can contribute to the project by adding support for your cloud provider.'
        )
      )

      return
    }

    let oldResourcesCost = 0
    let newResourcesCost = 0

    const newResourcesWithCost = []
    const oldResourcesWithCost = []

    console.log(chalk.gray('Calculating old resources cost...'))

    const pricingApi = new AwsPricingApi()

    for (const resource of oldResources || []) {
      const { serviceCode, instanceType, region, quantity } = resource

      const result = await pricingApi.getPrice({
        serviceCode,
        instanceType,
        region,
        quantity,
      })

      oldResourcesWithCost.push({
        ...resource,
        cost: result,
      })

      oldResourcesCost += result
    }

    console.log(chalk.gray('Calculating new resources cost...'))

    for (const resource of newResources || []) {
      const { serviceCode, instanceType, region, quantity } = resource

      const result = await pricingApi.getPrice({
        serviceCode,
        instanceType,
        region,
        quantity,
      })

      newResourcesWithCost.push({
        ...resource,
        cost: result,
      })

      newResourcesCost += result
    }

    const totalCostDiff = newResourcesCost - oldResourcesCost
    const costDiffPercentage = (
      (totalCostDiff / oldResourcesCost) *
      100
    ).toFixed(2)

    const costDiffColor = totalCostDiff > 0 ? chalk.red : chalk.green
    const costDiffSymbol = totalCostDiff > 0 ? '↑' : '↓'

    console.log('\n')
    console.log(chalk.bold('Summary:'))
    console.log(
      `- Current total cost: ${chalk.yellow(`$${oldResourcesCost.toFixed(2)}`)}`
    )
    console.log(
      `- New total cost: ${chalk.yellow(`$${newResourcesCost.toFixed(2)}`)}`
    )
    console.log(
      `- Difference: ${costDiffColor(
        `${costDiffSymbol} $${Math.abs(totalCostDiff).toFixed(2)} (${Math.abs(
          Number(costDiffPercentage)
        )}%)`
      )}`
    )

    console.log(
      createTable([
        [
          chalk.bold('Resource'),
          chalk.bold('Instance Type'),
          chalk.bold('Cost'),
          chalk.bold('Quantity'),
          chalk.bold('Region'),
        ],
        ...(newResourcesWithCost || []).map((resource) => [
          resource.friendlyName,
          resource.instanceType || 'N/A',
          chalk.yellow(`$${resource.cost.toFixed(2)}`),
          resource.quantity?.toString() || '1',
          resource.region || 'us-east-1',
        ]),
      ])
    )
  } catch (error) {
    console.error(chalk.red('Error analyzing costs', error))
  }
}
