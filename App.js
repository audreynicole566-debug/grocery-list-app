import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import GroceryItem from './components/GroceryItem';
import styles from './styles';

export default function App() {
  // useState: the list data and the current input text
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  const addItem = () => {
    const name = text.trim();
    if (name === '') return; // ignore empty input

    const newItem = { id: Date.now().toString(), name, done: false };
    setItems((prev) => [newItem, ...prev]);
    setText('');
  };

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const remaining = items.filter((item) => !item.done).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>🛒 Grocery Tracker</Text>
      <Text style={styles.counter}>
        {items.length === 0 ? 'No items yet' : `${remaining} of ${items.length} left to buy`}
      </Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add an item (e.g. Milk)"
          value={text}
          onChangeText={setText}
          onSubmitEditing={addItem}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GroceryItem item={item} onToggle={toggleItem} onDelete={deleteItem} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Your list is empty. Add something above!</Text>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}