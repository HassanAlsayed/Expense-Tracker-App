import {useState} from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { width } from '@/utils/scaling';
import { ExpenseRoute } from './expenseRoute';
import { IncomeRoute } from './incomeRoute';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function TransactionType() {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'expense', title: 'Expense' },
    { key: 'income', title: 'Income' },
  ]);

  const renderScene = SceneMap({
    expense: ExpenseRoute,
    income: IncomeRoute,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'blue' }}
          />
        )}
      />
    </SafeAreaView>
  );
}


