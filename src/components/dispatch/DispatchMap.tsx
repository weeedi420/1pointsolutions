import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from "@/hooks/use-toast";

interface Location {
  lat: number;
  lng: number;
  title: string;
}

const DispatchMap = ({ locations = [] }: { locations?: Location[] }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-98.5795, 39.8283], // US center
      zoom: 3
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each location
    locations.forEach(location => {
      new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .setPopup(new mapboxgl.Popup().setHTML(location.title))
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [locations, mapboxToken]);

  return (
    <div className="space-y-4">
      {!mapboxToken && (
        <div className="p-4 bg-yellow-50 rounded-lg">
          <input
            type="text"
            placeholder="Enter your Mapbox public token"
            className="w-full p-2 border rounded"
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <p className="text-sm text-yellow-600 mt-2">
            Please enter your Mapbox public token. You can find it in your Mapbox account dashboard.
          </p>
        </div>
      )}
      <div ref={mapContainer} className="h-[500px] rounded-lg shadow-lg" />
    </div>
  );
};

export default DispatchMap;