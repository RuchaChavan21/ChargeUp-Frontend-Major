# ChargeUP: Admin Portal Design Document

## 1. Overview
**Target Audience**: Station Owners, Platform Administrators (Super Admin).
**Design Philosophy**: "Data-First Efficiency". Clean, spacious, and information-dense without being cluttered. Inspired by Stripe Dashboard and Vercel.
**Tech Stack**: Vue.js 3 (Composition API), Tailwind CSS, Chart.js/ApexCharts, Pinia (State Management).

---

## 2. Navigation & Layout
**Structure**: Sidebar Navigation Layout (Collapsible on smaller desktop screens).

### Sidebar Menu
*   **Brand**: ChargeUP Admin (Logo top-left)
*   **Overview**:
    *   📊 Dashboard
    *   📢 Notifications (with badge)
*   **Operations**:
    *   ⛽ Stations (List & Map)
    *   🔌 Ports & Status
    *   📅 Reservations (Calendar)
    *   💬 Reviews
*   **Business**:
    *   💰 Revenue & Payments
    *   🏷️ Dynamic Pricing
    *   📈 Analytics
*   **System** (Super Admin only):
    *   👥 Users & Roles
    *   ⚙️ Settings
    *   audit Audit Logs
*   **User Profile**: Bottom of sidebar (Avatar, Name, Logout).

---

## 3. Component Hierarchy

### Reusable Admin Components (`src/components/admin/`)
*   **Atoms**:
    *   `Badge`: Status pills (Active/Inactive, Paid/Refunded).
    *   `StatusDot`: Live status indicators.
    *   `TableHeader`: Sortable columns.
    *   `ActionIcon`: Edit, Delete, View icons.
*   **Molecules**:
    *   `MetricCard`: KPI display (Label, Value, Trend %).
    *   `SearchFilterBar`: Combined search input + filter dropdowns.
    *   `Pagination`: Page control for tables.
    *   `Breadcrumb`: Navigation path.
*   **Organisms**:
    *   `DataTable`: Reusable table component with slots for headers/rows.
    *   `AdminChart`: Wrapper for chart libraries.
    *   `Modal`: Slide-overs or standard modals for forms.
    *   `DateRangePicker`: For analytics and reports.

---

## 4. Screen Designs & Features

### 1. Authentication
*   **Layout**: Split screen. Left side: Branding/Marketing image. Right side: Clean form.
*   **Elements**: Email, Password, "Remember me", "Forgot Password?".
*   **Behavior**:
    *   Redirects to `/admin/dashboard` or `/owner/dashboard` based on role.
    *   Session timeout auto-redirects here.

### 2. Admin Dashboard
*   **Header**: Date range picker (Today / 7 Days / 30 Days).
*   **Top Row (KPI Cards)**:
    *   *Total Revenue*: ₹12,450 (↑12% vs last week).
    *   *Total Sessions*: 145.
    *   *Occupancy Rate*: 78% (Peak hours).
    *   *Active Stations*: 4/5.
*   **Middle Row**:
    *   *Main Chart*: Line chart showing Hourly Usage vs. Revenue.
    *   *Alerts Panel*: Sidebar list of "Offline Stations" or "Payment Failures".
*   **Bottom Row**:
    *   *Recent Activity*: Mini-table of last 5 sessions.

### 3. Station Management
*   **Layout**: List View (Default) with toggle for Map View.
*   **Table Columns**: Status (Dot), Name, Location, Ports (Count), Revenue (30d), Actions.
*   **Filters**: Status (Active/Maintenance), Region, Connector Type.
*   **Add/Edit Station (Drawer/Modal)**:
    *   *Details*: Name, Address (Google Places Autocomplete).
    *   *Location*: Draggable pin on mini-map.
    *   *Media*: Drag & drop image upload area.
    *   *Amenities*: Checkbox grid (Wi-Fi, Cafe, Restroom).
    *   *Visibility*: Toggle switch (Publish/Unpublish).

