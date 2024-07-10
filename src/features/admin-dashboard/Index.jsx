import styled from "styled-components";
import { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import CategoryPieChart from "./components/CategoryPieChart";
import RevenueBar from "./components/RevenueBar";
import StreamRevenue from "./components/StreamRevenue";
import StreamNumberOfOrder from "./components/StreamNumberOfOrder";
import GetRecentOrder from "./components/GetRecentOrder";
import { GetOrderDashBoardRequest } from "./api/dashbardApi";

const Container = styled.div`
  width: 75rem;
  margin: 2rem auto;
`;

const ChartBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Below = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const OrderStatus = styled.div`
  padding: 1rem;
  height: 30rem;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  background-color: white;
`;

const OrderStatusContent = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  & span {
    font-weight: 900;
  }
`;

const StatusHeader = styled.div`
  padding: 1rem;
  h4 {
    font-weight: 500;
  }
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export default function AdminDashBoard() {
  const getOrderDashBoardRequest = GetOrderDashBoardRequest();

  return (
    <Container>
      <Content>
        <ChartBar>
          <CategoryPieChart />
          <RevenueBar />
        </ChartBar>
        <Below>
          <div>
            <StreamRevenue />
            <StreamNumberOfOrder />
          </div>
          <OrderStatus>
            <StatusHeader>
              <h4>Order Status</h4>
            </StatusHeader>
            {getOrderDashBoardRequest.isSuccess && (
              <OrderStatusContent>
                <div>
                  <p>
                    {getOrderDashBoardRequest.data.data.successOrder} order <span>success</span>
                  </p>
                </div>
                <div>
                  <p>
                    {getOrderDashBoardRequest.data.data.deliveryOrder} order is{" "}
                    <span>being deliver</span>
                  </p>
                </div>
                <div>
                  <p>
                    {getOrderDashBoardRequest.data.data.acceptedOrder} order is{" "}
                    <span>not yet to deliver</span>
                  </p>
                </div>
                <div>
                  <p>
                    {getOrderDashBoardRequest.data.data.deniedOrder} order <span>denied</span>
                  </p>
                </div>
                <div>
                  <p>
                    {getOrderDashBoardRequest.data.data.cancelOrder} order <span>cancel</span>
                  </p>
                </div>
                <div>
                  <p>
                    {getOrderDashBoardRequest.data.data.refundOrder} order <span>refund</span>
                  </p>
                </div>
                <div>
                  <p>
                    {getOrderDashBoardRequest.data.data.exchangeOrder} order <span>exchange</span>
                  </p>
                </div>
              </OrderStatusContent>
            )}
          </OrderStatus>
        </Below>
        <GetRecentOrder />
      </Content>
    </Container>
  );
}
