This guide will help you get started with Crust and show you how to use its main features.

## Initial Setup

First, you need to initialize Crust with your OpenAI API key:

```bash
crust init
```

This will create a configuration file at `~/.crust.json` with your settings.

## Basic Usage

Crust provides three main commands for analyzing your Terraform infrastructure:

### 1. Security Analysis

To analyze your infrastructure for security issues:

```bash
crust security
```

This will:

- Run your Terraform plan
- Use OpenAI to analyze the output for security issues
- Present the findings with colorized output and emojis

### 2. Cost Analysis

To analyze the cost of your AWS infrastructure changes:

```bash
crust cost
```

This will:

- Run your Terraform plan
- Use AWS Pricing API to calculate costs
- Show a comparison with your current infrastructure
- Present the results in a formatted table

### 3. Plan Explanation

To get a clear explanation of your Terraform plan:

```bash
crust explain
```

This will:

- Run your Terraform plan
- Use OpenAI to generate a clear explanation
- Present the explanation in your configured language
- Include tips and recommendations

### Running All Analyses

You can run all analyses at once with:

```bash
crust all
```

This will execute the Terraform plan once and run all three analyses on the output.

## Output Format

Crust uses XML tags for colorized output. The valid tags are:

- Colors: `<red>`, `<green>`, `<blue>`, `<yellow>`, `<purple>`, `<cyan>`, `<white>`
- Formatting: `<bold>`, `<italic>`, `<underline>`, `<strikethrough>`

## Best Practices

1. **Run analyses early**: Include Crust in your development workflow
2. **Review all findings**: Pay attention to security issues and cost changes
3. **Use in CI/CD**: Integrate Crust into your CI/CD pipeline
4. **Keep configuration updated**: Update your OpenAI API key when needed
