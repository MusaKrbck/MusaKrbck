export const spaceVehicles = [
  {
    id: 1,
    name: "Uzay Kapsülü",
    englishName: "Space Capsule",
    type: "Manned Spacecraft",
    image: "🚀",
    description: "İnsanlı uzay seyahatleri için tasarlanmış küçük ve güvenli araç",
    maxSpeed: "28,000 km/h",
    crew: "3-6 kişi",
    specifications: {
      height: "3.5 m",
      diameter: "3.9 m",
      mass: "6,000 kg",
      volume: "11 m³",
      manufacturer: "NASA/SpaceX",
      firstFlight: "1961",
      missionDuration: "6 ay",
      orbitCapability: "Alçak Dünya Yörüngesi"
    }
  },
  {
    id: 2,
    name: "Uzay Mekiği",
    englishName: "Space Shuttle",
    type: "Reusable Spacecraft",
    image: "🚁",
    description: "Yeniden kullanılabilir uzay aracı, büyük yük taşıma kapasitesi",
    maxSpeed: "28,200 km/h",
    crew: "7 kişi",
    specifications: {
      height: "17.4 m",
      length: "37.2 m",
      wingspan: "23.8 m",
      mass: "78,000 kg",
      payloadBay: "18.3 x 4.6 m",
      manufacturer: "NASA",
      firstFlight: "1981",
      missionDuration: "2 hafta",
      orbitCapability: "Alçak Dünya Yörüngesi"
    }
  },
  {
    id: 3,
    name: "Uzay Sondası",
    englishName: "Space Probe",
    type: "Unmanned Explorer",
    image: "🛰️",
    description: "Uzak gezegenleri ve uzay objelerini araştırmak için tasarlanmış",
    maxSpeed: "70,000 km/h",
    crew: "İnsansız",
    specifications: {
      height: "2-10 m",
      diameter: "1-4 m",
      mass: "500-5,000 kg",
      powerSource: "Güneş Panelleri/RTG",
      manufacturer: "NASA/ESA/JAXA",
      firstFlight: "1957",
      missionDuration: "10+ yıl",
      orbitCapability: "Gezegenler arası"
    }
  },
  {
    id: 4,
    name: "Yapay Uydu",
    englishName: "Artificial Satellite",
    type: "Communication/Research",
    image: "📡",
    description: "İletişim, hava durumu ve araştırma amaçlı uzay aracı",
    maxSpeed: "27,400 km/h",
    crew: "İnsansız",
    specifications: {
      height: "2-5 m",
      width: "3-10 m",
      mass: "100-6,000 kg",
      powerSource: "Güneş Panelleri",
      manufacturer: "Çeşitli",
      firstFlight: "1957",
      missionDuration: "5-15 yıl",
      orbitCapability: "Çeşitli yörüngeler"
    }
  },
  {
    id: 5,
    name: "Keşif Aracı",
    englishName: "Rover",
    type: "Planetary Explorer",
    image: "🔍",
    description: "Gezegen yüzeylerinde araştırma yapan mobil laboratuvar",
    maxSpeed: "0.05 km/h",
    crew: "İnsansız",
    specifications: {
      height: "1.5-3 m",
      length: "2-5 m",
      width: "2-4 m",
      mass: "200-900 kg",
      powerSource: "RTG/Güneş Panelleri",
      manufacturer: "NASA/ESA/CNSA",
      firstFlight: "1970",
      missionDuration: "90 gün - 15+ yıl",
      operationalArea: "Gezegen yüzeyleri"
    }
  },
  {
    id: 6,
    name: "Uzay Teleskobu",
    englishName: "Space Telescope",
    type: "Observation Platform",
    image: "🔭",
    description: "Uzaydan astronomik gözlemler yapan gelişmiş teleskop",
    maxSpeed: "27,000 km/h",
    crew: "İnsansız",
    specifications: {
      height: "13.2 m",
      diameter: "4.2 m",
      mass: "11,110 kg",
      mirrorDiameter: "2.4-6.5 m",
      manufacturer: "NASA/ESA",
      firstFlight: "1990",
      missionDuration: "5-20 yıl",
      orbitCapability: "Dünya/Güneş-Dünya L2"
    }
  },
  {
    id: 7,
    name: "Uzay İstasyonu",
    englishName: "Space Station",
    type: "Orbital Laboratory",
    image: "🏗️",
    description: "Uzayda kalıcı yaşam ve araştırma merkezi",
    maxSpeed: "27,600 km/h",
    crew: "3-11 kişi",
    specifications: {
      length: "108 m",
      width: "51 m",
      height: "20 m",
      mass: "420,000 kg",
      volume: "915 m³",
      manufacturer: "Uluslararası İşbirliği",
      firstFlight: "1998",
      missionDuration: "15+ yıl",
      orbitCapability: "Alçak Dünya Yörüngesi"
    }
  }
];

