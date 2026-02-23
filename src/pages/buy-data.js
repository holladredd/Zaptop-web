import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

export default function BuyData() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Buy Data</h1>
            <p className="text-gray-500">Coming soon...</p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
