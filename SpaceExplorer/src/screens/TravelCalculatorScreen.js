import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { commonStyles, colors } from '../utils/styles';
import { spaceVehicles, planets, calculateTravelTime } from '../data/spaceVehicles';

const TravelCalculatorScreen = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(spaceVehicles[0]);
  const [fromPlanet, setFromPlanet] = useState(planets.find(p => p.name === 'Dünya') || planets[0]);
  const [toPlanet, setToPlanet] = useState(planets[1]);
  const [calculationResult, setCalculationResult] = useState(null);

  const handleCalculate = () => {
    if (fromPlanet.id === toPlanet.id) {
      Alert.alert('Hata', 'Farklı destinasyonlar seçmelisiniz!');
      return;
    }

    const distance = toPlanet.distanceFromEarth;
    const travelTime = calculateTravelTime(distance, selectedVehicle.maxSpeed);
    
    setCalculationResult({
      vehicle: selectedVehicle,
      from: fromPlanet,
      to: toPlanet,
      distance,
      travelTime,
    });
  };

  const PickerCard = ({ title, icon, children }) => (
    <View style={styles.pickerCard}>
      <View style={styles.pickerHeader}>
        <Ionicons name={icon} size={20} color={colors.primary} />
        <Text style={styles.pickerTitle}>{title}</Text>
      </View>
      <View style={styles.pickerWrapper}>
        {children}
      </View>
    </View>
  );

  const ResultCard = () => {
    if (!calculationResult) return null;

    return (
      <View style={styles.resultCard}>
        <LinearGradient
          colors={[colors.primary + '20', colors.secondary + '10']}
          style={styles.resultGradient}
        >
          <View style={styles.resultHeader}>
            <Ionicons name="calculator" size={24} color={colors.primary} />
            <Text style={styles.resultTitle}>Hesaplama Sonucu</Text>
          </View>

          <View style={styles.resultContent}>
            {/* Route Info */}
            <View style={styles.routeInfo}>
              <View style={styles.planetInfo}>
                <View style={[styles.planetDot, { backgroundColor: calculationResult.from.color || colors.accent }]} />
                <Text style={styles.planetName}>{calculationResult.from.name}</Text>
              </View>
              <Ionicons name="arrow-forward" size={24} color={colors.textSecondary} />
              <View style={styles.planetInfo}>
                <View style={[styles.planetDot, { backgroundColor: calculationResult.to.color || colors.accent }]} />
                <Text style={styles.planetName}>{calculationResult.to.name}</Text>
              </View>
            </View>

            {/* Vehicle Info */}
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleEmoji}>{calculationResult.vehicle.image}</Text>
              <View style={styles.vehicleDetails}>
                <Text style={styles.vehicleName}>{calculationResult.vehicle.name}</Text>
                <Text style={styles.vehicleSpeed}>Hız: {calculationResult.vehicle.maxSpeed}</Text>
              </View>
            </View>

            {/* Results */}
            <View style={styles.resultsGrid}>
              <View style={styles.resultItem}>
                <Ionicons name="resize-outline" size={20} color={colors.accent} />
                <Text style={styles.resultLabel}>Mesafe</Text>
                <Text style={styles.resultValue}>{calculationResult.distance}</Text>
              </View>
              <View style={styles.resultItem}>
                <Ionicons name="time-outline" size={20} color={colors.secondary} />
                <Text style={styles.resultLabel}>Seyahat Süresi</Text>
                <Text style={styles.resultValue}>{calculationResult.travelTime}</Text>
              </View>
            </View>

            {/* Planet Details */}
            <View style={styles.planetDetails}>
              <Text style={styles.sectionTitle}>Hedef Gezegen Bilgileri</Text>
              <View style={styles.planetDetailsGrid}>
                <View style={styles.planetDetailItem}>
                  <Text style={styles.planetDetailLabel}>Yerçekimi</Text>
                  <Text style={styles.planetDetailValue}>{calculationResult.to.gravity}</Text>
                </View>
                <View style={styles.planetDetailItem}>
                  <Text style={styles.planetDetailLabel}>Sıcaklık</Text>
                  <Text style={styles.planetDetailValue}>{calculationResult.to.temperature}</Text>
                </View>
                <View style={styles.planetDetailItem}>
                  <Text style={styles.planetDetailLabel}>Gün Uzunluğu</Text>
                  <Text style={styles.planetDetailValue}>{calculationResult.to.dayLength}</Text>
                </View>
                <View style={styles.planetDetailItem}>
                  <Text style={styles.planetDetailLabel}>Yıl Uzunluğu</Text>
                  <Text style={styles.planetDetailValue}>{calculationResult.to.yearLength}</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <ScrollView style={commonStyles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🚀 Yolculuk Hesaplayıcı</Text>
        <Text style={styles.headerSubtitle}>
          Uzay aracınızı ve hedef gezegeni seçin, seyahat süresini hesaplayın
        </Text>
      </View>

      {/* Vehicle Selection */}
      <PickerCard title="Uzay Aracı Seçin" icon="rocket">
        <Picker
          selectedValue={selectedVehicle.id}
          onValueChange={(itemValue) => {
            const vehicle = spaceVehicles.find(v => v.id === itemValue);
            setSelectedVehicle(vehicle);
          }}
          style={styles.picker}
          dropdownIconColor={colors.text}
        >
          {spaceVehicles.map((vehicle) => (
            <Picker.Item
              key={vehicle.id}
              label={`${vehicle.image} ${vehicle.name} (${vehicle.maxSpeed})`}
              value={vehicle.id}
              color={colors.text}
            />
          ))}
        </Picker>
      </PickerCard>

      {/* From Planet Selection */}
      <PickerCard title="Başlangıç Noktası" icon="planet">
        <Picker
          selectedValue={fromPlanet.id}
          onValueChange={(itemValue) => {
            const planet = planets.find(p => p.id === itemValue);
            setFromPlanet(planet);
          }}
          style={styles.picker}
          dropdownIconColor={colors.text}
        >
          {planets.map((planet) => (
            <Picker.Item
              key={planet.id}
              label={planet.name}
              value={planet.id}
              color={colors.text}
            />
          ))}
        </Picker>
      </PickerCard>

      {/* To Planet Selection */}
      <PickerCard title="Hedef Gezegen" icon="flag">
        <Picker
          selectedValue={toPlanet.id}
          onValueChange={(itemValue) => {
            const planet = planets.find(p => p.id === itemValue);
            setToPlanet(planet);
          }}
          style={styles.picker}
          dropdownIconColor={colors.text}
        >
          {planets.map((planet) => (
            <Picker.Item
              key={planet.id}
              label={planet.name}
              value={planet.id}
              color={colors.text}
            />
          ))}
        </Picker>
      </PickerCard>

      {/* Calculate Button */}
      <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={styles.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Ionicons name="calculator" size={20} color={colors.text} />
          <Text style={styles.calculateButtonText}>Hesapla</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Result */}
      <ResultCard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  pickerCard: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
  },
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  pickerWrapper: {
    backgroundColor: colors.background,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    color: colors.text,
    backgroundColor: colors.background,
  },
  calculateButton: {
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  calculateButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  resultCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  resultGradient: {
    padding: 20,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  resultContent: {
    gap: 16,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.background + '50',
    borderRadius: 12,
  },
  planetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  planetDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  planetName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.background + '30',
    borderRadius: 12,
  },
  vehicleEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  vehicleDetails: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  vehicleSpeed: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  resultsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  resultItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background + '40',
    borderRadius: 12,
  },
  resultLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  planetDetails: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  planetDetailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  planetDetailItem: {
    flex: 1,
    minWidth: '45%',
    padding: 12,
    backgroundColor: colors.background + '40',
    borderRadius: 8,
  },
  planetDetailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  planetDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});

export default TravelCalculatorScreen;