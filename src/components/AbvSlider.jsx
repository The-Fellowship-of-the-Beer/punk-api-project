import data from "../data/data";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import '../index.css';

function AbvSlider(props){
  const{abvGt, abvLt, setBeerData, value, setValue, phValue, optionPH, noOption, optionSRM, srmValue} = props;
  
  function sliderHandler() {
    if (abvGt === true) {
      fetch(
        `${data}&abv_gt=${value}`
      )
        .then((response) => response.json())
        .then((json) => {
          if (optionPH === false && optionSRM === true) {
            console.log(phValue);
            const result = json.filter(
              (j) => j.ph != null && phValue[0] < j.ph && j.ph < phValue[1]
            );
            console.log(result);
            setBeerData(result);
          } else if(optionSRM === false && optionPH === true){
            setBeerData(
              json.filter((j) => srmValue < j.srm)
            );
          }else if(optionPH === false && optionSRM === false){
            const result = json.filter(
              (j) => j.ph != null && phValue[0] < j.ph && j.ph < phValue[1]
            );
            setBeerData(result.filter((j) => srmValue < j.srm))
          }
          else {
            setBeerData(json);
          }
        });
    } else if (abvLt === true) {
      fetch(
        `${data}&abv_lt=${value}`
      )
        .then((response) => response.json())
        .then((json) => {
          if (optionPH === false) {
            console.log(phValue);
            const result = json.filter(
              (j) => j.ph != null && phValue[0] > j.ph && j.ph > phValue[1]
            );
            console.log(result);
            setBeerData(result);
          } else {
            setBeerData(json);
          }
        });
    }
  }

  return <>
     <Box sx={{ width: 150 }}>
        <Slider
          size="medium"
          id="firstSlider"
          getAriaLabel={() => "Temperature"}
          value={value}
          aria-label="Small"
          min={0}
          max={100}
          valueLabelDisplay="auto"
          disabled={noOption}
          onChange={(e) => {
            setValue(+e.target.value);
            sliderHandler();
            console.log(value);
          }}
        />
      </Box>
  </>
}
export default AbvSlider;