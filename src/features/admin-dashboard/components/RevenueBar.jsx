import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";
import { useState } from "react";
import { GetMonthlySaleRequest } from "../api/dashbardApi";
import { CiDollar } from "react-icons/ci";

const Container = styled.div`
  padding: 2rem;
  height: 30rem;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;

  > h4 {
    display: flex;
    align-items: center;
    gap: 1rem;

    > svg {
      font-size: 2rem;
    }
  }
`;

const data = [
  {
    month: "AD",
    "hot dog": 178,
  },
  {
    month: "AE",
    burger: 109,
  },
  {
    month: "AF",

    sandwich: 59,
  },
  {
    month: "AG",

    kebab: 190,
  },
  {
    month: "AI",

    fries: 79,
  },
  {
    month: "AL",

    donut: 36,
  },
];

export default function RevenueBar() {
  const getMonthlySaleRequest = GetMonthlySaleRequest(2024);

  return (
    <Container>
      <Header>
        <h4>
          Monthly Revenue <CiDollar />
        </h4>
      </Header>
      {getMonthlySaleRequest.isSuccess && (
        <ResponsiveBar
          data={getMonthlySaleRequest.data.data.map((item) => {
            return { month: item.month, [item.month]: item.revenue };
          })}
          keys={[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
          indexBy="month"
          margin={{ top: 20, right: 0, bottom: 50, left: 60 }}
          padding={0.9}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "category10" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "fries",
              },
              id: "dots",
            },
            {
              match: {
                id: "sandwich",
              },
              id: "lines",
            },
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "month",
            legendPosition: "middle",
            legendOffset: 32,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Sale",
            legendPosition: "middle",
            legendOffset: -40,
            truncateTickAt: 0,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
        />
      )}
    </Container>
  );
}
