import React,{useState,useEffect} from "react";
import {useNavigate,useParams} from "react-router-dom";
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
} from "react-bootstrap";
import user from "../../Assets/user.png";
import logo from "../../Assets/Logoremovebg.png";
import { FaBars } from "react-icons/fa";
import { FiMessageSquare, FiPower } from "react-icons/fi";
import {LinkContainer} from 'react-router-bootstrap';
// import {useNavigate,useParams} from "react-router-dom";
import DataTable from "react-data-table-component";

function SetsReport(){
    const tglContent = () => {
        let Menu = document.querySelector(".menuTab");
    
        if (Menu.classList.contains("collapsed")) {
          Menu.classList.remove("collapsed");
        } else {
          Menu.classList.add("collapsed");
        }
      };

      const navigate=useNavigate();

let AdminName=sessionStorage.getItem("DocPracName")
let doctorId=sessionStorage.getItem("DocUserId")

const [search, setSearch] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);


  const [reports, setReports] = useState([])

  const url=`https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetAllPatientSetReport/0/0/${doctorId}`;


  useEffect(()=>{
    fetch(url).then((res)=>res.json())
    .then((report)=>{
      console.log(report.Data);
      setReports(report.Data);
      setFilteredNames(report.Data);
    }) 
  },[])

const columns = [
    {
      name: "Patient Code",
      selector: (row) => row.PatientId,
      sortable: true,
    },
    {
      name: "Patient Name",
      selector: (row) => row.PatientName,
      sortable: true,
    },
    {
      name: "CaseNo",
      selector: (row) => row.CaseNo,
      sortable: true,
    },
    // {
    //   name: "Name",
    //   selector: (row) => row.Name,
    // },
    // {
    //   name: "Doctor Name",
    //   selector: (row) => row.DoctorName,
    //   sortable: true,
    // },
    {
      name: "Total No. of Aligners",
      selector: (row) => row.TotalSets,
      sortable: true,
    },
    {
      name: "Dispatched Aligners",
      selector: (row) => row.DispatchedSets,
      sortable: true,
    },
    
    {
      name: "Delivered Aligners",
      selector: (row) => row.DeliveredSets,

    },
    {
        name: "Pending Aligners",
        selector: (row) => row.PendingSets,
  
    },
   
    // {
    //   // name: `${RoleId==="1"?"Action":""}`,
    //   cell: row => RoleId==="1"? <button className="edit-patient-btn" onClick={()=>{navigate(`/payment/${row?.PatientId}`)
    // sessionStorage.setItem("Pid",row.PatientId)
    // }}>Payment</button>:""
    // }
  ];
  



  useEffect(() => {
    const result = reports.filter((item) => {
      const s = search.toLowerCase();
      return (
        (item.PatientId?.toString() || "").toLowerCase().includes(s) ||
        (item.PatientName || "").toLowerCase().includes(s) ||
        (item.DoctorName || "").toLowerCase().includes(s)
      );
    });
    setFilteredNames(result);
  }, [search]);
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
              <Nav.Link href="">
      {/* <Dropdown>
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
      </Dropdown> */}
                

              </Nav.Link>
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
                    <Dropdown.Item href="#/action-2" onClick={()=>{
                        navigate("/");
                        sessionStorage.removeItem("Role");
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
                <LinkContainer to={`/doctor-dashboard/${doctorId}`}>

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
          <Row className="m-1 m-md-0 mt-5 mt-md-5" style={{ backgroundColor: "white" }}>
            <Col>
              <Row className="">
                <Col
                  className=""
                  style={{ border: "solid 0.1em lightgray" }}
                >
                  <DataTable
                    columns={columns}
                    data={filteredNames}
                    pagination
                    fixedHeader
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                      <input
                        type="text"
                        className="w-25 form-control mt-4 mb-4"
                        placeholder="Search by Code, Name, Doctor..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      ></input>
                    }
                  />
                </Col>
              </Row>
            
            </Col>
          </Row>
        </Container>
        </>
    );
}


export default SetsReport;