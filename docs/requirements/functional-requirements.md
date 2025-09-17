# Functional & Non-Functional Requirements

## 1. Functional Requirements (FR)

- **FR1:** Log a transaction with amount, currency, category, subcategory, note, and timestamp.
- **FR2:** Search by category, subcategory, or text in notes.
- **FR3:** Provide an Android widget for one-tap expense entry.
- **FR4:** Parse natural language inputs (e.g., "Groceries 300 USD").
- **FR5:** Handle multiple currencies with monthly average FX rates.
- **FR6:** Provide monthly summaries (income vs. expenses).
- **FR7:** Allow budget setting and tracking by category/subcategory.
- **FR8:** Support receipt capture and parsing.
- **FR9:** Provide a savings tracker with goal-setting and progress updates.
- **FR10:** Allow offline logging and automatic sync when online.
- **FR11:** Track debts and loans with repayment status.
- **FR12:** Multi-language support for UI and data labels (future).
- **FR13:** Export transactions to Excel.

---

## 2. Non-Functional Requirements (NFR)

- **Performance:**
  - Logging ≤ 2 seconds (4G).
  - Search ≤ 1 second for 10,000+ transactions.
- **Offline Capability:** 100% offline-logged data must sync successfully.
- **Security:** TLS 1.3 (in transit), AES-256 (at rest), role-based auth.
- **Maintainability:** Monorepo with configs, CI/CD with automated checks.
- **Reliability:** Data persistence across crashes/restarts.
- **Usability:** ≤ 3 taps for common transaction flows.
- **Localization:** Translation externalized to resource files.
- **Scalability:** Up to 50k transactions per user without degradation.
