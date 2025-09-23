
# SaaS Notes (MERN) - Multi-tenant Notes App (Demo)

This is a demo MERN (MongoDB, Express, React, Node) project implementing a multi-tenant SaaS Notes application as per the assignment.

Key features:
- Shared-schema multi-tenancy (tenant slug on records)
- JWT auth, roles (admin/user)
- Free plan (3-note limit) and Pro plan (unlimited)
- Dynamic tenant plan detection
- Default plan fallback to `free` if tenant plan is missing
- Seed script creates required test accounts
- Health endpoint, CORS enabled
- RESTful API endpoints for notes, authentication, and tenant management
- Frontend (React) + Backend (Express) in single repo; deployable to Vercel

See server/ and client/ for the code.
# -SaaS-Notes-MERN---Multi-tenant-Notes-App-Demo-
