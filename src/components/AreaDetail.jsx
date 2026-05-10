import Modal, { Layout, Title } from "../components/Modal";
import { useModalStore } from "../stores/hooks";

const AreaDetailModal = ({ name, type }) => {
  const { closeModal } = useModalStore();

  return (
    <Modal>
      <div className="bg-white rounded-20 w-[480px] p-40 relative">
        <button
          onClick={closeModal}
          className="absolute top-16 right-20 text-gray-3 hover:text-gray-0 text-24 leading-none"
        >
          ×
        </button>
        <h2 className="text-20 font-bold text-gray-0 mb-8">{name}</h2>
        <span
          className="inline-block text-13 text-white px-10 py-4 rounded-6"
          style={{ backgroundColor: TYPE_COLOR_MAP[type] ?? "#0b5394" }}
        >
          {type ?? "유형 정보 없음"}
        </span>
      </div>
    </Modal>
  );
};

const TYPE_COLOR_MAP = {
  국립공원: "#006400",
  습지보호지역: "#1E90FF",
  해양생태계보호구역: "#0b5394",
  천연기념물: "#DAA520",
  천연보호구역: "#8B4513",
  유네스코자연유산: "#800080",
  람사르습지: "#00CED1",
  환경보전해역: "#32b432",
};

export default AreaDetailModal;
