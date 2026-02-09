# Specification

## Summary
**Goal:** Enable admins to download a formatted PDF “Test Request Report” for each submitted test request directly from the `/internal/test-requests` page, without any email workflow.

**Planned changes:**
- Add a per-row “Download PDF” action in `frontend/src/pages/internal/TestRequestsList.tsx` on `/internal/test-requests`.
- Generate the PDF entirely client-side using the request data already loaded in the table (no backend/external services).
- Format the PDF to include company name and full address (from `frontend/src/lib/companyInfo.ts`), a “Test Request Report” title, and key request fields (ID, customer/contact info, test details, optional fields when present, submitted/preferred dates).
- Download the PDF with a deterministic filename that includes the request ID (e.g., `test-request-<id>.pdf`).
- Show a user-visible English error message if PDF generation/download fails, without crashing the page.

**User-visible outcome:** On the admin Test Requests list, each row has a “Download PDF” button that saves a locally downloaded `test-request-<id>.pdf` report containing the request’s details.
