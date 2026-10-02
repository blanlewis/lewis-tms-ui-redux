"use client";

import { useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import type { Map as LeafletMap, LatLngBoundsExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FlagCircleSharpIcon from "@mui/icons-material/FlagCircleSharp";
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";
import { useCustomHook } from "@/app/utils/customHook/hook";

// Leaflet needs a plain HTML icon, so a MUI icon is rendered to a marker once here.
const createMuiMarkerIcon = (icon: React.ReactElement, size: number) =>
  L.divIcon({
    className: "",
    html: renderToStaticMarkup(icon),
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

const MapComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  const { analyseOnMapBookingId } = useCustomHook();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const resizeObserver = new ResizeObserver(() => {
      mapRef.current?.invalidateSize();
    });
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  const sourceLat = analyseOnMapBookingId.source.lat;
  const sourceLong = analyseOnMapBookingId.source.long;
  const destinationLat = analyseOnMapBookingId.destination.lat;
  const destinationLong = analyseOnMapBookingId.destination.long;

  useEffect(() => {
    if (
      !mapRef.current ||
      sourceLat === null ||
      sourceLong === null ||
      destinationLat === null ||
      destinationLong === null
    ) {
      return;
    }
    const bounds: LatLngBoundsExpression = [
      [sourceLat, sourceLong],
      [destinationLat, destinationLong],
    ];
    mapRef.current.fitBounds(bounds, {
      padding: [50, 50],
    });
  }, [
    sourceLat,
    sourceLong,
    destinationLat,
    destinationLong,
  ]);

  const sourceIcon = createMuiMarkerIcon(
    <FlagCircleSharpIcon sx={{ color: "#1976d2", fontSize: 28 }} />,
    28
  );

  const destinationIcon = createMuiMarkerIcon(
    <LocalShippingSharpIcon sx={{ color: "#0D47A1", fontSize: 24 }} />,
    28
  );

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <MapContainer
        ref={mapRef}
        center={[20.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom={true}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {sourceLat !== null &&
          sourceLong !== null &&
          destinationLat !== null &&
          destinationLong !== null && (
            <>
              <Marker
                position={[sourceLat, sourceLong]}
                icon={sourceIcon}
              />

              <Marker
                position={[destinationLat, destinationLong]}
                icon={destinationIcon}
              />
            </>
          )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;