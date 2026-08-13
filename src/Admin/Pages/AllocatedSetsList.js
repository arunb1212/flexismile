import React, { useState, useEffect } from "react";
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
  Table,
  Modal
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import "../Styles/AllocatedSetsList.css";
import user from "../../Assets/user.png";
import logo from "../../Assets/Logoremovebg.png";
import { IoMdNotifications } from "react-icons/io";
import { FiMessageSquare, FiPower } from "react-icons/fi";
import { FaBars, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Swal from "sweetalert2";
import {LinkContainer} from 'react-router-bootstrap';


function AlloactedSetsList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [filteredNames, setFilteredNames] = useState([]);

  const tglContent = () => {
    let Menu = document.querySelector(".menuTab");

    if (Menu.classList.contains("collapsed")) {
      Menu.classList.remove("collapsed");
    } else {
      Menu.classList.add("collapsed");
    }
  };
  let DoctorName = sessionStorage.getItem("DocPracName");

  let DoctorUId = sessionStorage.getItem("DocUserId");
  const [setsDetails, setSetsDetails] = useState([]);

  const url = `https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientSetsAdmintToDoctorlist/0/0/${DoctorUId}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((setsAllocated) => {
        console.log(setsAllocated.Data);
        setSetsDetails(setsAllocated.Data);
        setFilteredNames(setsAllocated.Data);
      });
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);



  const [totalUpper, setTotalUpper] = useState(0);
  const [totalLower, setTotalLower] = useState(0);
  const [totalUpper1, setTotalUpper1] = useState(0);
  const [totalLower1, setTotalLower1] = useState(0);






  const [showRequest, setShowRequest] = useState(false);

  const handleCloseRequest = () => setShowRequest(false);
  const handleShowRequest = () => setShowRequest(true);























    const [requestSets, setRequestSets] = useState({
      PatientSetsId:"",
        PatientId:"",
        DoctorId:"",
        NoOfSets:0,
        TotalNoOfUpperSets:"",
        TotalNoOfLowerSets:"",
        DateOn:"",
        PatientTotalSetsId:""
    })
    
      const onChangeRequest=(e)=>{
        const newdata={...requestSets}
        newdata[e.target.name]=e.target.value;
        
        setRequestSets(newdata);
        console.log(newdata);
      }





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
      name: "Case Paper No.",
      selector: (row) => row.CaseNo,
      sortable: true,
      // center:true,
    },
    {
      id:"center",
      name: "Total No. of Aligners",
      selector: (row) => row.NoOfSets,
    },

    {
      id:"center",
      name: "Total Aligners Allocated",
      selector: (row) => row.TotalNoOfSets,
      sortable: true,
    },
    {
      id:"center",
      name: "Recieved Aligners",
      cell: (row) => (
        <Button variant="" className="edit-patient-btn" onClick={()=>{handleShow2()
          setReceived((pre)=>{
            return{...pre,
            PatientTotalSetsId:row.PatientTotalSetsId,
            PatientSetsId:row.PatientSetsId,
            PatientId:row.PatientId,
            DoctorId:DoctorUId
            }
          })


          setTotalUpper(row.TotalNoOfUpperSets);
          setTotalLower(row.TotalNoOfLowerSets);

          console.log(totalLower);
          console.log(totalUpper);
        }} disabled={row.ReceiveStatusSets==="Received"}>
          Make Entry
        </Button>
      ),
     
    },
    {
      id:"center",
      name:"Allocate to patient",
      cell: (row) => (
        <Button variant="" className="edit-patient-btn" onClick={()=>{handleShow()
          setSendSets((pre)=>{
            return{...pre,PatientSetsId:row.PatientSetsId,
            PatientId:row.PatientId,
            DoctorId:DoctorUId,
            PatientTotalSetsId:row.PatientTotalSetsId
            }
          })

          setTotalUpper1(row.TotalNoOfUpperSets);
          setTotalLower1(row.TotalNoOfLowerSets);

          console.log(totalLower1);
          console.log(totalUpper1);
        }}>
          Send
        </Button>
      ),
    },

    // {
    //   id:"center",
    //   name:"Request for Aligners",
    //   cell: (row) => (
    //     <Button variant="" className="edit-patient-btn" onClick={()=>{
    //       handleShowRequest();
    //       setRequestSets((pre)=>{
    //         return{...pre,PatientSetsId:row.PatientSetsId,
    //         PatientId:row.PatientId,
    //         DoctorId:DoctorUId,
    //         PatientTotalSetsId:row.PatientTotalSetsId
    //         }
    //       })
    //     }}>
    //       Request
    //     </Button>
    //   ),
    // }

    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <button
    //       className="edit-patient-btn"
    //       onClick={() => {
    // RoleId==="1"? navigate(`/patient-details/${row?.PatientId}`):navigate(`/patient-details-doc/${row?.PatientId}`);
    // console.log(patient);
    // handleShow();
    // setSets((pre)=>{
    //   return{...pre,PatientSetsId:row.PatientSetsId,
    //   PatientId:row.PatientId,
    //   DoctorId:row.DoctorId
    //   }
    // })
    // console.log(sets);
    // }}
    //   >
    //     Allocate sets
    //   </button>
    // ),
    // },

    // {
    //   // name: `${RoleId==="1"?"Action":""}`,
    //   cell: row => RoleId==="1"? <button className="edit-patient-btn" onClick={()=>{navigate(`/payment/${row?.PatientId}`)
    // sessionStorage.setItem("Pid",row.PatientId)
    // }}>Payment</button>:""
    // }
  ];




 


    const [received, setReceived] = useState({
      PatientTotalSetsId:"",
      PatientSetsId:"",
      PatientId:"",
      DoctorId:"",
      TextForUpperAligners:[],
      TextForLowerAligners:[],
      TotalNoOfUpperSets:"",
      TotalNoOfLowerSets:"",
      DateOn:""
    })


    const [UpperChecked, setUpperChecked] = useState([]);
    const [LowerChecked, setLowerChecked] = useState([]);
  
  
    const checkboxes = Array.from({ length: totalUpper }, (_, index) => index + 1);
    const checkboxes1 = Array.from({ length: totalLower }, (_, index) => index + 1);
  
    let UpperSetsReqBody={
      Uppersets:[],
      
    }
    let UpperSetsReqBody1={
      Uppersets:[],
      PatientSetsId:received.PatientSetsId
    }

    const onChangeReceived=(e)=>{
      const newdata={...received}
      newdata[e.target.name]=e.target.value;
      
      setReceived(newdata);
      console.log(newdata);

      let lengthOfUpper=received.TextForUpperAligners.length;
      let lengthOfLower=received.TextForLowerAligners.length;
  
      // let noOfSets=lengthOfUpper+lengthOfLower;
    // console.log(lengthOfUpper);
      setReceived((pre)=>{
        return{
          ...pre,
          TotalNoOfUpperSets:lengthOfUpper,
          TotalNoOfLowerSets:lengthOfLower
        }
      })
  
      console.log(received);
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
            PatientSetsId:received.PatientSetsId
        }
        UpperSetsReqBody={
          Uppersets:UpperChecked.filter((item) => item !== checkbox),
  
        }
  
        setReceived((pre)=>{
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
            PatientSetsId:received.PatientSetsId
        }
        UpperSetsReqBody={
          Uppersets:[...UpperChecked, checkbox],
  
        }
  
        setReceived((pre)=>{
          return{
            ...pre,
            TextForUpperAligners:UpperSetsReqBody.Uppersets
          }
        })
      
      }
  
      let lengthOfUpper=received.TextForUpperAligners.length;
    
      // let noOfSets=lengthOfUpper+lengthOfLower;
    console.log(lengthOfUpper);
      setReceived((pre)=>{
        return{
          ...pre,
          TotalNoOfUpperSets:lengthOfUpper,
         
        }
      })
  
      console.log(received);
  
      console.log(UpperSetsReqBody1);
      console.log(received);
      // console.log(modalCheckboxValue);
    };



    let LowerSetsReqBody={
      Lowersets:[],
      // PatientSetsId:requestSets.PatientSetsId
    }
    let LowerSetsReqBody1={
      Lowersets:[],
      PatientSetsId:received.PatientSetsId
    }



 const handleCheckboxChange1 = (checkbox) => {
    if (LowerChecked.includes(checkbox)) {
      setLowerChecked(LowerChecked.filter((item) => item !== checkbox));

      LowerSetsReqBody1={
        Lowersets:LowerChecked.filter((item) => item !== checkbox),
          PatientSetsId:received.PatientSetsId
      }
      LowerSetsReqBody={
        Lowersets:LowerChecked.filter((item) => item !== checkbox),
        
      }
      setReceived((pre)=>{
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
          PatientSetsId:received.PatientSetsId
      }
      LowerSetsReqBody={
        Lowersets:[...LowerChecked, checkbox],
      
      }
      setReceived((pre)=>{
        return{
          ...pre,
          TextForLowerAligners:LowerSetsReqBody.Lowersets
        }
      })
      // lowercheckFunc();
    }
    let lengthOfLower=received.TextForLowerAligners.length;
    // let noOfSets=lengthOfUpper+lengthOfLower;
  console.log(lengthOfLower);
    setReceived((pre)=>{
      return{
        ...pre,
    
        TotalNoOfLowerSets:lengthOfLower,
      }
    })

    console.log(received);
    console.log(LowerSetsReqBody1);
    console.log(received);
  };







  const [sendSets, setSendSets] = useState({
    PatientSetsId:"",
      PatientId:"",
      DoctorId:"",
      TextForUpperAligners:[],
      TextForLowerAligners:[],
      TotalNoOfUpperSets:"",
      TotalNoOfLowerSets:"",
      DateOn:"",
      PatientTotalSetsId:""
  })


  const [UpperChecked1, setUpperChecked1] = useState([]);
    const [LowerChecked1, setLowerChecked1] = useState([]);
  
  
    const checkboxes2 = Array.from({ length: totalUpper1 }, (_, index) => index + 1);
    const checkboxes3 = Array.from({ length: totalLower1 }, (_, index) => index + 1);
  
  

    let UpperSetsReqBody2={
      Uppersets:[],
      
    }
    let UpperSetsReqBody3={
      Uppersets:[],
      PatientSetsId:received.PatientSetsId
    }

    const onChangeSet=(e)=>{
      const newdata={...sendSets}
      newdata[e.target.name]=e.target.value;
      
      setSendSets(newdata);
      console.log(newdata);


      let lengthOfUpper=sendSets.TextForUpperAligners.length;
      let lengthOfLower=sendSets.TextForLowerAligners.length;
  
      // let noOfSets=lengthOfUpper+lengthOfLower;
    // console.log(lengthOfUpper);
      setSendSets((pre)=>{
        return{
          ...pre,
          TotalNoOfUpperSets:lengthOfUpper,
          TotalNoOfLowerSets:lengthOfLower
        }
      })
  
      console.log(sendSets);

    }


    const handleCheckboxChangeSend = (checkbox) => {

    
      if (UpperChecked1.includes(checkbox)) {
        
        setUpperChecked1(UpperChecked1.filter((item) => item !== checkbox));
        // setUpperSetsReqBody((pre)=>{
        //   return{
        //     ...pre,
        //     Uppersets:UpperChecked.filter((item) => item !== checkbox),
        //     PatientSetsId:requestSets.PatientSetsId
        //   }
        // })
        UpperSetsReqBody3={
          Uppersets:UpperChecked1.filter((item) => item !== checkbox),
            PatientSetsId:sendSets.PatientSetsId
        }
        UpperSetsReqBody2={
          Uppersets:UpperChecked1.filter((item) => item !== checkbox),
  
        }
  
        setSendSets((pre)=>{
          return{
            ...pre,
            TextForUpperAligners:UpperSetsReqBody.Uppersets
          }
        })
  
        
      } else {
        setUpperChecked1([...UpperChecked1, checkbox]);
        // setUpperSetsReqBody({
      
  
        //     Uppersets:[...UpperChecked, checkbox],
        //     PatientSetsId:requestSets.PatientSetsId
          
        // })
  
        UpperSetsReqBody3={
          Uppersets:checkbox,
            PatientSetsId:sendSets.PatientSetsId
        }
        UpperSetsReqBody2={
          Uppersets:[...UpperChecked1, checkbox],
  
        }
  
        setSendSets((pre)=>{
          return{
            ...pre,
            TextForUpperAligners:UpperSetsReqBody2.Uppersets
          }
        })
      
      }
  
      let lengthOfUpper=sendSets.TextForUpperAligners.length;
    
      // let noOfSets=lengthOfUpper+lengthOfLower;
    console.log(lengthOfUpper);
      setSendSets((pre)=>{
        return{
          ...pre,
          TotalNoOfUpperSets:lengthOfUpper,
         
        }
      })
  
      console.log(sendSets);
  
      console.log(UpperSetsReqBody3);
      console.log(sendSets);
      // console.log(modalCheckboxValue);
    };



    let LowerSetsReqBody2={
      Lowersets:[],
      // PatientSetsId:requestSets.PatientSetsId
    }
    let LowerSetsReqBody3={
      Lowersets:[],
      PatientSetsId:received.PatientSetsId
    }




 const handleCheckboxChangeSend1 = (checkbox) => {
    if (LowerChecked1.includes(checkbox)) {
      setLowerChecked1(LowerChecked1.filter((item) => item !== checkbox));

      LowerSetsReqBody3={
        Lowersets:LowerChecked1.filter((item) => item !== checkbox),
          PatientSetsId:sendSets.PatientSetsId
      }
      LowerSetsReqBody2={
        Lowersets:LowerChecked1.filter((item) => item !== checkbox),
        
      }
      setSendSets((pre)=>{
        return{
          ...pre,
          TextForLowerAligners:LowerSetsReqBody2.Lowersets
        }
      })
    } else {
      setLowerChecked1([...LowerChecked1, checkbox]);
      // setModalCheckboxValue1(checkbox);

      LowerSetsReqBody3={
        Lowersets:checkbox,
          PatientSetsId:sendSets.PatientSetsId
      }
      LowerSetsReqBody2={
        Lowersets:[...LowerChecked1, checkbox],
      
      }
      setSendSets((pre)=>{
        return{
          ...pre,
          TextForLowerAligners:LowerSetsReqBody2.Lowersets
        }
      })
      // lowercheckFunc();
    }
    let lengthOfLower=sendSets.TextForLowerAligners.length;
    // let noOfSets=lengthOfUpper+lengthOfLower;
  console.log(lengthOfLower);
    setSendSets((pre)=>{
      return{
        ...pre,
    
        TotalNoOfLowerSets:lengthOfLower,
      }
    })

    console.log(sendSets);
    console.log(LowerSetsReqBody3);
    console.log(sendSets);
  };



  const submitSendSets=(e)=>{
    e.preventDefault();

   const setsallocUrl="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddSetsDoctorToPatient";
    
   

   let n={
    ...sendSets,
    TextForUpperAligners:sendSets.TextForUpperAligners.toString(),
    TextForLowerAligners:sendSets.TextForLowerAligners.toString()
   }

   fetch(setsallocUrl,{
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(n),
   })
   .then((res)=>res.json())
   .then((result)=>{
    console.log(result);
    console.log(sendSets);
    if(result.status===true){
      Swal.fire({
        title:"Submitted Successfully!",
        icon:"success"
      })
      window.location.reload();
    }
   })
  }
  useEffect(() => {
    const result = setsDetails.filter((item) => {
      const s = search.toLowerCase();
      return (
        (item.PatientId?.toString() || "").toLowerCase().includes(s) ||
        (item.CaseNo || "").toLowerCase().includes(s) ||
        (item.Name || "").toLowerCase().includes(s)
      );
    });
    setFilteredNames(result);
  }, [search]);
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
                    <Dropdown.Item href="#/action-2" onClick={() => navigate("/")}>
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
              <Nav className="justify-content-center">
                <LinkContainer to={`/doctor-dashboard/${DoctorUId}`}>

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


      <Container fluid className="mt-5">
        <Row className="justify-content-center">
          <Col md={10}>
            <Row
              className="mt-5 mb-5 p-1 p-md-5 pt-5 m-1 m-md-0"
              style={{
                backgroundColor: "white",
                boxShadow: "0px 0px 15px  #C49358",
                borderRadius: "8px",
              }}
            >
              <Col>
                {/* {
                    setsDetails?.map((sets,i)=>{
                        return(
<>
<Row>
                    <Col>
                    <p>Patient Name :{sets.Name} </p>
                    </Col>
                    <Col>
                    <p>Case No : {sets.CaseNo}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <p>Total No. of Sets : {sets.TotalNoOfSets}</p>
                    </Col>
                    <Col>
                    <p>Sets Allocated : {sets.NoOfSets}</p>
                    </Col>
                </Row>
                <hr />
</>
                        )
                    })
                } */}

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
                      placeholder="Search by Code, Name, Case No..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    ></input>
                  }
                  expandableRows
                  expandableRowsComponent={({data})=>{

                    // let lower=data.LowerSetsData.map(i=>i.NoOfLowerSets);
                    // let upper=data.UpperSetsData.map(i=>i.NoOfUpperSets);
                    // console.log(lower.toString());
                    return (
                      <>
                      {/* <p>{data.PatientId}</p> */}
<Row>
  <Col>
  
                      <p>Ordered Upper Aligners: <span>{data.TextForUpperAligners}</span></p>
                      <p>Ordered Lower Aligners: <span>{data.TextForLowerAligners}</span></p>
  </Col>
</Row>
                      </>
                    )
                  }}
                />
              </Col>
            </Row>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Upper Aligners</Form.Label>
                    {/* <Form.Control
                      type="text"
                      name="TotalNoOfUpperSets"
                      onChange={(e) => onChangeSet(e)}
                      value={sendSets.TotalNoOfUpperSets}
                      required
                    /> */}

<div> <span style={{fontWeight:500}}>T</span>
      {checkboxes2.map((checkbox,i) => (
        <label key={checkbox} className="m-3">
          <input type="checkbox"              
          //  checked={requests?.UpperAligners?.includes(i+1)}
 onChange={() => handleCheckboxChangeSend(checkbox)}/> <br />
          {/* Checkbox */}
           <span className="">{checkbox}</span>
        </label>
      ))}
   <span style={{fontWeight:500}}>R</span> </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Lower Aligners</Form.Label>
                    {/* <Form.Control
                      type="text"
                      name="TotalNoOfLowerSets"
                      onChange={(e) => onChangeSet(e)}
                      value={sendSets.TotalNoOfLowerSets}
                      required
                    /> */}


<div> <span style={{fontWeight:500}}>T</span>
      {checkboxes3.map((checkbox,i) => (
        <label key={checkbox} className="m-3">
          <input type="checkbox" 
          // checked={sets.TextForLowerAligners.includes(i+1)} 
          onChange={() => handleCheckboxChangeSend1(checkbox)}/> <br />
          {/* Checkbox */}
           <span className="">{checkbox}</span>
        </label>
      ))}
   <span style={{fontWeight:500}}>R</span> </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="DateOn"
                      id="pass"
                      onChange={(e) => onChangeSet(e)}
                      value={sendSets.DateOn}
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
                    onClick={(e)=>submitSendSets(e)}
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>







{/* -------------------------------------------------------------------------------------------- */}







              <Modal show={show2} onHide={handleClose2} centered size="lg">
                <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Recieved Upper Aligners</Form.Label>
                    {/* <Form.Control
                      type="text"
                      name="TotalNoOfUpperSets"
                      onChange={(e) => onChangeReceived(e)}
                      value={received.TotalNoOfUpperSets}
                      required
                    /> */}

<div> <span style={{fontWeight:500}}>T</span>
      {checkboxes.map((checkbox,i) => (
        <label key={checkbox} className="m-3">
          <input type="checkbox"              
          //  checked={requests?.UpperAligners?.includes(i+1)}
 onChange={() => handleCheckboxChange(checkbox)}/> <br />
          {/* Checkbox */}
           <span className="">{checkbox}</span>
        </label>
      ))}
   <span style={{fontWeight:500}}>R</span> </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Recieved Lower Aligners</Form.Label>
                    {/* <Form.Control
                      type="text"
                      name="TotalNoOfLowerSets"
                      onChange={(e) => onChangeReceived(e)}
                      value={received.TotalNoOfLowerSets}
                      required
                    /> */}

<div> <span style={{fontWeight:500}}>T</span>
      {checkboxes1.map((checkbox,i) => (
        <label key={checkbox} className="m-3">
          <input type="checkbox" 
          // checked={sets.TextForLowerAligners.includes(i+1)} 
          onChange={() => handleCheckboxChange1(checkbox)}/> <br />
          {/* Checkbox */}
           <span className="">{checkbox}</span>
        </label>
      ))}
     <span style={{fontWeight:500}}>R</span> </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="DateOn"
                      id="pass"
                      onChange={(e) => onChangeReceived(e)}
                      value={received.DateOn}
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
                      const receiveUrl="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddPatientTotalSetsDoctorReceived";


                      let n={
                        ...received,
                        TextForUpperAligners:received.TextForUpperAligners.toString(),
                        TextForLowerAligners:received.TextForLowerAligners.toString()
                      }

          fetch(receiveUrl,{
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(n),
           })
           .then((res)=>res.json())
           .then((receive)=>{
            console.log(receive);
            console.log(received);
            if(receive.status===true){
              Swal.fire({
                title:"Submitted Successfully!",
                icon:"success"
              })
            }
            // window.location.reload();
       
           })
                    }}
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>











              <Modal show={showRequest} onHide={handleCloseRequest} centered>
                <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Request Upper Aligners</Form.Label>
                    <Form.Control
                      type="text"
                      name="TotalNoOfUpperSets"
                      onChange={(e) => onChangeRequest(e)}
                      value={requestSets.TotalNoOfUpperSets}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Request Lower Aligners</Form.Label>
                    <Form.Control
                      type="text"
                      name="TotalNoOfLowerSets"
                      onChange={(e) => onChangeRequest(e)}

                      value={requestSets.TotalNoOfLowerSets}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="DateOn"
                      id="pass"
                      onChange={(e) => onChangeRequest(e)}

                      value={requestSets.DateOn}
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
                      const reqUrl="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddSetsDoctorToAdmin";

          fetch(reqUrl,{
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestSets),
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
            }

            setTimeout(() => {
              
               window.location.reload();
            }, 2000);
       
           })
                    }}
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AlloactedSetsList;
