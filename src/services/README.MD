 ├── services/           # Utility service untuk token, storage, dll
 │    ├── Auth.ts
 │    ├── LocalStorage.ts
 │    └── Logger.ts

 Auth.tsx → fokus hanya untuk token management (auth concern).
LocalStorage.ts → wrapper umum supaya semua akses localStorage di project lebih konsisten & bisa di-mock saat testing.