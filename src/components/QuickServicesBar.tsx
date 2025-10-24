import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
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
    <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-background border-b pt-20">
      <div className="container mx-auto px-6 py-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-1">快捷服务</h2>
          <p className="text-sm text-muted-foreground">一站式旅行服务平台</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
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
