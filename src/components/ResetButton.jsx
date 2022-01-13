import Search from "./Search";

function ResetButton(props){
  const {setQ, setBeerData, setValue, setPhValue, setNoOption, setOptionPH, setOptionSRM, setSRMValue} = props;

  function inputResetHandler() {
    setQ("");
    setValue(0);
    setNoOption(false);
    setOptionPH(true);
    setPhValue([0, 7]);
    setOptionSRM(true);
    setSRMValue(0);
    document.getElementById("search").value = "";
    document.getElementById("button-gt").disabled = false;
    document.getElementById("button-lt").disabled = false;
    document.getElementById("button-none").disabled = false;
    fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=60`)
      .then((response) => response.json())
      .then((json) => {
        setBeerData(json);
      });
  }

  
  return <> 
    <div className="col-md-1">
    <button
      type="reset"
      className="btn btn-dark text-light"
      onClick={inputResetHandler}
    >
      Reset
    </button>
  </div>
</>
}

export default ResetButton;
