import React,{useState,useEffect} from "react";
import {
    Container,
    Row,
    Col,
    Nav,
    Button,
    Navbar,
    Dropdown,
    Card,
    Modal,
    Form,
    Accordion,
    Stack
  } from "react-bootstrap";
import user from "../../Assets/user.png";
// import user from "../../Assets/user.png";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import "../Styles/PatientDetails.css"

import logo from "../../Assets/Logoremovebg.png";
import { IoMdNotifications } from "react-icons/io";
import { FiMessageSquare, FiPower } from "react-icons/fi";
import { FaBars,FaEdit } from "react-icons/fa";
import $ from "jquery";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";




function PlanDetails(){
  const [patient, setPatient] = useState([]);
  const [extra, setextra] = useState([])
  const navigate = useNavigate();
  const urlParams = useParams()


  const [videoData, setvideoData] = useState([])
console.log(urlParams);
const ID=urlParams.PatientId;
  const url ="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientAllList/"+ID;

useEffect(() => {
  console.log(urlParams);
  fetch(url)
    .then((res) => res.json())
    .then((det) => {
      console.log(det.Data);
      setPatient(det.Data);
      setvideoData(det?.PatientVideoList)
      setextra(det)
      console.log(patient);
    });
}, []);



const [pVids, setpVids] = useState([])

const url2="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientVideo/"+ID


useEffect(() => {
  console.log(urlParams);
  fetch(url2)
    .then((res) => res.json())
    .then((vid) => {
      console.log("video data",vid.Data);
      setpVids(vid.Data);
      // console.log(patient);
    });
}, []);




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



  let DoctorName=sessionStorage.getItem("DocPracName");
  let DoctorUserID=sessionStorage.getItem("DocUserId")


  const [reports, setReports] = useState([]);

  const repurl="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientDocuments/"+ID;

  useEffect(() => {
    console.log(urlParams);
    fetch(repurl)
      .then((res) => res.json())
      .then((reports) => {
        console.log(reports.Data);
        setReports(reports.Data);
        // console.log(patient);
      });
  }, []);


  const [vidChange, setVidChange] = useState({
    PatientVideoId:"",
    DoctorId:"",
    ConfirmNotes:""
  })

  const [cNotes, setcNotes] = useState("");



  // let cnotes=sessionStorage.getItem("ConfirmNotes");

//   useEffect(()=>{
// console.log("cnotes below");
// console.log(cnotes);
//   },[cnotes])

let obj1={
  VideoConfirmRejected:[]
}
  pVids?.map((rejVid)=>{
    let a={
      PatientVideoId:rejVid?.PatientVideoId,
      DoctorId:DoctorUserID,
      ConfirmNotes:cNotes
    }

    obj1.VideoConfirmRejected.push(a);
  })
  // console.log(obj1);


  const handleVidChange=(e)=>{
    // setVidChange((pre)=>{
    //   return{
    //     ...pre,
    //     ConfirmNotes:e.target.value
    //   }
    // });

    let a=e.target.value;
    // sessionStorage.setItem("ConfirmNotes",a);
    setcNotes(a);

    
    

    
    console.log(obj1);
  }
  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  

  // if(pVids.length<1){
  //   document.getElementById("vid-rId").style.height="100px"
  // }


  

    return(
        <>
<Container fluid>
  <Row className="justify-content-center">
    <Col md={10}>
      <Row
        className="mt-5 mb-5 p-5"
        style={{
          backgroundColor: "white",
          boxShadow: "0px 0px 15px  #C49358",
          borderRadius: "8px",
        }}
      >
        <Row className="mt-4">
          <Col md={4}>
            <Form.Group>
              <Form.Label style={{fontWeight:"bold"}}>Select Plan</Form.Label>
              <Form.Select>
                <option>Plan 1</option>
                <option>Plan 2</option>
                <option>Plan 3</option>
                <option>Plan 4</option>
                <option>Plan 5</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* EXTRAORAL PHOTOS */}
        <Row className="mt-4 mb-5">
          <Col md={12}>
            <p className="fs-4"><b>View Extraoral Photos</b></p>

            <Row>
              <Col md={2}>
                <img
                  src={patient[0]?.FrontalRepose || "http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                  className="rounded m-2"
                  style={{ height: "100px", width: "100px" }}
                />
              </Col>

              <Col md={2}>
                <img
                  src={patient[0]?.FrontalSmiling || "http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                  className="rounded m-2"
                  style={{ height: "100px", width: "100px" }}
                />
              </Col>

              <Col md={2}>
                <img
                  src={patient[0]?.ProfileRepose || "http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                  className="rounded m-2"
                  style={{ height: "100px", width: "100px" }}
                />
              </Col>

              <Col md={2}>
                <img
                  src={patient[0]?.FrontOpImage || "http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"}
                  className="rounded m-2"
                  style={{ height: "100px", width: "100px" }}
                />
              </Col>
            </Row>
            

            {extra?.ExtraOralMoreImagesList && (
              <Row className="mt-4">
                {extra.ExtraOralMoreImagesList.map((e, i) => (
                  <Col md={2} key={i}>
                    <img
                      src={e.ImagePath}
                      className="rounded m-2"
                      style={{ height: "100px", width: "100px" }}
                    />
                  </Col>
                ))}
              </Row>
            )}
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

                <Row>
                  <Col>
                  <p className="fs-4">
                      <b>Videos</b>{videoData[0]?.CreateDate && videoData[0]?.DoctorUploadingVideo?<span style={{fontSize:"18px"}} className="mx-2">- <u>Uploaded by {videoData[0]?.DoctorUploadingVideo} on {videoData[0]?.CreateDate.split(" ")[0]}</u>.</span>:""}
                    </p>
                    <Row className="vid-row2" id="vid-rId">
                     
                      <Col>
                        {(() => {
                          const allVideos = [];
                          const seen = new Set();
                          const candidates = [...(pVids || []), ...(videoData || [])];
                          for (const item of candidates) {
                            if (!item) continue;
                            const url = item.PathVideo || item.ParthVideo;
                            if (!url || item.PatientVideoId === 0) continue;
                            const filename = url.split("/").pop();
                            const key = item.PatientVideoId || filename;
                            if (key && !seen.has(key)) {
                              seen.add(key);
                              allVideos.push(item);
                            }
                          }

                          if (allVideos.length === 0) {
                            return (
                              <Row className="d-flex p-4 justify-content-center align-items-center">
                                <Col>
                                  <p className="text-center fs-3">Videos are not available/uploaded.</p>
                                </Col>
                              </Row>
                            );
                          }

                          return (
                            <div className="d-flex flex-wrap gap-3">
                              {allVideos.map((item, index) => {
                                const vUrl = item?.PathVideo || item?.ParthVideo;
                                return (
                                  <div key={index} className="mb-3 p-2 border rounded shadow-sm bg-light" style={{ width: "340px" }}>
                                    <video
                                      width="320"
                                      height="240"
                                      controls
                                      preload="metadata"
                                      className="vid-items rounded"
                                      src={vUrl}
                                    />
                                    <br />
                                    {item?.IsConfirm === "YES" ? (
                                      <p className="vid-status text-center mt-2">Video Approved!</p>
                                    ) : ""}
                                    {item?.IsConfirm === "No" ? (
                                      <p className="vid-status2 text-center mt-2">Video Rejected!</p>
                                    ) : ""}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })()}  
                      </Col>
                      
                    </Row>
                  </Col>
                </Row>
                <Row className="mt-5">
  <Col>
    <p className="fs-4"><b>IPR</b></p>

    {
      patient[0]?.RequiredIPR === "Yes" || patient[0]?.RequiredIPR === "" || !patient[0]?.RequiredIPR || patient[0]?.InstructionIPR === "Yes" || reports?.some(r => r?.PathDocuments) ? (

        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>View IPR</Accordion.Header>

            <Accordion.Body>

              {reports?.length > 0 && reports.some(r => r?.PathDocuments) ? (

                <div className="text-center">
                  <object
                    data={reports.find(r => r?.PathDocuments)?.PathDocuments}
                    type="application/pdf"
                    width="100%"
                    height="500px"
                    className="rounded border"
                  >
                    <p>
                      PDF not supported.
                      <a
                        href={reports.find(r => r?.PathDocuments)?.PathDocuments}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download PDF
                      </a>
                    </p>
                  </object>
                </div>

              ) : (

                <div className="text-center py-5">
                  <p className="fs-5 text-muted">
                    No IPR chart available/uploaded.
                  </p>
                </div>

              )}

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      ) : (

        <p className="fs-5 text-muted">
          IPR is not required for this patient.
        </p>

      )
    }

  </Col>
</Row>

                <Row className="mt-5">
                                            <Col md={2}>
                            <Button variant="" className="btn approval-btn mx-0 mt-3 mb-3" 
                            >Approve</Button>
                            
                            
                          </Col>
                          <Col md={2}>



                         <Button variant="" className="mx-0 mt-3 mb-3 rej-btn px-4" onClick={()=>{
                            handleShow();
                           



                           
                            // setVidChange((pre)=>{
                            //   return{...pre,PatientVideoId:item?.PatientVideoId,
                            //   DoctorId:DoctorUserID
                            //   }
                            // })

                            // console.log(vidChange);
                           

                          }}>Reject</Button>
                          </Col>
                </Row>
               
                </Row>
               
                </Col></Row></Container>
        </>
    );
}

         
export default PlanDetails;