import { Area, AreaConfig } from '@ant-design/charts';
import { MetricService } from 'daviht7-sdk';
import { useEffect, useState } from 'react';
import transformDataIntoAntdChart from '../../core/utils/transformDataIntoAntdChart';

export default function CompanyMetrics() {
  const [data, setData] = useState<
    {
      yearMonth: string;
      value: number;
      category: 'totalRevenues' | 'totalExpenses';
    }[]
  >([]);

  useEffect(() => {
    MetricService.getMonthlyRevenuesExpenses()
      .then(transformDataIntoAntdChart)
      .then(setData);
  }, []);

  const config: AreaConfig = {
    data,
    color: ['#274060', '#0099ff'],
    areaStyle: { fillOpacity: 1 },
    height: 400,
    xField: 'yearMonth',
    yField: 'value',
    seriesField: 'category',
    point: {
      size: 5,
      shape: 'circle',
    },
  };
  return <Area {...config} />;
}
