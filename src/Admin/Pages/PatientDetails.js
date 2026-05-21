import {
  Container,
  Row,
  Col,
  Nav,
  Button,
  Navbar,
  Dropdown,
  Card,
  Stack,
  Form,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import "../../Doctor/Styles/PatientList.css";
import "../../Doctor/Styles/PatientDetails.css";
import {LinkContainer} from 'react-router-bootstrap';

import user from "../../Assets/user.png";
import logo from "../../Assets/Logoremovebg.png";
import { IoMdNotifications } from "react-icons/io";
import { FiMessageSquare, FiPower } from "react-icons/fi";
import { FaBars, FaEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Male from "../../Assets/Male.png";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {createFFmpeg,fetchFile} from "@ffmpeg/ffmpeg";

import avi from "../../Assets/aviVid.avi";


const ffmpeg=createFFmpeg({log:true});



function PatientList() {
  // const [Videos, setVideos] = useState({
  //   PatientId: "",
  //   CreateId: "",
  //   VideoPath: []
  // });
  let AdminName=sessionStorage.getItem("DocName")

  const navigate = useNavigate();
  const [patient, setPatient] = useState([]);
  const [extra, setextra] = useState([])

  const [search, setSearch] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);

  const urlParams = useParams();
  // console.log(urlParams);
  const ID = urlParams.PatientId;
  const Role = sessionStorage.getItem("Role");
  // const MAX_COUNT=5;

  const [state, setState] = useState();

  const [DoctorUploadingVideo, setDoctorUploadingVideo] = useState("");

  const [RequiredIPR, setRequiredIPR] = useState("")

  // const [fileLimit, setFileLimit] = useState(false)

  // const handleUploadFiles=files=>{
  //   const uploaded=[...state];
  //     let limitExceeded=false;
  //     files.some((file)=>{
  //       if(uploaded.findIndex((f)=>f.name===file.name)===-1){
  //         uploaded.push(file);
  //         if(uploaded.length===MAX_COUNT) setFileLimit(true);
  //         if(uploaded.length>MAX_COUNT){
  //           alert(`You can only add maximum of ${MAX_COUNT} files!`)
  //           setFileLimit(false);
  //           limitExceeded=true;
  //         return true;
  //         }
  //       }
  //     })
  //     if (!limitExceeded) setState(uploaded)

  //     console.log(state);
  // }
  const [ready, setReady] = useState(false);
const [mp4, setmp4] = useState();


  const load=async()=>{
    await ffmpeg.load()
    setReady(true);

}

useEffect(()=>{
    load();
    // console.log("load");
},[])


  const onChange = (e) => {
    // const newFiles = []
    // for(let i = 0; i < e.target.files.length; i++){
    //    newFiles.push(e.target.files[i])
    // }
    // setState(e.target.files)
    // console.log(state);
    // const chosenFiles=Array.prototype.slice.call(e.target.files)
    // setState(chosenFiles);
    // console.log(chosenFiles);

    setState(e.target.files);

    console.log(e.target.files);
    // console.log(e.target.files[0].lastModifiedDate);
    
  };

  const [Progress, setProgress] = useState(null);

  const addUpload = async (newarr) => {
    
    await axios
      .post(
        "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddUploadMultipleVideo",
        newarr,
        {
          onUploadProgress: (ProgressEvent) => {
            
            console.log(
              "Upload Progress:" +
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                "%"
            );
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        // console.log(
        //   "pid: " + Videos.PatientId,
        //   "Role: " + Videos.CreateId,
        //   "paths :" + Videos.VideoPath
        // );
        // while(res.data.data===undefined || res.data.data===null){
        //   <Spinner animation="border"/>
        // }
        if (res.data.status === true) {
          var spinhide=document.getElementById("spin");

          spinhide.style.display="none";
          
          Swal.fire({
            title: "Uploaded Successfully!",
            // text: 'Do you want to continue',
            icon: "success",
            // confirmButtonText: 'Cool'
          });
        }
       
      });
      
  };

//   const convertToMp4=async()=>{
//     ffmpeg.FS('writeFile','aviVid.avi',await fetchFile(state));

//     await ffmpeg.run('-i',`${state.name}`,'-f','mp4','out.mp4');

//     const data=ffmpeg.FS('readFile','out.mp4');
// console.log(data);

// const url=URL.createObjectURL(new Blob([data.buffer],{type:'video/mp4'}))
//     setmp4(url);

//   }

  const uploadHandler = async (e) => {
    
    
    // await convertToMp4();
    
    e.preventDefault();

   













    const fd = new FormData();

    fd.append("PatientId", ID);
    // for(let)
    // for(let n=0;n<state.length;n++){
    //   fd.append("Name",state.name[n])
    // }


    for (let i = 0; i < state.length; i++) {
      fd.append("Name",state[i].name)
      // console.log(state[i].name);
      fd.append("fileContent", state[i]);


    }
   
    console.log("ID is:" + ID);
    console.log(state);

    await axios
      .post(
        "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadMultipleVideo",
        fd,
        {
          onUploadProgress: (ProgressEvent) => {
            setProgress(
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            );
            console.log(
              "Upload Progress:" +
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                "%"
            );
          },
        }
      )
      .then((res) => {

        console.log("below is arr");
        console.log(res.data.data);
        // let [extData]=Object.values(res.data.data).map(s=>s.imageu)
        // res.data.data.map(x => x.imageurl).join(",")
        //Array.prototype.map.call(res.data.data, function(item) { return item.imageurl; }).join(",");
        let arr = res.data.data;
        let newarr = arr.map(({ imageurl }) => imageurl);
        console.log(newarr);
        let n = { PatientId: ID, CreateId: Role, VideoPath: newarr,DoctorUploadingVideo:DoctorUploadingVideo };
        addUpload(n); //call after first api call

        // setVideos((pre) => {             it was being called synchronously
        //   return {
        //     ...pre,
        //     PatientId:ID,
        //     CreateId:Role,
        //     VideoPath: newarr
        //   };
        // });

        // console.log(Videos);
      });

    //     const url =
    //       "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddUploadMultipleVideo";

    //     await fetch(url, {
    //       method: "POST",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(Videos),
    //     })
    //       // .then((res) => res.json())
    //       .then((res) => {
    // console.log(res);
    //         // console.log("result path:", result.message);
    //         // console.log(Videos.VideoPath[0]);

    //       });
  };

  const [IPR, setIPR] = useState(null);

  const onChangeIpr = (e) => {
    setIPR(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const uploadHandlerIpr = (e) => {
    e.preventDefault();

    if(RequiredIPR==="Yes"){

    
    const fd = new FormData();
    ID?fd.append("PatientId",ID):fd.append("PatientId","null")
    IPR?fd.append("Name", IPR.name):fd.append("Name", "null")
    IPR?fd.append("fileContent", IPR):fd.append("fileContent", 0)
    fd.append("RequiredIPR",RequiredIPR);
    // fd.append("PatientId",patient.PatientId);
    axios
      .post(
        "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadDocuments",
        fd,
        {
          onUploadProgress: (ProgressEvent) => {
            console.log(
              "Upload Progress:" +
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                "%"
            );
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "1") {
          Swal.fire({
            title: "Submitted successfully!",
            // text: 'Do you want to continue',
            icon: "success",
            // confirmButtonText: 'Cool'
          });
        }
      })
    }
    else{
      const urlNo=`https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadDocumentsNo`;


      let n={
        PatientId:ID,
        RequiredIPR:RequiredIPR
      }

      fetch(urlNo,{
        method:"POST",
      headers:{
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(n)
      })
      .then((res)=>res.json())
      .then((result)=>{
        console.log(result);
        if(result.status==='1'){
          Swal.fire({
            icon:"success",
            title:"Submitted successfully!"
          })

          window.location.reload();
        }
        else{
          Swal.fire({
            icon:"error",
            title:"Something went wrong!"
          })
        }
      })

    }
  };

  //   const getPatient = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientDetailsList/0/0"
  //       );
  //       setPatient(response.data.Data);
  //       setFilteredNames(response.data.Data);
  //       console.log(response.data.Data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const [videoData, setvideoData] = useState([])

  const url =
    "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientAllList/" +
    ID;

  useEffect(() => {
    console.log(urlParams);

    fetch(url)
      .then((res) => res.json())
      .then((details) => {
        console.log(details.Data);
        
        setPatient(details.Data);

      setvideoData(details?.PatientVideoList)

        setextra(details)
        
        // console.log(patient);
      });
  }, []);

  useEffect(() => {
    const result = patient.filter((patientname) => {
      return patientname.Name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredNames(result);
  }, [search]);
  const tglContent = () => {
    let Menu = document.querySelector(".menuTab");

    if (Menu.classList.contains("collapsed")) {
      Menu.classList.remove("collapsed");
    } else {
      Menu.classList.add("collapsed");
    }
  };
  $(document).ready(function () {
    $(".editbtn").click(function () {
      var currentTD = $(this).parents("tr").find("td");
      if ($(this).html() == "Edit") {
        currentTD = $(this).parents("tr").find("td");
        $.each(currentTD, function () {
          $(this).prop("contenteditable", true);
          $(this).parents("tr").find("td").focus();
        });
      } else {
        $.each(currentTD, function () {
          $(this).prop("contenteditable", false);
        });
      }

      $(this).html($(this).html() == "Edit" ? "Save" : "Edit");
    });
  });

  const [Reports, setReports] = useState(null);
  const onChangeReports = (e) => {
    var fileInput = document.getElementById("files");

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png|\.html)$/i;

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type \nUpload .pdf or image files Only!");
      fileInput.value = "";
      return false;
    }

    setReports(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const uploadHandlerReports = () => {
    const fd = new FormData();
    fd.append("PatientId",ID);
    fd.append("Name", Reports.name);
    fd.append("fileContent", Reports);
    // fd.append("PatientId",patient.PatientId);
    axios
      .post(
        "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/UploadDocuments",
        fd,
        {
          onUploadProgress: (ProgressEvent) => {
            console.log(
              "Upload Progress:" +
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                "%"
            );
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        if (res.data.status === "1") {
          Swal.fire({
            title: "Uploaded Successfully!",
            // text: 'Do you want to continue',
            icon: "success",
            // confirmButtonText: 'Cool'
          });
        }
      });
  };


  const [sets, setSets] = useState({
    PatientId:"",
    TotalNoOfUpperSets:"0",
    TotalNoOfLowerSets:"0"
  });

  const onChangeSets=(e)=>{
    setSets((pre)=>{return{...pre,PatientId:patient[0]?.PatientId}})

    const newdata={...sets}
    newdata[e.target.name]=e.target.value;
    
    setSets(newdata);
    setSets((pre)=>{return{...pre,PatientId:patient[0]?.PatientId}})

    console.log(newdata);
    // console.log(sets);
  }

  const handleSets=(e)=>{
    e.preventDefault();
    const SetsUrl="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddPatientTotalSets";
    

    // setSets(pre=>{
    //   return{...pre,PatientId:patient[0]?.PatientId}
    // })

    // let colid=document.getElementById("totalSet");

    
    fetch(SetsUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sets),
    })
      .then((res) => res.json())
      .then((result)=>{
        console.log(result);
        if(result.status===true){
          Swal.fire({
            title: "Uploaded Successfully!",
            // text: 'Do you want to continue',
            icon: "success",
            // confirmButtonText: 'Cool'
          });
          // colid.style.display="none"
        }
      })
      console.log(sets);
  }


  const [pVids, setpVids] = useState([])

const url2="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientVideo/"+ID


useEffect(() => {
  console.log(urlParams);
  fetch(url2)
    .then((res) => res.json())
    .then((vid) => {
      console.log(vid.Data);
      setpVids(vid.Data);
      // console.log(patient);
    });
}, []);
     
// useEffect(()=>{
//   console.log("p "+ Progress);
//   },[])


  let DoctorName = sessionStorage.getItem("DocName");
  return (
    <>
    
    {Role==="1"?<Row>
         <Col>
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
                  {/* <Nav.Link href="">
                 <Dropdown>
                 <Dropdown.Toggle
                        variant=""
                        id="dropdown-basic"
                        className="user noti-d"
                      >
                       <IoMdNotifications
                      fontSize={35}
                      color="#C49358"
                      className="notification"
                    /><Badge bg="secondary" className="badge-p">{notifyData?.TotalNotification}</Badge>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="noti-menu">
         
                       {
         
                        notifyData.Data?.map((noti)=>{
                          return(
                            <>
                            <Row className="m-1">
                              <Col>
                               <BsDot fontSize={40} color="green"/><span onClick={()=>{
                                if(noti?.NotificationType==="Add New Patient"){
                                  navigate(`/patient-list/${0}`)
                                }
                                if(noti?.NotificationType==="Video rejected"){
                                  navigate("/video-reject")
                                }
                               }}>{noti?.Notification}</span><span><Button variant="" style={{transform:"translateY(-0.2em)"}} onClick={()=>{
                                // console.log(noti.NotificationId);
                                const notifUrl="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/ReadNotification"
                                let notifId={
                                  NotificationId:noti.NotificationId
                                };
                                fetch(notifUrl,{
                                  method: "POST",
                 headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
                 },
                 body: JSON.stringify(notifId),
                                })
                                .then((res)=>res.json())
                                .then((result)=>{
                                  console.log(result);
                                  console.log("Id sent");
                                })
                               }}><BsTrash color="red"/></Button></span>
                              </Col>
                            </Row>
                            {notifyData?.TotalNotification>1?<Dropdown.Divider/>:""}
                            </>
                          );
                        })
                       }
                      </Dropdown.Menu>
                 </Dropdown>
         
                  </Nav.Link> */}
                  {/* <Nav.Link eventKey={2} href="#memes">
                    <FiMessageSquare
                      fontSize={30}
                      color="#C49358"
                      className="me-2 notification"
                    />
                  </Nav.Link> */}
                  <span className="address mx-3 m-0">
                    <img src={user} alt="" width={35} className="mt-2" />
                  </span>
                  <Nav.Link href="" className="p-0 mt-1">
                    <Dropdown className="out-dd mt-2">
                      <Dropdown.Toggle
                        variant=""
                        id="dropdown-basic"
                        className="user"
                      >
                       {AdminName}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {/* <Dropdown.Item href="#/action-1">
                          <CgProfile fontSize={25} />
                          <span className="px-3">Profile</span>
                        </Dropdown.Item>
                        <hr /> */}
                        <Dropdown.Item href="#/action-2">
                          <FiPower fontSize={25} />
                          <span className="px-3" onClick={()=>{
                            navigate("/");
                            sessionStorage.removeItem("Role");
                          }
                        }>Logout</span>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
                 </Navbar>
                {/* <Container fluid>
         
            <Row className="menuTab">
              <Col>
                <Card body className="border-0">
                  <Row>
                      <Col>
                      <Button variant="link" className="doc-tab">Doctor</Button>
                      </Col>
                      <Col>
                      <Button variant="link" className="prof-tab">Profile</Button>
         
                      </Col>
                    </Row>
                   <Nav className="justify-content-center">
                    <LinkContainer to="/add-doctor">
                      <Nav.Link className="doc-tab active">Doctor</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/doctor-profile">
                      <Nav.Link className="prof-tab">Profile</Nav.Link>
                    </LinkContainer>
                  </Nav>
                </Card>
              </Col>
            </Row>
                 </Container> */}
         
           <Container fluid>
            <Row className="menuTab">
              <Col>
                <Card body className="border-0">
                  <Nav className="justify-content-center">
                    <LinkContainer to={`/admin-dashboard`}>
                      <Nav.Link className="doc-tab active">
                      Dashboard
                      </Nav.Link>
                    </LinkContainer>
                    {/* <Nav.Link href="#deets" className="prof-tab">
                      Profile
                    </Nav.Link> */}
                  </Nav>
                </Card>
              </Col>
            </Row>
                 </Container>
         </Col>
       </Row>:""}

      <Container fluid>
        <Row className="justify-content-center">
          <Col md={10}>
            <Row
              className="mt-5 mb-5 p-5 pt-0"
              style={{
                backgroundColor: "white",
                boxShadow: "0px 0px 15px  #C49358",
                borderRadius: "8px",
              }}
            >
              <Col className="mt-5" md={10}>
                <Row className="mb-5">
                  <Col>
                    <p className="pd-title">Patient Details</p>
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col md={3} lg={3} sm={12} xs={12}>
                    <p className="mx-4 px-2 fs-5">
                      <b>Patient Potrait</b>
                    </p>
                    <Row>
                      <Stack direction="horizontal" gap={5}>
                        <img
                          src={patient[0]?.ProfileImagePath?patient[0]?.ProfileImagePath:"http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                          className="rounded"
                          style={{
                            boxShadow: "0px 5px 5px 5px #E8E8E8",
                            height: "200px",
                            width: "200px",
                          }}
                        ></img>
                      </Stack>
                    </Row>
                  </Col>
                  <Col md={9} lg={9} sm={12} xs={12}>
                    {/* <table style={{ width: "45em" }} className="mt-5">
                      <tr>
                        <th
                          style={{
                            width: "110px",
                            wordWrap: "break-word",
                            display: "inline-block",
                            marginTop: "10px",
                          }}
                        >
                          PatientId:
                        </th>
                        <td
                          contentEditable="false"
                          style={{
                            width: "100px",
                            wordWrap: "break-word",
                            display: "inline-block",
                            marginTop: "10px",
                          }}
                        >
                          {patient[0]?.PatientId}
                        </td>
                        <th
                          style={{
                            width: "110px",
                            wordWrap: "break-word",
                            display: "inline-block",
                            marginTop: "10px",
                          }}
                        >
                          Name:
                        </th>
                        <td
                          contentEditable="false"
                          style={{
                            width: "100px",
                            wordWrap: "break-word",
                            display: "inline-block",
                            marginTop: "10px",
                          }}
                        >
                          {patient[0]?.Name}
                        </td>
                        <th
                          style={{
                            width: "110px",
                            wordWrap: "break-word",
                            display: "inline-block",
                            marginTop: "10px",
                          }}
                        >
                          CaseNo:
                        </th>
                        <td
                          contentEditable="false"
                          style={{
                            width: "100px",
                            wordWrap: "break-word",
                            display: "inline-block",
                            marginTop: "10px",
                          }}
                        >
                          {patient[0]?.CaseNo}
                        </td>
                        <Button
                          variant=""
                          className="action-i edit editbtn mt-4"
                        >
                          Edit
                        </Button>
                        <th
                          style={{
                            width: "110px",
                            wordWrap: "break-word",
                            display: "inline-block",
                            marginTop: "10px",
                          }}
                        >
                          Gender:
                        </th>
                        <td
                          contentEditable="false"
                          style={{
                            width: "100px",
                            wordWrap: "break-word",
                            display: "inline-block",
                            marginTop: "10px",
                          }}
                        >
                          {patient[0]?.Gender}
                        </td>
                        <th
                          style={{
                            width: "110px",
                            wordWrap: "break-word",
                            display: "inline-block",
                            marginTop: "10px",
                          }}
                        >
                          DOB:
                        </th>
                        <td
                          contentEditable="false"
                          style={{
                            width: "100px",
                            wordWrap: "break-word",
                            display: "inline-block",
                            marginTop: "10px",
                          }}
                        >
                          {patient[0]?.DateofBirth}
                        </td>
                      </tr>
                    </table> */}
                    <Row className="mb-0 text-end">
                      <Col>
                      
                    <Button variant="" onClick={()=>navigate(`/edit-patient/${patient[0].PatientId}`)}><FaEdit fontSize={20}/></Button>
                      </Col>
                    </Row>


                    
                    <Row className="mt-3">
                      <Col>
                      <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Name : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.Name}</span></p>
                      </Col>
                      <Col>
                      <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Case Paper No : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.CaseNo}</span></p>
                      </Col>
                      <Col>
                      <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Gender : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.Gender}</span></p>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                    <Col>
                      <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>DOB : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.DateofBirth.split(' ')[0]}</span></p>
                      </Col>
                      <Col>
                      <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Mi : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.Mi}</span></p>
                      </Col>
                      <Col>
                      <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Doctor's Name : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.DoctorName}</span></p>
                      </Col>
                     
                     
                    </Row>
                    <Row className="mt-3">
                    <Col>
                      <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Clinic Address : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.ClinicAddress}</span></p>
                      <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Registration Date : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.RegDate}</span></p>
                      </Col>
                    </Row>
                  </Col>
                  {/* <Col>
                      <p>
                        <b>PatientId:</b>&nbsp;{patient[0]?.PatientId}
                      </p>
                      <p>
                        <b>Patient Name:</b>&nbsp;{patient[0]?.Name}
                      </p>
                    </Col>
                    <Col>
                      <p>
                        <b>Patient Case No:</b>&nbsp;{patient[0]?.CaseNo}
                      </p>
                      <p>
                        <b>Patient Gender:</b>&nbsp;{patient[0]?.Gender}
                      </p>
                    </Col>
                    <Col>
                      <p>
                        <b>Patient DOB:</b>&nbsp;{patient[0]?.DateofBirth}
                      </p>
                    </Col>
                    <Col>
                      {" "}
                      <Button variant="" className="action-i edit editbtn">
                        Edit
                      </Button>
                    </Col> */}
                </Row>
                <hr />
                
              </Col>
              {/* <Row className="mt-4 mb-5">
                  <Col md={{ span: 12 }}>
                    <p>
                      <b>View Patient Potrait</b>
                    </p>
                    <Row>
                      <Stack direction="horizontal" gap={5}>
                        <img
                          src={user}
                          className="rounded"
                          style={{
                            boxShadow: "0px 5px 5px 5px #E8E8E8",
                            height: "100px",
                            width: "100px",
                          }}
                        ></img>
                      </Stack>
                    </Row>
                  </Col>
                </Row> */}
                <Row>
                  <Col>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Clinical Conditions : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.ClinicalConditions}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>General Notes : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.GeneralNotes}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Chief Complaint : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.ChiefComplaint}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Quotation : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.Quotation}</span></p>
                  <Row>
                    <Col>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Exp. No. of Aligners : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.ExpectedNoOfAligners}</span></p>
                    
                    </Col>
                    <Col>
                    
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Product Type : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.ProductType==="1"?"Classic":"Premium"}</span></p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Amount Paid : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.AmountPaid}</span></p>
                    </Col>
                    <Col>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Date of Payment : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.DateOfPayment}</span></p>
                    
                    </Col>
                  </Row>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Upper Midline : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.UpperMidlineCentered}</span></p>
                  


                  </Col>
                  <Col>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Lower Midline : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.LowerMidlineCentered}</span></p>
                  

                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col>
                  <p style={{fontSize:"1.1rem",fontWeight:"bold"}}><u>Canine Relationship</u></p>
                  <p className="" style={{fontSize:"1rem",fontWeight:"bold"}}>Right class : <span style={{fontSize:"1.02rem",fontWeight:"normal"}}>{patient[0]?.CanineRelationshipRightClass}</span></p>
                  <p className="" style={{fontSize:"1rem",fontWeight:"bold"}}>Left class : <span style={{fontSize:"1.02rem",fontWeight:"normal"}}>{patient[0]?.CanineRelationshipLeftClass}</span></p>
                  
                  </Col>

                  <Col>
                  <p style={{fontSize:"1.1rem",fontWeight:"bold"}}><u>Molar Relationship</u></p>

                  <p className="" style={{fontSize:"1rem",fontWeight:"bold"}}>Right class : <span style={{fontSize:"1.02rem",fontWeight:"normal"}}>{patient[0]?.MolarRelationshipRightClass}</span></p>
                  <p className="" style={{fontSize:"1rem",fontWeight:"bold"}}>Left class : <span style={{fontSize:"1.02rem",fontWeight:"normal"}}>{patient[0]?.MolarRelationshipLeftClass}</span></p>
                  
                  </Col>
                  
                </Row>
                <Row>
                  <Col>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Endon : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.Endon}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Overbite : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.Overbite}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Overjet : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.Overjet}mm</span></p>
                  
                  </Col>
                </Row>
                <hr />
                <Row>
                  <p style={{fontSize:"1.3rem",fontWeight:"bold"}}><u>Instruction</u></p>
                  <Col>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Upper Midline : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.InstructionUpperMidline}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Lower Midline : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.InstructionLowerMidline}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Overjet : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.InstructionOverjet}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Overbite : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.InstructionOverbite}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Arch Form : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.InstructionArchForm}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Canine Relationship : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.InstructionCanineRelationship}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Molar Relationship : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.InstructionMolarRelationship}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Posterior Crossbite : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.InstructionPosteriorCrossbite}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>IPR : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.InstructionIPR}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Engagers & Attachments : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.InstructionEngagersAttachments}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Procline : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.InstructionProcline}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Expand : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.InstructionExpand}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Distalize : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.InstructionDistalize}</span></p>
                  
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Do Not Move These Teeth : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.DoNotMoveTheseTeeth}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Avoid Engagers & Attachments On These Teeths : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.AvidEngagersAttachmentsOnTheseTeeth}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>I Will Extract These Teeth Before Treatment : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.IWillExtractTheseTeethBeforeTreatment}</span></p>
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Leave These Spaces Open : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.LeaveTheseSpacesOpen}</span></p>
                  
                  
                  <p className="" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Additional Instructions : <span style={{fontSize:"1.05rem",fontWeight:"normal"}}>{patient[0]?.AdditionalInstruction}</span></p>
                  
                  </Col>
                </Row>
