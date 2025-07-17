import { SafeAreaView, Text, StyleSheet, ScrollView, View } from "react-native";

 const AboutUs = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>About LifeBudget</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Introduction</Text>
          <Text style={styles.sectionText}>
            LifeBudget is a simple and powerful expense tracking app designed to help you manage your money with ease.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Problem It Solves</Text>
          <Text style={styles.sectionText}>
            Many people struggle to track where their money goes. LifeBudget helps you stay on top of your income and expenses so you can make better financial decisions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <Text style={styles.featureText}>• Track monthly expenses</Text>
          <Text style={styles.featureText}>• Categorize spending (Food, Rent, Shopping, etc.)</Text>
          <Text style={styles.featureText}>• View charts to analyze your spending</Text>
          <Text style={styles.featureText}>• Multi-currency support (USD, EUR, LBP, etc.)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor:'#050F28',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    backgroundColor: '#061A40',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#7fb9f7ff',
    textAlign: 'justify',
  },
  featureText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#7fb9f7ff',
    marginBottom: 8,
  },
});

export default AboutUs;