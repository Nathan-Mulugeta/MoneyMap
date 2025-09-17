### **Level 0: Context Diagram**

```
[User]
   |
   v
[Expense Tracker App (Frontend: React Native/Expo)]
   |
   v
[Backend: Supabase (DB + Auth + Edge Functions)]
   |
   v
[External Services: Payment providers (Payoneer, Binance), Exchange rates (user-provided, not API)]

```

---

### **Level 1: Data Flow**

```
(User)
   | (login/signup)
   v
[Frontend App]
   |---(auth req)---> [Supabase Auth]
   |<--(JWT token)---
   |
   |---(CRUD ops via API)--->
   v
[Supabase DB (with RLS)]
   |
   |---(sensitive ops / calculations)---> [Supabase Edge Functions]
   |
   |<--(secure data back to client)---

```

---

### **Example Flow: Add Expense (Level 2 DFD)**

```
[User]
   | (inputs expense form)
   v
[Frontend App]
   | (validate w/ React Hook Form)
   | (store temporary UI state in Zustand)
   |---(API request w/ JWT)---> [Supabase DB]
   |       (RLS ensures expense.user_id = auth.uid())
   |<--(expense saved confirmation)---
   |
   v
[Frontend updates local state + UI]

```
