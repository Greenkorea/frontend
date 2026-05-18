/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useModalStore, useLocationsStore } from "../stores/hooks";

import IconArrowY from "../assets/arrow-y.png";

const Container = ({ children }) => {
  return <div className="px-20 w-[1320px] mx-auto">{children}</div>;
};

const Title = ({ data }) => {
  const { closeModal } = useModalStore();

  return (
    <div className="bg-[#1976D3] py-20">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-20">
            <h2 className="text-42 font-bold leading-[110%] text-[#DFFC8E]">
              {data.location}
            </h2>
            <div className="py-5 px-8 bg-[#DFFC8E] text-14 font-medium leading-[140%] text-[#000]">
              {data.basic_info?.field}
            </div>
          </div>
          <button
            type="button"
            className="w-60 h-60 flex items-center justify-center"
            onClick={closeModal}
          >
            <img src={IconArrowY} alt="닫기" className="w-45 h-30" />
          </button>
        </div>
      </Container>
    </div>
  );
};

const Section = ({ children, isFirst = false }) => {
  return (
    <div
      className={`py-30 border-b border-[#1E3A5F] ${isFirst ? "pt-23" : ""}`}
    >
      {children}
    </div>
  );
};

const SectionTitle = ({ children }) => {
  return (
    <div className="text-32 font-bold leading-[110%] text-[#1E3A5F] mb-20">
      {children}
    </div>
  );
};

const SectionContent = ({ children }) => {
  return (
    <div className="text-22 font-medium leading-[150%] text-[#1E3A5F] grid gap-10">
      {children}
    </div>
  );
};

const SectionItem = ({ children }) => {
  return <div className="">{children}</div>;
};

const Content = ({ data }) => {
  return (
    <div
      style={{
        minWidth: "1320px",
        background: "linear-gradient(to right, #64B5F6 50%, #8BC3F8 50%)",
      }}
    >
      <Container>
        <div className="flex">
          <div className="w-1/2 pr-80">
            <Section isFirst>
              <SectionTitle>기본정보</SectionTitle>

              <SectionContent>
                <SectionItem>
                  <b>보호구역명</b>
                  <br />
                  {data.basic_info?.protected_area_name}
                </SectionItem>
                <SectionItem>
                  <b>소재지</b>
                  <br />
                  {data.basic_info?.address}
                </SectionItem>
                <SectionItem>
                  <b>면적</b>
                  <br />
                  {data.basic_info?.area}
                </SectionItem>
                <SectionItem>
                  <b>지정근거</b>
                  <br />
                  {data.basic_info?.designation_basis}
                </SectionItem>
                <SectionItem>
                  <b>보호구역 유형</b>
                  <br />
                  {data.basic_info?.protected_area_type}
                </SectionItem>
                <SectionItem>
                  <b>주요 표지판 위치</b>
                  <br />
                  {data.basic_info?.main_signage_locations}
                </SectionItem>
                <SectionItem>
                  <b>관리주체</b>
                  <br />
                  {data.basic_info?.managing_authority}
                </SectionItem>
                <SectionItem>
                  <b>관리조직</b>
                  <br />
                  {data.basic_info?.managing_organization}
                </SectionItem>
                <SectionItem>
                  <b>연락처</b>
                  <br />
                  {data.basic_info?.contact}
                </SectionItem>
              </SectionContent>
            </Section>
            <Section>
              <SectionTitle>생태 환경 현황</SectionTitle>
              <SectionContent>
                <SectionItem>
                  <b>깃대종 및 주요 생물군</b>
                  <br />
                  {data.basic_info?.flagship_species_and_key_taxa}
                </SectionItem>
                <SectionItem>
                  <b>생태계 유형 및 특기사항</b>
                  <br />
                  {data.basic_info?.ecosystem_type_and_notes}
                </SectionItem>
              </SectionContent>
            </Section>
            <Section>
              <SectionTitle>이용 현황 및 영향</SectionTitle>
              <SectionContent>
                <SectionItem>
                  <b>주요 어업 및 양식업</b>
                  <br />
                  {data.basic_info?.main_fisheries_and_aquaculture}
                </SectionItem>
                <SectionItem>
                  <b>관광 및 레저활동</b>
                  <br />
                  {data.basic_info?.tourism_and_leisure_activities}
                </SectionItem>
                <SectionItem>
                  <b>시설 및 인프라</b>
                  <br />
                  {data.basic_info?.facilities_and_infrastructure}
                </SectionItem>
                <SectionItem>
                  <b>특기사항</b>
                  <br />
                  {data.basic_info?.notes}
                </SectionItem>
              </SectionContent>
            </Section>
          </div>

          <div className="w-1/2 py-23 pl-80">오른쪽 콘텐츠</div>
        </div>
      </Container>
    </div>
  );
};

const AreaDetail = ({ name }) => {
  const { closeModal } = useModalStore();
  const { ...locationsActions } = useLocationsStore();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchLocation();
  }, [name]);

  const fetchLocation = async () => {
    try {
      const response = await locationsActions.fetchLocation("전남 신안"); // 임시로 신안으로 조회

      setData(response);
    } catch (error) {
      window.alert(
        `${name} 위치 정보를 불러오는 중 오류가 발생했습니다. ${error?.message}`,
      );
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-[rgba(36,143,242,0.5)]"
        aria-hidden="true"
      />

      {data && (
        <div className="w-full bg-white z-10 relative mt-[200px] shadow-[0_-5px_15px_0_rgba(0,0,0,0.25)]">
          <div className="sticky top-0 z-10">
            <Title data={data} />
          </div>
          <Content data={data} />
        </div>
      )}
      <div></div>
    </div>
  );
};

export default AreaDetail;
