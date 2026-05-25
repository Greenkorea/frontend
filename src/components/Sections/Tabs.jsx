import { useState } from "react";

import { useMapStore } from "../../stores/hooks";

const Tab = ({ title, keyColor, active = false, isFirst = false, onClick }) => {
  return (
    <div
      className={`${isFirst ? "min-w-[140px]" : "flex-1"} flex justify-center items-center py-20 px-2 text-14 font-semibold leading-[100%] text-black cursor-pointer`}
      style={{ backgroundColor: active ? keyColor : "#89AEFF" }}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

const TabContent = ({ description, keyColor }) => {
  return (
    <div
      className="p-18 text-14 leading-[140%] font-medium text-black text-center"
      style={{ backgroundColor: keyColor }}
    >
      {description}
    </div>
  );
};

const items = [
  {
    id: "ecosystem",
    title: "해양생태계보호구역",
    keyColor: "#6ED6FF",
    description:
      "해양 생태계의 원시성이 잘 유지되어 있거나 생물다양성이 풍부하여 특별히 보전할 가치가 있는 해역",
  },
  {
    id: "marine-bio",
    title: "해양생물보호구역",
    keyColor: "#219CF7",
    description:
      "보호대상해양생물의 서식지나 산란지 등 멸종 위기 생물의 생존에 필수적인 환경을 보호하는 구역",
  },
  {
    id: "landscape",
    title: "해양경관보호구역",
    keyColor: "#AADFF8",
    description:
      "갯벌, 암석해안, 해안사구 등 경관적 가치가 뛰어나 해양 관광과 심미적 보전이 필요한 해역",
  },
  {
    id: "tidal-flat",
    title: "갯벌보호지역",
    keyColor: "#51E7B0",
    description:
      "생태적 가치가 높은 갯벌을 체계적으로 관리하기 위해 지정됐으며, 유네스코 세계자연유산의 근간을 이루는 보호지역",
  },
  {
    id: "wetland",
    title: "습지보호지역",
    keyColor: "#69ADEE",
    description:
      "희귀 동식물이 서식하거나 수질 보전 기능을 수행하여 법적 보호를 받는 지역으로, 람사르습지가 포함되는 연안 습지",
  },
  {
    id: "park",
    title: "자연공원",
    keyColor: "#44CEE4",
    description:
      "해상 및 해안 국립공원이나 시·도립 공원을 포함하며, 뛰어난 자연 생태계와 수려한 경관을 함께 보전하는 대규모 공원 해역",
  },
  {
    id: "island",
    title: "특정도서",
    keyColor: "#0266C6",
    description:
      "〈독도 등 도서지역의 생태계보전에 관한 특별법>에 따라 사람이 거주하지 않거나 극히 제한된 지역에만 거주하면서 자연생태계의 보전 가치가 높은 섬",
  },
  {
    id: "reserve",
    title: "천연보호구역",
    keyColor: "#BDD239",
    description:
      "독도, 문섬 등 지질학적 가치와 천연기념물의 서식 환경을 보전하기 위해 지정된 역사·자연 보존 구역",
  },
  {
    id: "scenic",
    title: "명승",
    keyColor: "#D6F775",
    description:
      "자연경관이 뛰어나고 역사 문화적 가치가 융합된 해안 지역 중 국가가 지정하여 관리하는 보호구역",
  },
  {
    id: "oecm",
    title: "OECM",
    keyColor: "#4FFACC",
    description:
      "법정 보호지역은 아니나 군사시설이나 수산자원 관리 등을 통해 실질적으로 생태계가 보전되는 기여 구역",
  },
];

const SectionTabs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { setActiveTab } = useMapStore();

  const handleClick = (index) => {
    setOpenIndex(index);
    setActiveTab(items[index].id); // 지도에 반영
  };

  return (
    <div className="mb-0">
      <div className="flex items-center justify-center">
        {items.map((item, index) => (
          <Tab
            key={index}
            isFirst={index === 0}
            {...item}
            active={openIndex === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      {openIndex !== null && <TabContent {...items[openIndex]} />}
    </div>
  );
};

export default SectionTabs;
