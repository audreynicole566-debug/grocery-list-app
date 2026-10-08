import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

export default function GroceryItem({ item, onToggle, onDelete }) {
  return (
    <View style={styles.row}>
      {/* Tap the name to mark as bought / not bought */}
      <TouchableOpacity style={styles.rowTextWrap} onPress={() => onToggle(item.id)}>
        <Text style={[styles.rowText, item.done && styles.rowTextDone]}>
          {item.done ? '✅ ' : '⬜ '}
          {item.name}
        </Text>
      </TouchableOpacity>

      {/* Delete button on each row */}
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}