# Firestore Schema

## `universities`

- `name`: string
- `country`: string
- `logo`: string
- `tuitionFee`: string | number
- `admissionFee`: string | number
- `courseIds`: string[]
- `scholarshipAvailable`: boolean
- `intakeDates`: string[]
- `duration`: string
- `partnerStatus`: "partner" | "featured" | "standard"
- `sourceUrl`: "https://course-finder-a97606.netlify.app/"
- `lastSyncedAt`: timestamp

## `courses`

- `name`: string
- `degreeLevel`: "Diploma" | "Bachelor" | "Masters" | "PhD"
- `universityId`: string
- `country`: string
- `tuitionFee`: string | number
- `admissionFee`: string | number
- `duration`: string
- `scholarshipAvailable`: boolean
- `intakes`: string[]

## `applications`

- Personal, family, and study preference fields from the application form
- `status`: "Pending" | "Applied" | "Offer Letter Received" | "Visa Processing" | "Enrolled" | "Rejected"
- `documentLinks`: string[]
- `notes`: string
- `createdAt`: ISO string
- `updatedAt`: ISO string

## `students`

- `uid`: string
- `email`: string
- `fullName`: string
- `whatsapp`: string
- `applicationIds`: string[]

## `scholarships`

- `name`: string
- `country`: string
- `universityId`: string
- `eligibility`: string
- `amount`: string
- `deadline`: string

## Data Import Note

The production-safe implementation embeds the provided finder as the authoritative source. If the finder owner provides an API, CSV export, or Firestore access, map that feed into `universities` and `courses` with `sourceUrl` and `lastSyncedAt`.
