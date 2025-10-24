import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Search, ArrowLeftRight, ChevronUp, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FlightSearchBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchData, setSearchData] = useState({
    from: "北京",
    to: "上海",
    departDate: "2024-11-15",
    returnDate: "",
    passengers: 1,
    cabinClass: "economy"
  });

  const handleSwap = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="bg-card rounded-xl shadow-card-hover border border-border/50 relative transition-all duration-300">
          <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'}`}>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                {/* From */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    出发地
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={searchData.from}
                      onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                      className="pl-10"
                      placeholder="城市或机场"
                    />
                  </div>
                </div>

                {/* Swap Button */}
                <div className="md:col-span-1 flex justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSwap}
                    className="rounded-full hover:bg-accent/20 hover:text-accent transition-all"
                  >
                    <ArrowLeftRight className="h-5 w-5" />
                  </Button>
                </div>

                {/* To */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    目的地
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={searchData.to}
                      onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                      className="pl-10"
                      placeholder="城市或机场"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    出发日期
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={searchData.departDate}
                      onChange={(e) => setSearchData({ ...searchData, departDate: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Passengers & Class */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    乘客 / 舱位
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        min="1"
                        value={searchData.passengers}
                        onChange={(e) => setSearchData({ ...searchData, passengers: parseInt(e.target.value) })}
                        className="pl-10"
                      />
                    </div>
                    <Select
                      value={searchData.cabinClass}
                      onValueChange={(value) => setSearchData({ ...searchData, cabinClass: value })}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">经济舱</SelectItem>
                        <SelectItem value="business">商务舱</SelectItem>
                        <SelectItem value="first">头等舱</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="md:col-span-1">
                  <Button className="w-full h-10 bg-gradient-accent hover:shadow-accent transition-all">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute bottom-2 right-2 h-8 w-8 rounded-full hover:bg-accent/20 hover:text-accent transition-all z-10"
            aria-label={isCollapsed ? "展开搜索栏" : "收起搜索栏"}
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
