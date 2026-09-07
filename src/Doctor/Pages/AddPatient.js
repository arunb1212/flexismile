import {
  Container,
  Row,
  Col,
  Nav,
  Button,
  Tab,
  Form,
  InputGroup,
  Navbar,
  Dropdown,
  Card,
  Tabs,
  Spinner
} from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import { TbUser } from "react-icons/tb";
import { FaCalendarAlt, FaUpload } from "react-icons/fa";
import "../../Doctor/Styles/AddPatient.css";
import user from "../../Assets/user.png";
import logo from "../../Assets/Logoremovebg.png";
import { IoMdNotifications } from "react-icons/io";
import { FiMessageSquare, FiPower } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import Swal from "sweetalert2";

function AddPatient() {

  let DoctorUser=sessionStorage.getItem("DocUserId");


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
    PatientId:"0",
    Mode:"1"
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
  
  // const [dmt, setDoNotMoveTheseTeeth] = useState({
  //   DoNotMoveTheseTeeth:[]
  // });

  // const [eng, setEngagers] = useState({
  //   Engagers:[]
  // })

  // const [ext, setIWillExtractTheseTeethBeforeTreatment] = useState({
  //   IWillExtractTheseTeethBeforeTreatment:[]
  // })

  // const [leavespaces, setLeaveTheseSpacesOpen] = useState({
  //   LeaveTheseSpacesOpen:[]
  // })

  const tglContent = () => {
    let Menu = document.querySelector(".menuTab");
    if (Menu.classList.contains("collapsed")) {
      Menu.classList.remove("collapsed");
    } else {
      Menu.classList.add("collapsed");
    }
  };

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

const IndividualUpload1 = async () => {
  if (!state6) {
    Swal.fire({
      title: "Please select an image first!",
      icon: "warning",
    });
    return;
  }
  const fd = new FormData();
  fd.append("Name", state6.name);
  fd.append("fileContent", state6);

  try {
    const res = await axios.post(
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
      fd,
      {
        onUploadProgress: (ProgressEvent) => {
          if (ProgressEvent.total > 0) {
            setProgressE1(
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            );
          }
        },
      }
    );
    if (res.data?.path) {
      setValues((pre) => ({ ...pre, FrontalRepose: res.data.path }));
    }
    let confid = document.getElementById("extim1");
    if (res.data?.status === "1" || res.data?.status === true || res.data?.status === 1) {
      Swal.fire({
        title: `${state6?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success",
      });
      if (confid) confid.style.display = "none";
    } else {
      Swal.fire({
        title: res.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  } catch (err) {
    console.error("Upload error:", err);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error",
    });
  } finally {
    setProgressE1(null);
  }
};

const IndividualUpload2 = async () => {
  if (!state62) {
    Swal.fire({
      title: "Please select an image first!",
      icon: "warning",
    });
    return;
  }
  const fd = new FormData();
  fd.append("Name", state62.name);
  fd.append("fileContent", state62);

  try {
    const res = await axios.post(
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
      fd,
      {
        onUploadProgress: (ProgressEvent) => {
          if (ProgressEvent.total > 0) {
            setProgressE2(
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            );
          }
        },
      }
    );
    if (res.data?.path) {
      setValues((pre) => ({ ...pre, FrontalSmiling: res.data.path }));
    }
    let conf2 = document.getElementById("extim2");
    if (res.data?.status === "1" || res.data?.status === true || res.data?.status === 1) {
      Swal.fire({
        title: `${state62?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success",
      });
      if (conf2) conf2.style.display = "none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error",
      });
    }
  } catch (err) {
    console.error("Upload error:", err);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error",
    });
  } finally {
    setProgressE2(null);
  }
};

