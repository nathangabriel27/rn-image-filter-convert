import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Pressable } from 'react-native';
import ImageBase64 from './assets/data'
import { FilterSimple } from 'rn-image-filter-convert';

type FilterTypes = 'blackAndWhite' | 'shadesGray';

type FiltersListProps = {
  id: number;
  filterNome: string;
  filterApply: FilterTypes;
}

export default function App() {
  const [image, setImage] = useState<string | null>(null);

  const DATA: FiltersListProps[] = [
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


  async function handleFilter(name: FilterTypes) {
    try {

      const data = await FilterSimple({ data: ImageBase64, filter: name })
      //console.log('handleFilterTONSCINZA:', data);
      setImage(`data:image/jpeg;base64,${data.uri}`)
    } catch (error) {
      console.error('handleFilterTONSCINZA ERROR=>>', error);
    }
  }

  function Item({ id, filterNome, filterApply }: FiltersListProps) {
    return (
      <View style={styles.cardImage} key={id}>
        <Pressable
          style={styles.item}
          onPress={() => handleFilter(filterApply)}
        >
          <Text style={styles.text}>{filterNome}</Text>

        </Pressable>
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

      </View>
      <View style={styles.containerList}>
        <FlatList
          bounces={true}
          data={DATA}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              filterNome={item.filterNome}
              filterApply={item.filterApply}
            />
          )}
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
    backgroundColor: '#2962b6',
    margin: 10,
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
