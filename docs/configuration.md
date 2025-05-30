Crust is configured through a global configuration file at `~/.crust.json`. This guide explains all available configuration options.

## Configuration File

The configuration file is created when you run `crust init`. Here's an example of a complete configuration:

```json
{
  "openaiKey": "your-openai-api-key",
  "terraformPlanCommand": "terraform plan",
  "language": "en"
}
```

## Configuration Options

### `openaiKey`

Your OpenAI API key. This is required for security analysis and plan explanation. Can be overridden with the `--openai-api-key` command line option.

### `terraformPlanCommand`

The command used to generate the Terraform plan. This command should output the plan to stdout. Can be overridden with the `--terraform-plan-command` command line option.

### `language`

The language for plan explanations. All languages are available. Can be overridden with the `--language` command line option.

## Command Line Options

All configuration options can be overridden using command line options:

```bash
# Override OpenAI API key
crust security --openai-api-key your-key-here

# Override language
crust explain --language pt-br

# Override Terraform plan command
crust all --terraform-plan-command "terraform plan -out=plan.tfplan"
```

These options take precedence over the global configuration file.

## Initial Configuration

To create or update your configuration:

```bash
crust init
```

This will:

1. Create or update the configuration file
2. Ask for your OpenAI API key
3. Ask for your preferred Terraform plan command
4. Ask for your preferred language

## Best Practices

1. **Keep your OpenAI API key secure**: Don't share your configuration file
2. **Use appropriate Terraform plan command**: Make sure it outputs to stdout
3. **Choose your preferred language**: Select the language you're most comfortable with

## Example Configurations

### Basic Configuration

```json
{
  "openaiKey": "your-openai-api-key",
  "terraformPlanCommand": "terraform plan",
  "language": "en"
}
```

## Global Configuration

Crust can be configured globally through a configuration file.

### Configuration File

The default configuration file is located at `~/.crust/config.json`.

Example configuration:

```json
{
  "openaiKey": "your-key-here",
  "terraformPlanCommand": "terraform plan",
  "language": "en"
}
```
