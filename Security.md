# Security Notes

## Row Level Security (RLS)

RLS is intentionally disabled on all tables (`products`, `categories`, `cart_items`,
`orders`, `order_items`, `saved_items`, `profiles`) for this project.

This was a deliberate choice made early in development to keep the project simple
while learning Supabase, rather than an oversight. The Supabase anon/public API key
is used throughout, and no table currently restricts row access to `auth.uid()`.

**What this means in practice:** anyone with the public API key (visible in the
client-side JS) can technically read and write any row in any table, not just their
own. For a real production app, each table would need RLS policies restricting
reads/writes to the authenticated user's own rows — for example:

```sql
alter table cart_items enable row level security;

create policy "Users can only see their own cart"
on cart_items for select
using (auth.uid() = user_id);

create policy "Users can only insert their own cart items"
on cart_items for insert
with check (auth.uid() = user_id);
```

This project intentionally skips this step since it's a learning/portfolio build,
not a production deployment.