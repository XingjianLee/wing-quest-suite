import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Plane,
  Hotel,
  Ticket,
  FileText,
  Map,
  RefreshCw,
  Headphones,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    id: "check-in",
    name: "在线值机",
    icon: CheckCircle2,
    description: "提前选座",
    route: "/check-in",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "flight",
    name: "预订机票",
    icon: Plane,
    description: "特价机票",
    route: "/book-flight",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "hotel",
    name: "预订酒店",
    icon: Hotel,
    description: "品质住宿",
    route: "/book-hotel",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "ticket",
    name: "景点门票",
    icon: Ticket,
    description: "热门景点",
    route: "/book-ticket",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "orders",
    name: "我的订单",
    icon: FileText,
    description: "订单管理",
    route: "/my-orders",
    color: "from-red-500 to-rose-500",
  },
  {
    id: "trips",
    name: "我的行程",
    icon: Map,
    description: "行程规划",
    route: "/my-trips",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "refund",
    name: "退改签",
    icon: RefreshCw,
    description: "退票改签",
    route: "/refund",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "support",
    name: "客服中心",
    icon: Headphones,
    description: "在线客服",
    route: "/support",
    color: "from-teal-500 to-cyan-500",
  },
];

const QuickServicesBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-background border-b">
      <div className="container mx-auto px-6 py-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-1">快捷服务</h2>
          <p className="text-sm text-muted-foreground">一站式旅行服务平台</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden border-0 bg-card/80 backdrop-blur"
              onClick={() => navigate(service.route)}
            >
              <div className="p-4 flex flex-col items-center text-center space-y-2">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-semibold text-sm">{service.name}</p>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickServicesBar;
