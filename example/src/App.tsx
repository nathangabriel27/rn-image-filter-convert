import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Pressable } from 'react-native';
import ImageBase64 from './assets/data'
import { FilterSimple, FilterPropsResponse, FilterTypes } from 'rn-image-filter-convert';


type FiltersListProps = {
  id: number;
  filterName: string;
  filterApply: FilterTypes;
}

export default function App() {
  const [image, setImage] = useState<string | null>(null);

  const DATA: FiltersListProps[] = [
    {
      id: 2,
      filterName: 'Shades of gray',
      filterApply: 'shadesGray'
    },
    {
      id: 3,
      filterName: 'Black and White',
      filterApply: 'blackAndWhite'
    }
  ];

  useEffect(() => {
    setImage(`data:image/jpeg;base64,${ImageBase64}`)
  }, []);


  async function handleFilter(name: FilterTypes) {
    try {
      const data : FilterPropsResponse = await FilterSimple({ data: ImageBase64, filter: name })
      setImage(`data:image/jpeg;base64,${data.uri}`)
    } catch (error) {
      throw error;
    }
  }

  function RenderItem({ id, filterName, filterApply }: FiltersListProps) {
    return (
      <View style={styles.cardImage} key={id}>
        <Pressable
          style={styles.item}
          onPress={() => handleFilter(filterApply)}
        >
          <Text style={styles.text}>{filterName}</Text>
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
            <RenderItem
              id={item.id}
              filterName={item.filterName}
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
