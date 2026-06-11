/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { useModalStore, useMapStore } from "../../stores/hooks";

import AreaDetail from "../../components/AreaDetail";

// ─── 상수 ──────────────────────────────────────────────────────────────────

const TABS = [
  { id: "all", label: "전체 보기", files: [] },
  { id: "ecosystem", label: "해양생태계보호구역", files: ["marine.geojson"] },
  { id: "marine-bio", label: "해양생물보호구역", files: ["marine.geojson"] },
  { id: "landscape", label: "해양경관보호구역", files: ["marine.geojson"] },
  {
    id: "tidal-wetland",
    label: "갯벌·습지보호지역",
    files: ["tidal.geojson", "wetland.geojson"],
  },
  {
    id: "park",
    label: "국립·도립공원",
    files: ["national-park.geojson", "provincial-park.geojson"],
  },
  { id: "island", label: "특정도서", files: ["island.geojson"] },
  {
    id: "reserve",
    label: "천연기념물·천연보호구역",
    files: ["nature-reserve.geojson", "monument.geojson"],
  },
  { id: "oecm", label: "OECM", files: [] },
];

// 전체 보기용 - 중복 파일 제거
const ALL_FILES = [...new Set(TABS.flatMap((t) => t.files))];

const TYPE_STYLE = {
  // 해양보호구역_해수부.geojson
  해양보호구역: {
    color: "#AADFF8",
    weight: 2,
    opacity: 1,
    fillColor: "#AADFF8",
    fillOpacity: 0.5,
  },
  "해양보호구역(해양생물)": {
    color: "#219CF7",
    weight: 2,
    opacity: 1,
    fillColor: "#219CF7",
    fillOpacity: 0.5,
  },
  "해양보호구역(경관)": {
    color: "#6ED6FF",
    weight: 2,
    opacity: 1,
    fillColor: "#6ED6FF",
    fillOpacity: 0.5,
  },
  // 갯벌습지보호지역_해수부.geojson + 해양보호구역_해수부.geojson 혼재
  "습지보호지역-갯벌": {
    color: "#51E7B0",
    weight: 2,
    opacity: 1,
    fillColor: "#51E7B0",
    fillOpacity: 0.5,
  },
  // 습지보호지역_시도.geojson
  "습지보호지역-시도": {
    color: "#51E7B0",
    weight: 2,
    opacity: 1,
    fillColor: "#51E7B0",
    fillOpacity: 0.5,
  },
  // 국립공원_환경부.geojson
  국립공원: {
    color: "#44CEE4",
    weight: 2,
    opacity: 1,
    fillColor: "#44CEE4",
    fillOpacity: 0.5,
  },
  // 도립공원_환경부.geojson
  도립공원: {
    color: "#44CEE4",
    weight: 2,
    opacity: 1,
    fillColor: "#44CEE4",
    fillOpacity: 0.5,
  },
  // 특정도서_환경부.geojson
  특정도서: {
    color: "#0266C6",
    weight: 2,
    opacity: 1,
    fillColor: "#0266C6",
    fillOpacity: 0.5,
  },
  // 천연보호구역_국가유산청.geojson
  천연보호구역: {
    color: "#69ADEE",
    weight: 2,
    opacity: 1,
    fillColor: "#69ADEE",
    fillOpacity: 0.5,
  },
  // 천연기념물_국가유산청.geojson
  천연기념물: {
    color: "#69ADEE",
    weight: 2,
    opacity: 1,
    fillColor: "#69ADEE",
    fillOpacity: 0.5,
  },
};

const TAB_COLORS = {
  all: "#AADFF8",
  ecosystem: "#AADFF8",
  "marine-bio": "#219CF7",
  landscape: "#6ED6FF",
  "tidal-wetland": "#51E7B0",
  park: "#44CEE4",
  island: "#0266C6",
  reserve: "#69ADEE",
  oecm: "#BDD239",
};

