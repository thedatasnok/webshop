# Brainstorming

## Layout

- Landing page
  - Hero
  - Featured products (products on sale? trending or new?)
  - Product categories (cards with icons representing the category?)
  - Testimonials (maybe?)
  - Disclaimer (not a real webshop)
  - Footer

- Product browser
  - Filter by category
  - Filter by price (range slider, min/max, discounted?)

- Product page

- Order history

- Shopping cart


## Functionality

- Different variants of a product linked together
  - Colors
  - Sizes
  - Other specifications

- Search function
  - By product name
  - By product category? (maybe through filtering instead?)
  - Full text search powered by Postgres? (accomplished by populating a search token column)

- User authentication
  - Login & registration (should a user be logged in directly, or should they be redirected to a login page after registering?)
  - Emailing (maybe? events should be used to trigger emails in case we implement this)
    - Verification (is it really your email?)
    - Password reset
    - Order confirmation

- Product reviews
  - Rating
  - Comment

- Admin panel (extra feature - not mandatory but a nice-to-have)
  - Editing products
  - Editing pricing
  - View orders etc.
  - View registered users

- Soft deletion (extra feature - not mandatory but a nice-to-have)
  - Products
  - Users
  - Orders

**Note:** Soft deletion is probably required in a real-word scenario as for instance orders should be retained for economical reasons. 

