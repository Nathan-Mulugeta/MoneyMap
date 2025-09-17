## User Stories & Acceptance Criteria

### Story 1: Quick Transaction Logging

- **User Story:** As a user, I want to quickly log a transaction, so that I can capture spending without friction.
- **Acceptance Criteria:**
  1. Given the user enters fills out the amount, category and subcategory then the system saves amount=50, currency=ETB (default currency), category=Eating Out, Subcategory=Solo note=Coffee.
  2. Given no internet, when the user logs a transaction, then it is saved locally and synced later.

---

### Story 2: Search Transactions

- **User Story:** As a user, I want to search transactions by category, subcategory, or note, so that I can find past spending quickly.
- **Acceptance Criteria:**
  1. Given transactions exist, when searching “Food,” then all expenses with the category or subcategory or notes with “Food” are shown.
  2. Given transactions exist, when searching “rent,” then all with “rent” in the note/category/subcategory are displayed.

---

### Story 3: Android Widget Logging

- **User Story:** As an Android user, I want to log transactions directly from a widget, so that I don’t need to open the app.
- **Acceptance Criteria:**
  1. Given the widget is setup on the home screen, when the user taps on a pre setup widget with the taxi sub category a prompt to enter amount shows up and after the user enters the amount the system stores it correctly, with the right category, sub category and amount.
  2. Given offline mode, when logging, then the expense is queued and synced later.

---

### Story 4: NLP Parsing

- **User Story:** As a user, I want to enter expenses naturally, so that I don’t have to fill in each field.
- **Acceptance Criteria:**
  1. “Groceries 300 USD” → amount=300, currency=USD, category=Groceries.
  2. “Paid rent 5000 ETB” → category=Housing, amount=5000, currency=ETB.

---

### Story 5: Multi-Currency Aggregation

- **User Story:** As a traveler, I want all expenses converted to my base currency, so that I can track real totals.
- **Acceptance Criteria:**
  1. Given base currency=USD, when entering “500 JPY,” then USD equivalent is displayed.
  2. Conversion works if offline too as the rates are determined from previous conversion history.

---

### Story 6: Monthly Summary

- **User Story:** As a user, I want to view monthly totals in a collapsible component, so that I can see income vs expenses as well as a percentage comparison with the last period.
- **Acceptance Criteria:**
  1. Given transactions in a month, when viewing summary, then totals per category are displayed.
  2. Given no transactions, then “No data” is shown.

---

### Story 7: Budget Tracking

- **User Story:** As a user, I want to set category and sub category budgets for every month, so that I can see when I overspend.
- **Acceptance Criteria:**
  1. Given a monthly food budget of $200, when expenses exceed it, then a warning is displayed.
  2. Given budgets across categories and sub categories, when viewing summary, then budget vs actual is displayed.

---

### Story 8: Receipt Parsing

- **User Story:** As a user, I want to upload/capture receipts, so that transactions auto-populate.
- **Acceptance Criteria:**
  1. Given a valid receipt image, when uploaded, then key fields (amount, category, date) are parsed into a transaction draft.
  2. Given an unreadable receipt, then the user is prompted to edit manually.

---

### Story 9: Savings Tracking

- **User Story:** As a user, I want to track savings goals, so that I can monitor progress.
- **Acceptance Criteria:**
  1. Given a goal of $1000, when balance reaches $500, then 50% progress is shown.
  2. Given multiple goals, when tracking, then each goal has its own progress meter.

---

### Story 10: Debt/Loan Tracking

- **User Story:** As a user, I want to track debts and loans, so that I know what I owe and what’s owed to me.
- **Acceptance Criteria:**
  1. Given I log a debt of $200 to John, when viewing debts, then “Owe John $200” is shown.
  2. Given repayment is marked, then balance updates accordingly.

---

### Story 11: Multi-Language (Future)

- **User Story:** As a non-English speaker, I want to use the app in my language, so that it’s accessible.
- **Acceptance Criteria:**
  1. Given language=Spanish, when app loads, then UI labels appear in Spanish.

---

### Story 12: Export to Excel

- **User Story:** As a user, I want to export all transactions to Excel, so that I can back up or analyze externally.
- **Acceptance Criteria:**
  1. Given transactions exist, when exporting, then a valid `.xlsx` file downloads with all data.

---

## 6. Success Metrics

- **Quick Logging:** Median time from app open → transaction saved ≤5 sec.
- **Search:** 95% of queries return results ≤1 sec.
- **NLP:** ≥95% accuracy for amount/currency; ≥70% category classification.
- **Offline Sync:** 100% sync success.
