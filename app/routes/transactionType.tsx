import {useState} from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import { width } from '@/utils/scaling';
import { ExpenseRoute } from './expenseRoute';
import { IncomeRoute } from './incomeRoute';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { transactionTypePosition } from '@/utils/types';


  
export default function TransactionType() {
const { indexPage, indexPos,amount,id,Name,Icon,TypeClicked} = useLocalSearchParams();

const indexPosNum = indexPos !== undefined && !isNaN(Number(indexPos))
  ? Number(indexPos)
  : undefined;


const [index,setIndex] = useState<number>(Number(indexPage) || 0);
  const [routes] = useState([
    { key: 'expense', title: 'Expense' },
    { key: 'income', title: 'Income' },
  ]);

  const renderScene = ({route}:transactionTypePosition) =>{
   if (route.key === 'expense') {
  return <ExpenseRoute indexPos={indexPosNum} amount={Number(amount)} id={String(id)} Name={String(Name)}
   Icon={String(Icon)} TypeClicked={String(TypeClicked)}/>;
}

if (route.key === 'income') {
  return <IncomeRoute indexPos={indexPosNum} amount={Number(amount)} id={String(id)} Name={String(Name)} 
  Icon={String(Icon)} TypeClicked={String(TypeClicked)}/>;
}

  }

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