<hr />
              <Row className="mt-5 mb-5">
                <Col md={{ span: 12 }}>
                  <p className="fs-4">
                    <b>View Extraoral Photos</b>
                  </p>
                 <Row><Col md={2}>
                 <img
                      src={patient[0]?.FrontalRepose?patient[0]?.FrontalRepose:"http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                      className="rounded m-2"
                      style={{
                        boxShadow: "0px 5px 5px 5px #E8E8E8",
                        height: "100px",
                        width: "100px",
                      }}
                    ></img>
                 </Col>
                 
                 
                 <Col md={2}>
                 <img
                      src={patient[0]?.FrontalSmiling?patient[0]?.FrontalSmiling:"http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                      className="rounded m-2"
                      style={{
                        boxShadow: "0px 5px 5px 5px #E8E8E8",
                        height: "100px",
                        width: "100px",
                      }}
                    ></img>
                 </Col>

                 <Col md={2}>
                 <img
                      src={patient[0]?.ProfileRepose?patient[0]?.ProfileRepose:"http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                      className="rounded m-2"
                      style={{
                        boxShadow: "0px 5px 5px 5px #E8E8E8",
                        height: "100px",
                        width: "100px",
                      }}
                    ></img>
                 </Col>

                 <Col md={2}>
                 <img
                      src={patient[0]?.FrontOpImage?patient[0]?.FrontOpImage:"http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                      className="rounded m-2"
                      style={{
                        boxShadow: "0px 5px 5px 5px #E8E8E8",
                        height: "100px",
                        width: "100px",
                      }}
                    ></img>
                 </Col>
                 </Row>
                   
                   
                    
                    
                  {/* </Stack> */}

                  {
extra?.ExtraOralMoreImagesList && (
  <Row className="mt-4">
    {
      extra?.ExtraOralMoreImagesList.map((e,i)=>{
        return(
          <>
    <Col md={2}>
          <img
                            src={e.ImagePath}
                            className="rounded m-2"
                            style={{
                              boxShadow: "0px 5px 5px 5px #E8E8E8",
                              height: "100px",
                              width: "100px",
                            }}
                          ></img>
    </Col>
          </>
        )
      })
    }
  </Row>
)
                    }
                </Col>
              </Row>
              <Row className="mt-4 mb-5">
                <Col md={{ span: 12 }}>
                  <p className="fs-4">
                    <b>View Intraoral Photos</b>
                  </p>
                  {/* <Stack direction="horizontal" gap={5}> */}
                    <Row>
                      <Col md={2}>
                        <img
                          src={patient[0]?.BuccalRight?patient[0]?.BuccalRight:"http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                          className="rounded m-2"
                          style={{
                            boxShadow: "0px 5px 5px 5px #E8E8E8",
                            height: "100px",
                            width: "100px",
                          }}
                        ></img>
                      </Col>
                      <Col md={2}>
                        <img
                          src={patient[0]?.BuccalLeft?patient[0]?.BuccalLeft:"http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                          className="rounded m-2"
                          style={{
                            boxShadow: "0px 5px 5px 5px #E8E8E8",
                            height: "100px",
                            width: "100px",
                          }}
                        ></img>
                      </Col>
                      <Col md={2}>
                        <img
                          src={patient[0]?.BuccalFront?patient[0]?.BuccalFront:"http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                          className="rounded m-2"
                          style={{
                            boxShadow: "0px 5px 5px 5px #E8E8E8",
                            height: "100px",
                            width: "100px",
                          }}
                        ></img>
                      </Col>
                      <Col md={2}>
                        <img
                          src={patient[0]?.OcclussalUpper?patient[0]?.OcclussalUpper:"http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                          className="rounded m-2"
                          style={{
                            boxShadow: "0px 5px 5px 5px #E8E8E8",
                            height: "100px",
                            width: "100px",
                          }}
                        ></img>
                      </Col>
                      <Col md={2}>
                        <img
                          src={patient[0]?.OcclussalLower?patient[0]?.OcclussalLower:"http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                          className="rounded m-2"
                          style={{
                            boxShadow: "0px 5px 5px 5px #E8E8E8",
                            height: "100px",
                            width: "100px",
                          }}
                        ></img>
                      </Col>
                    </Row>
                  {/* </Stack> */}

                  {
extra?.IntraOralMoreImagesList && (
  <Row className="mt-4">
    {
      extra?.IntraOralMoreImagesList.map((e,i)=>{
        return(
          <>
    <Col md={2}>
          <img
                            src={e.ImagePath}
                            className="rounded m-2"
                            style={{
                              boxShadow: "0px 5px 5px 5px #E8E8E8",
                              height: "100px",
                              width: "100px",
                            }}
                          ></img>
    </Col>
          </>
        )
      })
    }
  </Row>
)
                    }
                </Col>
              </Row>
              <Row className="mt-4 mb-5">
                <Col md={{ span: 12 }}>
                  <p className="fs-4">
                    <b>Radiographs</b>
                  </p>
                  <Stack direction="horizontal" gap={5}>
                    <img
                      src={patient[0]?.XrayLeft?patient[0]?.XrayLeft:"http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                      className="rounded"
                      style={{
                        boxShadow: "0px 5px 5px 5px #E8E8E8",
                        height: "100px",
                        width: "100px",
                      }}
                    ></img>
                    <img
                        src={patient[0]?.XrayRight?patient[0]?.XrayRight:"http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                        className="rounded"
                        style={{
                          boxShadow: "0px 5px 5px 5px #E8E8E8",
                          height: "100px",
                          width: "100px",
                        }}
                      ></img>
                  </Stack>
                </Col>
              </Row>
              <Row className="mb-5">
                  <Col>
                  <p className="fs-4">
                      <b>Videos</b>{videoData[0]?.CreateDate && videoData[0]?.DoctorUploadingVideo?<span style={{fontSize:"18px"}} className="mx-2">- <u>Uploaded by {videoData[0]?.DoctorUploadingVideo} on {videoData[0]?.CreateDate.split(" ")[0]}</u>.</span>:""}
                    </p>
                    <Stack direction="horizontal" gap={5} className="vid-row">
                      {/* <img
                        src={user}
                        className="rounded"
                        style={{
                          boxShadow: "0px 5px 5px 5px #E8E8E8",
                          height: "100px",
                          width: "100px",
                        }}
                      ></img> */}
                      {
                        pVids?.map((item,index)=>{
                          return(
                            <>
                            
                            <video width="320" height="240" controls preload="auto">
  <source src={item?.PathVideo} type="video/mp4"/>
  {/* <source src={item?.PathVideo} type="video/ogg"></source> */}
  
</video>
                            </>
                          )
                        })
                      }
                        {/* <video width="320" height="240" controls>
  <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4"/>

                      </video> */}
                    </Stack>
                  </Col>
                </Row>
                


            </Row>
          </Col>
        </Row>
      </Container>
      {/* </Container> */}
    </>
  );
}
export default PatientList;
