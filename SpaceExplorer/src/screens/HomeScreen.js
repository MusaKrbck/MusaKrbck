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

const HomeScreen = ({ navigation }) => {
  const features = [
    {
      id: 1,
      title: 'Uzay Araçları',
      description: 'Çeşitli uzay araçlarını keşfedin',
      icon: 'rocket',
      color: colors.primary,
      screen: 'Uzay Araçları',
    },
    {
      id: 2,
      title: 'Yolculuk Hesaplayıcı',
      description: 'Gezegenler arası seyahat sürelerini hesaplayın',
      icon: 'calculator',
      color: colors.secondary,
      screen: 'Yolculuk Hesaplayıcı',
    },
    {
      id: 3,
      title: 'Araç Karşılaştırma',
      description: 'Uzay araçlarının özelliklerini karşılaştırın',
      icon: 'git-compare',
      color: colors.accent,
      screen: 'Uzay Araçları',
    },
  ];

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
          <Text style={styles.heroTitle}>🚀 Space Explorer</Text>
          <Text style={styles.heroSubtitle}>
            Uzayın derinliklerini keşfedin ve uzay araçları hakkında bilgi edinin
          </Text>
        </View>
      </LinearGradient>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={commonStyles.title}>Hoş Geldiniz!</Text>
        <Text style={[commonStyles.textSecondary, styles.welcomeText]}>
          Space Explorer uygulaması ile uzay araçları, gezegenler ve uzay yolculukları hakkında
          detaylı bilgilere ulaşabilirsiniz. Çeşitli uzay araçlarını karşılaştırabilir,
          gezegenler arası seyahat sürelerini hesaplayabilirsiniz.
        </Text>
      </View>

      {/* Features Grid */}
      <View style={styles.featuresSection}>
        <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Özellikler</Text>
        {features.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={styles.featureCard}
            onPress={() => navigation.navigate(feature.screen)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[feature.color + '20', feature.color + '10']}
              style={styles.featureGradient}
            >
              <View style={styles.featureContent}>
                <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                  <Ionicons name={feature.icon} size={24} color={colors.text} />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <Text style={[commonStyles.subtitle, styles.sectionTitle]}>Hızlı Bilgiler</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Uzay Aracı</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Gezegen</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>∞</Text>
            <Text style={styles.statLabel}>Keşif</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
  },
  welcomeSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  welcomeText: {
    lineHeight: 22,
  },
  featuresSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  featureCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  featureGradient: {
    padding: 16,
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  statsSection: {
    paddingHorizontal: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCard: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default HomeScreen;