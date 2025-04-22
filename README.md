# Crust

Crust – see your infrastructure plan exposed with clarity.

## Why "Crust"?

Crust is the outermost layer of the Earth, where everything visible happens — just like the terraform plan output: it shows what will change in your infrastructure, but in a raw, hard-to-read format.

The Crust CLI acts as a filter: it interprets this confusing surface and transforms it into something clear, explaining what will actually happen, directly in the layer that developers need to see.

Crust is a CLI tool that uses OpenAI to enhance the Terraform and Terragrunt experience by providing security analysis, cost analysis, and detailed plan explanations.

## Features

- **Security Analysis**: Uses OpenAI to identify potential security issues in Terraform plans
- **Cost Analysis**: Calculates AWS infrastructure costs using the AWS Pricing API
- **Plan Explanation**: Uses OpenAI to provide clear explanations of Terraform/Terragrunt plan outputs
- **Multi-language Support**: Explanations available in multiple languages
- **Colorized Output**: Beautifully formatted output with colors and emojis

## Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm
- Terraform or Terragrunt installed
- OpenAI API key

## Installation

```bash
# Install globally
npm install -g @typper-io/crust

# Or use with npx
npx @typper-io/crust
```

## Initial Setup

Before using Crust, you need to initialize it with your OpenAI API key:

```bash
crust init
```

This will create a configuration file at `~/.crust.json` with your settings.

## Usage

```bash
# Analyze security issues
crust security

# Analyze AWS costs
crust cost

# Explain Terraform plan
crust explain

# Run all analyses at once
crust all
```

## Configuration

Crust is configured through a global configuration file at `~/.crust.json`:

```json
{
  "openaiKey": "your-openai-api-key",
  "terraformPlanCommand": "terraform plan",
  "language": "en"
}
```

### Configuration Options

- `openaiKey`: Your OpenAI API key
- `terraformPlanCommand`: Command to execute terraform plan
- `language`: Language for explanations (e.g., "en", "pt-br")

## Output Format

Crust uses XML tags for colorized output:

- `<red>`, `<green>`, `<blue>`, `<yellow>`, `<purple>`, `<cyan>`, `<white>`
- `<bold>`, `<italic>`, `<underline>`, `<strikethrough>`

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/typper-io/crust.git

# Install dependencies
cd crust
pnpm install

# Build the project
pnpm build
```

## Contributing

Contributions are welcome! Please read our [contributing guide](CONTRIBUTING.md) before submitting a pull request.

## License

MIT
