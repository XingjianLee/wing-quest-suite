import { useState } from "react";
import Navbar from "@/components/Navbar";
import FlightSearchBar from "@/components/FlightSearchBar";
import FlightFilters from "@/components/FlightFilters";
import FlightCard from "@/components/FlightCard";

// Mock flight data
const mockFlights = [
  {
    id: 1,
    airline: "中国国航",
    flightNumber: "CA1234",
    departure: {
      airport: "北京首都国际机场",
      code: "PEK",
      time: "08:00",
      date: "2024-11-15"
    },
    arrival: {
      airport: "上海浦东国际机场",
      code: "PVG",
      time: "10:30",
      date: "2024-11-15"
    },
    duration: "2h 30m",
    price: 1280,
    cabinClass: "economy",
    direct: true,
    facilities: ["wifi", "meal"],
    seats: 23
  },
  {
    id: 2,
    airline: "东方航空",
    flightNumber: "MU5678",
    departure: {
      airport: "北京首都国际机场",
      code: "PEK",
      time: "10:15",
      date: "2024-11-15"
    },
    arrival: {
      airport: "上海浦东国际机场",
      code: "PVG",
      time: "12:50",
      date: "2024-11-15"
    },
    duration: "2h 35m",
    price: 980,
    cabinClass: "economy",
    direct: true,
    facilities: ["meal"],
    seats: 15
  },
  {
    id: 3,
    segments: [
      {
        airline: "南方航空",
        flightNumber: "CZ3456",
        departure: {
          airport: "北京首都国际机场",
          code: "PEK",
          time: "14:30",
          date: "2024-11-15"
        },
        arrival: {
          airport: "武汉天河国际机场",
          code: "WUH",
          time: "16:45",
          date: "2024-11-15"
        },
        duration: "2h 15m"
      },
      {
        airline: "南方航空",
        flightNumber: "CZ7890",
        departure: {
          airport: "武汉天河国际机场",
          code: "WUH",
          time: "18:20",
          date: "2024-11-15"
        },
        arrival: {
          airport: "上海浦东国际机场",
          code: "PVG",
          time: "20:10",
          date: "2024-11-15"
        },
        duration: "1h 50m"
      }
    ],
    totalDuration: "5h 40m",
    transferTime: "1h 35m",
    price: 750,
    cabinClass: "economy",
    direct: false,
    facilities: ["wifi", "meal", "tv"],
    seats: 42
  },
  {
    id: 4,
    airline: "海南航空",
    flightNumber: "HU8901",
    departure: {
      airport: "北京首都国际机场",
      code: "PEK",
      time: "16:45",
      date: "2024-11-15"
    },
    arrival: {
      airport: "上海浦东国际机场",
      code: "PVG",
      time: "19:15",
      date: "2024-11-15"
    },
    duration: "2h 30m",
    price: 1580,
    cabinClass: "business",
    direct: true,
    facilities: ["wifi", "meal", "tv"],
    seats: 8
  }
];

export default function BookFlight() {
  const [filters, setFilters] = useState({
    direct: false,
    cabinClass: "all",
    facilities: [] as string[],
    sortBy: "price",
    priceRange: [0, 5000]
  });

  const [flights] = useState(mockFlights);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  // Filter and sort flights based on current filters
  const filteredFlights = flights
    .filter(flight => {
      if (filters.direct && !flight.direct) return false;
      if (filters.cabinClass !== "all" && flight.cabinClass !== filters.cabinClass) return false;
      if (filters.facilities.length > 0) {
        const hasAllFacilities = filters.facilities.every(f => flight.facilities.includes(f));
        if (!hasAllFacilities) return false;
      }
      if (flight.price < filters.priceRange[0] || flight.price > filters.priceRange[1]) return false;
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "price") {
        return a.price - b.price;
      } else if (filters.sortBy === "duration") {
        const getDuration = (flight: any) => {
          if (flight.direct) {
            return parseInt(flight.duration);
          } else {
            return parseInt(flight.totalDuration);
          }
        };
        return getDuration(a) - getDuration(b);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar isLoggedIn={true} />
      
      {/* Fixed Search Bar */}
      <div className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-sm px-4 py-3">
        <FlightSearchBar />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <div className="w-80 flex-shrink-0">
            <FlightFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Right Content - Flight List */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                找到 {filteredFlights.length} 个航班
              </h2>
            </div>

            <div className="space-y-4">
              {filteredFlights.map(flight => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </div>

            {filteredFlights.length === 0 && (
              <div className="bg-card rounded-lg p-12 text-center shadow-card">
                <p className="text-muted-foreground text-lg">
                  没有找到符合条件的航班，请调整搜索条件
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
