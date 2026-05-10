import { useState } from "react";

const Tab = ({ title, keyColor, active = false, onMouseEnter }) => {
  return (
    <div
      className="flex-1 flex justify-center items-center py-20 px-16 text-16 font-semibold leading-[100%] text-black cursor-pointer"
      style={{ backgroundColor: active ? keyColor : "#89AEFF" }}
      onMouseEnter={onMouseEnter}
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

const SectionTabs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const items = [
    {
      title: "국립공원",
      description:
        "1국가가 법에 의하여 지정하고 이를 유지, 관리하는 자연공원을 말한다.",
      keyColor: "#6ED6FF",
    },
    {
      title: "습지보호지역",
      description:
        "2국가가 법에 의하여 지정하고 이를 유지, 관리하는 자연공원을 말한다.",
      keyColor: "#219CF7",
    },
    {
      title: "해양생태계보호구역",
      description:
        "3국가가 법에 의하여 지정하고 이를 유지, 관리하는 자연공원을 말한다.",
      keyColor: "#AADFF8",
    },
    {
      title: "천연기념물",
      description:
        "4국가가 법에 의하여 지정하고 이를 유지, 관리하는 자연공원을 말한다.",
      keyColor: "#51E7B0",
    },
    {
      title: "천연보호구역",
      description:
        "5국가가 법에 의하여 지정하고 이를 유지, 관리하는 자연공원을 말한다.",
      keyColor: "#69ADEE",
    },
    {
      title: "유네스코자연유산",
      description:
        "6국가가 법에 의하여 지정하고 이를 유지, 관리하는 자연공원을 말한다.",
      keyColor: "#44CEE4",
    },
    {
      title: "람사르습지",
      description:
        "7국가가 법에 의하여 지정하고 이를 유지, 관리하는 자연공원을 말한다.",
      keyColor: "#0266C6",
    },
    {
      title: "환경보전해역",
      description:
        "8국가가 법에 의하여 지정하고 이를 유지, 관리하는 자연공원을 말한다.",
      keyColor: "#BDD239",
    },
  ];

  return (
    <div
      className={`${openIndex === null ? "mb-136" : "mb-[80.5px]"}`}
      onMouseLeave={() => setOpenIndex(null)}
    >
      <div className="flex items-center justify-center">
        {items.map((item, index) => (
          <Tab
            key={index}
            {...item}
            active={openIndex === index}
            onMouseEnter={() => setOpenIndex(index)}
          />
        ))}
      </div>
      {openIndex !== null && <TabContent {...items[openIndex]} />}
    </div>
  );
};

export default SectionTabs;
