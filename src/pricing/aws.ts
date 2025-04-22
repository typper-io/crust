import {
  PricingClient,
  GetProductsCommand,
  Filter,
} from '@aws-sdk/client-pricing'
import chalk from 'chalk'

interface PriceDimension {
  pricePerUnit: {
    USD: string
  }
}

interface Term {
  priceDimensions: {
    [key: string]: PriceDimension
  }
}

interface PriceList {
  terms: {
    OnDemand: {
      [key: string]: Term
    }
  }
}

type PriceProps = {
  serviceCode:
    | 'AmazonEC2'
    | 'AmazonS3'
    | 'AmazonRDS'
    | 'AmazonLambda'
    | 'AmazonRoute53'
    | 'AmazonCloudFront'
    | 'AmazonRedshift'
    | 'AmazonSQS'
  instanceType: string | null
  region: string | null
  quantity: number | null
}

export class AwsPricingApi {
  private client: PricingClient

  constructor() {
    this.client = new PricingClient({ region: 'us-east-1' })
  }

  async getPrice({
    instanceType,
    region,
    serviceCode,
    quantity,
  }: PriceProps): Promise<number> {
    try {
      const filters: Array<Filter> = [
        {
          Type: 'TERM_MATCH',
          Field: 'regionCode',
          Value: region || 'us-east-1',
        },
      ]

      if (instanceType) {
        filters.push({
          Type: 'TERM_MATCH',
          Field: 'instanceType',
          Value: instanceType,
        })
      }

      if (serviceCode === 'AmazonEC2') {
        filters.push(
          {
            Type: 'TERM_MATCH',
            Field: 'operatingSystem',
            Value: 'Linux',
          },
          {
            Type: 'TERM_MATCH',
            Field: 'tenancy',
            Value: 'Shared',
          },
          {
            Type: 'TERM_MATCH',
            Field: 'usagetype',
            Value: `BoxUsage:${instanceType}`,
          },
          {
            Type: 'TERM_MATCH',
            Field: 'preInstalledSw',
            Value: 'NA',
          }
        )
      }

      const command = new GetProductsCommand({
        ServiceCode: serviceCode,
        Filters: filters,
        MaxResults: 100,
      })

      const response = await this.client.send(command)

      if (!response.PriceList || response.PriceList.length === 0) {
        return 0
      }

      const priceList = JSON.parse(response.PriceList[0]) as PriceList
      const terms = priceList.terms.OnDemand
      const priceDimension = Object.values(terms)[0].priceDimensions
      const price = Object.values(priceDimension)[0].pricePerUnit.USD

      const hoursInMonth = 730
      const totalPrice = parseFloat(price) * (quantity || 1) * hoursInMonth

      return totalPrice
    } catch (error) {
      console.error(
        chalk.red('Error getting price for', instanceType, region, error)
      )

      return 0
    }
  }
}
