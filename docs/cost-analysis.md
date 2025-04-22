Crust uses OpenAI to analyze your Terraform infrastructure and identify cost optimization opportunities.

## How It Works

When you run `crust cost`, Crust will:

1. Execute your Terraform plan
2. Analyze infrastructure costs
3. Compare with current infrastructure
4. Present results in a clear and formatted way

## Cost Analysis Features

### 1. Resource Cost Calculation

- Individual costs per resource
- Monthly and annual projections
- Service breakdown

### 2. Change Impact Analysis

- Cost changes relative to current state
- New resource costs
- Savings from removed resources

### 3. Cost Optimization

- Identification of potential savings
- Suggestions for cost-effective alternatives
- Highlighting of expensive resources

## Usage

### Basic Usage

```bash
crust cost
```

### Advanced Usage

```bash
# Show detailed analysis
crust cost --verbose

# Output in JSON format
crust cost --format json
```

## Output Format

### Table Format (Default)

```
Cost Analysis Results
====================

Resource Type     Monthly Cost  Change   Description
---------------  ------------  -------  -------------------------
aws_ec2_instance $100.00       +$50.00  t3.large instance
aws_s3_bucket    $10.00        -$5.00   standard storage
aws_rds_instance $200.00       +$100.00 db.t3.large instance

Total Monthly Cost: $310.00 (+$145.00)
```

## Best Practices

1. **Run cost analysis early**: Include cost analysis in your development workflow
2. **Review significant changes**: Pay attention to large cost increases
3. **Use in CI/CD**: Integrate cost analysis into your CI/CD pipeline
4. **Regular checks**: Run cost analysis regularly to track expenses

## Cost Optimization Tips

1. **Right-sizing**: Use appropriate instance types
2. **Use reserved instances**: For predictable workloads
3. **Implement auto-scaling**: Scale resources based on demand
4. **Monitor unused resources**: Clean up unused resources regularly
