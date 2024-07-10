import { ResponsivePie } from "@nivo/pie";
import styled from "styled-components";
import { useState } from "react";
import SelectInput from "@/shared/components/Input/SelectInput";
import { GetCategorySaleRequest } from "../api/dashbardApi";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import { CiDollar } from "react-icons/ci";

const Container = styled.div`
  padding: 2rem;
  height: 30rem;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  background-color: white;
`;

const options = [
  { label: "This week", value: "thisweek" },
  { label: "Last week", value: "lastweek" },
  { label: "Total", value: "total" },
  { label: "Today", value: "today" },
];

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

const CategoryPieChart = () => {
  const [selectedOption, setSelectedOption] = useState(options[2]);
  const getCategorySaleRequest = GetCategorySaleRequest(selectedOption.value);

  return (
    <Container>
      <Header>
        <h4>
          Sale by Categoroy <CiDollar />
        </h4>
        <SelectInput options={options} state={selectedOption} setState={setSelectedOption} />
      </Header>
      {getCategorySaleRequest.isSuccess && (
        <ResponsivePie
          data={getCategorySaleRequest.data.data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: "purple_orange" }}
          borderWidth={5}
          borderColor={{ theme: "background" }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabel="value"
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", "2"]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
        />
      )}
    </Container>
  );
};

export default CategoryPieChart;