const IndividualUpload3 = async () => {
  if (!state65) {
    Swal.fire({
      title: "Please select an image first!",
      icon: "warning",
    });
    return;
  }
  const fd = new FormData();
  fd.append("Name", state65.name);
  fd.append("fileContent", state65);

  try {
    const res = await axios.post(
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
      fd,
      {
        onUploadProgress: (ProgressEvent) => {
          if (ProgressEvent.total > 0) {
            setProgressE3(
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            );
          }
        },
      }
    );
    if (res.data?.path) {
      setValues((pre) => ({ ...pre, ProfileRepose: res.data.path }));
    }
    let conf3 = document.getElementById("extim3");
    if (res.data?.status === "1" || res.data?.status === true || res.data?.status === 1) {
      Swal.fire({
        title: `${state65?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success",
      });
      if (conf3) conf3.style.display = "none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error",
      });
    }
  } catch (err) {
    console.error("Upload error:", err);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error",
    });
  } finally {
    setProgressE3(null);
  }
};

const IndividualUpload4 = async () => {
  if (!state67) {
    Swal.fire({
      title: "Please select an image first!",
      icon: "warning",
    });
    return;
  }
  const fd = new FormData();
  fd.append("Name", state67.name);
  fd.append("fileContent", state67);

  try {
    const res = await axios.post(
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
      fd,
      {
        onUploadProgress: (ProgressEvent) => {
          if (ProgressEvent.total > 0) {
            setProgressE4(
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            );
          }
        },
      }
    );
    if (res.data?.path) {
      setValues((pre) => ({ ...pre, FrontOpImage: res.data.path }));
    }
    let conf4 = document.getElementById("extim4");
    if (res.data?.status === "1" || res.data?.status === true || res.data?.status === 1) {
      Swal.fire({
        title: `${state67?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success",
      });
      if (conf4) conf4.style.display = "none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error",
      });
    }
  } catch (err) {
    console.error("Upload error:", err);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error",
    });
  } finally {
    setProgressE4(null);
  }
};

// ---------------------------------------------------Intra Individual

const IntraUpload1 = async () => {
  if (!state662) {
    Swal.fire({
      title: "Please select an image first!",
      icon: "warning",
    });
    return;
  }
  const fd = new FormData();
  fd.append("Name", state662.name);
  fd.append("fileContent", state662);

  try {
    const res = await axios.post(
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
      fd,
      {
        onUploadProgress: (ProgressEvent) => {
          if (ProgressEvent.total > 0) {
            setProgressI1(
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            );
          }
        },
      }
    );
    if (res.data?.path) {
      setValues((pre) => ({ ...pre, BuccalRight: res.data.path }));
    }
    let confint1 = document.getElementById("intim1");
    if (res.data?.status === "1" || res.data?.status === true || res.data?.status === 1) {
      Swal.fire({
        title: `${state662?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success",
      });
      if (confint1) confint1.style.display = "none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error",
      });
    }
  } catch (err) {
    console.error("Upload error:", err);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error",
    });
  } finally {
    setProgressI1(null);
  }
};

const IntraUpload2 = async () => {
  if (!state6621) {
    Swal.fire({
      title: "Please select an image first!",
      icon: "warning",
    });
    return;
  }
  const fd = new FormData();
  fd.append("Name", state6621.name);
  fd.append("fileContent", state6621);

  try {
    const res = await axios.post(
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
      fd,
      {
        onUploadProgress: (ProgressEvent) => {
          if (ProgressEvent.total > 0) {
            setProgressI2(
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            );
          }
        },
      }
    );
    if (res.data?.path) {
      setValues((pre) => ({ ...pre, BuccalLeft: res.data.path }));
    }
    let confint2 = document.getElementById("intim2");
    if (res.data?.status === "1" || res.data?.status === true || res.data?.status === 1) {
      Swal.fire({
        title: `${state6621?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success",
      });
      if (confint2) confint2.style.display = "none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error",
      });
    }
  } catch (err) {
    console.error("Upload error:", err);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error",
    });
  } finally {
    setProgressI2(null);
  }
};

const IntraUpload3 = async () => {
  if (!state6622) {
    Swal.fire({
      title: "Please select an image first!",
      icon: "warning",
    });
    return;
  }
  const fd = new FormData();
  fd.append("Name", state6622.name);
  fd.append("fileContent", state6622);

  try {
    const res = await axios.post(
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
      fd,
      {
        onUploadProgress: (ProgressEvent) => {
          if (ProgressEvent.total > 0) {
            setProgressI3(
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            );
          }
        },
      }
    );
    if (res.data?.path) {
      setValues((pre) => ({ ...pre, BuccalFront: res.data.path }));
    }
    let confint3 = document.getElementById("intim3");
    if (res.data?.status === "1" || res.data?.status === true || res.data?.status === 1) {
      Swal.fire({
        title: `${state6622?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success",
      });
      if (confint3) confint3.style.display = "none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error",
      });
    }
  } catch (err) {
    console.error("Upload error:", err);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error",
    });
  } finally {
    setProgressI3(null);
  }
};

const IntraUpload4 = async () => {
  if (!state6623) {
    Swal.fire({
      title: "Please select an image first!",
      icon: "warning",
    });
    return;
  }
  const fd = new FormData();
  fd.append("Name", state6623.name);
  fd.append("fileContent", state6623);

  try {
    const res = await axios.post(
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
      fd,
      {
        onUploadProgress: (ProgressEvent) => {
          if (ProgressEvent.total > 0) {
            setProgressI4(
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            );
          }
        },
      }
    );
    if (res.data?.path) {
      setValues((pre) => ({ ...pre, UpperOcclusal: res.data.path }));
    }
    let confint4 = document.getElementById("intim4");
    if (res.data?.status === "1" || res.data?.status === true || res.data?.status === 1) {
      Swal.fire({
        title: `${state6623?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success",
      });
      if (confint4) confint4.style.display = "none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error",
      });
    }
  } catch (err) {
    console.error("Upload error:", err);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error",
    });
  } finally {
    setProgressI4(null);
  }
};

