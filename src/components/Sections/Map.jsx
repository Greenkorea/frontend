/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { useModalStore, useMapStore } from "../../stores/hooks";

import AreaDetail from "../../components/AreaDetail";

// ─── 상수 ──────────────────────────────────────────────────────────────────

const TABS = [
  { id: "all", label: "전체 보기", files: [] },
  // 해양생태계·해양생물·해양경관보호구역 → 해양보호구역으로 통합
  {
    id: "marine",
    label: "해양보호구역",
    files: ["marine.geojson"],
  },
  // 갯벌보호지역 + 습지보호지역 → 갯벌·습지보호지역으로 통합
  {
    id: "tidal-wetland",
    label: "갯벌·습지보호지역",
    files: ["tidal.geojson", "wetland.geojson"],
  },
  // 자연공원 → 국립·도립공원
  {
    id: "park",
    label: "국립·도립공원",
    files: ["national-park.geojson", "provincial-park.geojson"],
  },
  { id: "island", label: "특정도서", files: ["island.geojson"] },
  // 천연보호구역 + 천연기념물 → 천연기념물·천연보호구역으로 통합
  {
    id: "reserve",
    label: "천연기념물·천연보호구역",
    files: ["nature-reserve.geojson", "monument.geojson"],
  },
  // OECM: json 추후 추가 예정
  { id: "oecm", label: "OECM", files: [] },
];

// 전체 보기용 - 중복 파일 제거
const ALL_FILES = [...new Set(TABS.flatMap((t) => t.files))];

const TYPE_STYLE = {
  // marine.geojson (해양보호구역_해수부)
  해양보호구역: {
    color: "#6ED6FF",
    weight: 2,
    opacity: 1,
    fillColor: "#6ED6FF",
    fillOpacity: 0.5,
  },
  "해양보호구역(해양생물)": {
    color: "#6ED6FF",
    weight: 2,
    opacity: 1,
    fillColor: "#6ED6FF",
    fillOpacity: 0.5,
  },
  "해양보호구역(경관)": {
    color: "#6ED6FF",
    weight: 2,
    opacity: 1,
    fillColor: "#6ED6FF",
    fillOpacity: 0.5,
  },
  // tidal.geojson (갯벌습지보호지역_해수부) + marine.geojson 혼재
  "습지보호지역-갯벌": {
    color: "#219CF7",
    weight: 2,
    opacity: 1,
    fillColor: "#219CF7",
    fillOpacity: 0.5,
  },
  // wetland.geojson (습지보호지역_시도)
  "습지보호지역-시도": {
    color: "#219CF7",
    weight: 2,
    opacity: 1,
    fillColor: "#219CF7",
    fillOpacity: 0.5,
  },
  // national-park.geojson
  국립공원: {
    color: "#51E7B0",
    weight: 2,
    opacity: 1,
    fillColor: "#51E7B0",
    fillOpacity: 0.5,
  },
  // provincial-park.geojson
  도립공원: {
    color: "#51E7B0",
    weight: 2,
    opacity: 1,
    fillColor: "#51E7B0",
    fillOpacity: 0.5,
  },
  // island.geojson
  특정도서: {
    color: "#69ADEE",
    weight: 2,
    opacity: 1,
    fillColor: "#69ADEE",
    fillOpacity: 0.5,
  },
  // nature-reserve.geojson
  천연보호구역: {
    color: "#0266C6",
    weight: 2,
    opacity: 1,
    fillColor: "#0266C6",
    fillOpacity: 0.5,
  },
  // monument.geojson
  천연기념물: {
    color: "#0266C6",
    weight: 2,
    opacity: 1,
    fillColor: "#0266C6",
    fillOpacity: 0.5,
  },
};

const TAB_COLORS = {
  all: "#6ED6FF",
  marine: "#6ED6FF",
  "tidal-wetland": "#219CF7",
  park: "#51E7B0",
  island: "#69ADEE",
  reserve: "#0266C6",
  oecm: "#BDD239",
};

const TYPE_COLOR = {
  해양보호구역: "#6ED6FF",
  "해양보호구역(해양생물)": "#6ED6FF",
  "해양보호구역(경관)": "#6ED6FF",
  "습지보호지역-갯벌": "#219CF7",
  "습지보호지역-시도": "#219CF7",
  국립공원: "#51E7B0",
  도립공원: "#51E7B0",
  특정도서: "#69ADEE",
  천연보호구역: "#0266C6",
  천연기념물: "#0266C6",
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
          color: "#6ED6FF",
          weight: 2,
          opacity: 1,
          fillColor: "#6ED6FF",
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
            ? (TYPE_COLOR[feature.properties.DESIG] ?? "#6ED6FF")
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
    setData(null);

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
  const color = TAB_COLORS[activeTab] ?? "#6ED6FF";

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
    <section className="w-full flex flex-col pt-87">
      <div className="relative w-full" style={{ height: 645 }}>
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
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          />
          <ZoomControl position="bottomleft" />
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
