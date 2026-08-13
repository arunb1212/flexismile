import React, { useEffect, useState } from "react";
import "../Styles/DoctorsList.css";
import {
  Button,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
  Dropdown,
  Card,
  Form,
  Table,
  ToastHeader,
} from "react-bootstrap";
import { IoMdNotifications } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";

import { FiMessageSquare, FiPower } from "react-icons/fi";
import {HiCurrencyRupee} from "react-icons/hi";
import { FaBars, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import logo from "../../Assets/Logoremovebg.png";
import user from "../../Assets/user.png";
import ReactHTMLTableToExcel from "react-html-to-excel";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate ,useParams} from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import $ from "jquery";

import { fetchClinicList } from "../../Utils/clinicApi";

function DoctorsList() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedClinic, setSelectedClinic] = useState("All");



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

  const navigate = useNavigate();
//   const urlParams = useParams()
//   console.log(urlParams);
// const ID=urlParams.DoctorId;  


  const [data, setData] = useState([]);
  const url =
    "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetDoctorList/0/0";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((list) => {
        console.log(list.Data);
        setData(list.Data);
        // setInactive({Doctorid:list.DoctorID})
        // let status=document.getElementById("stat").innerText
        // console.log(status);
        
       
      });
  }, []);
  const [clinicList, setClinicList] = useState([]);

  useEffect(() => {
    fetchClinicList().then((list) => {
      if (list) {
        setClinicList(list);
      }
    });
  }, []);

  const getFilteredDoctors = () => {
    let list = data;

    if (selectedClinic !== "All") {
      const osClinicNames = clinicList
        .filter((c) => c.ClinicGroupCode === "OS")
        .map((c) => (c.ClinicName || "").toLowerCase());

      const avmClinicNames = clinicList
        .filter((c) => (c.ClinicGroupCode || "").includes("AVM"))
        .map((c) => (c.ClinicName || "").toLowerCase());

      list = list.filter((doc) => {
        const docClinic = (doc.ClinicName || doc.PracticeName || doc.Clinic || "").toLowerCase();
        const docType = (doc.ClinicType || "").toLowerCase();
        const selType = selectedClinic.toLowerCase();

        if (docType) {
          if (selType.includes("orthosquare") && docType.includes("ortho")) return true;
          if (selType.includes("avm") && docType.includes("avm")) return true;
          if (selType.includes("flexi") && docType.includes("flexi")) return true;
        }

        if (selectedClinic === "Orthosquare") {
          return osClinicNames.includes(docClinic) || docClinic.includes("ortho") || docClinic.includes("os");
        } else if (selectedClinic === "AVM Smiles" || selectedClinic === "AVM") {
          return avmClinicNames.includes(docClinic) || docClinic.includes("avm");
        } else if (selectedClinic === "Flexismile") {
          return docClinic.includes("flexi") || (!osClinicNames.includes(docClinic) && !avmClinicNames.includes(docClinic));
        }
        return docClinic.includes(selectedClinic.toLowerCase());
      });
    }

    if (searchInput.trim() !== "") {
      const s = searchInput.toLowerCase();
      list = list.filter((doc) => {
        return (
          (doc.DoctorID?.toString() || "").toLowerCase().includes(s) ||
          (doc.Name || "").toLowerCase().includes(s) ||
          (doc.PracticeName || "").toLowerCase().includes(s) ||
          (doc.ClinicName || "").toLowerCase().includes(s) ||
          (doc.ClinicType || "").toLowerCase().includes(s) ||
          (doc.PracticeEmail || "").toLowerCase().includes(s) ||
          (doc.PhoneNo || "").toLowerCase().includes(s)
        );
      });
    }

    return list;
  };

  

  // const [Inactive, setInactive] = useState({
  //   Doctorid:""
  // })

  // const [Inactive, setInactive] = useState({
  //   Doctorid:""
  // })

  // const url2="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/DoctorInActive"

  // const handleSubmit = (event) => {
  //   event.preventDefault();
    
  //    console.log(Inactive);
  //     fetch(url2,{
  //       method:"POST",
  //       headers:{
  //         Accept: "application/json",
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(Inactive)
  //     })
  //     .then((res)=>res.json())
  //     .then((result)=>{
  //       console.log(result);
   
  //     })
  
  
    
      
  
  //   };


  // $(document).on("click", ".edit", function(){
  //   $(this).parents("tr").find("td:not(:last-child)").each(function(){
  // $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
  // });
  // $(this).parents("tr").find(".add, .edit").toggle();
  // $(".add-new").attr("disabled", "disabled");
  // });

