# Backend Overhaul & CMS Integration Plan

## 1. Objectives
- Establish a professional, scalable "Company Standard" backend architecture.
- Implement dynamic Content Management System (CMS) for the Admin Panel.
- Securely handle image storage via Cloudinary.
- Manage data through MongoDB with Mongoose models.
- "Seed" the database with existing frontend content to transition from static to dynamic.

## 2. Technical Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Storage**: Cloudinary (for images)
- **File Handling**: Multer (storage engine)

## 3. Folder Structure
```text
backend/
├── config/
│   ├── db.js             # Database connection
│   └── cloudinary.js     # Cloudinary configuration
├── controllers/          # Business logic
│   ├── pageController.js # Dynamic page content
│   ├── blogController.js
│   └── testimanialController.js
├── models/               # Database Schemas
│   ├── PageContent.js    # Flexible schema for any page (Home, About, etc.)
│   ├── BlogPost.js
│   └── Testimonial.js
├── routes/               # API Endpoints
│   ├── pageRoutes.js
│   ├── blogRoutes.js
│   └── testimonialRoutes.js
├── middleware/           # Auth, Uploads, Error Handling
│   ├── upload.js         # Multer setup
│   └── auth.js           # Admin verification
├── utils/
│   └── seeder.js         # Script to populate DB from JSON
├── data/
│   └── initialContent.js # The JSON data extracted from current frontend
├── server.js             # Entry point
└── .env                  # Secrets
```

## 4. Database Models Strategy

### A. `PageContent` (The Dynamic Engine)
Instead of hardcoding schemas for every page, we use a flexible "Section-based" approach.
```javascript
{
  pageSlug: "home", // unique index
  sections: [
    {
      sectionId: "hero",
      title: "Hero Slider",
      content: {
         heading: "Love & Nest",
         subtext: "Artistic Motherhood",
         images: ["url1", "url2"] // Cloudinary URLs
      }
    },
    // ... other sections
  ],
  meta: {
     title: "Home | Love & Nest",
     description: "..."
  }
}
```

### B. `BlogPost`
Standard blog structure: Title, Slug, Content (Rich Text), CoverImage, Author, Tags, CreatedAt.

### C. `Testimonial`
ClientName, ReviewText, Rating, ClientImage (optional), Featured (boolean).

## 5. Execution Roadmap

### Phase 1: Foundation (Backend Setup)
1.  Initialize folder structure.
2.  Install missing dependencies (`cloudinary`, `multer`, `multer-storage-cloudinary`).
3.  Set up `server.js`, `db.js`, and `cloudinary.js`.

### Phase 2: Schema & Logic
1.  Create Mongoose Models (`PageContent`, `BlogPost`, `Testimonial`).
2.  Create Controllers with CRUD + Image Upload logic.
3.  Define Routes.

### Phase 3: The "Seeder" (Critical)
1.  Create `data/initialContent.js` by extracting text/images currently hardcoded in `Home.jsx`, `About.jsx`, etc.
2.  Write `utils/seeder.js` to:
    - Clear existing DEV collections.
    - Upload local placeholder images to Cloudinary (or use existing URLs).
    - Insert structured content into MongoDB.

### Phase 4: Frontend Integration
1.  Create an API Service in Frontend (`src/services/api.js`).
2.  Refactor `Home.jsx` to fetch data from `/api/pages/home` instead of hardcoded text.
3.  Refactor `ServiceGallery.jsx` to fetch from `/api/services/:id`.

### Phase 5: Admin Panel Power-Up
1.  Connect `ManagePages.jsx` to the API.
2.  Enable the `PageEditor.jsx` to `PUT` updates to the backend.
3.  Build `ManageBlog` and `ManageTestimonials` with simple Add/Edit forms.

---
**Status**: Ready to begin Phase 1.
