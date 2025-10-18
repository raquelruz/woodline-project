# Woodline Living
*Furniture Design & E-Commerce Platform*
Woodline Living is a modern and elegant web application for custom furniture design and sales,
including a full-featured admin dashboard to manage products, users & orders.

## Version 1.0.0.
First stable release of Woodline Living - Responsive, integrated and production-ready

## Main Features
### Frontend (User Interface)
- Product catalogue with image galleries and long descriptions
- Product modal with reviews and "add to cart" button
- Responsive design (optimized for mobile, tablet and desktop)
- Scrollable product modal on mobile
- Integrated legal pages:
    - Shipping, Returns, Delivery Time
    - Terms & Conditions, Privacy Policy, Cookies Policy

### Admin Dashboard
- Responsive admin panel built with **React** and **Tailwind CSS**
- Modules:
    - **Products** - CRUD operations
    - **Users** - management & editing
    - **Orders** - status management (pending, preparing, delivered, cancelled)
    - Animated stats dashboard using **Framer Motion**
    - Simplified and polished UX/UI
    - Clean API integration with Axios

### API Integration
- Connected to ElevenCode backend API
- Optimized endpoints for:
    - /products
    - /users
    - orders/:orderId/status

## Project Structure
src/
├── app.jsx
├── core/
│   ├── http/axios.js
│   ├── cart/
│   │   ├── cart.api.js
│   │   └── cart.service.js
├── dashboard/
│   ├── components/
│   │   ├── ProductTable.jsx
│   │   ├── UserTable.jsx
│   │   ├── ReviewTable.jsx
│   │   └── OrderTable.jsx
│   ├── hooks/
│   │   ├── useProducts.jsx
│   │   ├── useUsers.jsx
│   │   └── useOrders.jsx
│   └── pages/
│       ├── DashboardHome.jsx
│       ├── OrdersPage.jsx
│       ├── ProductsPage.jsx
│       ├── UsersPage.jsx
│       └── ReviewsPage.jsx
├── landing/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Buttons/
│   │   └── Reviews/
│   └── pages/
│       ├── HomePage.jsx
│       ├── ProductsPage.jsx
│       ├── AboutPage.jsx
│       ├── ContactPage.jsx
│       ├── ShippingPage.jsx
│       ├── ReturnsPage.jsx
│       ├── DeliveryTimePage.jsx
│       ├── TermsPage.jsx
│       ├── PrivacyPolicyPage.jsx
│       └── CookiesPolicyPage.jsx
└── contexts/
    ├── AuthContext.jsx
    └── CartContext.jsx


## Installation & Setup
1️⃣ Clone the repository:
git clone https://github.com/raquelruz/woodline-project

2️⃣ Navigate to the folder:
cd woodline-living

3️⃣ Install dependencies:
npm install

4️⃣ Run the development server:
npm run dev

5️⃣ Build for production:
npm run build

# Author
## Raquel Ruiz
Full-Stack Developer || Designer || Creative Technologist

# License
© 2025 Woodline Living. All rights reserved.
Unauthorized reproduction or redistribution of this software or its visual identity is prohibited.

# Version Notes
## Woodline Living v1.0.0.
- Stable release
- Complete dashboard integration
- Legal & informational pages
- Ready for production deployment