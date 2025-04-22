Crust's security analysis feature uses OpenAI to analyze your Terraform infrastructure for potential security issues. This guide explains how to use and interpret the security analysis results.

## Running Security Analysis

To run security analysis:

```bash
crust security
```

This command will:

1. Run your Terraform plan
2. Use OpenAI to analyze security issues
3. Present findings with colorized output

## Output Format

The security analysis output uses XML tags for colorization:

```xml
<red>Critical Issue</red>
<yellow>Warning</yellow>
<green>Recommendation</green>
```

### Available Tags

- `<red>`: Critical security issues
- `<yellow>`: Security warnings
- `<green>`: Security recommendations
- `<bold>`: Important text
- `<italic>`: Additional context

## Example Output

```
Security Analysis Results:

<red>Critical: Publicly accessible S3 bucket</red>
<yellow>Warning: Missing encryption for EBS volumes</yellow>
<green>Recommendation: Enable versioning for S3 buckets</green>

<bold>Details:</bold>
<italic>Resource: aws_s3_bucket.example</italic>
<italic>Location: main.tf:42</italic>
```

## Common Security Issues

Crust looks for common security issues in your Terraform infrastructure:

1. **Public Access**

   - Publicly accessible S3 buckets
   - Open security groups
   - Publicly exposed services

2. **Encryption**

   - Missing encryption for EBS volumes
   - Unencrypted S3 buckets
   - Missing KMS keys

3. **IAM**

   - Overly permissive IAM policies
   - Missing MFA
   - Hardcoded credentials

4. **Networking**
   - Open ports
   - Missing VPC flow logs
   - Insecure network configurations

## Best Practices

1. **Run security analysis early**: Check for security issues before applying changes
2. **Review all findings**: Don't ignore warnings or recommendations
3. **Fix critical issues first**: Address critical security issues immediately
4. **Document exceptions**: If you can't fix an issue, document why
5. **Regular checks**: Run security analysis regularly, not just before deployments

## Integration with CI/CD

You can integrate security analysis into your CI/CD pipeline:

```yaml
steps:
  - name: Run Terraform Plan
    run: terraform plan -out=plan.tfplan

  - name: Run Security Analysis
    run: crust security
```

## Troubleshooting

If you encounter issues with security analysis:

1. **Check OpenAI API key**: Make sure your API key is valid
2. **Verify Terraform plan**: Ensure the plan command works correctly
3. **Check language setting**: Make sure your language is supported
4. **Review error messages**: Look for specific error messages in the output

## Types of Security Issues Detected

Crust can detect various types of security issues, including:

### 1. Access Control Issues

- Overly permissive IAM policies
- Publicly accessible resources
- Missing encryption

### 2. Network Security Issues

- Open security groups
- Exposed ports
- Missing network segmentation

### 3. Data Security Issues

- Unencrypted storage
- Missing backup policies
- Sensitive data exposure

### 4. Compliance Issues

- Missing tags
- Non-compliant resource configurations
- Regulatory violations

## Usage

### Basic Usage

```bash
crust security
```

## Best Practices

1. **Run security analysis early**: Include security analysis in your development workflow
2. **Review all findings**: Pay special attention to high-severity issues
3. **Use in CI/CD**: Integrate security analysis into your CI/CD pipeline
4. **Regular checks**: Run security analysis regularly, not just before deployments