const IntraUpload5 = async () => {
  if (!state6624) {
    Swal.fire({
      title: "Please select an image first!",
      icon: "warning",
    });
    return;
  }
  const fd = new FormData();
  fd.append("Name", state6624.name);
  fd.append("fileContent", state6624);

  try {
    const res = await axios.post(
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
      fd,
      {
        onUploadProgress: (ProgressEvent) => {
          if (ProgressEvent.total > 0) {
            setProgressI5(
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            );
          }
        },
      }
    );
    if (res.data?.path) {
      setValues((pre) => ({ ...pre, LowerOcclusal: res.data.path }));
    }
    let confint5 = document.getElementById("intim5");
    if (res.data?.status === "1" || res.data?.status === true || res.data?.status === 1) {
      Swal.fire({
        title: `${state6624?.name || "Photo"} \nUploaded Successfully!`,
        icon: "success",
      });
      if (confint5) confint5.style.display = "none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error",
      });
    }
  } catch (err) {
    console.error("Upload error:", err);
    Swal.fire({
      title: "Failed to upload image!",
      text: err.message,
      icon: "error",
    });
  } finally {
    setProgressI5(null);
  }
};

const RadioUpload1 = async () => {
  if (!radio) {
    Swal.fire({
      title: "Please select a file first!",
      icon: "warning",
    });
    return;
  }
  const fd = new FormData();
  fd.append("Name", radio.name);
  fd.append("fileContent", radio);

  try {
    const res = await axios.post(
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
      fd,
      {
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
    if (res.data?.path) {
      setValues((pre) => ({ ...pre, XrayLeft: res.data.path }));
    }
    let confrim1 = document.getElementById("rim1");
    if (res.data?.status === "1" || res.data?.status === true || res.data?.status === 1) {
      Swal.fire({
        title: `${radio?.name || "File"} \nUploaded Successfully!`,
        icon: "success",
      });
      if (confrim1) confrim1.style.display = "none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error",
      });
    }
  } catch (err) {
    console.error("Upload error:", err);
    Swal.fire({
      title: "Failed to upload file!",
      text: err.message,
      icon: "error",
    });
  }
};

