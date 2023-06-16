'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { day: 'Mon', activities: 2 },
  { day: 'Tue', activities: 3 },
  { day: 'Wed', activities: 4 },
  { day: 'Thu', activities: 5 },
  { day: 'Fri', activities: 6 },
  { day: 'Sat', activities: 7 },
  { day: 'Sun', activities: 8 },
];

const ActivityBarChart = () => {
  return (
    <BarChart width={100} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="activities" fill="#8884d8" />
    </BarChart>
  );
};

export default ActivityBarChart;

