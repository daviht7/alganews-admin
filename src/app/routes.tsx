import { message, notification } from 'antd';
import CustomError from 'daviht7-sdk/dist/CustomError';
import { useEffect } from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import CashFlowExpensesView from './views/CashFlowExpenses.view';
import CashFlowRevenuesView from './views/CashFlowRevenues.view';
import HomeView from './views/Home.view';
import PaymentCreateView from './views/PaymentCreate.view';
import PaymentListView from './views/PaymentList.view';
import UserCreateView from './views/UserCreate.view';
import UserListView from './views/UserList.view';

export default function Routes() {
  useEffect(() => {
    window.onunhandledrejection = ({ reason }) => {
      if (reason instanceof CustomError) {
        if (reason.data?.objects) {
          reason.data.objects.forEach((error) => {
            message.error(error.userMessage);
          });
        } else {
          notification.error({
            message: reason.message,
            description: reason.data?.detail,
          });
        }
      }
    };
  });

  return (
    <Switch>
      <Route path={'/'} element={<HomeView />} />
      <Route
        path={'/usuarios/criacao'}
        element={<UserCreateView />}
      />
      <Route
        path={'/usuarios'}
        element={<UserListView />}
      />
      <Route
        path={'/pagamentos'}
        element={<PaymentListView />}
      />
      <Route
        path={'/pagamentos/criacao'}
        element={<PaymentCreateView />}
      />
      <Route
        path={'/fluxo-de-caixa/despesas'}
        element={<CashFlowExpensesView />}
      />
      <Route
        path={'/fluxo-de-caixa/receitas'}
        element={<CashFlowRevenuesView />}
      />
    </Switch>
  );
}
