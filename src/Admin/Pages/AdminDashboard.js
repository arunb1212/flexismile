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
    Badge,
    Form,
  } from "react-bootstrap";
  import "../../Doctor/Styles/Dashboard.css";
  import user from "../../Assets/user.png";
  import logo from "../../Assets/Logoremovebg.png";
  import { IoMdNotifications } from "react-icons/io";
  import { FiMessageSquare, FiPower } from "react-icons/fi";
  import { FaBars } from "react-icons/fa";
  import { BiRupee } from "react-icons/bi";
  import { BsDot, BsTrash } from "react-icons/bs";


  import { CgProfile } from "react-icons/cg";
  import ProgressBar from "react-bootstrap/ProgressBar";
  import advertisement from "../../Assets/advertisement.png";
  import {LinkContainer} from 'react-router-bootstrap';
  import patientimg from "../../Assets/mock1.jpg";
  import {useNavigate,useParams} from "react-router-dom";
  import handover from "../../Assets/hanover.png"


function AdminDashboard(){
    const tglContent = () => {
        let Menu = document.querySelector(".menuTab");
    
        if (Menu.classList.contains("collapsed")) {
          Menu.classList.remove("collapsed");
        } else {
          Menu.classList.add("collapsed");
        }
      };
    
      const navigate=useNavigate();
    const [Admin, setAdmin] = useState([]);
    //   const urlParams = useParams()
    //   console.log(urlParams);
    //   const ID=urlParams.DoctorUserId;
        const url ="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetAdminDashboard";
      
      useEffect(() => {
        // console.log(urlParams);
        fetch(url)
          .then((res) => res.json())
          .then((det) => {
            console.log(det.Data);
            setAdmin(det.Data);
            // console.log(patient);
          });
      }, []);

let DoctorUser=sessionStorage.getItem("DocUserId");
let AdminName=sessionStorage.getItem("DocName")



const [notifyData, setNotifyData] = useState([]);

const notifyUrl="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetNotification/1/1";
useEffect(()=>{
  fetch(notifyUrl).then((res)=>res.json())
  .then((notData)=>{
    console.log(notData);
    setNotifyData(notData);
// console.log(notifyData);
  })
},[])



let apiurl=`https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientSetDoctorRequestlist/0/0/0`;

const [patientwisePayment, setpatientwisePayment] = useState([]);


useEffect(()=>{
fetch(apiurl)
.then((res)=>res.json())
.then((result)=>{
  console.log(result.Data);
  setpatientwisePayment(result.Data)
})
},[])






    
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
                     <Dropdown.Item href="" className="p-0 px-1">
                    
                    <img src={handover} alt="" srcset="" width={50}/>
                      <span className="" onClick={()=>{
                        navigate("/handover");
                        // sessionStorage.removeItem("Role");
                      }
                    }>Handover</span>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2" onClick={()=>{
                      sessionStorage.removeItem("Role");
                      sessionStorage.removeItem("selDocId");
                      navigate("/");
                      }
                    }>
                      <FiPower fontSize={25} />
                      <span className="px-3" >Logout</span>
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
      <Container>
            <Row>
              <Col md={ 6 }>
                <Row className="mt-4">
                  <Col
                    md={{ span: 5, offset: 1 }}
                    xs={{ span: 10, offset: 1 }}
                    style={{ backgroundColor: "#C49358", color: "white", cursor:"pointer" }}
                    className="mb-1"
                    onClick={()=>navigate(`/view-doctors`)}
                  >
                    <p className="mt-4">
                      Total Doctors <span style={{ float: "right" }}>{Admin[0]?.TotalDoctors}</span>
                    </p>
                    <ProgressBar now={Admin[0]?.TotalDoctors} className="mt-5 mb-4" />
                  </Col>
                  <Col
                    md={{ span: 5, offset: 1 }}
                    xs={{ span: 10, offset: 1 }}
                    style={{ backgroundColor: "#C49358", color: "white", cursor:"pointer"}}
                    className="mb-1"
                    onClick={()=>navigate(`/patient-list/${0}`)}
                  >
                    <p className="mt-4">
                      Total Patients{" "}
                      <span style={{ float: "right" }}>{Admin[0]?.TotalPatients}</span>
                    </p>
                    <ProgressBar now={Admin[0]?.TotalPatients} className="mt-5 mb-4" />
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col
                    md={{ span: 5, offset: 1 }}
                    xs={{ span: 10, offset: 1 }}
                    style={{ backgroundColor: "#C49358", color: "white", cursor:"pointer"  }}
                    className="mb-1"
                    onClick={()=>navigate("/ongoing-report")}
                  >
                    <p className="mt-4">
                      Ongoing Treatments Report
                      <span style={{ float: "right" }}>{Admin[0]?.Ongoingtreatments}</span>
                    </p>
                    <ProgressBar now={Admin[0]?.Ongoingtreatments} className="mt-5 mb-4" />
                  </Col>
                  <Col
                    md={{ span: 5, offset: 1 }}
                    xs={{ span: 10, offset: 1 }}
                    style={{ backgroundColor: "#C49358", color: "white", cursor:"pointer"  }}
                    className="mb-1"
                    onClick={()=>navigate("/payment-details")}
                  >
                    <p className="mt-4">
                     Collection <span style={{ float: "right" }}><BiRupee className="mb-1" fontSize={20}/> {Admin[0]?.Collection}</span>
                    </p>
                    <ProgressBar now={Admin[0]?.Collection} className="mt-5 mb-4" />
                  </Col>
                </Row>

                <Row className="mt-5">
                <Col
                    md={{ span: 5, offset: 1 }}
                    xs={{ span: 10, offset: 1 }}
                    style={{ backgroundColor: "#C49358", color: "white", cursor:"pointer"  }}
                    className="mb-1 p-5 pt-0"
                    onClick={()=>navigate("/sets-report")}
                  >
                    <p className="mt-4">
                     Aligner's Sets Report 
                     {/* <span style={{ float: "right" }}> {Admin[0]?.Collection}</span> */}
                    </p>
                    {/* <ProgressBar now={Admin[0]?.Collection} className="mt-5 mb-4" /> */}
                  </Col>
                <Col
                    md={{ span: 5, offset: 1 }}
                    xs={{ span: 10, offset: 1 }}
                    style={{ backgroundColor: "#C49358", color: "white", cursor:"pointer"  }}
                    className="mb-1 p-5 pt-0"
                    onClick={()=>navigate("/request-list")}
                  >
                    <p className="mt-4">
                     Request List 
                     {/* <span style={{ float: "right" }}> {Admin[0]?.Collection}</span> */}
                    </p>
                    {/* <ProgressBar now={Admin[0]?.Collection} className="mt-5 mb-4" /> */}
                  </Col>
                </Row>

                {/* <Row className="mt-5">
                <Col
                    md={{ span: 5, offset: 1 }}
                    xs={{ span: 10, offset: 1 }}
                    style={{ backgroundColor: "#C49358", color: "white", cursor:"pointer"  }}
                    className="mb-1 p-5 pt-0"
                    onClick={()=>navigate("/pnt-pay")}
                  >
                    <p className="mt-4">
                     Patient-Wise payment 
                    </p>
                  </Col>
                </Row> */}
                     {/* <span style={{ float: "right" }}> {Admin[0]?.Collection}</span> */}
                    {/* <ProgressBar now={Admin[0]?.Collection} className="mt-5 mb-4" /> */}
              </Col>
              <Col md={5} className="mt-5 mx-0 mx-md-5">
                {/* <img src={advertisement} className="w-100 mb-3"></img> */}
                <Button
                  className="w-100"
                  style={{ backgroundColor: "#C49358" }}
                  onClick={()=>navigate("/add-doctor")}
                >
                  Add Doctors
                </Button>

                {/* <Button
                  className="mt-5 w-100"
                  style={{ backgroundColor: "#C49358" }}
                  onClick={()=>navigate(`/view-doctors`)}
                //   onClick={()=>navigate(`/patient-list/${DoctorUser}`)}

                >
                  View Doctors
                </Button> */}

                <Button variant="" className="mt-5 w-100"
                  style={{ backgroundColor: "#C49358",color:"white" }}
                  onClick={()=>navigate(`/patient-list-for-sets/${0}`)}>Allocate Aligners</Button>


