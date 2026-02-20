import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function ExampleScreen() {
  const [count, setCount] = useState(0);

  // Expensive calculation (simulated)
  const squaredValue = useMemo(() => {
    console.log('Calculating square...');
    return count * count;
  }, [count]); // Only runs when count changes

  return (
    <View style={styles.container}>
      <Text style={styles.title}>useMemo Demo</Text>

      <Text style={styles.label}>Count Value:</Text>
      <Text style={styles.count}>{count}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(prev => prev - 1)}
        >
          <Text style={styles.btnText}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(prev => prev + 1)}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Squared Value (useMemo):</Text>
      <Text style={styles.result}>{squaredValue}</Text>

      <Text style={styles.note}>
        Open console and press buttons. Square only recalculates when count
        changes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F2F4F7',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginTop: 15,
  },
  count: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  result: {
    font_Size: 28,
    fontWeight: '600',
    marginTop: 10,
  },
  note: {
    marginTop: 20,
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
  },
});

export default ExampleScreen;
