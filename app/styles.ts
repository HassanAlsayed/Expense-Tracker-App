import { StyleSheet } from 'react-native';
import fn from '../utils/scaling';

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: fn.wp(4), 
    paddingVertical: fn.hp(5), 
    backgroundColor:'#050F28'
  },
  
  balanceBox: {
    backgroundColor: 'green',
    marginHorizontal: fn.wp(2),
    marginVertical: fn.hp(2),
    minHeight: fn.hp(20),
    borderRadius: fn.wp(4),
    padding: fn.wp(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  titleText: {
    fontSize: fn.getFontSize(18),
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: fn.hp(1),
  },
  
  balanceAmount: {
    fontSize: fn.getFontSize(28),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: fn.hp(3),
  },
  
  innerCon: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: fn.hp(2),
    gap: fn.wp(3),
  },
  
  incomeBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    flex: 1,
    borderRadius: fn.wp(3),
    padding: fn.wp(4),
    alignItems: 'center',
    minHeight: fn.hp(10),
    justifyContent: 'center',
  },
  
  expenseBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    flex: 1,
    borderRadius: fn.wp(3),
    padding: fn.wp(4),
    alignItems: 'center',
    minHeight: fn.hp(10),
    justifyContent: 'center',
  },
  
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: fn.hp(1),
    gap: fn.wp(2),
  },
  
  boxTitle: {
    fontSize: fn.getFontSize(14),
    color: '#666',
    fontWeight: '500',
  },
  
  amountText: {
    fontSize: fn.getFontSize(18),
    fontWeight: 'bold',
    color: '#333',
  },
  
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: fn.wp(4),
    marginTop: fn.hp(3),
    marginBottom: fn.hp(2),
  },
  
  recentText: {
    fontSize: fn.getFontSize(20),
    fontWeight: 'bold',
    color: 'white',
  },
  
  seeAllButton: {
    paddingHorizontal: fn.wp(4),
    paddingVertical: fn.hp(1),
    borderRadius: fn.wp(4),
  },
  
  seeAllText: {
    backgroundColor: '#061A40',
    borderRadius: fn.wp(3),
    padding: fn.wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color:'green'
  },
    seeAllTex: {
    backgroundColor: '#061A40',
    borderRadius: fn.wp(3),
    padding: fn.wp(4),
    marginBottom: fn.hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: fn.hp(8),
    color:'green'
  },
  
  transactionName: {
    fontSize: fn.getFontSize(18),
    color: 'white',
    fontWeight: '500',
    textTransform: 'capitalize',
    minWidth: fn.wp(25),
    paddingLeft:10
  },

  leftBlock: {
  flexDirection: 'row',
  alignItems: 'center',
  maxWidth: fn.wp(60), 
  flexShrink: 1,
},
  
  transactionSign: {
    fontSize: fn.getFontSize(18),
    fontWeight: 'bold',
    textAlign: 'right',
  },
  
  transactionDate: {
    fontSize: fn.getFontSize(16),
    color: 'white',
    opacity: 0.7,
    textAlign: 'right',
  },
  
  valueContainer: {
    width: fn.wp(35),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  
  text: {
    fontSize: 16,
    color: '',
    marginBottom: 4,
  },
  
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  emptyText: {
    fontSize: fn.getFontSize(16),
    color: '#666',
    fontWeight: '500',
  },
  
  scrollContainer: {
    flex: 1,
    marginTop: fn.hp(1),
    marginBottom:fn.hp(-8),
  },
   addButton: {
    backgroundColor: '#061A40',
    borderRadius: fn.wp(3),
    padding: fn.wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color:'green'
  },
});

export default style;