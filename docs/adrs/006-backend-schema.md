**Status:** Accepted

## **Context**

We need a backend schema for an expense tracker app that supports:

- Multi-account management (cash, Payoneer, Binance, etc.)
- Multi-currency transactions (USD, ETB, EUR, …)
- Transfers (with possible service charges/fees)
- Categorization of expenses (with categories + subcategories, user-defined)
- Savings functionality (money moves between accounts, not separate "goals")
- Changing base currency over time (e.g., user moves countries)
- Reporting and aggregation with exchange rates (no external API, rates come from user transactions themselves).

## **Decision**

1. **Users & Accounts**
   - Each user can have multiple accounts, each account is tied to a currency.
   - Savings are modeled as a normal account; transferring money in/out represents saving or withdrawing.
2. **Transactions**
   - Every transaction is stored in the **account’s native currency**.
   - Fields: type (`income | expense | transfer`), amount, currency, account, optional category, timestamp, etc.
   - Transfers link two accounts; if fees exist, they are logged as separate expenses (cleanest option).
3. **Categories**
   - Categories and subcategories are **user-created**, not system-predefined.
   - Implemented as a self-referencing table (parent_id for subcategories).
   - Every expense must have a category (enforced in schema or validation).
4. **Multi-Currency Handling**
   - Transactions store the original currency.
   - The user profile stores a `default_reporting_currency`.
   - Reporting applies **user-recorded exchange rates** to normalize transactions.
   - Exchange rates are stored per transaction (for accurate history) and optionally aggregated monthly.
5. **Transfers with Service Fees**
   - Transfers deduct the full amount from source, add net amount to destination.
   - Service fees are logged as separate expense transactions in the source account with category “Fees/Bank Charges.”
6. **Changing Base Currency**
   - Base (reporting) currency is not hard-coded; users can update their default_reporting_currency anytime.
   - Past data remains in original currencies, only reporting conversions change.
   - This ensures no data rewriting is required when relocating.

## **Consequences**

- ✅ Scales well to multi-currency, multi-account scenarios.
- ✅ Clear accounting treatment of fees and transfers.
- ✅ Flexible category design (no need to predict user categories upfront).
- ✅ Reporting remains accurate over time even if base currency changes.
- ❌ Slightly more work for backend (must handle conversion + linking transfers).
- ❌ Users must input exchange rates at transaction time (no auto-fetch from API yet).

# Text based ERD (Entity Relationship Diagram)

[Users]

- id (PK)
- name
- default_reporting_currency (ISO code)

[Accounts]

- id (PK)
- user_id (FK → [Users.id](http://users.id/))
- name (Cash, Payoneer, Binance, Savings, etc.)
- currency (ISO code)

[Categories]

- id (PK)
- user_id (FK → [Users.id](http://users.id/))
- name (e.g., Food, Transport, Fees)
- parent_id (nullable, FK → [Categories.id](http://categories.id/)) // for subcategories

[Transactions]

- id (PK)
- user_id (FK → [Users.id](http://users.id/))
- account_id (FK → [Accounts.id](http://accounts.id/))
- type (ENUM: income | expense | transfer)
- amount (numeric)
- currency (ISO code)
- category_id (nullable, FK → [Categories.id](http://categories.id/)) // null if transfer
- linked_account_id (nullable, FK → [Accounts.id](http://accounts.id/)) // for transfer target
- exchange_rate (nullable numeric) // used if conversion occurred
- timestamp (datetime)
- note (text)

[ExchangeRates] // optional, if we want monthly averages

- id (PK)
- user_id (FK → [Users.id](http://users.id/))
- from_currency
- to_currency
- rate
- month_year

# Supabase Migration

```sql
-- Users are handled by Supabase Auth (auth.users table).
-- We’ll use user_id = auth.uid() for RLS.

-- Accounts Table
CREATE TABLE accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  currency text NOT NULL, -- e.g., USD, EUR, ETB
  provider text, -- e.g., Payoneer, Binance, Cash
  created_at timestamptz DEFAULT now()
);

-- Categories Table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  parent_id uuid REFERENCES categories(id) ON DELETE SET NULL, -- for subcategories
  created_at timestamptz DEFAULT now()
);

-- Transactions Table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id uuid REFERENCES accounts(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  type text CHECK (type IN ('income','expense','transfer','fee')) NOT NULL,
  amount numeric(12,2) NOT NULL,
  currency text NOT NULL, -- original currency of transaction
  exchange_rate numeric(12,4), -- rate at transaction time
  note text,
  created_at timestamptz DEFAULT now()
);

-- Exchange Rates Table
CREATE TABLE exchange_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  from_currency text NOT NULL,
  to_currency text NOT NULL,
  rate numeric(12,4) NOT NULL,
  effective_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- RLS (Row Level Security)
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;

-- Policy Example (accounts)
CREATE POLICY "Users can manage their accounts"
  ON accounts
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

```
