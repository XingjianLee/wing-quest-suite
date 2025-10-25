import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, Wifi, Utensils, Tv, MapPin } from "lucide-react";

interface FlightCardProps {
  flight: any;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const navigate = useNavigate();
  
  const facilityIcons = {
    wifi: <Wifi className="h-4 w-4" />,
    meal: <Utensils className="h-4 w-4" />,
    tv: <Tv className="h-4 w-4" />
  };

  const handleSelect = () => {
    navigate("/order-flight", { state: { flight } });
  };

  // Direct flight
  if (flight.direct) {
    return (
      <div className="bg-card rounded-xl shadow-card hover:shadow-card-hover border border-border/50 transition-all duration-300 hover:-translate-y-1 group">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{flight.airline}</h3>
              <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            {/* Departure */}
            <div className="flex-1">
              <div className="text-3xl font-bold text-foreground">{flight.departure.time}</div>
              <div className="text-sm text-muted-foreground mt-1">{flight.departure.airport}</div>
              <div className="text-xs text-muted-foreground">{flight.departure.code}</div>
            </div>

            {/* Duration */}
            <div className="flex-1 px-6">
              <div className="flex flex-col items-center">
                <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {flight.duration}
                </div>
                <div className="w-full h-0.5 bg-gradient-accent relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full" />
                </div>
                <div className="text-xs text-accent mt-2 font-medium">直达</div>
              </div>
            </div>

            {/* Arrival */}
            <div className="flex-1 text-right">
              <div className="text-3xl font-bold text-foreground">{flight.arrival.time}</div>
              <div className="text-sm text-muted-foreground mt-1">{flight.arrival.airport}</div>
              <div className="text-xs text-muted-foreground">{flight.arrival.code}</div>
            </div>
          </div>

          {/* Facilities and Price */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-3">
              {flight.facilities.map((facility: string) => (
                <div
                  key={facility}
                  className="flex items-center gap-1 text-muted-foreground"
                  title={facility}
                >
                  {facilityIcons[facility as keyof typeof facilityIcons]}
                </div>
              ))}
              <span className="text-sm text-muted-foreground ml-2">
                剩余 {flight.seats} 座
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-bold text-accent">¥{flight.price}</div>
                <div className="text-xs text-muted-foreground">含税费</div>
              </div>
              <Button 
                className="bg-gradient-accent hover:shadow-accent transition-all group-hover:scale-105"
                onClick={handleSelect}
              >
                选择
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Connecting flight
  return (
    <div className="bg-card rounded-xl shadow-card hover:shadow-card-hover border border-border/50 transition-all duration-300 hover:-translate-y-1 group">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
            <Plane className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">中转航班</h3>
            <p className="text-sm text-muted-foreground">
              {flight.segments.length} 个航段
            </p>
          </div>
        </div>

        {/* Flight segments */}
        <div className="space-y-4 mb-4">
          {flight.segments.map((segment: any, index: number) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                {/* Departure */}
                <div className="flex-1">
                  <div className="text-2xl font-bold text-foreground">{segment.departure.time}</div>
                  <div className="text-sm text-muted-foreground mt-1">{segment.departure.airport}</div>
                  <div className="text-xs text-muted-foreground">{segment.departure.code}</div>
                </div>

                {/* Duration */}
                <div className="flex-1 px-4">
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {segment.duration}
                    </div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-accent/50 to-accent relative">
                      <Plane className="absolute -top-2 right-0 h-4 w-4 text-accent" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">{segment.flightNumber}</div>
                  </div>
                </div>

                {/* Arrival */}
                <div className="flex-1 text-right">
                  <div className="text-2xl font-bold text-foreground">{segment.arrival.time}</div>
                  <div className="text-sm text-muted-foreground mt-1">{segment.arrival.airport}</div>
                  <div className="text-xs text-muted-foreground">{segment.arrival.code}</div>
                </div>
              </div>

              {/* Transfer info */}
              {index < flight.segments.length - 1 && (
                <div className="flex items-center justify-center gap-2 py-3 my-2 bg-secondary/50 rounded-lg">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    在 {segment.arrival.airport} 中转 · 停留 {flight.transferTime}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Total info */}
        <div className="bg-secondary/30 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">总飞行时间</span>
            <span className="font-medium text-foreground">{flight.totalDuration}</span>
          </div>
        </div>

        {/* Facilities and Price */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-3">
            {flight.facilities.map((facility: string) => (
              <div
                key={facility}
                className="flex items-center gap-1 text-muted-foreground"
                title={facility}
              >
                {facilityIcons[facility as keyof typeof facilityIcons]}
              </div>
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              剩余 {flight.seats} 座
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-3xl font-bold text-accent">¥{flight.price}</div>
              <div className="text-xs text-muted-foreground">含税费</div>
            </div>
            <Button 
              className="bg-gradient-accent hover:shadow-accent transition-all group-hover:scale-105"
              onClick={handleSelect}
            >
              选择
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
