## Prerequisites

Before installing Crust, make sure you have:

- Node.js 18 or higher
- npm, yarn, or pnpm
- Terraform or Terragrunt installed
- OpenAI API key
- AWS credentials (for cost analysis)

## Installation Methods

### Global Installation (Recommended)

```bash
npm install -g @typper-io/crust
```

### Using npx

If you prefer not to install Crust globally, you can use npx:

```bash
npx @typper-io/crust
```

### From Source

If you want to contribute to Crust or need the latest features:

```bash
# Clone the repository
git clone https://github.com/typper-io/crust.git

# Install dependencies
cd crust
pnpm install

# Build the project
pnpm build

# Link the package globally
pnpm link --global
```

## Initial Configuration

After installation, you need to initialize Crust with your OpenAI API key:

```bash
crust init
```

This will:

1. Create a configuration file at `~/.crust.json`
2. Ask for your OpenAI API key
3. Ask for your preferred Terraform plan command
4. Ask for your preferred language

Example configuration file:

```json
{
  "openaiKey": "your-openai-api-key",
  "terraformPlanCommand": "terraform plan",
  "language": "en"
}
```

## Verification

After installation and configuration, verify that Crust is working:

```bash
crust --version
```
