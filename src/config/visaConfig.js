import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const visaConfig = {
  apiKey: "AIzaSyAnqT3bsXF9Jmt3Cg5f8hY_FQZSwffapkc",
  authDomain: "visaconfig.firebaseapp.com",
  projectId: "visaconfig",
  storageBucket: "visaconfig.firebasestorage.app",
  messagingSenderId: "809628037252",
  appId: "1:809628037252:web:9ea244e8517a7e77f252d1",
  measurementId: "G-P0H8H9KFTC"
};

export const visaCheck = getFirestore(initializeApp(visaConfig, "visaApp"));

/*
// ============ DADOS PARA SEED ============
const visaData = [
  // Bolivia (5)
  { id: "Bolivia-France", passport_country: "Bolivia", destination_country: "France", requirement: "Bolivian citizens can enter France without a visa for up to 90 days." },
  { id: "Bolivia-Japan", passport_country: "Bolivia", destination_country: "Japan", requirement: "Bolivian citizens do not need a visa for tourism in Japan for up to 90 days." },
  { id: "Bolivia-Nepal", passport_country: "Bolivia", destination_country: "Nepal", requirement: "Bolivian citizens need a visa to visit Nepal." },
  { id: "Bolivia-Pakistan", passport_country: "Bolivia", destination_country: "Pakistan", requirement: "Bolivian citizens need a visa to visit Pakistan." },
  { id: "Bolivia-Tanzania", passport_country: "Bolivia", destination_country: "Tanzania", requirement: "Bolivian citizens need a visa to visit Tanzania." },
  
  // Brazil (5)
  { id: "Brazil-France", passport_country: "Brazil", destination_country: "France", requirement: "Brazilian citizens can enter France without a visa for up to 90 days." },
  { id: "Brazil-Japan", passport_country: "Brazil", destination_country: "Japan", requirement: "Brazilian citizens do not need a visa for tourism in Japan for up to 90 days." },
  { id: "Brazil-Nepal", passport_country: "Brazil", destination_country: "Nepal", requirement: "Brazilian citizens need a tourist visa to enter Nepal." },
  { id: "Brazil-Pakistan", passport_country: "Brazil", destination_country: "Pakistan", requirement: "Brazilian citizens need a visa to visit Pakistan." },
  { id: "Brazil-Tanzania", passport_country: "Brazil", destination_country: "Tanzania", requirement: "Brazilian citizens need a visa to visit Tanzania." },
  
  // Chile (5)
  { id: "Chile-France", passport_country: "Chile", destination_country: "France", requirement: "Chilean citizens can enter France without a visa for up to 90 days." },
  { id: "Chile-Japan", passport_country: "Chile", destination_country: "Japan", requirement: "Chilean citizens do not need a visa for tourism in Japan for up to 90 days." },
  { id: "Chile-Nepal", passport_country: "Chile", destination_country: "Nepal", requirement: "Chilean citizens need a visa to visit Nepal." },
  { id: "Chile-Pakistan", passport_country: "Chile", destination_country: "Pakistan", requirement: "Chilean citizens need a visa to visit Pakistan." },
  { id: "Chile-Tanzania", passport_country: "Chile", destination_country: "Tanzania", requirement: "Chilean citizens need a visa to visit Tanzania." },
  
  // France (5)
  { id: "France-France", passport_country: "France", destination_country: "France", requirement: "French citizens do not need a visa to enter France." },
  { id: "France-Japan", passport_country: "France", destination_country: "Japan", requirement: "French citizens do not need a visa for tourism in Japan for up to 90 days." },
  { id: "France-Nepal", passport_country: "France", destination_country: "Nepal", requirement: "French citizens need a visa to visit Nepal." },
  { id: "France-Pakistan", passport_country: "France", destination_country: "Pakistan", requirement: "French citizens need a visa to visit Pakistan." },
  { id: "France-Tanzania", passport_country: "France", destination_country: "Tanzania", requirement: "French citizens need a visa to visit Tanzania." },
  
  // Germany (5)
  { id: "Germany-France", passport_country: "Germany", destination_country: "France", requirement: "German citizens can enter France without a visa for up to 90 days." },
  { id: "Germany-Japan", passport_country: "Germany", destination_country: "Japan", requirement: "German citizens do not need a visa for tourism in Japan for up to 90 days." },
  { id: "Germany-Nepal", passport_country: "Germany", destination_country: "Nepal", requirement: "German citizens need a visa to visit Nepal." },
  { id: "Germany-Pakistan", passport_country: "Germany", destination_country: "Pakistan", requirement: "German citizens need a visa to visit Pakistan." },
  { id: "Germany-Tanzania", passport_country: "Germany", destination_country: "Tanzania", requirement: "German citizens need a visa to visit Tanzania." },
  
  // Japan (5)
  { id: "Japan-France", passport_country: "Japan", destination_country: "France", requirement: "Japanese citizens can enter France without a visa for up to 90 days." },
  { id: "Japan-Japan", passport_country: "Japan", destination_country: "Japan", requirement: "Japanese citizens do not need a visa to enter Japan." },
  { id: "Japan-Nepal", passport_country: "Japan", destination_country: "Nepal", requirement: "Japanese citizens need a visa to visit Nepal." },
  { id: "Japan-Pakistan", passport_country: "Japan", destination_country: "Pakistan", requirement: "Japanese citizens need a visa to visit Pakistan." },
  { id: "Japan-Tanzania", passport_country: "Japan", destination_country: "Tanzania", requirement: "Japanese citizens need a visa to visit Tanzania." },
  
  // Tanzania (5)
  { id: "Tanzania-France", passport_country: "Tanzania", destination_country: "France", requirement: "Tanzanian citizens need a visa to visit France." },
  { id: "Tanzania-Japan", passport_country: "Tanzania", destination_country: "Japan", requirement: "Tanzanian citizens need a visa to visit Japan." },
  { id: "Tanzania-Nepal", passport_country: "Tanzania", destination_country: "Nepal", requirement: "Tanzanian citizens need a visa to visit Nepal." },
  { id: "Tanzania-Pakistan", passport_country: "Tanzania", destination_country: "Pakistan", requirement: "Tanzanian citizens need a visa to visit Pakistan." },
  { id: "Tanzania-Tanzania", passport_country: "Tanzania", destination_country: "Tanzania", requirement: "Tanzanian citizens do not need a visa to enter Tanzania." },
  
  // United Kingdom (5)
  { id: "UnitedKingdom-France", passport_country: "United Kingdom", destination_country: "France", requirement: "UK citizens can enter France without a visa for up to 90 days." },
  { id: "UnitedKingdom-Japan", passport_country: "United Kingdom", destination_country: "Japan", requirement: "UK citizens do not need a visa for tourism in Japan for up to 90 days." },
  { id: "UnitedKingdom-Nepal", passport_country: "United Kingdom", destination_country: "Nepal", requirement: "UK citizens need a visa to visit Nepal." },
  { id: "UnitedKingdom-Pakistan", passport_country: "United Kingdom", destination_country: "Pakistan", requirement: "UK citizens need a visa to visit Pakistan." },
  { id: "UnitedKingdom-Tanzania", passport_country: "United Kingdom", destination_country: "Tanzania", requirement: "UK citizens need a visa to visit Tanzania." },
  
  // USA (5)
  { id: "USA-France", passport_country: "USA", destination_country: "France", requirement: "U.S. citizens can enter France without a visa for up to 90 days." },
  { id: "USA-Japan", passport_country: "USA", destination_country: "Japan", requirement: "U.S. citizens do not need a visa for tourism in Japan for up to 90 days." },
  { id: "USA-Nepal", passport_country: "USA", destination_country: "Nepal", requirement: "U.S. citizens do not need a visa for tourism in Nepal for up to 90 days." },
  { id: "USA-Pakistan", passport_country: "USA", destination_country: "Pakistan", requirement: "U.S. citizens need a visa to visit Pakistan." },
  { id: "USA-Tanzania", passport_country: "USA", destination_country: "Tanzania", requirement: "U.S. citizens need a visa to visit Tanzania." }
];

// Função para popular

export const seedVisaData = async () => {
  for (const data of visaData) {
    await setDoc(doc(visaCheck, "visaRequirements", data.id), {
      passport_country: data.passport_country,
      destination_country: data.destination_country,
      requirement: data.requirement
    });
 
  }
  console.log("Todos os dados foram enviados");
};

seedVisaData();
*/
