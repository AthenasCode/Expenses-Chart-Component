import "./App.css";
import dailyData from "./data/data.json";

function App() {
  let day = 0;
  switch (new Date().getDay()) {
    case 0:
      day = "sun";
      break;
    case 1:
      day = "mon";
      break;
    case 2:
      day = "tue";
      break;
    case 3:
      day = "wed";
      break;
    case 4:
      day = "thu";
      break;
    case 5:
      day = "fri";
      break;
    case 6:
      day = "sat";
  }

  function findHighest() {
    //put all amounts into an array
    let amounts = [];
    dailyData.map((data) => amounts.push(data.amount));

    //find highest number in amounts array
    for (let i = 0; i < amounts.length; i++) {
      //remove amounts[i] from the array
      let splicedArray = [...amounts];
      let num = splicedArray.splice(i, 1);
      let highest = false;
      //compare amounts[i] (num) with numbers in splicedArray
      for (let j = 0; j < splicedArray.length; j++) {
        //if it's less than any number, break out of this loop and check next number
        if (num < splicedArray[j]) {
          highest = false;
          break;
        }
        //if it's higher than all, it won't break out
        highest = true;
      }
      if (highest) {
        return num;
      }
    }
  }
  //cannot add hover state to inline styling, hence the onMouseEnter and onMouseLeave, which does the same thing.
  function hover(e) {
    e.target.style.opacity = 0.7;
    e.target.previousSibling.style.opacity = 1;
  }

  function noHover(e) {
    e.target.style.opacity = 1;
    e.target.previousSibling.style.opacity = 0;
  }

  return (
    <div className="app">
      <div className="balance">
        <div>
          <p style={{ fontSize: "small" }}>My balance</p>
          <h3>$921.48</h3>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "0.5rem",
          }}
        >
          <svg
            width="45"
            height="30"
            viewBox="0 0 72 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fill-rule="evenodd">
              <circle fill="#382314" cx="48" cy="24" r="24" />
              <circle stroke="#FFF" stroke-width="2" cx="24" cy="24" r="23" />
            </g>
          </svg>
        </div>
      </div>
      <div className="spending">
        <h3>Spending - Last 7 days</h3>
        <div className="chart">
          {dailyData.map((data, index) => {
            return (
              <div className="barchart">
                <div className="amount">${data.amount}</div>
                <div
                  className="bar"
                  id={data.day}
                  key={index}
                  style={
                    data.day === day
                      ? {
                          height: (data.amount / findHighest()) * 120,
                          backgroundColor: "hsl(186, 34%, 60%)",
                        }
                      : {
                          height: (data.amount / findHighest()) * 120,
                          backgroundColor: "hsl(10, 79%, 65%)",
                        }
                  }
                  onMouseEnter={hover}
                  onMouseLeave={noHover}
                ></div>
                <p
                  style={{
                    textAlign: "center",
                    color: "hsl(28, 10%, 53%)",
                    fontSize: "small",
                  }}
                >
                  {data.day}
                </p>
              </div>
            );
          })}
        </div>
        <div className="monthly">
          <div>
            <p style={{ fontSize: "small", color: "hsl(28, 10%, 53%)" }}>
              Total this month
            </p>
            <h1>$478.33</h1>
          </div>
          <div
            style={{
              marginTop: "1.2rem",
            }}
          >
            <p
              style={{
                fontSize: "small",
                fontWeight: "700",
                textAlign: "right",
              }}
            >
              +2.4%
            </p>
            <p style={{ fontSize: "small", color: "hsl(28, 10%, 53%)" }}>
              from last month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
