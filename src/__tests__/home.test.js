import {render, screen} from '@testing-library/react';
import ReceiptsTable from '../pages/home/ReceiptsTable';
import TotalOrdersBarChart from '../pages/home/totalOrdersBarChart';
import {BrowserRouter} from "react-router-dom";

describe('Home page components', () => {
  const mockData = [
    {
      "OrderId": 1,
      "CustomerId": 1,
      "CustomerName": "Elizabeth",
      "Total": "$30.00",
      "Date": "2021-02-01 08:30:00.000",
      "Items": [
        {
          "Item": "Candle",
          "ItemPrice": "$3.00",
          "Quantity": "3"
        },
        {
          "Item": "Book",
          "ItemPrice": "$15.00",
          "Quantity": "1"
        },
        {
          "Item": "Pen",
          "ItemPrice": "$0.75",
          "Quantity": "1"
        },
        {
          "Item": "Paper",
          "ItemPrice": "$5.25",
          "Quantity": "1"
        }
      ]
    },
    {
      "OrderId": 2,
      "CustomerId": 2,
      "CustomerName": "Alexander",
      "Total": "$52.50",
      "Date": "2021-02-02 10:00:00.000",
      "Items": [
        {
          "Item": "Book",
          "ItemPrice": "$15.00",
          "Quantity": "1"
        },
        {
          "Item": "Jar",
          "ItemPrice": "$12.50",
          "Quantity": "3"
        }
      ]
    },
  ]
  test('renders ReceiptsTable component', () => {
    render(
      <BrowserRouter>
        <ReceiptsTable data={mockData} loading={false} error={null}/>
      </BrowserRouter>
    );
    const tableElement = screen.getByTestId('receipts-table');
    expect(tableElement).toBeInTheDocument();
  });

  test('renders TotalOrdersBarChart component', () => {
    render(<TotalOrdersBarChart data={mockData} loading={false} error={null}/>);
    const chartElement = screen.getByTestId('orders-chart');
    expect(chartElement).toBeInTheDocument();
  });
});