const TYPE_COLOR = {
  해양보호구역: "#AADFF8",
  "해양보호구역(해양생물)": "#219CF7",
  "해양보호구역(경관)": "#6ED6FF",
  "습지보호지역-갯벌": "#51E7B0",
  "습지보호지역-시도": "#51E7B0",
  국립공원: "#44CEE4",
  도립공원: "#44CEE4",
  특정도서: "#0266C6",
  천연보호구역: "#69ADEE",
  천연기념물: "#69ADEE",
};

const KOREA_BOUNDS = [
  [32.5, 124.5],
  [39.0, 132.5],
];

// ─── 내부: GeoJSON 레이어 + 자동 fitBounds ──────────────────────────────────

function GeoJSONLayer({ data, onFeatureClick, color, activeTab }) {
  const map = useMap();

  const getStyle = useCallback(
    (feature) => {
      if (activeTab !== "all") {
        return {
          color,
          weight: 2,
          opacity: 1,
          fillColor: color,
          fillOpacity: 0.5,
        };
      }
      return (
        TYPE_STYLE[feature.properties.DESIG] ?? {
          color: "#AADFF8",
          weight: 2,
          opacity: 1,
          fillColor: "#AADFF8",
          fillOpacity: 0.5,
        }
      );
    },
    [activeTab, color],
  );

  const onEachFeature = useCallback(
    (feature, layer) => {
      const name =
        feature.properties.ORIG_NAME ??
        feature.properties.NAME ??
        feature.properties.KOR_NM ??
        "";

      if (name) {
        const tooltipColor =
          activeTab === "all"
            ? (TYPE_COLOR[feature.properties.DESIG] ?? "#AADFF8")
            : color;

        const tooltipHtml = `
          <div style="
            background: ${tooltipColor};
            border: none;
            border-radius: 0;
            padding: 10px;
            font-size: 14px;
            font-weight: 600;
            color: #000;
            white-space: nowrap;
            line-height: 100%;
          ">${name}</div>
        `;
        layer.bindTooltip(tooltipHtml, {
          className: "custom-map-tooltip",
          sticky: true,
          direction: "top",
          offset: [0, -8],
        });
      }

      layer.on("click", (e) => {
        L.DomEvent.stopPropagation(e);
        onFeatureClick(feature.properties);
      });
    },
    [onFeatureClick, color, activeTab],
  );

  useEffect(() => {
    if (!data?.features?.length) return;
    try {
      const bounds = L.geoJSON(data).getBounds();
      if (bounds.isValid()) map.fitBounds(bounds, { padding: [20, 20] });
    } catch (_) {}
  }, [data, map]);

  if (!data) return null;

  return (
    <GeoJSON
      key={`${activeTab}-${data.features.length}-${color}`}
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
    setData(null); // 탭 전환 시 초기화

    const tab = TABS.find((t) => t.id === tabId);
    const filesToLoad = tabId === "all" ? ALL_FILES : (tab?.files ?? []);

    // OECM 등 파일 없는 탭 → 빈 FeatureCollection
    if (filesToLoad.length === 0) {
      setData({ type: "FeatureCollection", features: [] });
      return;
    }

    setLoading(true);

    const fetchSingle = (file) =>
      fetch(`/${file}`, { cache: "no-store" }).then((r) => {
        if (!r.ok) throw new Error(`${file} 로드 실패`);
        return r.json();
      });

    Promise.all(filesToLoad.map(fetchSingle))
      .then((jsons) => {
        const features = jsons.flatMap((j) => j.features ?? []);
        setData({ type: "FeatureCollection", features });
      })
      .finally(() => setLoading(false));
  }, [tabId]);

  return { data, loading };
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────

export default function SectionsMap() {
  const { activeTab } = useMapStore();
  const { data, loading } = useGeoData(activeTab);
  const { openModal } = useModalStore();
  const color = TAB_COLORS[activeTab] ?? "#AADFF8";

  const handleFeatureClick = useCallback(
    (properties) => {
      const name = properties.REPORT_NAME;

      if (name) {
        openModal(<AreaDetail key="area-detail-modal" name={name} />);
      }
    },
    [openModal],
  );

  return (
    <section className="w-full flex flex-col">
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
            data={data}
            onFeatureClick={handleFeatureClick}
            color={color}
            activeTab={activeTab}
          />
        </MapContainer>
      </div>
    </section>
  );
}
