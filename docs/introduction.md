# Crust

Crust – see your infrastructure plan exposed with clarity.

## Why "Crust"?

Crust is the outermost layer of the Earth, where everything visible happens — just like the terraform plan output: it shows what will change in your infrastructure, but in a raw, hard-to-read format.

The Crust CLI acts as a filter: it interprets this confusing surface and transforms it into something clear, explaining what will actually happen, directly in the layer that developers need to see.

Crust is a CLI tool that uses OpenAI to enhance your Terraform and Terragrunt workflow. It provides three main features:

1. **Security Analysis**: Uses OpenAI to analyze your Terraform plans for potential security issues, providing clear explanations and recommendations.

2. **Cost Analysis**: Calculates the cost of your AWS infrastructure changes using the AWS Pricing API, showing detailed cost breakdowns and comparisons.

3. **Plan Explanation**: Uses OpenAI to provide clear, human-readable explanations of your Terraform/Terragrunt plan outputs in your preferred language.

## Key Features

- **OpenAI Integration**: Leverages GPT-4 for intelligent analysis and explanations
- **AWS Cost Analysis**: Detailed cost calculations using AWS Pricing API
- **Multi-language Support**: Explanations available in multiple languages
- **Colorized Output**: Beautifully formatted output with colors and emojis
- **Easy Setup**: Simple configuration with OpenAI API key

## How It Works

Crust works by:

1. Executing your Terraform plan
2. Analyzing the output using OpenAI
3. Calculating costs using AWS Pricing API
4. Presenting the results in a clear, formatted way

## Prerequisites

Before using Crust, you'll need:

- Node.js 18 or higher
- Terraform or Terragrunt installed
- An OpenAI API key
- AWS credentials (for cost analysis)

## Getting Started

To get started with Crust:

1. Install the CLI
2. Run `crust init` to configure your OpenAI API key
3. Start using the commands

Check out our [Installation Guide](/docs/installation.md) and [Getting Started Guide](/docs/getting-started.md) for more details.
