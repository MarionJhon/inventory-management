import { UserButton } from "@stackframe/stack";
import { BarChart3, BarChart4, Package, Plus, Settings } from "lucide-react";
import Link from "next/link";

const SideBar = ({ currentPath = "/dashboard" }: { currentPath: string }) => {
  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      name: "Inventory",
      href: "/inventory",
      icon: Package,
    },
    {
      name: "Add Product",
      href: "/add-product",
      icon: Plus,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];
  return (
    <div className="fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-10">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart4 className="w-7 h-7 mr-5" />
          <span className="text-lg font-semibold">Inventory App</span>
        </div>
      </div>
      <nav className="space-y-1">
        <div className="flex items-center my-4">
          <div className="flex-[0.1] border-t border-gray-400"></div>
          <span className="text-sm px-4 font-semibold text-gray-400 uppercase divider">
            Inventory
          </span>
          <div className="flex-1 border-t border-gray-400"></div>
        </div>
        {navigation.map((nav, idx) => {
          const IconComponent = nav.icon;
          const isActive = currentPath === nav.href;
          return (
            <Link
              href={nav.href}
              key={idx}
              className={`flex items-center space-x-3 py-2 px-3 rounded-lg ${
                isActive
                  ? "bg-purple-100 text-gray-800 font-semibold"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-sm">{nav.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700">
        <div className="flex items-center justify-center">
          <UserButton showUserInfo />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
