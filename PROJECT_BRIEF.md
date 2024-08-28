Create a multi-tenant test-taking application called AssessmentSphere using Next.js 14 and the Platforms Starter Kit, replacing Vercel Postgres with Supabase. The application should have the following features:

1. Multi-tenancy with custom subdomains for each organization (e.g., school.assessmentsphere.com)
2. User authentication and authorization with roles (student, teacher, administrator, individual)
3. Various question types (multiple choice, essay, image-based, fill-in-the-blank, true/false)
4. Timed tests with randomized questions and answers
5. Test creation, administration, and analysis features
6. Analytics dashboard for test results
7. Integration with learning management systems
8. Test printing functionality
9. A free plan with limited features (e.g., basic question types, limited number of students)
10. A paid plan with additional features (e.g., all question types, advanced analytics)
11. An add-on option for increased storage or number of students
12. Ability for individuals to create tests and share via unique URLs
13. Teacher-specific features for sending tests to entire classes with student tracking
14. Company/employer features for safety training tests and other use cases

Key tasks:

1. Set up a Next.js 14 project using the Platforms Starter Kit as a base
2. Replace Vercel Postgres with Supabase for database functionality
3. Implement Supabase authentication instead of NextAuth.js
4. Modify the tenant model in Prisma to work with Supabase, adding fields for organization details
5. Create models for tests, questions, answers, user results, and unique test links
6. Update API routes to use Supabase client instead of Vercel Postgres
7. Implement subscription logic using Stripe integration with Supabase
8. Create middleware to handle subdomain routing and tenant isolation
9. Develop user interfaces for test creation, taking, and analysis
10. Implement timed test functionality and randomization of questions/answers
11. Create an analytics dashboard for viewing test results
12. Develop a user dashboard to manage subscriptions and add-ons
13. Implement test printing functionality
14. Create API endpoints for LMS integration
15. Develop functionality for generating and managing unique test URLs
16. Create a system for teachers to send tests to classes and track individual students
17. Implement features for company/employer use cases (e.g., safety training)
18. Ensure proper data isolation between tenants in Supabase

Please provide step-by-step instructions and code snippets for implementing these features, focusing on:
- Setting up the multi-tenant architecture with Supabase
- Implementing the test creation and sharing functionality
- Handling timed tests and randomization
- Creating the analytics dashboard
- Integrating with Stripe for subscriptions and add-ons
- Ensuring data isolation and security between tenants
- Implementing the unique URL generation and tracking system
- Developing the teacher-specific and company-specific features

Consider best practices for scalability, performance, and user experience in a SaaS environment. Also, provide guidance on how to structure the application to allow for future expansions and feature additions.
