import { useEffect, useRef, Fragment } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import FlagIcon from "@mui/icons-material/Flag";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import { VehicleTypes } from "@/app/utils/types";

const pinStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "30px",
  height: "30px",
  background: "white",
  borderRadius: "50%",
  boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
};

const startMarkerIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div style={pinStyle}>
      <FlagIcon style={{ fontSize: "18px", color: "#2e7d32" }} />
    </div>
  ),
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const endMarkerIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div style={pinStyle}>
      <SportsScoreIcon style={{ fontSize: "18px", color: "#1565c0" }} />
    </div>
  ),
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const InvalidateSizeOnResize = () => {
  const map = useMap();

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });

    observer.observe(map.getContainer());

    return () => observer.disconnect();
  }, [map]);

  return null;
};

const MapClickHandler = ({
  onMapClick,
}: {
  onMapClick: () => void;
}) => {
  useMapEvents({
    click() {
      onMapClick();
    },
  });

  return null;
};

const FollowSelectedVehicle = ({
  selectedVehicle,
}: {
  selectedVehicle: VehicleTypes | null;
}) => {
  const map = useMap();
  const prevIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!selectedVehicle) {
      if (prevIdRef.current !== null) {
        // Deselected — zoom back out to overview
        map.flyTo([20.5937, 78.9629], 5, { animate: true, duration: 1.2 });
      }
      prevIdRef.current = null;
      return;
    }

    const pos: [number, number] = [
      selectedVehicle.currentLocation.latitude,
      selectedVehicle.currentLocation.longitude,
    ];

    if (prevIdRef.current !== selectedVehicle.id) {
      // New vehicle selected — zoom in smoothly
      map.flyTo(pos, 17, { animate: true, duration: 1.2 });
      prevIdRef.current = selectedVehicle.id;
    } else {
      // Same vehicle moving via slider — smooth pan, no zoom change
      map.panTo(pos, { animate: true, duration: 0.5 });
    }
  }, [
    map,
    selectedVehicle?.id,
    selectedVehicle?.currentLocation.latitude,
    selectedVehicle?.currentLocation.longitude,
  ]);

  return null;
};

interface MapComponentProps {
  vehicles: VehicleTypes[];
  selectedVehicle: VehicleTypes | null;
  sliderValue: number;
  onVehicleClick: (vehicle: VehicleTypes) => void;
  onMapClick: () => void;
}

const MapComponent = ({
  vehicles,
  selectedVehicle,
  sliderValue,
  onVehicleClick,
  onMapClick,
}: MapComponentProps) => {
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      scrollWheelZoom
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <InvalidateSizeOnResize />

      <FollowSelectedVehicle
        selectedVehicle={selectedVehicle}
      />

      <MapClickHandler onMapClick={onMapClick} />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {vehicles.map((vehicle) => {
        const iconHtml = renderToStaticMarkup(
          vehicle.icon as React.ReactElement
        );

        const divIcon = L.divIcon({
          html: `
            <div
              style="
                color:${selectedVehicle?.id === vehicle.id ? "#d32f2f" : "#1976d2"};
                display:flex;
                align-items:center;
                justify-content:center;
                width:34px;
                height:34px;
                background:white;
                border-radius:50%;
                box-shadow:0 2px 6px rgba(0,0,0,.35);
              "
            >
              ${iconHtml}
            </div>
          `,
          className: "",
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        });

        const tripCoordinates = vehicle.tripLocations.map((location) => [
          location.latitude,
          location.longitude,
        ]) as [number, number][];

        const currentPoint: [number, number] = [
          vehicle.currentLocation.latitude,
          vehicle.currentLocation.longitude,
        ];

        const coveredIndex =
          selectedVehicle?.id === vehicle.id
            ? Math.min(
                Math.floor((sliderValue / 100) * (tripCoordinates.length - 1)),
                tripCoordinates.length - 2
              )
            : 0;

        // Anchor both polylines on the marker's exact (interpolated) position so the
        // covered/uncovered split lines up precisely with the scooter icon.
        const coveredCoords = [
          ...tripCoordinates.slice(0, coveredIndex + 1),
          currentPoint,
        ];
        const uncoveredCoords = [
          currentPoint,
          ...tripCoordinates.slice(coveredIndex + 1),
        ];

        return (
          <Fragment key={vehicle.id}>
            <Polyline
              key={`uncovered-${vehicle.id}`}
              positions={uncoveredCoords}
              pathOptions={{ color: "#90caf9", weight: 6 }}
            />
            {coveredIndex > 0 && (
              <Polyline
                key={`covered-${vehicle.id}`}
                positions={coveredCoords}
                pathOptions={{ color: "#0d47a1", weight: 6 }}
              />
            )}

            <Marker
              key={vehicle.id}
              position={[
                vehicle.currentLocation.latitude,
                vehicle.currentLocation.longitude,
              ]}
              icon={divIcon}
              eventHandlers={{
                click: () => onVehicleClick(vehicle),
              }}
            />
            {selectedVehicle?.id === vehicle.id && (
              <>
                <Marker
                  key={`start-${vehicle.id}`}
                  position={[vehicle.tripLocations[0].latitude, vehicle.tripLocations[0].longitude]}
                  icon={startMarkerIcon}
                />
                <Marker
                  key={`end-${vehicle.id}`}
                  position={[vehicle.tripLocations[vehicle.tripLocations.length - 1].latitude, vehicle.tripLocations[vehicle.tripLocations.length - 1].longitude]}
                  icon={endMarkerIcon}
                />
              </>
            )}
          </Fragment>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;