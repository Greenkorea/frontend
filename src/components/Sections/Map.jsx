import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { useModalStore, useMapStore } from "../../stores/hooks";

import AreaDetailModal from "../../components/AreaDetail";

// ─── 상수 ──────────────────────────────────────────────────────────────────

const TABS = [
  { id: "all", label: "전체 보기", file: null },
  { id: "park", label: "국립공원", file: "park.geojson" },
  { id: "wetland", label: "습지보호지역", file: "wetland.geojson" },
  { id: "ecosystem", label: "해양생태계보호구역", file: "ecosystem.geojson" },
  { id: "monument", label: "천연기념물", file: "monument.geojson" },
  { id: "reserve", label: "천연보호구역", file: "reserve.geojson" },
  { id: "unesco", label: "유네스코자연유산", file: "unesco.geojson" },
  { id: "ramsar", label: "람사르습지", file: "ramsar.geojson" },
  { id: "eco-sea", label: "환경보전해역", file: "eco_sea.geojson" },
];

const ALL_FILES = TABS.filter((t) => t.file).map((t) => t.file);

const TYPE_STYLE = {
  국립공원: {
    color: "#6ED6FF",
    weight: 2,
    opacity: 1,
    fillColor: "#6ED6FF",
    fillOpacity: 0.5,
  },
  습지보호지역: {
    color: "#219CF7",
    weight: 2,
    opacity: 1,
    fillColor: "#219CF7",
    fillOpacity: 0.5,
  },
  해양생태계보호구역: {
    color: "#AADFF8",
    weight: 2,
    opacity: 1,
    fillColor: "#AADFF8",
    fillOpacity: 0.5,
  },
  천연기념물: {
    color: "#51E7B0",
    weight: 2,
    opacity: 1,
    fillColor: "#51E7B0",
    fillOpacity: 0.5,
  },
  천연보호구역: {
    color: "#69ADEE",
    weight: 2,
    opacity: 1,
    fillColor: "#69ADEE",
    fillOpacity: 0.5,
  },
  유네스코자연유산: {
    color: "#44CEE4",
    weight: 2,
    opacity: 1,
    fillColor: "#44CEE4",
    fillOpacity: 0.5,
  },
  람사르습지: {
    color: "#0266C6",
    weight: 2,
    opacity: 1,
    fillColor: "#0266C6",
    fillOpacity: 0.5,
  },
  환경보전해역: {
    color: "#BDD239",
    weight: 2,
    opacity: 1,
    fillColor: "#BDD239",
    fillOpacity: 0.5,
  },
};

const TAB_COLORS = {
  all: "#6ED6FF",
  park: "#6ED6FF",
  wetland: "#219CF7",
  ecosystem: "#AADFF8",
  monument: "#51E7B0",
  reserve: "#69ADEE",
  unesco: "#44CEE4",
  ramsar: "#0266C6",
  "eco-sea": "#BDD239",
};

const KOREA_BOUNDS = [
  [32.5, 124.5],
  [39.0, 132.5],
];

// ─── 내부: GeoJSON 레이어 + 자동 fitBounds ──────────────────────────────────

function GeoJSONLayer({ data, onFeatureClick }) {
  const map = useMap();

  const getStyle = useCallback(
    (feature) =>
      TYPE_STYLE[feature.properties.DESIG] ?? {
        color: "#0b5394",
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.3,
      },
    [],
  );

  const onEachFeature = useCallback(
    (feature, layer) => {
      const name =
        feature.properties.ORIG_NAME ??
        feature.properties.NAME ??
        feature.properties.KOR_NM ??
        "";
      if (name) layer.bindTooltip(name, { sticky: true });

      layer.on("click", (e) => {
        L.DomEvent.stopPropagation(e);
        onFeatureClick(feature.properties);
      });
    },
    [onFeatureClick],
  );

  // 데이터가 바뀔 때 자동으로 화면 맞춤
  useEffect(() => {
    if (!data?.features?.length) return;
    try {
      const bounds = L.geoJSON(data).getBounds();
      if (bounds.isValid()) map.fitBounds(bounds, { padding: [20, 20] });
    } catch (_) {}
  }, [data, map]);

  if (!data) return null;

  // key를 features 수로 넣으면 데이터 교체 시 레이어가 완전히 재생성됨
  return (
    <GeoJSON
      key={data.features.length + "-" + data.features[0]?.properties?.DESIG}
      data={data}
      style={getStyle}
      onEachFeature={onEachFeature}
    />
  );
}

// ─── GeoJSON 로딩 훅 ─────────────────────────────────────────────────────

function useGeoData(tabId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tab = TABS.find((t) => t.id === tabId);
    setLoading(true);

    const fetchSingle = (file) =>
      fetch(`/${file}`, { cache: "no-store" }).then((r) => {
        if (!r.ok) throw new Error(`${file} 로드 실패`);
        return r.json();
      });

    if (tabId === "all") {
      Promise.all(ALL_FILES.map(fetchSingle))
        .then((jsons) => {
          const features = jsons.flatMap((j) => j.features ?? []);
          setData({ type: "FeatureCollection", features });
        })
        .finally(() => setLoading(false));
    } else if (tab?.file) {
      fetchSingle(tab.file)
        .then(setData)
        .finally(() => setLoading(false));
    }
  }, [tabId]);

  return { data, loading };
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────

export default function SectionsMap() {
  const { activeTab } = useMapStore();
  const { data, loading } = useGeoData(activeTab);
  const { openModal } = useModalStore();

  const handleFeatureClick = useCallback(
    (properties) => {
      const name =
        properties.ORIG_NAME ??
        properties.NAME ??
        properties.KOR_NM ??
        "이름 없음";
      const type = properties.DESIG ?? "유형 정보 없음";
      openModal(<AreaDetailModal name={name} type={type} />);
    },
    [openModal],
  );

  return (
    <section className="w-full flex flex-col">
      {/* 지도 */}
      <div className="relative w-full" style={{ height: 520 }}>
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
            <span className="text-14 text-gray-3">불러오는 중...</span>
          </div>
        )}
        <MapContainer
          center={[36.0, 127.5]}
          zoom={7}
          minZoom={6}
          maxBounds={KOREA_BOUNDS}
          maxBoundsViscosity={1.0}
          style={{ width: "100%", height: "100%" }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          />
          <GeoJSONLayer
            key={activeTab}
            data={data}
            onFeatureClick={handleFeatureClick}
          />
        </MapContainer>
      </div>
    </section>
  );
}
