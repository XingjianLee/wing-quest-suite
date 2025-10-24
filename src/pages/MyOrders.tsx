import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderCard, { Order } from "@/components/OrderCard";
import OrderDetailsDialog from "@/components/OrderDetailsDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Receipt, Clock, CheckCircle2, XCircle, Wallet } from "lucide-react";

// Mock 订单数据
const mockOrders: Order[] = [
  {
    orderNo: "ORD202510230001",
    totalAmountOriginal: 2400.00,
    totalAmount: 2280.00,
    paymentStatus: "paid",
    status: "paid",
    paymentMethod: "alipay",
    createdAt: new Date(2024, 9, 23, 9, 25),
    paidAt: new Date(2024, 9, 23, 9, 30),
    items: [
      {
        flightNumber: "CA1831",
        airline: "中国国际航空",
        departureAirport: "PEK",
        departureCity: "北京",
        arrivalAirport: "CTU",
        arrivalCity: "成都",
        departureTime: new Date(2024, 10, 25, 8, 0),
        arrivalTime: new Date(2024, 10, 25, 10, 30),
        cabinClass: "economy",
        passengers: [
          {
            name: "李行健",
            idCard: "130104200404250000",
            seatNumber: "15C",
            checkInStatus: "checked",
          },
          {
            name: "张伟",
            idCard: "110101199001011234",
            seatNumber: "15D",
            checkInStatus: "checked",
          },
        ],
        originalPrice: 2400.00,
        paidPrice: 2280.00,
      },
    ],
  },
  {
    orderNo: "ORD202510230002",
    totalAmountOriginal: 4800.00,
    totalAmount: 4560.00,
    paymentStatus: "paid",
    status: "completed",
    paymentMethod: "wechat",
    createdAt: new Date(2024, 9, 23, 10, 10),
    paidAt: new Date(2024, 9, 23, 10, 15),
    items: [
      {
        flightNumber: "CZ3901",
        airline: "中国南方航空",
        departureAirport: "PKX",
        departureCity: "北京",
        arrivalAirport: "CTU",
        arrivalCity: "成都",
        departureTime: new Date(2024, 9, 28, 10, 10),
        arrivalTime: new Date(2024, 9, 28, 12, 50),
        cabinClass: "business",
        passengers: [
          {
            name: "李娜",
            idCard: "110101198505152345",
            seatNumber: "2A",
            checkInStatus: "checked",
          },
          {
            name: "王芳",
            idCard: "110101199212123456",
            seatNumber: "2B",
            checkInStatus: "checked",
          },
        ],
        originalPrice: 4800.00,
        paidPrice: 4560.00,
      },
    ],
  },
  {
    orderNo: "ORD202510230003",
    totalAmountOriginal: 890.00,
    totalAmount: 890.00,
    paymentStatus: "unpaid",
    status: "pending",
    paymentMethod: "unionpay",
    createdAt: new Date(2024, 9, 23, 10, 50),
    expiredAt: new Date(2024, 9, 23, 11, 20),
    items: [
      {
        flightNumber: "3U3456",
        airline: "四川航空",
        departureAirport: "CTU",
        departureCity: "成都",
        arrivalAirport: "CAN",
        arrivalCity: "广州",
        departureTime: new Date(2024, 10, 1, 8, 40),
        arrivalTime: new Date(2024, 10, 1, 10, 50),
        cabinClass: "economy",
        passengers: [
          {
            name: "刘强",
            idCard: "110101198811114567",
            checkInStatus: "not_checked",
          },
        ],
        originalPrice: 890.00,
        paidPrice: 890.00,
      },
    ],
  },
  {
    orderNo: "ORD202510220001",
    totalAmountOriginal: 6200.00,
    totalAmount: 6200.00,
    paymentStatus: "paid",
    status: "completed",
    paymentMethod: "offline",
    createdAt: new Date(2024, 9, 22, 16, 30),
    paidAt: new Date(2024, 9, 22, 16, 40),
    items: [
      {
        flightNumber: "CA1298",
        airline: "中国国际航空",
        departureAirport: "URC",
        departureCity: "乌鲁木齐",
        arrivalAirport: "PEK",
        arrivalCity: "北京",
        departureTime: new Date(2024, 9, 26, 10, 0),
        arrivalTime: new Date(2024, 9, 26, 14, 30),
        cabinClass: "business",
        passengers: [
          {
            name: "陈国强",
            idCard: "110101198003035678",
            seatNumber: "3C",
            checkInStatus: "checked",
          },
          {
            name: "张丽",
            idCard: "110101199210108888",
            seatNumber: "3D",
            checkInStatus: "checked",
          },
        ],
        originalPrice: 6200.00,
        paidPrice: 6200.00,
      },
    ],
  },
  {
    orderNo: "ORD202510230005",
    totalAmountOriginal: 2100.00,
    totalAmount: 2100.00,
    paymentStatus: "failed",
    status: "cancelled",
    paymentMethod: "credit_card",
    createdAt: new Date(2024, 9, 23, 11, 30),
    expiredAt: new Date(2024, 9, 23, 12, 0),
    items: [
      {
        flightNumber: "MU5302",
        airline: "中国东方航空",
        departureAirport: "PVG",
        departureCity: "上海",
        arrivalAirport: "CAN",
        arrivalCity: "广州",
        departureTime: new Date(2024, 10, 5, 14, 20),
        arrivalTime: new Date(2024, 10, 5, 16, 40),
        cabinClass: "economy",
        passengers: [
          {
            name: "李行健",
            idCard: "130104200404250000",
            checkInStatus: "not_checked",
          },
        ],
        originalPrice: 2100.00,
        paidPrice: 2100.00,
      },
    ],
  },
];

const MyOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const filterOrders = (status: string) => {
    if (status === "all") return mockOrders;
    if (status === "unpaid") return mockOrders.filter(o => o.paymentStatus === "unpaid");
    if (status === "paid") return mockOrders.filter(o => o.paymentStatus === "paid" && o.status === "paid");
    if (status === "completed") return mockOrders.filter(o => o.status === "completed");
    if (status === "cancelled") return mockOrders.filter(o => o.status === "cancelled" || o.paymentStatus === "failed");
    return mockOrders;
  };

  const stats = {
    total: mockOrders.length,
    unpaid: mockOrders.filter(o => o.paymentStatus === "unpaid").length,
    paid: mockOrders.filter(o => o.paymentStatus === "paid").length,
    completed: mockOrders.filter(o => o.status === "completed").length,
    cancelled: mockOrders.filter(o => o.status === "cancelled" || o.paymentStatus === "failed").length,
    totalAmount: mockOrders.filter(o => o.paymentStatus === "paid").reduce((sum, o) => sum + o.totalAmount, 0),
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={true} />

      <div className="flex-1 pt-20">
        {/* 顶部统计区域 */}
        <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-background border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">我的订单</h1>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Receipt className="w-8 h-8 text-primary" />
                    <div>
                      <div className="text-2xl font-bold">{stats.total}</div>
                      <p className="text-xs text-muted-foreground">全部订单</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-orange-600" />
                    <div>
                      <div className="text-2xl font-bold">{stats.unpaid}</div>
                      <p className="text-xs text-muted-foreground">待支付</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold">{stats.paid}</div>
                      <p className="text-xs text-muted-foreground">已支付</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold">{stats.completed}</div>
                      <p className="text-xs text-muted-foreground">已完成</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-8 h-8 text-primary" />
                    <div>
                      <div className="text-xl font-bold">¥{stats.totalAmount}</div>
                      <p className="text-xs text-muted-foreground">累计消费</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* 订单列表 */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-5">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="unpaid">待支付</TabsTrigger>
              <TabsTrigger value="paid">已支付</TabsTrigger>
              <TabsTrigger value="completed">已完成</TabsTrigger>
              <TabsTrigger value="cancelled">已取消</TabsTrigger>
            </TabsList>

            {["all", "unpaid", "paid", "completed", "cancelled"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                {filterOrders(tab).length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <XCircle className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">暂无订单</p>
                    </CardContent>
                  </Card>
                ) : (
                  filterOrders(tab).map((order) => (
                    <OrderCard
                      key={order.orderNo}
                      order={order}
                      onViewDetails={handleViewDetails}
                    />
                  ))
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <Footer />

      <OrderDetailsDialog
        order={selectedOrder}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default MyOrders;
