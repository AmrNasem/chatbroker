import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ResponsiveContainer } from 'recharts';
import { Container } from 'react-bootstrap';
import styles from "./StatisticsPerMonth.module.css";

const data = [
  { name: 'Jan', productsSolde: 20000, totalViews: 24000 },
  { name: 'Feb', productsSolde: 10000, totalViews: 13980 },
  { name: 'Mar', productsSolde: 15000, totalViews: 14800 },
  { name: 'Apr', productsSolde: 27800, totalViews: 39080 },
  { name: 'May', productsSolde: 18900, totalViews: 48000 },
  { name: 'Jun', productsSolde: 23900, totalViews: 38000 },
  // Add more data points as needed
];

const MyLineChart = () => {
  return (
    <div>
      <h2 className={styles.title}>Statistics</h2>
      <Container className='bg-white p-2'>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorProductsSolde" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTotalViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="productsSolde"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorProductsSolde)"
            />
            <Area
              type="monotone"
              dataKey="totalViews"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorTotalViews)"
            />
            <Line type="monotone" dataKey="productsSolde" stroke="#8884d8" />
            <Line type="monotone" dataKey="totalViews" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Container>
    </div>
  );
};

export default MyLineChart;
