import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface Location {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
  type: "flight" | "hotel" | "ticket";
}

interface TripMapProps {
  locations: Location[];
}

const TripMap = ({ locations }: TripMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState(
    localStorage.getItem("mapbox_token") || ""
  );
  const [tokenInput, setTokenInput] = useState("");
  const [isTokenSet, setIsTokenSet] = useState(!!mapboxToken);

  const handleSetToken = () => {
    if (tokenInput.trim()) {
      localStorage.setItem("mapbox_token", tokenInput.trim());
      setMapboxToken(tokenInput.trim());
      setIsTokenSet(true);
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !isTokenSet || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: locations.length > 0 ? locations[0].coordinates : [116.4074, 39.9042],
        zoom: 10,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // 添加标记
      locations.forEach((location) => {
        const color =
          location.type === "flight"
            ? "#3b82f6"
            : location.type === "hotel"
            ? "#22c55e"
            : "#f97316";

        const el = document.createElement("div");
        el.className = "custom-marker";
        el.style.width = "30px";
        el.style.height = "30px";
        el.style.borderRadius = "50%";
        el.style.backgroundColor = color;
        el.style.border = "3px solid white";
        el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
        el.style.cursor = "pointer";

        new mapboxgl.Marker(el)
          .setLngLat(location.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div style="padding: 8px;">
                <h3 style="font-weight: bold; margin-bottom: 4px;">${location.name}</h3>
                <p style="font-size: 12px; color: #666;">
                  ${
                    location.type === "flight"
                      ? "航班"
                      : location.type === "hotel"
                      ? "酒店"
                      : "景点"
                  }
                </p>
              </div>`
            )
          )
          .addTo(map.current!);
      });

      // 如果有多个位置，调整视图以包含所有标记
      if (locations.length > 1) {
        const bounds = new mapboxgl.LngLatBounds();
        locations.forEach((loc) => bounds.extend(loc.coordinates));
        map.current.fitBounds(bounds, { padding: 50 });
      }
    } catch (error) {
      console.error("地图初始化失败:", error);
    }

    return () => {
      map.current?.remove();
    };
  }, [locations, isTokenSet, mapboxToken]);

  if (!isTokenSet) {
    return (
      <Card className="p-6 h-full flex flex-col items-center justify-center">
        <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">配置地图服务</h3>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          请输入您的 Mapbox Access Token 以使用地图功能
          <br />
          <a
            href="https://account.mapbox.com/access-tokens/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            前往 Mapbox 获取 Token
          </a>
        </p>
        <div className="w-full max-w-md space-y-4">
          <div>
            <Label htmlFor="mapbox-token">Mapbox Access Token</Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="pk.ey..."
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="mt-2"
            />
          </div>
          <Button onClick={handleSetToken} className="w-full">
            保存并加载地图
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      {locations.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">暂无位置信息</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripMap;