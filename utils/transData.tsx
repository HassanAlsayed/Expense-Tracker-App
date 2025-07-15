import React, { useState } from 'react'
import { FlatList, Pressable, View,Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from '@/app/styles';
import { FlatListType } from './types';
import fn from '../utils/scaling';
import ModalBlock from './modal';
import { useDataStore } from './useData';

function TransData({expenses,setModalVisible,modalVisible}:FlatListType) {

  const [id,setId] = useState('');
  const {currency} = useDataStore();
 return(
  <>
     <FlatList
        style={style.scrollContainer}
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <>
          <Pressable
            onLongPress={() => {
              setModalVisible(true)
              setId(item.id)
            }
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
                        + {item.value} {currency}
                      </Text>
                    ) : (
                      <Text style={{ color: 'red' }}>
                        - {item.value} {currency}
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
           
    </>
        )}
      />
           <ModalBlock
                modalVisible={modalVisible}
                setModalVisible={setModalVisible }
                id={id}
            />
    </>
 )
}

export default TransData