let DoctorName=sessionStorage.getItem("DocName");



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
              <Button
                variant=""
                hidden
                onClick={tglContent}
                className="navhide"
              >
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
                      <span className="px-3" onClick={() => {navigate("/")
                     sessionStorage.removeItem("Role");
                  }
                    }>
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

                  <Nav.Link className="doc-tab active" onClick={()=>navigate("/admin-dashboard")}>
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
      <Container fluid>
        <Row className="justify-content-center mt-5">
          <Col md={10}>
            <Card>
              {/* <Row className="text-end mt-3 me-2">
                <Col> */}
                  {/* <Button
                    variant=""
                    className="add-doc-btn"
                    onClick={() => navigate("/add-doctor")}
                  >
                    Add Doctor
                  </Button> */}
                  {/* <Button
                    variant=""
                    className="add-doc-btn mx-2"
                    onClick={() => navigate("/patient-list")}
                  >
                    View Patient
                  </Button> */}
                {/* </Col>
              </Row> */}
              <Row>
                <Col>
                  <Card className="mt-2 m-3">
                    <Row className="m-2 mt-4 align-items-center">
                      <Col md={12}>
                        <Form.Group className="d-flex align-items-center flex-wrap p-3 border rounded" style={{ backgroundColor: "#F9F6F0" }}>
                          <Form.Label className="me-4 mb-0 fw-bold" style={{ color: "#C49358", fontSize: "16px" }}>Select Clinic:</Form.Label>
                          {["All", "Orthosquare", "AVM Smiles", "Flexismile"].map((clinic) => (
                            <Form.Check
                              inline
                              key={clinic}
                              type="radio"
                              id={`clinic-radio-${clinic}`}
                              label={clinic}
                              name="clinicSelection"
                              value={clinic}
                              checked={selectedClinic === clinic}
                              onChange={(e) => setSelectedClinic(e.target.value)}
                              className="me-4 my-1 fw-semibold"
                              style={{ cursor: "pointer" }}
                            />
                          ))}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="m-2 mt-4">
                      <Col className="" md={9}>
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button exc"
                          table="table-to-xls"
                          filename="Doctors"
                          sheet="tablexls"
                          buttonText="Excel"
                        />
                      </Col>
                      <Col md={3}>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formPlaintextEmail"
                        >
                          <Form.Label column sm="3">
                            Search
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control
                              type="search"
                              onChange={(e) => setSearchInput(e.target.value)}
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="m-2">
                      <Col className="dList">
                        <Table
                          striped
                          bordered
                          hover
                          id="table-to-xls"
                          responsive
                        >
                          <thead>
                            <tr>
                              {/* <th>SR.NO</th> */}
                              <th style={{whiteSpace:"nowrap"}}>DOCTOR ID</th>
                              <th>DOCTOR NAME</th>
                              <th style={{whiteSpace:"nowrap"}}>PATIENT COUNT</th>
                              <th>PRACTICE NAME</th>
                              <th>EMAIL</th>
                              <th>PHONE</th>
                              <th>STATUS</th>
                              <th>ACTION</th>
                            </tr>
                          </thead>

                          <tbody>
                            {getFilteredDoctors().map((docList) => {
                              return (
                                <React.Fragment key={docList.DoctorID}>
                                  <tr id="tblrw">
                                    <td contenteditable="false">
                                      {docList.DoctorID}
                                    </td>
                                    <td contenteditable="false">
                                      {docList.Name}
                                    </td>
                                    <td contenteditable="false">1</td>
                                    <td contenteditable="false">
                                      {docList.PracticeName}
                                    </td>
                                    <td contenteditable="false">
                                      {docList.PracticeEmail}
                                    </td>
                                    <td contenteditable="false">
                                      {docList.PhoneNo}
                                    </td>
                                    <td contenteditable="false" className={`${docList.isActive==="True"?"stat-green":"stat-red"}`} id="stat">{docList.isActive==="True"?"Active":"Inactive"}</td>
                                    <th>
                                      <span>
                                        <Button
                                          variant=""
                                          className="action-i"
                                          onClick={()=>navigate(`/doctor-profile/${docList.DoctorID}`)}
                                        >
                                          <IoEyeOutline color="black" />
                                        </Button>
                                      </span>
                                      <span>
                                        <Button
                                          variant=""
                                          className="action-i edit editbtn"
                                        >
                                          Edit
                                        </Button>
                                      </span>
                                      <span>
                                        <Button
                                          variant=""
                                          className=""
                                          onClick={(e)=>{
                                            e.preventDefault();
                                            const url2="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/DoctorInActive"

                                            const n={
                                              Doctorid:docList.DoctorID
                                             }

                                            fetch(url2,{
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
                                            })

                                            window.location.reload();
                                          }}
                                        >
                                          <FaTrash/>
                                        </Button>
                                      </span>
                                    </th>
                                  </tr>
                                </React.Fragment>
                              );
                            })}

                            {/* <tr>
                                              <td>2</td>
                                              <td>365</td>
                                              <td>DIVYA N</td>
                                              <td>0</td>
                                              <td>orthosquare</td>
                                              <td>divyan@gmail.com</td>
                                              <td>9845364761</td>
                                              <td>Active</td>
                                              <td>
                                          
                                                    <span><Button variant="" className="action-i"><IoEyeOutline color="black"/></Button></span>
                                                   
                                                    <span><Button variant="" className="action-i edit"><FaEdit color="black"/></Button></span>
                                                   
                                              </td>

                                            </tr>


                                           <tr>
                                              <td>3</td>
                                              <td>385</td>
                                              <td>PREETI G</td>
                                              <td>1</td>
                                              <td>dental</td>
                                              <td>preetig@gmail.com</td>
                                              <td>7827809453</td>
                                              <td>Active</td>
                                              <td>
                                          
                                                    <span><Button variant="" className="action-i"><IoEyeOutline color="black"/></Button></span>
                                                   
                                                    <span><Button variant="" className="action-i edit"><FaEdit color="black"/></Button></span>
                                                   
                                              </td>

                                            </tr> */}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row style={{ height: "50px" }}></Row>
      </Container>
    </>
  );
}

export default DoctorsList;
