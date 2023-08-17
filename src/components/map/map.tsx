import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { City } from '../../types/city';
import { OfferPreview } from '../../types/offer-preview';
import { useRef, useEffect } from 'react';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../utils/common';

type MapProps = {
  block: string;
  city: City;
  offers: OfferPreview[];
  selectedOfferId: OfferPreview['id'] | undefined;
};

const getMarkerIcon = (url: string) =>
  new Icon({
    iconUrl: url,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

function Map({ block, city, offers, selectedOfferId }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            offer.id === selectedOfferId
              ? getMarkerIcon(URL_MARKER_CURRENT)
              : getMarkerIcon(URL_MARKER_DEFAULT)
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOfferId]);

  return (
    <section
      className={`${block}__map map`}
      ref={mapRef}
      style={{
        height: '100%',
        width: '100%',
        minHeight: '500px',
        maxWidth: '1140px',
        margin: '0 auto 50px',
      }}
    />
  );
}

export default Map;
