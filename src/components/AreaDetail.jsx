/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useModalStore, useLocationsStore } from "../stores/hooks";

const TYPE_COLOR_MAP = {
  국립공원: "#6ED6FF",
  습지보호지역: "#219CF7",
  해양생태계보호구역: "#AADFF8",
  천연기념물: "#51E7B0",
  천연보호구역: "#69ADEE",
  유네스코자연유산: "#44CEE4",
  람사르습지: "#0266C6",
  환경보전해역: "#BDD239",
};

const AreaDetailModal = ({ name, type }) => {
  const { closeModal } = useModalStore();
  const { ...locationsActions } = useLocationsStore();

  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetchLocation();
  }, [name]);

  const fetchLocation = async () => {
    try {
      const response = await locationsActions.fetchLocation("신안"); // 임시로 신안으로 조회

      setLocation(response);
    } catch (error) {
      window.alert(
        `${name} 위치 정보를 불러오는 중 오류가 발생했습니다. ${error?.message}`,
      );
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 z-[1000]" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-[rgba(36,143,242,0.5)]"
        aria-hidden="true"
      />

      <div className="w-full bg-white p-40 z-10 relative mt-[200px] shadow-[0_-5px_15px_0_rgba(0,0,0,0.25)]">
        <span
          className="inline-block text-13 text-black px-10 py-4 rounded-6"
          style={{ backgroundColor: TYPE_COLOR_MAP[type] ?? "#6ED6FF" }}
        >
          {type ?? "유형 정보 없음"}
        </span>
        {/* 응답 데이터 표시 영역 */}
        {location ? (
          <div className="mt-16">{/* location 데이터 활용 */}</div>
        ) : (
          <p className="mt-16 text-14 text-gray-3">불러오는 중...</p>
        )}
      </div>
    </div>
  );
};

export default AreaDetailModal;
