Crust's plan explanation feature uses AI to provide clear, human-readable explanations of your Terraform plan outputs, making it easier to understand complex infrastructure changes.

## How It Works

When you run `crust explain`, Crust will:

1. Execute your Terraform plan
2. Analyze the plan output
3. Generate a clear explanation of the changes
4. Present the explanation in a readable format

## Explanation Features

### 1. Change Summarization

- Clear descriptions of what's changing
- Impact assessment of changes
- Resource-level explanations

### 2. Contextual Understanding

- Related resource changes
- Dependencies between changes
- Impact on existing infrastructure

### 3. Best Practices

- Suggestions for improvements
- Potential issues to watch for
- Alternative approaches

## Usage

### Basic Usage

```bash
crust explain
```

### Advanced Usage

```bash
# Show detailed explanation
crust explain --verbose
```

## Output Format

### Table Format (Default)

```
Plan Explanation
===============

Resource Type     Change Type  Description
---------------  -----------  -------------------------
aws_ec2_instance Create       Creating t3.large instance for web server
aws_s3_bucket    Update       Updating bucket policy to restrict access
aws_rds_instance Delete       Removing old database instance

Summary:
- Creating new web server instance
- Updating S3 bucket security
- Removing unused database
```

## Best Practices

1. **Review explanations carefully**: Make sure you understand all changes
2. **Use in team reviews**: Share explanations with team members
3. **Check for warnings**: Pay attention to any warnings or suggestions
4. **Combine with other analyses**: Use alongside security and cost analysis

## Tips for Better Explanations

1. **Keep plans focused**: Make smaller, focused changes for clearer explanations
2. **Use meaningful names**: Use descriptive resource names
3. **Document changes**: Add comments to your Terraform code
4. **Review regularly**: Run explanations regularly during development
