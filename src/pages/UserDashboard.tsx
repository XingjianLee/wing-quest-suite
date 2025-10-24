import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { 
  Plane, 
  Hotel, 
  Footprints,
  Tent,
  Bike,
  Waves,
  ArrowRightLeft,
  Clock,
  Star,
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Mountain
} from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [origin, setOrigin] = useState("成都");
  const [destination, setDestination] = useState("上海");
  const [activeActivity, setActiveActivity] = useState<string | null>(null);

  const activities = [
    { id: "hiking", name: "徒步", icon: Footprints },
    { id: "kayaking", name: "皮划艇", icon: Waves },
    { id: "camping", name: "露营", icon: Tent },
    { id: "cycling", name: "骑行", icon: Bike },
  ];

  const trips = [
    {
      id: 1,
      title: "四姑娘山长坪沟徒步",
      description: "穿越原始森林，观赏雪山美景",
      duration: "2天1夜",
      distance: "12公里",
      rating: 4.8,
      image: "mountain",
      price: "¥688"
    },
    {
      id: 2,
      title: "海螺沟冰川探险",
      description: "近距离接触千年冰川奇观",
      duration: "3天2夜",
      distance: "8公里",
      rating: 4.9,
      image: "glacier",
      price: "¥1288"
    },
    {
      id: 3,
      title: "稻城亚丁环线游",
      description: "探索香格里拉秘境",
      duration: "5天4夜",
      distance: "35公里",
      rating: 4.7,
      image: "valley",
      price: "¥2688"
    }
  ];

  const flights = [
    {
      id: 1,
      airline: "四川航空",
      flightNo: "3U8888",
      departure: "08:30",
      arrival: "11:00",
      duration: "2h30m",
      price: "¥580",
      seat: "经济舱",
      gate: "T2-A12"
    },
    {
      id: 2,
      airline: "东方航空",
      flightNo: "MU5432",
      departure: "13:15",
      arrival: "15:45",
      duration: "2h30m",
      price: "¥650",
      seat: "经济舱",
      gate: "T2-B08"
    },
    {
      id: 3,
      airline: "国航",
      flightNo: "CA1234",
      departure: "18:20",
      arrival: "20:50",
      duration: "2h30m",
      price: "¥720",
      seat: "经济舱",
      gate: "T2-C15"
    }
  ];

  const hotels = [
    {
      id: 1,
      name: "川西度假酒店",
      location: "四姑娘山镇",
      rating: 4.8,
      reviews: 1256,
      roomType: "豪华大床房",
      price: "¥388",
      amenities: ["免费WiFi", "停车场", "早餐"]
    },
    {
      id: 2,
      name: "雪山观景民宿",
      location: "海螺沟景区",
      rating: 4.9,
      reviews: 892,
      roomType: "观景标准间",
      price: "¥568",
      amenities: ["免费WiFi", "观景台", "早餐"]
    },
    {
      id: 3,
      name: "稻城亚丁精品客栈",
      location: "亚丁村",
      rating: 4.7,
      reviews: 2134,
      roomType: "藏式大床房",
      price: "¥688",
      amenities: ["免费WiFi", "氧气供应", "早餐"]
    }
  ];

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar isLoggedIn={true} />
      
      <main className="container mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧边栏 - 主题导航与核心推荐 */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mountain className="w-6 h-6 text-primary" />
                  <Badge variant="secondary">川西</Badge>
                </div>
                <CardTitle className="text-xl">户外探险主题</CardTitle>
                <CardDescription>发现大自然的魅力</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-muted-foreground">活动类型</h4>
                  <div className="flex flex-wrap gap-2">
                    {activities.map((activity) => (
                      <Button
                        key={activity.id}
                        variant={activeActivity === activity.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveActivity(activity.id === activeActivity ? null : activity.id)}
                        className="gap-1"
                      >
                        <activity.icon className="w-4 h-4" />
                        {activity.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-muted-foreground">精选行程</h4>
                  {trips.map((trip) => (
                    <Card key={trip.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-32 bg-gradient-primary flex items-center justify-center">
                        <Mountain className="w-12 h-12 text-white/80" />
                      </div>
                      <CardContent className="p-4">
                        <h5 className="font-semibold mb-1">{trip.title}</h5>
                        <p className="text-sm text-muted-foreground mb-3">{trip.description}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {trip.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {trip.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current text-yellow-500" />
                            {trip.rating}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">{trip.price}</span>
                          <Button size="sm" className="gap-1">
                            立即出发
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 中间栏 - 航班搜索与票务系统 */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  航班搜索
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 航线选择器 */}
                <div className="flex items-center gap-2">
                  <Input
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="出发地"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSwap}
                    className="flex-shrink-0"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </Button>
                  <Input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="目的地"
                    className="flex-1"
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => navigate("/book-flight")}
                >
                  <CalendarIcon className="w-4 h-4" />
                  前往完整搜索页面
                </Button>

                <Separator />

                {/* 日期选择器 */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">选择日期</h4>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border p-3 pointer-events-auto"
                  />
                  {selectedDate && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        {selectedDate.toLocaleDateString('zh-CN')} 最低价
                      </p>
                      <p className="text-2xl font-bold text-primary">¥580</p>
                    </div>
                  )}
                </div>

                <Separator />

                {/* 航班列表 */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">可用航班</h4>
                  {flights.map((flight) => (
                    <Card key={flight.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold">{flight.airline}</p>
                            <p className="text-xs text-muted-foreground">{flight.flightNo}</p>
                          </div>
                          <Badge variant="outline">{flight.seat}</Badge>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-center">
                            <p className="text-lg font-bold">{flight.departure}</p>
                            <p className="text-xs text-muted-foreground">{origin}</p>
                          </div>
                          <div className="flex-1 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <div className="h-px bg-border flex-1" />
                              <Plane className="w-4 h-4 text-muted-foreground" />
                              <div className="h-px bg-border flex-1" />
                            </div>
                            <p className="text-xs text-center text-muted-foreground mt-1">
                              {flight.duration}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold">{flight.arrival}</p>
                            <p className="text-xs text-muted-foreground">{destination}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">登机口: {flight.gate}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-primary">{flight.price}</span>
                            <Button size="sm">预订</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧栏 - 目的地详情与住宿信息 */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  目的地详情
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">川西高原</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    川西是四川西部的高原地区，以其壮丽的自然风光和独特的藏族文化闻名。这里有雪山、草原、森林、湖泊，是户外探险和摄影爱好者的天堂。
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-semibold mb-2 flex items-center gap-1">
                        <Star className="w-4 h-4 text-primary" />
                        知名景点
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">四姑娘山</Badge>
                        <Badge variant="secondary">稻城亚丁</Badge>
                        <Badge variant="secondary">海螺沟</Badge>
                        <Badge variant="secondary">新都桥</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-semibold mb-2">特色美食</h5>
                      <p className="text-sm text-muted-foreground">
                        酥油茶、青稞酒、牦牛肉、糌粑、藏式火锅
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-semibold mb-2">人文特色</h5>
                      <p className="text-sm text-muted-foreground">
                        藏族文化浓郁，寺庙众多，民风淳朴，是体验藏族生活方式的理想之地
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 住宿推荐 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                      <Hotel className="w-4 h-4" />
                      住宿推荐
                    </h4>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate("/book-hotel")}
                    >
                      查看更多
                    </Button>
                  </div>
                  
                  {hotels.map((hotel) => (
                    <Card key={hotel.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h5 className="font-semibold mb-1">{hotel.name}</h5>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {hotel.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="w-3 h-3 fill-current text-yellow-500" />
                              <span className="text-sm font-semibold">{hotel.rating}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{hotel.reviews}条评价</p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{hotel.roomType}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {hotel.amenities.map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-primary">{hotel.price}</span>
                            <span className="text-xs text-muted-foreground">/晚</span>
                          </div>
                          <Button size="sm">查看详情</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