### 4. Charging Port Management
*   **Context**: Usually accessed *within* a Station's detail view.
*   **UI**: Card list for each port (e.g., "Port A - Type 2").
*   **Controls**:
    *   *Configuration*: Dropdown for Max Power (7.2kW, 22kW, 50kW, etc.).
    *   *Manual Override*: segmented control (Available | Maintenance | Reserved).
    *   *Status*: Real-time visual indicator.

### 5. Slot & Reservation Management
*   **Views**: Calendar View (Day/Week) vs. List View.
*   **Calendar View**:
    *   Vertical resources (Ports) x Horizontal time (Hours).
    *   Drag-and-drop slots (Admin override).
    *   Color coding: Green (Available), Blue (Booked), Grey (Blocked/Maintenance).
*   **List View**:
    *   Searchable booking ID.
    *   Actions: "Cancel Booking" (Requires reason selection), "Refund".
*   **Conflict UI**: Visual warning if trying to block a slot with an existing booking.

### 6. Dynamic Pricing Configuration
*   **Layout**: Rule-based builder.
*   **Current Rate Card**: Large display (e.g., "Base: ₹15/kWh").
*   **Rules Table**:
    *   *Time Range*: 09:00 - 18:00 (Peak).
    *   *Modifier*: +₹5/kWh.
    *   *Days*: Mon-Fri.
*   **Simulator**: "Preview Price" calculator. Input: Date/Time. Output: Final cost/kWh.
*   **Log**: History of price changes (User, Timestamp, Old Value, New Value).

### 7. Payments & Revenue
*   **Tabs**: Transactions | Settlements | Invoices.
*   **Transactions Table**: Booking ID, User, Amount, Status (Success/Failed), Date.
*   **Breakdown Panel**:
    *   Gross Revenue.
    *   Platform Fee (e.g., 5%).
    *   GST/Tax.
    *   Net Payout.
*   **Export**: Button to "Download CSV" or "Generate Invoice PDF".

### 8. Reports & Analytics
*   **Filters**: Station multiselect, Date Range, Granularity (Daily/Weekly).
*   **Visuals**:
    *   *Utilization Heatmap*: Grid showing busiest hours (Day of Week vs Hour).
    *   *Revenue Mix*: Pie chart (Charging vs Parking fees).
    *   *Customer Retention*: New vs Returning users chart.

### 9. Reviews & Feedback
*   **Layout**: Feed style.
*   **Review Card**: Star rating, User text, Date, "Verified Charging Session" badge.
*   **Actions**: "Reply" (Inline text box), "Flag for moderation", "Hide".
*   **Summary Box**: Average rating trend line.

### 10. Notifications & Alerts
*   **Global Bell Icon**: Dropdown for quick alerts.
*   **Notification Center**: Full page list.
*   **Categories**: System (Server status), Operational (Station offline), Financial (Payout processed).
*   **Settings**: Toggles for Email/SMS/Push preferences per category.

### 11. System Settings (Super Admin)
*   **Tabs**: General | Commission | Feature Flags.
*   **Commission**: Input field for global % cut.
*   **Rules**: "Max Reservation Duration" slider (e.g., 4 hours).
*   **Toggles**: "Enable Beta Features", "Maintenance Mode".

### 12. Audit Logs
*   **Table**: Strictly chronological.
*   **Columns**: Timestamp, User (IP Address), Action (e.g., "Updated Price"), Target (Station ID).
*   **Search**: Highly optimized text search for IDs and keywords.

---

## 5. Mobile Responsiveness
*   **Sidebar**: Collapses to hamburger menu.
*   **Tables**: Horizontally scrollable or card-stack view on mobile.
*   **Charts**: Stacked vertically instead of grid.
*   **Modals**: Become full-screen sheets on mobile.

## 6. Implementation Plan (Frontend)
1.  **Scaffold**: Setup `layouts/AdminLayout.vue`.
2.  **Theme**: defining `tailwind.config.js` colors for admin (Slate/Indigo).
3.  **Components**: Build `DataTable` and `MetricCard` first.
4.  **Views**: Implement Dashboard -> Stations -> Reservations.
