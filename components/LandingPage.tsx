'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [orgDomain, setOrgDomain] = useState('');
  const [contactOrgName, setContactOrgName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const router = useRouter();

  const handleOrgLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/login/${orgDomain}`);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission logic
    console.log('Contact form submitted:', { contactOrgName, contactEmail, contactMessage });
    // Reset form fields
    setContactOrgName('');
    setContactEmail('');
    setContactMessage('');
    alert('Thank you for your interest. We will contact you soon!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Multi-Tenant App</h1>
      <p className="mb-8">Discover how our app can benefit individuals and organizations.</p>

      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">For Individuals</h2>
          <p className="mb-4">Experience the power of our app for personal use.</p>
          <div className="space-y-2">
            <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded block text-center">
              Individual Login
            </Link>
            <Link href="/signup" className="bg-green-500 text-white px-4 py-2 rounded block text-center">
              Sign Up
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">For Organizations</h2>
          <p className="mb-4">Already have an account? Log in here.</p>
          <form onSubmit={handleOrgLogin}>
            <input
              type="text"
              value={orgDomain}
              onChange={(e) => setOrgDomain(e.target.value)}
              placeholder="Enter your organization domain"
              className="border p-2 mr-2"
              required
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Organization Login
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Interested in Our Solution?</h2>
          <p className="mb-4">Contact us to learn more about our multi-tenant solution!</p>
          <form onSubmit={handleContactSubmit}>
            <input
              type="text"
              value={contactOrgName}
              onChange={(e) => setContactOrgName(e.target.value)}
              placeholder="Organization Name"
              className="border p-2 mb-2 block w-full"
              required
            />
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="Email"
              className="border p-2 mb-2 block w-full"
              required
            />
            <textarea
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Message"
              className="border p-2 mb-2 block w-full h-32"
              required
            ></textarea>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}