const RadioUpload2 = async () => {
  if (!radio1) {
    Swal.fire({
      title: "Please select a file first!",
      icon: "warning",
    });
    return;
  }
  const fd = new FormData();
  fd.append("Name", radio1.name);
  fd.append("fileContent", radio1);

  try {
    const res = await axios.post(
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
      fd,
      {
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
    if (res.data?.path) {
      setValues((pre) => ({ ...pre, XrayRight: res.data.path }));
    }
    let confrim2 = document.getElementById("rim2");
    if (res.data?.status === "1" || res.data?.status === true || res.data?.status === 1) {
      Swal.fire({
        title: `${radio1?.name || "File"} \nUploaded Successfully!`,
        icon: "success",
      });
      if (confrim2) confrim2.style.display = "none";
    } else {
      Swal.fire({
        title: res.data?.message || "Upload failed!",
        icon: "error",
      });
    }
  } catch (err) {
    console.error("Upload error:", err);
    Swal.fire({
      title: "Failed to upload file!",
      text: err.message,
      icon: "error",
    });
  }
};








let DoctorName=sessionStorage.getItem("DocPracName");
let DoctorUserID=sessionStorage.getItem("DocUserId")

  const handleSubmit = async (event) => {
    event.preventDefault();

    const submitBtn = document.getElementById("submitCase");
    if (submitBtn) {
      submitBtn.disabled = true;
    }

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      if (submitBtn) {
        submitBtn.disabled = false;
      }
      alert('Please go back and fill required fields marked with "*"');
      return;
    }
    setValidated(true);

    let currentPortraitPath = values.PortraitPath;
    if (state && !currentPortraitPath) {
      try {
        const portFd = new FormData();
        portFd.append("Name", state.name);
        portFd.append("fileContent", state);
        const portRes = await axios.post(
          "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadPhotosNew",
          portFd
        );
        if (
          portRes.data &&
          (portRes.data.status === "1" || portRes.data.status === true)
        ) {
          currentPortraitPath = portRes.data.path;
          setValues((pre) => ({ ...pre, PortraitPath: portRes.data.path }));
        }
      } catch (portErr) {
        console.error("Error uploading portrait:", portErr);
      }
    }

    const url =
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddPatientRegistration";

    let n = {
      ...values,
      PortraitPath: currentPortraitPath || values.PortraitPath,
      DoctorId: DoctorUserID,
      ClinicalConditions: values.ClinicalConditions
        ? values.ClinicalConditions.toString()
        : "",
      DoNotMoveTheseTeeth: values.DoNotMoveTheseTeeth
        ? values.DoNotMoveTheseTeeth.toString()
        : "",
      AvidEngagersAttachmentsOnTheseTeeth:
        values.AvidEngagersAttachmentsOnTheseTeeth
          ? values.AvidEngagersAttachmentsOnTheseTeeth.toString()
          : "",
      IWillExtractTheseTeethBeforeTreatment:
        values.IWillExtractTheseTeethBeforeTreatment
          ? values.IWillExtractTheseTeethBeforeTreatment.toString()
          : "",
      LeaveTheseSpacesOpen: values.LeaveTheseSpacesOpen
        ? values.LeaveTheseSpacesOpen.toString()
        : "",
    };

    console.log("n :", n);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(n),
      });
      const result = await res.json();
      console.log("result :", result.message);

      if (result.message === "Added Successful") {
        Swal.fire({
          title: "Added Successfully!",
          icon: "success",
        });
        navigate(`/patient-list/${DoctorUserID}`);
      } else {
        if (submitBtn) {
          submitBtn.disabled = false;
        }
        Swal.fire({
          title: "Submission failed",
          text: result.message || "Please check your inputs and try again.",
          icon: "error",
        });
      }
    } catch (err) {
      console.error(err);
      if (submitBtn) {
        submitBtn.disabled = false;
      }
    }
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

  const handleupload = async (e) => {
    if (e) e.preventDefault();

    if (!state) {
      Swal.fire({
        title: "Please select a portrait photo to upload!",
        icon: "warning",
      });
      return;
    }

    const fd = new FormData();
    fd.append("Name", state.name);
    fd.append("fileContent", state);

    try {
      const res = await axios.post(
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
      );

      if (
        res.data &&
        (res.data.status === "1" || res.data.status === true)
      ) {
        setValues((pre) => ({
          ...pre,
          PortraitPath: res.data.path,
        }));
        Swal.fire({
          title: `${state.name} \nUploaded Successfully!`,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Upload Failed",
          text: res.data?.message || "Please try again.",
          icon: "error",
        });
      }
    } catch (err) {
      console.error("Portrait upload error:", err);
      Swal.fire({
        title: "Upload Error",
        text: "Could not upload portrait photo.",
        icon: "error",
      });
    }

    setValues((pre) => {
      return { ...pre, DoctorId: DoctorUserID };
    });

    setCurrentTab((prev) => prev + 1);
  };

  const handleUpload1 = (e) => {
    e.preventDefault();

    const pvs1El = document.getElementById("five2");
    const pvs2El = document.getElementById("five3");
    const pvs3El = document.getElementById("five4");

    const fd = new FormData();
    if (pvs1El && pvs1El.checked) {
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

    if (pvs2El && pvs2El.checked) {
      fd.append("Name", IntraOral.name);
      for (let i = 0; i < IntraOral.length; i++) {
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
          setValues((pre) => {
            return { ...pre, PathOfDoc: res.data };
          });
        });
    }

    if (pvs3El && pvs3El.checked) {
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
          

          console.log(values);
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

          console.log(values);
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
   if(values?.FirstName==="" || values?.LastName==="" || values?.DateofBirth==="" || values?.Gender==="" || values?.ClinicAddress==="" || values.CaseNo===""){
    alert("please fill all fields marked with red *")
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



  return (
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
                    <Dropdown.Item href="#/action-2" onClick={() => {navigate("/")
                    // sessionStorage.clear();
                    }}>
                      <FiPower fontSize={25} />
                      <span className="px-3" >
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
              {/* <Row>
  <Col>
  <Button variant="link" className="doc-tab">Doctor</Button>
  </Col>
  <Col>
  <Button variant="link" className="prof-tab">Profile</Button>
  
  </Col>
  </Row> */}
              <Nav className="justify-content-center">
                <Nav.Link
                  href=""
                  className="doc-tab active"
                  onClick={() => navigate(`/doctor-dashboard/${DoctorUserID}`)}
                >
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
                                tabIndex={currentTab}
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
                                            placeholder="First Name *"
                                            name="FirstName"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            required
                                          />
                                          <Form.Control.Feedback type="invalid">
                                            Please Enter First Name.
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
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            required
                                          />
                                          <Form.Control.Feedback type="invalid">
                                            Please Enter Last Name.
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
                                            placeholder="Mobile Number"
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
                                          value="Male"
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
                                          label="Female"
                                          value="Female"
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
                                            type="date"
                                            placeholder="Date *"
                                            name="DateofBirth"
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
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                          />
                                        </InputGroup>
                                      </Form.Group>
                                      <Form.Group
                                        controlId="validationClinicAddress"
                                        className="mt-3"
                                      >
                                          <span style={{color:"red",float:"right"}} className="m-0 p-0">*</span>

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
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                          />
                                           <Form.Control.Feedback type="invalid">
                                          Please Enter Clinic Address.
                                        </Form.Control.Feedback>
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
                                            placeholder="Case Paper No."
                                            name="CaseNo"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                          />
                                          <Form.Control.Feedback type="invalid">
                                          Please Enter case paper No.
                                        </Form.Control.Feedback>
                                        </InputGroup>
                                      </Form.Group>
                                    </Col>
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
                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Spacing"
                                            value="Spacing"
                                            name="ClinicalConditions"
                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Class II div 1"
                                            value="Class II div 1"
                                            name="ClinicalConditions"
                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Class II div 2"
                                            value="Class II div 2"
                                            name="ClinicalConditions"
                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="CClass III"
                                            value="CClass III"
                                            name="ClinicalConditions"
                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Open bite"
                                            value="Open bite"
                                            name="ClinicalConditions"
                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Anterior crossbite"
                                            value="Anterior crossbite"
                                            name="ClinicalConditions"
                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Posterior crossbite"
                                            value="Posterior crossbite"
                                            name="ClinicalConditions"
                                            onChange={handlecheck}
                                          />
                                        </Col>
                                        <Col md={6}>
                                          <Form.Check
                                            type="checkbox"
                                            label="Deep Bite"
                                            value="Deep Bite"
                                            name="ClinicalConditions"
                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Narrow Arch"
                                            value="Narrow Arch"
                                            name="ClinicalConditions"
                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Flared Teeth"
                                            value="Flared Teeth"
                                            name="ClinicalConditions"
                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Overjet"
                                            value="Overjet"
                                            name="ClinicalConditions"
                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Uneven smile"
                                            value="Uneven smile"
                                            name="ClinicalConditions"
                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Misshapen teeth"
                                            value="Misshapen teeth"
                                            name="ClinicalConditions"
                                            onChange={handlecheck}
                                          />
                                          <Form.Check
                                            type="checkbox"
                                            label="Other"
                                            value="Other"
                                            name="ClinicalConditions"
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
                                        onClick={() =>
                                          setCurrentTab((prev) => prev + 1)
                                        }
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
                                            type="number"
                                            name="Quotation"
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
                                                onChange={handleChange}
                                              >
                                                <option>Select</option>
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
                                              <Form.Select size="sm">
                                                <option>Select</option>
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
                                                type="text"
                                                name="Overjet"
                                                onChange={handleChange}
                                              />
                                              {/* <Form.Text>do not use special characters such as -,.,*,etc.</Form.Text> */}
                                            </Col>
                                            <Col sm="1" className="px-2">MM</Col>
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
                                                  name="Engagers"
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
                                                  name="Engagers"
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
                                          setValues((pre)=>{
                                            return{...pre,DoctorId:DoctorUserID}
                                          })

                                          if(values?.AmountPaid===""){
                                            setValues((pre)=>{
                                              return{
                                                ...pre,
                                                AmountPaid:0
                                              }
                                            })

                                            
                                          }
                                          console.log(values);

                                          if(values?.Quotation==="" || values?.ExpectedNoOfAligners==="" || values?.ProductType===""){
                                            alert("please fill all fields marked with red *")
                                          }else{
                                          setCurrentTab((prev) => prev + 1)
                                          }
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
                                          {previewUrl && (
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
                                          )}
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
                                        id="submitCase"
                                        type="submit"
                                        //   onClick={handleSubmit}
                                        // onClick={handleSubmit}
                                      >
                                        Submit
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
    </>
  );
}
export default AddPatient;
