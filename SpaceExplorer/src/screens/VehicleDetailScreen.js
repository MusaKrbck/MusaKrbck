import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles, colors } from '../utils/styles';

const { width } = Dimensions.get('window');

const VehicleDetailScreen = ({ route, navigation }) => {
  const { vehicle } = route.params;

  const SpecificationItem = ({ label, value, icon }) => (
    <View style={styles.specItem}>
      <View style={styles.specHeader}>
        {icon && <Ionicons name={icon} size={16} color={colors.accent} />}
        <Text style={styles.specLabel}>{label}</Text>
      </View>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );

  const InfoCard = ({ title, children, icon, color = colors.primary }) => (
    <View style={styles.infoCard}>
      <LinearGradient
        colors={[color + '20', color + '05']}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <Ionicons name={icon} size={20} color={color} />
          <Text style={[styles.cardTitle, { color }]}>{title}</Text>
        </View>
        {children}
      </LinearGradient>
    </View>
  );

  return (
    <ScrollView style={commonStyles.container} contentContainerStyle={styles.scrollContent}>
      {/* Hero Section */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.heroSection}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.heroContent}>
          <View style={styles.vehicleIconLarge}>
            <Text style={styles.vehicleEmojiLarge}>{vehicle.image}</Text>
          </View>
          <Text style={styles.vehicleNameLarge}>{vehicle.name}</Text>
          <Text style={styles.vehicleEnglishNameLarge}>{vehicle.englishName}</Text>
          <Text style={styles.vehicleTypeLarge}>{vehicle.type}</Text>
        </View>
      </LinearGradient>

      {/* Quick Info */}
      <View style={styles.quickInfoSection}>
        <View style={styles.quickInfoGrid}>
          <View style={styles.quickInfoItem}>
            <Ionicons name="speedometer" size={24} color={colors.accent} />
            <Text style={styles.quickInfoLabel}>Maksimum Hız</Text>
            <Text style={styles.quickInfoValue}>{vehicle.maxSpeed}</Text>
          </View>
          <View style={styles.quickInfoItem}>
            <Ionicons name="people" size={24} color={colors.secondary} />
            <Text style={styles.quickInfoLabel}>Mürettebat</Text>
            <Text style={styles.quickInfoValue}>{vehicle.crew}</Text>
          </View>
        </View>
      </View>

      {/* Description */}
      <InfoCard title="Açıklama" icon="information-circle" color={colors.primary}>
        <Text style={styles.descriptionText}>{vehicle.description}</Text>
      </InfoCard>

      {/* Technical Specifications */}
      <InfoCard title="Teknik Özellikler" icon="construct" color={colors.secondary}>
        <View style={styles.specificationsGrid}>
          {Object.entries(vehicle.specifications).map(([key, value], index) => {
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
              <SpecificationItem
                key={index}
                label={getSpecLabel(key)}
                value={value}
                icon={getSpecIcon(key)}
              />
            );
          })}
        </View>
      </InfoCard>

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
          style={[styles.actionButton, { backgroundColor: colors.secondary }]}
          onPress={() => navigation.navigate('VehiclesList')}
        >
          <Ionicons name="git-compare" size={20} color={colors.text} />
          <Text style={styles.actionButtonText}>Diğer Araçlarla Karşılaştır</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
  },
  vehicleIconLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  vehicleEmojiLarge: {
    fontSize: 60,
  },
  vehicleNameLarge: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  vehicleEnglishNameLarge: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
    textAlign: 'center',
  },
  vehicleTypeLarge: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    fontStyle: 'italic',
  },
  quickInfoSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  quickInfoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickInfoItem: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.surface,
    padding: 20,
    marginHorizontal: 8,
    borderRadius: 12,
  },
  quickInfoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  quickInfoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  infoCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  specificationsGrid: {
    gap: 12,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '30',
  },
  specHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  specLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
    flex: 1,
  },
  actionSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
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

export default VehicleDetailScreen;