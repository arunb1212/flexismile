import React,{useState,useEffect,useRef} from "react";
import user from "../../Assets/user.png";
import logo from "../../Assets/Logoremovebg.png";
import "../../Admin/Styles/EditPatient.css";
import { IoMdNotifications } from "react-icons/io";
import { FiMessageSquare, FiPower } from "react-icons/fi";
import { FaBars, FaEdit,FaUpload,FaCalendarAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbUser } from "react-icons/tb";

import {
    Container,
    Row,
    Col,
    Nav,
    Button,
    Navbar,
    Dropdown,
    Tab,
    InputGroup,
    Card,
    Stack,
    Form,
    ProgressBar,
    Tabs,
    Spinner
  } from "react-bootstrap";
import { useNavigate,useParams } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';
import $ from "jquery";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";


function AddTreatmentPage(){

    const [values, setValues] = useState({
        DoctorId: "",
        FirstName: "",
        LastName: "",
        Mi: "",
        Gender: "",
        DateofBirth: "",
        DoctorName: "",
        ClinicAddress: "",
        CaseNo: "",
        ShipToOffice:"",
        BillToOffice:"",
        ClinicalConditions: [],
        GeneralNotes: "",
        ChiefComplaint: "",
        Quotation: "",
        ExpectedNoOfAligners: "",
        ProductType: "",
        AmountPaid: "",
        PrescriptionDate: "",
        UpperMidline: "",
        LowerMidline: "",
        CanineRelationshipRightClass: "",
        CanineRelationshipLeftClass: "",
        MolarRelationshipRightClass: "",
        MolarRelationshipLeftClass: "",
        Endon: "",
        Overbite: "",
        Overjet: "",
        InstructionUpperMidline: "",
        InstructionLowerMidline: "",
        InstructionOverjet: "",
        InstructionOverbite: "",
        InstructionArchForm: "",
        InstructionCanineRelationship: "",
        InstructionMolarRelationship: "",
        InstructionPosteriorCrossbite: "",
        InstructionIPR: "",
        InstructionEngagersAttachments: "",
        InstructionProcline: "",
        InstructionExpand: "",
        InstructionDistalize: "",
        DoNotMoveTheseTeeth: [],
        AvidEngagersAttachmentsOnTheseTeeth: [],
        IWillExtractTheseTeethBeforeTreatment: [],
        LeaveTheseSpacesOpen: [],
        AdditionalInstruction: "",
        PortraitPath: "",
        TypeOfPVSScan:"",
        PathOfDoc: [],
        FrontalRepose:"",
        FrontalSmiling:"",
        ProfileRepose: "",
        FrontOpImage:"",            
        OcclussalUpper:"",
        OcclussalLower:"",
        BuccalRight:"",
        BuccalLeft:"",
        BuccalFront:"",
        RadiographsType:"",
        XrayLeft:"",
        XrayRight:"",
        ExtraOralMoreImages:[],
        IntraOralMoreImages:[],
        PatientId:"",
        PathVideo:"",
        Mode:"2"
        // XrayLeft: sessionStorage.getItem("XrayLeft"),
        // UploadVideo: "",
      });



      
  const [progressE1, setProgressE1] = useState(null);
  const [progressE2, setProgressE2] = useState(null);
  const [progressE3, setProgressE3] = useState(null);
  const [progressE4, setProgressE4] = useState(null);


  const [progressI1, setProgressI1] = useState(null);
  const [progressI2, setProgressI2] = useState(null);
  const [progressI3, setProgressI3] = useState(null);
  const [progressI4, setProgressI4] = useState(null);
  const [progressI5, setProgressI5] = useState(null);
  
  // Video upload states
  const [videoFiles, setVideoFiles] = useState();
  const [videoProgress, setVideoProgress] = useState(null);
  const [DoctorUploadingVideo, setDoctorUploadingVideo] = useState("");
  const [RequiredIPR, setRequiredIPR] = useState("");

  // IPR states
  const [IPR, setIPR] = useState(null);
  
  // Plan selection state
  const [selectedPlan, setSelectedPlan] = useState(1);
  console.log(selectedPlan);




      const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  var radGarph1 = document.getElementById("rGraph1");

  // const arrayToString = (arr) => {
  //   for (let i = 0;i<arr.length ;i++) {
  //     if (i == arr.length-1) {
  //       s.concat(arr[i]);
  //       console.log(s);
  //     } else {
  //       s.concat(arr[i]).concat(',');
  //       console.log(s);
  //     }
  //     return s;
  //   }
  // }

//   useEffect(() => {
//     // let s = [1, 2, 3, 4];
//     // console.log(s.toString());
//     // console.log("s :", s);
//     console.log(method);
//   }, []);

var extra = document.getElementById("ExtraNow");
var intra = document.getElementById("IntraNow");

const IndividualUpload1=async ()=>{
  const fd=new FormData();
  const extraElem = document.getElementById("ExtraNow");

  if (extraElem && extraElem.checked) {
    if (!state6) {
      Swal.fire({
        title: "Please select an image first!",
        icon: "warning"
      });
      return;
    }
    fd.append("Name", state6.name);
    fd.append("fileContent", state6);
  }
  else {
    if (state6) {
      if (extraElem) extraElem.checked = true;
      fd.append("Name", state6.name);
      fd.append("fileContent", state6);
    } else {
      Swal.fire({
        title: "Select the Upload photos now button!",
        icon: "warning"
      });
      return;
    }
  }
  await axios
  .post(
    "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
    fd,
    {
      onUploadProgress: (ProgressEvent) => {
        setProgressE1(
          Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
        );
        console.log(
          "Upload Progress:" +
            Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            ) +
            "%"
        );
      },
    }
  )
  .then((res) => {
    var arr = res.data;
    console.log(arr);
    setValues(pre=>{
      return{...pre,FrontalRepose:res.data.path}
    })

    let conf1=document.getElementById("extim1")
    
    if(res.data.status==="1"){
      Swal.fire({
        title: `${state6?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success"
      });
      if (conf1) conf1.style.display="none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error"
      });
    }
    setProgressE1(null);
  })
  .catch((err) => {
    console.error("Upload error:", err);
    setProgressE1(null);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error"
    });
  });
}


const IndividualUpload2=async ()=>{
  const fd=new FormData();
  const extraElem = document.getElementById("ExtraNow");

  if (extraElem && extraElem.checked) {
    if (!state62) {
      Swal.fire({
        title: "Please select an image first!",
        icon: "warning"
      });
      return;
    }
    fd.append("Name", state62.name);
    fd.append("fileContent", state62);
  }
  else {
    if (state62) {
      if (extraElem) extraElem.checked = true;
      fd.append("Name", state62.name);
      fd.append("fileContent", state62);
    } else {
      Swal.fire({
        title: "Select the Upload photos now button!",
        icon: "warning"
      });
      return;
    }
  }
  await axios
  .post(
    "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
    fd,
    {
      onUploadProgress: (ProgressEvent) => {
        setProgressE2(
          Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
        );
        console.log(
          "Upload Progress:" +
            Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            ) +
            "%"
        );
      },
    }
  )
  .then((res) => {
    var arr = res.data;
    console.log(arr);
    setValues(pre=>{
      return{...pre,FrontalSmiling:res.data.path}
    })
    let conf2=document.getElementById("extim2")
    if(res.data.status==="1"){
      Swal.fire({
        title: `${state62?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success"
      });
      if (conf2) conf2.style.display="none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error"
      });
    }
    setProgressE2(null);
  })
  .catch((err) => {
    console.error("Upload error:", err);
    setProgressE2(null);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error"
    });
  });
}

const IndividualUpload3=async ()=>{
  const fd=new FormData();
  const extraElem = document.getElementById("ExtraNow");

  if (extraElem && extraElem.checked) {
    if (!state65) {
      Swal.fire({
        title: "Please select an image first!",
        icon: "warning"
      });
      return;
    }
    fd.append("Name", state65.name);
    fd.append("fileContent", state65);
    console.log(state65);
  }
  else {
    if (state65) {
      if (extraElem) extraElem.checked = true;
      fd.append("Name", state65.name);
      fd.append("fileContent", state65);
    } else {
      Swal.fire({
        title: "Select the Upload photos now button!",
        icon: "warning"
      });
      return;
    }
  }
  await axios
  .post(
    "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
    fd,
    {
      onUploadProgress: (ProgressEvent) => {
        setProgressE3(
          Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
        );
        console.log(
          "Upload Progress:" +
            Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            ) +
            "%"
        );
      },
    }
  )
  .then((res) => {
    var arr = res.data;
    console.log(arr);
    setValues(pre=>{
      return{...pre,ProfileRepose:res.data.path}
    })

    let conf3=document.getElementById("extim3")

    if(res.data.status==="1"){
      Swal.fire({
        title: `${state65?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success"
      });
      if (conf3) conf3.style.display="none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error"
      });
    }
    setProgressE3(null);
  })
  .catch((err) => {
    console.error("Upload error:", err);
    setProgressE3(null);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error"
    });
  });
}


const IndividualUpload4=async ()=>{
  const fd=new FormData();
  const extraElem = document.getElementById("ExtraNow");

  if (extraElem && extraElem.checked) {
    if (!state67) {
      Swal.fire({
        title: "Please select an image first!",
        icon: "warning"
      });
      return;
    }
    fd.append("Name", state67.name);
    fd.append("fileContent", state67);
    console.log(state67);
  }
  else {
    if (state67) {
      if (extraElem) extraElem.checked = true;
      fd.append("Name", state67.name);
      fd.append("fileContent", state67);
    } else {
      Swal.fire({
        title: "Select the Upload photos now button!",
        icon: "warning"
      });
      return;
    }
  }
  await axios
  .post(
    "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
    fd,
    {
      onUploadProgress: (ProgressEvent) => {
        setProgressE4(
          Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
        );
        console.log(
          "Upload Progress:" +
            Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            ) +
            "%"
        );
      },
    }
  )
  .then((res) => {
    var arr = res.data;
    console.log(arr);
    setValues(pre=>{
      return{...pre,FrontOpImage:res.data.path}
    })

    let conf4=document.getElementById("extim4")

    if(res.data.status==="1"){
      Swal.fire({
        title: `${state67?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success"
      });
      if (conf4) conf4.style.display="none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error"
      });
    }
    setProgressE4(null);
  })
  .catch((err) => {
    console.error("Upload error:", err);
    setProgressE4(null);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error"
    });
  });
}



// ---------------------------------------------------Intra Individual

const IntraUpload1=async ()=>{
  const fd=new FormData();
  const intraElem = document.getElementById("IntraNow");

  if (intraElem && intraElem.checked) {
    if (!state662) {
      Swal.fire({
        title: "Please select an image first!",
        icon: "warning"
      });
      return;
    }
    fd.append("Name", state662.name);
    fd.append("fileContent", state662);
  }
  else {
    if (state662) {
      if (intraElem) intraElem.checked = true;
      fd.append("Name", state662.name);
      fd.append("fileContent", state662);
    } else {
      Swal.fire({
        title: "Select the Upload photos now button!",
        icon: "warning"
      });
      return;
    }
  }
  await axios
  .post(
    "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
    fd,
    {
      onUploadProgress: (ProgressEvent) => {
        setProgressI1(
          Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
        );
        console.log(
          "Upload Progress:" +
            Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            ) +
            "%"
        );
      },
    }
  )
  .then((res) => {
    var arr = res.data;
    console.log(arr);
    setValues(pre=>{
      return{...pre,BuccalRight:res.data.path}
    })

    let confint1=document.getElementById("intim1")

    if(res.data.status==="1"){
      Swal.fire({
        title: `${state662?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success"
      });
      if (confint1) confint1.style.display="none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error"
      });
    }
    setProgressI1(null);
  })
  .catch((err) => {
    console.error("Upload error:", err);
    setProgressI1(null);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error"
    });
  });
}


const IntraUpload2=async ()=>{
  const fd=new FormData();
  const intraElem = document.getElementById("IntraNow");

  if (intraElem && intraElem.checked) {
    if (!state6621) {
      Swal.fire({
        title: "Please select an image first!",
        icon: "warning"
      });
      return;
    }
    fd.append("Name", state6621.name);
    fd.append("fileContent", state6621);
  }
  else {
    if (state6621) {
      if (intraElem) intraElem.checked = true;
      fd.append("Name", state6621.name);
      fd.append("fileContent", state6621);
    } else {
      Swal.fire({
        title: "Select the Upload photos now button!",
        icon: "warning"
      });
      return;
    }
  }
  await axios
  .post(
    "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
    fd,
    {
      onUploadProgress: (ProgressEvent) => {
        setProgressI2(
          Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
        );
        console.log(
          "Upload Progress:" +
            Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            ) +
            "%"
        );
      },
    }
  )
  .then((res) => {
    var arr = res.data;
    console.log(arr);
    setValues(pre=>{
      return{...pre,BuccalLeft:res.data.path}
    })

    let confint2=document.getElementById("intim2")

    if(res.data.status==="1"){
      Swal.fire({
        title: `${state6621?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success"
      });
      if (confint2) confint2.style.display="none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error"
      });
    }
    setProgressI2(null);
  })
  .catch((err) => {
    console.error("Upload error:", err);
    setProgressI2(null);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error"
    });
  });
}


