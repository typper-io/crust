Crust provides several commands to help you analyze and understand your Terraform infrastructure. Here's a complete list of available commands:

## Main Commands

### `crust init`

Initializes Crust by creating a configuration file at `~/.crust.json`.

```bash
crust init
```

This command will ask for:

- OpenAI API key
- Terraform plan command
- Preferred language

### `crust security`

Analyzes your Terraform infrastructure for potential security issues using OpenAI.

```bash
crust security
```

This command will:

- Run your Terraform plan
- Use OpenAI to analyze security issues
- Present findings with colorized output

### `crust cost`

Analyzes the cost of your AWS infrastructure changes using the AWS Pricing API.

```bash
crust cost
```

This command will:

- Run your Terraform plan
- Calculate costs using AWS Pricing API
- Show cost comparisons
- Present results in a formatted table

### `crust explain`

Provides a clear explanation of your Terraform plan using OpenAI.

```bash
crust explain
```

This command will:

- Run your Terraform plan
- Generate a clear explanation in your configured language
- Include tips and recommendations

### `crust all`

Runs all analyses (security, cost, and explanation) at once.

```bash
crust all
```

This command will:

- Run the Terraform plan once
- Execute all three analyses on the output
- Present all results together

## Global Options

All commands support the following global options:

- `--help`: Show help for the command
- `--version`: Show version information

## Examples

### Basic Usage

```bash
# Initialize Crust
crust init

# Run security analysis
crust security

# Run cost analysis
crust cost

# Get plan explanation
crust explain

# Run all analyses
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

See the [Configuration Guide](/docs/configuration.md) for more details.
