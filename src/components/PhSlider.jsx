import data from "../data/data";
import { Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "../index.css";

function PhSlider(props) {
  const {
    value,
    abvGt,
    abvLt,
    optionPH,
    phValue,
    setBeerData,
    setOptionPH,
    setPhValue,
    optionSRM,
    srmValue,
  } = props;
  console.log(phValue);
  const handleChange = (event, newValue) => {
    setPhValue(newValue);
    phHandler(newValue);
  };

  function valuetext(valuetext) {
    return `${valuetext}°C`;
  }

  function phHandler(phvalue) {
    if (abvGt === true) {
      if (optionSRM === false) {
        fetch(`${data}&abv_gt=${value}`)
          .then((response) => response.json())
          .then((json) => {
            const result = json.filter((j) => srmValue < j.srm);
            setBeerData(
              result.filter((j) => phvalue[0] < j.ph && j.ph < phvalue[1])
            );
          });
      } else {
        fetch(`${data}&abv_gt=${value}`)
          .then((response) => response.json())
          .then((json) => {
            setBeerData(
              json.filter((j) => phvalue[0] < j.ph && j.ph < phvalue[1])
            );
          });
      }
    } else if (abvLt === true) {
      console.log(value);
      fetch(`${data}&abv_lt=${value}`)
        .then((response) => response.json())
        .then((json) => {
          setBeerData(
            json.filter((j) => phvalue[0] < j.ph && j.ph < phvalue[1])
          );
        });
    } else {
      fetch(`${data}`)
        .then((response) => response.json())
        .then((json) => {
          setBeerData(
            json.filter(
              (j) => j.ph != null && phvalue[0] < j.ph && j.ph < phvalue[1]
            )
          );
        });
    }
  }

  return (
    <>
      <Col md="auto">
        <input
          className="form-check-input "
          type="checkbox"
          checked={!optionPH}
          id="inlineCheckbox1"
          onChange={() => {
            optionPH === true ? setOptionPH(false) : setOptionPH(true);
          }}
        />
        <label className="form-check-label mx-1 fs-5" htmlFor="inlineCheckbox1">
          PH
        </label>
      </Col>
      <Col md="auto">
        <Box sx={{ width: 150 }}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={phValue}
            onChange={handleChange}
            // onChangeCommitted={handleChange}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            min={0}
            max={7}
            step={0.1}
            disabled={optionPH}
          />
        </Box>
      </Col>
    </>
  );
}

export default PhSlider;
