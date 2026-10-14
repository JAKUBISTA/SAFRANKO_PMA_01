// useState si pamätá hodnoty a pri ich zmene obnoví obrazovku.
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

// Prvky, ktoré použijeme na obrazovke.
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';

export default function App() {
                                      // text = aktuálne napísaný text.
                                      // setText = funkcia, ktorou tento text meníme.

const [text, setText] = useState('');   // '' znamená, že na začiatku je políčko prázdne.

  // texty = zoznam pridaných textov.
  // setTexty = funkcia, ktorou meníme zoznam.
  // [] znamená prázdny zoznam.
  const [texty, setTexty] = useState([]);

  // Táto funkcia sa spustí po stlačení tlačidla.
  function pridatText() {
    // trim() odstráni medzery na začiatku a na konci.
    const novyText = text.trim();

    // Ak je text prázdny, funkcia sa ukončí.
    if (novyText === '') {
      return;
    }

    // predosle je doterajší zoznam.
    // ...predosle skopíruje jeho položky a novyText pridá na koniec.
    setTexty((predosle) => [...predosle, novyText]);

    // Vyprázdnime vstupné políčko.
    setText('');
  }

  return (
    <View style={styles.container}>
      {/* Nadpis aplikácie. */}
      <Text style={styles.title}>Moje texty</Text>

      {/* Políčko na písanie textu.
          placeholder = nápoveda v prázdnom políčku.
          value = text zobrazený v políčku.
          onChangeText = pri písaní uloží nový text cez setText.
          onSubmitEditing = pridá text aj cez klávesnicu. */}
      <TextInput
        style={styles.input}
        placeholder="Napíš text..."
        placeholderTextColor="#888"
        value={text}
        onChangeText={setText}
        onSubmitEditing={pridatText}
        returnKeyType="done"
      />

      {/* onPress spustí funkciu pridatText po kliknutí. */}
      <Button
        title="Pridať"
        onPress={pridatText}
        color="#e435c9"
      />

      {/* ScrollView umožní posúvať zoznam, keď je dlhý. */}
      <ScrollView style={styles.list}>
        {/* map prejde zoznam a pre každú položku vytvorí Text.
            polozka = obsah textu, index = jeho poradie od 0.
            key pomáha Reactu rozlišovať jednotlivé položky. */}
        {texty.map((polozka, index) => (
          <Text key={index} style={styles.text}>
            {polozka}
          </Text>
        ))}
      </ScrollView>

      {/* Svetlé ikonky v hornej lište mobilu. */}
      <StatusBar style="light" />
    </View>
  );
}

// Nastavenia vzhľadu jednotlivých prvkov.
const styles = StyleSheet.create({
  container: {
    flex: 1,                    // Vyplní celú obrazovku.
    backgroundColor: '#010101', // Čierne pozadie.
    paddingTop: 70,             // Vnútorný odstup zhora.
    paddingHorizontal: 20,      // Vnútorný odstup zľava a sprava.
    paddingBottom: 20,          // Vnútorný odstup zdola.
  },

  title: {
    color: '#e435c9',    // Ružový text.
    fontSize: 32,       // Veľkosť písma.
    fontWeight: 'bold', // Tučné písmo.
    textAlign: 'center', // Text zarovnaný na stred.
    marginBottom: 25,   // Medzera pod nadpisom.
  },

  input: {
    backgroundColor: '#202020', // Tmavosivé pozadie.
    color: '#fff',              // Biely napísaný text.
    borderWidth: 1,             // Hrúbka rámčeka.
    borderColor: '#e435c9',     // Ružový rámček.
    borderRadius: 10,           // Zaoblené rohy.
    paddingHorizontal: 15,      // Priestor vnútri po stranách.
    paddingVertical: 12,        // Priestor vnútri hore a dole.
    fontSize: 18,               // Veľkosť písma.
    marginBottom: 15,           // Medzera pod políčkom.
  },

  list: {
    flex: 1,       // Zoznam vyplní zostávajúci priestor.
    marginTop: 20, // Medzera nad zoznamom.
  },

  text: {
    color: '#fff',              // Biely text.
    backgroundColor: '#202020', // Tmavosivé pozadie položky.
    fontSize: 20,               // Veľkosť písma.
    padding: 15,                // Vnútorný priestor okolo textu.
    borderRadius: 10,           // Zaoblené rohy.
    marginBottom: 10,           // Medzera medzi položkami.
  },
});