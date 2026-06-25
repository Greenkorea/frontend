import { useState } from "react";

import IconArrow from "../../assets/arrow.png";

const HowToChange = () => {
  return (
    <div>
      <div className="w-full border-t border-dashed border-[#1E3A5F] my-25" />
      <div className="max-h-[500px] overflow-y-auto text-black text-16 font-medium leading-[150%] pr-10">
        녹색연합이 인천 대이작도부터 울진 나곡리까지 13개 해양보호구역을 조사한
        결과, 보호구역의 면적이 넓거나 지정된 지 오래됐다고 해서 생태계가 더
        건강한 것은 아니었습니다.
        <br />
        보호구역 안에서도 낚시와 생물 채취, 오염과 개발이 계속되고 있었으며,
        관리계획조차 마련되지 않은 곳도 있었습니다. 반면 생태계가 비교적 잘
        보전된 지역에서는 주민과 어민 공동체가 제도의 공백을 메우고 있었습니다.
        <br />
        보호구역 밖에서 발생하는 개발사업, 원전 온배수, 농경지와 양식장 오염도
        보호구역 내부의 생태계를 위협하고 있습니다. 표지판과 경계 표시가 부족해
        이용자가 보호구역에 들어왔다는 사실조차 알기 어려운 곳도 많았습니다.
        <br />
        해양보호구역이 이름뿐인 보호구역에 머물지 않으려면 다음과 같은 변화가
        필요합니다.
        <br />
        <br />
        <p className="text-20 font-bold mb-8">
          1. 보호 대상과 금지 행위를 명확히 해야 합니다
        </p>
        각 보호구역에서 어떤 생물과 생태계를 보호하는지 구체적으로 정해야
        합니다. 해양보호생물뿐 아니라 갯벌 저서생물, 조간대 패류, 연안 어종처럼
        실제로 채취 압력을 받는 생물도 보호 대상에 포함해야 합니다.
        <br />
        낚시·채취·출입·레저 활동 등 구역별 제한 행위를 명확히 고시하고, 위반에
        대한 단속과 처벌 체계도 강화해야 합니다. 무엇을 금지하고 보호할 것인지
        정하지 않은 보호구역은 제 기능을 할 수 없습니다.
        <br />
        <br />
        <p className="text-20 font-bold mb-8">
          2. 부처별로 흩어진 관리체계를 통합해야 합니다
        </p>
        하나의 해양 공간을 여러 부처와 지자체가 각각 관리하면서 책임의 공백이
        발생하고 있습니다. 중복 지정 구역마다 주관 기관을 정하고, 공동
        관리계획과 예산 책임을 명확히 해야 합니다.
        <br />
        갯벌 세계유산의 통합관리를 위한 법 개정을 조속히 추진하고, 장기적으로는
        가칭 '해양보호구역법'을 제정해야 합니다. 보호구역 인근의 육상 개발,
        양식장 배출수, 농경지와 축산 오염까지 관리할 수 있는 제도적 근거도
        필요합니다.
        <br />
        <br />
        <p className="text-20 font-bold mb-8">
          3. 표지판을 통일하고 해상 경계를 표시해야 합니다
        </p>
        보호구역의 존재를 알리는 것은 관리의 출발점입니다. 표지판의 형식과 재질,
        안내 내용을 통일하고, 무엇을 보호하는 곳인지와 어떤 행위가 제한되는지를
        누구나 쉽게 확인할 수 있도록 해야 합니다.
        <br />
        바다에는 부표 등으로 보호구역의 경계를 표시하고, 어선과 레저선박의
        해도·내비게이션에도 보호구역 경계를 표기해야 합니다. 선박이 보호구역에
        진입할 때 자동으로 안내하는 체계도 필요합니다.
        <br />
        <br />
        <p className="text-20 font-bold mb-8">
          4. 시민모니터링을 제도화해야 합니다
        </p>
        정부가 의뢰하고 정부에 제출하는 조사만으로는 관리 실패를 충분히 드러내기
        어렵습니다. 시민사회와 지역 주민이 독립적으로 조사하고 그 결과를
        공식적인 관리 평가에 반영할 수 있어야 합니다.
        <br />
        해양보호구역 관리 효과성 평가 과정에 시민사회가 참여하도록 하고, 시민
        모니터링 결과에 대해 관할 기관이 일정 기간 안에 공식적으로 답변하도록
        해야 합니다. 조사에 필요한 보호구역 접근권과 최소한의 지원도 보장해야
        합니다.
        <br />
        <br />
        <p className="text-20 font-bold mb-8">
          5. 주민과 어민이 결정권을 갖는 거버넌스를 만들어야 합니다
        </p>
        주민과 어민은 보호구역 관리의 부담을 지면서도 의사결정에서는 배제되는
        경우가 많습니다. 각 보호구역에 주민·어민·지자체·시민사회·전문가가
        참여하는 관리위원회를 설치하고, 관리계획과 예산, 평가에 실질적인 권한을
        부여해야 합니다.
        <br />
        생태계 보전에 기여하는 어업과 주민의 자율 관리 활동에는 적절한 경제적
        보상이 필요합니다. 갯벌·암반·도서·하구 등 서로 다른 생태적 특성을
        반영해, 지역 공동체와 함께 보호구역별 맞춤형 관리계획을 만들어야 합니다.
        <br />
        해양보호구역은 선을 그어 지정하는 것만으로 완성되지 않습니다. 무엇을
        보호할지 정하고, 훼손 행위를 통제하며, 지역 공동체와 시민이 함께 관리할
        때 비로소 살아 있는 보호구역이 될 수 있습니다.
      </div>
    </div>
  );
};

