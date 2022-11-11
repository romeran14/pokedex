import React, {Fragment} from "react";
import { Radar } from "react-chartjs-2";
import  Chart  from 'chart.js';


const GraficarRadar = (stats) => {
  const typeColor = () => {
    switch (stats.stats.types[0].type.name) {
      case "electric":
        return "255, 232, 0";
       
      case "normal":
        return "227, 227, 227";

       
      case "bug":
        return "120, 187, 4 ";

       
      case "dark":
        return "52, 29, 113";

       
      case "dragon":
        return "0, 141, 98";

       
      case "fairy":
        return "230, 70, 140";

       
      case "fighting":
        return "200, 0, 0 ";

       
      case "flying":
        return "70, 136, 207";

       
      case "ghost":
        return "99, 0, 181";

       
      case "grass":
        return "12, 160, 0";

       
      case "ground":
        return "180, 75, 19";

       
      case "ice":
        return "0, 255, 212";

       
      case "poison":
        return "76, 43, 146";

       
      case "psychic":
        return "215, 27, 212";

       
      case "rock":
        return "48, 19, 11";

       
      case "steel":
        return "74, 74, 74";

       
      case "water":
        return "4, 0, 255";

       
      case "fire":
        return "255, 23, 0";

       

      default:
        return "227, 227, 227";
        console.log("no se consiguen coincidencias");
    }
  };
  const parametros = stats.stats.stats;
  const data = {
    labels: ["HP", "ATK", "DEF", "SP.ATK", "SP.DEF", "SPD"],
    datasets: [
      {
        label: "Stat",
        data: [
          parametros[0].base_stat,
          parametros[1].base_stat,
          parametros[2].base_stat,
          parametros[3].base_stat,
          parametros[4].base_stat,
          parametros[5].base_stat,
        ],
        fill: true,
        backgroundColor: `rgba(${typeColor()}, 0.3)`,
        borderColor: `rgba(${typeColor()})`,
        pointBackgroundColor: `rgba(${typeColor()})`,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: `rgba(${typeColor()})`,
        lineTension: 0.1,
        borderWidth: 2,
        pointRadius: 1.5,
      },
    ],
  };

  const RadarOptions = {
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
    scale: {
      legend: {
        display: false,
      },
      ticks: {
        min: 10,
        max: 160,
        stepSize: 40,
        showLabelBackdrop: false,
        backdropColor: "rgba(203, 197, 11, 1)",
        fontSize: 10,
        fontColor: "transparent",
        fontFamily: "'Lato', sans-serif",
      },
      angleLines: {
        color: "white",
        lineWidth: 1,
      },
      gridLines: {
        color: "white",
        circular: false,
      },
      pointLabels: {
        fontSize: 10,
        fontStyle: "700",
        fontColor: "white",
        fontFamily: "'Lato', sans-serif",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Fragment>
      {parametros?.length !== 0 ? (
        <Radar data={data} options={RadarOptions}></Radar>
      ) : (
        <p className="error">no hay parametros</p>
      )}
    </Fragment>
  );
};

export default GraficarRadar