# Nova Market

> Considered goods for a quieter kind of home — a full-stack e-commerce storefront with auth, cart, and checkout.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

## Demo

🔗 **Live demo:** [e-commerce-user-ten.vercel.app](https://e-commerce-user-ten.vercel.app/)


## Overview

Nova Market is a full e-commerce storefront built from scratch — not just a static product catalog, but a working shopping experience with real user accounts and a real database behind it. Shoppers can browse products by category, view detailed product pages, manage a persistent cart, check out, and create/manage an account, all backed by Supabase for authentication, data storage, and product images.

## Features

- 🛍️ Browse products by category
- 📄 Individual product detail pages
- 🛒 Persistent shopping cart with running total
- 💳 Checkout flow
- 🔐 User authentication (sign up / sign in) via Supabase Auth
- 👤 User profile management
- 📧 Newsletter signup on the homepage
- 📱 Responsive, minimal storefront design

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS v4 |
| Interactivity | JavaScript (vanilla) |
| Backend | Supabase (Auth, Database, Storage) |
| Hosting | Vercel |

## Project Structure

```
E-commerce-User-/
├── index.html          # Homepage
├── index.js
├── categories.html      # Category browsing
├── categories.js
├── product.html         # Product detail page
├── product.js
├── cart.html             # Shopping cart
├── cart.js
├── checkout.html         # Checkout flow
├── checkout.js
├── login.html             # Sign in
├── login.js
├── signup.html            # Sign up
├── signup.js
├── Profile.html            # User profile
├── profile.js
└── lifestyle-photo.svg
```

## Getting Started

### Prerequisites

- A [Supabase](https://supabase.com/) account and project
- A static file server (or just open the files directly in a browser)

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/hamza-stack404/E-commerce-User-.git
   cd E-commerce-User-
   ```

2. Set up your Supabase project:
   - Create a new project at [supabase.com](https://supabase.com/)
   - Set up tables for products, users/profiles, cart items, and orders as needed
   - Create a **Storage bucket** (e.g. `product-images`) for product photos
   - Enable **Email/Password Auth** under Authentication settings

3. Add your Supabase project URL and public anon key to the JS files (`login.js`, `signup.js`, etc.) wherever the Supabase client is initialized.

4. Serve the project locally, for example with VS Code's Live Server extension, or:
   ```bash
   npx serve .
   ```

5. Open `index.html` in your browser.

## Usage

- Visit the homepage to browse featured and new arrivals
- Use **Categories** to filter products by type
- Click into any product to view details and add it to your cart
- Go to **Cart** to review items and proceed to **Checkout**
- **Sign Up** to create an account, or **Sign In** if you already have one
- Manage your account from the **Profile** page

## What I Learned

- Integrating Supabase Auth and the database into a vanilla JavaScript app without a framework managing state for you — keeping session state, cart data, and product records in sync across independent HTML pages took real trial and error.
- Structuring a multi-page site so shared logic (cart totals, auth checks) stays consistent without duplicating code everywhere.
- Working with Supabase Storage to serve product images dynamically instead of hardcoding asset paths.

## Future Improvements

- ⚠️ **Enable Row Level Security (RLS) policies** in Supabase — currently disabled during development and should be locked down before any real production use.
- Add order history to the user profile page
- Add product search
- Add payment gateway integration (e.g. Stripe) for real checkout
- Add form validation and error states across login/signup/checkout

## License

*No license specified yet —*
