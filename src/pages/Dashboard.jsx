import StatisticsCard from "../components/Dashbaord/StatisticsCard";
import StatisticsPerMonth from "../components/Dashbaord/StatisticsPerMonth";
import TrendingSearch from "../components/Dashbaord/TrendingSearch";
import LastReview from "../components/Dashbaord/lastReview";
import styles from "./Dashbaord.module.css";

const color = { exchangeColor: "#6ce5a9", soldColor: "#8884d8", earningsColor: "#71dfff" };

const Dashboard = () => {
  const titles = { t1: "Total Exchange", t2: "Total Sold", t3: "Total Earnings" };
  const value = { exchangeValue: "125K", soldValue: "222k", earningsValue: "125" };
  const ChangeInValue = { exchangeChangeInValue: "24%", soldChangeInValue: "33%", earningsChangeInValue: "12%" };

  return (
    <div className={`d-flex flex-column ${styles.mainPage} pb-5`} dir="ltr">
      <div className="d-flex flex-row m-4 gap-3 justify-content-between">
        <StatisticsCard statisticsTitle={titles.t1} color={color.exchangeColor} value={value.exchangeValue} ChangeInValue={ChangeInValue.exchangeChangeInValue} />
        <StatisticsCard statisticsTitle={titles.t2} color={color.soldColor} value={value.soldValue} ChangeInValue={ChangeInValue.soldChangeInValue} />
        <StatisticsCard statisticsTitle={titles.t3} color={color.earningsColor} value={value.earningsValue} ChangeInValue={ChangeInValue.earningsChangeInValue} />

      </div>
      <div className="" dir="ltr">
        <StatisticsPerMonth />
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <LastReview />
          </div>
          <div className="col-md-4">
            <TrendingSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;