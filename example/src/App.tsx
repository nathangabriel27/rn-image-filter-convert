import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Pressable } from 'react-native';
import ImageBase64 from './assets/data'

type FiltersListProps = {
  id: number;
  filterNome: string;
  filterApply: string;
}

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  //const [loading, setLoading] = useState<boolean>(true);

  const DATA = [
    {
      id: 1,
      filterNome: 'Normal',
      filterApply: 'Normal'
    },
    {
      id: 2,
      filterNome: 'Shades of gray',
      filterApply: 'shadesGray'
    },
    {
      id: 3,
      filterNome: 'Black and White',
      filterApply: 'blackAndWhite'
    }
  ];

  useEffect(() => {
    setImage(`data:image/jpeg;base64,${ImageBase64}`)
  }, []);


  async function handleFilter(name: string) {
    console.log('handleFilter', name)
  }

  function Item({ id, filterNome, filterApply }: FiltersListProps) {
    return (
      <View style={styles.cardImage} key={id}>
        <Pressable
          style={styles.item}
          onPress={() => handleFilter(filterApply)}
        >
          {image != null &&
            <Image
              style={{ height: 100, width: 100 }}
              source={{ uri: image }}
              resizeMode={'contain'}
            />}
        </Pressable>
        <Text style={styles.text}>{filterNome}</Text>
      </View>
    )
  }


  return (
    <>
      <View style={styles.container}>
        {image != null &&
          <Image
            style={{ height: 250, width: 250, borderRadius: 8 }}
            source={{ uri: image }}
            resizeMode={'contain'}
          />
        }
        <Text style={styles.text}>Result:</Text>

      </View>
      <View style={styles.containerList}>
        <FlatList
          bounces={true}
          data={DATA}
          renderItem={({ item }) => <Item id={item.id} filterNome={item.filterNome} filterApply={item.filterApply} />}
          keyExtractor={(item) => `${item.id}`}
          horizontal
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  containerList: {
    backgroundColor: '#c0d3ef',
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    alignItems: 'center',

  },
  item: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 8,
  },
  text: {
    color: '#000000',
    fontWeight: 'bold'
  },
});
