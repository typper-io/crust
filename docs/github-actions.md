# GitHub Actions Integration

Crust can be easily integrated into your GitHub Actions workflow to automatically analyze your Terraform PRs. This section explains how to set up this integration.

## Overview

The GitHub Actions integration allows you to:

- Run security analysis automatically on each PR
- Calculate infrastructure costs for proposed changes
- Get clear explanations of changes in the PR
- Receive automatic comments with the results

## Basic Setup

To get started, create a `.github/workflows/crust-analysis.yml` file in your repository:

```yaml
name: Crust Analysis

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  analyze:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
      contents: read
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Run Crust Analysis
        id: crust
        run: |
          # Install Crust globally
          npm install -g @typper-io/crust

          # Run analysis and capture output
          OUTPUT=$(crust all --openai-api-key "${{ secrets.OPENAI_API_KEY }}" --terraform-plan-command "terraform plan")

          # Set output as environment variable
          echo "CRUST_OUTPUT<<EOF" >> $GITHUB_ENV
          echo "$OUTPUT" >> $GITHUB_ENV
          echo "EOF" >> $GITHUB_ENV

      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            try {
              github.rest.issues.createComment({
                issue_number: context.issue.number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                body: `## 🧐 Crust Analysis Results\n\n\`\`\`\n${process.env.CRUST_OUTPUT}\n\`\`\``
              });
            } catch (error) {
              console.error('Error creating comment:', error);
              throw error;
            }
```

## Required Permissions

The workflow requires the following permissions for the `GITHUB_TOKEN`:

- `pull-requests: write`: Required to create comments on pull requests
- `contents: read`: Required to read repository contents

These permissions are defined in the `permissions` block at the job level:

```yaml
permissions:
  pull-requests: write
  contents: read
```

## Required Configuration

The following options are required for all Crust commands:

- `--openai-api-key`: Your OpenAI API key
- `--terraform-plan-command`: The command to execute terraform plan

The following options are optional:

- `--language`: Language for the analysis (defaults to "en")

## Secrets Configuration

You'll need to configure the following secrets in your repository:

1. `OPENAI_API_KEY`: Your OpenAI API key
2. `GITHUB_TOKEN`: This is automatically provided by GitHub Actions

To configure the secrets:

1. Go to your repository settings
2. Navigate to "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add each secret with its corresponding value

## Customization

You can customize the workflow in several ways:

### Selective Analysis

To run only specific analyses:

```yaml
- name: Run Crust Analysis
  run: |
    npm install -g @typper-io/crust
    crust security --openai-api-key "${{ secrets.OPENAI_API_KEY }}" --terraform-plan-command "terraform plan"  # Security analysis only
    # or
    crust cost --openai-api-key "${{ secrets.OPENAI_API_KEY }}" --terraform-plan-command "terraform plan"     # Cost analysis only
    # or
    crust explain --openai-api-key "${{ secrets.OPENAI_API_KEY }}" --terraform-plan-command "terraform plan"  # Plan explanation only
```

### Language Configuration

To set the analysis language (optional):

```yaml
- name: Run Crust Analysis
  run: |
    npm install -g @typper-io/crust
    crust all --openai-api-key "${{ secrets.OPENAI_API_KEY }}" --terraform-plan-command "terraform plan" --language en
```

### Custom Terraform Command

To use a specific Terraform command:

```yaml
- name: Run Crust Analysis
  run: |
    npm install -g @typper-io/crust
    crust all --openai-api-key "${{ secrets.OPENAI_API_KEY }}" --terraform-plan-command "terraform plan -out=plan.tfplan"
```

## Best Practices

1. **Run on PRs**: Configure to run on PRs for early feedback
2. **Use secrets**: Never expose your API keys in code
3. **Customize format**: Adjust comment format as needed
4. **Monitor costs**: Remember that each run uses OpenAI tokens
5. **Set minimal permissions**: Only grant the permissions needed for the workflow to function
6. **Use command options**: Always pass configuration via command options (--option) rather than environment variables
7. **Always provide required options**: Make sure to include both `--openai-api-key` and `--terraform-plan-command` in all commands

## Example Output

The PR comment will have this format:

```markdown
## 🧐 Crust Analysis Results

[Security analysis results]
[Cost analysis results]
[Plan explanation]
```

## Troubleshooting

If you encounter issues:

1. Check GitHub Actions logs
2. Verify secrets are configured correctly
3. Ensure Terraform command is working
4. Confirm OpenAI key is valid
5. Verify GITHUB_TOKEN permissions are set correctly
6. Make sure you're using command options (--option) instead of environment variables
7. Verify that both required options (`--openai-api-key` and `--terraform-plan-command`) are provided
8. If using a container, verify it has all required dependencies
9. Check if Node.js and npm are properly installed
10. Verify that the environment has access to all required resources
