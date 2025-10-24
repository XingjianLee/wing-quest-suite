import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, MapPin, Clock, User, CheckCircle2 } from "lucide-react";
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

const CheckIn = () => {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [checkedIn, setCheckedIn] = useState(false);

  const handleSeatSelect = (seat: string) => {
    if (occupiedSeats.includes(seat)) {
      toast.error("该座位已被占用");
      return;
    }
    setSelectedSeat(seat);
  };

  const handleCheckIn = () => {
    if (!selectedSeat) {
      toast.error("请先选择座位");
      return;
    }
    setCheckedIn(true);
    toast.success("值机成功！");
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

          {/* Seat Selection */}
          {!checkedIn ? (
            <Card>
              <CardHeader>
                <CardTitle>选择座位</CardTitle>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border-2 border-primary bg-background"></div>
                    <span>可选</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-primary"></div>
                    <span>已选</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-muted"></div>
                    <span>已占用</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full">
                    {/* Column headers */}
                    <div className="flex gap-2 justify-center mb-4">
                      <div className="w-8"></div>
                      {columns.slice(0, 3).map((col) => (
                        <div key={col} className="w-10 text-center font-medium text-sm">
                          {col}
                        </div>
                      ))}
                      <div className="w-12"></div>
                      {columns.slice(3).map((col) => (
                        <div key={col} className="w-10 text-center font-medium text-sm">
                          {col}
                        </div>
                      ))}
                    </div>

                    {/* Seat rows */}
                    <div className="space-y-2">
                      {Array.from({ length: totalRows }, (_, i) => i + 1).map((row) => (
                        <div key={row} className="flex gap-2 justify-center items-center">
                          <div className="w-8 text-center text-sm font-medium text-muted-foreground">
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
                                className={`w-10 h-10 rounded text-xs font-medium transition-all ${
                                  status === "occupied"
                                    ? "bg-muted cursor-not-allowed"
                                    : status === "selected"
                                    ? "bg-primary text-primary-foreground"
                                    : "border-2 border-primary hover:bg-primary/10"
                                } ${exitRows.includes(row) ? "ring-2 ring-accent" : ""}`}
                              >
                                {seatId}
                              </button>
                            );
                          })}
                          <div className="w-12"></div>
                          {columns.slice(3).map((col) => {
                            const seatId = `${row}${col}`;
                            const status = getSeatStatus(seatId);
                            return (
                              <button
                                key={seatId}
                                onClick={() => handleSeatSelect(seatId)}
                                disabled={status === "occupied"}
                                className={`w-10 h-10 rounded text-xs font-medium transition-all ${
                                  status === "occupied"
                                    ? "bg-muted cursor-not-allowed"
                                    : status === "selected"
                                    ? "bg-primary text-primary-foreground"
                                    : "border-2 border-primary hover:bg-primary/10"
                                } ${exitRows.includes(row) ? "ring-2 ring-accent" : ""}`}
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

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    {selectedSeat && (
                      <div className="text-lg">
                        已选座位：<span className="font-bold text-primary">{selectedSeat}</span>
                      </div>
                    )}
                  </div>
                  <Button onClick={handleCheckIn} size="lg" disabled={!selectedSeat}>
                    确认值机
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 border-primary">
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <CheckCircle2 className="h-16 w-16 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">值机成功！</h2>
                  <p className="text-muted-foreground">您的座位是 {selectedSeat}</p>
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