import axios from "axios";

// Helper utility to fetch clinic list with direct API and offline fallback
export const FALLBACK_CLINICS = [
  {
    "ClinicId": 2,
    "ClinicName": "Adajan",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 3,
    "ClinicName": "Adyar",
    "ClinicGroupCode": "OSAVM"
  },
  {
    "ClinicId": 4,
    "ClinicName": "Aevum Dental Care",
    "ClinicGroupCode": "UBAVM"
  },
  {
    "ClinicId": 5,
    "ClinicName": "Airoli",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 6,
    "ClinicName": "Ambernath East",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 7,
    "ClinicName": "Ameerpet",
    "ClinicGroupCode": "OSAVM"
  },
  {
    "ClinicId": 8,
    "ClinicName": "Annanagar",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 9,
    "ClinicName": "Annanagar Madurai",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 12,
    "ClinicName": "Aundh",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 13,
    "ClinicName": "Bandra West",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 14,
    "ClinicName": "Begusarai",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 15,
    "ClinicName": "Bejai",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 16,
    "ClinicName": "Bhandup",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 17,
    "ClinicName": "Bhayander West",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 18,
    "ClinicName": "Bhopal",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 19,
    "ClinicName": "Borivali West",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 20,
    "ClinicName": "BTM",
    "ClinicGroupCode": "OSAVM"
  },
  {
    "ClinicId": 21,
    "ClinicName": "BTM",
    "ClinicGroupCode": ""
  },
  {
    "ClinicId": 22,
    "ClinicName": "Byculla West",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 23,
    "ClinicName": "Bye Pass Road",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 25,
    "ClinicName": "Chembur",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 26,
    "ClinicName": "Chharwada",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 27,
    "ClinicName": "Chidambaram",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 28,
    "ClinicName": "Chikhali",
    "ClinicGroupCode": "UBAVM"
  },
  {
    "ClinicId": 29,
    "ClinicName": "Chinna Chokkikulam",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 30,
    "ClinicName": "Cuddalore",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 31,
    "ClinicName": "Dadar West",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 32,
    "ClinicName": "Dasarahalli",
    "ClinicGroupCode": "UBAVM"
  },
  {
    "ClinicId": 34,
    "ClinicName": "Dindigul",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 35,
    "ClinicName": "Dr Gargs Royal Dental Care",
    "ClinicGroupCode": "UBAVM"
  },
  {
    "ClinicId": 36,
    "ClinicName": "Dwarka",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 37,
    "ClinicName": "Edapally",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 38,
    "ClinicName": "Electronic City",
    "ClinicGroupCode": "OSAVM"
  },
  {
    "ClinicId": 39,
    "ClinicName": "Eluru",
    "ClinicGroupCode": "UBAVM"
  },
  {
    "ClinicId": 40,
    "ClinicName": "Evolom",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 41,
    "ClinicName": "Gachibowli",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 42,
    "ClinicName": "Ganapathy",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 43,
    "ClinicName": "Ganganagar",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 44,
    "ClinicName": "Ghanshyam Nagar",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 45,
    "ClinicName": "Ghansoli",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 46,
    "ClinicName": "Ghatkopar",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 47,
    "ClinicName": "Ghodbunder Road",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 48,
    "ClinicName": "Gokuldham Goregaon East",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 49,
    "ClinicName": "Goregaon West",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 50,
    "ClinicName": "Greater Noida",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 51,
    "ClinicName": "Gurgaon Sec 28",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 52,
    "ClinicName": "Gurgaon Sec 50",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 53,
    "ClinicName": "Hadapsar",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 54,
    "ClinicName": "Hoodi",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 55,
    "ClinicName": "Hoskote",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 56,
    "ClinicName": "HSR Layout",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 57,
    "ClinicName": "Hubballi",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 58,
    "ClinicName": "Indirapuram",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 59,
    "ClinicName": "Indore",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 60,
    "ClinicName": "IT Test Clinic",
    "ClinicGroupCode": ""
  },
  {
    "ClinicId": 61,
    "ClinicName": "Jayanagar",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 62,
    "ClinicName": "Judges Bunglow",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 63,
    "ClinicName": "Juhu Andheri West",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 64,
    "ClinicName": "Kammanahalli",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 65,
    "ClinicName": "Kamothe",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 66,
    "ClinicName": "Karve Road",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 67,
    "ClinicName": "Kelambakkam",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 68,
    "ClinicName": "Khadakpada",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 69,
    "ClinicName": "Kharghar",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 70,
    "ClinicName": "Kogilu Cross",
    "ClinicGroupCode": "UBAVM"
  },
  {
    "ClinicId": 71,
    "ClinicName": "Konanakunte",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 72,
    "ClinicName": "Koramangala",
    "ClinicGroupCode": "OSAVM"
  },
  {
    "ClinicId": 73,
    "ClinicName": "Korattur",
    "ClinicGroupCode": "UBAVM"
  },
  {
    "ClinicId": 74,
    "ClinicName": "Kottayam",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 75,
    "ClinicName": "KR Puram",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 76,
    "ClinicName": "Kranti Chowk",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 77,
    "ClinicName": "Kukatpally",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 78,
    "ClinicName": "Kulgaon",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 79,
    "ClinicName": "Kumbakonam",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 80,
    "ClinicName": "Lajpat Nagar",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 81,
    "ClinicName": "Lakdikapool",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 82,
    "ClinicName": "LB Nagar",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 83,
    "ClinicName": "M G Koppal Main Road",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 84,
    "ClinicName": "Madhanandhapuram",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 85,
    "ClinicName": "Madhapur",
    "ClinicGroupCode": "OSAVM"
  },
  {
    "ClinicId": 86,
    "ClinicName": "Malad West",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 87,
    "ClinicName": "Mandya",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 88,
    "ClinicName": "Mangaon",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 89,
    "ClinicName": "Manikonda",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 90,
    "ClinicName": "Maninagar",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 91,
    "ClinicName": "Mansarovar",
    "ClinicGroupCode": "OSAVM"
  },
  {
    "ClinicId": 92,
    "ClinicName": "Margao",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 93,
    "ClinicName": "Market Yard",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 94,
    "ClinicName": "Mathikere",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 95,
    "ClinicName": "Mayur Vihar",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 96,
    "ClinicName": "Mira Road",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 97,
    "ClinicName": "Mulund",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 98,
    "ClinicName": "Nanganallur",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 100,
    "ClinicName": "Nashik Road",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 101,
    "ClinicName": "Navrangpura",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 102,
    "ClinicName": "Nerul",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 103,
    "ClinicName": "New Yelahanka",
    "ClinicGroupCode": "OSAVM"
  },
  {
    "ClinicId": 104,
    "ClinicName": "Nigdi",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 106,
    "ClinicName": "Niranjanpur",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 107,
    "ClinicName": "Noida Sec 18",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 108,
    "ClinicName": "Palava",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 109,
    "ClinicName": "Pallikaranai",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 110,
    "ClinicName": "Pammal",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 111,
    "ClinicName": "Panchkula Sec 8",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 112,
    "ClinicName": "Panvel",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 113,
    "ClinicName": "Patel Nagar",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 114,
    "ClinicName": "Phadke Road",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 115,
    "ClinicName": "Pimpri",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 116,
    "ClinicName": "Pondicherry",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 117,
    "ClinicName": "Porvorim",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 118,
    "ClinicName": "Powai",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 119,
    "ClinicName": "Pundag",
    "ClinicGroupCode": "UBAVM"
  },
  {
    "ClinicId": 120,
    "ClinicName": "Rajajinagar",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 121,
    "ClinicName": "Ramdaspeth",
    "ClinicGroupCode": "OSAVM"
  },
  {
    "ClinicId": 122,
    "ClinicName": "Ranchi",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 123,
    "ClinicName": "Randesan",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 124,
    "ClinicName": "Rani Gunj",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 125,
    "ClinicName": "Rohini",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 126,
    "ClinicName": "RR Nagar",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 127,
    "ClinicName": "RS Puram",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 128,
    "ClinicName": "Sadashiv Peth",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 129,
    "ClinicName": "Sahakar Nagar",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 130,
    "ClinicName": "Salunkhe Vihar",
    "ClinicGroupCode": "OSAVM"
  },
  {
    "ClinicId": 131,
    "ClinicName": "Saravanampatti",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 132,
    "ClinicName": "Semmancherry Sholinganallur",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 133,
    "ClinicName": "Shahibaugh",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 134,
    "ClinicName": "Sinhgad",
    "ClinicGroupCode": "OSAVM"
  },
  {
    "ClinicId": 135,
    "ClinicName": "Smeet Dental Care",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 136,
    "ClinicName": "South Bopal",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 137,
    "ClinicName": "Subhanpura Road",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 138,
    "ClinicName": "Sulur",
    "ClinicGroupCode": "UBAVM"
  },
  {
    "ClinicId": 139,
    "ClinicName": "Takshila Andheri East",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 140,
    "ClinicName": "Tambaram",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 141,
    "ClinicName": "Tardeo",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 142,
    "ClinicName": "Tekdi Road",
    "ClinicGroupCode": "UBAVM"
  },
  {
    "ClinicId": 143,
    "ClinicName": "Thane West",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 145,
    "ClinicName": "Thanjavur Road",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 146,
    "ClinicName": "Thillainagar",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 147,
    "ClinicName": "Thippasandra",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 148,
    "ClinicName": "Thoraipakkam",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 149,
    "ClinicName": "Thudiyalur",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 150,
    "ClinicName": "Thycaud",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 151,
    "ClinicName": "Tirupati",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 152,
    "ClinicName": "Toli Chowki",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 153,
    "ClinicName": "Tonk Road",
    "ClinicGroupCode": "OSAVM"
  },
  {
    "ClinicId": 154,
    "ClinicName": "Tooth Doctor Kasturi Nagar",
    "ClinicGroupCode": "UBAVM"
  },
  {
    "ClinicId": 155,
    "ClinicName": "Uttarahalli",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 156,
    "ClinicName": "Vadavalli",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 157,
    "ClinicName": "Vaishali Nagar",
    "ClinicGroupCode": "MCAVM"
  },
  {
    "ClinicId": 158,
    "ClinicName": "Vanaspathi",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 159,
    "ClinicName": "Vasai West",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 160,
    "ClinicName": "Vashi",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 161,
    "ClinicName": "Vastral",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 162,
    "ClinicName": "Vesu",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 163,
    "ClinicName": "Vidhyadhar Nagar",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 164,
    "ClinicName": "Vijaywada",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 165,
    "ClinicName": "Vikas Marg",
    "ClinicGroupCode": "SCAVM"
  },
  {
    "ClinicId": 166,
    "ClinicName": "Vikaspuri",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 167,
    "ClinicName": "Vile Parle",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 168,
    "ClinicName": "Virar",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 169,
    "ClinicName": "Vyttila",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 170,
    "ClinicName": "Wadala",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 171,
    "ClinicName": "Wadgaon Sheri",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 172,
    "ClinicName": "West Mambalam",
    "ClinicGroupCode": "OS"
  },
  {
    "ClinicId": 174,
    "ClinicName": "Zenon Dental",
    "ClinicGroupCode": "UBAVM"
  }
];

export const fetchClinicList = async () => {
  // 1. Direct API call to live database
  try {
    const res = await axios.get(
      "https://www.orthosquareportal.com/FlexismileApiNew/FlexAlign.svc/GetClinicList",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (res.data && res.data.Data && Array.isArray(res.data.Data) && res.data.Data.length > 0) {
      return res.data.Data.sort((a, b) =>
        (a.ClinicName || "").localeCompare(b.ClinicName || "")
      );
    }
  } catch (e) {
    console.warn("Direct API fetch failed, trying fetch fallback...", e);
  }

  // 2. Fallback fetch attempt
  try {
    const res = await fetch("https://www.orthosquareportal.com/FlexismileApiNew/FlexAlign.svc/GetClinicList");
    if (res.ok) {
      const dataRes = await res.json();
      if (dataRes && dataRes.Data && Array.isArray(dataRes.Data) && dataRes.Data.length > 0) {
        return dataRes.Data.sort((a, b) =>
          (a.ClinicName || "").localeCompare(b.ClinicName || "")
        );
      }
    }
  } catch (e) {
    console.warn("Fetch failed, using fallback dataset...", e);
  }

  // 3. Fallback dataset
  return FALLBACK_CLINICS;
};
