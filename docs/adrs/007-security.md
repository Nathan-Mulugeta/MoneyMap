**Status:** Accepted

## **Context**

The app will store sensitive financial data (transactions, accounts, balances, categories, etc.) and must be designed with **data privacy, integrity, and least-privilege access** in mind.

We are using **Supabase** as our backend (Postgres + APIs + auth). The app will run on mobile (via Expo) and web. Security concerns exist both on the **backend (serverless DB)** and the **client (device)**.

## **Decision**

1. **Supabase Row-Level Security (RLS)**
   - All tables (Users, Accounts, Transactions, Categories, ExchangeRates) will enforce **RLS policies**.
   - Each record includes `user_id`, and RLS ensures users can only query/update their own data.
   - Example policy:

     ```sql
     create policy "Users can only access their own rows"
     on transactions
     for all
     using (auth.uid() = user_id);

     ```

   - Default: deny-all, explicitly grant access via RLS.

2. **Secure Client-Side Storage**
   - Access tokens, refresh tokens, and session keys will **never be stored in AsyncStorage**.
   - Instead:
     - iOS → Secure **Keychain**
     - Android → **Keystore**
   - Supabase client SDK will be configured to retrieve tokens only from secure storage.
3. **Edge Functions for Sensitive Operations**
   - Certain logic will not run in the client for **security or consistency reasons**:
     - **Currency conversion aggregation** (using stored exchange rates).
     - **Future NLP or AI features** (e.g., parsing expense descriptions into categories).
     - **Any data enrichment requiring privileged DB access**.
   - Edge Functions ensure these operations run **server-side, with least-privilege service role keys**, keeping logic centralized and tamper-resistant.
4. **Other Security Considerations (early commitments)**
   - **Encryption in transit**: TLS 1.3 for all API traffic.
   - **Encryption at rest**: Supabase/Postgres defaults with AES-256.
   - **Role-based access**: Only the service role can bypass RLS (never exposed to clients).
   - **Auditability**: Future decision to log all write actions (transactions, transfers) for rollback and transparency.

## **Consequences**

- ✅ Strong data isolation (multi-tenant security ensured by RLS).
- ✅ No risk of token leakage from insecure client storage.
- ✅ Centralized sensitive ops → easier to update, harder to tamper with.
- ❌ Requires careful RLS testing; misconfigured policies can break app functionality.
- ❌ Slight latency overhead when routing via Edge Functions.