const Members = () => {
  return (
    <div>
      <div className="w-full border-t border-dashed border-[#1E3A5F] my-30" />
      <div className="text-black text-16 font-medium leading-[150%]">
        기획 녹색연합
        <br />
        조사 녹색연합
        <br />
        개발 도토리랩스
        <br />
        디자인 손에손잡고
      </div>
    </div>
  );
};

const SectionAccordion = () => {
  const [openTitle, setOpenTitle] = useState(null);

  const handleClick = (title, link) => {
    if (link) {
      window.open(link);
    } else {
      setOpenTitle(openTitle === title ? null : title);
    }
  };

  const items = [
    { title: "만든 사람들", component: <Members />, keyColor: "#219CF7" },
    {
      title: "녹색연합?",
      link: "https://www.greenkorea.org",
      keyColor: "#64B5F6",
    },
    {
      title: "지난 보고서 모아보기",
      link: "https://issuu.com/i_greenkorea/docs/_dd3d7b9a55e235?fr=xKAE9_zMzMw",
      keyColor: "#8BC3F8",
    },
    {
      title: "어떻게 바꿀 수 있을까요?",
      component: <HowToChange />,
      keyColor: "#BBDEFA",
    },
  ];

  return (
    <div className="flex flex-col-reverse pb-57">
      {items.map((item, index) => (
        <div
          key={index}
          className={`relative rounded-b-20 pb-30 px-50 ${index === items.length - 1 ? "pt-30" : "pt-50"} ${index === 0 ? "" : "mb-[-20px]"}`}
          style={{ backgroundColor: item.keyColor, zIndex: 100 }}
        >
          <div
            className={`flex items-center justify-between text-32 font-bold leading-[100%] text-[#1E3A5F] cursor-pointer`}
            onClick={() => handleClick(item.title, item.link)}
          >
            {item.title}
            <img
              src={IconArrow}
              alt="arrow"
              className={`w-30 h-20  ${item.link ? "rotate-[270deg]" : ""}  ${openTitle === item.title ? "rotate-180" : ""}`}
            />
          </div>
          {openTitle === item.title && item.component && (
            <div>{item.component}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionAccordion;
