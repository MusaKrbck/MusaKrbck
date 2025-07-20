import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../utils/styles';
import { spaceVehicles } from '../data/spaceVehicles';

const CompareScreen = ({ route, navigation }) => {
  const { vehicleIds } = route.params;
  const vehicles = vehicleIds.map(id => spaceVehicles.find(v => v.id === id));

  const ComparisonCard = ({ vehicle, isFirst }) => (
    <View style={[styles.vehicleCard, !isFirst && styles.secondCard]}>
      <LinearGradient
        colors={isFirst ? [colors.primary + '20', colors.primary + '05'] : [colors.secondary + '20', colors.secondary + '05']}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <View style={styles.vehicleIcon}>
            <Text style={styles.vehicleEmoji}>{vehicle.image}</Text>
          </View>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleName}>{vehicle.name}</Text>
            <Text style={styles.vehicleEnglishName}>{vehicle.englishName}</Text>
            <Text style={styles.vehicleType}>{vehicle.type}</Text>
          </View>
        </View>

        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <Ionicons name="speedometer" size={16} color={isFirst ? colors.primary : colors.secondary} />
            <Text style={styles.statText}>{vehicle.maxSpeed}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="people" size={16} color={isFirst ? colors.primary : colors.secondary} />
            <Text style={styles.statText}>{vehicle.crew}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const ComparisonRow = ({ label, values, icon, unit = '' }) => (
    <View style={styles.comparisonRow}>
      <View style={styles.rowHeader}>
        <Ionicons name={icon} size={16} color={colors.accent} />
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      <View style={styles.rowValues}>
        <Text style={[styles.rowValue, styles.firstValue]}>{values[0]}{unit}</Text>
        <View style={styles.divider} />
        <Text style={[styles.rowValue, styles.secondValue]}>{values[1]}{unit}</Text>
      </View>
    </View>
  );

  const SpecificationComparison = () => {
    const specifications = {};
    
    // Collect all unique specification keys
    vehicles.forEach(vehicle => {
      Object.keys(vehicle.specifications).forEach(key => {
        if (!specifications[key]) {
          specifications[key] = [];
        }
      });
    });

    // Fill specification values
    Object.keys(specifications).forEach(key => {
      vehicles.forEach(vehicle => {
        specifications[key].push(vehicle.specifications[key] || 'N/A');
      });
    });

    const getSpecIcon = (specKey) => {
      switch (specKey) {
        case 'height':
        case 'length':
        case 'width':
        case 'wingspan':
        case 'diameter':
          return 'resize';
        case 'mass':
          return 'barbell';
        case 'volume':
          return 'cube';
        case 'manufacturer':
          return 'business';
        case 'firstFlight':
          return 'calendar';
        case 'missionDuration':
          return 'time';
        case 'powerSource':
          return 'battery-charging';
        case 'payloadBay':
          return 'archive';
        case 'mirrorDiameter':
          return 'radio';
        case 'orbitCapability':
        case 'operationalArea':
          return 'globe';
        default:
          return 'information';
      }
    };

    const getSpecLabel = (specKey) => {
      const labels = {
        height: 'Yükseklik',
        length: 'Uzunluk',
        width: 'Genişlik',
        wingspan: 'Kanat Açıklığı',
        diameter: 'Çap',
        mass: 'Kütle',
        volume: 'Hacim',
        manufacturer: 'Üretici',
        firstFlight: 'İlk Uçuş',
        missionDuration: 'Görev Süresi',
        powerSource: 'Güç Kaynağı',
        payloadBay: 'Yük Bölmesi',
        mirrorDiameter: 'Ayna Çapı',
        orbitCapability: 'Yörünge Kabiliyeti',
        operationalArea: 'Operasyon Alanı',
      };
      return labels[specKey] || specKey;
    };

    return (
      <View style={styles.specificationsSection}>
        <Text style={styles.sectionTitle}>Teknik Özellikler</Text>
        <View style={styles.specificationsContainer}>
          {Object.entries(specifications).map(([key, values]) => (
            <ComparisonRow
              key={key}
              label={getSpecLabel(key)}
              values={values}
              icon={getSpecIcon(key)}
            />
          ))}
        </View>
      </View>
    );
  };

  const PerformanceComparison = () => {
    const performanceData = [
      {
        label: 'Maksimum Hız',
        values: vehicles.map(v => v.maxSpeed),
        icon: 'speedometer',
      },
      {
        label: 'Mürettebat',
        values: vehicles.map(v => v.crew),
        icon: 'people',
      },
    ];

    return (
      <View style={styles.performanceSection}>
        <Text style={styles.sectionTitle}>Performans Karşılaştırması</Text>
        <View style={styles.performanceContainer}>
          {performanceData.map((item, index) => (
            <ComparisonRow
              key={index}
              label={item.label}
              values={item.values}
              icon={item.icon}
            />
          ))}
        </View>
      </View>
    );
  };

  const DescriptionComparison = () => (
    <View style={styles.descriptionSection}>
      <Text style={styles.sectionTitle}>Açıklamalar</Text>
      <View style={styles.descriptionsContainer}>
        {vehicles.map((vehicle, index) => (
          <View key={vehicle.id} style={styles.descriptionCard}>
            <LinearGradient
              colors={index === 0 ? [colors.primary + '10', colors.primary + '05'] : [colors.secondary + '10', colors.secondary + '05']}
              style={styles.descriptionGradient}
            >
              <View style={styles.descriptionHeader}>
                <Text style={styles.descriptionTitle}>{vehicle.name}</Text>
                <Text style={styles.vehicleEmoji}>{vehicle.image}</Text>
              </View>
              <Text style={styles.descriptionText}>{vehicle.description}</Text>
            </LinearGradient>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={commonStyles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚖️ Araç Karşılaştırması</Text>
        <Text style={styles.headerSubtitle}>
          Seçtiğiniz uzay araçlarının özelliklerini karşılaştırın
        </Text>
      </View>

      {/* Vehicle Cards */}
      <View style={styles.vehiclesSection}>
        <View style={styles.vehiclesGrid}>
          {vehicles.map((vehicle, index) => (
            <ComparisonCard key={vehicle.id} vehicle={vehicle} isFirst={index === 0} />
          ))}
        </View>
      </View>

      {/* Performance Comparison */}
      <PerformanceComparison />

      {/* Description Comparison */}
      <DescriptionComparison />

      {/* Specifications Comparison */}
      <SpecificationComparison />

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('Yolculuk Hesaplayıcı')}
        >
          <Ionicons name="calculator" size={20} color={colors.text} />
          <Text style={styles.actionButtonText}>Yolculuk Hesapla</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('VehiclesList')}
        >
          <Ionicons name="arrow-back" size={20} color={colors.text} />
          <Text style={styles.actionButtonText}>Araçlara Geri Dön</Text>
        </TouchableOpacity>
      </View>
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
  vehiclesSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  vehiclesGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  vehicleCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  secondCard: {
    // Additional styles for second card if needed
  },
  cardGradient: {
    padding: 16,
  },
  cardHeader: {
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
    marginBottom: 12,
  },
  vehicleEmoji: {
    fontSize: 32,
  },
  vehicleInfo: {
    alignItems: 'center',
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  vehicleEnglishName: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  vehicleType: {
    fontSize: 10,
    color: colors.accent,
    textAlign: 'center',
    fontWeight: '600',
  },
  quickStats: {
    gap: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statText: {
    marginLeft: 6,
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  performanceSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  performanceContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  comparisonRow: {
    marginBottom: 16,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rowLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
    fontWeight: '600',
  },
  rowValues: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowValue: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  firstValue: {
    color: colors.primary,
  },
  secondValue: {
    color: colors.secondary,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
    marginHorizontal: 8,
  },
  descriptionSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  descriptionsContainer: {
    gap: 12,
  },
  descriptionCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  descriptionGradient: {
    padding: 16,
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  specificationsSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  specificationsContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  actionSection: {
    paddingHorizontal: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  actionButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default CompareScreen;