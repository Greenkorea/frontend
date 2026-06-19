import { useState } from "react";

import { useMapStore } from "../../stores/hooks";

const Tab = ({ title, keyColor, active = false, onClick }) => {
  return (
    <div
      className="flex-1 flex justify-center items-center py-20 px-2 text-14 font-semibold leading-[100%] text-black cursor-pointer"
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
    id: "marine",
    title: "해양보호구역",
    keyColor: "#6ED6FF",
    description:
      "보호대상해양생물의 서식지나 산란지를 보호하거나 해양 생물다양성 보전에 필수적인 환경을 보호하는 구역", 
  },
  {
    id: "tidal-wetland",
    title: "갯벌·습지보호지역",
    keyColor: "#219CF7",
    description:
      "갯벌보호지역과 습지보호지역은 생물다양성이 풍부하고 생태적·경관적 가치가 높은 갯벌과 습지를 보전하고, 그 기능을 지속가능하게 유지·관리하기 위해 지정된다. 유네스코 세계자연유산과 람사르 습지의 근간을 이룬다.",
  },
  {
    id: "park",
    title: "국립·도립공원",
    keyColor: "#51E7B0",
    description:
      "해상 및 해안 국립공원이나 시·도립 공원을 포함하며, 뛰어난 자연 생태계와 수려한 경관을 함께 보전하는 대규모 공원 해역",
  },
  {
    id: "island",
    title: "특정도서",
    keyColor: "#69ADEE",
    description:
      "〈독도 등 도서지역의 생태계보전에 관한 특별법>에 따라 사람이 거주하지 않거나 극히 제한된 지역에만 거주하면서 자연생태계의 보전 가치가 높은 섬",
  },
  {
    id: "reserve",
    title: "천연기념물·천연보호구역",
    keyColor: "#0266C6",
    description:
      "독도, 문섬 등 지질학적 가치와 천연기념물의 서식 환경을 보전하기 위해 지정된 역사·자연 보존 구역",
  },
  {
    id: "oecm",
    title: "OECM",
    keyColor: "#BDD239",
    description:
      "법정 보호지역은 아니나 군사시설이나 수산자원 관리 등을 통해 실질적으로 생태계가 보전되는 기여 구역",
  },
];

const SectionTabs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { setActiveTab } = useMapStore();

  const handleClick = (index) => {
    setOpenIndex(index);
    setActiveTab(items[index].id);
  };

  return (
    <div className="mb-0">
      <div className="flex items-center justify-center">
        {items.map((item, index) => (
          <Tab
            key={index}
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
