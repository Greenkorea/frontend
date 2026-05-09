import Modal, { Layout, Title } from "../components/Modal";

const QuestionModal = () => {
  return (
    <Modal backdrop={true} closeBackdrop={false}>
      <Layout>
        <Title>
          한국의
          <br />
          해양보호구역
        </Title>

        <div className="text-16 font-medium leading-[150%] text-[#DFFC8E] h-[310px] overflow-y-auto">
          해양보호구역은 해양 생태계가 특히 우수하거나 해양 생물 다양성이 풍부해
          특별히 보존할 가치가 있는 수역을 의미합니다. 해양보호구역은 단순히
          인위적 행위가 제한되는 구역이 아니라 바다 생태계가 외부의 간섭 없이
          스스로를 치유하고, 생물 종들이 대를 이어 살아가는 '생태적 안식처'이자
          기후 위기에 대응하는 '바다의 안전망' 역할을 합니다.
          <br />
          <br />
          해양보호구역은 크게 국내법으로 지정된 법적 보호구역과 국제적 지위의
          보호구역으로 나뉩니다.
          <br />
          <br />
          <b>법적 보호지역 (Protected Areas)</b>
          <br />
          국내법에 의해 명확한 경계가 설정되고 보전이 최우선 목적인 구역들이다.
          <br />
          <br />
          <b>해양수산부 관리 (해양생태계법, 습지보전법)</b>
          <br />
          해양생태계보호구역: 자연 상태의 원형 보전
          <br />
          해양생물보호구역: 상괭이, 물범 등 특정 종 보호
          <br />
          해양경관보호구역: 지질 및 경관 가치 보호
          <br />
          연안습지보호지역: 갯벌 생태계 보호
          <br />
          <br />
          <b>환경부 관리 (자연공원법, 야생생물법)</b>
          <br />
          해상·해안 국립공원: 한려해상, 다도해해상, 변산반도, 태안해안 국립공원
          등<br />
          특정도서: 사람이 거주하지 않고 생태적 가치가 높은 섬들
          <br />
          <br />
          <b>국가유산청 관리 (자연유산법)</b>
          <br />
          천연보호구역: 문섬·범섬 천연보호구역 등<br />
          명승: 거제 해금강 등 해안 경관이 탁월한 곳
          <br />
          <br />
          <b>국제적 지위 및 다중 보호지역 (International Designations)</b>
          <br />
          국내법으로 보호되는 구역 중 국제적 중요성을 인정받아 중복 지정된
          형태다. 30*30 통계 산출 시 가장 질 높은 보호구역으로 평가받는다.
          <br />
          <br />
          <b>람사르 습지(Ramsar Sites)</b>: 물새 서식지로서 국제적 가치가 있는
          습지
          <br />
          유네스코 세계유산(World Heritage): '한국의 갯벌'처럼 탁월한 보편적
          가치를 지닌 구역
          <br />
          생물권보전지역(Biosphere Reserves): 보전과 지속 가능한 이용을
          조화시키는 구역
        </div>
      </Layout>
    </Modal>
  );
};

export default QuestionModal;
