import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const RoutineScreen = () => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allExercises, setAllExercises] = useState([]);

  useEffect(() => {
    fetch('http://192.168.0.15:9000/ejercicios')
      .then(response => response.json())
      .then(data => {
        setAllExercises(data); // Guardar todos los ejercicios en el estado
        const uniqueCategories = [...new Set(data.map(exercise => exercise.parte_cuerpo))];
        setSelectedExercises(selectRandomExercises(data, uniqueCategories, 10));
      })
      .catch(error => console.error('Error fetching exercises:', error));
  }, []);

  const selectRandomExercises = (exercises, categories, count) => {
    const selectedRandomExercises = [];
    
    categories.forEach(category => {
      const exercisesInCategory = exercises.filter(exercise => exercise.parte_cuerpo === category);
      const randomIndex = Math.floor(Math.random() * exercisesInCategory.length);
      selectedRandomExercises.push(exercisesInCategory[randomIndex]);
    });

    return selectedRandomExercises.slice(0, count);
  };

  const handleCategoryFilter = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSelectedExercises(selectRandomExercises(allExercises, [...new Set(allExercises.map(exercise => exercise.parte_cuerpo))], 10));
    } else {
      const filteredExercises = allExercises.filter(exercise => exercise.parte_cuerpo === category);
      setSelectedExercises(filteredExercises);
      setSelectedCategory(category);
    }
  };

  const categories = [...new Set(allExercises.map(exercise => exercise.parte_cuerpo))];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rutinas de Ejercicio</Text>
      <View style={styles.filterButtons}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={selectedCategory === category ? styles.selectedFilterButton : styles.filterButton}
            onPress={() => handleCategoryFilter(category)}
          >
            <Text>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedExercises.map((exercise, index) => (
        <View key={index}>
          <Text style={styles.bodyPartTitle}>{exercise.parte_cuerpo}</Text>
          <View style={styles.selectedExercise}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDifficulty}>{exercise.difficulty}</Text>
            <Image
              style={styles.exerciseImage}
              source={{ uri: exercise.img }}
              resizeMode="contain"
            />
            <Text style={styles.exerciseStepsTitle}>Pasos:</Text>
            <Text style={styles.exerciseSteps}>{exercise.steps}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  selectedFilterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    color: 'white',
  },
  calculateIMCButton: {
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  calculateIMCText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bodyPartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  selectedExercise: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  exerciseDifficulty: {
    fontSize: 16,
    marginBottom: 8,
  },
  exerciseImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
    marginBottom: 4,
  },
  exerciseStepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  exerciseSteps: {
    fontSize: 16,
  },
  
});

export default RoutineScreen;
