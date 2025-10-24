import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plane, MapPin, Clock, User, CheckCircle2, Armchair, Luggage } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

// Fake data
const userInfo = {
  name: "张三",
  idNumber: "110101199001011234",
  phone: "138****5678",
};

const flightInfo = {
  flightNumber: "CA1234",
  airline: "中国国际航空",
  departure: {
    city: "北京",
    airport: "首都国际机场",
    terminal: "T3",
    time: "2025-11-01 14:30",
    gate: "B32",
  },
  arrival: {
    city: "上海",
    airport: "浦东国际机场",
    terminal: "T2",
    time: "2025-11-01 17:15",
  },
};

// Seat map: A-F columns, rows 1-30
const totalRows = 30;
const columns = ["A", "B", "C", "D", "E", "F"];
const exitRows = [12, 13]; // Emergency exit rows
const occupiedSeats = ["3A", "3B", "5C", "5D", "7E", "7F", "10A", "12C", "15B"];

// Baggage options
const baggageOptions = [
  { id: "none", weight: "无托运", price: 0, description: "仅携带随身行李（10kg以内）" },
  { id: "20kg", weight: "20kg", price: 150, description: "适合短途旅行" },
  { id: "30kg", weight: "30kg", price: 220, description: "适合长途旅行" },
  { id: "40kg", weight: "40kg", price: 280, description: "适合携带大量行李" },
];

