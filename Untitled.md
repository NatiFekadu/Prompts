# System Architecture Overview

## Washington Healthcare Patient Appointment Booking System

  

---

  

## 1. High-Level Architecture

  

```

┌─────────────────────────────────────────────────────────────────────────┐

│ CLIENT LAYER │

├─────────────────────────────────────────────────────────────────────────┤

│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │

│ │ Patient │ │ Admin │ │ TeleBirr │ │

│ │ Browser │ │ Browser │ │ Gateway │ │

│ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘ │

└─────────┼───────────────────┼───────────────────┼───────────────────────┘

│ HTTPS │ HTTPS │ HTTPS

▼ ▼ ▼

┌─────────────────────────────────────────────────────────────────────────┐

│ WEB SERVER LAYER │

│ (Apache + mod_php) │

├─────────────────────────────────────────────────────────────────────────┤

│ ┌──────────────────────────────────────────────────────────────────┐ │

│ │ .htaccess │ │

│ │ • HTTPS Enforcement • Security Headers • Rate Limiting Hints │ │

│ └──────────────────────────────────────────────────────────────────┘ │

└─────────────────────────────────────────────────────────────────────────┘

│

▼

┌─────────────────────────────────────────────────────────────────────────┐

│ APPLICATION LAYER │

│ (PHP 8.2+) │

├─────────────────────────────────────────────────────────────────────────┤

│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ │

│ │ Patient UI │ │ Admin UI │ │ API Layer │ │

│ │ (index.php) │ │ (admin/*.php) │ │ (api/*.php) │ │

│ └───────┬────────┘ └───────┬────────┘ └───────┬────────┘ │

│ │ │ │ │

│ └───────────────────┴───────────────────┘ │

│ │ │

│ ┌───────────────────────────▼───────────────────────────────────────┐ │

│ │ SHARED FUNCTIONS │ │

│ │ includes/functions.php │ │

│ │ • Security (CSRF, Rate Limiting, Sanitization) │ │

│ │ • Database (PDO Prepared Statements) │ │

│ │ • Business Logic (Appointments, Slots, Validation) │ │

│ │ • TeleBirr Integration │ │

│ └───────────────────────────────────────────────────────────────────┘ │

└─────────────────────────────────────────────────────────────────────────┘

│

▼

┌─────────────────────────────────────────────────────────────────────────┐

│ DATA LAYER │

├─────────────────────────────────────────────────────────────────────────┤

│ ┌──────────────────────────────────────────────────────────────────┐ │

│ │ MySQL 8.0+ Database │ │

│ │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │ │

│ │ │ admins │ │ branches │ │ doctors │ │appoint- │ │ │

│ │ │ │ │ │ │ │ │ ments │ │ │

│ │ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │ │

│ │ ┌──────────┐ ┌──────────┐ ┌──────────┐ │ │

│ │ │ payment │ │ audit │ │ rate │ │ │

│ │ │ _logs │ │ _logs │ │ _limits │ │ │

│ │ └──────────┘ └──────────┘ └──────────┘ │ │

│ └──────────────────────────────────────────────────────────────────┘ │

└─────────────────────────────────────────────────────────────────────────┘

```

  

---

  

## 2. Directory Structure

  

```

TeleBirrNew/

├── admin/ # Admin panel

│ ├── includes/ # Admin-specific includes

│ │ ├── admin_header.php # Admin layout header

│ │ └── admin_footer.php # Admin layout footer

│ ├── index.php # Admin login

│ ├── dashboard.php # Dashboard with stats

│ ├── doctors.php # Doctor CRUD

│ ├── branches.php # Branch CRUD

│ ├── appointments.php # Appointment management

│ └── logout.php # Session termination

│

├── api/ # API endpoints

│ ├── create_appointment.php # Create appointment + TeleBirr

│ ├── get_slots.php # Available time slots

│ ├── get_doctors.php # Doctor listing

│ └── telebirr_callback.php # Payment callback handler

│

├── assets/ # Static assets

│ ├── css/

│ │ └── style.css # Main stylesheet

│ └── images/

│ └── favicon.png # Site favicon

│

├── config/ # Configuration (protected)

│ ├── db.php # Database connection

│ └── telebirr.php # TeleBirr API config

│

├── includes/ # Shared includes (protected)

│ ├── functions.php # All helper functions

│ ├── header.php # Patient UI header

│ └── footer.php # Patient UI footer

│

├── uploads/ # User uploads (restricted)

│ └── doctors/ # Doctor photos

│

├── docs/ # Documentation

│ └── INSA_Submission/ # INSA compliance docs

│

├── .htaccess # Apache security config

├── index.php # Main booking page

├── success.php # Confirmation page

├── track.php # Appointment tracking

├── error.php # Error pages

└── database.sql # Database schema

```

  

---

  

## 3. Data Flow Diagrams

  

### 3.1 Patient Appointment Booking Flow

  

