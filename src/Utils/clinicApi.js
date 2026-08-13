// Helper utility to fetch clinic list with CORS fallback
const FALLBACK_CLINICS = [
  { ClinicId: 1, ClinicName: "Andheri East", ClinicGroupCode: "OS" },
  { ClinicId: 2, ClinicName: "Andheri West", ClinicGroupCode: "OS" },
  { ClinicId: 3, ClinicName: "Bandra West", ClinicGroupCode: "OS" },
  { ClinicId: 4, ClinicName: "Borivali West", ClinicGroupCode: "OS" },
  { ClinicId: 5, ClinicName: "Chembur", ClinicGroupCode: "OS" },
  { ClinicId: 6, ClinicName: "Dadar West", ClinicGroupCode: "OS" },
  { ClinicId: 7, ClinicName: "Ghatkopar East", ClinicGroupCode: "OS" },
  { ClinicId: 8, ClinicName: "Juhu", ClinicGroupCode: "OS" },
  { ClinicId: 9, ClinicName: "Kandivali West", ClinicGroupCode: "OS" },
  { ClinicId: 10, ClinicName: "Malad West", ClinicGroupCode: "OS" },
  { ClinicId: 11, ClinicName: "Mulund West", ClinicGroupCode: "OS" },
  { ClinicId: 12, ClinicName: "Powai", ClinicGroupCode: "OS" },
  { ClinicId: 13, ClinicName: "Thane West", ClinicGroupCode: "OS" },
  { ClinicId: 14, ClinicName: "Vashi", ClinicGroupCode: "OS" },
  { ClinicId: 15, ClinicName: "Ayanavaram", ClinicGroupCode: "MCAVM" },
  { ClinicId: 16, ClinicName: "Anna Nagar", ClinicGroupCode: "MCAVM" },
  { ClinicId: 17, ClinicName: "Adyar", ClinicGroupCode: "MCAVM" },
  { ClinicId: 18, ClinicName: "Chromepet", ClinicGroupCode: "MCAVM" },
  { ClinicId: 19, ClinicName: "KK Nagar", ClinicGroupCode: "MCAVM" },
  { ClinicId: 20, ClinicName: "Porur", ClinicGroupCode: "MCAVM" },
  { ClinicId: 21, ClinicName: "Velachery", ClinicGroupCode: "MCAVM" },
  { ClinicId: 22, ClinicName: "Coimbatore", ClinicGroupCode: "UBAVM" },
  { ClinicId: 23, ClinicName: "Madurai", ClinicGroupCode: "UBAVM" },
  { ClinicId: 24, ClinicName: "Salem", ClinicGroupCode: "SCAVM" },
  { ClinicId: 25, ClinicName: "Trichy", ClinicGroupCode: "SCAVM" },
  { ClinicId: 26, ClinicName: "Salunkhe Vihar", ClinicGroupCode: "OSAVM" }
];

export const fetchClinicList = async () => {
  try {
    // 1. Try relative path (uses package.json proxy to bypass CORS)
    let res = await fetch("/FlexismileApiNew/FlexAlign.svc/GetClinicList");
    if (res.ok) {
      const dataRes = await res.json();
      if (dataRes && dataRes.Data && dataRes.Data.length > 0) {
        return dataRes.Data;
      }
    }
  } catch (e) {
    console.warn("Relative proxy fetch failed, trying CORS proxy...", e);
  }

  try {
    // 2. Try CORS proxy wrapper
    let res = await fetch("https://api.allorigins.win/raw?url=https://www.orthosquareportal.com/FlexismileApiNew/FlexAlign.svc/GetClinicList");
    if (res.ok) {
      const dataRes = await res.json();
      if (dataRes && dataRes.Data && dataRes.Data.length > 0) {
        return dataRes.Data;
      }
    }
  } catch (e) {
    console.warn("CORS proxy fetch failed, trying direct URL...", e);
  }

  try {
    // 3. Try direct URL
    let res = await fetch("https://www.orthosquareportal.com/FlexismileApiNew/FlexAlign.svc/GetClinicList");
    if (res.ok) {
      const dataRes = await res.json();
      if (dataRes && dataRes.Data && dataRes.Data.length > 0) {
        return dataRes.Data;
      }
    }
  } catch (e) {
    console.warn("Direct API fetch blocked by CORS, using fallback dataset...", e);
  }

  // 4. Fallback dataset
  return FALLBACK_CLINICS;
};
