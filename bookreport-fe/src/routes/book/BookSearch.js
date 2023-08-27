import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";

function ReportForm() {
  const location = useLocation();
  const keyword = location.state.keyword;

  return (
    <Layout>
      <Hero>
        <div>
          <h1>책 결과 페이지</h1>
          <p>검색어 : {keyword}</p>
        </div>
      </Hero>
    </Layout>
  );
}

export default ReportForm;