<p className="mt-4 notifyTitle pt-3 m-0">Notifications<span className="mx-2">({notifyData?.TotalNotification})</span></p>
                  <Card className="notificCard p-2">
                    {
                      notifyData? notifyData.Data?.map((notify,i)=>{
                        return(
                          <>
                          
                          <p><BsDot fontSize={40} color="green"/><span className="mx-2">{notify?.Notification}</span></p>
                          {notifyData?.TotalNotification>1?<hr className="m-0"/>:""}
                          </>
                        )
                      }):""
                    }
                  </Card>
              </Col>
            </Row>

           
            {/* <Row className="mb-5"> */}
              {/* <Col md={{ span: 6 }}>
                <Row className="mt-5">
                  <Col
                    md={{ span: 8, offset: 1 }}
                    style={{ boxShadow: "0px 0px 5px 5px #dee2e6",backgroundColor:"#ebdbc6" }}
                    className="p-3"
                  >
                    <img
                      src="https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?b=1&k=20&m=922962354&s=170667a&w=0&h=gpsD4Kn3xGxc_CMswNa_twx-Nxf9og_ipyV_2rjCWj4="
                      className="w-50 p-3"
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "block",
                      }}
                    ></img>
                    <p className="text-center">
                      <span style={{ fontWeight: "bold", color: "#077396" }}>
                      </span>
                      <br />
                      <span style={{ fontWeight: "bold" }}>Orthodontist</span>
                    </p>
                  </Col>
                </Row>
              </Col> */}
              {/* <Col md={{ span: 6 }}>
                <Row className="mt-5">
                  <Col
                    md={{ span: 11 }}
                    style={{ boxShadow: "0px 0px 5px 5px #dee2e6",backgroundColor:"#ebdbc6"}}
                    className="p-5"
                  >
                    <p style={{ fontWeight: "bold" }}>Practice Name: </p>
                    <p style={{ fontWeight: "bold" }}>License # : </p>
                    <p style={{ fontWeight: "bold" }}>
                     Address: 
                    </p>
                    <p style={{ fontWeight: "bold" }}>Phone no : +91 </p>
                    <p style={{ fontWeight: "bold" }}>Email Id : </p>
                  </Col>
                </Row>
              </Col> */}
            {/* </Row> */}
      </Container>

      </>  
    );
}


export default AdminDashboard;