import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import data from "../data/data";
import Paginate from "../components/Pagination";
import Search from "../components/Search";
import ResetButton from "../components/ResetButton";
import AbvButtons from "../components/AbvButtons";
import AbvSlider from "../components/AbvSlider";
import PhSlider from "../components/PhSlider";
import SrmSlider from "../components/SrmSlider";

function Main() {
  const [beerData, setBeerData] = useState([]);
  const [q, setQ] = useState([]);
  const [offset, setOffset] = useState(0);
  const [abvGt, setAbvGt] = useState(false);
  const [abvLt, setAbvLt] = useState(false);
  const [noOption, setNoOption] = useState(false);
  const [value, setValue] = useState(0);
  const [phValue, setPhValue] = useState([0, 7]);
  const [optionPH, setOptionPH] = useState(true);
  const [optionSRM, setOptionSRM] = useState(true);
  const [srmValue, setSRMValue] = useState(0);

  useEffect(() => {
    fetch(data)
      .then((response) => response.json())
      .then((json) => {
        setBeerData(json);
        console.log(beerData);
      });
  }, []);

  function imageHandler(image) {
    if (image != null) {
      if (
        image.includes("keg") ||
        image.includes("24") ||
        image.includes("54")
      ) {
        return <Card.Img src={`${image}`} className="pagination-img" />;
      } else {
        return <Card.Img src={`${image}`} className="w-25 " />;
      }
    } else {
      console.log(image);
    }
  }

  return (
    <>
      <Row className="m-5 row justify-content-md-center">
        <Search q={q} setQ={setQ} />
        <ResetButton
          setQ={setQ}
          setBeerData={setBeerData}
          setPhValue={setPhValue}
          setValue={setValue}
          setNoOption={setNoOption}
          setOptionPH={setOptionPH}
          setSRMValue={setSRMValue}
          setOptionSRM={setOptionSRM}
        />
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <AbvButtons
            setAbvGt={setAbvGt}
            setAbvLt={setAbvLt}
            setNoOption={setNoOption}
          />
        </Col>
        <Col md="auto">
          <AbvSlider
            abvGt={abvGt}
            abvLt={abvLt}
            value={value}
            phValue={phValue}
            setBeerData={setBeerData}
            setValue={setValue}
            optionPH={optionPH}
            noOption={noOption}
            srmValue={srmValue}
            optionSRM={optionSRM}
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <PhSlider
          abvGt={abvGt}
          abvLt={abvLt}
          value={value}
          phValue={phValue}
          optionPH={optionPH}
          setBeerData={setBeerData}
          setPhValue={setPhValue}
          setOptionPH={setOptionPH}
          srmValue={srmValue}
          optionSRM={optionSRM}
        />
      </Row>
      <Row className="justify-content-md-center">
        <SrmSlider
          abvGt={abvGt}
          abvLt={abvLt}
          value={value}
          srmValue={srmValue}
          optionSRM={optionSRM}
          setBeerData={setBeerData}
          setSRMValue={setSRMValue}
          setOptionSRM={setOptionSRM}
          phValue={phValue}
          optionPH={optionPH}
        />
      </Row>
      <Container>
        <Row>
          {/* pagination filter */}
          {beerData
            .filter((d) => d.name.toLowerCase().startsWith(q))
            .slice(offset, offset + 10)
            .map((data, k) => (
              <Col key={k} xs={12} md={4} lg={3}>
                <Card className="m-2">
                  {imageHandler(data.image_url)}
                  <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>{data.first_brewed}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
      <Paginate
        beerData={beerData}
        setBeerData={setBeerData}
        offset={offset}
        setOffset={setOffset}
      />
    </>
  );
}
export default Main;
