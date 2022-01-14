import data from "../data/data";
import { Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "../index.css";

function SrmSlider(props) {
  const {
    value,
    abvGt,
    abvLt,
    optionSRM,
    srmValue,
    setBeerData,
    setOptionSRM,
    setSRMValue,
    phValue,
  } = props;

  const srmChange = (event, newValue) => {
    setSRMValue(newValue);
    srmHandler(newValue);
  };

  function srmHandler(srmValue) {
    if (abvGt === true) {
      if (optionSRM === false) {
        fetch(`${data}&abv_gt=${value}`)
          .then((response) => response.json())
          .then((json) => {
            const result = json.filter((j) => srmValue < j.srm);
            setBeerData(
              result.filter((j) => phValue[0] < j.ph && j.ph < phValue[1])
            );
          });
      } else {
        fetch(`${data}&abv_gt=${value}`)
          .then((response) => response.json())
          .then((json) => {
            setBeerData(
              json.filter((j) => phValue[0] < j.ph && j.ph < phValue[1])
            );
          });
      }
    } else if (abvLt === true) {
      fetch(`${data}&abv_lt=${value}`)
        .then((response) => response.json())
        .then((json) => {
          setBeerData(json.filter((j) => srmValue < j.srm));
        });
    } else {
      fetch(`${data}`)
        .then((response) => response.json())
        .then((json) => {
          setBeerData(json.filter((j) => j.srm != null && srmValue < j.srm));
        });
    }
  }
  return (
    <>
      <Col md="auto">
        <input
          className="form-check-input "
          type="checkbox"
          checked={!optionSRM}
          id="inlineCheckbox1"
          onChange={() => {
            optionSRM === true ? setOptionSRM(false) : setOptionSRM(true);
          }}
        />
        <label className="form-check-label mx-1 fs-5" htmlFor="inlineCheckbox1">
          SRM
        </label>
      </Col>
      <Col md="auto">
        <Box sx={{ width: 150 }}>
          <Slider
            size="medium"
            getAriaLabel={() => "Temperature"}
            value={srmValue}
            aria-label="Small"
            min={0}
            max={152}
            step={0.1}
            valueLabelDisplay="auto"
            disabled={optionSRM}
            onChange={srmChange}
          />
        </Box>
      </Col>
    </>
  );
}

export default SrmSlider;
