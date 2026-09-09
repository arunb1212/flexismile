import React,{useState,useEffect} from "react";
import "../../Admin/Styles/RequestList.css";
import {Row,Col,Container,Nav,Dropdown,Card,Navbar,Button,Form,Modal} from "react-bootstrap";
import user from "../../Assets/user.png";
import logo from "../../Assets/Logoremovebg.png";
import { IoMdNotifications } from "react-icons/io";
import { FiMessageSquare, FiPower } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Male from "../../Assets/Male.png";
// import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Swal from "sweetalert2";


function  RequestList(){
    const tglContent = () => {
        let Menu = document.querySelector(".menuTab");
    
        if (Menu.classList.contains("collapsed")) {
          Menu.classList.remove("collapsed");
        } else {
          Menu.classList.add("collapsed");
        }
      };

      const navigate=useNavigate();

let AdminName=sessionStorage.getItem("DocName")
let doctorId=sessionStorage.getItem("DocUserId")

const [search, setSearch] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);




  const [requests, setRequests] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);


  const [totalUpper, setTotalUpper] = useState([]);
  const [totalLower, setTotalLower] = useState([]);


  const [sets, setSets] = useState({
    PatientId:"",
    TextForUpperAligners:[],
    TextForLowerAligners:[],
    TotalNoOfUpperSets:"",
    TotalNoOfLowerSets:"",


    PatientSetsId:"",
   
    DoctorId:0,
   
    DateOn:""
  });

  const onChangeSets=(e)=>{
  

    const newdata={...sets}
    newdata[e.target.name]=e.target.value;
    
    setSets(newdata);
   

    console.log(newdata);
    // console.log(sets);
  }


  const handleSets=(e)=>{
    e.preventDefault();
    const SetsUrl="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddPatientTotalSetsAdmintToDoctor";
    

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

      setTimeout(() => {
        window.location.reload();
      }, 2000);
  }

  const [selectedMonth, setSelectedMonth] = useState("all");
  const [loading, setLoading] = useState(false);
  const [allRequests, setAllRequests] = useState([]);

  const fetchAllRequests = async () => {
    setLoading(true);
    try {
      const prefixes = [
        "2", "5", "7", "8", "9",
        "00","01","02","03","04","05","06","07","08","09",
        "10","11","12","13","14","15","16","17","18","19",
        "30","31","32","33","34","35","36","37","38","39",
        "40","41","42","43","44","45","46","47","48","49",
        "60","61","62","63","64","65","66","67","68","69"
      ];

      const [prefixResults, setDetailsRes] = await Promise.all([
        Promise.all(
          prefixes.map((p) =>
            fetch(`https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientSetsDoctorToAdminlist/0/${p}`)
              .then((r) => r.json())
              .then((res) => (res.status && Array.isArray(res.Data)) ? res.Data : [])
              .catch(() => [])
          )
        ),
        fetch("https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientTotalsetDetails/0/0/0")
          .then((r) => r.json())
          .catch(() => ({ Data: [] }))
      ]);

      const adminListItems = prefixResults.flat();
      const recentPatients = (setDetailsRes?.Data || []).slice(0, 50);

      const viewResults = await Promise.all(
        recentPatients.map((p) =>
          fetch(`https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientTotalsetView/${p.PatientId}/${p.PatientSetsId}`)
            .then((r) => r.json())
            .then((res) => {
              if (res.status && Array.isArray(res.Data) && res.Data.length > 0) {
                return res.Data.map((d, i) => ({
                  SetsDoctorToAdminId: `gen_${p.PatientId}_${p.PatientSetsId}_${i}`,
                  PatientId: p.PatientId,
                  PatientSetsId: p.PatientSetsId,
                  Name: p.Name,
                  CaseNo: p.CaseNo,
                  ClinicName: p.ClinicName,
                  DoctorId: p.DoctorId,
                  DoctorName: p.DoctorName,
                  TotalNoOfUpperAligners: p.TotalNoOfUpperSets,
                  TotalNoOfLowerAligners: p.TotalNoOfLowerSets,
                  TotalAligners: p.NoOfSets,
                  UpperAligners: d.TextForUpperAligners,
                  LowerAligners: d.TextForLowerAligners,
                  PendingAligners: String((parseInt(p.NoOfSets) || 0) - (parseInt(d.NoOfSets) || 0)),
                  RequestDate: d.DispatchDate,
                  TotalNoOfSets: "0"
                }));
              }
              return [];
            })
            .catch(() => [])
        )
      );

      const totalSetItems = viewResults.flat();

      const parseDate = (dStr) => {
        if (!dStr) return 0;
        const [dPart, tPart] = dStr.split(" ");
        const parts = dPart.split("-");
        if (parts.length === 3) {
          const iso = `${parts[2]}-${parts[1]}-${parts[0]}${tPart ? `T${tPart}` : "T00:00:00"}`;
          const t = new Date(iso).getTime();
          if (!isNaN(t)) return t;
        }
        const t = new Date(dStr).getTime();
        return isNaN(t) ? 0 : t;
      };

      const mergeAligners = (str1, str2) => {
        const parse = (s) => (s ? s.toString().split(",").map((x) => x.trim()).filter(Boolean) : []);
        const combined = Array.from(new Set([...parse(str1), ...parse(str2)]));
        return combined.sort((a, b) => {
          const numA = parseInt(a, 10), numB = parseInt(b, 10);
          if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
          return a.localeCompare(b);
        }).join(",");
      };

      const patientMap = new Map();

      const mergeItem = (item) => {
        if (!item || !item.PatientId) return;
        const key = String(item.PatientId);

        if (!patientMap.has(key)) {
          patientMap.set(key, { ...item });
          return;
        }

        const existing = patientMap.get(key);
        const existingTime = parseDate(existing.RequestDate);
        const itemTime = parseDate(item.RequestDate);

        const newer = itemTime >= existingTime ? item : existing;
        const older = itemTime >= existingTime ? existing : item;

        const mergedUpper = mergeAligners(existing.UpperAligners, item.UpperAligners);
        const mergedLower = mergeAligners(existing.LowerAligners, item.LowerAligners);

        let finalSetsDoctorToAdminId = newer.SetsDoctorToAdminId;
        if (String(finalSetsDoctorToAdminId).startsWith("gen_") && !String(older.SetsDoctorToAdminId).startsWith("gen_")) {
          finalSetsDoctorToAdminId = older.SetsDoctorToAdminId;
        }

        patientMap.set(key, {
          ...older,
          ...newer,
          SetsDoctorToAdminId: finalSetsDoctorToAdminId,
          UpperAligners: mergedUpper,
          LowerAligners: mergedLower,
          RequestDate: newer.RequestDate || older.RequestDate,
          PendingAligners: newer.PendingAligners !== undefined ? newer.PendingAligners : older.PendingAligners,
        });
      };

      totalSetItems.forEach(mergeItem);
      adminListItems.forEach(mergeItem);

      const unique = Array.from(patientMap.values());
      unique.sort((a, b) => {
        const dateA = parseDate(a.RequestDate);
        const dateB = parseDate(b.RequestDate);
        if (dateB !== dateA) return dateB - dateA;
        return (parseInt(b.PatientId) || 0) - (parseInt(a.PatientId) || 0);
      });

      setAllRequests(unique);
      setRequests(unique);
      setFilteredNames(unique);
    } catch (err) {
      console.error("Error fetching request list:", err);
      setAllRequests([]);
      setRequests([]);
      setFilteredNames([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  useEffect(() => {
    let list = Array.isArray(allRequests) ? allRequests : [];

    if (selectedMonth !== "all") {
      list = list.filter((item) => {
        if (!item?.RequestDate) return false;
        const parts = item.RequestDate.split(" ")[0].split("-");
        const monthNum = parts[1];
        return monthNum === selectedMonth || parseInt(monthNum) === parseInt(selectedMonth);
      });
    }

    setRequests(list);

    const s = (search || "").toLowerCase().trim();
    if (s) {
      const filtered = list.filter((item) => {
        if (!item) return false;
        return (
          (item.PatientId?.toString() || "").toLowerCase().includes(s) ||
          (item.Name || "").toLowerCase().includes(s) ||
          (item.ClinicName || "").toLowerCase().includes(s) ||
          (item.CaseNo?.toString() || "").toLowerCase().includes(s) ||
          (item.DoctorName || "").toLowerCase().includes(s)
        );
      });
      setFilteredNames(filtered);
    } else {
      setFilteredNames(list);
    }
  }, [selectedMonth, search, allRequests]);


    const columns = [
        {
          name: "Patient Code",
          selector: (row) => row.PatientId,
          sortable: true,
        },
        {
          name: "Patient Name",
          selector: (row) => row.Name,
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
          name: "Upper Aligners",
          selector: (row) => row.TotalNoOfUpperAligners,
          sortable: true,
        },
        {
          name: "Lower Aligners",
          selector: (row) => row.TotalNoOfLowerAligners,
          sortable: true,
        },
        {
          name: "Total Aligners",
          selector: (row) => row.TotalAligners,
          sortable: true,
        },
        {
          name: "Pending Aligners",
          selector: (row) => row.PendingAligners,
          sortable: true,
        },
        {
          name: "Request Date",
          selector: (row) => (row.RequestDate ? row.RequestDate.split(" ")[0] : ""),
          sortable: true,
        },
        {
          name: "Clinic Name",
          selector: (row) => row.ClinicName,
          sortable: true,
        },
        {
            // id:"center",
            name:"Send to doctor",
            cell: (row) => (
              <Button variant="" className="edit-patient-btn" onClick={()=>{
                handleShow1()
                setSets((pre)=>{
                  return{...pre,
                  PatientId:row.PatientId,
                  PatientSetsId:row.PatientSetsId,
                  DoctorId:row.DoctorId
                  }
                })


                let upperarray = row.UpperAligners ? row.UpperAligners.split(",") : [];
                let lowerarray = row.LowerAligners ? row.LowerAligners.split(",") : [];

                setTotalUpper(upperarray);
                setTotalLower(lowerarray);

                console.log(totalLower);
                console.log(totalUpper);
              }}
              >
                Send
              </Button>
            ),
          },
      
        // {
        //   name: "Total Sets",
        //   selector: (row) => row.TotalNoOfSets,
    
        // },
        // {
        //     name: "Pending Sets",
        //     // selector: (row) => row.PendingSets,   
      
        //   },
       
        // {
        //   // name: `${RoleId==="1"?"Action":""}`,
        //   cell: row => RoleId==="1"? <button className="edit-patient-btn" onClick={()=>{navigate(`/payment/${row?.PatientId}`)
        // sessionStorage.setItem("Pid",row.PatientId)
        // }}>Payment</button>:""
        // }
      ];



      const [UpperChecked, setUpperChecked] = useState([]);
      const [LowerChecked, setLowerChecked] = useState([]);

      const a = 20;
  const checkboxes = Array.from({ length: totalUpper }, (_, index) => index + 1);
  const checkboxes1 = Array.from({ length: totalLower }, (_, index) => index + 1);


  let UpperSetsReqBody={
    Uppersets:[],
    
  }
  let UpperSetsReqBody1={
    Uppersets:[],
    PatientSetsId:sets.PatientSetsId
  }




  const onChangeRequest=(e)=>{
    const newdata={...sets}
    newdata[e.target.name]=e.target.value;
    
    setSets(newdata);
    console.log(newdata);
  
    
    let lengthOfUpper=sets.TextForUpperAligners.length;
    let lengthOfLower=sets.TextForLowerAligners.length;

    // let noOfSets=lengthOfUpper+lengthOfLower;
  // console.log(lengthOfUpper);
    setSets((pre)=>{
      return{
        ...pre,
        TotalNoOfUpperSets:lengthOfUpper,
        TotalNoOfLowerSets:lengthOfLower
      }
    })

    console.log(sets);
    
  }
  
  const handleCheckboxChange = (checkbox) => {

    
    if (UpperChecked.includes(checkbox)) {
      
      setUpperChecked(UpperChecked.filter((item) => item !== checkbox));
      // setUpperSetsReqBody((pre)=>{
      //   return{
      //     ...pre,
      //     Uppersets:UpperChecked.filter((item) => item !== checkbox),
      //     PatientSetsId:requestSets.PatientSetsId
      //   }
      // })
      UpperSetsReqBody1={
        Uppersets:UpperChecked.filter((item) => item !== checkbox),
          PatientSetsId:sets.PatientSetsId
      }
      UpperSetsReqBody={
        Uppersets:UpperChecked.filter((item) => item !== checkbox),

      }

      setSets((pre)=>{
        return{
          ...pre,
          TextForUpperAligners:UpperSetsReqBody.Uppersets
        }
      })

      
    } else {
      setUpperChecked([...UpperChecked, checkbox]);
      // setUpperSetsReqBody({
    

      //     Uppersets:[...UpperChecked, checkbox],
      //     PatientSetsId:requestSets.PatientSetsId
        
      // })

      UpperSetsReqBody1={
        Uppersets:checkbox,
          PatientSetsId:sets.PatientSetsId
      }
      UpperSetsReqBody={
        Uppersets:[...UpperChecked, checkbox],

      }

      setSets((pre)=>{
        return{
          ...pre,
          TextForUpperAligners:UpperSetsReqBody.Uppersets
        }
      })
    
    }

    let lengthOfUpper=sets.TextForUpperAligners.length;
  
    // let noOfSets=lengthOfUpper+lengthOfLower;
  console.log(lengthOfUpper);
    setSets((pre)=>{
      return{
        ...pre,
        TotalNoOfUpperSets:lengthOfUpper,
       
      }
    })

    console.log(sets);

    console.log(UpperSetsReqBody1);
    console.log(sets);
    // console.log(modalCheckboxValue);
  };



  let LowerSetsReqBody={
    Lowersets:[],
    // PatientSetsId:requestSets.PatientSetsId
  }
  let LowerSetsReqBody1={
    Lowersets:[],
    PatientSetsId:sets.PatientSetsId
  }


  const handleCheckboxChange1 = (checkbox) => {
    if (LowerChecked.includes(checkbox)) {
      setLowerChecked(LowerChecked.filter((item) => item !== checkbox));

      LowerSetsReqBody1={
        Lowersets:LowerChecked.filter((item) => item !== checkbox),
          PatientSetsId:sets.PatientSetsId
      }
      LowerSetsReqBody={
        Lowersets:LowerChecked.filter((item) => item !== checkbox),
        
      }
      setSets((pre)=>{
        return{
          ...pre,
          TextForLowerAligners:LowerSetsReqBody.Lowersets
        }
      })
    } else {
      setLowerChecked([...LowerChecked, checkbox]);
      // setModalCheckboxValue1(checkbox);

      LowerSetsReqBody1={
        Lowersets:checkbox,
          PatientSetsId:sets.PatientSetsId
      }
      LowerSetsReqBody={
        Lowersets:[...LowerChecked, checkbox],
      
      }
      setSets((pre)=>{
        return{
          ...pre,
          TextForLowerAligners:LowerSetsReqBody.Lowersets
        }
      })
      // lowercheckFunc();
    }
    let lengthOfLower=sets.TextForLowerAligners.length;
    // let noOfSets=lengthOfUpper+lengthOfLower;
  console.log(lengthOfLower);
    setSets((pre)=>{
      return{
        ...pre,
    
        TotalNoOfLowerSets:lengthOfLower,
      }
    })

    console.log(sets);
    console.log(LowerSetsReqBody1);
    console.log(sets);
  };







  const RoleId = sessionStorage.getItem("Role");

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
      <Container fluid className="p-0">
        <Row className="menuTab m-0">
          <Col className="d-flex justify-content-center align-items-center">
            <Card body className="border-0 p-0 bg-transparent">
              <Nav className="justify-content-center">
                <LinkContainer to={RoleId === "1" ? `/admin-dashboard` : `/prodn-dash`}>
                  <Nav.Link className="doc-tab active">
                    Dashboard
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container>
          <Row className="mt-5 mb-5" style={{ backgroundColor: "white" }}>
            <Col>
              <Row>
                <Col
                  className=""
                  style={{ border: "solid 0.1em lightgray" }}
                >
                  <DataTable
                    columns={columns}
                    data={filteredNames || []}
                    pagination
                    fixedHeader
                    highlightOnHover
                    progressPending={loading}
                    subHeader
                    expandableRows
                    expandOnRowClicked={true}
                    expandableRowsComponent={({ data }) => {
                      return (
                        <div className="p-3 bg-light border-top border-bottom">
                          <Row>
                            <Col md={6}>
                              <div className="mb-2">
                                <strong className="text-dark">Requested Upper Aligners:</strong>
                                <div className="mt-1">
                                  {data.UpperAligners ? (
                                    data.UpperAligners.split(",").map((item, idx) => (
                                      <span
                                        key={idx}
                                        className="badge bg-secondary me-1 mb-1 p-2"
                                        style={{ fontSize: "13px", backgroundColor: "#C49358" }}
                                      >
                                        Set #{item.trim()}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-muted">None</span>
                                  )}
                                </div>
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="mb-2">
                                <strong className="text-dark">Requested Lower Aligners:</strong>
                                <div className="mt-1">
                                  {data.LowerAligners ? (
                                    data.LowerAligners.split(",").map((item, idx) => (
                                      <span
                                        key={idx}
                                        className="badge bg-dark me-1 mb-1 p-2"
                                        style={{ fontSize: "13px" }}
                                      >
                                        Set #{item.trim()}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-muted">None</span>
                                  )}
                                </div>
                              </div>
                            </Col>
                          </Row>
                          {data.DoctorName && (
                            <div className="mt-2 text-muted" style={{ fontSize: "13px" }}>
                              <strong>Doctor:</strong> {data.DoctorName}
                            </div>
                          )}
                        </div>
                      );
                    }}
                    onRowClicked={(e)=>{
                      console.log(e);
                    }}
                    subHeaderComponent={
                      <div className="d-flex justify-content-between align-items-center w-100 mt-4 mb-4 flex-wrap gap-3">
                        <div className="d-flex align-items-center gap-2">
                          <label className="me-2 fw-bold text-secondary mb-0">Filter by Month:</label>
                          <Form.Select
                            style={{ width: "200px" }}
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                          >
                            <option value="all">All Months</option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                          </Form.Select>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          style={{ maxWidth: "350px" }}
                          placeholder="Search by Code, Name, Clinic, Case No..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                    }
                  />


<Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Upper Aligners</Form.Label>
                    <Form.Control
                      type="text"
                      name="TotalNoOfUpperSets"
                      onChange={(e) => onChangeSets(e)}
                      value={sets.TotalNoOfUpperSets}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Lower Aligners</Form.Label>
                    <Form.Control
                      type="text"
                      name="TotalNoOfLowerSets"
                      onChange={(e) => onChangeSets(e)}
                      value={sets.TotalNoOfLowerSets}
                      required
                    />
                  </Form.Group>
                  {/* <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="DateOn"
                      id="pass"
                    //   onChange={(e) => onChangeSets(e)}
                      value={sets.DateOn}
                      required
                    />
                  </Form.Group> */}
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    type="submit"
                    variant=""
                    style={{
                      backgroundColor: "#C49358",
                      color: "white",
                    }}
                    onClick={(e)=>handleSets(e)}
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>




















              <Modal show={show1} onHide={handleClose1} centered size="lg"  style={{ display: 'flex' }}>
                <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="modal-lbl">Upper Aligners set no.</Form.Label>
                    {/* <Form.Control
                      type="text"
                      name="TextForUpperAligners"
                      onChange={(e) => onChangeRequest(e)}
                      value={requestSets.TextForUpperAligners}
                      required
                    /> */}
{/* {generateCheckboxes()} */}
<div> <span style={{fontWeight:500}}>T</span>
      {totalUpper?.map((checkbox,i) => (
        <label key={checkbox} className="m-3">
          <input type="checkbox"              
          //  checked={requests?.UpperAligners?.includes(i+1)}
 onChange={() => handleCheckboxChange(checkbox)}/> <br />
          {/* Checkbox */}
           <span className="">{checkbox}</span>
        </label>
      ))}
   <span style={{fontWeight:500}}>R</span> </div>
{/* {JSON.stringify(selected)} */}
                    {/* <TagsInput
        value={selected}
        onChange={setSelected}
        name="TextForUpperAligners"
        placeHolder=""
      /> */}
                  </Form.Group>

                  {/* <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Which Upper Aligners you want?</Form.Label>
                    <Form.Control
                      type="text"
                      name="TextForUpperAligners"
                      onChange={(e) => onChangeRequest(e)}

                      value={requestSets.TextForUpperAligners}
                      required
                    />
                  </Form.Group> */}

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="modal-lbl">Lower Aligners set no.</Form.Label>
                    {/* <Form.Control
                      type="text"
                      name="TextForLowerAligners"
                      onChange={(e) => onChangeRequest(e)}

                      value={requestSets.TextForLowerAligners}
                      required
                    /> */}

<div> <span style={{fontWeight:500}}>T</span>
      {totalLower?.map((checkbox,i) => (
        <label key={checkbox} className="m-3">
          <input type="checkbox" 
          // checked={sets.TextForLowerAligners.includes(i+1)} 
          onChange={() => handleCheckboxChange1(checkbox)}/> <br />
          {/* Checkbox */}
           <span className="">{checkbox}</span>
        </label>
      ))}
   <span style={{fontWeight:500}}>R</span> </div>

{/* <TagsInput
        value={selected1}
        onChange={setSelected1}
        name="TextForLowerAligners"
        placeHolder=""
      /> */}
                  </Form.Group>


                  {/* <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Which Lower Aligners you want?</Form.Label>
                    <Form.Control
                      type="text"
                      name="TextForLowerAligners"
                      onChange={(e) => onChangeRequest(e)}

                      value={requestSets.TextForLowerAligners}
                      required
                    />
                  </Form.Group> */}



                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="modal-lbl">Date <span style={{color:"red",float:"right"}}>*</span></Form.Label>
                    <Form.Control
                      type="date"
                      name="DateOn"
                      id="pass"
                      onChange={(e) => onChangeRequest(e)}

                      value={sets.DateOn}
                      required
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    type="submit"
                    variant=""
                    style={{
                      backgroundColor: "#C49358",
                      color: "white",
                    }}
                    onClick={(e)=>{
                      const reqUrl="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddPatientTotalSetsAdmintToDoctor";


                      let n={
                        ...sets,
                        TextForUpperAligners:sets.TextForUpperAligners.toString(),
                        TextForLowerAligners:sets.TextForLowerAligners.toString()
                      }

                      console.log(n);

                      if(sets.DateOn===""){
                        Swal.fire({
                          icon:"warning",
                          title:"Date is required!"
                        })
                      }
                      
                      else{
          fetch(reqUrl,{
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(n),
           })
           .then((res)=>res.json())
           .then((request)=>{
            // console.log(request);
            console.log(request);
            if(request.status===true){
              Swal.fire({
                title:"Submitted Successfully!",
                icon:"success"
              })

               setTimeout(() => {
              
               window.location.reload();
            }, 2000);
            console.log(n);
            }
            else{
              Swal.fire({
                title:"Something went wrong!",
                icon:"error"
              })
            }

           
       
           })}
                    }}
                    
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
                </Col>
              </Row>
            
            </Col>
          </Row>
        </Container>
        </>
    );
}


export default RequestList;