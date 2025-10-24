import { useState } from "react";
import { Search, MapPin, Calendar, Users, SlidersHorizontal, Star, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const propertyTypes = [
  { icon: "🏠", label: "Villa", value: "villa" },
  { icon: "🏨", label: "Hotel", value: "hotel" },
  { icon: "🏢", label: "Apartment", value: "apartment" },
  { icon: "🏡", label: "Guesthouse", value: "guesthouse" },
  { icon: "🎫", label: "Voucher", value: "voucher" },
  { icon: "💰", label: "BIG DEAL", value: "deal" },
  { icon: "✅", label: "To Do", value: "todo" },
];

const mockHotels = [
  {
    id: 1,
    name: "Beautiful Malibu Mansion",
    location: "2464 Royal Ln. Mesa, New Jersey 45463",
    rating: 4.8,
    beds: 3,
    baths: 1,
    price: 620,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
  },
  {
    id: 2,
    name: "Starlit Summit Cabin",
    location: "2464 Royal Ln. Mesa, New Jersey 45463",
    rating: 4.8,
    beds: 3,
    baths: 1,
    price: 520,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    id: 3,
    name: "Moonlit Timber Haven",
    location: "2464 Royal Ln. Mesa, New Jersey 45463",
    rating: 4.8,
    beds: 3,
    baths: 1,
    price: 540,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  },
  {
    id: 4,
    name: "Crystal Lake Hideout",
    location: "2464 Royal Ln. Mesa, New Jersey 45463",
    rating: 4.8,
    beds: 3,
    baths: 2,
    price: 620,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
  },
];

const BookHotel = () => {
  const [location, setLocation] = useState("Toronto, Canada");
  const [checkIn, setCheckIn] = useState("Jan. 5, 2024");
  const [checkOut, setCheckOut] = useState("Jan. 25, 2024");
  const [guests, setGuests] = useState("4 Adults");
  const [priceRange, setPriceRange] = useState([120, 700]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["villa"]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isLoggedIn={true} />
      
      {/* Hero Section with Search */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background pt-24 pb-12">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Enjoy your journey without limits
            </h1>
            <p className="text-muted-foreground text-lg">
              Find accommodations and exciting experiences
            </p>
          </div>

          {/* Search Bar */}
          <Card className="max-w-5xl mx-auto p-2 shadow-lg border-primary/20">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-md bg-accent/5">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                  placeholder="Where"
                />
              </div>
              <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-md bg-accent/5">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <Input
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                  placeholder="Check-in"
                />
              </div>
              <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-md bg-accent/5">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <Input
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                  placeholder="Check-out"
                />
              </div>
              <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-md bg-accent/5">
                <Users className="w-5 h-5 text-muted-foreground" />
                <Input
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                  placeholder="Guests"
                />
              </div>
              <Button size="lg" className="gap-2 px-8">
                <Search className="w-5 h-5" />
                Search
              </Button>
            </div>
          </Card>

          {/* Property Types */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {propertyTypes.map((type) => (
              <Card
                key={type.value}
                className={`px-6 py-4 cursor-pointer transition-all hover:shadow-md hover:scale-105 ${
                  selectedTypes.includes(type.value)
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card hover:bg-accent/10"
                }`}
                onClick={() =>
                  setSelectedTypes((prev) =>
                    prev.includes(type.value)
                      ? prev.filter((t) => t !== type.value)
                      : [...prev, type.value]
                  )
                }
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <div className="text-sm font-medium">{type.label}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 shrink-0">
              <Card className="p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm">Clear all (3)</Button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <Label className="mb-4 block font-semibold">Price range</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    The average total price for 12 nights is $2,694
                  </p>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000}
                      step={10}
                      className="mb-4"
                    />
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label className="text-xs">Minimum</Label>
                        <div className="flex items-center gap-2 border rounded-md px-3 py-2 mt-1">
                          <span className="text-muted-foreground">$</span>
                          <span>{priceRange[0]}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <Label className="text-xs">Maximum</Label>
                        <div className="flex items-center gap-2 border rounded-md px-3 py-2 mt-1">
                          <span className="text-muted-foreground">$</span>
                          <span>{priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Type of place */}
                <div className="mb-6">
                  <Label className="mb-4 block font-semibold">Type of place</Label>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Checkbox id="entire" defaultChecked />
                      <div className="space-y-1">
                        <label htmlFor="entire" className="text-sm font-medium leading-none">
                          Entire place
                        </label>
                        <p className="text-sm text-muted-foreground">
                          A place all to yourself
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox id="room" defaultChecked />
                      <div className="space-y-1">
                        <label htmlFor="room" className="text-sm font-medium leading-none">
                          Room
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Your own room, plus access to shared spaces
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rooms and beds */}
                <div className="mb-6">
                  <Label className="mb-4 block font-semibold">Rooms and beds</Label>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm mb-2 block">Bedrooms</Label>
                      <div className="flex gap-2">
                        {["Any", "1", "2", "3", "4", "5"].map((num) => (
                          <Button
                            key={num}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm mb-2 block">Beds</Label>
                      <div className="flex gap-2">
                        {["Any", "1", "2", "3", "4", "5"].map((num) => (
                          <Button
                            key={num}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property type */}
                <div>
                  <Label className="mb-4 block font-semibold">Property type</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="justify-start gap-2">
                      🏠 House
                    </Button>
                    <Button variant="outline" className="justify-start gap-2">
                      🏢 Apartment
                    </Button>
                    <Button variant="outline" className="justify-start gap-2">
                      🏡 Villa
                    </Button>
                    <Button variant="outline" className="justify-start gap-2">
                      🏨 Hotel
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Results Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    Found 1024 results near <span className="text-primary">Toronto, Canada</span>
                  </h2>
                </div>
                <div className="flex gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      {/* Mobile filters - same content as sidebar */}
                    </SheetContent>
                  </Sheet>
                  <Button variant="outline" size="sm">Latest</Button>
                  <Button variant="outline" size="sm">Map View</Button>
                  <Button variant="outline" size="sm">Card View</Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {mockHotels.map((hotel) => (
                  <Card key={hotel.id} className="overflow-hidden group hover:shadow-xl transition-all cursor-pointer">
                    <div className="relative">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
                      >
                        <Heart className="w-5 h-5" />
                      </Button>
                      <Badge className="absolute top-3 left-3 gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {hotel.rating}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {hotel.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 flex items-start gap-1">
                        <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                        {hotel.location}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>🛏️ {hotel.beds} bed</span>
                          <span>🚿 {hotel.baths} bath</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            ${hotel.price}
                            <span className="text-sm font-normal text-muted-foreground">/night</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {[1, 2, 3, "...", 8, 9, 10].map((page, idx) => (
                  <Button
                    key={idx}
                    variant={page === 1 ? "default" : "outline"}
                    size="icon"
                    disabled={page === "..."}
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookHotel;
