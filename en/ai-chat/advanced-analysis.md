# Advanced Analysis Overview

Semantix includes built-in advanced analytical models that go beyond standard SQL queries.

## Available Analysis Types

| Type | Best For |
|------|----------|
| [Cohort Analysis](cohort.md) | Retention, lifetime value by acquisition period |
| [RFM Analysis](rfm.md) | Customer segmentation by behavior |
| [Funnel Analysis](funnel.md) | Conversion tracking across steps |
| **Growth Analysis** | Period-over-period growth rates |
| **Vintage Analysis** | Portfolio performance by origination cohort |
| **Pareto Analysis** | 80/20 distribution of customers or products |

## Where to Find Them

Advanced analyses are configured at the **Context level**:

1. Go to **Admin → Contexts → [Your Context]**
2. Click the **Advanced Analysis tab**
3. Click **Add** and choose the analysis type

Once configured, users can access the analysis from the **Analysis** page by selecting the context and switching to the relevant tab.

## Customizing SQL Templates

Each analysis type has a default SQL template. Advanced users can customize these templates:

1. Go to **Admin → System Settings**
2. Find the template for your analysis type (e.g. `TEMPLATE_SQL_COHORT`)
3. Edit the SQL template

> ⚠️ Only modify templates if you understand the expected input/output format. Incorrect templates will cause analysis to fail.
