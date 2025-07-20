import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../utils/styles';
import { spaceVehicles } from '../data/spaceVehicles';

const VehiclesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  const filteredVehicles = spaceVehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleVehicleSelection = (vehicleId) => {
    setSelectedVehicles(prev => {
      if (prev.includes(vehicleId)) {
        return prev.filter(id => id !== vehicleId);
      } else if (prev.length < 2) {
        return [...prev, vehicleId];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    if (selectedVehicles.length === 2) {
      navigation.navigate('Compare', { 
        vehicleIds: selectedVehicles 
      });
    }
  };

  const VehicleCard = ({ vehicle }) => {
    const isSelected = selectedVehicles.includes(vehicle.id);
    
    return (
      <TouchableOpacity
        style={[styles.vehicleCard, isSelected && styles.selectedCard]}
        onPress={() => navigation.navigate('VehicleDetail', { vehicle })}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isSelected ? [colors.primary + '30', colors.primary + '10'] : [colors.surface, colors.surface]}
          style={styles.cardGradient}
        >
          <View style={styles.cardHeader}>
            <View style={styles.vehicleIcon}>
              <Text style={styles.vehicleEmoji}>{vehicle.image}</Text>
            </View>
            <TouchableOpacity
              style={[styles.selectButton, isSelected && styles.selectedButton]}
              onPress={(e) => {
                e.stopPropagation();
                toggleVehicleSelection(vehicle.id);
              }}
            >
              <Ionicons 
                name={isSelected ? 'checkmark' : 'add'} 
                size={16} 
                color={isSelected ? colors.text : colors.textSecondary} 
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.vehicleName}>{vehicle.name}</Text>
          <Text style={styles.vehicleEnglishName}>{vehicle.englishName}</Text>
          <Text style={styles.vehicleType}>{vehicle.type}</Text>
          
          <View style={styles.cardInfo}>
            <View style={styles.infoRow}>
              <Ionicons name="speedometer" size={16} color={colors.accent} />
              <Text style={styles.infoText}>{vehicle.maxSpeed}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="people" size={16} color={colors.secondary} />
              <Text style={styles.infoText}>{vehicle.crew}</Text>
            </View>
          </View>
          
          <Text style={styles.vehicleDescription}>{vehicle.description}</Text>
          
          <View style={styles.cardFooter}>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={commonStyles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Uzay aracı ara..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Compare Button */}
      {selectedVehicles.length > 0 && (
        <View style={styles.compareContainer}>
          <TouchableOpacity
            style={[
              styles.compareButton,
              selectedVehicles.length === 2 && styles.compareButtonActive
            ]}
            onPress={handleCompare}
            disabled={selectedVehicles.length !== 2}
          >
            <Ionicons name="git-compare" size={20} color={colors.text} />
            <Text style={styles.compareButtonText}>
              Karşılaştır ({selectedVehicles.length}/2)
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Vehicles List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
        
        {filteredVehicles.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color={colors.textSecondary} />
            <Text style={styles.emptyStateText}>Araç bulunamadı</Text>
            <Text style={styles.emptyStateSubtext}>
              Farklı anahtar kelimeler deneyebilirsiniz
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
  },
  compareContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  compareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.textSecondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    opacity: 0.6,
  },
  compareButtonActive: {
    backgroundColor: colors.primary,
    opacity: 1,
  },
  compareButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  vehicleCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  cardGradient: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  vehicleIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleEmoji: {
    fontSize: 32,
  },
  selectButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  vehicleName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  vehicleEnglishName: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  vehicleType: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  vehicleDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    alignItems: 'flex-end',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default VehiclesScreen;