import { Area, AreaConfig } from '@ant-design/charts';
import { format } from 'date-fns';
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
    color: ['#0099ff', '#274060'],
    areaStyle: { fillOpacity: 1 },
    height: 400,
    xField: 'yearMonth',
    yField: 'value',
    seriesField: 'category',
    legend: {
      itemName: {
        formatter(legend) {
          return legend === 'totalRevenues'
            ? 'Receitas'
            : 'Despesas';
        },
      },
    },
    xAxis: {
      label: {
        formatter(item) {
          return format(new Date(item), 'MM/yyyy');
        },
      },
    },
    point: {
      size: 5,
      shape: 'circle',
    },
  };
  return <Area {...config} />;
}