const IntraUpload3=async ()=>{
  const fd=new FormData();
  const intraElem = document.getElementById("IntraNow");

  if (intraElem && intraElem.checked) {
    if (!state6622) {
      Swal.fire({
        title: "Please select an image first!",
        icon: "warning"
      });
      return;
    }
    fd.append("Name", state6622.name);
    fd.append("fileContent", state6622);
  }
  else {
    if (state6622) {
      if (intraElem) intraElem.checked = true;
      fd.append("Name", state6622.name);
      fd.append("fileContent", state6622);
    } else {
      Swal.fire({
        title: "Select the Upload photos now button!",
        icon: "warning"
      });
      return;
    }
  }
  await axios
  .post(
    "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
    fd,
    {
      onUploadProgress: (ProgressEvent) => {
        setProgressI3(
          Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
        );
        console.log(
          "Upload Progress:" +
            Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            ) +
            "%"
        );
      },
    }
  )
  .then((res) => {
    var arr = res.data;
    console.log(arr);
    setValues(pre=>{
      return{...pre,BuccalFront:res.data.path}
    })
    let confint3=document.getElementById("intim3")
    if(res.data.status==="1"){
      Swal.fire({
        title: `${state6622?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success"
      });
      if (confint3) confint3.style.display="none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error"
      });
    }
    setProgressI3(null);
  })
  .catch((err) => {
    console.error("Upload error:", err);
    setProgressI3(null);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error"
    });
  });
}


const IntraUpload4=async ()=>{
  const fd=new FormData();
  const intraElem = document.getElementById("IntraNow");

  if (intraElem && intraElem.checked) {
    if (!state6623) {
      Swal.fire({
        title: "Please select an image first!",
        icon: "warning"
      });
      return;
    }
    fd.append("Name", state6623.name);
    fd.append("fileContent", state6623);
  }
  else {
    if (state6623) {
      if (intraElem) intraElem.checked = true;
      fd.append("Name", state6623.name);
      fd.append("fileContent", state6623);
    } else {
      Swal.fire({
        title: "Select the Upload photos now button!",
        icon: "warning"
      });
      return;
    }
  }
  await axios
  .post(
    "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
    fd,
    {
      onUploadProgress: (ProgressEvent) => {
        setProgressI4(
          Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
        );
        console.log(
          "Upload Progress:" +
            Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            ) +
            "%"
        );
      },
    }
  )
  .then((res) => {
    var arr = res.data;
    console.log(arr);
    setValues(pre=>{
      return{...pre,OcclussalUpper:res.data.path}
    })

    let confint4=document.getElementById("intim4")

    if(res.data.status==="1"){
      Swal.fire({
        title: `${state6623?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success"
      });
      if (confint4) confint4.style.display="none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error"
      });
    }
    setProgressI4(null);
  })
  .catch((err) => {
    console.error("Upload error:", err);
    setProgressI4(null);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error"
    });
  });
}


