/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useModalStore, useLocationsStore } from "../stores/hooks";

import IconArrowY from "../assets/arrow-y.png";
import IconArrowB from "../assets/arrow-black.png";

const Container = ({ children }) => {
  return <div className="px-80 w-[1440px] mx-auto">{children}</div>;
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
      className={`py-30 ${isFirst ? "pt-23" : ""} border-b border-[#1E3A5F]`}
    >
      {children}
    </div>
  );
};

const SectionReport = ({ children }) => {
  return <div className="pb-50">{children}</div>;
};

const SectionTitle = ({ children }) => {
  return (
    <div className="text-32 font-bold leading-[110%] text-[#1E3A5F] mb-20">
      {children}
    </div>
  );
};

const SectionSubTitle = ({ children }) => {
  return (
    <div className="text-24 font-bold leading-[110%] text-[#1E3A5F] mb-25">
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

const Item = ({ children }) => {
  return <div className="">{children}</div>;
};

const DlList = ({ children }) => {
  return <div className="grid gap-8">{children}</div>;
};

const Dl = ({ children }) => {
  return <div className="grid grid-cols-[100px_1fr] gap-x-20">{children}</div>;
};

const Dt = ({ children }) => {
  return (
    <div className="text-22 font-medium leading-[150%] text-[#1E3A5F] pb-5 border-b border-[#1E3A5F]">
      {children}
    </div>
  );
};

const Dd = ({ children }) => {
  return (
    <div className="text-22 font-medium leading-[150%] text-[#1E3A5F] pb-5 border-b border-[#1E3A5F]">
      {children}
    </div>
  );
};

const BasicInfoComponent = ({ data }) => {
  return (
    <>
      <Section isFirst>
        <SectionTitle>기본정보</SectionTitle>
        <SectionContent>
          <Item>
            <b>보호구역명</b>
            <br />
            {data.basic_info?.protected_area_name}
          </Item>
          <Item>
            <b>소재지</b>
            <br />
            {data.basic_info?.address}
          </Item>
          <Item>
            <b>면적</b>
            <br />
            {data.basic_info?.area}
          </Item>
          <Item>
            <b>지정근거</b>
            <br />
            {data.basic_info?.designation_basis}
          </Item>
          <Item>
            <b>보호구역 유형</b>
            <br />
            {data.basic_info?.protected_area_type}
          </Item>
          <Item>
            <b>주요 표지판 위치</b>
            <br />
            {data.basic_info?.main_signage_locations}
          </Item>
          <Item>
            <b>관리주체</b>
            <br />
            {data.basic_info?.managing_authority}
          </Item>
          <Item>
            <b>관리조직</b>
            <br />
            {data.basic_info?.managing_organization}
          </Item>
          <Item>
            <b>연락처</b>
            <br />
            {data.basic_info?.contact}
          </Item>
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>생태 환경 현황</SectionTitle>
        <SectionContent>
          <Item>
            <b>깃대종 및 주요 생물군</b>
            <br />
            {data.basic_info?.flagship_species_and_key_taxa}
          </Item>
          <Item>
            <b>생태계 유형 및 특기사항</b>
            <br />
            {data.basic_info?.ecosystem_type_and_notes}
          </Item>
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>이용 현황 및 영향</SectionTitle>
        <SectionContent>
          <Item>
            <b>주요 어업 및 양식업</b>
            <br />
            {data.basic_info?.main_fisheries_and_aquaculture}
          </Item>
          <Item>
            <b>관광 및 레저활동</b>
            <br />
            {data.basic_info?.tourism_and_leisure_activities}
          </Item>
          <Item>
            <b>시설 및 인프라</b>
            <br />
            {data.basic_info?.facilities_and_infrastructure}
          </Item>
          <Item>
            <b>특기사항</b>
            <br />
            {data.basic_info?.notes}
          </Item>
        </SectionContent>
      </Section>
    </>
  );
};

const REPORT_COLORS = ["#BBDEFA", "#8BC3F8", "#64B5F6", "#219CF7", "#238EDD"];

const ReportComponent = ({ monthKey, report, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const records = report.records || [];
  const bgColor = REPORT_COLORS[index] ?? "#238EDD";

  return (
    <div
      className="border-b border-[#1E3A5F] py-16 px-80 mr-[-80px]"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="flex justify-between items-center py-20 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-15">
          <span className="text-32 font-bold leading-[110%] text-[#231F20]">
            해양 보고서
          </span>
          <span className="text-20 font-bold leading-[110%] text-[#231F20]">
            {monthKey}
          </span>
        </div>
        <div className="flex items-center justify-center px-17">
          <img
            src={IconArrowB}
            alt={isOpen ? "보고서 닫기" : "보고서 열기"}
            className={`w-26 h-18 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="pb-20">
          {records.map((record, index) => (
            <div
              key={index}
              className="grid gap-10 text-22 font-medium text-[#1E3A5F]"
            >
              <ImageSlider images={record.image_urls} />

              <SectionReport>
                <SectionSubTitle>
                  {record.target_location}의 관리 평가
                </SectionSubTitle>
                <DlList>
                  <Dl>
                    <Dt>조사 일시</Dt>
                    <Dd>
                      {record.survey_datetime} 2025년 10월 1일 (날씨:{" "}
                      {record.weather}, 기온: {record.temperature})
                    </Dd>
                  </Dl>
                  <Dl>
                    <Dt>조사 지역</Dt>
                    <Dd>{record.survey_scope}</Dd>
                  </Dl>
                </DlList>
              </SectionReport>

              <div>
                <b>조사자</b> {record.surveyor}
              </div>
              <div>
                <b>조사 방식</b> {record.survey_method}
              </div>
              <div>
                <b>생태 가치</b> {record.field}
              </div>
              <div>
                <b>특이 사항</b> {record.threat_factors}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const getDriveImageUrl = (url) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    // uc?export=view 대신 thumbnail 사용
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  return url;
};

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative mb-37">
      <div className="w-full overflow-hidden">
        <img
          src={getDriveImageUrl(images[currentIndex])} // 변환 적용
          alt={`이미지 ${currentIndex + 1}`}
          className="w-full object-cover h-[369px]"
        />
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-14 left-0 flex justify-center items-center gap-8 w-full">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-6 h-6 rounded-full transition-all ${
                currentIndex === index ? "bg-[#64B5F6]" : "bg-[#E4F2FD]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Content = ({ data }) => {
  return (
    <div
      style={{
        minWidth: "1440px",
        background: "linear-gradient(to right, #64B5F6 50%, #BBDEFA 50%)",
      }}
    >
      <Container>
        <div className="flex">
          <div className="w-1/2 pr-80 pb-80">
            <BasicInfoComponent data={data} />
          </div>

          <div className="w-1/2">
            {Object.entries(data.reports_by_month || {}).map(
              ([monthKey, report], index) => (
                <ReportComponent
                  key={monthKey}
                  monthKey={monthKey}
                  report={report}
                  index={index}
                />
              ),
            )}
          </div>
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
      const response = await locationsActions.fetchLocation("부산 오륙도"); // 임시로 신안으로 조회

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
        <div className="min-w-[1440px] bg-white z-10 relative mt-[200px] shadow-[0_-5px_15px_0_rgba(0,0,0,0.25)]">
          <div className="sticky top-0 z-10 min-w-[1440px]">
            <Title data={data} />
          </div>
          <Content data={data} />
        </div>
      )}
    </div>
  );
};

export default AreaDetail;
