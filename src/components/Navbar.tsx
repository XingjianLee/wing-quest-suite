import { Button } from "@/components/ui/button";
import { Plane, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar = ({ isLoggedIn = false }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Plane className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-bold text-primary">SkyTrip</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {isLoggedIn ? (
              <>
                <a
                  href="/"
                  className="text-primary font-medium hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
                >
                  首页
                </a>
                <a
                  href="/book-flight"
                  className="text-foreground hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
                >
                  预订机票
                </a>
                <a
                  href="/book-hotel"
                  className="text-foreground hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
                >
                  预订酒店
                </a>
                <a
                  href="/book-ticket"
                  className="text-foreground hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
                >
                  景区门票
                </a>
                <a
                  href="/my-trips"
                  className="text-foreground hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
                >
                  我的行程
                </a>
                <a
                  href="/my-orders"
                  className="text-foreground hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
                >
                  我的订单
                </a>
              </>
            ) : (
              <>
                <a
                  href="#home"
                  className="text-primary font-medium hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
                >
                  首页
                </a>
                <a
                  href="#about"
                  className="text-foreground hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
                >
                  关于我们
                </a>
                <a
                  href="#services"
                  className="text-foreground hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
                >
                  服务
                </a>
                <a
                  href="#contact"
                  className="text-foreground hover:text-accent transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
                >
                  联系我们
                </a>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Button 
                variant="accent" 
                className="gap-2"
                onClick={() => navigate("/profile")}
              >
                <User className="w-4 h-4" />
                个人中心
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="hidden md:inline-flex"
                  onClick={() => navigate("/auth")}
                >
                  登录
                </Button>
                <Button 
                  variant="accent"
                  onClick={() => navigate("/auth")}
                >
                  注册
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
