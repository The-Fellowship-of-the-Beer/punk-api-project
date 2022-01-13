function AbvButtons(props){
  const {setAbvGt, setAbvLt, setNoOption} = props;

  function buttonHandler(event) {
    console.log(event.target.id);
    if (event.target.id === "button-none") {
      document.getElementById("button-gt").disabled = true;
      document.getElementById("button-lt").disabled = true;
      setNoOption(true);
    } else if (event.target.id === "button-gt") {
      document.getElementById("button-none").disabled = true;
      document.getElementById("button-lt").disabled = true;
      setAbvGt(true);
      setAbvLt(false);
    } else if (event.target.id === "button-lt") {
      document.getElementById("button-none").disabled = true;
      document.getElementById("button-gt").disabled = true;
      setAbvLt(true);
      setAbvGt(false);
    }
  }
  return<>
          
         
            <div>
              <div
                className="btn-group mb-4"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  id="button-none"
                  onClick={buttonHandler}
                  className="btn btn-outline-dark "
                >
                  None
                </button>
                <button
                  type="button"
                  id="button-gt"
                  onClick={buttonHandler}
                  className="btn btn-outline-dark "
                >
                  Greater Than
                </button>
                <button
                  type="button"
                  id="button-lt"
                  onClick={buttonHandler}
                  className="btn btn-outline-dark "
                >
                  Lower Than
                </button>
              </div>
            </div>
          
  </>
}

export default AbvButtons;