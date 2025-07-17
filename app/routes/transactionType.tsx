import { useState } from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, useWindowDimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ExpenseRoute } from './expenseRoute';
import { IncomeRoute } from './incomeRoute';

export default function TransactionType() {
  const layout = useWindowDimensions();

  const {
    indexPage,
    indexPos,
    amount,
    id,
    Name,
    Icon,
    TypeClicked
  } = useLocalSearchParams();

  const indexPosNum =
    indexPos !== undefined && !isNaN(Number(indexPos))
      ? Number(indexPos)
      : undefined;

  const [index, setIndex] = useState<number>(Number(indexPage) || 0);
  const [routes] = useState([
    { key: 'expense', title: 'Expense' },
    { key: 'income', title: 'Income' },
  ]);

  const sharedProps = {
    indexPos: indexPosNum,
    amount: Number(amount),
    id: String(id),
    Name: String(Name),
    Icon: String(Icon),
    TypeClicked: String(TypeClicked),
  };

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'expense':
        return (
          <View style={{ flex: 1 }}>
            <ExpenseRoute {...sharedProps} />
          </View>
        );
      case 'income':
        return (
          <View style={{ flex: 1 }}>
            <IncomeRoute {...sharedProps} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'blue' }}
            style={{ backgroundColor: '#111' }}
          />
        )}
        lazy
      />
    </SafeAreaView>
  );
}
