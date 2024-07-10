import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";
import { useState } from "react";
import { GetMonthlySaleRequest } from "../api/dashbardApi";
import { CiDollar } from "react-icons/ci";
import { ResponsiveStream } from "@nivo/stream";
import { GetStreamNumberOfOrderRequest } from "../api/dashbardApi";
import SelectInput from "@/shared/components/Input/SelectInput";
import formatDollar from "@/shared/utils/FormatDollar";
import { IoBagHandleOutline } from "react-icons/io5";

const Container = styled.div`
  padding: 2rem;
  border-radius: 5px;
  height: 14rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 14px;
  > svg {
    font-size: 2rem;
  }

  > h4 {
    display: flex;
    align-items: flex-end;
    flex-direction: column;

    > span {
      font-weight: 100;
    }
  }
`;

const options = [
  { label: "This week", value: "thisweek" },
  { label: "Last week", value: "lastweek" },
  { label: "Total", value: "total" },
  { label: "Today", value: "today" },
];

const Content = styled.div`
  height: 8rem;

  > * {
    height: fit-content;
  }
`;

export default function StreamNumberOfOrder() {
  const [selectedOption, setSelectedOption] = useState(options[2]);
  const getStreamNumberOfOrderRequest = GetStreamNumberOfOrderRequest(selectedOption.value);

  const countTotalInCome = (data) => {
    let total = 0;
    if (!data) {
      return 0;
    }

    data.forEach((item) => (total += item.value));

    return total;
  };

  return (
    <Container>
      <Header>
        <IoBagHandleOutline />
        <h4>
          <span> Total Sales</span>
          {countTotalInCome(
            getStreamNumberOfOrderRequest.isSuccess && getStreamNumberOfOrderRequest.data.data
          )}
        </h4>
      </Header>

      <Content>
        {getStreamNumberOfOrderRequest.isSuccess && (
          <ResponsiveStream
            data={getStreamNumberOfOrderRequest.data.data}
            keys={["value"]}
            margin={{ top: -10, right: 0, bottom: -1, left: -1 }}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            enableGridY={false}
            curve="basis"
            offsetType="none"
            colors={{ scheme: "purple_blue_green" }}
            borderWidth={2}
            borderColor="#2377FC"
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#2c998f",
                size: 4,
                padding: 2,
                stagger: true,
              },
              {
                id: "squares",
                type: "patternSquares",
                background: "inherit",
                color: "#e4c912",
                size: 6,
                padding: 2,
                stagger: true,
              },
            ]}
            dotSize={8}
            dotColor={{ from: "color" }}
            dotBorderWidth={2}
            dotBorderColor={{
              from: "color",
              modifiers: [["darker", 0.7]],
            }}
            motionConfig="stiff"
          />
        )}
      </Content>
    </Container>
  );
}