const IntraUpload5=async ()=>{
  const fd=new FormData();
  const intraElem = document.getElementById("IntraNow");

  if (intraElem && intraElem.checked) {
    if (!state6624) {
      Swal.fire({
        title: "Please select an image first!",
        icon: "warning"
      });
      return;
    }
    fd.append("Name", state6624.name);
    fd.append("fileContent", state6624);
    console.log(state6624);
  }
  else {
    if (state6624) {
      if (intraElem) intraElem.checked = true;
      fd.append("Name", state6624.name);
      fd.append("fileContent", state6624);
    } else {
      Swal.fire({
        title: "Select the Upload photos now button!",
        icon: "warning"
      });
      return;
    }
  }
  await axios
  .post(
    "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
    fd,
    {
      onUploadProgress: (ProgressEvent) => {
        setProgressI5(
          Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
        );
        console.log(
          "Upload Progress:" +
            Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            ) +
            "%"
        );
      },
    }
  )
  .then((res) => {
    var arr = res.data;
    console.log(arr);
    setValues(pre=>{
      return{...pre,OcclussalLower:res.data.path}
    })

    let confint5=document.getElementById("intim5")

    if(res.data.status==="1"){
      Swal.fire({
        title: `${state6624?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success"
      });
      if (confint5) confint5.style.display="none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error"
      });
    }
    setProgressI5(null);
  })
  .catch((err) => {
    console.error("Upload error:", err);
    setProgressI5(null);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error"
    });
  });
}




const RadioUpload1=async ()=>{
  const fd=new FormData();
  const radGarph1Elem = document.getElementById("radGarph1");

  if (radGarph1Elem && radGarph1Elem.checked) {
    if (!radio) {
      Swal.fire({
        title: "Please select a file first!",
        icon: "warning"
      });
      return;
    }
    fd.append("Name", radio.name);
    fd.append("fileContent", radio);
    console.log(radio);
  }
  else {
    if (radio) {
      if (radGarph1Elem) radGarph1Elem.checked = true;
      fd.append("Name", radio.name);
      fd.append("fileContent", radio);
    } else {
      Swal.fire({
        title: "Select the Upload Radiographs now button!",
        icon: "warning"
      });
      return;
    }
  }
  await axios
  .post(
    "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
    fd,
    {
      onUploadProgress: (ProgressEvent) => {
        console.log(
          "Upload Progress:" +
            Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            ) +
            "%"
        );
      },
    }
  )
  .then((res) => {
    var arr = res.data;
    console.log(arr);
    setValues(pre=>{
      return{...pre,XrayLeft:res.data.path}
    })

    let confrim1=document.getElementById("rim1");

    if(res.data.status==="1"){
      Swal.fire({
        title: `${radio?.name || "File"} \nUploaded Successfully!`,
        icon: "success"
      });
      if (confrim1) confrim1.style.display="none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error"
      });
    }
  })
  .catch((err) => {
    console.error("Upload error:", err);
    Swal.fire({
      title: "Failed to upload file!",
      text: err.message,
      icon: "error"
    });
  });
}



const RadioUpload2=async ()=>{
  const fd=new FormData();
  const radGarph1Elem = document.getElementById("radGarph1");

  if (radGarph1Elem && radGarph1Elem.checked) {
    if (!radio1) {
      Swal.fire({
        title: "Please select a file first!",
        icon: "warning"
      });
      return;
    }
    fd.append("Name", radio1.name);
    fd.append("fileContent", radio1);
    console.log(radio1);
  }
  else {
    if (radio1) {
      if (radGarph1Elem) radGarph1Elem.checked = true;
      fd.append("Name", radio1.name);
      fd.append("fileContent", radio1);
    } else {
      Swal.fire({
        title: "Select the Upload Radiographs now button!",
        icon: "warning"
      });
      return;
    }
  }
  await axios
  .post(
    "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
    fd,
    {
      onUploadProgress: (ProgressEvent) => {
        console.log(
          "Upload Progress:" +
            Math.round(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            ) +
            "%"
        );
      },
    }
  )
  .then((res) => {
    var arr = res.data;
    console.log(arr);
    setValues(pre=>{
      return{...pre,XrayRight:res.data.path}
    })

    let confrim2=document.getElementById("rim2");

    if(res.data.status==="1"){
      Swal.fire({
        title: `${radio1?.name || "File"} \nUploaded Successfully!`,
        icon: "success"
      });
      if (confrim2) confrim2.style.display="none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error"
      });
    }
  })
  .catch((err) => {
    console.error("Upload error:", err);
    Swal.fire({
      title: "Failed to upload file!",
      text: err.message,
      icon: "error"
    });
  });
}








let DoctorName=sessionStorage.getItem("DocName");
let DoctorUserID=sessionStorage.getItem("DocUserId")
let Role=sessionStorage.getItem("Role")

// Video upload functions
const onChangeVideo = (e) => {
  setVideoFiles(e.target.files);
  console.log(e.target.files);
};

const addUploadVideo = async (newarr) => {
  try {
    const res = await axios.post(
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddUploadMultipleVideo",
      newarr,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        onUploadProgress: (ProgressEvent) => {
          if (ProgressEvent.total > 0) {
            console.log(
              "Upload Progress:" +
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                "%"
            );
          }
        },
      }
    );

    console.log("AddUploadMultipleVideo response:", res.data);
    if (
      res.data?.status === true ||
      res.data?.status === "true" ||
      res.data?.status === "1" ||
      res.data?.status === 1 ||
      (res.data?.message && res.data.message.toLowerCase().includes("success"))
    ) {
      const paths = Array.isArray(newarr.VideoPath)
        ? newarr.VideoPath.join(",")
        : newarr.VideoPath;
      setValues((pre) => ({ ...pre, PathVideo: paths }));
      Swal.fire({
        icon: "success",
        title: "Videos uploaded successfully!",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: res.data?.message || "Failed to save video!",
      });
    }
  } catch (err) {
    console.error("Video save error:", err);
    Swal.fire({
      icon: "error",
      title: "Failed to save video",
      text: err.message,
    });
  } finally {
    setVideoProgress(null);
  }
};

const uploadHandlerVideo = async (e) => {
  e.preventDefault();

  if (!videoFiles || videoFiles.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Please select video file(s) first!",
    });
    return;
  }

  const patientId = values.PatientId || urlParams?.PatientId || ID;
  const currentDocUserId = sessionStorage.getItem("DocUserId") || DoctorUserID || values.DoctorId || "1";
  const currentRole = sessionStorage.getItem("Role") || Role || "2";
  const currentDocName = DoctorUploadingVideo || sessionStorage.getItem("DocName") || DoctorName || "Doctor";

  const fd = new FormData();
  fd.append("PatientId", patientId);
  for (let i = 0; i < videoFiles.length; i++) {
    fd.append("Name", videoFiles[i].name);
    fd.append("fileContent", videoFiles[i]);
  }
  console.log("Uploading video for PatientId:", patientId, "files:", videoFiles);

  setVideoProgress(10);

  try {
    const res = await axios.post(
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadMultipleVideo",
      fd,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (ProgressEvent) => {
          if (ProgressEvent.total > 0) {
            setVideoProgress(
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            );
          }
        },
      }
    );

    console.log("UploadMultipleVideo response:", res.data);
    let arr = res.data?.data;
    let videoPaths = [];

    if (Array.isArray(arr)) {
      videoPaths = arr.map((item) => item?.imageurl || item?.path || item).filter(Boolean);
    } else if (typeof arr === "string" && arr.trim() !== "") {
      videoPaths = [arr];
    } else if (res.data?.path) {
      videoPaths = [res.data.path];
    }

    if (videoPaths.length > 0) {
      let n = {
        PatientId: patientId,
        CreateId: currentRole,
        VideoPath: videoPaths,
        DoctorUploadingVideo: currentDocName,
      };
      await addUploadVideo(n);
    } else {
      setVideoProgress(null);
      Swal.fire({
        icon: "error",
        title: "Video upload failed",
        text: res.data?.message || "No video path returned from server.",
      });
    }
  } catch (err) {
    console.error("Video upload error:", err);
    setVideoProgress(null);
    Swal.fire({
      icon: "error",
      title: "Video upload failed",
      text: err.message,
    });
  }
};

// IPR functions
const onChangeIpr = (e) => {
  setIPR(e.target.files[0]);
  console.log(e.target.files[0]);
};

const uploadHandlerIpr = async () => {
  if (RequiredIPR === "Yes") {
    const fd = new FormData();

    fd.append("PatientId", values.PatientId || "null");
    fd.append("Name", IPR ? IPR.name : "null");
    fd.append("fileContent", IPR || 0);
    fd.append("RequiredIPR", RequiredIPR);

    try {
      const res = await axios.post(
        "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadDocuments",
        fd,
        {
          onUploadProgress: (ProgressEvent) => {
            console.log(
              "Upload Progress: " +
                Math.round(
                  (ProgressEvent.loaded / ProgressEvent.total) * 100
                ) +
                "%"
            );
          },
        }
      );

      console.log(res);

      if (res.data.status === true) {
        Swal.fire({
          icon: "success",
          title: "IPR uploaded successfully!",
        });
      }

      return res.data;
    } catch (err) {
      console.log(err);
    }
  } else {
    const urlNo =
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadDocumentsNo";

    let n = {
      PatientId: values.PatientId,
      RequiredIPR: RequiredIPR,
    };

    try {
      const res = await fetch(urlNo, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(n),
      });

      const result = await res.json();

      console.log(result);

      if (result.status === true) {
        Swal.fire({
          icon: "success",
          title: "IPR status updated!",
        });
      }

      return result;
    } catch (err) {
      console.log(err);
    }
  }
};

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      Swal.fire({
        title: "Incomplete Details",
        text: "Please go back and fill required fields marked with *",
        icon: "warning",
        confirmButtonColor: "#C49358",
      });
      return;
    }
    setValidated(true);

    const url1 =
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddPatientRegistration";

    const patientId = patient[0]?.PatientId || urlParams?.PatientId || ID;
    const currentDoctorId = sessionStorage.getItem("DocUserId") || DoctorUserID || values.DoctorId || "0";

    let n = {
      ...values,
      PatientId: patientId,
      DoctorId: currentDoctorId,
      planName: "Plan " + selectedPlan,
      PathOfDoc: patient[0]?.PathOfDoc || patient.PathOfDoc || [],
      ClinicalConditions: Array.isArray(values.ClinicalConditions)
        ? values.ClinicalConditions.toString()
        : values.ClinicalConditions || "",
      DoNotMoveTheseTeeth: Array.isArray(values.DoNotMoveTheseTeeth)
        ? values.DoNotMoveTheseTeeth.toString()
        : values.DoNotMoveTheseTeeth || "",
      AvidEngagersAttachmentsOnTheseTeeth: Array.isArray(values.AvidEngagersAttachmentsOnTheseTeeth)
        ? values.AvidEngagersAttachmentsOnTheseTeeth.toString()
        : values.AvidEngagersAttachmentsOnTheseTeeth || "",
      IWillExtractTheseTeethBeforeTreatment: Array.isArray(values.IWillExtractTheseTeethBeforeTreatment)
        ? values.IWillExtractTheseTeethBeforeTreatment.toString()
        : values.IWillExtractTheseTeethBeforeTreatment || "",
      LeaveTheseSpacesOpen: Array.isArray(values.LeaveTheseSpacesOpen)
        ? values.LeaveTheseSpacesOpen.toString()
        : values.LeaveTheseSpacesOpen || "",
      ExtraOralMoreImages: Array.isArray(values.ExtraOralMoreImages)
        ? values.ExtraOralMoreImages.toString()
        : values.ExtraOralMoreImages || "",
      IntraOralMoreImages: Array.isArray(values.IntraOralMoreImages)
        ? values.IntraOralMoreImages.toString()
        : values.IntraOralMoreImages || "",
    };

    console.log("Submitting plan data n:", n);

    try {
      if (typeof uploadHandlerIpr === "function") {
        uploadHandlerIpr();
      }

      const res = await axios.post(url1, n, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const result = res.data;
      console.log("AddPatientRegistration result:", result);

      const isSuccess =
        result?.message === "Added Successful" ||
        result?.message === "Added Successfully" ||
        result?.status === true ||
        result?.status === "true" ||
        result?.status === 1 ||
        result?.status === "1" ||
        (result?.message && result.message.toLowerCase().includes("success")) ||
        (result?.message && result.message.toLowerCase().includes("added"));

      if (isSuccess) {
        Swal.fire({
          title: "Plan Added Successfully!",
          text: "The treatment plan details have been saved.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#C49358",
          allowOutsideClick: false,
        }).then(() => {
          const currentDocId = sessionStorage.getItem("DocUserId") || DoctorUserID || "0";
          const currentRole = sessionStorage.getItem("Role") || Role;
          if (currentRole === "1") {
            navigate(`/patient-list/0`);
          } else {
            navigate(`/patient-list/${currentDocId}`);
          }
        });
      } else {
        Swal.fire({
          title: result?.message || "Failed to add plan!",
          icon: "error",
          confirmButtonColor: "#C49358",
        });
      }
    } catch (err) {
      console.error("Submit error:", err);
      Swal.fire({
        title: "Error submitting plan",
        text: err.message,
        icon: "error",
        confirmButtonColor: "#C49358",
      });
    }
  };

  const [reports, setReports] = useState([]);
  
  

  const [state, setState] = useState(null);
  // const [pvs, setPvs] = useState({
  //   pvsScan: "",
  //   intraoral: "",
  //   models: "",
  // });

  const [PVS, setPVS] = useState("")
  const [IntraOral, setIntraOral] = useState("")
  const [Models, setModels] = useState("")

  const [vid, setvid] = useState(null);

  const [state6, setState6] = useState(null);
  const [state61, setState61] = useState(null);
  const [state62, setState62] = useState(null);
  const [state63, setState63] = useState(null);

  const [state64, setState64] = useState(null);
  const [state65, setState65] = useState(null);
  const [state66, setState66] = useState(null);
  const [state67, setState67] = useState(null);

  const [state662, setstate662] = useState(null);
  const [state6621, setstate6621] = useState(null);
  const [state6622, setstate6622] = useState(null);
  const [state6623, setstate6623] = useState(null);
  const [state6624, setstate6624] = useState(null);

  const [add, setAdd] = useState("");
  const [addExtraO, setAddExtraO] = useState("");

  const [radio, setRadio] = useState(null);

  const [radio1, setRadio1] = useState(null);

  var portrait = document.getElementById("four1");

  // const getBase64=(file)=>{
  //   return new Promise((resolve)=>{
  //     let baseURL="";
  //     let reader=new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload=()=>{
  //       console.log("Called",reader);
  //       baseURL=reader.result;
  //       resolve(baseURL);
  //     }
  //   })
  // }

  const handleupload = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    if (portrait.checked) {
      fd.append("Name", state.name);
      fd.append("fileContent", state);
      console.log(state);

   await axios
        .post(
          "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
          fd,
          {
            onUploadProgress: (ProgressEvent) => {
              console.log(
                "Upload Progress:" +
                  Math.round(
                    (ProgressEvent.loaded / ProgressEvent.total) * 100
                  ) +
                  "%"
              );
            },
          }
          )
          .then((res) => {
          
          // console.log(res);
          var arr = res.data;
          console.log(arr);
          setValues(pre=>{
            return{...pre,PortraitPath:res.data.path}
          })

          if(res.data.status==="1"){Swal.fire({
            title: `${state.name} \nUploaded Successfully!`,
            // text: 'Do you want to continue',
            icon: "success"
            // confirmButtonText: 'Cool'
          })}
          // setportraitPath(arr.path)
          console.log(res.data.path);
          // var portPath = arr.path;
          // console.log(portPath);
        
        });
    }
    else{
      Swal.fire({
        title: "Select the Upload patient portrait now button!",
        // text: 'Do you want to continue',
        icon: "warning"
        
        // confirmButtonText: 'Cool'
      })
      
    }
    // setValues((pre)=>{
    //   return{...pre,DoctorId:DoctorUserID}
    // })
    // console.log(values);

    // fd.append("Name",pvs.pvsScan.name);
    // fd.append("fileContent",pvs.pvsScan)
    // console.log(pvs.pvsScan);

    // // fd.append("Name",pvs.intraoral.name);
    // fd.append("fileContent",pvs.intraoral)
    // console.log(pvs.intraoral);

    // // fd.append("Name",pvs.models.name);
    // fd.append("fileContent",pvs.models)
    // console.log(pvs.models);

    // // fd.append("Name",state6.name);
    // fd.append("fileContent",state6)
    // console.log(state6);

    // fd.append("Name",state61.name);
    // fd.append("fileContent",state61)
    // console.log(state61);

    // fd.append("Name",state62.name);
    // fd.append("fileContent",state62)
    // console.log(state62);

    // // fd.append("Name",state63.name);
    // fd.append("fileContent",state63)
    // console.log(state63);

    // // fd.append("Name",state64.name);
    // fd.append("fileContent",state64)
    // console.log(state64);

    // fd.append("Name",state65.name);
    // fd.append("fileContent",state65)
    // console.log(state65);

    // // fd.append("Name",state66.name);
    // fd.append("fileContent",state66)
    // console.log(state66);

    // // fd.append("Name",state67.name);
    // fd.append("fileContent",state67)
    // console.log(state67);

    // // fd.append("Name",add.name);
    // fd.append("fileContent",add)
    // console.log(add);

    // // fd.append("Name",radio.name);
    // fd.append("fileContent",radio)
    // console.log(radio);

    // fd.append("Name",radio1.name);
    // fd.append("fileContent",radio1)
    // console.log(radio1);

    // console.log(values.PortraitPath);

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "multipart/mixed");

    // var formdata = new FormData();
    // formdata.append("MsgPhoto", state, "/C:/Users/www.abcom.in/Downloads/Logoremovebg.png");
    // formdata.append("Senderid", 1);
    // formdata.append("Receiverid", 2);
    // formdata.append("Message", "Hi");
    // formdata.append("MsgPhoto", "Hi");

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: formdata,
    //   redirect: 'follow'
    // };

    // fetch("https://infintrixglobal.com/ChatApplication/webservices/insert_usermessage.php", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
    // setValues((pre)=>{
    //   return{...pre,DoctorId:DoctorUserID}
    // })

    setCurrentTab((prev) => prev + 1);
  };

  var pvs1 = document.getElementById("five2");
  var pvs2 = document.getElementById("five3");
  var pvs3 = document.getElementById("five4");


//   const link = document.querySelector('#five2');
// let method = link.getAttribute('label');
// useEffect(()=>{
// console.log(method);
// },[])
  // var pvs1=document.getElementById("five2");
  // console.log(pvs1);

  const handleUpload1 = (e) => {
    e.preventDefault();

    const fd = new FormData();
    // fd.append("Name",pvs.pvsScan.name);
    // fd.append("fileContent",state);
    // console.log(state);
    if (pvs1.checked) {
      // setValues((pre)=>{
      //   return{...pre,TypeOfPVSScan:}
      // })
      // Array.from(pvs.pvsScan).forEach((up) => {
        fd.append("Name", PVS.name);
        for(let i=0;i<PVS.length;i++){
        fd.append("fileContent", PVS[i]);
        }
      // });
      // setValues(prev=>{
      //   return{...prev, TypeOfPVSScan:prev.TypeOfPVSScan}
      // })
      axios
        .post(
          "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadMultiplePhotos",
          fd,
          {
            onUploadProgress: (ProgressEvent) => {
              console.log(
                "Upload Progress:" +
                  Math.round(
                    (ProgressEvent.loaded / ProgressEvent.total) * 100
                  ) +
                  "%"
              );
            },
          }
        )
        .then((res) => {
          var arr = res.data;
          console.log(arr.data);
          setValues(pre=>{
            return{...pre,PathOfDoc:res.data}
          })
        });
    }

    if (pvs2.checked) {
      // Array.from(pvs.intraoral).forEach((up) => {
      //   fd.append("Name", up.name);
      //   for(let i=0;i<up.length;i++){
      //     fd.append("fileContent", up[i]);
      //     }
      // });
      fd.append("Name", IntraOral.name);
        for(let i=0;i<IntraOral.length;i++){
        fd.append("fileContent", IntraOral[i]);
        }
      axios
        .post(
          "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadMultiplePhotos",
          fd,
          {
            onUploadProgress: (ProgressEvent) => {
              console.log(
                "Upload Progress:" +
                  Math.round(
                    (ProgressEvent.loaded / ProgressEvent.total) * 100
                  ) +
                  "%"
              );
            },
          }
        )
        .then((res) => {
          var arr = res.data;
          console.log(arr);
          setValues(pre=>{
            return{...pre,PathOfDoc:res.data}
          })
        });
    }

    if (pvs3.checked) {
      // Array.from(pvs.models).forEach((up) => {
      //   fd.append("Name", up.name);
      //   for(let i=0;i<up.length;i++){
      //     fd.append("fileContent", up[i]);
      //     }
      // });
      fd.append("Name", Models.name);
        for(let i=0;i<Models.length;i++){
        fd.append("fileContent", Models[i]);
        }
      axios
        .post(
          "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadMultiplePhotos",
          fd,
          {
            onUploadProgress: (ProgressEvent) => {
              console.log(
                "Upload Progress:" +
                  Math.round(
                    (ProgressEvent.loaded / ProgressEvent.total) * 100
                  ) +
                  "%"
              );
            },
          }
        )
        .then((res) => {
          var arr = res.data;
          console.log(arr);
          setValues(pre=>{
            return{...pre,PathOfDoc:res.data}
          })
        });
    }

    // console.log(pvs.pvsScan);
    // console.log(pvs.intraoral);
    // console.log(pvs.models);

    setCurrentTab((prev) => prev + 1);
  };


  const handleUpload2 = (e) => {
    e.preventDefault();

    const fd = new FormData();

    // if (extra.checked) {
    //   fd.append("Name", state6.name);
    //   fd.append("fileContent", state6);

    //   fd.append("Name", state62.name);
    //   fd.append("fileContent", state62);

    //   fd.append("Name", state65.name);
    //   fd.append("fileContent", state65);
    //   console.log(state65);

    //   fd.append("Name", state67.name);
    //   fd.append("fileContent", state67);
    //   console.log(state67);

    //   fd.append("Name", addExtraO.name);
    //   fd.append("fileContent", addExtraO);

    //   axios
    //     .post(
    //       "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
    //       fd,
    //       {
    //         onUploadProgress: (ProgressEvent) => {
    //           console.log(
    //             "Upload Progress:" +
    //               Math.round(
    //                 (ProgressEvent.loaded / ProgressEvent.total) * 100
    //               ) +
    //               "%"
    //           );
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       var arr = res.data;
    //       console.log(arr);
    //       // var photoPath = arr.path;
    //       // sessionStorage.setItem("pathProfileRepose", photoPath);
    //     });
    // }

    if(document.getElementById("uploadBox").value != "") {

      fd.append("Name", addExtraO.name);
      for(let i=0;i<addExtraO.length;i++){
      fd.append("fileContent", addExtraO[i]);
      }
      console.log(addExtraO); 

      axios
        .post(
          "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadMultiplePhotos",
          fd,
          {
            onUploadProgress: (ProgressEvent) => {
              console.log(
                "Upload Progress:" +
                  Math.round(
                    (ProgressEvent.loaded / ProgressEvent.total) * 100
                  ) +
                  "%"
              );
            },
          }
        )
        .then((res) => {
          let arr =[];
          arr= res.data.data;
          // console.log(arr);
          // var EphotoPath = arr.data;
          // sessionStorage.setItem("ExtraOralMoreImages", JSON.stringify(EphotoPath));
          let a=arr.map(f=>f.imageurl);
          // a.map(img=>img.)
          console.log(a);
          setValues(pre=>{
            return{...pre,ExtraOralMoreImages:a}
          })
        });
   }

    // if (intra.checked) {
    //   fd.append("Name", state662.name);
    //   fd.append("fileContent", state662);

    //   fd.append("Name", state6621.name);
    //   fd.append("fileContent", state6621);

    //   fd.append("Name", state6622.name);
    //   fd.append("fileContent", state6622);

    //   fd.append("Name", state6623.name);
    //   fd.append("fileContent", state6623);

    //   fd.append("Name", state6624.name);
    //   fd.append("fileContent", state6624);
    //   console.log(state6624);

     

     

    //   axios
    //     .post(
    //       "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
    //       fd,
    //       {
    //         onUploadProgress: (ProgressEvent) => {
    //           console.log(
    //             "Upload Progress:" +
    //               Math.round(
    //                 (ProgressEvent.loaded / ProgressEvent.total) * 100
    //               ) +
    //               "%"
    //           );
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       var arr = res.data;
    //       console.log(arr);
    //       var photoPath = arr.path;
    //       // sessionStorage.setItem("pathProfileRepose", photoPath);
    //     });
    // }





    if(document.getElementById("uploadBox2").value != "") {
    
    
      fd.append("Name", add.name);
      for(let i=0;i<add.length;i++){
      fd.append("fileContent", add[i]);
      }
      console.log(add);
      axios
        .post(
          "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadMultiplePhotos",
          fd,
          {
            onUploadProgress: (ProgressEvent) => {
              console.log(
                "Upload Progress:" +
                  Math.round(
                    (ProgressEvent.loaded / ProgressEvent.total) * 100
                  ) +
                  "%"   
              );
            },
          }
        )
        .then((res) => {
          let arr =[];
          arr= res.data.data;
          // console.log(arr);
          // var IphotoPath = arr.data;
          // sessionStorage.setItem("IntraOralMoreImages", JSON.stringify(IphotoPath));
          let b=arr.map(f=>f.imageurl);
          // b.map((imageUrl, index) => {
          // })
          console.log(b);
          setValues(pre=>{
            return{...pre,IntraOralMoreImages:b}
          })
          // setValues(pre=>{
          //   return{...pre,IntraOralMoreImages:b}
          // })
        });
   }


    setCurrentTab((prev) => prev + 1);
  };

  // const handleUpload3 = (e) => {
  //   e.preventDefault();

  //   const fd = new FormData();

  //   axios
  //     .post(
  //       "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
  //       fd,
  //       {
  //         onUploadProgress: (ProgressEvent) => {
  //           console.log(
  //             "Upload Progress:" +
  //               Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
  //               "%"
  //           );
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       var arr = res.data;
  //       console.log(arr);
  //       sessionStorage.setItem("XrayLeft", arr.path.toString());
  //     });
  //   setCurrentTab((prev) => prev + 1);
  // };

  const submitTab1 = (event) => {
    setValues(pre=>{
      return{...pre,PatientId:patient[0]?.PatientId}
    })
    console.log(values);

    if(values?.DateofBirth==""){
      alert("Please fill Date of Birth Field!");
    }else{

      setCurrentTab((prev) => prev + 1);
    }
    
    
  };

  // const handleUpload3=(e)=>{
  //   e.preventDefault();

  // }

  const handlecheck = (e) => {
    const { value, checked } = e.target;

    // Case 1 : The user checks the box
    if (checked) {
      setValues((pre) => {
        return {
          ...pre,
          ClinicalConditions: [...pre.ClinicalConditions, value],
        };
      });
    }

    // Case 2 : The user unchecks the box
    else {
      setValues((pre) => {
        return {
          ...pre,
          ClinicalConditions: pre.ClinicalConditions.filter((e) => e !== value),
        };
      });
    }

    console.log(values);
  };

  const handleChange = (e) => {
    // to find out if it's checked or not; returns true or false
    // const checkradio = e.target.checked;

    // console.log(checkradio);

    // to get the checked value
    // const checkedValue = e.target.value;
    // console.log(checkedValue);
    // setValues({
    // ClinicalConditions:[checkedValue]
    // })
    // console.log(values.ClinicalConditions);
    let newdata = { ...values };
    newdata[e.target.name] = e.target.value;
    setValues(newdata);
    console.log(newdata);
    // console.warn(newdata);

    // to get the checked name
    // const checkedName = e.target.name;
    // console.log(checkedName);
    //then you can do with the value all you want to do with it.
  };
  const handleOndragOver = (event) => {
    event.preventDefault();
  };

  const handleOndrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile(imageFile);
  };
  const handleOndrop71 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFileTab71(imageFile);
  };
  const handleOndrop72 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFileTab72(imageFile);
  };
  const handleOndrop1 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile1(imageFile);
  };
  const handleOndrop2 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile2(imageFile);
  };
  const handleOndrop3 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile3(imageFile);
  };
  const handleOndrop4 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile4(imageFile);
  };
  const handleOndrop5 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile5(imageFile);
  };
  const handleOndrop6 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile6(imageFile);
  };
  const handleOndrop7 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile7(imageFile);
  };

  const handleOndrop662 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile662(imageFile);
  };

  const handleOndrop6621 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile6621(imageFile);
  };

  const handleOndrop6622 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile6622(imageFile);
  };

  const handleOndrop6623 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile6623(imageFile);
  };

  const handleOndrop6624 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile6624(imageFile);
  };

  const handleOndropTab61 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFileTab61(imageFile);
  };
  const fileInput = useRef(null);
  const fileInputTab61 = useRef(null);
  const fileInputTab51 = useRef(null);
  const fileInputTab52 = useRef(null);
  const fileInputTab53 = useRef(null);

  const fileInput1 = useRef(null);
  const fileInput2 = useRef(null);
  const fileInput3 = useRef(null);
  const fileInput4 = useRef(null);
  const fileInput5 = useRef(null);
  const fileInput6 = useRef(null);
  const fileInput7 = useRef(null);

  const fileInput62 = useRef(null);
  const fileInput21 = useRef(null);
  const fileInput22 = useRef(null);
  const fileInput23 = useRef(null);
  const fileInput24 = useRef(null);

  const fileInputTab71 = useRef(null);
  const fileInputTab72 = useRef(null);

  const [image, setImage] = useState(null);
  const [imageTab61, setImageTab61] = useState(null);

  // const [imageTab51, setImageTab51] = useState(null);
  // const [imageTab52, setImageTab52] = useState(null);
  // const [imageTab53, setImageTab53] = useState(null);

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [image6, setImage6] = useState(null);
  const [image7, setImage7] = useState(null);

  const [image662, setImage662] = useState(null);
  const [image6621, setImage6621] = useState(null);
  const [image6622, setImage6622] = useState(null);
  const [image6623, setImage6623] = useState(null);
  const [image6624, setImage6624] = useState(null);

  const [imageTab71, setImageTab71] = useState(null);
  const [imageTab72, setImageTab72] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewUrlTab61, setPreviewUrlTab61] = useState("");
  const [previewUrl1, setPreviewUrl1] = useState("");
  const [previewUrl2, setPreviewUrl2] = useState("");
  const [previewUrl3, setPreviewUrl3] = useState("");
  const [previewUrl4, setPreviewUrl4] = useState("");
  const [previewUrl5, setPreviewUrl5] = useState("");
  const [previewUrl6, setPreviewUrl6] = useState("");
  const [previewUrl7, setPreviewUrl7] = useState("");
  const [previewUrl62, setPreviewUrl62] = useState("");
  const [previewUrl21, setPreviewUrl21] = useState("");
  const [previewUrl22, setPreviewUrl22] = useState("");
  const [previewUrl23, setPreviewUrl23] = useState("");
  const [previewUrl24, setPreviewUrl24] = useState("");

  const [previewUrlTab71, setPreviewUrlTab71] = useState("");
  const [previewUrlTab72, setPreviewUrlTab72] = useState("");

  const handleFile = (file) => {
    setImage(file);

    setPreviewUrl(URL.createObjectURL(file));
    console.log(file);
    // if(file){
    //   getBase64(file).then((result)=>{
    //     file["base64"]=result;

    //     setState({
    //       base64URL:result,
    //       file,
    //     })
    //   }).catch((err)=>{
    //     console.log("Error",err);
    //   });

    // }
    setState(file);
  };

  const handleChangeTab6Add = (file) => {
    setAdd(file);
    console.log(file);
  };

  const handleChangeTab6AddExtraOral = (file) => {
    setAddExtraO(file);
    console.log(file);
  };

  const handleChangeTab51 = (file) => {
    // setImageTab51(file);
    // setPreviewUrlTab51(URL.createObjectURL(file));
    setPVS(file)
    console.log(file);
  };

  const handleChangeTab52 = (file) => {
    // setImageTab52(file);
    // setPreviewUrlTab52(URL.createObjectURL(file));
    var fileInput = document.getElementById("files");

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.stl|\.dcm)$/i;

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type \nUpload .stl and .dcm files Only!");
      fileInput.value = "";
      return false;
    }
    setIntraOral(file);    

    console.log(file);
  };

  const handleChangeVid = (file) => {
    setvid(file);
    console.log(file);
  };

  const handleChangeTab53 = (file) => {
    // setImageTab53(file);
    // setPreviewUrlTab53(URL.createObjectURL(file));
    setModels(file);
    console.log(file);
  };

  const handleFileTab61 = (file) => {
    setImageTab61(file);
    setPreviewUrlTab61(URL.createObjectURL(file));
    console.log(file);
    setState6(file);
  };
  const handleFile1 = (file) => {
    setImage1(file);
    setPreviewUrl1(URL.createObjectURL(file));
    console.log(file);
    setState61(file);
  };
  const handleFile2 = (file) => {
    setImage2(file);
    setPreviewUrl2(URL.createObjectURL(file));
    console.log(file);
    setState62(file);
  };
  const handleFile3 = (file) => {
    setImage3(file);
    setPreviewUrl3(URL.createObjectURL(file));
    console.log(file);
    setState63(file);
  };
  const handleFile4 = (file) => {
    setImage4(file);
    setPreviewUrl4(URL.createObjectURL(file));
    console.log(file);
    setState64(file);
  };
  const handleFile5 = (file) => {
    setImage5(file);
    setPreviewUrl5(URL.createObjectURL(file));
    console.log(file);
    setState65(file);
  };
  const handleFile6 = (file) => {
    setImage6(file);
    setPreviewUrl6(URL.createObjectURL(file));
    console.log(file);
    setState66(file);
  };
  const handleFile7 = (file) => {
    setImage7(file);
    setPreviewUrl7(URL.createObjectURL(file));
    console.log(file);
    setState67(file);
  };

  const handleFile662 = (file) => {
    setImage662(file);
    setPreviewUrl62(URL.createObjectURL(file));
    console.log(file);
    setstate662(file);
  };

  const handleFile6621 = (file) => {
    setImage6621(file);
    setPreviewUrl21(URL.createObjectURL(file));
    console.log(file);
    setstate6621(file);
  };

  const handleFile6622 = (file) => {
    setImage6622(file);
    setPreviewUrl22(URL.createObjectURL(file));
    console.log(file);
    setstate6622(file);
  };

  const handleFile6623 = (file) => {
    setImage6623(file);
    setPreviewUrl23(URL.createObjectURL(file));
    console.log(file);
    setstate6623(file);
  };

  const handleFile6624 = (file) => {
    setImage6624(file);
    setPreviewUrl24(URL.createObjectURL(file));
    console.log(file);
    setstate6624(file);
  };

  const handleFileTab71 = (file) => {
    setImageTab71(file);
    setPreviewUrlTab71(URL.createObjectURL(file));
    console.log(file);
    setRadio(file);
  };
  const handleFileTab72 = (file) => {
    setImageTab72(file);
    setPreviewUrlTab72(URL.createObjectURL(file));
    console.log(file);
    setRadio1(file);
  };
  // var disppg=pg.style
  // // pg.style.display="none";
  // if(!rbutton1.checked)
  // {
  // pg.style.display="none";
  // }
  // else{
  // pg.style.display="block";
  // }
  $(document).ready(function () {
    $("input[name$='radioo']").click(function () {
      var test = $(this).val();
      $(".desc").hide();
      $("#frm" + test).show();
    });
    $("input[name$='portrait']").click(function () {
      var test = $(this).val();
      $(".desc").hide();
      $("#port" + test).show();
    });
    $("input[name$='photo']").click(function () {
      var test = $(this).val();
      $(".desc").hide();
      $("#Ph" + test).show();
    });

    $("input[name$='inPhoto']").click(function () {
      var test = $(this).val();
      $(".desc1").hide();
      $("#iPh" + test).show();
    });
    $("input[name$='graph']").click(function () {
      var test = $(this).val();
      $(".desc").hide();
      $("#G" + test).show();
    });
  });

  const handleRadio3 = (e) => {
    setValues((pre) => {
      return { ...pre, UpperMidline: e.target.value };
    });
    // console.log({ UpperMidline: e.target.value });
  };
  const handleRadio31 = (e) => {
    setValues((pre) => {
      return { ...pre, LowerMidline: e.target.value };
    });
    // console.log({ LowerMidline: e.target.value });
  };
  const handleInstructionUpperMidline = (e) => {
    setValues((pre) => {
      return { ...pre, InstructionUpperMidline: e.target.value };
    });
    // console.log({ InstructionUpperMidline: e.target.value });
  };
  const handleInstructionLowerMidline = (e) => {
    setValues((pre) => {
      return { ...pre, InstructionLowerMidline: e.target.value };
    });
    // console.log({ InstructionLowerMidline: e.target.value });
  };
  const handleInstructionOverjet = (e) => {
    setValues((pre) => {
      return { ...pre, InstructionOverjet: e.target.value };
    });
    // console.log({ InstructionOverjet: e.target.value });
  };
  const handleInstructionOverbite = (e) => {
    setValues((pre) => {
      return { ...pre, InstructionOverbite: e.target.value };
    });
    // console.log({ InstructionOverbite: e.target.value });
  };
  const handleInstructionArchForm = (e) => {
    setValues((pre) => {
      return { ...pre, InstructionArchForm: e.target.value };
    });
    // console.log({ InstructionArchForm: e.target.value });
  };
  const handleInstructionCanineRelationship = (e) => {
    setValues((pre) => {
      return { ...pre, InstructionCanineRelationship: e.target.value };
    });
    // console.log({ InstructionCanineRelationship: e.target.value });
  };
  const handleInstructionMolarRelationship = (e) => {
    setValues((pre) => {
      return { ...pre, InstructionMolarRelationship: e.target.value };
    });
    // console.log({ InstructionMolarRelationship: e.target.value });
  };
  const handleInstructionPosteriorCrossbite = (e) => {
    setValues((pre) => {
      return { ...pre, InstructionPosteriorCrossbite: e.target.value };
    });
    // console.log({ InstructionPosteriorCrossbite: e.target.value });
  };
  const handleInstructionIPR = (e) => {
    setValues((pre) => {
      return { ...pre, InstructionIPR: e.target.value };
    });
    // console.log({ InstructionIPR: e.target.value });
  };
  const handleInstructionEngagersAttachments = (e) => {
    setValues((pre) => {
      return { ...pre, InstructionEngagersAttachments: e.target.value };
    });
    // console.log({ InstructionEngagersAttachments: e.target.value });
  };
  const handleInstructionProcline = (e) => {
    setValues((pre) => {
      return { ...pre, InstructionProcline: e.target.value };
    });
    // console.log({ InstructionProcline: e.target.value });
  };
  const handleInstructionExpand = (e) => {
    setValues((pre) => {
      return { ...pre, InstructionExpand: e.target.value };
    });
    // console.log({ InstructionExpand: e.target.value });
  };
  const handleInstructionDistalize = (e) => {
    setValues((pre) => {
      return { ...pre, InstructionDistalize: e.target.value };
    });
    console.log(values);
  };
  const handleDoNotMoveTheseTeeth = (e) => {
    const { value, checked } = e.target;
    const { DoNotMoveTheseTeeth } = values;

    if (checked) {
      setValues((pre) => {
        return {
          ...pre,
          DoNotMoveTheseTeeth: [...pre.DoNotMoveTheseTeeth, value],
        };
      });
    }

    // Case 2 : The user unchecks the box
    else {
      setValues((pre) => {
        return {
          ...pre,
          DoNotMoveTheseTeeth: pre.DoNotMoveTheseTeeth.filter(
            (e) => e !== value
          ),
        };
      });
    }
    console.log(values);
  };

  const handleEngagers = (e) => {
    const { value, checked } = e.target;
    const { AvidEngagersAttachmentsOnTheseTeeth } = values;

    // console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    if (checked) {
      setValues((pre) => {
        return { ...pre, AvidEngagersAttachmentsOnTheseTeeth: [...pre.AvidEngagersAttachmentsOnTheseTeeth, value] };
      });
    }

    // Case 2 : The user unchecks the box
    else {
      setValues((pre) => {
        return { ...pre, AvidEngagersAttachmentsOnTheseTeeth: pre.AvidEngagersAttachmentsOnTheseTeeth.filter((e) => e !== value) };
      });
    }
    console.log(values);
  };

  const handleIWillExtractTheseTeethBeforeTreatment = (e) => {
    const { value, checked } = e.target;
    const { IWillExtractTheseTeethBeforeTreatment } = values;

    if (checked) {
      setValues((pre) => {
        return {
          ...pre,
          IWillExtractTheseTeethBeforeTreatment: [
            ...pre.IWillExtractTheseTeethBeforeTreatment,
            value,
          ],
        };
      });
    }

    // Case 2 : The user unchecks the box
    else {
      setValues((pre) => {
        return {
          ...pre,
          IWillExtractTheseTeethBeforeTreatment:
            pre.IWillExtractTheseTeethBeforeTreatment.filter(
              (e) => e !== value
            ),
        };
      });
    }
    console.log(values);
  };

  const handleLeaveTheseSpacesOpen = (e) => {
    const { value, checked } = e.target;
    const { LeaveTheseSpacesOpen } = values;

    if (checked) {
      setValues((pre) => {
        return {
          ...pre,
          LeaveTheseSpacesOpen: [...pre.LeaveTheseSpacesOpen, value],
        };
      });
    }

    // Case 2 : The user unchecks the box
    else {
      setValues((pre) => {
        return {
          ...pre,
          LeaveTheseSpacesOpen: pre.LeaveTheseSpacesOpen.filter(
            (e) => e !== value
          ),
        };
      });
    }
    console.log(values);
  };

// var method=pvs1.getAttribute("label")

  const [currentTab, setCurrentTab] = useState(0);





























    const tglContent = () => {
        let Menu = document.querySelector(".menuTab");
    
        if (Menu.classList.contains("collapsed")) {
          Menu.classList.remove("collapsed");
        } else {
          Menu.classList.add("collapsed");
        }
      };
//   let DoctorName = sessionStorage.getItem("DocName");
const [patient, setPatient] = useState([]);

const urlParams = useParams();
  // console.log(urlParams);
  const ID = urlParams.PatientId;

  const urlToData =
  "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientAllList/" +
  ID;

useEffect(() => {
  console.log(urlParams);

  // Reset all uploaded file states and preview states when plan changes
  setState(null);
  setState6(null);
  setState61(null);
  setState62(null);
  setState63(null);
  setState64(null);
  setState65(null);
  setState66(null);
  setState67(null);
  setstate662(null);
  setstate6621(null);
  setstate6622(null);
  setstate6623(null);
  setstate6624(null);
  setRadio(null);
  setRadio1(null);
  setImage(null);
  setImageTab61(null);
  setImage1(null);
  setImage2(null);
  setImage3(null);
  setImage4(null);
  setImage5(null);
  setImage6(null);
  setImage7(null);
  setImage662(null);
  setImage6621(null);
  setImage6622(null);
  setImage6623(null);
  setImage6624(null);
  setImageTab71(null);
  setImageTab72(null);
  setPreviewUrl("");
  setPreviewUrlTab61("");
  setPreviewUrl1("");
  setPreviewUrl2("");
  setPreviewUrl3("");
  setPreviewUrl4("");
  setPreviewUrl5("");
  setPreviewUrl6("");
  setPreviewUrl7("");
  setPreviewUrl62("");
  setPreviewUrl21("");
  setPreviewUrl22("");
  setPreviewUrl23("");
  setPreviewUrl24("");
  setPreviewUrlTab71("");
  setPreviewUrlTab72("");
  setAdd("");
  setAddExtraO("");
  setVideoFiles(undefined);
  setVideoProgress(null);
  setDoctorUploadingVideo("");
  setRequiredIPR("");
  setIPR(null);
  setPVS("");
  setIntraOral("");
  setModels("");
  setProgressE1(null);
  setProgressE2(null);
  setProgressE3(null);
  setProgressE4(null);
  setProgressI1(null);
  setProgressI2(null);
  setProgressI3(null);
  setProgressI4(null);
  setProgressI5(null);

  fetch(urlToData)
    .then((res) => res.json())
    .then((details) => {
      console.log(details.Data);
      setPatient(details.Data);
      let bDate = details.Data[0]?.DateofBirth ? details.Data[0]?.DateofBirth.split(" ")[0] : "";
      console.log(bDate);

      let cliCon = details.Data[0]?.ClinicalConditions ? details.Data[0]?.ClinicalConditions.split(',') : [];
      console.log("clinical con", cliCon);
      let doNot = details.Data[0]?.DoNotMoveTheseTeeth ? details.Data[0]?.DoNotMoveTheseTeeth.split(',') : [];
      let extLater = details.Data[0]?.IWillExtractTheseTeethBeforeTreatment ? details.Data[0]?.IWillExtractTheseTeethBeforeTreatment.split(',') : [];
      let leaveSpace = details.Data[0]?.LeaveTheseSpacesOpen ? details.Data[0]?.LeaveTheseSpacesOpen.split(',') : [];
      let engager = details.Data[0]?.AvidEngagersAttachmentsOnTheseTeeth ? details.Data[0]?.AvidEngagersAttachmentsOnTheseTeeth.split(',') : [];

      const isPlan1 = selectedPlan == 1 || selectedPlan === "1";

      setValues((pre) => {
        return {
          ...pre,
          PatientId: ID,
          DoctorId: details.Data[0]?.DoctorID,
          FirstName: details.Data[0]?.Name ? details.Data[0]?.Name.split(' ')[0] : "",
          LastName: details.Data[0]?.Name ? details.Data[0]?.Name.split(' ')[1] : "",
          Mi: details.Data[0]?.Mi || "",
          Gender: details.Data[0]?.Gender || "",
          DateofBirth: details.Data[0]?.DateofBirth || "",
          DoctorName: details.Data[0]?.DoctorName || "",
          ClinicAddress: details.Data[0]?.ClinicAddress || "",
          CaseNo: details.Data[0]?.CaseNo || "",
          ClinicalConditions: cliCon,
          GeneralNotes: details.Data[0]?.GeneralNotes || "",
          ChiefComplaint: details.Data[0]?.ChiefComplaint || "",
          Quotation: details.Data[0]?.Quotation || "",
          ExpectedNoOfAligners: details.Data[0]?.ExpectedNoOfAligners || "",
          ProductType: details.Data[0]?.ProductType || "",
          AmountPaid: details.Data[0]?.AmountPaid || "",
          PrescriptionDate: details.Data[0]?.PrescriptionDate || "",
          CanineRelationshipLeftClass: details.Data[0]?.CanineRelationshipLeftClass || "",
          CanineRelationshipRightClass: details.Data[0]?.CanineRelationshipRightClass || "",
          MolarRelationshipLeftClass: details.Data[0]?.MolarRelationshipLeftClass || "",
          MolarRelationshipRightClass: details.Data[0]?.MolarRelationshipRightClass || "",
          Endon: details.Data[0]?.Endon || "",
          Overbite: details.Data[0]?.Overbite || "",
          Overjet: details.Data[0]?.Overjet || "",
          InstructionUpperMidline: details.Data[0]?.InstructionUpperMidline || "",
          InstructionLowerMidline: details.Data[0]?.InstructionLowerMidline || "",
          InstructionOverjet: details.Data[0]?.InstructionOverjet || "",
          InstructionOverbite: details.Data[0]?.InstructionOverbite || "",
          InstructionArchForm: details.Data[0]?.InstructionArchForm || "",
          InstructionCanineRelationship: details.Data[0]?.InstructionCanineRelationship || "",
          InstructionMolarRelationship: details.Data[0]?.InstructionMolarRelationship || "",
          InstructionPosteriorCrossbite: details.Data[0]?.InstructionPosteriorCrossbite || "",
          InstructionIPR: isPlan1 ? (details.Data[0]?.InstructionIPR || "") : "",
          InstructionEngagersAttachments: details.Data[0]?.InstructionEngagersAttachments || "",
          InstructionProcline: details.Data[0]?.InstructionProcline || "",
          InstructionExpand: details.Data[0]?.InstructionExpand || "",
          InstructionDistalize: details.Data[0]?.InstructionDistalize || "",
          DoNotMoveTheseTeeth: doNot,
          AvidEngagersAttachmentsOnTheseTeeth: engager,
          IWillExtractTheseTeethBeforeTreatment: extLater,
          LeaveTheseSpacesOpen: leaveSpace,
          AdditionalInstruction: details.Data[0]?.AdditionalInstruction || "",
          // Start with clean empty photo and radiograph slots for new treatment
          PortraitPath: "",
          PathOfDoc: [],
          FrontalRepose: "",
          FrontalSmiling: "",
          ProfileRepose: "",
          FrontOpImage: "",
          OcclussalUpper: "",
          OcclussalLower: "",
          BuccalFront: "",
          BuccalRight: "",
          BuccalLeft: "",
          ExtraOralMoreImages: [],
          IntraOralMoreImages: [],
          RadiographsType: "",
          XrayLeft: "",
          XrayRight: "",
          PathVideo: "",
          TypeOfPVSScan: "",
        };
      });
    });
}, [selectedPlan]);



function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
  ].join('/');
}





    return(
        <>
        <Navbar collapseOnSelect expand="lg" className="navb">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="" className="" width={120} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Button variant="" onClick={tglContent} className="navhide">
                <FaBars fontSize={28} color="#C49358" />
              </Button>
            </Nav>
            <Nav>
              {/* <Nav.Link href="#deets">
                <IoMdNotifications
                  fontSize={30}
                  color="#C49358"
                  className="notification"
                />
              </Nav.Link> */}
              {/* <Nav.Link eventKey={2} href="#memes">
                <FiMessageSquare
                  fontSize={30}
                  color="#C49358"
                  className="me-2 notification"
                />
              </Nav.Link> */}
              <span className="address">
                <img src={user} alt="" width={35} className="mt-1" />
              </span>
              <Nav.Link href="" className="p-0 mx-2 mt-1">
                <Dropdown>
                  <Dropdown.Toggle
                    variant=""
                    id="dropdown-basic"
                    className="user"
                  >
                    {DoctorName}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* <Dropdown.Item href="#/action-1">
                      <CgProfile fontSize={25} />
                      <span className="px-3">Profile</span>
                    </Dropdown.Item>
                    <hr /> */}
                    <Dropdown.Item href="#/action-2">
                      <FiPower fontSize={25} />
                      <span className="px-3" onClick={() => navigate("/")}>
                        Logout
                      </span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row className="menuTab">
          <Col>
            <Card body className="border-0">
              <Nav className="justify-content-center">
               
                  <Nav.Link className="doc-tab active" onClick={()=>Role==="1"?navigate("/admin-dashboard"):navigate(`/doctor-dashboard/${DoctorUserID}`)}>
                  Dashboard
                  </Nav.Link>
               
                {/* <Nav.Link href="#deets" className="prof-tab">
                  Profile
                </Nav.Link> */}
              </Nav>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid>
      <Row className="justify-content-center">
        <Col md={11}>
          <Container fluid>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Container
                className="pt-5 mt-5 pb-5 mb-5"
                style={{
                  boxShadow: "0px 0px 5px 5px #dee2e6",
                  backgroundColor: "white",
                }}
                fluid
              >
                <Row>
                  <Col md={{ span: 12 }}>
                    <Row className="justify-content-center">
                      <Col md={{ span: 12 }}>
                        <Row>
                          <Row className="pt-4 justify-content-center px-5">
                            <Col sm={{ span: 12 }}>
                              <Row className="mb-3">
                                <Col md={{ span: 3 }}>
                                  <Form.Group>
                                    <Form.Select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                                      <option value={1}>Plan 1</option>
                                      <option value={2}>Plan 2</option>
                                      <option value={3}>Plan 3</option>
                                      <option value={4}>Plan 4</option>
                                      <option value={5}>Rescan</option>
                                    </Form.Select>
                                  </Form.Group>
                                </Col>
                              </Row>

                              {/* Patient Basic Details */}
                              <Row className="mt-3 mb-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px", padding: "15px", border: "1px solid #dee2e6" }}>
                                <Col xs={12}>
                                  <p style={{ fontSize: "1.15rem", fontWeight: "bold", color: "#C49358", marginBottom: "12px" }}>Patient Basic Details</p>
                                </Col>
                                <Col md={4} sm={12} className="mb-2">
                                  <p style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "4px" }}>Name : <span style={{ fontWeight: "normal" }}>{patient[0]?.Name}</span></p>
                                </Col>
                                <Col md={4} sm={12} className="mb-2">
                                  <p style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "4px" }}>Case Paper No : <span style={{ fontWeight: "normal" }}>{patient[0]?.CaseNo}</span></p>
                                </Col>
                                <Col md={4} sm={12} className="mb-2">
                                  <p style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "4px" }}>Gender : <span style={{ fontWeight: "normal" }}>{patient[0]?.Gender}</span></p>
                                </Col>
                                <Col md={4} sm={12} className="mb-2">
                                  <p style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "4px" }}>DOB : <span style={{ fontWeight: "normal" }}>{patient[0]?.DateofBirth?.split(' ')[0]}</span></p>
                                </Col>
                                <Col md={4} sm={12} className="mb-2">
                                  <p style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "4px" }}>MI : <span style={{ fontWeight: "normal" }}>{patient[0]?.Mi}</span></p>
                                </Col>
                                <Col md={4} sm={12} className="mb-2">
                                  <p style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "4px" }}>Doctor's Name : <span style={{ fontWeight: "normal" }}>{patient[0]?.DoctorName}</span></p>
                                </Col>
                                <Col md={4} sm={12} className="mb-2">
                                  <p style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "4px" }}>Clinic Address : <span style={{ fontWeight: "normal" }}>{patient[0]?.ClinicAddress}</span></p>
                                </Col>
                                <Col md={4} sm={12} className="mb-2">
                                  <p style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "4px" }}>Registration Date : <span style={{ fontWeight: "normal" }}>{patient[0]?.RegDate}</span></p>
                                </Col>
                                <Col md={4} sm={12} className="mb-2">
                                  <p style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "4px" }}>Product Type : <span style={{ fontWeight: "normal" }}>{patient[0]?.ProductType === "1" ? "Classic" : "Premium"}</span></p>
                                </Col>
                              </Row>

                            </Col>
                          </Row>
                          <Row className="pt-4 justify-content-center px-5">
                            <Col
                              sm={{ span: 12 }}
                              style={{ border: "solid 0.1em lightgray" }}
                            >
                              <Tabs
                                activeKey={currentTab}
                                justify
                                className="mt-3"
                              >

                                <Tab eventKey={0} title="1. Photos">
                                  {/* <section>
                <label>
                + Add Images
                <br />
                <span>up to 10 images</span>
                <input
                type="file"
                name="images"
                onChange={onSelectFile}
                multiple
                accept="image/png , image/jpeg, image/webp"
                />
                </label>
                <br />
                <input type="file" multiple />
                {selectedImages.length > 0 &&
                (selectedImages.length > 10 ? (
                <p className="error">
                You can't upload more than 10 images! <br />
                <span>
                please delete <b> {selectedImages.length - 10} </b> of them{" "}
                </span>
                </p>
                ) : (
                <button
                className="upload-btn"
                onClick={() => {
                console.log(selectedImages);
                }}
                >
                UPLOAD {selectedImages.length} IMAGE
                {selectedImages.length === 1 ? "" : "S"}
                </button>
                ))}
                <div className="images">
                {selectedImages &&
                selectedImages.map((image, index) => {
                return (
                <div key={image} className="image">
                <img src={image} height="200" alt="upload" />
                <button onClick={() => deleteHandler(image)}>
                delete image
                </button>
                <p>{index + 1}</p>
                </div>
                );
                })}
                </div>
                </section> */}
                                  <Row className="m-2">
                                    <Col md={6}>
                                      <Card className="img-crd">
                                        <Card.Header>
                                          <p>Extraoral Photos</p>
                                        </Card.Header>
                                        <Row className="p-3">
                                          <Col>
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 1"
                                              id="ExtraNow"
                                              name="photo"
                                              label="Upload photos now"
                                              value="1"
                                            />
                                          </Col>
                                          <Col>
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 2"
                                              id="ExtraLater"
                                              name="photo"
                                              label="Upload photos later"
                                              value="2"
                                            />
                                          </Col>
                                        </Row>
                                        <hr className="m-2" />
                                        <Card
                                          className="img-crd-in m-2 p-3 desc"
                                          id="Ph1"
                                          // onDragOver={handleOndragOver}
                                          // onDrop={handleOndrop}
                                          // onClick={() => fileInput.current.click()}
                                        >
                                          <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputTab61}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>
                                              handleFileTab61(e.target.files[0])
                                            }
                                          />
                                          {/* <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInput1}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>
                                              handleFile1(e.target.files[0])
                                            }
                                          /> */}
                                          <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInput2}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>
                                              handleFile2(e.target.files[0])
                                            }
                                          />
                                          {/* <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInput3}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>
                                              handleFile3(e.target.files[0])
                                            }
                                          /> */}
                                          {/* <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInput4}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>
                                              handleFile4(e.target.files[0])
                                            }
                                          /> */}
                                          <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInput5}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>
                                              handleFile5(e.target.files[0])
                                            }
                                          />
                                          {/* <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInput6}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>
                                              handleFile6(e.target.files[0])
                                            }
                                          /> */}
                                          <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInput7}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>{
                                              handleFile7(e.target.files[0])
                                              console.log(values);
                                            }
                                            }
                                          />
                                          <Row>
                                            <Col md={6}>
                                              <Card
                                                className="crd-up"
                                                onDragOver={handleOndragOver}
                                                onDrop={handleOndropTab61}
                                                onClick={() =>
                                                  fileInputTab61.current.click()
                                                }
                                              >
                                                {previewUrlTab61 || values.FrontalRepose ? (
                                                  <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
                                                    <img
                                                      src={previewUrlTab61 || values.FrontalRepose}
                                                      alt="Frontal Repose"
                                                      className="img-s"
                                                      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "4px" }}
                                                    />
                                                    <span
                                                      className="position-absolute bottom-0 start-0 end-0 text-center text-white py-1 px-1"
                                                      style={{ background: "rgba(0,0,0,0.65)", fontSize: "11px", fontWeight: "600", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}
                                                    >
                                                      Frontal Repose
                                                    </span>
                                                    <button
                                                      type="button"
                                                      title="Remove photo"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPreviewUrlTab61("");
                                                        setImageTab61(null);
                                                        setState6(null);
                                                        setValues((prev) => ({ ...prev, FrontalRepose: "" }));
                                                        if (fileInputTab61.current) fileInputTab61.current.value = "";
                                                      }}
                                                      style={{
                                                        position: "absolute",
                                                        top: "4px",
                                                        right: "4px",
                                                        border: "none",
                                                        background: "rgba(220, 53, 69, 0.9)",
                                                        color: "#fff",
                                                        borderRadius: "50%",
                                                        width: "22px",
                                                        height: "22px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "14px",
                                                        lineHeight: "1",
                                                        cursor: "pointer",
                                                        zIndex: 10,
                                                      }}
                                                    >
                                                      ×
                                                    </button>
                                                  </div>
                                                ) : (
                                                  <div className="text-center text-muted p-2">
                                                    <FaUpload className="mb-1" style={{ fontSize: "1.2rem", color: "#C49358" }} />
                                                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#333" }}>Frontal Repose</div>
                                                    <div style={{ fontSize: "10px", color: "#888" }}>Click or drag photo</div>
                                                  </div>
                                                )}
                                              </Card>
                                              <span className="m-auto"><Button variant="" className="btn-outline-dark mt-1" onClick={IndividualUpload1}>Confirm</Button>{previewUrlTab61?<span id="extim1">Confirm to upload!</span>:""}</span>
                                              {progressE1 &&
                      <Spinner animation="border"/>
                      }
                                            </Col>
                                            <Col md={6}>
                                              <Card
                                                className="crd-up"
                                                onDragOver={handleOndragOver}
                                                onDrop={handleOndrop2}
                                                onClick={() =>
                                                  fileInput2.current.click()
                                                }
                                              >
                                                {previewUrl2 || values.FrontalSmiling ? (
                                                  <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
                                                    <img
                                                      src={previewUrl2 || values.FrontalSmiling}
                                                      alt="Frontal Smiling"
                                                      className="img-s"
                                                      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "4px" }}
                                                    />
                                                    <span
                                                      className="position-absolute bottom-0 start-0 end-0 text-center text-white py-1 px-1"
                                                      style={{ background: "rgba(0,0,0,0.65)", fontSize: "11px", fontWeight: "600", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}
                                                    >
                                                      Frontal Smiling
                                                    </span>
                                                    <button
                                                      type="button"
                                                      title="Remove photo"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPreviewUrl2("");
                                                        setImage2(null);
                                                        setState62(null);
                                                        setValues((prev) => ({ ...prev, FrontalSmiling: "" }));
                                                        if (fileInput2.current) fileInput2.current.value = "";
                                                      }}
                                                      style={{
                                                        position: "absolute",
                                                        top: "4px",
                                                        right: "4px",
                                                        border: "none",
                                                        background: "rgba(220, 53, 69, 0.9)",
                                                        color: "#fff",
                                                        borderRadius: "50%",
                                                        width: "22px",
                                                        height: "22px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "14px",
                                                        lineHeight: "1",
                                                        cursor: "pointer",
                                                        zIndex: 10,
                                                      }}
                                                    >
                                                      ×
                                                    </button>
                                                  </div>
                                                ) : (
                                                  <div className="text-center text-muted p-2">
                                                    <FaUpload className="mb-1" style={{ fontSize: "1.2rem", color: "#C49358" }} />
                                                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#333" }}>Frontal Smiling</div>
                                                    <div style={{ fontSize: "10px", color: "#888" }}>Click or drag photo</div>
                                                  </div>
                                                )}
                                              </Card>
                                              <span className="m-auto"><Button variant="" className="btn-outline-dark mt-1" onClick={IndividualUpload2}>Confirm</Button>{previewUrl2?<span id="extim2">Confirm to upload!</span>:""}</span>
                                              {progressE2 &&
                      <Spinner animation="border"/>
                      }
                                            </Col>
                                          </Row>
                                          <Row className="mt-4 justify-content-center">
                                            <Col md={4}>
                                              <Card className="border-0 p-2">
                                                <p className="text-center">
                                                  Drag and drop individual
                                                  photos from desktop folder to
                                                  respective tile
                                                </p>
                                              </Card>
                                            </Col>
                                          </Row>
                                          <Row className="mt-3">
                                            <Col md={6}>
                                              <Card
                                                className="crd-up"
                                                onDragOver={handleOndragOver}
                                                onDrop={handleOndrop5}
                                                onClick={() =>
                                                  fileInput5.current.click()
                                                }
                                              >
                                                {previewUrl5 || values.ProfileRepose ? (
                                                  <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
                                                    <img
                                                      src={previewUrl5 || values.ProfileRepose}
                                                      alt="Profile Repose"
                                                      className="img-s"
                                                      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "4px" }}
                                                    />
                                                    <span
                                                      className="position-absolute bottom-0 start-0 end-0 text-center text-white py-1 px-1"
                                                      style={{ background: "rgba(0,0,0,0.65)", fontSize: "11px", fontWeight: "600", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}
                                                    >
                                                      Profile Repose
                                                    </span>
                                                    <button
                                                      type="button"
                                                      title="Remove photo"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPreviewUrl5("");
                                                        setImage5(null);
                                                        setState65(null);
                                                        setValues((prev) => ({ ...prev, ProfileRepose: "" }));
                                                        if (fileInput5.current) fileInput5.current.value = "";
                                                      }}
                                                      style={{
                                                        position: "absolute",
                                                        top: "4px",
                                                        right: "4px",
                                                        border: "none",
                                                        background: "rgba(220, 53, 69, 0.9)",
                                                        color: "#fff",
                                                        borderRadius: "50%",
                                                        width: "22px",
                                                        height: "22px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "14px",
                                                        lineHeight: "1",
                                                        cursor: "pointer",
                                                        zIndex: 10,
                                                      }}
                                                    >
                                                      ×
                                                    </button>
                                                  </div>
                                                ) : (
                                                  <div className="text-center text-muted p-2">
                                                    <FaUpload className="mb-1" style={{ fontSize: "1.2rem", color: "#C49358" }} />
                                                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#333" }}>Profile Repose</div>
                                                    <div style={{ fontSize: "10px", color: "#888" }}>Click or drag photo</div>
                                                  </div>
                                                )}
                                              </Card>
                                              <span className="m-auto"><Button variant="" className="btn-outline-dark mt-1" onClick={IndividualUpload3}>Confirm</Button>{previewUrl5?<span id="extim3">Confirm to upload!</span>:""}</span>
                                              {progressE3 &&
                      <Spinner animation="border"/>
                      }
                                            </Col>
                                            <Col md={6}>
                                              <Card
                                                className="crd-up"
                                                onDragOver={handleOndragOver}
                                                onDrop={handleOndrop7}
                                                onClick={() =>
                                                  fileInput7.current.click()
                                                }
                                              >
                                                {previewUrl7 || values.FrontOpImage ? (
                                                  <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
                                                    <img
                                                      src={previewUrl7 || values.FrontOpImage}
                                                      alt="Profile 45° / Other"
                                                      className="img-s"
                                                      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "4px" }}
                                                    />
                                                    <span
                                                      className="position-absolute bottom-0 start-0 end-0 text-center text-white py-1 px-1"
                                                      style={{ background: "rgba(0,0,0,0.65)", fontSize: "11px", fontWeight: "600", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}
                                                    >
                                                      Profile 45° / Other
                                                    </span>
                                                    <button
                                                      type="button"
                                                      title="Remove photo"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPreviewUrl7("");
                                                        setImage7(null);
                                                        setState67(null);
                                                        setValues((prev) => ({ ...prev, FrontOpImage: "" }));
                                                        if (fileInput7.current) fileInput7.current.value = "";
                                                      }}
                                                      style={{
                                                        position: "absolute",
                                                        top: "4px",
                                                        right: "4px",
                                                        border: "none",
                                                        background: "rgba(220, 53, 69, 0.9)",
                                                        color: "#fff",
                                                        borderRadius: "50%",
                                                        width: "22px",
                                                        height: "22px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "14px",
                                                        lineHeight: "1",
                                                        cursor: "pointer",
                                                        zIndex: 10,
                                                      }}
                                                    >
                                                      ×
                                                    </button>
                                                  </div>
                                                ) : (
                                                  <div className="text-center text-muted p-2">
                                                    <FaUpload className="mb-1" style={{ fontSize: "1.2rem", color: "#C49358" }} />
                                                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#333" }}>Profile 45° / Other</div>
                                                    <div style={{ fontSize: "10px", color: "#888" }}>Click or drag photo</div>
                                                  </div>
                                                )}
                                              </Card>
                                              <span className="m-auto"><Button variant="" className="btn-outline-dark mt-1" onClick={IndividualUpload4}>Confirm</Button>{previewUrl7?<span id="extim4">Confirm to upload!</span>:""}</span>
                                              {progressE4 &&
                                                <Spinner animation="border"/>
                                              }
                                            </Col>
                                          </Row>
                                        </Card>
                                        <Card
                                          className="desc border-0"
                                          id="Ph2"
                                          style={{ display: "none" }}
                                        >
                                          <Row className="m-2">
                                            <Col md={6}>
                                              <Card className="crd-up"></Card>
                                            </Col>
                                            <Col md={6}>
                                              <Card className="crd-up"></Card>
                                            </Col>
                                          </Row>
                                          <Row className="m-2">
                                          </Row>
                                          <Row className="m-2">
                                            <Col md={6}>
                                              <Card className="crd-up"></Card>
                                            </Col>
                                            <Col md={6}>
                                              <Card className="crd-up"></Card>
                                            </Col>
                                          </Row>
                                        </Card>
                                        <Row className="m-2 mt-1">
                                          <Col>
                                            <p className="m-0 pb-1">
                                              Add More Photos
                                            </p>
                                            <Form.Control
                                              type="file"
                                              multiple
                                              className=""
                                              name="Name"
                                              id="uploadBox"
                                              onChange={(e) => {
                                                handleChangeTab6AddExtraOral(
                                                  e.target.files
                                                );
                                              }}
                                            />
                                          </Col>
                                        </Row>
                                      </Card>
                                    </Col>
                                    <Col md={6}>
                                      <Card className="img-crd">
                                        <Card.Header>
                                          <p>Intraoral Photos</p>
                                        </Card.Header>
                                        <Row className="p-3">
                                          <Col>
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 1"
                                              id="IntraNow"
                                              name="inPhoto"
                                              label="Upload photos now"
                                              value="1"
                                            />
                                          </Col>
                                          <Col>
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 2"
                                              id="IntraLater"
                                              name="inPhoto"
                                              label="Upload photos later"
                                              value="2"
                                            />
                                          </Col>
                                        </Row>
                                        <hr className="m-2" />
                                        <Card
                                          className="img-crd-in m-2 p-3 desc1"
                                          id="iPh1"
                                        >
                                          <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInput62}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>
                                              handleFile662(e.target.files[0])
                                            }
                                          />
                                          <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInput21}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>
                                              handleFile6621(e.target.files[0])
                                            }
                                          />
                                          <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInput22}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>
                                              handleFile6622(e.target.files[0])
                                            }
                                          />
                                          <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInput23}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>
                                              handleFile6623(e.target.files[0])
                                            }
                                          />
                                          <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInput24}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>{
                                              handleFile6624(e.target.files[0])
                                            console.log(values);
                                            }
                                            }
                                          />
                                          <Row>
                                            <Col md={6}>
                                              <Card
                                                className="crd-up"
                                                onDragOver={handleOndragOver}
                                                onDrop={handleOndrop662}
                                                onClick={() =>
                                                  fileInput62.current.click()
                                                }
                                              >
                                                {previewUrl62 || values.BuccalRight ? (
                                                  <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
                                                    <img
                                                      src={previewUrl62 || values.BuccalRight}
                                                      alt="Buccal Right"
                                                      className="img-s"
                                                      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "4px" }}
                                                    />
                                                    <span
                                                      className="position-absolute bottom-0 start-0 end-0 text-center text-white py-1 px-1"
                                                      style={{ background: "rgba(0,0,0,0.65)", fontSize: "11px", fontWeight: "600", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}
                                                    >
                                                      Buccal Right
                                                    </span>
                                                    <button
                                                      type="button"
                                                      title="Remove photo"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPreviewUrl62("");
                                                        setImage662(null);
                                                        setstate662(null);
                                                        setValues((prev) => ({ ...prev, BuccalRight: "" }));
                                                        if (fileInput62.current) fileInput62.current.value = "";
                                                      }}
                                                      style={{
                                                        position: "absolute",
                                                        top: "4px",
                                                        right: "4px",
                                                        border: "none",
                                                        background: "rgba(220, 53, 69, 0.9)",
                                                        color: "#fff",
                                                        borderRadius: "50%",
                                                        width: "22px",
                                                        height: "22px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "14px",
                                                        lineHeight: "1",
                                                        cursor: "pointer",
                                                        zIndex: 10,
                                                      }}
                                                    >
                                                      ×
                                                    </button>
                                                  </div>
                                                ) : (
                                                  <div className="text-center text-muted p-2">
                                                    <FaUpload className="mb-1" style={{ fontSize: "1.2rem", color: "#C49358" }} />
                                                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#333" }}>Buccal Right</div>
                                                    <div style={{ fontSize: "10px", color: "#888" }}>Click or drag photo</div>
                                                  </div>
                                                )}
                                              </Card>
                                              <span className="m-auto"><Button variant="" className="btn-outline-dark mt-1" onClick={IntraUpload1}>Confirm</Button>{previewUrl62?<span id="intim1">Confirm to upload!</span>:""}</span>
                                              {progressI1 &&
                      <Spinner animation="border"/>
                      }
                                            </Col>
                                            <Col md={6}>
                                              <Card
                                                className="crd-up"
                                                onDragOver={handleOndragOver}
                                                onDrop={handleOndrop6621}
                                                onClick={() =>
                                                  fileInput21.current.click()
                                                }
                                              >
                                                {previewUrl21 || values.BuccalLeft ? (
                                                  <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
                                                    <img
                                                      src={previewUrl21 || values.BuccalLeft}
                                                      alt="Buccal Left"
                                                      className="img-s"
                                                      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "4px" }}
                                                    />
                                                    <span
                                                      className="position-absolute bottom-0 start-0 end-0 text-center text-white py-1 px-1"
                                                      style={{ background: "rgba(0,0,0,0.65)", fontSize: "11px", fontWeight: "600", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}
                                                    >
                                                      Buccal Left
                                                    </span>
                                                    <button
                                                      type="button"
                                                      title="Remove photo"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPreviewUrl21("");
                                                        setImage6621(null);
                                                        setstate6621(null);
                                                        setValues((prev) => ({ ...prev, BuccalLeft: "" }));
                                                        if (fileInput21.current) fileInput21.current.value = "";
                                                      }}
                                                      style={{
                                                        position: "absolute",
                                                        top: "4px",
                                                        right: "4px",
                                                        border: "none",
                                                        background: "rgba(220, 53, 69, 0.9)",
                                                        color: "#fff",
                                                        borderRadius: "50%",
                                                        width: "22px",
                                                        height: "22px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "14px",
                                                        lineHeight: "1",
                                                        cursor: "pointer",
                                                        zIndex: 10,
                                                      }}
                                                    >
                                                      ×
                                                    </button>
                                                  </div>
                                                ) : (
                                                  <div className="text-center text-muted p-2">
                                                    <FaUpload className="mb-1" style={{ fontSize: "1.2rem", color: "#C49358" }} />
                                                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#333" }}>Buccal Left</div>
                                                    <div style={{ fontSize: "10px", color: "#888" }}>Click or drag photo</div>
                                                  </div>
                                                )}
                                              </Card>
                                              <span className="m-auto"><Button variant="" className="btn-outline-dark mt-1" onClick={IntraUpload2}>Confirm</Button>{previewUrl21?<span id="intim2">Confirm to upload!</span>:""}</span>
                                              {progressI2 &&
                      <Spinner animation="border"/>
                      }
                                            </Col>
                                          </Row>
                                          <Row className="mt-3 justify-content-center">
                                            <Col md={6}>
                                              <Card
                                                className="crd-up"
                                                onDragOver={handleOndragOver}
                                                onDrop={handleOndrop6622}
                                                onClick={() =>
                                                  fileInput22.current.click()
                                                }
                                              >
                                                {previewUrl22 || values.BuccalFront ? (
                                                  <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
                                                    <img
                                                      src={previewUrl22 || values.BuccalFront}
                                                      alt="Buccal Front"
                                                      className="img-s"
                                                      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "4px" }}
                                                    />
                                                    <span
                                                      className="position-absolute bottom-0 start-0 end-0 text-center text-white py-1 px-1"
                                                      style={{ background: "rgba(0,0,0,0.65)", fontSize: "11px", fontWeight: "600", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}
                                                    >
                                                      Buccal Front
                                                    </span>
                                                    <button
                                                      type="button"
                                                      title="Remove photo"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPreviewUrl22("");
                                                        setImage6622(null);
                                                        setstate6622(null);
                                                        setValues((prev) => ({ ...prev, BuccalFront: "" }));
                                                        if (fileInput22.current) fileInput22.current.value = "";
                                                      }}
                                                      style={{
                                                        position: "absolute",
                                                        top: "4px",
                                                        right: "4px",
                                                        border: "none",
                                                        background: "rgba(220, 53, 69, 0.9)",
                                                        color: "#fff",
                                                        borderRadius: "50%",
                                                        width: "22px",
                                                        height: "22px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "14px",
                                                        lineHeight: "1",
                                                        cursor: "pointer",
                                                        zIndex: 10,
                                                      }}
                                                    >
                                                      ×
                                                    </button>
                                                  </div>
                                                ) : (
                                                  <div className="text-center text-muted p-2">
                                                    <FaUpload className="mb-1" style={{ fontSize: "1.2rem", color: "#C49358" }} />
                                                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#333" }}>Buccal Front</div>
                                                    <div style={{ fontSize: "10px", color: "#888" }}>Click or drag photo</div>
                                                  </div>
                                                )}
                                              </Card>
                                              <span className="m-auto"><Button variant="" className="btn-outline-dark mt-1" onClick={IntraUpload3}>Confirm</Button>{previewUrl22?<span id="intim3">Confirm to upload!</span>:""}</span>
                                              {progressI3 &&
                      <Spinner animation="border"/>
                      }
                                            </Col>
                                          </Row>
                                          <Row className="mt-3">
                                            <Col md={6}>
                                              <Card
                                                className="crd-up"
                                                onDragOver={handleOndragOver}
                                                onDrop={handleOndrop6623}
                                                onClick={() =>
                                                  fileInput23.current.click()
                                                }
                                              >
                                                {previewUrl23 || values.OcclussalUpper ? (
                                                  <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
                                                    <img
                                                      src={previewUrl23 || values.OcclussalUpper}
                                                      alt="Occlusal Upper"
                                                      className="img-s"
                                                      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "4px" }}
                                                    />
                                                    <span
                                                      className="position-absolute bottom-0 start-0 end-0 text-center text-white py-1 px-1"
                                                      style={{ background: "rgba(0,0,0,0.65)", fontSize: "11px", fontWeight: "600", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}
                                                    >
                                                      Occlusal Upper
                                                    </span>
                                                    <button
                                                      type="button"
                                                      title="Remove photo"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPreviewUrl23("");
                                                        setImage6623(null);
                                                        setstate6623(null);
                                                        setValues((prev) => ({ ...prev, OcclussalUpper: "" }));
                                                        if (fileInput23.current) fileInput23.current.value = "";
                                                      }}
                                                      style={{
                                                        position: "absolute",
                                                        top: "4px",
                                                        right: "4px",
                                                        border: "none",
                                                        background: "rgba(220, 53, 69, 0.9)",
                                                        color: "#fff",
                                                        borderRadius: "50%",
                                                        width: "22px",
                                                        height: "22px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "14px",
                                                        lineHeight: "1",
                                                        cursor: "pointer",
                                                        zIndex: 10,
                                                      }}
                                                    >
                                                      ×
                                                    </button>
                                                  </div>
                                                ) : (
                                                  <div className="text-center text-muted p-2">
                                                    <FaUpload className="mb-1" style={{ fontSize: "1.2rem", color: "#C49358" }} />
                                                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#333" }}>Occlusal Upper</div>
                                                    <div style={{ fontSize: "10px", color: "#888" }}>Click or drag photo</div>
                                                  </div>
                                                )}
                                              </Card>
                                              <span className="m-auto"><Button variant="" className="btn-outline-dark mt-1" onClick={IntraUpload4}>Confirm</Button>{previewUrl23?<span id="intim4">Confirm to upload!</span>:""}</span>
                                              {progressI4 &&
                      <Spinner animation="border"/>
                      }
                                            </Col>
                                            <Col md={6}>
                                              <Card
                                                className="crd-up"
                                                onDragOver={handleOndragOver}
                                                onDrop={handleOndrop6624}
                                                onClick={() =>
                                                  fileInput24.current.click()
                                                }
                                              >
                                                {previewUrl24 || values.OcclussalLower ? (
                                                  <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
                                                    <img
                                                      src={previewUrl24 || values.OcclussalLower}
                                                      alt="Occlusal Lower"
                                                      className="img-s"
                                                      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "4px" }}
                                                    />
                                                    <span
                                                      className="position-absolute bottom-0 start-0 end-0 text-center text-white py-1 px-1"
                                                      style={{ background: "rgba(0,0,0,0.65)", fontSize: "11px", fontWeight: "600", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}
                                                    >
                                                      Occlusal Lower
                                                    </span>
                                                    <button
                                                      type="button"
                                                      title="Remove photo"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPreviewUrl24("");
                                                        setImage6624(null);
                                                        setstate6624(null);
                                                        setValues((prev) => ({ ...prev, OcclussalLower: "" }));
                                                        if (fileInput24.current) fileInput24.current.value = "";
                                                      }}
                                                      style={{
                                                        position: "absolute",
                                                        top: "4px",
                                                        right: "4px",
                                                        border: "none",
                                                        background: "rgba(220, 53, 69, 0.9)",
                                                        color: "#fff",
                                                        borderRadius: "50%",
                                                        width: "22px",
                                                        height: "22px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "14px",
                                                        lineHeight: "1",
                                                        cursor: "pointer",
                                                        zIndex: 10,
                                                      }}
                                                    >
                                                      ×
                                                    </button>
                                                  </div>
                                                ) : (
                                                  <div className="text-center text-muted p-2">
                                                    <FaUpload className="mb-1" style={{ fontSize: "1.2rem", color: "#C49358" }} />
                                                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#333" }}>Occlusal Lower</div>
                                                    <div style={{ fontSize: "10px", color: "#888" }}>Click or drag photo</div>
                                                  </div>
                                                )}
                                              </Card>
                                              <span className="m-auto"><Button variant="" className="btn-outline-dark mt-1" onClick={IntraUpload5}>Confirm</Button>{previewUrl24?<span id="intim5">Confirm to upload!</span>:""}</span>
                                              {progressI5 &&
                                                <Spinner animation="border"/>
                                              }
                                            </Col>
                                          </Row>
                                        </Card>
                                        <Card
                                          className="desc1 border-0"
                                          id="iPh2"
                                          style={{ display: "none" }}
                                        >
                                          <Row className="m-2">
                                            <Col md={6}>
                                              <Card className="crd-up"></Card>
                                            </Col>
                                            {/* <Col md={4}>
                                              <Card className="crd-up"></Card>
                                            </Col> */}
                                            <Col md={6}>
                                              <Card className="crd-up"></Card>
                                            </Col>
                                          </Row>
                                          <Row className="m-2 justify-content-center">
                                            {/* <Col md={4}>
                                              <Card className="crd-up"></Card>
                                            </Col> */}
                                            <Col md={6}>
                                              <Card className="crd-up"></Card>
                                            </Col>
                                            {/* <Col md={4}>
                                              <Card className="crd-up"></Card>
                                            </Col> */}
                                          </Row>
                                          <Row className="m-2">
                                            <Col md={6}>
                                              <Card className="crd-up"></Card>
                                            </Col>
                                            {/* <Col md={4}>
                                              <Card className="crd-up"></Card>
                                            </Col> */}
                                            <Col md={6}>
                                              <Card className="crd-up"></Card>
                                            </Col>
                                          </Row>
                                        </Card>
                                        <Row className="m-2 mt-1">
                                          <Col>
                                            <p className="m-0 pb-1">
                                              Add More Photos
                                            </p>
                                            <Form.Control
                                              type="file"
                                              multiple
                                              className=""
                                              id="uploadBox2"
                                              name="Name"
                                              onChange={(e) => {
                                                handleChangeTab6Add(
                                                  e.target.files
                                                );
                                              }}
                                            />
                                          </Col>
                                        </Row>
                                      </Card>
                                    </Col>
                                  </Row>
                                  <Row className="m-2">
                                    <Col>
                                      <Card className="p-3">
                                        <p className="up-rec">
                                          UPLOADED RECORDS
                                        </p>
                                      </Card>
                                    </Col>
                                  </Row>

                                  <hr />
                                  <Row className="text-end mt-1 mb-2">
                                    <Col className="me-4">
                                      <Button
                                        className="nextbtn"
                                        // onClick={handleUpload2}
                                        onClick={handleUpload2}
                                      >
                                        Next
                                      </Button>
                                    </Col>
                                  </Row>
                                </Tab>

                                <Tab eventKey={1} title="2. Radiographs">
                                  <Row className="m-2">
                                    <Col md={8}>
                                      <Card className="img-crd">
                                        <Row className="p-3">
                                          <Col>
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 1"
                                              id="rGraph1"
                                              name="graph"
                                              label="Upload Radiographs Now"
                                              value="1"
                                            />
                                          </Col>
                                          <Col>
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 2"
                                              id="rGraph2"
                                              name="graph"
                                              label="Upload Radiographs later"
                                              value="2"
                                            />
                                          </Col>
                                          <Col>
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 2"
                                              id="r3"
                                              name="graph"
                                              label="No Radiographs"
                                              value="3"
                                            />
                                          </Col>
                                        </Row>
                                        <hr className="m-2" />
                                        <Card
                                          className="img-crd-in m-2 desc"
                                          id="G1"
                                          // onDragOver={handleOndragOver}
                                          // onDrop={handleOndrop}
                                          // onClick={() => fileInputTab7.current.click()}
                                        >
                                          <Row className="m-3">
                                            <Col>
                                              <Card
                                                className="crd-up2"
                                                onDragOver={handleOndragOver}
                                                onDrop={handleOndrop71}
                                                onClick={() =>
                                                  fileInputTab71.current.click()
                                                }
                                              >
                                                {previewUrlTab71 || values.XrayLeft ? (
                                                   <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
                                                     <img
                                                       src={previewUrlTab71 || values.XrayLeft}
                                                       alt="Panoramic / OPG X-Ray"
                                                       className="img-s m-3"
                                                       style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "4px" }}
                                                     />
                                                     <span
                                                       className="position-absolute bottom-0 start-0 end-0 text-center text-white py-1 px-1"
                                                       style={{ background: "rgba(0,0,0,0.65)", fontSize: "12px", fontWeight: "600", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}
                                                     >
                                                       Panoramic / OPG X-Ray
                                                     </span>
                                                     <button
                                                       type="button"
                                                       title="Remove photo"
                                                       onClick={(e) => {
                                                         e.stopPropagation();
                                                         setPreviewUrlTab71("");
                                                         setImageTab71(null);
                                                         setRadio(null);
                                                         setValues((prev) => ({ ...prev, XrayLeft: "" }));
                                                         if (fileInputTab71.current) fileInputTab71.current.value = "";
                                                       }}
                                                       style={{
                                                         position: "absolute",
                                                         top: "6px",
                                                         right: "6px",
                                                         border: "none",
                                                         background: "rgba(220, 53, 69, 0.9)",
                                                         color: "#fff",
                                                         borderRadius: "50%",
                                                         width: "26px",
                                                         height: "26px",
                                                         display: "flex",
                                                         alignItems: "center",
                                                         justifyContent: "center",
                                                         fontSize: "16px",
                                                         lineHeight: "1",
                                                         cursor: "pointer",
                                                         zIndex: 10,
                                                       }}
                                                     >
                                                       ×
                                                     </button>
                                                   </div>
                                                 ) : (
                                                   <div className="text-center text-muted p-3">
                                                     <FaUpload className="mb-2" style={{ fontSize: "1.8rem", color: "#C49358" }} />
                                                     <div style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}>Panoramic / OPG X-Ray</div>
                                                     <div style={{ fontSize: "12px", color: "#888" }}>Click or drag radiograph here</div>
                                                   </div>
                                                 )}
                                              </Card>
                                              <span className="m-auto"><Button variant="" className="btn-outline-dark mt-1" onClick={RadioUpload1}>Confirm</Button>{previewUrlTab71?<span id="rim1">Confirm to upload!</span>:""}</span>

                                            </Col>
                                          </Row>
                                          <Row className="m-3">
                                            <Col md={6}>
                                              <Card
                                                className="crd-up2"
                                                onDragOver={handleOndragOver}
                                                onDrop={handleOndrop72}
                                                onClick={() =>
                                                  fileInputTab72.current.click()
                                                }
                                              >
                                                {previewUrlTab72 || values.XrayRight ? (
                                                   <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center">
                                                     <img
                                                       src={previewUrlTab72 || values.XrayRight}
                                                       alt="Cephalometric / Lateral Ceph"
                                                       className="img-s2 m-3"
                                                       style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "4px" }}
                                                     />
                                                     <span
                                                       className="position-absolute bottom-0 start-0 end-0 text-center text-white py-1 px-1"
                                                       style={{ background: "rgba(0,0,0,0.65)", fontSize: "12px", fontWeight: "600", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}
                                                     >
                                                       Cephalometric / Lateral Ceph
                                                     </span>
                                                     <button
                                                       type="button"
                                                       title="Remove photo"
                                                       onClick={(e) => {
                                                         e.stopPropagation();
                                                         setPreviewUrlTab72("");
                                                         setImageTab72(null);
                                                         setRadio1(null);
                                                         setValues((prev) => ({ ...prev, XrayRight: "" }));
                                                         if (fileInputTab72.current) fileInputTab72.current.value = "";
                                                       }}
                                                       style={{
                                                         position: "absolute",
                                                         top: "6px",
                                                         right: "6px",
                                                         border: "none",
                                                         background: "rgba(220, 53, 69, 0.9)",
                                                         color: "#fff",
                                                         borderRadius: "50%",
                                                         width: "26px",
                                                         height: "26px",
                                                         display: "flex",
                                                         alignItems: "center",
                                                         justifyContent: "center",
                                                         fontSize: "16px",
                                                         lineHeight: "1",
                                                         cursor: "pointer",
                                                         zIndex: 10,
                                                       }}
                                                     >
                                                       ×
                                                     </button>
                                                   </div>
                                                 ) : (
                                                   <div className="text-center text-muted p-3">
                                                     <FaUpload className="mb-2" style={{ fontSize: "1.8rem", color: "#C49358" }} />
                                                     <div style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}>Cephalometric / Lateral Ceph</div>
                                                     <div style={{ fontSize: "12px", color: "#888" }}>Click or drag radiograph here</div>
                                                   </div>
                                                 )}
                                              </Card>
                                              <span className="m-auto"><Button variant="" className="btn-outline-dark mt-1" onClick={RadioUpload2}>Confirm</Button>{previewUrlTab72?<span id="rim2">Confirm to upload!</span>:""}</span>

                                            </Col>
                                          </Row>

                                          <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputTab71}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>
                                              handleFileTab71(e.target.files[0])
                                            }
                                          />
                                          <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputTab72}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>
                                              handleFileTab72(e.target.files[0])
                                            }
                                          />
                                        </Card>
                                        <Card
                                          className="desc p-2"
                                          id="G2"
                                          style={{ display: "none" }}
                                        >
                                          <img
                                            src="https://www.portal.flexalign.in/user/img/bg-x-ray-dis-n.png"
                                            alt=""
                                          />
                                        </Card>
                                        <Card
                                          className="desc p-2"
                                          id="G3"
                                          style={{ display: "none" }}
                                        >
                                          <img
                                            src="https://www.portal.flexalign.in/user/img/bg-x-ray-dis-n.png"
                                            alt=""
                                          />
                                        </Card>
                                      </Card>
                                    </Col>
                                    <Col md={4}>
                                      <Card className="p-3">
                                        <p className="up-rec">
                                          UPLOADED RECORDS
                                        </p>
                                      </Card>
                                    </Col>
                                  </Row>
                                  {/* <Row>
                <Col>
                <Button variant=""
                 onClick={handleupload}>Submit</Button>
                </Col>
                </Row> */}
                                  <hr />
                                  <Row className="text-end mt-1 mb-2">
                                    <Col className="me-4">
                                      <Button
                                        variant="outline-dark"
                                        className="mx-3"
                                        onClick={() =>
                                          setCurrentTab((prev) => prev - 1)
                                        }
                                      >
                                        Back
                                      </Button>
                                      <Button
                                        className="nextbtn"
                                        onClick={() =>
                                          setCurrentTab((prev) => prev + 1)
                                        }
                                      >
                                        Next
                                      </Button>
                                    </Col>
                                  </Row>
                                </Tab>

                                <Tab eventKey={2} title="3. Videos">
                                  <Row className="m-2">
                                    <Col md={12}>
                                      <Card className="p-3">
                                        <p className="up-rec">
                                          UPLOAD VIDEO FILES
                                        </p>
                                        <Row>
                                          <Col>
                                            <Form.Group controlId="formFile" className="mb-3">
                                              <Form.Label className="pd-vid">Who is uploading videos? (Name of Dr.)</Form.Label>
                                              <Form.Control type="text" name="DoctorUploadingVideo" value={DoctorUploadingVideo} onChange={(e) => {
                                                setDoctorUploadingVideo(e.target.value)
                                              }} />
                                            </Form.Group>
                                          </Col>
                                          
                                        </Row>
                                        <Row>
                                           <Col>
                                             <Form.Group controlId="formFile" className="mb-3">
                                               <Form.Label className="pd-vid">Upload Videos</Form.Label>
                                               <Form.Control
                                                 type="file"
                                                 accept="video/*"
                                                 multiple
                                                 onChange={onChangeVideo}
                                                 name="Name"
                                               />
                                             </Form.Group>
                                             {videoProgress && (
                                               <div className="d-flex align-items-center gap-2 mb-2">
                                                 <Spinner animation="border" id="spin" size="sm" />
                                                 <span>Uploading video... {videoProgress}%</span>
                                               </div>
                                             )}
                                             <Button
                                               variant=""
                                               className="btn btn-outline-dark mb-3"
                                               onClick={uploadHandlerVideo}
                                             >
                                               Upload
                                             </Button>
                                             {values.PathVideo && (
                                               <div className="mt-3">
                                                 <p className="text-success fw-bold mb-2">Uploaded Video(s):</p>
                                                 <div className="d-flex flex-wrap gap-3">
                                                   {values.PathVideo.split(",").map((vUrl, idx) => (
                                                     <div key={idx} className="position-relative border p-1 rounded bg-light">
                                                       <video
                                                         width="240"
                                                         height="140"
                                                         controls
                                                         src={vUrl.trim()}
                                                         className="rounded"
                                                       />
                                                     </div>
                                                   ))}
                                                 </div>
                                               </div>
                                             )}
                                           </Col>
                                         </Row>
                                      </Card>
                                    </Col>
                                  </Row>
                                  <hr />
                                  <Row className="text-end mt-1 mb-2">
                                    <Col className="me-4">
                                      <Button
                                        variant="outline-dark"
                                        className="mx-3"
                                        onClick={() =>
                                          setCurrentTab((prev) => prev - 1)
                                        }
                                      >
                                        Back
                                      </Button>
                                      <Button
                                        className="nextbtn"
                                        onClick={() =>
                                          setCurrentTab((prev) => prev + 1)
                                        }
                                      >
                                        Next
                                      </Button>
                                    </Col>
                                  </Row>
                                </Tab>

                                <Tab eventKey={3} title="4. IPR">
                                  <Row className="m-2">
                                    <Col>
                                            <Form.Group controlId="formFile" className="mb-3">
                                              <Form.Label className="pd-vid">Does this patient requires IPR?</Form.Label>
                                              <Form.Select name="RequiredIPR" value={RequiredIPR} onChange={(e) => {
                                                setRequiredIPR(e.target.value)
                                              }}>
                                                <option value=""></option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                              </Form.Select>
                                            </Form.Group>
                                          </Col>
                                    <Col md={12}>
                                      <Card className="p-3">
                                        <p className="up-rec">
                                          UPLOAD IPR FILE
                                        </p>
                                        {RequiredIPR === "Yes" ? (
                                          <div>
                                            <Form.Group controlId="formFile" className="mb-3">
                                              <Form.Label className="pd-ipr">Upload IPR File</Form.Label>
                                              <Form.Control
                                                type="file"
                                                onChange={onChangeIpr}
                                                name="Name"
                                              />
                                            </Form.Group>{" "}
                                            <span>
                                              <Button onClick={() => navigate("/ipr")}>
                                                Generate IPR
                                              </Button>
                                            </span>
                                          </div>
                                        ) : null}
                                        <Button
                                          variant=""
                                          className="btn btn-outline-dark"
                                          onClick={uploadHandlerIpr}
                                        >
                                          Submit
                                        </Button>
                                      </Card>
                                    </Col>
                                  </Row>
                                  <hr />
                                  <Row className="text-end mt-1 mb-2">
                                    <Col className="me-4">
                                      <Button
                                        variant="outline-dark"
                                        className="mx-3"
                                        onClick={() =>
                                          setCurrentTab((prev) => prev - 1)
                                        }
                                      >
                                        Back
                                      </Button>
                                      <Button
                                        className="nextbtn"
                                        type="submit"
                                        id="submitCase"
                                      >
                                        Submit
                                      </Button>
                                    </Col>
                                  </Row>
                                </Tab>

                                {/* <Tab eventKey={7} title="8. Upload Video">
                                  <Row className="m-2">
                                    <Col md={12}>
                                      <Card className="p-3">
                                        <p className="up-rec">
                                          UPLOAD VIDEO FILE
                                        </p>
                                        <input
                                          type="file"
                                          multiple
                                          onChange={(e) => {
                                            handleChangeVid(e.target.files);
                                          }}
                                        ></input>
                                      </Card>
                                    </Col>
                                  </Row>
                                  <hr />
                                  <Row className="text-end mt-1 mb-2">
                                    <Col className="me-4">
                                      <Button
                                        variant="outline-dark"
                                        className="mx-3 success"
                                        onClick={() =>
                                          setCurrentTab((prev) => prev - 1)
                                        }
                                      >
                                        Back
                                      </Button>
                                      <Button
                                        className="success nextbtn"
                                        // onClick={}
                                      >
                                        Submit
                                      </Button>
                                    </Col>
                                  </Row>
                                </Tab> */}
                              </Tabs>
                            </Col>
                          </Row>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Form>
          </Container>
        </Col>
      </Row>
      </Container>
        </>
    );
}

export default AddTreatmentPage;