import React, { useState, useEffect } from "react";
import "../Styles/Handover.css";
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
  Spinner,
} from "react-bootstrap";
import user from "../../Assets/user.png";
import logo from "../../Assets/Logoremovebg.png";
import { FaBars, FaEraser } from "react-icons/fa";
import { FiMessageSquare, FiPower } from "react-icons/fi";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import DataTable from "react-data-table-component";

import axios from "axios";

function Handover() {
  const tglContent = () => {
    let Menu = document.querySelector(".menuTab");

    if (Menu.classList.contains("collapsed")) {
      Menu.classList.remove("collapsed");
    } else {
      Menu.classList.add("collapsed");
    }
  };
const [loading, setLoading] = useState(false)


  const navigate = useNavigate();

  let AdminName = sessionStorage.getItem("DocName");
  let doctorId = sessionStorage.getItem("DocUserId");
  let doctorEmail = sessionStorage.getItem("DocEmail");
  const [search, setSearch] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const url =
    "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetDoctorList/0/0";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((list) => {
        console.log(list.Data);
        setDoctors(list.Data);
        // setInactive({Doctorid:list.DoctorID})
        // let status=document.getElementById("stat").innerText
        // console.log(status);
      });
    }, []);
    const ID = sessionStorage.getItem("selDocId");
    // const [docId, setDocId] = useState("")
    const [patients, setPatient] = useState([]);

    const [data, setData] = useState({
      SendDoctorId: "",
      ReceivedDoctorId:"",
      
     
    });

 

  



  

  const searchPatient = () => {

    setLoading(true)

    console.log(ID);
    const purl=`https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientDetailsList/0/0/${ID}`
    fetch(purl)
    .then((res)=>res.json())
    .then((patients)=>{
      setLoading(false)

      console.log(patients.Data);
      setPatient(patients.Data);
      setFilteredNames(patients.Data);
    })
  };






  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    setData((pre) => {
      return {
        ...pre,
        SendDoctorId: item.DoctorID,
      };
    });
    console.log(item)
    sessionStorage.setItem("selDocId",item.DoctorID)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (

      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.DoctorID}</span> */}
        <span style={{ display: 'block', textAlign: 'left' ,padding:"5px"}}> {item.PracticeEmail}</span>
      </>
    )
  }





















  const handleOnSearch1 = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover1 = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect1 = (item) => {
    // the item selected
    setData((pre) => {
      return {
        ...pre,
        ReceivedDoctorId: item.DoctorID,
      };
    });
    console.log(item)
    // sessionStorage.setItem("selDocId",item.DoctorID)
  }

  const handleOnFocus1 = () => {
    console.log('Focused')
  }

  const formatResult1 = (item) => {
    return (

      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.DoctorID}</span> */}
        <span style={{ display: 'block', textAlign: 'left' ,padding:"5px"}}> {item.PracticeEmail}</span>
      </>
    )
  }



  const columns = [
    {
      name: "Patient Code",
      
      selector: (row) => row.PatientId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "CaseNo",
      selector: (row) => row.CaseNo,
      sortable: true,
    },
    {
      name: "D.O.B",
      selector: (row) => row.DateofBirth,
      sortable: true,
    },
  ]


  useEffect(() => {
    const result = patients.filter((item) => {
      const s = search.toLowerCase();
      return (
        (item.PatientId?.toString() || "").toLowerCase().includes(s) ||
        (item.CaseNo || "").toLowerCase().includes(s) ||
        (item.Name || "").toLowerCase().includes(s)
      );
    });
    setFilteredNames(result);
  }, [search]);




  useEffect(()=>{
console.log(data);
  },[data])






  const handleSubmit=(e)=>{
    e.preventDefault();

   const handoverUrl="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddHandoverPatient";

   fetch(handoverUrl,{
    method:"POST",
    headers:{
      Accept: "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
   .then((res)=>res.json())
   .then((response)=>{
    console.log(response);
   })

  }
  return (
    <>
      {/* <ul>
    {
      patients.map((u)=>(
          <li>{u.Name}</li>
          ))
        }
        </ul> */}
      <Navbar collapseOnSelect expand="lg" className="navb">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="" className="hover:scale-110" width={120} />
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
                    <Dropdown.Item href="#/action-2"  onClick={() => {
                          navigate("/");
                          sessionStorage.removeItem("Role");
                        }}>
                      <FiPower fontSize={25} />
                      <span
                        className="px-3"
                       
                      >
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
                <LinkContainer to={`/admin-dashboard`}>
                  <Nav.Link className="doc-tab active">Dashboard</Nav.Link>
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
        <Row
          style={{ backgroundColor: "white" }}
          className="mt-5 mb-5 pb-5 hO-crd"
        >
          <Col md={{ span: 12 }} xs={{ span: 12 }}>
            <Row className="m-2">
              <Col>
                <p className="hO-t mt-2">Clinic Handover</p>
                <hr />
                <Form>
                  <Row className="mt-2">
                    <Col md={4}>
                      {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Handover Clinic</Form.Label> */}
                        {/* <Form.Control type="email" placeholder={doctorEmail} name="From" value={data.From} onChange={onChange} disabled/> */}
                        {/* <Form.Select
                          aria-label="Default select example"
                          name="handoverClinic"
                          value={data?.handoverClinic}
                          onChange={(e) => onChange(e)}
                        >
                          <option></option>
                          {doctors.map((doctor, index) => {
                            return (
                              <option value={doctor?.PracticeEmail} id="cliOp" key={index} >
                                {doctor?.PracticeEmail} 
                              <span id="setdid" onChange={(e) => onChange(e)}>{doctor?.DoctorID}</span>
                              </option>
                            );

                            
                          })
                          
                          }
                          \
                        </Form.Select>
                      </Form.Group> */}

                      <Form.Group className="pt-1">
                        <Form.Label>Handover Clinic</Form.Label>

 <ReactSearchAutocomplete
            items={doctors}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            // autoFocus
            fuseOptions={{ keys: ["DoctorID","PracticeEmail"] }}
            // necessary, otherwise the results will be blank
            resultStringKeyName="PracticeEmail"
            formatResult={formatResult}
            
            />
            </Form.Group>

                    </Col>
                    <Col className="pt-3">
                      {/* <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>To</Form.Label>
        <Form.Control type="email" placeholder="" name="To" value={data.To} onChange={onChange}/>
       
      </Form.Group> */}

                      <Button
                        variant=""
                        onClick={() => searchPatient()}
                        className="hSrch-btn mt-4"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                  <span>{loading && <Spinner animation="border" role="status"/>}</span>
{
  filteredNames && (
<Row className="mt-5">
                    <Col>
                    <DataTable
                    columns={columns}
                    data={filteredNames}
                    // expandableRows
                    // expandOnRowClicked
                    pagination
                    fixedHeader
                    className="mt-5"
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                      <input
                        type="text"
                        className="w-25 form-control mt-4 mb-4"
                        placeholder="Search by Code, Name, Case No..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      ></input>
                    }
                  />
                    </Col>
                  </Row>
  )
}

{
  patients.length>0?<Row>
  <Col md={4}>
  <Form.Group>
    <Form.Label>Receiving Clinic</Form.Label>
    <ReactSearchAutocomplete
            items={doctors}
            onSearch={handleOnSearch1}
            onHover={handleOnHover1}
            onSelect={handleOnSelect1}
            onFocus={handleOnFocus1}
            // autoFocus
            fuseOptions={{ keys: ["DoctorID","PracticeEmail"] }}
            // necessary, otherwise the results will be blank
            resultStringKeyName="PracticeEmail"
            formatResult={formatResult1}
            
            />
  </Form.Group>
  </Col>
</Row>:""
}


                  

                  <Row className="text-center mt-4">
                    <Col>
                      <Button variant="" className="hO-sub" onClick={handleSubmit}>
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Handover;
