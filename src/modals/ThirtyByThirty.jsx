import Modal, { Layout, Title } from "../components/Modal";

const Circle = ({ active = false, isFirst = false }) => {
  return (
    <div
      className={`w-[49.7px] h-[49.7px] rounded-full ${isFirst ? "ml-0" : "ml-[-9.7px]"} ${active ? "z-10" : "z-0"}`}
      style={{ backgroundColor: active ? "#1976D3" : "#FFFFFF" }}
    ></div>
  );
};

const InfoText = ({ children }) => {
  return (
    <div className="absolute top-12 right-24 bg-[#89AEFF] p-3 text-14 font-medium leading-[140%] text-[#DFFC8E]">
      {children}
    </div>
  );
};

const ThirtyByThirtyModal = () => {
  const getDDay = () => {
    const today = new Date();
    const target = new Date("2030-12-31");
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <Modal backdrop={true} closeBackdrop={false}>
      <Layout bgColor="#EF7148">
        <Title>30by30</Title>

        <div className="">
          <div className="text-16 font-medium leading-[150%] text-[#DFFC8E]">
            2022년 제15차 생물다양성협약 당사국총회(COP15)에서 채택된 글로벌
            목표로, 2030년까지 전 세계 육상과 해양의 최소 30%를 보호구역으로
            지정하는 것을 골자로 한다. 한국 또한 이 국제적 합의에 동참하고
            있으나, 2026년 3월 13일 기준 전체 면적의 2%만이 해양보호구역으로
            지정되어 있는 실정이다. 목표 달성을 위해서는 보다 적극적인 보호구역
            면적 확대가 필요하다.
          </div>
          <div className="mt-57">
            <div className="flex items-center relative">
              {Array.from({ length: 10 }).map((_, index) => (
                <Circle active={index < 2} key={index} isFirst={index === 0} />
              ))}
              <InfoText>2%</InfoText>
            </div>
            <div className="flex items-center relative">
              {Array.from({ length: 10 }).map((_, index) => (
                <Circle active={false} key={index} isFirst={index === 0} />
              ))}
              <InfoText>2030.12.31</InfoText>
            </div>
            <div className="flex items-center relative">
              {Array.from({ length: 10 }).map((_, index) => (
                <Circle active={false} key={index} isFirst={index === 0} />
              ))}
              <InfoText>D-{getDDay()}</InfoText>
            </div>
          </div>
        </div>
      </Layout>
    </Modal>
  );
};

export default ThirtyByThirtyModal;
