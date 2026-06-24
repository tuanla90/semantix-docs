# Tags

**Navigation:** Admin → Access → Tags

Tags are classification labels for resources in the system — helping you organize, filter, and quickly search as the number of Pipelines, Data Templates, AI Assistants, and Models grows.

---

## Resources That Support Tags

Tags can be assigned to:
- Data Pipelines
- Data Templates
- AI Assistants
- Data Models
- Connections

---

## Tag Usage Examples

| Tag | Applied To | Purpose |
|-----|------------|---------|
| `sales` | Sales-related Pipelines, Templates, Assistants | Quick filter for the Sales team's resources |
| `finance` | Finance Models and Templates | Group resources for the Finance team |
| `production` | Live Connections and Pipelines | Distinguish production from staging |
| `deprecated` | Unused Templates/Pipelines | Mark items for deletion |
| `high-priority` | Critical Pipelines | Prioritize for monitoring |

---

## Creating a New Tag

1. Go to **Admin → Access → Tags → New Tag**
2. Fill in:
   - **Name**: Tag name (slug, no spaces, use `-` instead): `sales`, `high-priority`
   - **Color**: Label color for quick visual identification
   - **Description**: Explains the purpose of this tag
3. Click **Save**

---

## Assigning Tags to Resources

Tags can be assigned when creating or editing a resource:

1. Open the create/edit form for a resource (Pipeline, Template, Assistant...)
2. Find the **Tags** field (usually near the bottom of the form)
3. Type a tag name or select from the dropdown
4. Click **Save**

A single resource can have **multiple tags** at the same time.

---

## Filtering by Tag

On list pages (Pipelines, Templates, Assistants...):
1. Click the **Tags** filter in the search bar
2. Select one or more tags
3. The list automatically filters to show only resources with those tags

---

## Managing Tags

The **Admin → Access → Tags** page shows:
- List of all tags
- Number of resources currently using each tag
- **Edit** option (rename, change color, update description)
- **Delete** option (only available when no resources are using the tag)

---

## Best Practices

- **Less is more**: 10-20 clear tags is better than 100 overlapping ones
- **Be consistent**: Use the same naming convention (`sales`, not `Sales`, `SALES`, `sale`)
- **By department**: Create a tag for each major team or business unit
- **By environment**: `production`, `staging`, `dev` helps distinguish live from test resources
- **Lifecycle tags**: `active`, `deprecated`, `archive` helps manage the resource lifecycle
