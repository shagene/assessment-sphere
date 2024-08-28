import { GetServerSideProps } from 'next';
import { getTenant } from '../../lib/getTenant';

interface LoginProps {
  tenant: {
    id: string;
    subdomain: string;
  } | null;
}

export default function TenantLogin({ tenant }: LoginProps) {
  if (!tenant) {
    return <div>Organization not found. Please check the domain and try again.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Login to {tenant.subdomain}</h1>
      {/* Add your login form here */}
      <form>
        <input type="email" placeholder="Email" className="border p-2 mb-2 block" />
        <input type="password" placeholder="Password" className="border p-2 mb-2 block" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { domain } = context.params as { domain: string };
  const tenant = await getTenant([domain]);

  return {
    props: {
      tenant: tenant ? { id: tenant.id, subdomain: tenant.subdomain } : null,
    },
  };
};