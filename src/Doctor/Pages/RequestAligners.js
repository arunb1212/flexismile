import React,{useState,useEffect} from "react";
import "../../Doctor/Styles/RequestAligners.css";
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
  // import "../Styles/AllocatedSetsList.css";
  import user from "../../Assets/user.png";
  import logo from "../../Assets/Logoremovebg.png";
  import { IoMdNotifications } from "react-icons/io";
  import { FiMessageSquare, FiPower } from "react-icons/fi";
  import { FaBars, FaEdit } from "react-icons/fa";
  import { useNavigate } from "react-router-dom";
  import { CgProfile } from "react-icons/cg";
  import Swal from "sweetalert2";
  import {LinkContainer} from 'react-router-bootstrap';
  import { TagsInput } from "react-tag-input-component";

function RequestAligners(){
    const [showRequest, setShowRequest] = useState(false);

    const handleCloseRequest = () => setShowRequest(false);
    const handleShowRequest = () => setShowRequest(true);

    const navigate = useNavigate();
    const [search, setSearch] = useState("");
  
    const [filteredNames, setFilteredNames] = useState([]);


    const [selected, setSelected] = useState([]);
    const [selected1, setSelected1] = useState([]);




    const [showOrder, setShowOrder] = useState(false);

    const handleCloseOrder = () => setShowOrder(false);
    const handleShowOrder = () => setShowOrder(true);

    const [showOrder1, setShowOrder1] = useState(false);

    const handleCloseOrder1 = () => setShowOrder1(false);
    const handleShowOrder1 = () => setShowOrder1(true);





  
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
    let RoleId = sessionStorage.getItem("Role");

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

const [data, setData] = useState([])

const [requestSets, setRequestSets] = useState({
  PatientSetsId:"",
  PatientId:"",
  DoctorId:"",
  NoOfSets:"",
  TotalNoOfUpperSets:"",
  TotalNoOfLowerSets:"",
  DateOn:"",
  PatientTotalSetsId:"",
  TextForUpperAligners:[],
  TextForLowerAligners:[],
})

const [checkSets, setCheckSets] = useState({
  Uppersets:"",
  Lowersets:"",
  PatientId:""
})

const onChangeRequest=(e)=>{
  const newdata={...requestSets}
  newdata[e.target.name]=e.target.value;
  
  setRequestSets(newdata);
  console.log(newdata);

  let lengthOfUpper=typeof newdata.TextForUpperAligners === "string" ? newdata.TextForUpperAligners.split(",").length : (newdata.TextForUpperAligners || []).length;
  let lengthOfLower=typeof newdata.TextForLowerAligners === "string" ? newdata.TextForLowerAligners.split(",").length : (newdata.TextForLowerAligners || []).length;
  let noOfSets=lengthOfUpper+lengthOfLower;

  setRequestSets((pre)=>{
    return{
      ...pre,
      NoOfSets:noOfSets
    }
  })

  console.log(noOfSets);
}

const fetchData = async () => {
  setLoading(true);
  try {
    const docId = (RoleId === "1" && !DoctorUId) ? 0 : (DoctorUId || 0);
    const [reqListRes, allPatRes] = await Promise.all([
      fetch(`https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientSetDoctorRequestlist/0/0/${docId}`)
        .then((r) => r.json())
        .catch(() => ({ Data: [] })),
      fetch(`https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetDoctorWisePatientList/0/0/${docId}`)
        .then((r) => r.json())
        .catch(() => ({ Data: [] })),
    ]);

    const reqData = Array.isArray(reqListRes?.Data) ? reqListRes.Data : [];
    const allPatData = Array.isArray(allPatRes?.Data) ? allPatRes.Data : [];

    // Map existing patient IDs in reqData
    const existingPatientIds = new Set(reqData.map((p) => String(p.PatientId)));

    // Find patients from allPatData who are not yet in reqData (newly registered patients)
    const missingPatients = allPatData.filter(
      (p) => !existingPatientIds.has(String(p.PatientId))
    );

    // Format new patients so they match the table structure
    const formattedNewPatients = missingPatients.map((p) => ({
      ...p,
      PatientSetsId: p.PatientSetsId || "",
      PatientTotalSetsId: "0",
      TotalNoOfUpperSets: p.TotalNoOfUpperSets || p.ExpectedNoOfAligners || "",
      TotalNoOfLowerSets: p.TotalNoOfLowerSets || p.ExpectedNoOfAligners || "",
      NoOfSets:
        p.NoOfSets ||
        (p.ExpectedNoOfAligners ? String(parseInt(p.ExpectedNoOfAligners) * 2) : ""),
      Quotation: p.Quotation || "",
      AmountPaid: p.AmountPaid || "",
      DateOn: p.RegDate || "",
      UpperSetsData: [],
      LowerSetsData: [],
      isNewPatient: true,
    }));

    const combinedData = [...reqData, ...formattedNewPatients];

    setData(combinedData);
    setFilteredNames(combinedData);
  } catch (error) {
    console.error("Error fetching request aligners data:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, [DoctorUId]);

const [totalUpper, setTotalUpper] = useState(0);
const [totalLower, setTotalLower] = useState(0);


    const columns = [
        {
          name: "Patient Code",
          selector: (row) => row.PatientId,
          sortable: true,
        },
        {
          id:"center",
          name: "Patient Name",
          selector: (row) => row.Name,
          sortable: true,
        },
        {
          name: "Case No",
          selector: (row) => row.CaseNo,
          sortable: true,
          // center:true,
        },
        {
          id:"center",
          name: "Total Upper Aligners",
          selector: (row) => row.TotalNoOfUpperSets || row.ExpectedNoOfAligners || "-",
        },
        {
          id:"center",
          name: "Total Lower Aligners",
          selector: (row) => row.TotalNoOfLowerSets || row.ExpectedNoOfAligners || "-",
        },
        {
          id:"center",
          name: "Total No. of Aligners",
          selector: (row) => row.NoOfSets || (row.ExpectedNoOfAligners ? String(parseInt(row.ExpectedNoOfAligners) * 2) : "-"),
        },
    
        {
          id:"center",
          name: "Total Amount",
          selector: (row) => row.Quotation || "-",
          sortable: true,
        },
        {
          id:"center",
          name: "Pending Amount",
          selector: (row) => (row.Quotation && row.AmountPaid) ? (parseFloat(row.Quotation) - parseFloat(row.AmountPaid)).toFixed(2) : "-",
          sortable: true,
        },
        {
          id:"center",
          name: "Last Order Date",
          selector: (row) => row.DateOn ? row.DateOn.split(" ")[0] : (row.RegDate ? row.RegDate.split(" ")[0] : "-"),
          sortable: true,
        },
       
        
        {
          id:"center",
          name:"Request for Aligners",
          cell: (row) => (
            <Button variant="" className="edit-patient-btn" onClick={async ()=>{
              setUpperChecked([]);
              setLowerChecked([]);
              setIsCompleteSet(false);
              setAlignerType("");

              let upperCount = parseInt(row.TotalNoOfUpperSets) || 0;
              let lowerCount = parseInt(row.TotalNoOfLowerSets) || 0;

              if (!upperCount || !lowerCount) {
                try {
                  const pRes = await fetch(`https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientAllList/${row.PatientId}`);
                  const pData = await pRes.json();
                  const pInfo = pData?.Data?.[0];
                  if (pInfo) {
                    const exp = parseInt(pInfo.ExpectedNoOfAligners) || 20;
                    upperCount = parseInt(pInfo.TotalNoOfUpperSets) || exp;
                    lowerCount = parseInt(pInfo.TotalNoOfLowerSets) || exp;
                  }
                } catch (e) {
                  console.error("Error fetching patient details:", e);
                }
              }

              if (!upperCount) upperCount = 20;
              if (!lowerCount) lowerCount = 20;

              setTotalUpper(upperCount);
              setTotalLower(lowerCount);

              setRequestSets((pre)=>{
                return{
                  ...pre,
                  PatientSetsId:row.PatientSetsId || "",
                  PatientId:row.PatientId,
                  DoctorId:DoctorUId,
                  PatientTotalSetsId:row.PatientTotalSetsId || "0",
                  TotalNoOfUpperSets: upperCount,
                  TotalNoOfLowerSets: lowerCount,
                  NoOfSets: upperCount + lowerCount,
                  TextForUpperAligners: [],
                  TextForLowerAligners: []
                }
              });

              setCheckSets((pre)=>{
                return{
                  ...pre,
                  PatientId:row.PatientId
                }
              });

              handleShowRequest();
            }}>
              Request
            </Button>
          ),
        }
    
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

      useEffect(() => {
        const result = data.filter((item) => {
          const s = search.toLowerCase();
          return (
            (item.PatientId?.toString() || "").toLowerCase().includes(s) ||
            (item.CaseNo || "").toLowerCase().includes(s) ||
            (item.Name || "").toLowerCase().includes(s)
          );
        });
        setFilteredNames(result);
      }, [search]);


      // const [checkboxes, setCheckboxes] = useState([]);

      
          // const handleCheckboxChange = (index) => {
          //   const updatedCheckboxes = [...checkboxes];
          //   updatedCheckboxes[index] = !updatedCheckboxes[index];
          //   setUpperChecked(updatedCheckboxes);
        
          //   console.log(UpperChecked);
          // };
    
      // const generateCheckboxes = () => {
      //   const checkboxesArray = [];
      //   for (let i = 0; i < totalUpper; i++) {
      //     checkboxesArray.push(
      //       <div key={i} style={{display:"flex",flexDirection:"row",columns:"30px 12"}}>
      //         <Row>
      //           <Col>
                
      //         <input
      //           type="checkbox"
      //           id={`checkbox-${i}`}
      //           checked={checkboxes[i] || false}
      //           onChange={() => handleCheckboxChange(i)}
      //         />
      //         <label htmlFor={`checkbox-${i}`}>{`Checkbox ${i + 1}`}</label>
      //           </Col>
      //         </Row>
      //       </div>
      //     );
      //   }
      //   return checkboxesArray;
      // };
    
      // const a = 20; 

      const [UpperChecked, setUpperChecked] = useState([]);
      const [LowerChecked, setLowerChecked] = useState([]);
      const [isCompleteSet, setIsCompleteSet] = useState(false);
      const [alignerType, setAlignerType] = useState("");

      const a = 20;
  const checkboxes = Array.from({ length: totalUpper }, (_, index) => index + 1);
  const checkboxes1 = Array.from({ length: totalLower }, (_, index) => index + 1);

  const handleSelectCompleteSet = (checked) => {
    setIsCompleteSet(checked);
    if (checked) {
      // Select all upper aligners including T and R
      const allUpper = ["T", ...Array.from({ length: totalUpper }, (_, i) => i + 1), "R"];
      setUpperChecked(allUpper);
      setRequestSets((pre) => ({
        ...pre,
        TextForUpperAligners: allUpper,
      }));
      // Select all lower aligners including T and R
      const allLower = ["T", ...Array.from({ length: totalLower }, (_, i) => i + 1), "R"];
      setLowerChecked(allLower);
      setRequestSets((pre) => ({
        ...pre,
        TextForLowerAligners: allLower,
      }));
    } else {
      // Deselect all
      setUpperChecked([]);
      setLowerChecked([]);
      setRequestSets((pre) => ({
        ...pre,
        TextForUpperAligners: [],
        TextForLowerAligners: [],
      }));
    }
  };



  // const [UpperSetsReqBody, setUpperSetsReqBody] = useState({
  //   Uppersets:[],
  //   PatientSetsId:requestSets.PatientSetsId
  // })

  const [modalCheckboxValue, setModalCheckboxValue] = useState(null);
  const [modalCheckboxValue1, setModalCheckboxValue1] = useState(null);


  let UpperSetsReqBody={
    Uppersets:[],
    
  }
  let UpperSetsReqBody1={
    Uppersets:[],
    PatientSetsId:requestSets.PatientSetsId
  }

  const upperUrl=`https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/CheckUppersets`;

  const uppercheckFunc=()=>{

    

    let n={
      Uppersets:UpperSetsReqBody1.Uppersets.toString(),
      PatientSetsId:requestSets.PatientSetsId

    }
    fetch(upperUrl,{
      method:"POST",
        headers:{
          Accept: "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(n)
    })
    .then((res)=>res.json())
    .then((checked)=>{
      console.log(checked);
      if(checked.status===true){
        handleShowOrder1();
        // handleCloseRequest();
      }
    })

    console.log(n);
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
          PatientSetsId:requestSets.PatientSetsId
      }
      UpperSetsReqBody={
        Uppersets:UpperChecked.filter((item) => item !== checkbox),

      }

      setRequestSets((pre)=>{
        return{
          ...pre,
          TextForUpperAligners:UpperSetsReqBody.Uppersets
        }
      })
    } else {
      setUpperChecked([...UpperChecked, checkbox]);
      // setUpperSetsReqBody({
        setModalCheckboxValue(checkbox);

      //     Uppersets:[...UpperChecked, checkbox],
      //     PatientSetsId:requestSets.PatientSetsId
        
      // })

      UpperSetsReqBody1={
        Uppersets:checkbox,
          PatientSetsId:requestSets.PatientSetsId
      }
      UpperSetsReqBody={
        Uppersets:[...UpperChecked, checkbox],

      }

      setRequestSets((pre)=>{
        return{
          ...pre,
          TextForUpperAligners:UpperSetsReqBody.Uppersets
        }
      })
      if (typeof checkbox === 'number' && requestSets.PatientSetsId) {
        uppercheckFunc();
      }
    }


    console.log(UpperSetsReqBody1);
    // console.log(modalCheckboxValue);
  };



  let LowerSetsReqBody={
    Lowersets:[],
    // PatientSetsId:requestSets.PatientSetsId
  }
  let LowerSetsReqBody1={
    Lowersets:[],
    PatientSetsId:requestSets.PatientSetsId
  }


  const lowerUrl=`https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/CheckLowersets`;


  const lowercheckFunc=()=>{

    

    let n={
      Lowersets:LowerSetsReqBody1.Lowersets.toString(),
      PatientSetsId:requestSets.PatientSetsId

    }
    fetch(lowerUrl,{
      method:"POST",
        headers:{
          Accept: "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(n)
    })
    .then((res)=>res.json())
    .then((checked)=>{
      console.log(checked);
      if(checked.IsCheck===1){
        handleShowOrder();
        // handleCloseRequest();
      }
    })

    console.log(n);
  }



  const handleCheckboxChange1 = (checkbox) => {
    if (LowerChecked.includes(checkbox)) {
      setLowerChecked(LowerChecked.filter((item) => item !== checkbox));

      LowerSetsReqBody1={
        Lowersets:LowerChecked.filter((item) => item !== checkbox),
          PatientSetsId:requestSets.PatientSetsId
      }
      LowerSetsReqBody={
        Lowersets:LowerChecked.filter((item) => item !== checkbox),
        
      }
      setRequestSets((pre)=>{
        return{
          ...pre,
          TextForLowerAligners:LowerSetsReqBody.Lowersets
        }
      })
    } else {
      setLowerChecked([...LowerChecked, checkbox]);
      setModalCheckboxValue1(checkbox);

      LowerSetsReqBody1={
        Lowersets:checkbox,
          PatientSetsId:requestSets.PatientSetsId
      }
      LowerSetsReqBody={
        Lowersets:[...LowerChecked, checkbox],
      
      }
      setRequestSets((pre)=>{
        return{
          ...pre,
          TextForLowerAligners:LowerSetsReqBody.Lowersets
        }
      })
      if (typeof checkbox === 'number' && requestSets.PatientSetsId) {
        lowercheckFunc();
      }
    }

    console.log(LowerSetsReqBody1);
  };
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


      <Container fluid>
        <Row className="justify-content-center">
          <Col md={10}>
            <Row
              className="mt-5 mb-5 p-2 p-md-5 pt-5 m-0 m-xs-1"
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
                  expandableRows
                  expandableRowsComponent={({data})=>{

                    let lower=(data?.LowerSetsData || []).map(i=>i.NoOfLowerSets);
                    let upper=(data?.UpperSetsData || []).map(i=>i.NoOfUpperSets);
                    return (
                      <Row className="p-3" style={{ backgroundColor: "#fafafa" }}>
                        <Col>
                          <p className="mb-1">Ordered Upper Aligners: <span>{upper.length > 0 ? upper.join(", ") : "None"}</span></p>
                          <p className="mb-0">Ordered Lower Aligners: <span>{lower.length > 0 ? lower.join(", ") : "None"}</span></p>
                        </Col>
                      </Row>
                    )
                  }}
                //  onRowClicked={(e)=>{
                //   console.log(e);
                //  }}

                 
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
           
            










              <Modal show={showRequest} onHide={handleCloseRequest} centered size="lg"  style={{ display: 'flex' }}>
                <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <Form.Check
                    type="checkbox"
                    id="complete-set-checkbox"
                    label="Select Complete Set (All Upper & Lower Aligners)"
                    checked={isCompleteSet}
                    onChange={(e) => handleSelectCompleteSet(e.target.checked)}
                    className="mb-3"
                    style={{ fontWeight: "bold", fontSize: "16px", color: "#C49358" }}
                  />

                  <div className="mb-4">
                    <Form.Label style={{ fontWeight: "bold", fontSize: "15px", color: "#333" }}>Aligner Type:</Form.Label>
                    <div className="d-flex flex-wrap gap-4 mt-1">
                      <Form.Check
                        inline
                        type="radio"
                        id="type-partial"
                        label="Partial"
                        name="alignerTypeSelection"
                        value="Partial"
                        checked={alignerType === "Partial"}
                        onChange={(e) => setAlignerType(e.target.value)}
                        style={{ fontWeight: "600", cursor: "pointer" }}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        id="type-retainer"
                        label="Retainer"
                        name="alignerTypeSelection"
                        value="Retainer"
                        checked={alignerType === "Retainer"}
                        onChange={(e) => setAlignerType(e.target.value)}
                        style={{ fontWeight: "600", cursor: "pointer" }}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        id="type-nightguard"
                        label="Night Guard"
                        name="alignerTypeSelection"
                        value="Night Guard"
                        checked={alignerType === "Night Guard"}
                        onChange={(e) => setAlignerType(e.target.value)}
                        style={{ fontWeight: "600", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                  <hr />

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="totalUpperInput">
                        <Form.Label className="modal-lbl">Total Upper Sets Count</Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          max="100"
                          value={totalUpper}
                          onChange={(e) => {
                            const val = Math.max(0, parseInt(e.target.value) || 0);
                            setTotalUpper(val);
                            setRequestSets((pre) => ({
                              ...pre,
                              TotalNoOfUpperSets: val,
                              NoOfSets: val + (parseInt(totalLower) || 0),
                            }));
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="totalLowerInput">
                        <Form.Label className="modal-lbl">Total Lower Sets Count</Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          max="100"
                          value={totalLower}
                          onChange={(e) => {
                            const val = Math.max(0, parseInt(e.target.value) || 0);
                            setTotalLower(val);
                            setRequestSets((pre) => ({
                              ...pre,
                              TotalNoOfLowerSets: val,
                              NoOfSets: (parseInt(totalUpper) || 0) + val,
                            }));
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="modal-lbl">Request Upper Aligners set no.</Form.Label>
                    <div className="mt-3">
                      <label className="m-3 text-center">
                        <input
                          type="checkbox"
                          checked={UpperChecked.includes("T")}
                          onChange={() => handleCheckboxChange("T")}
                        /> <br />
                        <span style={{ fontWeight: 500 }}>T</span>
                      </label>
                      {checkboxes.map((checkbox,i) => (
                        <label key={checkbox} className="m-3 text-center">
                          <input
                            type="checkbox"
                            checked={requestSets.TextForUpperAligners.includes(checkbox) || UpperChecked.includes(checkbox)}
                            onChange={() => handleCheckboxChange(checkbox)}
                          /> <br />
                           <span className="">{checkbox}</span>
                        </label>
                      ))}
                      <label className="m-3 text-center">
                        <input
                          type="checkbox"
                          checked={UpperChecked.includes("R")}
                          onChange={() => handleCheckboxChange("R")}
                        /> <br />
                        <span style={{ fontWeight: 500 }}>R</span>
                      </label>
                    </div>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="modal-lbl">Request Lower Aligners set no.</Form.Label>

                    <div>
                      <label className="m-3 text-center">
                        <input
                          type="checkbox"
                          checked={LowerChecked.includes("T")}
                          onChange={() => handleCheckboxChange1("T")}
                        /> <br />
                        <span style={{ fontWeight: 500 }}>T</span>
                      </label>
                      {checkboxes1.map((checkbox,i) => (
                        <label key={checkbox} className="m-3 text-center">
                          <input
                            type="checkbox"
                            checked={requestSets.TextForLowerAligners.includes(checkbox) || LowerChecked.includes(checkbox)}
                            onChange={() => handleCheckboxChange1(checkbox)}
                          /> <br />
                           <span className="">{checkbox}</span>
                        </label>
                      ))}
                      <label className="m-3 text-center">
                        <input
                          type="checkbox"
                          checked={LowerChecked.includes("R")}
                          onChange={() => handleCheckboxChange1("R")}
                        /> <br />
                        <span style={{ fontWeight: 500 }}>R</span>
                      </label>
                    </div>
                  </Form.Group>

{/* <TagsInput
        value={selected1}
        onChange={setSelected1}
        name="TextForLowerAligners"
        placeHolder=""
      /> */}


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

                      value={requestSets.DateOn}
                      required
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    type="submit"
                    variant=""
                    disabled={submitting}
                    style={{
                      backgroundColor: "#C49358",
                      color: "white",
                    }}
                    onClick={async (e) => {
                      if (!requestSets.DateOn) {
                        Swal.fire({
                          icon: "warning",
                          title: "Date is required!",
                        });
                        return;
                      }

                      setSubmitting(true);
                      try {
                        let currentPatientSetsId = requestSets.PatientSetsId;

                        // If new patient without PatientSetsId, create the PatientSets entry first
                        if (!currentPatientSetsId || currentPatientSetsId === "0" || currentPatientSetsId === "") {
                          try {
                            const initSetsUrl = "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddPatientTotalSets";
                            await fetch(initSetsUrl, {
                              method: "POST",
                              headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                PatientId: String(requestSets.PatientId),
                                TotalNoOfUpperSets: String(totalUpper || 20),
                                TotalNoOfLowerSets: String(totalLower || 20),
                              }),
                            });

                            // Retrieve the generated PatientSetsId
                            const docId = (RoleId === "1" && !DoctorUId) ? 0 : (DoctorUId || 0);
                            const checkRes = await fetch(`https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientSetDoctorRequestlist/0/0/${docId}`);
                            const checkData = await checkRes.json();
                            const found = (checkData?.Data || []).find((p) => String(p.PatientId) === String(requestSets.PatientId));
                            if (found && found.PatientSetsId) {
                              currentPatientSetsId = found.PatientSetsId;
                            }
                          } catch (initErr) {
                            console.error("Error creating patient sets:", initErr);
                          }
                        }

                        const reqUrl = "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddSetsDoctorToAdmin";

                        let n = {
                          ...requestSets,
                          PatientSetsId: currentPatientSetsId || requestSets.PatientSetsId || 0,
                          AlignerType: alignerType,
                          TextForUpperAligners: (requestSets.TextForUpperAligners || []).toString(),
                          TextForLowerAligners: (requestSets.TextForLowerAligners || []).toString(),
                        };

                        console.log("Submitting request:", n);

                        const res = await fetch(reqUrl, {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(n),
                        });
                        const request = await res.json();
                        console.log(request);
                        if (request.status === true) {
                          Swal.fire({
                            title: "Submitted Successfully!",
                            icon: "success",
                          });
                          setTimeout(() => {
                            window.location.reload();
                          }, 2000);
                        } else {
                          Swal.fire({
                            title: "Something went wrong!",
                            text: request.message || "",
                            icon: "error",
                          });
                        }
                      } catch (err) {
                        console.error("Submission error:", err);
                        Swal.fire({
                          title: "Something went wrong!",
                          icon: "error",
                        });
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </Button>
                </Modal.Footer>
              </Modal>











              <Modal show={showOrder} onHide={handleCloseOrder} centered backdrop="static" keyboard="false">
              <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sets already ordered, want to reorder sets?</Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={()=>{
            // UpperSetsReqBody={
            //   Uppersets:UpperChecked.filter((item) => item !== modalCheckboxValue),
      
            // }

            let smthg=requestSets.TextForLowerAligners.indexOf(modalCheckboxValue);

            requestSets.TextForLowerAligners.splice(smthg,1)
            LowerChecked.splice(smthg,1)
      
            // setRequestSets((pre)=>{
            //   return{
            //     ...pre,
            //     TextForUpperAligners:requestSets.TextForUpperAligners.filter((item) => item !== modalCheckboxValue)
            //   }
            // })

            // if(requestSets.TextForUpperAligners.includes(modalCheckboxValue)){
            //   alert(modalCheckboxValue)
            // }

            console.log(LowerSetsReqBody);
            console.log(requestSets);

            handleCloseOrder();

          }}>
            No
          </Button>
          <Button variant=""  style={{
                      backgroundColor: "#C49358",
                      color: "white",
                    }} onClick={()=>{
            // handleShowOrder();
            LowerSetsReqBody={
              Lowersets:[...LowerChecked, modalCheckboxValue],
      
            }

            setRequestSets((pre)=>{
              return{
                ...pre,
                TextForLowerAligners:LowerSetsReqBody.Lowersets
              }
            })
            handleCloseOrder();
          }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>





              <Modal show={showOrder1} onHide={handleCloseOrder1} centered backdrop="static" keyboard="false">
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sets already ordered, want to reorder sets?</Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={()=>{
            // UpperSetsReqBody={
            //   Uppersets:UpperChecked.filter((item) => item !== modalCheckboxValue),
      
            // }

            let smthg=requestSets.TextForUpperAligners.indexOf(modalCheckboxValue);

            requestSets.TextForUpperAligners.splice(smthg,1)
            UpperChecked.splice(smthg,1)
      
            // setRequestSets((pre)=>{
            //   return{
            //     ...pre,
            //     TextForUpperAligners:requestSets.TextForUpperAligners.filter((item) => item !== modalCheckboxValue)
            //   }
            // })

            // if(requestSets.TextForUpperAligners.includes(modalCheckboxValue)){
            //   alert(modalCheckboxValue)
            // }

            console.log(UpperSetsReqBody);
            console.log(requestSets);

            handleCloseOrder1();

          }}>
            No
          </Button>
          <Button variant=""  style={{
                      backgroundColor: "#C49358",
                      color: "white",
                    }} onClick={()=>{
            // handleShowOrder();
            UpperSetsReqBody={
              Uppersets:[...UpperChecked, modalCheckboxValue],
      
            }

            setRequestSets((pre)=>{
              return{
                ...pre,
                TextForUpperAligners:UpperSetsReqBody.Uppersets
              }
            })
            handleCloseOrder1();
          }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
          </Col>
        </Row>
      </Container>
        </>
    );
}

export default RequestAligners;