```

┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐

│ Patient │ │ System │ │ TeleBirr │ │ Database │

└─────┬──────┘ └─────┬──────┘ └─────┬──────┘ └─────┬──────┘

│ │ │ │

│ 1. Load Form │ │ │

│─────────────────>│ │ │

│ │ 2. Get Doctors │ │

│ │─────────────────────────────────────>│

│ │<─────────────────────────────────────│

│ 3. Display Form │ │ │

│<─────────────────│ │ │

│ │ │ │

│ 4. Select Doctor │ │ │

│─────────────────>│ │ │

│ │ 5. Get Slots │ │

│ │─────────────────────────────────────>│

│ │<─────────────────────────────────────│

│ 6. Show Slots │ │ │

│<─────────────────│ │ │

│ │ │ │

│ 7. Submit Form │ │ │

│─────────────────>│ │ │

│ │ 8. Validate │ │

│ │ 9. Create Appt │ │

│ │─────────────────────────────────────>│

│ │<─────────────────────────────────────│

│ │ │ │

│ │ 10. Init Payment │ │

│ │─────────────────>│ │

│ │<─────────────────│ │

│ 11. Redirect │ │ │

│<─────────────────│ │ │

│ │ │ │

│ 12. Pay ─────────────────────────────> │

│ <──────────────────────────────────── │

│ │ │ │

│ │ 13. Callback │ │

│ │<─────────────────│ │

│ │ 14. Update │ │

│ │─────────────────────────────────────>│

│ │ │ │

│ 15. Confirmation │ │ │

│<─────────────────│ │ │

│ │ │ │

```

  

### 3.2 Admin Authentication Flow

  

```

┌────────────┐ ┌────────────┐ ┌────────────┐

│ Admin │ │ System │ │ Database │

└─────┬──────┘ └─────┬──────┘ └─────┬──────┘

│ │ │

│ 1. Login Request │ │

│─────────────────>│ │

│ │ 2. Rate Check │

│ │─────────────────>│

│ │<─────────────────│

│ │ │

│ │ 3. Verify CSRF │

│ │ 4. Get Admin │

│ │─────────────────>│

│ │<─────────────────│

│ │ │

│ │ 5. Verify Bcrypt │

│ │ 6. Create Session│

│ │ 7. Audit Log │

│ │─────────────────>│

│ │ │

│ 8. Dashboard │ │

│<─────────────────│ │

│ │ │

```

  

---

  

## 4. Database Schema

  

### 4.1 Entity Relationship Diagram

  

```

┌──────────────┐ ┌──────────────┐ ┌──────────────┐

│ admins │ │ branches │ │ doctors │

├──────────────┤ ├──────────────┤ ├──────────────┤

│ id (PK) │ │ id (PK) │◄──────┤ branch_id(FK)│

│ username │ │ name │ │ id (PK) │

│ password │ │ address │ │ full_name │

│ full_name │ │ city │ │ specialty │

│ email │ │ phone │ │ consultation │

│ is_active │ │ email │ │ working_days │

│ last_login │ │ working_hours│ │ is_active │

└──────────────┘ │ is_active │ └──────┬───────┘

└──────────────┘ │

▲ │

│ │

┌──────┴───────┐ │

│ │ │

┌──────┴──────┐ │ ┌──────┴───────┐

│ appointments│◄──────┴───────┤ │

├─────────────┤ │ │

│ id (PK) │ │ │

│ reference │ │ │

│ patient_* │ │ │

│ doctor_id │───────────────┘ │

│ branch_id │ │

│ date/time │ │

│ status │ │

│ payment_* │ │

└──────┬──────┘ │

│ │

▼ │

┌─────────────┐ ┌─────────────┐ │

│payment_logs │ │ audit_logs │ │

├─────────────┤ ├─────────────┤ │

│ id (PK) │ │ id (PK) │ │

│ appt_id(FK) │ │ action │ │

│ reference │ │ table_name │ │

│ status │ │ record_id │ │

│ amount │ │ changes │ │

│ response │ │ admin_id │ │

└─────────────┘ │ ip_address │ │

└─────────────┘ │

```

  

---

  

## 5. Security Architecture

  

### 5.1 Security Layers

  

```

┌─────────────────────────────────────────────────────────────────┐

│ NETWORK LAYER │

│ • HTTPS/TLS 1.2+ • HSTS • Firewall • DDoS Protection │

└─────────────────────────────────────────────────────────────────┘

│

▼

┌─────────────────────────────────────────────────────────────────┐

│ WEB SERVER LAYER │

│ • Apache mod_security • Rate Limiting • Access Control │

│ • Security Headers (CSP, X-Frame-Options, etc.) │

└─────────────────────────────────────────────────────────────────┘

│

▼

┌─────────────────────────────────────────────────────────────────┐

│ APPLICATION LAYER │

│ • CSRF Protection • Input Validation • Output Encoding │

│ • Session Security • Authentication • Authorization │

└─────────────────────────────────────────────────────────────────┘

│

▼

┌─────────────────────────────────────────────────────────────────┐

│ DATA LAYER │

│ • Prepared Statements • Encrypted Storage • Access Control │

│ • Audit Logging • Backup Encryption │

└─────────────────────────────────────────────────────────────────┘

```

  

---

  

## 6. Deployment Architecture

  

### 6.1 Production Environment

  

```

┌───────────────────────────────────────────────────────────────────────┐

│ INTERNET │

└───────────────────────────────┬───────────────────────────────────────┘

│

▼

┌───────────────────────────────────────────────────────────────────────┐

│ LOAD BALANCER / CDN │

│ (SSL Termination, DDoS Protection) │

└───────────────────────────────┬───────────────────────────────────────┘

│

┌───────────────┴───────────────┐

▼ ▼

┌───────────────────────┐ ┌───────────────────────┐

│ WEB SERVER 1 │ │ WEB SERVER 2 │

│ (Apache + PHP) │ │ (Apache + PHP) │

└───────────┬───────────┘ └───────────┬───────────┘

│ │

└───────────────┬───────────────┘

│

▼

┌───────────────────────────────┐

│ DATABASE SERVER │

│ (MySQL Primary) │

└───────────────┬───────────────┘

│

▼

┌───────────────────────────────┐

│ DATABASE REPLICA │

│ (MySQL Read Replica) │

└───────────────────────────────┘

```