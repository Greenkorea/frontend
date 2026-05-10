import { useState } from "react";

import { useMapStore } from "../../stores/hooks";

const Tab = ({ title, keyColor, active = false, onClick }) => {
  return (
    <div
      className="flex-1 flex justify-center items-center py-20 px-16 text-16 font-semibold leading-[100%] text-black cursor-pointer"
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
    id: "park",
    title: "국립공원",
    keyColor: "#6ED6FF",
    description:
      "국가가 법에 의하여 지정하고 이를 유지, 관리하는 자연공원을 말한다.",
  },
  {
    id: "wetland",
    title: "습지보호지역",
    keyColor: "#219CF7",
    description: "...",
  },
  {
    id: "ecosystem",
    title: "해양생태계보호구역",
    keyColor: "#AADFF8",
    description: "...",
  },
  {
    id: "monument",
    title: "천연기념물",
    keyColor: "#51E7B0",
    description: "...",
  },
  {
    id: "reserve",
    title: "천연보호구역",
    keyColor: "#69ADEE",
    description: "...",
  },
  {
    id: "unesco",
    title: "유네스코자연유산",
    keyColor: "#44CEE4",
    description: "...",
  },
  {
    id: "ramsar",
    title: "람사르습지",
    keyColor: "#0266C6",
    description: "...",
  },
  {
    id: "eco-sea",
    title: "환경보전해역",
    keyColor: "#BDD239",
    description: "...",
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
    <div className={`${openIndex === null ? "mb-136" : "mb-[80.5px]"}`}>
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
