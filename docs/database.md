# Initial MongoDB design

Design only: no Mongoose models or migrations yet. Confirm fields, units, status transitions, and auth method before implementation. Collections use timestamps.

| Collection | Planned content | Initial indexes |
| --- | --- | --- |
| users | Identity, normalized email, contact, customer/admin role; auth fields depend on chosen method | Unique normalized email |
| products | Name, slug, category, description, images, typed specifications, price in minor units, currency, stock, availability | Unique slug; category + availability |
| estimates | User reference, validated inputs/units, assumptions, calculation version, results, product recommendations | userId + createdAt |
| orders | Owner, product references, quantities, name/unit-price snapshots, totals, currency, contact/delivery snapshot, status, optional tracking reference | userId + createdAt; status + createdAt; unique tracking reference when issued |
| tickets | Owner, optional product/order reference, category, description, status | userId + createdAt; status + updatedAt |
| ticketReplies | Ticket, author, customer-visible message | ticketId + createdAt |
| ticketNotes | Ticket, staff author, internal-only note | ticketId + createdAt |

Separate replies/notes avoid unbounded arrays. Internal notes require staff authorization and never appear in customer responses. Verify linked orders belong to the ticket owner.

Order statuses: pending, confirmed, processing, completed, cancelled. Ticket statuses: open, in_progress, resolved, closed. Permitted transitions are not yet defined.

Customers access only their own private records. Admin operations require backend authorization. Never return authentication secrets; use explicit response mapping.

Calculate order totals on the backend from database prices. Preserve names and prices at order time. Use one currency per order and positive integer quantities. Define stock/reservation concurrency during order implementation.

Keep calculator units, assumptions, and calculation version explicit. Prototype formulas are not validated engineering specifications. Preserve historical results and assumptions.

Validate index proposals against actual queries before implementation. Database settings belong only to the backend. No seed script exists yet.
