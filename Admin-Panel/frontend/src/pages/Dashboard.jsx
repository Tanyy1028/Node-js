import { useState, useEffect } from "react";
import { Users, Package, TrendingUp, Activity } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import StatsCard from "../components/StatsCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { productAPI, userAPI } from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    recentProducts: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productRes = await productAPI.getAll({ limit: 100 });
        const productCount = productRes.data.results || productRes.data.length || 0;

        let userCount = 0;
        if (isAdmin) {
          const userRes = await userAPI.getAll({ limit: 100 });
          userCount = userRes.data.results || userRes.data.length || 0;
        }

        setStats({
          totalProducts: productCount,
          totalUsers: userCount,
          recentProducts: productCount,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAdmin]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "primary",
    },
    ...(isAdmin
      ? [
          {
            title: "Total Users",
            value: stats.totalUsers,
            icon: Users,
            color: "green",
          },
        ]
      : []),
    {
      title: "Recent Products",
      value: stats.recentProducts,
      icon: TrendingUp,
      color: "orange",
    },
    {
      title: "Active Session",
      value: "1",
      icon: Activity,
      color: "red",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back, {user?.name || "User"}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/products"
            className="bg-white p-6 rounded-xl card-shadow hover:card-shadow-hover transition cursor-pointer"
          >
            <Package className="text-primary-600 mb-3" size={24} />
            <h3 className="font-semibold text-gray-800">Manage Products</h3>
            <p className="text-sm text-gray-500 mt-1">
              View and manage your products
            </p>
          </a>
          {isAdmin && (
            <a
              href="/users"
              className="bg-white p-6 rounded-xl card-shadow hover:card-shadow-hover transition cursor-pointer"
            >
              <Users className="text-green-600 mb-3" size={24} />
              <h3 className="font-semibold text-gray-800">Manage Users</h3>
              <p className="text-sm text-gray-500 mt-1">
                View and manage user accounts
              </p>
            </a>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

