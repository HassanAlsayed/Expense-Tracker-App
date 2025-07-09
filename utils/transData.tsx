import React from 'react'
import { FlatList, Pressable, View,Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from '@/app/styles';
import { FlatListType } from './types';
import fn from '../utils/scaling';


function TransData({expenses,setModalVisible}:FlatListType) {
 return(
     <FlatList
        style={style.scrollContainer}
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onLongPress={() =>
              setModalVisible(true)
            }
          >
            <View style={style.seeAllTex}>
              <View style={style.leftBlock}>
                <Icon name={item.icon} size={fn.wp(8)} color="#ccc" />
                <Text style={style.transactionName}>{item.name}</Text>
              </View>

              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={style.transactionSign}>
                    {item.type === 'income' ? (
                      <Text style={{ color: 'green' }}>
                        + {item.value}{item.currency}
                      </Text>
                    ) : (
                      <Text style={{ color: 'red' }}>
                        - {item.value}{item.currency}
                      </Text>
                    )}
                  </Text>
                </View>
                <Text style={style.transactionDate}>
                 {item.createdAt}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
 )
}

export default TransData