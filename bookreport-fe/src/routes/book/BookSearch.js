import { useLocation } from "react-router-dom";

function ReportForm() {
  const location = useLocation();
  const keyword = location.state.keyword;

  return (
    <div>
      <h1>책 결과 페이지</h1>
      <p>검색어 : {keyword}</p>
    </div>
  );
}

export default ReportForm;
