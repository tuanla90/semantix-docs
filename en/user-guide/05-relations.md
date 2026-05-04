# 5. Defining Relations

Relations allow the AI to automatically `JOIN` tables together when necessary, completely eliminating the need for users to write complex SQL joins themselves.

**Navigation:** Admin → Models → select a Model → **Relations** tab → **Add Relation**

## Types of Relations

| Type | Example |
|------|---------|
| **One-to-Many (1:N)** | 1 Order → N Order Details |
| **Many-to-One (N:1)** | N Orders → 1 Customer |
| **Many-to-Many (N:N)** | Handled via a junction/mapping table |

## Configuring a Relation

When creating a new relation, you specify how the current model links to another model:

| Property | Example Configuration |
|----------|-----------------------|
| **Source Model** | `orders` (the current model) |
| **Source Column** | `customer_id` (the foreign key) |
| **Target Model** | `customers` (the model you are joining to) |
| **Target Column** | `id` (the primary key of the target model) |
| **Join Type** | `LEFT JOIN` (recommended for most analytical queries) or `INNER JOIN` |

> **How it works:** After defining this relation, if a user asks for *"total revenue by customer city"*, the AI knows exactly how to automatically `JOIN` the `orders` table with the `customers` table to fetch the address dimension without any manual intervention.