const CheckIn = () => {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [selectedBaggage, setSelectedBaggage] = useState<string>("none");
  const [checkedIn, setCheckedIn] = useState(false);
  const [seatDialogOpen, setSeatDialogOpen] = useState(false);

  const handleSeatSelect = (seat: string) => {
    if (occupiedSeats.includes(seat)) {
      toast.error("该座位已被占用");
      return;
    }
    setSelectedSeat(seat);
    setSeatDialogOpen(false);
    toast.success(`已选择座位 ${seat}`);
  };

  const handleCheckIn = () => {
    if (!selectedSeat) {
      toast.error("请先选择座位");
      return;
    }
    
    const baggage = baggageOptions.find(b => b.id === selectedBaggage);
    const totalPrice = baggage?.price || 0;
    
    setCheckedIn(true);
    toast.success(`值机成功！${totalPrice > 0 ? `行李费用：¥${totalPrice}` : ""}`);
  };

  const getSeatStatus = (seat: string) => {
    if (occupiedSeats.includes(seat)) return "occupied";
    if (selectedSeat === seat) return "selected";
    return "available";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">在线值机</h1>
            <p className="text-muted-foreground">选择您的座位，快速完成值机</p>
          </div>

          {/* Flight Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                航班信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-2xl font-bold">{flightInfo.departure.city}</div>
                  <div className="text-sm text-muted-foreground">{flightInfo.departure.airport}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    {flightInfo.departure.time}
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="secondary" className="text-lg px-4 py-1">
                    {flightInfo.flightNumber}
                  </Badge>
                  <div className="text-sm text-muted-foreground">{flightInfo.airline}</div>
                </div>

                <div className="space-y-1 text-right">
                  <div className="text-2xl font-bold">{flightInfo.arrival.city}</div>
                  <div className="text-sm text-muted-foreground">{flightInfo.arrival.airport}</div>
                  <div className="flex items-center gap-2 text-sm justify-end">
                    <MapPin className="h-4 w-4" />
                    {flightInfo.arrival.time}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm">
                  <span className="text-muted-foreground">航站楼：</span>
                  <span className="font-medium">{flightInfo.departure.terminal}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">登机口：</span>
                  <span className="font-medium">{flightInfo.departure.gate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Passenger Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                乘机人信息
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">姓名</div>
                  <div className="font-medium">{userInfo.name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">身份证号</div>
                  <div className="font-medium">{userInfo.idNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">手机号</div>
                  <div className="font-medium">{userInfo.phone}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seat Selection & Baggage */}
          {!checkedIn ? (
            <>
              {/* Seat Selection Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Armchair className="h-5 w-5" />
                    座位选择
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      {selectedSeat ? (
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">已选座位</div>
                          <div className="text-2xl font-bold text-primary">{selectedSeat}</div>
                        </div>
                      ) : (
                        <div className="text-muted-foreground">未选择座位</div>
                      )}
                    </div>
                    <Dialog open={seatDialogOpen} onOpenChange={setSeatDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant={selectedSeat ? "outline" : "default"}>
                          {selectedSeat ? "重新选择" : "选择座位"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 text-white border-slate-700">
                        <DialogHeader>
                          <DialogTitle className="text-white text-center text-xl">选择座位</DialogTitle>
                          <div className="flex items-center justify-center gap-6 text-sm pt-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-slate-700 border border-slate-600"></div>
                              <span className="text-slate-300">可选</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-cyan-500"></div>
                              <span className="text-slate-300">已选</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-slate-600/50"></div>
                              <span className="text-slate-300">已占用</span>
                            </div>
                          </div>
                        </DialogHeader>
                        <div className="py-6">
                          <div className="flex justify-center">
                            <div className="relative">
                              {/* Airplane body shape */}
                              <div className="relative bg-gradient-to-b from-slate-700 via-slate-800 to-slate-700 rounded-t-[120px] rounded-b-3xl px-8 py-6 shadow-2xl">
                                {/* Airplane nose curve */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-24 bg-gradient-to-b from-slate-600 to-slate-700 rounded-t-full -translate-y-8"></div>
                                
                                {/* Left wing */}
                                <div className="absolute left-0 top-32 w-16 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-l-full -translate-x-12 shadow-lg"></div>
                                
                                {/* Right wing */}
                                <div className="absolute right-0 top-32 w-16 h-20 bg-gradient-to-bl from-slate-600 to-slate-700 rounded-r-full translate-x-12 shadow-lg"></div>
                                
                                <div className="relative pt-8 space-y-6">
                                  {/* Business Class Section */}
                                  <div className="text-center mb-4">
                                    <span className="text-slate-300 font-medium text-sm">Business Class</span>
                                  </div>
                                  
                                  {/* Column headers */}
                                  <div className="flex gap-3 justify-center mb-2">
                                    <div className="w-10"></div>
                                    {columns.slice(0, 3).map((col) => (
                                      <div key={col} className="w-12 text-center font-medium text-xs text-slate-400">
                                        {col}
                                      </div>
                                    ))}
                                    <div className="w-8"></div>
                                    {columns.slice(3).map((col) => (
                                      <div key={col} className="w-12 text-center font-medium text-xs text-slate-400">
                                        {col}
                                      </div>
                                    ))}
                              </div>

                                  {/* Seat rows */}
                                  <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                                    {Array.from({ length: totalRows }, (_, i) => i + 1).map((row) => (
                                      <div key={row} className="flex gap-3 justify-center items-center">
                                        <div className="w-10 text-center text-xs font-medium text-slate-500">
                                          {row}
                                        </div>
                                        {columns.slice(0, 3).map((col) => {
                                          const seatId = `${row}${col}`;
                                          const status = getSeatStatus(seatId);
                                          return (
                                            <button
                                              key={seatId}
                                              onClick={() => handleSeatSelect(seatId)}
                                              disabled={status === "occupied"}
                                              className={`w-12 h-12 rounded-lg text-xs font-semibold transition-all shadow-md ${
                                                status === "occupied"
                                                  ? "bg-slate-600/50 cursor-not-allowed text-slate-500"
                                                  : status === "selected"
                                                  ? "bg-cyan-500 text-white hover:bg-cyan-600 scale-105"
                                                  : "bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600 hover:border-cyan-500 hover:scale-105"
                                              } ${exitRows.includes(row) ? "ring-2 ring-yellow-500/50" : ""}`}
                                            >
                                              {seatId}
                                            </button>
                                          );
                                        })}
                                        <div className="w-8"></div>
                                        {columns.slice(3).map((col) => {
                                          const seatId = `${row}${col}`;
                                          const status = getSeatStatus(seatId);
                                          return (
                                            <button
                                              key={seatId}
                                              onClick={() => handleSeatSelect(seatId)}
                                              disabled={status === "occupied"}
                                              className={`w-12 h-12 rounded-lg text-xs font-semibold transition-all shadow-md ${
                                                status === "occupied"
                                                  ? "bg-slate-600/50 cursor-not-allowed text-slate-500"
                                                  : status === "selected"
                                                  ? "bg-cyan-500 text-white hover:bg-cyan-600 scale-105"
                                                  : "bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600 hover:border-cyan-500 hover:scale-105"
                                              } ${exitRows.includes(row) ? "ring-2 ring-yellow-500/50" : ""}`}
                                            >
                                              {seatId}
                                            </button>
                                          );
                                         })}
                                       </div>
                                     ))}
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                       </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              {/* Baggage Selection Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Luggage className="h-5 w-5" />
                    行李托运
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {baggageOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedBaggage(option.id)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedBaggage === option.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-lg">{option.weight}</div>
                            {selectedBaggage === option.id && (
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div className="text-2xl font-bold text-primary">
                            {option.price === 0 ? "免费" : `¥${option.price}`}
                          </div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">托运行李费用</div>
                        <div className="text-sm text-muted-foreground">
                          {baggageOptions.find(b => b.id === selectedBaggage)?.weight}
                        </div>
                      </div>
                      <div className="text-2xl font-bold">
                        ¥{baggageOptions.find(b => b.id === selectedBaggage)?.price || 0}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Check-in Button */}
              <div className="flex justify-center">
                <Button onClick={handleCheckIn} size="lg" className="w-full md:w-auto">
                  确认值机
                </Button>
              </div>
            </>
          ) : (
            <Card className="border-2 border-primary">
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <CheckCircle2 className="h-16 w-16 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">值机成功！</h2>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">座位：{selectedSeat}</p>
                    {selectedBaggage !== "none" && (
                      <p className="text-muted-foreground">
                        托运行李：{baggageOptions.find(b => b.id === selectedBaggage)?.weight}
                      </p>
                    )}
                  </div>
                  <div className="pt-4">
                    <Button size="lg" variant="outline">
                      查看登机牌
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckIn;