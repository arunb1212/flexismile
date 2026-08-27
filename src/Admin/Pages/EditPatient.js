import React,{useState,useEffect,useRef} from "react";
import user from "../../Assets/user.png";
import logo from "../../Assets/Logoremovebg.png";
import "../Styles/EditPatient.css";
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
    Spinner,
    Accordion
  } from "react-bootstrap";
import { useNavigate,useParams } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';
import $ from "jquery";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";


function EditPatient(){

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

  if (extra.checked) {
    fd.append("Name", state6.name);
    fd.append("fileContent", state6);
  }
  else{
    Swal.fire({
      title: "Select the Upload photos now button!",
      // text: 'Do you want to continue',
      icon: "warning"
      // confirmButtonText: 'Cool'
    })
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
    
    if(res.data.status==="1"){Swal.fire({
      title: `${state6.name} \nUploaded Successfully!`,
      // text: 'Do you want to continue',
      icon: "success"
      // confirmButtonText: 'Cool'
    })
  conf1.style.display="none"
  setProgressE1(null);
  }
  });


  

}


const IndividualUpload2=async ()=>{
  const fd=new FormData();

  if (extra.checked) {
    fd.append("Name", state62.name);
    fd.append("fileContent", state62);
  }
  else{
    Swal.fire({
      title: "Select the Upload photos now button!",
      // text: 'Do you want to continue',
      icon: "warning"
      // confirmButtonText: 'Cool'
    })
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
    if(res.data.status==="1"){Swal.fire({
      title: `${state62.name} \nUploaded Successfully!`,
      // text: 'Do you want to continue',
      icon: "success"
      // confirmButtonText: 'Cool'
    })
  conf2.style.display="none"
  setProgressE2(null);

  }
  });


  

}

const IndividualUpload3=async ()=>{
  const fd=new FormData();

  if (extra.checked) {
    fd.append("Name", state65.name);
    fd.append("fileContent", state65);
    console.log(state65);
  }
  else{
    Swal.fire({
      title: "Select the Upload photos now button!",
      // text: 'Do you want to continue',
      icon: "warning"
      // confirmButtonText: 'Cool'
    })
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

    if(res.data.status==="1"){Swal.fire({
      title: `${state65.name} \nUploaded Successfully!`,
      // text: 'Do you want to continue',
      icon: "success"
      // confirmButtonText: 'Cool'
    })
  conf3.style.display="none"
  setProgressE3(null);

  }
  });


  

}



      

     
const IndividualUpload4=async ()=>{
  const fd=new FormData();

  if (extra.checked) {
    fd.append("Name", state67.name);
    fd.append("fileContent", state67);
    console.log(state67);

  }
  else{
    Swal.fire({
      title: "Select the Upload photos now button!",
      // text: 'Do you want to continue',
      icon: "warning"
      // confirmButtonText: 'Cool'
    })
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

    if(res.data.status==="1"){Swal.fire({
      title: `${state67.name} \nUploaded Successfully!`,
      // text: 'Do you want to continue',
      icon: "success"
      // confirmButtonText: 'Cool'
    })
  conf4.style.display="none"
  setProgressE4(null);

  }
  });


}



// ---------------------------------------------------Intra Individual


  

  

  

  

const IntraUpload1=async ()=>{
  const fd=new FormData();

  if (intra.checked) {
    fd.append("Name", state662.name);
  fd.append("fileContent", state662);

  }
  else{
    Swal.fire({
      title: "Select the Upload photos now button!",
      // text: 'Do you want to continue',
      icon: "warning"
      // confirmButtonText: 'Cool'
    })
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

    if(res.data.status==="1"){Swal.fire({
      title: `${state662.name} \nUploaded Successfully!`,
      // text: 'Do you want to continue',
      icon: "success"
      // confirmButtonText: 'Cool'
    })
  confint1.style.display="none"
  setProgressI1(null);

  }
  });


}




const IntraUpload2=async ()=>{
  const fd=new FormData();

  if (intra.checked) {
    fd.append("Name", state6621.name);
    fd.append("fileContent", state6621);

  }
  else{
    Swal.fire({
      title: "Select the Upload photos now button!",
      // text: 'Do you want to continue',
      icon: "warning"
      // confirmButtonText: 'Cool'
    })
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

    if(res.data.status==="1"){Swal.fire({
      title: `${state6621.name} \nUploaded Successfully!`,
      // text: 'Do you want to continue',
      icon: "success"
      // confirmButtonText: 'Cool'
    })
  confint2.style.display="none"
  setProgressI2(null);

  }
  });


}



const IntraUpload3=async ()=>{
  const fd=new FormData();

  if (intra.checked) {
    fd.append("Name", state6622.name);
    fd.append("fileContent", state6622);

  }
  else{
    Swal.fire({
      title: "Select the Upload photos now button!",
      // text: 'Do you want to continue',
      icon: "warning"
      // confirmButtonText: 'Cool'
    })
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
          if(res.data.status==="1"){Swal.fire({
            title: `${state6622.name} \nUploaded Successfully!`,
            // text: 'Do you want to continue',
            icon: "success"
            // confirmButtonText: 'Cool'
          })
        confint3.style.display="none"
        setProgressI3(null);

        }
  });


}



const IntraUpload4=async ()=>{
  const fd=new FormData();

  if (intra.checked) {
    fd.append("Name", state6623.name);
    fd.append("fileContent", state6623);

  }
  else{
    Swal.fire({
      title: "Select the Upload photos now button!",
      // text: 'Do you want to continue',
      icon: "warning"
      // confirmButtonText: 'Cool'
    })
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

    if(res.data.status==="1"){Swal.fire({
      title: `${state6623.name} \nUploaded Successfully!`,
      // text: 'Do you want to continue',
      icon: "success"
      // confirmButtonText: 'Cool'
    })
  confint4.style.display="none"
setProgressI4(null);

  }
  });


}



const IntraUpload5=async ()=>{
  const fd=new FormData();

  if (intra.checked) {
    fd.append("Name", state6624.name);
    fd.append("fileContent", state6624);
    console.log(state6624);
  
  }
  else{
    Swal.fire({
      title: "Select the Upload photos now button!",
      // text: 'Do you want to continue',
      icon: "warning"
      // confirmButtonText: 'Cool'
    })
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

    if(res.data.status==="1"){Swal.fire({
      title: `${state6624.name} \nUploaded Successfully!`,
      // text: 'Do you want to continue',
      icon: "success"
      // confirmButtonText: 'Cool'
    })
  confint5.style.display="none"
  setProgressI5(null);

  }
  });


}




const RadioUpload1=async ()=>{
  const fd=new FormData();

  if (radGarph1.checked) {
    fd.append("Name", radio.name);
  fd.append("fileContent", radio);
  console.log(radio);
  
  }
  else{
    Swal.fire({
      title: "Select the Upload Radiographs now button!",
      // text: 'Do you want to continue',
      icon: "warning"
      // confirmButtonText: 'Cool'
    })
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

    if(res.data.status==="1"){Swal.fire({
      title: `${radio.name} \nUploaded Successfully!`,
      // text: 'Do you want to continue',
      icon: "success"
      // confirmButtonText: 'Cool'
    })
  confrim1.style.display="none"
  }
  });


}



const RadioUpload2=async ()=>{
  const fd=new FormData();

  if (radGarph1.checked) {
    
  fd.append("Name", radio1.name);
  fd.append("fileContent", radio1);
  console.log(radio1);
  
  }
  else{
    Swal.fire({
      title: "Select the Upload Radiographs now button!",
      // text: 'Do you want to continue',
      icon: "warning"
      // confirmButtonText: 'Cool'
    })
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

    if(res.data.status==="1"){Swal.fire({
      title: `${radio1.name} \nUploaded Successfully!`,
      // text: 'Do you want to continue',
      icon: "success"
      // confirmButtonText: 'Cool'
    })
  confrim2.style.display="none"
  }
  });


}








let DoctorName=sessionStorage.getItem("DocName");
let DoctorUserID=sessionStorage.getItem("DocUserId")
let Role=sessionStorage.getItem("Role")

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    // console.log(values.PortraitPath);

    const fd = new FormData();
    // if (radGarph1.checked) {
    //   fd.append("Name", radio.name);
    //   fd.append("fileContent", radio);
    //   console.log(radio);

    //   fd.append("Name", radio1.name);
    //   fd.append("fileContent", radio1);

    //   await axios
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
    //       var radioPath = arr.path;
    //       // sessionStorage.setItem("path",radioPath);
    //     });
    // }
    // console.log(vid);

    const url =
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddPatientRegistration";

   
    setValues((pre)=>{
      return{...pre,DoctorId:DoctorUserID}
    })
    setValues(pre=>{
      return{...pre,PatientId:patient[0]?.PatientId}
    })
