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
    console.log(amounts);

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
        console.log(num);
        return num;
      }
    }
  }

  function tester() {
    return 5;
  }

  return (
    <div className="app">
      <div className="balance">
        <p style={{ fontSize: "small" }}>My balance</p>
        <h3>$921.48</h3>
      </div>
      <div className="spending">
        <h3>Spending - Last 7 days</h3>
        <div className="chart">
          {dailyData.map((data, index) => {
            return (
              <div>
                <div
                  className="barchart"
                  key={index}
                  style={
                    ({
                      backgroundColor:
                        data.day === day
                          ? "hsl(186, 34%, 60%)"
                          : "hsl(10, 79%, 65%)",
                    },
                    { height: (data.amount / findHighest()) * 100 })
                  }
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
