import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import { Card, Container } from "reactstrap";
import { useParams } from "react-router-dom";
import { customAxios } from "../../api/customAxios.js";
import { useEffect, useState } from "react";
import styles from "../../css/ReportDetail.module.css";

function ReportDetail() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");

  const findReportById = (id) => {
    customAxios.report_by_id(id).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
        setUsername(res.data.username);
      }
    });
  };

  useEffect(() => {
    findReportById(id);
  });

  return (
    <Layout>
      <Hero></Hero>
      <Container className="pb-5">
        <Card className="shadow mt--300 p-5">
          <div className={styles.reportBox}>
            <h4 className="display-4">{title}</h4>
            <p className="text-right text-muted font-weight-bold mb-0">
              작성자 : {username}
            </p>
            <hr className="mt-2" />
            <p className="lead">{content}</p>
          </div>
        </Card>
      </Container>
    </Layout>
  );
}

export default ReportDetail;