// console.log(values.DoctorId);
    let n = {
      ...values,
      // DoctorId:values.DoctorId,
      ClinicalConditions: values.ClinicalConditions.toString(),
      DoNotMoveTheseTeeth: values.DoNotMoveTheseTeeth.toString(),
      AvidEngagersAttachmentsOnTheseTeeth: values.AvidEngagersAttachmentsOnTheseTeeth.toString(),
      IWillExtractTheseTeethBeforeTreatment:
        values.IWillExtractTheseTeethBeforeTreatment.toString(),
      LeaveTheseSpacesOpen: values.LeaveTheseSpacesOpen.toString(),
      ExtraOralMoreImages:values.ExtraOralMoreImages.toString(),
      // IntraOralMoreImages:values.IntraOralMoreImages.toString(),
      
    };

   
    console.log("n :", n);

    

    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(n),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result :", result.message);
        if(form.checkValidity() === false){
          alert("Please go back and fill required fields marked with "*"")
        }
        if (
          result.message === "Added Successful" &&
          form.checkValidity() === true
        ) {
          
          Swal.fire({
            title: "Updated Successfully!",
            // text: 'Do you want to continue',
            icon: "success",
            // confirmButtonText: 'Cool'
          });
          if(Role==="1"){
          navigate(`/patient-list/0`);
          }else{
            navigate(`/patient-list/${DoctorUserID}`)
          }
        }
      })
      .catch((err) => console.log(err));
    console.log(values);
    // sessionStorage.removeItem("path");
    // console.log(pPath);

    // setCurrentTab((prev) => prev + 1);
  };

  

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

  fetch(urlToData)
    .then((res) => res.json())
    .then((details) => {
      console.log(details.Data);
      // console.log(details.Data[0]?.DoctorID);
      setPatient(details.Data);
      let bDate=details.Data[0]?.DateofBirth.split(" ")[0];
      console.log(bDate.split("/")[2]);
      // let arryr=bDate.split("/")[2]
      // let arr=[bDate.split('/')[0],bDate.split('/')[1],arryr].join('/')
      // console.log(arr);

      // console.log(details.Data[0]?.ClinicalConditions.split(',').includes("Crowding")?"true":"false");
      let cliCon=details.Data[0]?.ClinicalConditions.split(',')
      console.log("clinical con");
      console.log(cliCon);
      // console.log(patient);
      let doNot=details.Data[0]?.DoNotMoveTheseTeeth.split(',')
      // console.log(doNot);
      let extLater=details.Data[0]?.IWillExtractTheseTeethBeforeTreatment.split(',')
      // console.log(extLater);
      let leaveSpace=details.Data[0]?.LeaveTheseSpacesOpen.split(',')
      // console.log(leaveSpace);
      let engager=details.Data[0]?.AvidEngagersAttachmentsOnTheseTeeth.split(',')
      console.log(engager);
      setValues(pre=>{
        return{...pre,PatientId:ID,
          DoctorId:details.Data[0]?.DoctorID,
        FirstName:details.Data[0]?.Name.split(' ')[0],
        LastName:details.Data[0]?.Name.split(' ')[1],
        Mi:details.Data[0]?.Mi,
        Gender:details.Data[0]?.Gender,
        DateofBirth:details.Data[0]?.DateofBirth,
        DoctorName:details.Data[0]?.DoctorName,
        ClinicAddress:details.Data[0]?.ClinicAddress,
        CaseNo:details.Data[0]?.CaseNo,
        ClinicalConditions:cliCon,
        GeneralNotes:details.Data[0]?.GeneralNotes,
        ChiefComplaint:details.Data[0]?.ChiefComplaint,
        Quotation:details.Data[0]?.Quotation,
        ExpectedNoOfAligners:details.Data[0]?.ExpectedNoOfAligners,
        ProductType:details.Data[0]?.ProductType,
        AmountPaid:details.Data[0]?.AmountPaid,
        PrescriptionDate:details.Data[0]?.PrescriptionDate,
        // UpperMidline:details.Data[0]?.
        // LowerMidline:
        CanineRelationshipLeftClass:details.Data[0]?.CanineRelationshipLeftClass,
        CanineRelationshipRightClass:details.Data[0]?.CanineRelationshipRightClass,
        MolarRelationshipLeftClass:details.Data[0]?.MolarRelationshipLeftClass,
        MolarRelationshipRightClass:details.Data[0]?.MolarRelationshipRightClass,
        Endon:details.Data[0]?.Endon,
        Overbite:details.Data[0]?.Overbite,
        Overjet:details.Data[0]?.Overjet,
        InstructionUpperMidline:details.Data[0]?.InstructionUpperMidline,
        InstructionLowerMidline:details.Data[0]?.InstructionLowerMidline,
        InstructionOverjet:details.Data[0]?.InstructionOverjet,
        InstructionOverbite:details.Data[0]?.InstructionOverbite,
        InstructionArchForm:details.Data[0]?.InstructionArchForm,
        InstructionCanineRelationship:details.Data[0]?.InstructionCanineRelationship,
        InstructionMolarRelationship:details.Data[0]?.InstructionMolarRelationship,
        InstructionPosteriorCrossbite:details.Data[0]?.InstructionPosteriorCrossbite,
        InstructionIPR:details.Data[0]?.InstructionIPR,
        InstructionEngagersAttachments:details.Data[0]?.InstructionEngagersAttachments,
        InstructionProcline:details.Data[0]?.InstructionProcline,
        InstructionExpand:details.Data[0]?.InstructionExpand,
        InstructionDistalize:details.Data[0]?.InstructionDistalize,
        DoNotMoveTheseTeeth:doNot,
        AvidEngagersAttachmentsOnTheseTeeth:engager,
        IWillExtractTheseTeethBeforeTreatment:extLater,
        LeaveTheseSpacesOpen:leaveSpace,
        AdditionalInstruction:details.Data[0]?.AdditionalInstruction,
        PortraitPath:details.Data[0]?.PortraitPath,
        PathOfDoc:details.Data[0]?.PathOfDoc,
        FrontalRepose:details.Data[0]?.FrontalRepose,
        FrontalSmiling:details.Data[0]?.FrontalSmiling,
        ProfileRepose:details.Data[0]?.ProfileRepose,
        FrontOpImage:details.Data[0]?.FrontOpImage,
        OcclussalUpper:details.Data[0]?.OcclussalUpper,
        OcclussalLower:details.Data[0]?.OcclussalLower,
        BuccalFront:details.Data[0]?.BuccalFront,
        // BuccalLeft:details.data[0]?.BuccalLeft,
        BuccalRight:details.Data[0]?.BuccalRight,
        // ExtraOralMoreImages:
        // IntraOralMoreImages:
        XrayLeft:details.Data[0]?.XrayLeft,
        XrayRight:details.Data[0]?.XrayRight
        }
      })
      console.log("Date "+values.DateofBirth);
      // console.log(values.PatientId);
    });
}, []);



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
                            <Col
                              sm={{ span: 12 }}
                              style={{ border: "solid 0.1em lightgray" }}
                            >
                              <Tabs
                                activeKey={currentTab}
                                justify
                                className="mt-3"
                              >
                                <Tab eventKey={0} title="1. Patient Data">
                                  <Row className="pt-4 pb-3">
                                    <Col md={{ span: 6 }}>
                                      <Form.Group controlId="validationFirstname">
                                      <span style={{color:"red",float:"right"}} className="m-0 p-0">*</span>

                                        <InputGroup hasValidation>
                                          <InputGroup.Text id="inputGroupPrepend">
                                            <TbUser fontSize={28}></TbUser>
                                          </InputGroup.Text>
                                          <Form.Control
                                            type="text"
                                            // className="fna"
                                            placeholder="First Name *"
                                            // defaultValue={patient[0]?.Name.split(' ')[0]}
                                           value={values.FirstName}
                                            name="FirstName"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            required
                                          />
                                          <Form.Control.Feedback type="invalid">
                                            Please Enter a First Name.
                                          </Form.Control.Feedback>
                                        </InputGroup>
                                      </Form.Group>
                                      <Form.Group
                                        controlId="validationLastname"
                                        className="mt-3"
                                      >
                                          <span style={{color:"red",float:"right"}} className="m-0 p-0">*</span>

                                        <InputGroup hasValidation>
                                          <InputGroup.Text id="inputGroupPrepend">
                                            <TbUser fontSize={28}></TbUser>
                                          </InputGroup.Text>
                                          <Form.Control
                                            type="text"
                                            placeholder="Last Name *"
                                            name="LastName"
                                            // defaultValue={patient[0]?.Name.split(' ')[1]}
                                            value={values.LastName}
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            required
                                          />
                                          <Form.Control.Feedback type="invalid">
                                            Please Enter a Last Name.
                                          </Form.Control.Feedback>
                                        </InputGroup>
                                      </Form.Group>
                                      <Form.Group
                                        controlId="validationMI"
                                        className="mt-4"
                                      >
                                        <InputGroup hasValidation>
                                          <InputGroup.Text id="inputGroupPrepend">
                                            <TbUser fontSize={28}></TbUser>
                                          </InputGroup.Text>
                                          <Form.Control
                                            type="tel"
                                            placeholder="Mobile No."
                                            value={values.Mi}
                                            name="Mi"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                          />
                                        </InputGroup>
                                      </Form.Group>
                                      <Form.Group className="mt-3">
                                        Gender 
                                        <span style={{color:"red"}} className="mx-2 p-0">*</span>

                                        <br></br>
                                        <Form.Check
                                          type="radio"
                                          aria-label="radio 1"
                                          label="Male"
                                          
                                          // defaultChecked={`${values.Gender==="Male"?true:false}`}
                                          value="Male"
                                          checked={`${values.Gender==="Male"?"checked":""}`}
                                          className="pt-2"
                                          onChange={handleChange}
                                          name="Gender"
                                          inline
                                          feedbackType="invalid"
                                          required
                                        />
                                        <Form.Check
                                          type="radio"
                                          aria-label="radio 1"
                                          // defaultChecked={values.Gender}
                                          // defaultChecked={`${values.Gender==="Female"?true:""}`}
                                          checked={`${values.Gender==="Female"?"checked":""}`}

                                          label="Female"
                                          value="Female"
                                        //   checked={`${patient[0]?.Gender==="Female"?true:false}`}

                                          name="Gender"
                                          onChange={handleChange}
                                          inline
                                          feedbackType="invalid"
                                          required
                                        />
                                      </Form.Group>
                                      <Form.Group
                                        controlId="validationDate"
                                        className="mt-3"
                                      >
                                          <span style={{color:"red",float:"right"}} className="m-0 p-0">*</span>

                                        <InputGroup hasValidation>
                                          <InputGroup.Text id="inputGroupPrepend">
                                            <FaCalendarAlt
                                              fontSize={28}
                                            ></FaCalendarAlt>
                                          </InputGroup.Text>
                                          <Form.Control
                                            // type={`${values.DateofBirth?"text":"date"}`}
                                            type="date"
                                            placeholder=" "
                                            name="DateofBirth"
                                            // defaultValue={patient[0]?.DateofBirth}
                                            value={moment((values?.DateofBirth))?.format("YYYY-MM-DD")}
                                            // value={`${formatDate(new Date(values.DateofBirth.split(' ')[0]))}`}
                                            // pattern="\d{1,2}-\d{1,2}-\d{4}"
                                            // defaultValue={values.DateofBirth.split(' ')[0]}
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            required
                                          />
                                        </InputGroup>
                                        <Form.Control.Feedback type="invalid">
                                          Please Enter a Date.
                                        </Form.Control.Feedback>
                                      </Form.Group>
                                      <Form.Group
                                        controlId="validationDoctorsname"
                                        className="mt-3"
                                      >
                                        <InputGroup hasValidation>
                                          <InputGroup.Text id="inputGroupPrepend">
                                            <TbUser fontSize={28}></TbUser>
                                          </InputGroup.Text>
                                          <Form.Control
                                            type="text"
                                            placeholder="Doctor's Name"
                                            name="DoctorName"
                                            // defaultValue={patient[0]?.DoctorName}
                                            value={values.DoctorName}
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                          />
                                        </InputGroup>
                                      </Form.Group>
                                      <Form.Group
                                        controlId="validationClinicAddress"
                                        className="mt-3"
                                      >
                                        <InputGroup hasValidation>
                                          <InputGroup.Text
                                            id="basic-addon1"
                                            style={{ height: "4em" }}
                                          >
                                            <TbUser fontSize={28}></TbUser>
                                          </InputGroup.Text>
                                          <Form.Control
                                            as="textarea"
                                            rows={2}
                                            placeholder="ClinicAddress"
                                            name="ClinicAddress"
                                            // defaultValue={patient[0]?.ClinicAddress}
                                            value={values.ClinicAddress}
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                          />
                                        </InputGroup>
                                      </Form.Group>
                                      <Form.Group
                                        controlId="validationCaseNo"
                                        className="mt-3"
                                      >
                                          <span style={{color:"red",float:"right"}} className="m-0 p-0">*</span>

                                        <InputGroup hasValidation>
                                          <InputGroup.Text id="inputGroupPrepend">
                                            <TbUser fontSize={28}></TbUser>
                                          </InputGroup.Text>
                                          <Form.Control
                                            type="text"
                                            placeholder="Case paper No."
                                            name="CaseNo"
                                            // defaultValue={patient[0]?.CaseNo}
                                            value={values.CaseNo}
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                          />
                                          <Form.Control.Feedback type="invalid">
                                          Please Enter case paper No.
                                        </Form.Control.Feedback>
                                        </InputGroup>
                                      </Form.Group>
                                    </Col>
                                    {/* <Col md={{ span: 6 }}>
                                      <Form.Group>
                                        Ship to Office
                                        <Form.Check
                                          type="radio"
                                          // defaultChecked={val}
                                          value="2004,
                                          B-103 RADHA GOVIND RADHA RESIDENCY
                                           SIDDHARTH NAGAR BORIVALI EAST,
                                          MUMBAI 400066"
                                          label="2004,
                                            B-103 RADHA GOVIND RADHA RESIDENCY
                                            SIDDHARTH NAGAR BORIVALI EAST,
                                            MUMBAI 400066"
                                          className="pt-2"
                                          onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                      </Form.Group>
                                      <br></br>
                                      Bill to Office
                                      <Form.Check
                                        type="radio"
                                        aria-label="radio 1"
                                        label="2004, B-103 RADHA GOVIND RADHA RESIDENCY
                                         SIDDHARTH NAGAR BORIVALI EAST, MUMBAI 400066"
                                        className="pt-2"
                                        defaultChecked
                                      />
                                      <br></br>
                                      Payer?
                                      <Form.Check
                                        type="radio"
                                        aria-label="radio 1"
                                        label="2004, B-103 RADHA GOVIND RADHA RESIDENCY
                 SIDDHARTH NAGAR BORIVALI EAST, MUMBAI 400066"
                                        className="pt-2"
                                        disabled
                                      />
                                    </Col> */}

