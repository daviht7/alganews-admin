import { Area, AreaConfig } from '@ant-design/charts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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
    height: 256,
    xField: 'yearMonth',
    yField: 'value',
    seriesField: 'category',
    yAxis: false,
    tooltip: {
      title(title) {
        return format(new Date(title), 'MMMM yyyy', {
          locale: ptBR,
        });
      },
      formatter(data) {
        return {
          name:
            data.category === 'totalRevenues'
              ? 'Receitas'
              : 'Despesas',
          value: (data.value as number).toLocaleString(
            'pt-BR',
            {
              currency: 'BRL',
              style: 'currency',
              maximumFractionDigits: 2,
            }
          ),
        };
      },
    },
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