export const planets = [
  {
    id: 0,
    name: "Dünya",
    englishName: "Earth",
    distanceFromEarth: "0 km",
    averageDistance: "0 km",
    gravity: "9.81 m/s²",
    temperature: "15°C (ortalama)",
    dayLength: "24 saat",
    yearLength: "365 gün",
    color: "#6B93D6"
  },
  {
    id: 1,
    name: "Merkür",
    englishName: "Mercury",
    distanceFromEarth: "77.3 milyon km",
    averageDistance: "91.7 milyon km",
    gravity: "3.7 m/s²",
    temperature: "167°C (gündüz), -183°C (gece)",
    dayLength: "176 Dünya günü",
    yearLength: "88 Dünya günü",
    color: "#8C7853"
  },
  {
    id: 2,
    name: "Venüs",
    englishName: "Venus",
    distanceFromEarth: "25 milyon km",
    averageDistance: "41.4 milyon km",
    gravity: "8.87 m/s²",
    temperature: "462°C",
    dayLength: "243 Dünya günü",
    yearLength: "225 Dünya günü",
    color: "#FFC649"
  },
  {
    id: 3,
    name: "Mars",
    englishName: "Mars",
    distanceFromEarth: "54.6 milyon km",
    averageDistance: "78.3 milyon km",
    gravity: "3.71 m/s²",
    temperature: "-65°C (ortalama)",
    dayLength: "24.6 saat",
    yearLength: "687 Dünya günü",
    color: "#CD5C5C"
  },
  {
    id: 4,
    name: "Jüpiter",
    englishName: "Jupiter",
    distanceFromEarth: "588 milyon km",
    averageDistance: "714.7 milyon km",
    gravity: "24.79 m/s²",
    temperature: "-110°C",
    dayLength: "9.9 saat",
    yearLength: "12 Dünya yılı",
    color: "#D8CA9D"
  },
  {
    id: 5,
    name: "Satürn",
    englishName: "Saturn",
    distanceFromEarth: "1.3 milyar km",
    averageDistance: "1.5 milyar km",
    gravity: "10.44 m/s²",
    temperature: "-140°C",
    dayLength: "10.7 saat",
    yearLength: "29 Dünya yılı",
    color: "#FAD5A5"
  },
  {
    id: 6,
    name: "Uranüs",
    englishName: "Uranus",
    distanceFromEarth: "2.6 milyar km",
    averageDistance: "2.9 milyar km",
    gravity: "8.69 m/s²",
    temperature: "-195°C",
    dayLength: "17.2 saat",
    yearLength: "84 Dünya yılı",
    color: "#4FD0E7"
  },
  {
    id: 7,
    name: "Neptün",
    englishName: "Neptune",
    distanceFromEarth: "4.3 milyar km",
    averageDistance: "4.5 milyar km",
    gravity: "11.15 m/s²",
    temperature: "-200°C",
    dayLength: "16.1 saat",
    yearLength: "165 Dünya yılı",
    color: "#4B70DD"
  },
  {
    id: 8,
    name: "Ay",
    englishName: "Moon",
    distanceFromEarth: "384,400 km",
    averageDistance: "384,400 km",
    gravity: "1.62 m/s²",
    temperature: "127°C (gündüz), -173°C (gece)",
    dayLength: "29.5 Dünya günü",
    yearLength: "27.3 Dünya günü",
    color: "#C0C0C0"
  }
];

export const calculateTravelTime = (distance, vehicleSpeed) => {
  // Distance in km, speed in km/h
  const distanceInKm = parseFloat(distance.replace(/[^0-9.]/g, '')) * 1000000; // Million km to km
  const speedInKmh = parseFloat(vehicleSpeed.replace(/[^0-9.]/g, ''));
  
  const timeInHours = distanceInKm / speedInKmh;
  const timeInDays = timeInHours / 24;
  const timeInYears = timeInDays / 365;
  
  if (timeInYears >= 1) {
    return `${timeInYears.toFixed(1)} yıl`;
  } else if (timeInDays >= 1) {
    return `${timeInDays.toFixed(1)} gün`;
  } else {
    return `${timeInHours.toFixed(1)} saat`;
  }
};