<Col md={{ span: 6 }}>
                                      <Form.Group>
                                        
                                        {/* <Form.Check
                                          type="radio"
                                          value="2004,
                                          B-103 RADHA GOVIND RADHA RESIDENCY
                                           SIDDHARTH NAGAR BORIVALI EAST,
                                          MUMBAI 400066"
                                          label="2004,
                                            B-103 RADHA GOVIND RADHA RESIDENCY
                                            SIDDHARTH NAGAR BORIVALI EAST,
                                            MUMBAI 400066"
                                          className="pt-2"
                                          onChange={handleChange}
                                        /> */}
                                         <Form.Label>Ship to Office</Form.Label>
        <Form.Control as="textarea" row={4} placeholder="Enter Address" name="ShipToOffice" onChange={handleChange}/>
                                        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                      </Form.Group>
                                      <br></br>
                                     
                                      {/* <Form.Check
                                        type="radio"
                                        aria-label="radio 1"
                                        label="2004, B-103 RADHA GOVIND RADHA RESIDENCY
                                         SIDDHARTH NAGAR BORIVALI EAST, MUMBAI 400066"
                                        className="pt-2"
                                        defaultChecked
                                      /> */}
                                      <Form.Group>

                                      <Form.Label>Bill to Office</Form.Label>
        <Form.Control as="textarea" row={4} placeholder="Enter Address" name="BillToOffice" onChange={handleChange}/>
                                        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                      </Form.Group>
                                      <br></br>
                                      Payer?
                                      {/* <Form.Check
                                        type="radio"
                                        aria-label="radio 1"
                                        label="2004, B-103 RADHA GOVIND RADHA RESIDENCY
                 SIDDHARTH NAGAR BORIVALI EAST, MUMBAI 400066"
                                        className="pt-2"
                                        disabled
                                      /> */}
                                       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        {/* <Form.Label>Email address</Form.Label> */}
        <Form.Control as="textarea" row={4} placeholder="" disabled/>
      </Form.Group>
                                    </Col>
                                  </Row>
                                  {/* <Button type="submit"
                 onClick={handleSubmit}>Submit</Button> */}
                                  <hr />
                                  <Row className="text-end mt-1 mb-2">
                                    <Col className="me-4">
                                      {/* <Button
                                        className="success"
                                        onClick={() =>
                                          setCurrentTab((prev) => prev - 1)
                                        }
                                      >
                                        Prev
                                      </Button> */}
                                      <Button
                                        className="success nextbtn"
                                        onClick={submitTab1}
                                      >
                                        Next
                                      </Button>
                                    </Col>
                                  </Row>
                                </Tab>
                                <Tab
                                  eventKey={1}
                                  title="2. ClinicalMalocclusion"
                                >
                                  <Row>
                                    <Col md={6}>
                                      <p>Clinical Conditions</p>
                                      <Row>
                                        <Col md={6}>
                                          <Form.Check
                                            type="checkbox"
                                            label="Crowding"
                                            value="Crowding"
                                            name="ClinicalConditions"
                                            checked={`${values.ClinicalConditions.includes("Crowding")?"checked":""}`}
                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Spacing"
                                            value="Spacing"
                                            name="ClinicalConditions"
                                            checked={`${values.ClinicalConditions.includes("Spacing")?"checked":""}`}

                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Class II div 1"
                                            value="Class II div 1"
                                            name="ClinicalConditions"
                                            checked={`${values.ClinicalConditions.includes("Class II div 1")?"checked":""}`}

                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Class II div 2"
                                            value="Class II div 2"
                                            name="ClinicalConditions"
                                            checked={`${values.ClinicalConditions.includes("Class II div 2")?"checked":""}`}

                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="CClass III"
                                            value="CClass III"
                                            name="ClinicalConditions"
                                            checked={`${values.ClinicalConditions.includes("CClass III")?"checked":""}`}

                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Open bite"
                                            value="Open bite"
                                            name="ClinicalConditions"
                                            checked={`${values.ClinicalConditions.includes("Open bite")?"checked":""}`}

                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Anterior crossbite"
                                            value="Anterior crossbite"
                                            name="ClinicalConditions"
                                            checked={`${values.ClinicalConditions.includes("Anterior crossbite")?"checked":""}`}

                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Posterior crossbite"
                                            value="Posterior crossbite"
                                            name="ClinicalConditions"
                                            checked={`${values.ClinicalConditions.includes("Posterior crossbite")?"checked":""}`}

                                            onChange={handlecheck}
                                          />
                                        </Col>
                                        <Col md={6}>
                                          <Form.Check
                                            type="checkbox"
                                            label="Deep Bite"
                                            value="Deep Bite"
                                            name="ClinicalConditions"
                                            checked={`${values.ClinicalConditions.includes("Deep Bite")?"checked":""}`}

                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Narrow Arch"
                                            value="Narrow Arch"
                                            name="ClinicalConditions"
                                            checked={`${values.ClinicalConditions.includes("Narrow Arch")?"checked":""}`}

                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Flared Teeth"
                                            value="Flared Teeth"
                                            name="ClinicalConditions"
                                            checked={`${values.ClinicalConditions.includes("Flared Teeth")?"checked":""}`}

                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Overjet"
                                            value="Overjet"
                                            name="ClinicalConditions"
                                            checked={`${values.ClinicalConditions.includes("Overjet")?"checked":""}`}

                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Uneven smile"
                                            value="Uneven smile"
                                            name="ClinicalConditions"
                                            checked={`${values.ClinicalConditions.includes("Uneven smile")?"checked":""}`}

                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Misshapen teeth"
                                            value="Misshapen teeth"
                                            name="ClinicalConditions"
                                            checked={`${values.ClinicalConditions.includes("Misshapen teeth")?"checked":""}`}

                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Other"
                                            value="Other"
                                            name="ClinicalConditions"
                                            checked={`${values.ClinicalConditions.includes("Other")?"checked":""}`}

                                            onChange={handlecheck}
                                          />
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col md={6}>
                                      <p>General Notes</p>
                                      <Row>
                                        <Col>
                                          <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                          >
                                            {/* <Form.Label>Example
                 textarea</Form.Label> */}
                                            <Form.Control
                                              as="textarea"
                                              rows={7}
                                              name="GeneralNotes"
                                              defaultValue={patient[0]?.GeneralNotes}
                                              onChange={handleChange}
                                            />
                                            <Form.Text className="text-muted">
                                              *Clinical Conditions and General
                                              Notes are for your reference and
                                              statistical purposes only and will
                                              NOT be considered as treatment
                                              planning instructions.
                                            </Form.Text>
                                          </Form.Group>
                                        </Col>
                                      </Row>
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
                                        onClick={() =>{
                                          setValues(pre=>{
                                            return{...pre,PatientId:patient[0]?.PatientId}
                                          })
                                          console.log(values); 
                                          setCurrentTab((prev) => prev + 1)
                                        }}
                                      >
                                        Next
                                      </Button>
                                    </Col>
                                  </Row>
                                </Tab>
                                <Tab eventKey={2} title="3. Prescription Form">
                                  <Row className="pt-4 pb-3">
                                    <Col md={{ span: 6 }}>
                                      <p>Chief Complaint</p>
                                      <Form.Group
                                        controlId="validationChiefComplaint"
                                        className="mt-3"
                                      >
                                        <InputGroup hasValidation>
                                          <Form.Control
                                            as="textarea"
                                            rows={6}
                                            name="ChiefComplaint"
                                            // defaultValue={patient[0]?.ChiefComplaint}
                                            value={values.ChiefComplaint}
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                          />
                                        </InputGroup>
                                      </Form.Group>
                                      <Form.Group
                                        controlId="validationQuotation"
                                        className="mt-3"
                                      >
                                        <Form.Label>
                                          Quotation 
                                          <span style={{color:"red"}} className="mx-2 p-0">*</span>
                                          
                                           (Only Numbers Eg:20000)
                                        </Form.Label>
                                        <InputGroup hasValidation>
                                          <Form.Control
                                            type="text"
                                            name="Quotation"
                                            // defaultValue={patient[0]?.Quotation}
                                            value={values.Quotation}
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            required
                                          />
                                          <Form.Control.Feedback type="invalid">
                                            Please Enter a Quotation.
                                          </Form.Control.Feedback>
                                        </InputGroup>
                                      </Form.Group>

                                      <Row>
                                        <Col>
                                          <Form.Group
                                            controlId="validationNoOfAligners"
                                            className="mt-3"
                                          >
                                            <Form.Label>
                                              Expected No. of Aligners 
                                              <span style={{color:"red"}} className="mx-2 p-0">*</span>

                                            </Form.Label>
                                            <InputGroup>
                                              <Form.Control
                                                type="text"
                                                name="ExpectedNoOfAligners"
                                                // defaultValue={patient[0]?.ExpectedNoOfAligners}
                                                value={values.ExpectedNoOfAligners}
                                                onChange={handleChange}
                                                aria-describedby="inputGroupPrepend"
                                                required
                                              />
                                              {/* <Form.Control.Feedback type="invalid">
                                                          Please Enter a Quotation.
                                                          </Form.Control.Feedback> */}
                                            </InputGroup>
                                          </Form.Group>
                                        </Col>
                                        <Col>
                                          <Form.Group
                                            controlId="validationProductType"
                                            className="mt-3"
                                          >
                                            <Form.Label>
                                              Product Type 
                                              <span style={{color:"red"}} className="mx-2 p-0">*</span>

                                            </Form.Label>
                                            <InputGroup hasValidation>
                                              <Form.Select
                                                aria-label="Default select example"
                                                name="ProductType"
                                                // defaultValue={patient[0]?.ProductType}
                                                value={values.ProductType}
                                                onChange={handleChange}
                                              >
                                                <option>
                                                  Select Product type
                                                </option>
                                                <option value="1">Classic</option>
                                                <option value="2">Premium</option>
                                              </Form.Select>
                                            </InputGroup>
                                            <Form.Control.Feedback type="invalid">
                                              Please Select Product type.
                                            </Form.Control.Feedback>
                                          </Form.Group>
                                        </Col>
                                      </Row>

                                      <Row>
                                        <Col>
                                          <Form.Group
                                            controlId="validationNoOfAligners"
                                            className="mt-3"
                                          >
                                            <Form.Label>Amount Paid</Form.Label>
                                            <InputGroup hasValidation>
                                              <Form.Control
                                                type="number"
                                                name="AmountPaid"
                                                // defaultValue={patient[0]?.AmountPaid}
                                                value={values.AmountPaid}
                                                onChange={handleChange}
                                                aria-describedby="inputGroupPrepend"
                                              />
                                              {/* <Form.Control.Feedback type="invalid">
                                                          Please Enter a Quotation.
                                                          </Form.Control.Feedback> */}
                                            </InputGroup>
                                          </Form.Group>
                                        </Col>
                                        <Col>
                                          <Form.Group
                                            controlId="validationNoOfAligners"
                                            className="mt-3"
                                          >
                                            <Form.Label>Date</Form.Label>
                                            <InputGroup hasValidation>
                                              <Form.Control
                                                type="date"
                                                name="PrescriptionDate"
                                                // defaultValue={patient[0]?.PrescriptionDate}
                                                value={values.PrescriptionDate}
                                                onChange={handleChange}
                                                aria-describedby="inputGroupPrepend"
                                              />
                                              {/* <Form.Control.Feedback type="invalid">
                                                          Please Enter a Quotation.
                                                          </Form.Control.Feedback> */}
                                            </InputGroup>
                                          </Form.Group>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col md={{ span: 6 }}>
                                      <Row>
                                        <Col md={{ span: 6 }}>
                                          <p>Upper Midline</p>
                                          <Form.Group>
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 1"
                                              label="Centered"
                                              id="um1"
                                              name="UpperMidline"
                                              value="Centered"
                                            checked={`${values.UpperMidline==="Centered"?"checked":""}`}

                                              onChange={handleRadio3}
                                            />
                                          </Form.Group>
                                          <Form.Group controlId="validationRight">
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 1"
                                              label="Shifted Right"
                                              value="Shifted Right"
                                              id="um2"
                                              name="UpperMidline"
                                            checked={`${values.UpperMidline==="Shifted Right"?"checked":""}`}

                                              onChange={handleRadio3}
                                            />
                                            <InputGroup hasValidation>
                                              <Form.Control
                                                type="number"
                                                aria-describedby="inputGroupPrepend"
                                              />
                                              &nbsp; MM
                                            </InputGroup>
                                          </Form.Group>
                                          <Form.Group controlId="validationRight">
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 1"
                                              label="Shifted Left"
                                              id="um3"
                                              value="Shifted Left"
                                              name="UpperMidline"
                                            checked={`${values.UpperMidline==="Shifted Left"?"checked":""}`}

                                              onChange={handleRadio3}
                                            />
                                            <InputGroup hasValidation>
                                              <Form.Control
                                                type="number"
                                                aria-describedby="inputGroupPrepend"
                                              />
                                              &nbsp; MM
                                            </InputGroup>
                                          </Form.Group>
                                          <p className="mt-4">Lower Midline</p>
                                          <Form.Group>
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 1"
                                              label="Centered"
                                              value="Centered"
                                              name="LowerMidline"
                                            checked={`${values.LowerMidline==="Centered"?"checked":""}`}

                                              onChange={handleRadio31}
                                            />
                                          </Form.Group>
                                          <Form.Group controlId="validationRight">
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 1"
                                              label="Shifted Right"
                                              value="Shifted Right"
                                              name="LowerMidline"
                                            checked={`${values.LowerMidline==="Shifted Right"?"checked":""}`}
                                              
                                              onChange={handleRadio31}
                                            />
                                            <InputGroup hasValidation>
                                              <Form.Control
                                                type="number"
                                                aria-describedby="inputGroupPrepend"
                                              />
                                              &nbsp; MM
                                            </InputGroup>
                                          </Form.Group>
                                          <Form.Group controlId="validationRight">
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 1"
                                              label="Shifted Left"
                                              value="Shifted Left"
                                              name="LowerMidline"
                                            checked={`${values.LowerMidline==="Shifted Left"?"checked":""}`}

                                              onChange={handleRadio31}
                                            />
                                            <InputGroup hasValidation>
                                              <Form.Control
                                                type="number"
                                                aria-describedby="inputGroupPrepend"
                                              />
                                              &nbsp; MM
                                            </InputGroup>
                                          </Form.Group>
                                        </Col>
                                        <Col md={{ span: 6 }}>
                                          <p>Canine Relationship</p>
                                          <Form.Group
                                            as={Row}
                                            controlId="validationCanine"
                                          >
                                            <Form.Label column sm="4">
                                              Right Class
                                            </Form.Label>
                                            <Col sm="5">
                                              <Form.Control
                                                type="number"
                                                name="CanineRelationshipRightClass"
                                                value={values.CanineRelationshipRightClass}
                                                onChange={handleChange}
                                              />
                                            </Col>
                                          </Form.Group>
                                          <Form.Group
                                            as={Row}
                                            controlId="validationCanine"
                                            className="mt-2 mb-4"
                                          >
                                            <Form.Label column sm="4">
                                              Left Class
                                            </Form.Label>
                                            <Col sm="5">
                                              <Form.Control
                                                type="number"
                                                name="CanineRelationshipLeftClass"
                                                value={values.CanineRelationshipLeftClass}
                                                onChange={handleChange}
                                              />
                                            </Col>
                                          </Form.Group>
                                          <p>Molar Relationship</p>
                                          <Form.Group
                                            as={Row}
                                            controlId="validationCanine"
                                          >
                                            <Form.Label column sm="4">
                                              Right Class
                                            </Form.Label>
                                            <Col sm="5">
                                              <Form.Control
                                                type="number"
                                                name="MolarRelationshipRightClass"
                                                value={values.MolarRelationshipRightClass}
                                                onChange={handleChange}
                                              />
                                            </Col>
                                          </Form.Group>
                                          <Form.Group
                                            as={Row}
                                            controlId="validationCanine"
                                            className="mt-2 mb-4"
                                          >
                                            <Form.Label column sm="4">
                                              Left Class
                                            </Form.Label>
                                            <Col sm="5">
                                              <Form.Control
                                                type="number"
                                                name="MolarRelationshipLeftClass"
                                                value={values.MolarRelationshipLeftClass}
                                                onChange={handleChange}
                                              />
                                            </Col>
                                          </Form.Group>
                                          <Form.Group
                                            as={Row}
                                            controlId="validationCanine"
                                            className="mt-2"
                                          >
                                            <Form.Label column sm="4">
                                              Endon
                                            </Form.Label>
                                            <Col sm="5">
                                              <Form.Select
                                                size="sm"
                                                name="Endon"
                                                value={values.Endon}
                                                onChange={handleChange}
                                              >
                                                <option selected>{values.Endon}</option>
                                                <option>Right</option>
                                                <option>Left</option>
                                                <option>Both</option>
                                              </Form.Select>
                                            </Col>
                                          </Form.Group>
                                          <Form.Group
                                            as={Row}
                                            controlId="validationCanine"
                                            className="mt-2"
                                          >
                                            <Form.Label
                                              column
                                              sm="4"
                                              name="Overbite"
                                              onChange={handleChange}
                                            >
                                              Overbite
                                            </Form.Label>
                                            <Col sm="5">
                                              <Form.Select size="sm" value={values.Overbite}>
                                                <option selected>{values.Overbite}</option>
                                                <option>25%</option>
                                                <option>50%</option>
                                                <option>75%</option>
                                                <option>100%</option>
                                              </Form.Select>
                                            </Col>
                                          </Form.Group>
                                          <Form.Group
                                            as={Row}
                                            controlId="validationCanine"
                                            className="mt-2 mb-4"
                                          >
                                            <Form.Label column sm="4">
                                              Overjet
                                            </Form.Label>
                                            <Col sm="5 p-0">
                                              <Form.Control
                                                type="number"
                                                name="Overjet"
                                                value={values.Overjet}
                                                onChange={handleChange}
                                              />
                                            </Col>
                                            <Col sm="1 px-2">MM</Col>
                                          </Form.Group>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                  <hr className="hrline" />
                                  <Row>
                                    <Col md={{ span: 5 }}>
                                      <h3>Instruction</h3>
                                      <Form.Group as={Row}>
                                        <Form.Label column sm="4">
                                          Upper Midline:
                                        </Form.Label>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Maintain"
                                            value="Maintain"
                                            // defaultChecked={values.InstructionUpperMidline}
                                            checked={`${values.InstructionUpperMidline==="Maintain"?"checked":""}`}
                                            name="InstructionUpperMidline"
                                            onChange={
                                              handleInstructionUpperMidline
                                            }
                                          />
                                        </Col>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Improve"
                                            value="Improve"
                                            name="InstructionUpperMidline"
                                            // defaultChecked={values.InstructionUpperMidline}
                                            checked={`${values.InstructionUpperMidline==="Improve"?"checked":""}`}

                                            onChange={
                                              handleInstructionUpperMidline
                                            }
                                          />
                                        </Col>
                                        <Col sm="2" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Idealize"
                                            value="Idealize"
                                            name="InstructionUpperMidline"
                                            // defaultChecked={values.InstructionUpperMidline}
                                            checked={`${values.InstructionUpperMidline==="Idealize"?"checked":""}`}

                                            onChange={
                                              handleInstructionUpperMidline
                                            }
                                          />
                                        </Col>
                                      </Form.Group>
                                      <Form.Group as={Row}>
                                        <Form.Label column sm="4">
                                          Lower Midline:
                                        </Form.Label>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Maintain"
                                            value="Maintain"
                                            name="InstructionLowerMidline"
                                            // defaultChecked={values.InstructionLowerMidline}
                                            checked={`${values.InstructionLowerMidline==="Maintain"?"checked":""}`}


                                            onChange={
                                              handleInstructionLowerMidline
                                            }
                                          />
                                        </Col>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Improve"
                                            value="Improve"
                                            name="InstructionLowerMidline"
                                            // defaultChecked={values.InstructionLowerMidline}
                                            checked={`${values.InstructionLowerMidline==="Improve"?"checked":""}`}


                                            onChange={
                                              handleInstructionLowerMidline
                                            }
                                          />
                                        </Col>
                                        <Col sm="2" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Idealize"
                                            value="Idealize"
                                            name="InstructionLowerMidline"
                                            // defaultChecked={values.InstructionLowerMidline}
                                            checked={`${values.InstructionLowerMidline==="Idealize"?"checked":""}`}


                                            onChange={
                                              handleInstructionLowerMidline
                                            }
                                          />
                                        </Col>
                                      </Form.Group>
                                      <Form.Group as={Row}>
                                        <Form.Label column sm="4">
                                          Overjet:
                                        </Form.Label>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Maintain"
                                            value="Maintain"
                                            name="InstructionOverjet"
                                            // defaultChecked={values.InstructionOverjet}
                                            checked={`${values.InstructionOverjet==="Maintain"?"checked":""}`}


                                            onChange={handleInstructionOverjet}
                                          />
                                        </Col>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Improve"
                                            value="Improve"
                                            name="InstructionOverjet"
                                            // defaultChecked={values.InstructionOverjet}
                                            checked={`${values.InstructionOverjet==="Improve"?"checked":""}`}


                                            onChange={handleInstructionOverjet}
                                          />
                                        </Col>
                                        <Col sm="2" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Idealize"
                                            value="Idealize"
                                            name="InstructionOverjet"
                                            // defaultChecked={values.InstructionOverjet}
                                            checked={`${values.InstructionOverjet==="Idealize"?"checked":""}`}


                                            onChange={handleInstructionOverjet}
                                          />
                                        </Col>
                                      </Form.Group>
                                      <Form.Group as={Row}>
                                        <Form.Label column sm="4">
                                          Overbite:
                                        </Form.Label>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Maintain"
                                            value="Maintain"
                                            name="InstructionOverbite"
                                            // defaultChecked={values.InstructionOverbite}
                                            checked={`${values.InstructionOverbite==="Maintain"?"checked":""}`}


                                            onChange={handleInstructionOverbite}
                                          />
                                        </Col>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Improve"
                                            value="Improve"
                                            name="InstructionOverbite"
                                            // defaultChecked={values.InstructionOverbite}
                                            checked={`${values.InstructionOverbite==="Improve"?"checked":""}`}


                                            onChange={handleInstructionOverbite}
                                          />
                                        </Col>
                                        <Col sm="2" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Idealize"
                                            value="Idealize"
                                            name="InstructionOverbite"
                                            // defaultChecked={values.InstructionOverbite}
                                            checked={`${values.InstructionOverbite==="Idealize"?"checked":""}`}


                                            onChange={handleInstructionOverbite}
                                          />
                                        </Col>
                                      </Form.Group>
                                      <Form.Group as={Row}>
                                        <Form.Label column sm="4">
                                          Arch Form:
                                        </Form.Label>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Maintain"
                                            value="Maintain"
                                            name="InstructionArchForm"
                                            // defaultChecked={values.InstructionArchForm}
                                            checked={`${values.InstructionArchForm==="Maintain"?"checked":""}`}


                                            onChange={handleInstructionArchForm}
                                          />
                                        </Col>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Improve"
                                            value="Improve"
                                            name="InstructionArchForm"
                                            // defaultChecked={values.InstructionArchForm}
                                            checked={`${values.InstructionArchForm==="Improve"?"checked":""}`}


                                            onChange={handleInstructionArchForm}
                                          />
                                        </Col>
                                        <Col sm="2" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Idealize"
                                            value="Idealize"
                                            name="InstructionArchForm"
                                            // defaultChecked={values.InstructionArchForm}
                                            checked={`${values.InstructionArchForm==="Idealize"?"checked":""}`}


                                            onChange={handleInstructionArchForm}
                                          />
                                        </Col>
                                      </Form.Group>
                                      <Form.Group as={Row}>
                                        <Form.Label column sm="4">
                                          Canine Relationship:
                                        </Form.Label>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Maintain"
                                            value="Maintain"
                                            name="InstructionCanineRelationship"
                                            // defaultChecked={values.InstructionCanineRelationship}
                                            checked={`${values.InstructionCanineRelationship==="Maintain"?"checked":""}`}


                                            onChange={
                                              handleInstructionCanineRelationship
                                            }
                                          />
                                        </Col>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Improve"
                                            value="Improve"
                                            name="InstructionCanineRelationship"
                                            // defaultChecked={values.InstructionCanineRelationship}
                                            checked={`${values.InstructionCanineRelationship==="Improve"?"checked":""}`}


                                            onChange={
                                              handleInstructionCanineRelationship
                                            }
                                          />
                                        </Col>
                                        <Col sm="2" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Idealize"
                                            value="Idealize"
                                            name="InstructionCanineRelationship"
                                            // defaultChecked={values.InstructionCanineRelationship}
                                            checked={`${values.InstructionCanineRelationship==="Idealize"?"checked":""}`}


                                            onChange={
                                              handleInstructionCanineRelationship
                                            }
                                          />
                                        </Col>
                                      </Form.Group>
                                      <Form.Group as={Row}>
                                        <Form.Label column sm="4">
                                          Molar Relationship:
                                        </Form.Label>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Maintain"
                                            value="Maintain"
                                            name="InstructionMolarRelationship"
                                            // defaultChecked={values.InstructionMolarRelationship}
                                            checked={`${values.InstructionMolarRelationship==="Maintain"?"checked":""}`}


                                            onChange={
                                              handleInstructionMolarRelationship
                                            }
                                          />
                                        </Col>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Improve"
                                            value="Improve"
                                            name="InstructionMolarRelationship"
                                            // defaultChecked={values.InstructionMolarRelationship}
                                            checked={`${values.InstructionMolarRelationship==="Improve"?"checked":""}`}


                                            onChange={
                                              handleInstructionMolarRelationship
                                            }
                                          />
                                        </Col>
                                        <Col sm="2" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Idealize"
                                            value="Idealize"
                                            name="InstructionMolarRelationship"
                                            // defaultChecked={values.InstructionMolarRelationship}
                                            checked={`${values.InstructionMolarRelationship==="Idealize"?"checked":""}`}


                                            onChange={
                                              handleInstructionMolarRelationship
                                            }
                                          />
                                        </Col>
                                      </Form.Group>
                                      <Form.Group as={Row}>
                                        <Form.Label column sm="4">
                                          Posterior Crossbite :
                                        </Form.Label>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Maintain"
                                            value="Maintain"
                                            name="InstructionPosteriorCrossbite"
                                            // defaultChecked={values.InstructionPosteriorCrossbite}
                                            checked={`${values.InstructionPosteriorCrossbite==="Maintain"?"checked":""}`}


                                            onChange={
                                              handleInstructionPosteriorCrossbite
                                            }
                                          />
                                        </Col>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Improve"
                                            value="Improve"
                                            name="InstructionPosteriorCrossbite"
                                            // defaultChecked={values.InstructionPosteriorCrossbite}
                                            checked={`${values.InstructionPosteriorCrossbite==="Improve"?"checked":""}`}


                                            onChange={
                                              handleInstructionPosteriorCrossbite
                                            }
                                          />
                                        </Col>
                                        <Col sm="2" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Idealize"
                                            value="Idealize"
                                            name="InstructionPosteriorCrossbite"
                                            // defaultChecked={values.InstructionPosteriorCrossbite}
                                            checked={`${values.InstructionPosteriorCrossbite==="Idealize"?"checked":""}`}


                                            onChange={
                                              handleInstructionPosteriorCrossbite
                                            }
                                          />
                                        </Col>
                                      </Form.Group>
                                      <Form.Group as={Row}>
                                        <Form.Label column sm="4">
                                          IPR :
                                        </Form.Label>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Yes"
                                            value="Yes"
                                            name="InstructionIPR"
                                            // defaultChecked={values.InstructionIPR}
                                            checked={`${values.InstructionIPR==="Yes"?"checked":""}`}


                                            onChange={handleInstructionIPR}
                                          />
                                        </Col>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="No"
                                            value="No"
                                            name="InstructionIPR"
                                            // defaultChecked={values.InstructionIPR}
                                            checked={`${values.InstructionIPR==="No"?"checked":""}`}


                                            onChange={handleInstructionIPR}
                                          />
                                        </Col>
                                        <Col sm="2" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Only If Needed"
                                            value="Only If Needed"
                                            name="InstructionIPR"
                                            // defaultChecked={values.InstructionIPR}
                                            checked={`${values.InstructionIPR==="Only If Needed"?"checked":""}`}


                                            onChange={handleInstructionIPR}
                                          />
                                        </Col>
                                      </Form.Group>
                                      <Form.Group as={Row}>
                                        <Form.Label column sm="4">
                                          Engagers & Attachments:
                                        </Form.Label>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Yes"
                                            value="Yes"
                                            name="InstructionEngagersAttachments"
                                            // defaultChecked={values.InstructionEngagersAttachments}
                                            checked={`${values.InstructionEngagersAttachments==="Yes"?"checked":""}`}


                                            onChange={
                                              handleInstructionEngagersAttachments
                                            }
                                          />
                                        </Col>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="No"
                                            value="No"
                                            name="InstructionEngagersAttachments"
                                            // defaultChecked={values.InstructionEngagersAttachments}
                                            checked={`${values.InstructionEngagersAttachments==="No"?"checked":""}`}


                                            onChange={
                                              handleInstructionEngagersAttachments
                                            }
                                          />
                                        </Col>
                                        <Col sm="2" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Only If Needed"
                                            value="Only If Needed"
                                            name="InstructionEngagersAttachments"
                                            // defaultChecked={values.InstructionEngagersAttachments}
                                            checked={`${values.InstructionEngagersAttachments==="Only If Needed"?"checked":""}`}


                                            onChange={
                                              handleInstructionEngagersAttachments
                                            }
                                          />
                                        </Col>
                                      </Form.Group>
                                      <Form.Group as={Row}>
                                        <Form.Label column sm="4">
                                          Procline:
                                        </Form.Label>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Yes"
                                            value="Yes"
                                            name="InstructionProcline"
                                            // defaultChecked={values.InstructionProcline}
                                            checked={`${values.InstructionProcline==="Yes"?"checked":""}`}


                                            onChange={handleInstructionProcline}
                                          />
                                        </Col>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="No"
                                            value="No"
                                            name="InstructionProcline"
                                            // defaultChecked={values.InstructionProcline}
                                            checked={`${values.InstructionProcline==="No"?"checked":""}`}


                                            onChange={handleInstructionProcline}
                                          />
                                        </Col>
                                        <Col sm="2" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Only If Needed"
                                            value="Only If Needed"
                                            name="InstructionProcline"
                                            // defaultChecked={values.InstructionProcline}
                                            checked={`${values.InstructionProcline==="Only If Needed"?"checked":""}`}


                                            onChange={handleInstructionProcline}
                                          />
                                        </Col>
                                      </Form.Group>
                                      <Form.Group as={Row}>
                                        <Form.Label column sm="4">
                                          Expand:
                                        </Form.Label>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Yes"
                                            value="Yes"
                                            name="InstructionExpand"
                                            // defaultChecked={values.InstructionExpand}
                                            checked={`${values.InstructionExpand==="Yes"?"checked":""}`}


                                            onChange={handleInstructionExpand}
                                          />
                                        </Col>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="No"
                                            value="No"
                                            name="InstructionExpand"
                                            // defaultChecked={values.InstructionExpand}
                                            checked={`${values.InstructionExpand==="No"?"checked":""}`}


                                            onChange={handleInstructionExpand}
                                          />
                                        </Col>
                                        <Col sm="2" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Only If Needed"
                                            value="Only If Needed"
                                            name="InstructionExpand"
                                            // defaultChecked={values.InstructionExpand}
                                            checked={`${values.InstructionExpand==="Only If Needed"?"checked":""}`}

                                            
                                            onChange={handleInstructionExpand}
                                          />
                                        </Col>
                                      </Form.Group>
                                      <Form.Group as={Row}>
                                        <Form.Label column sm="4">
                                          Distalize:
                                        </Form.Label>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Yes"
                                            value="Yes"
                                            name="InstructionDistalize"
                                            // defaultChecked={values.InstructionDistalize}
                                            checked={`${values.InstructionDistalize==="Yes"?"checked":""}`}


                                            onChange={
                                              handleInstructionDistalize
                                            }
                                          />
                                        </Col>
                                        <Col sm="3" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="No"
                                            value="No"
                                            name="InstructionDistalize"
                                            // defaultChecked={values.InstructionDistalize}
                                            checked={`${values.InstructionDistalize==="No"?"checked":""}`}
                                            

                                            onChange={
                                              handleInstructionDistalize
                                            }
                                          />
                                        </Col>
                                        <Col sm="2" className="mt-2">
                                          <Form.Check
                                            type="radio"
                                            aria-label="radio 1"
                                            label="Only If Needed"
                                            value="Only If Needed"
                                            name="InstructionDistalize"
                                            // defaultChecked={values.InstructionDistalize}
                                            checked={`${values.InstructionDistalize==="Only If Needed"?"checked":""}`}

                                            
                                            onChange={
                                              handleInstructionDistalize
                                            }
                                          />
                                        </Col>
                                      </Form.Group>
                                    </Col>
                                  </Row>
                                  <hr className="hrline" />
                                  <Row>
                                    <Col md={{ span: 12 }}>
                                      <h3>Teeth are labeled</h3>
                                      <h6>
                                        Do Not Move These Teeth (Bridges,
                                        Ankylosed Teeth, Etc.) :
                                      </h6>
                                      <table className="mt-3">
                                        <tbody>
                                          <tr>
                                            <td></td>
                                            <td>
                                              <div>
                                                18
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="18"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("18")?"checked":""}`}
                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                17
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="17"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("17")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                16
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="16"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("16")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                15
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="15"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("15")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                14
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="14"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("14")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                13
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="13"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("13")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                12
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="12"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("12")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                11
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="11"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("11")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                21
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="21"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("21")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                22
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="22"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("22")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                23
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="23"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("23")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                24
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="24"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("24")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                25
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="25"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("25")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                26
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="26"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("26")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                27
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="27"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("27")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                28
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="28"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("28")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td style={{ padding: "0px 8px" }}>
                                              R
                                            </td>
                                            <td colspan="16">
                                              <hr
                                                className="hrrl"
                                                style={{
                                                  borderTop:
                                                    "margin-top: 25px; margin-bottom:0px;",
                                                }}
                                              />
                                            </td>
                                            <td style={{ padding: "0px 8px" }}>
                                              L
                                            </td>
                                          </tr>
                                          <tr>
                                            <td></td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="48"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("48")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                48
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="47"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("47")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                47
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="46"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("46")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                46
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="45"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("45")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                45
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="44"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("44")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                44
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="43"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("43")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                43
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="42"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("42")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                42
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="41"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("41")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                41
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="31"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("31")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                31
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="32"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("32")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                32
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="33"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("33")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                33
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="34"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("34")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                34
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="35"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("35")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                35
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="36"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("36")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                36
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="37"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("37")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                37
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="38"
                                                  name="DoNotMoveTheseTeeth"
                                                  checked={`${values.DoNotMoveTheseTeeth.includes("38")?"checked":""}`}

                                                  onChange={
                                                    handleDoNotMoveTheseTeeth
                                                  }
                                                />
                                                38
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <h6 className="mt-4">
                                        Avoid Engagers & Attachments On These
                                        Teeth (Facial Restoration, Etc.) :
                                      </h6>
                                      <table className="mt-3">
                                        <tbody>
                                          <tr>
                                            <td></td>
                                            <td>
                                              <div>
                                                18
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="18"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("18")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                17
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="17"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("17")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                16
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="16"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("16")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                15
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="15"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("15")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                14
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="14"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("14")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                13
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="13"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("13")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                12
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="12"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("12")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                11
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="11"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("11")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                21
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="21"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("21")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                22
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="22"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("22")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                23
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="23"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("23")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                24
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="24"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("24")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                25
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="25"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("25")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                26
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="26"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("26")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                27
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="27"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("27")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                28
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="28"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("28")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td style={{ padding: "0px 8px;" }}>
                                              R
                                            </td>
                                            <td colspan="16">
                                              <hr
                                                className="hrrl"
                                                style={{
                                                  borderTop:
                                                    "margin-top: 25px; margin-bottom:0px;",
                                                }}
                                              />
                                            </td>
                                            <td style={{ padding: "0px 8px;" }}>
                                              L
                                            </td>
                                          </tr>
                                          <tr>
                                            <td></td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="48"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("48")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                48
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="47"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("47")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                47
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="46"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("46")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                46
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="45"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("45")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                45
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="44"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("44")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                44
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="43"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("43")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                43
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="42"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("42")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                42
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="41"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("41")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                41
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="31"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("31")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                31
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="32"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("32")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                32
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="33"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("33")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                33
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="34"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("34")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                34
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="35"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("35")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                35
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="36"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("36")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                36
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="37"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("37")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                37
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="38"
                                                  name="AvidEngagersAttachmentsOnTheseTeeth"
                                                  checked={`${values.AvidEngagersAttachmentsOnTheseTeeth.includes("38")?"checked":""}`}

                                                  onChange={handleEngagers}
                                                />
                                                38
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <h6 className="mt-4">
                                        I Will Extract These Teeth Before
                                        Treatment :
                                      </h6>
                                      <table className="mt-3">
                                        <tbody>
                                          <tr>
                                            <td></td>
                                            <td>
                                              <div>
                                                18
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="18"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("18")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                17
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="17"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("17")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                16
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="16"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("16")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                15
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="15"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("15")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                14
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="14"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("14")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                13
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="13"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("13")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                12
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="12"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("12")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                11
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="11"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("11")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                21
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="21"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("21")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                22
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="22"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("22")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                23
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="23"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("23")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                24
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="24"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("24")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                25
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="25"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("25")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                26
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="26"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("26")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                27
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="27"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("27")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                28
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="28"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("28")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td style={{ padding: "0px 8px;" }}>
                                              R
                                            </td>
                                            <td colspan="16">
                                              <hr
                                                className="hrrl"
                                                style={{
                                                  borderTop:
                                                    "margin-top: 25px; margin-bottom:0px;",
                                                }}
                                              />
                                            </td>
                                            <td style={{ padding: "0px 8px;" }}>
                                              L
                                            </td>
                                          </tr>
                                          <tr>
                                            <td></td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="48"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("48")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                48
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="47"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("47")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                47
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="46"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("46")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                46
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="45"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("45")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                45
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="44"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("44")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                44
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="43"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("43")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                43
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="42"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("42")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                42
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="41"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("41")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                41
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="31"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("31")?"checked":""}`}
                                                  
                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                31
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="32"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("32")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                32
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="33"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("33")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                33
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="34"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("34")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                34
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="35"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("35")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                35
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="36"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("36")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                36
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="37"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("37")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                37
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="38"
                                                  name="IWillExtractTheseTeethBeforeTreatment"
                                                  checked={`${values.IWillExtractTheseTeethBeforeTreatment.includes("38")?"checked":""}`}

                                                  onChange={
                                                    handleIWillExtractTheseTeethBeforeTreatment
                                                  }
                                                />
                                                38
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <h6 className="mt-4">
                                        Leave These Spaces Open :{" "}
                                      </h6>
                                      <table className="mt-3">
                                        <tbody>
                                          <tr>
                                            <td></td>
                                            <td>
                                              <div>
                                                18
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="18"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("18")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                17
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="17"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("17")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                16
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="16"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("16")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                15
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="15"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("15")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                14
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="14"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("14")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                13
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="13"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("13")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                12
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="12"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("12")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                11
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="11"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("11")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                21
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="21"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("21")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                22
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="22"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("22")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                23
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="23"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("23")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                24
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="24"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("24")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                25
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="25"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("25")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                26
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="26"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("26")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                27
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="27"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("27")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                28
                                                <br />
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="28"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("28")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td style={{ padding: "0px 8px;" }}>
                                              R
                                            </td>
                                            <td colspan="16">
                                              <hr
                                                className="hrrl"
                                                style={{
                                                  borderTop:
                                                    "margin-top: 25px; margin-bottom:0px;",
                                                }}
                                              />
                                            </td>
                                            <td style={{ padding: "0px 8px;" }}>
                                              L
                                            </td>
                                          </tr>
                                          <tr>
                                            <td></td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="48"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("48")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                48
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="47"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("47")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                47
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="46"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("46")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                46
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="45"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("45")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                45
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="44"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("44")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                44
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="43"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("43")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                43
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="42"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("42")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                42
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="41"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("41")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                41
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="31"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("31")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                31
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="32"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("32")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                32
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="33"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("33")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                33
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="34"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("34")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                34
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="35"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("35")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                35
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="36"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("36")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                36
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="37"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("37")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                37
                                              </div>
                                            </td>
                                            <td>
                                              <div>
                                                <Form.Check
                                                  aria-label="option 1"
                                                  value="38"
                                                  name="LeaveTheseSpacesOpen"
                                                  checked={`${values.LeaveTheseSpacesOpen.includes("38")?"checked":""}`}

                                                  onChange={
                                                    handleLeaveTheseSpacesOpen
                                                  }
                                                />
                                                38
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </Col>
                                  </Row>
                                  <h6 className="mt-3">
                                    Additional Instruction:
                                  </h6>
                                  <Form.Group
                                    controlId="validationInstruction"
                                    className="mt-3 mb-5"
                                  >
                                    <InputGroup hasValidation>
                                      <Form.Control
                                        as="textarea"
                                        rows={7}
                                        aria-describedby="inputGroupPrepend"
                                        name="AdditionalInstruction"
                                        value={values.AdditionalInstruction}
                                        onChange={handleChange}
                                      />
                                    </InputGroup>
                                  </Form.Group>
                                  {/* <Row className="text-center btn-primary"><Col><Button
                 variant="" onClick={handleSubmit}>submit</Button></Col></Row> */}
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
                                        className="nextbtn"
                                        onClick={() =>{
                                          // setValues((pre)=>{
                                          //   return{...pre,DoctorId:DoctorUserID}
                                          // })
                                          // console.log(values);
                                          setCurrentTab((prev) => prev + 1)
                                        }}
                                      >
                                        Next
                                      </Button>
                                    </Col>
                                  </Row>
                                </Tab>

                                <Tab
                                  eventKey={3}
                                  title="4. Patient Potrait"
                                  className="p-3"
                                >
                                  <Row>
                                    <Col md={8}>
                                      <Card className="img-crd">
                                        <Row className="p-3">
                                          <Col>
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 1"
                                              id="four1"
                                              name="portrait"
                                              label="Upload patient portrait now"
                                              value="1"
                                            />
                                          </Col>
                                          <Col>
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 2"
                                              id="four2"
                                              name="portrait"
                                              label="Upload patient portrait later"
                                              value="2"
                                            />
                                          </Col>
                                        </Row>
                                        <hr className="m-2" />
                                        <Card
                                          className="img-crd-in m-2 desc"
                                          id="port1"
                                          onDragOver={handleOndragOver}
                                          onDrop={handleOndrop}
                                          onClick={() =>
                                            fileInput.current.click()
                                          }
                                        >
                                          {previewUrl ? (
                                            ""
                                          ) : (
                                            <p className="text-center">
                                              Drag or click to browse
                                            </p>
                                          )}
                                          {previewUrl? previewUrl && (
                                            <div className="image-prev">
                                              <img
                                                src={previewUrl}
                                                alt="image"
                                                className="mt-5 img-s2"
                                              />{" "}
                                              <br />
                                              <Button
                                                variant=""
                                                onClick={() => {
                                                  setPreviewUrl("");
                                                  // e.stopPropagation();
                                                }}
                                              >
                                                Delete
                                              </Button>
                                              <p> {image.name} </p>
                                            </div>
                                          ):<Row className="text-center"><Col><img src={patient[0]?.PortraitPath} className="" width={400} height={400}></img></Col></Row>  }
                                          <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInput}
                                            hidden
                                            name="Name"
                                            onChange={(e) =>
                                              handleFile(e.target.files[0])
                                            }
                                          />
                                        </Card>
                                        <Card
                                          className="desc"
                                          id="port2"
                                          style={{ display: "none" }}
                                        >
                                          <img
                                            src="https://www.portal.flexalign.in/user/img/bg-portrait.gif"
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
                                        //   onClick={handleSubmit}
                                        // onClick={handleSubmit}
                                      >
                                        Update
                                      </Button>
                                    </Col>
                                  </Row>
                                </Tab>
                                {/* <Tab eventKey={4} title="5. PVS/Scan">
                                  <Row className="p-3">
                                    <Col md={8}>
                                      <Card className="p-3 check-crd">
                                        <Row>
                                          <Col>
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 1"
                                              id="five1"
                                              name="radioo"
                                              label="Decide Later"
                                              // checked="checked"
                                              value="1"
                                            />
                                          </Col>
                                          <Col>
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 2"
                                              id="five2"
                                              name="radioo"
                                              label="PVS Impressions"
                                              value="2"
                                            />
                                          </Col>
                                          <Col>
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 3"
                                              id="five3"
                                              name="radioo"
                                              label="Intraoral Scans"
                                              value="3"
                                            />
                                          </Col>
                                          <Col>
                                            <Form.Check
                                              type="radio"
                                              aria-label="radio 4"
                                              id="five4"
                                              name="radioo"
                                              label="Models"
                                              value="4"
                                            />
                                          </Col>
                                        </Row>
                                        <Row className="desc" id="frm1">
                                          <Col>
                                            <p className="decide" id="de1 decLater">
                                              Decide Later.
                                            </p>
                                          </Col>
                                        </Row>
                                        <Row
                                          className="desc"
                                          id="frm2"
                                          style={{ display: "none" }}
                                        >
                                          <Col>
                                            <Form.Group
                                              controlId="formFileMultiple"
                                              className="mb-3 fg"
                                              id="formFileMultiple"
                                            >
                                              <Form.Label>
                                               PVS Impresssions
                                              </Form.Label>
                                              <Form.Control
                                                type="file"
                                                multiple
                                                onChange={(e) => {
                                                  handleChangeTab51(
                                                    e.target.files
                                                  );
                                                }}
                                                name="Name"
                                              />
                                            </Form.Group>
                                          </Col>
                                        </Row>
                                        <Row
                                          className="desc"
                                          id="frm3"
                                          style={{ display: "none" }}
                                        >
                                          <Col>
                                            <Form.Group
                                              controlId="formFileMultiple"
                                              className="mb-3 fg"
                                              id="formFileMultiple"
                                            >
                                              <Form.Label>
                                                Intraoral Scans
                                              </Form.Label>
                                              <Form.Control
                                                type="file"
                                                multiple
                                                id="files"
                                                onChange={(e) => {
                                                  handleChangeTab52(
                                                    e.target.files
                                                  );
                                                }}
                                                name="Name"
                                              />
                                            </Form.Group>
                                          </Col>
                                        </Row>
                                        <Row
                                          className="desc"
                                          id="frm4"
                                          style={{ display: "none" }}
                                        >
                                          <Col>
                                            <Form.Group
                                              controlId="formFileMultiple"
                                              className="mb-3 fg"
                                              id="formFileMultiple"
                                            >
                                              <Form.Label>
                                                Models
                                              </Form.Label>
                                              <Form.Control
                                                type="file"
                                                multiple
                                                onChange={(e) => {
                                                  handleChangeTab53(
                                                    e.target.files
                                                  );
                                                }}
                                                name="Name"
                                              />
                                            </Form.Group>
                                          </Col>
                                        </Row>
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
                                        className="nextbtn"
                                        //  onClick={handleUpload1}
                                        onClick={handleUpload1}
                                      >
                                        Next
                                      </Button>
                                    </Col>
                                  </Row>
                                </Tab> */}

                                

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

export default EditPatient;