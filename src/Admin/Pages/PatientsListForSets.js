import React, { useState, useEffect, useMemo,
  useCallback,useRef } from "react";
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
} from "react-bootstrap";
import "../../Doctor/Styles/PatientList.css";
import user from "../../Assets/user.png";
import logo from "../../Assets/Logoremovebg.png";
import { IoMdNotifications } from "react-icons/io";
import { FiMessageSquare, FiPower } from "react-icons/fi";
import { FaBars, FaEye } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Male from "../../Assets/Male.png";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

function PatientsListForSets() {
  const navigate = useNavigate();
  
  const urlParams = useParams();
  console.log(urlParams);
  const ID = urlParams.DoctorUserId;

  // const getPatient = async () => {
  //   console.log(urlParams);
  //   try {
  //     const response = await axios.get(
  //       // "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientDetailsList/0/0/" +
  //       //   ID
  //       "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientSetDetails/0/0/" +
  //       ID
  //     );
  //     setPatient(response.data.Data);
  //     setFilteredNames(response.data.Data);
  //     console.log(response.data.Data);
  //     if(response.data.Data.StatusSets==="Pending"){
  //       response.data.Data.StatusSets.style.color="red"
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const RoleId = sessionStorage.getItem("Role");
  let DoctorUserID = sessionStorage.getItem("DocUserId");


// ----------------------------------------------------------------------------------------


const gridRef = useRef(); // Optional - for accessing Grid's API
const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

const [sets, setSets] = useState({
  PatientSetsId:"",
  PatientId:"",
  DoctorId:"",
  TotalNoOfUpperSets:"",
  TotalNoOfLowerSets:"",
  TextForUpperAligners:"",
  TextForLowerAligners:"",
  DateOn:""
})


let id1;
let id2;
let id3=sessionStorage.getItem("SDID");
let pname=sessionStorage.getItem("PNAME");

const [ID1, setID1] = useState("");
const [ID2, setID2] = useState("");







const cellClickedListener = useCallback((event) => {
  console.log("cellClicked", event);
  sessionStorage.setItem("pID",event.data.PatientId);
  sessionStorage.setItem("PSID",event.data.PatientSetsId);
  sessionStorage.setItem("SDID",event.data.DoctorId);
  sessionStorage.setItem("PNAME",event.data.Name);
  
id1=event.data.PatientId;
id2=event.data.PatientSetsId;
  console.log(event.data.PatientId);
  console.log(event.data.PatientSetsId);
 

  getTotalSetsView();
  //  navigate("")
}, []);








const [totalUpper, setTotalUpper] = useState(0);
const [totalLower, setTotalLower] = useState(0);


const [columnDefs, setColumnDefs] = useState([
   
  {
    headerName: "Patient Code",
    field: "PatientId",
    floatingFilter: true,
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Patient Name",
    field: "Name",
    filter: "agTextColumnFilter",
    floatingFilter: true,
  },
  {
    field: "CaseNo",
    floatingFilter:true,
    filter: "agTextColumnFilter",
    // filterParams: {
    //   buttons: ["reset", "apply"],
    // },
  },
  { headerName:"Clinic Name",field: "ClinicName", filter: "agTextColumnFilter",
  // filterParams: {
  //   buttons: ["reset", "apply"],
  // },
  floatingFilter:true,

},
  { headerName:"Doctor Name",field: "DoctorName", filter: "agTextColumnFilter",
  // filterParams: {
  //   buttons: ["reset", "apply"],
  // },
  floatingFilter:true,

},
  { headerName:"Upper Aligners",field: "TotalNoOfUpperSets", filter: "agTextColumnFilter",
  // filterParams: {
  //   buttons: ["reset", "apply"],
  // },
  floatingFilter:true,

},
  { headerName:"Lower Aligners",field: "TotalNoOfLowerSets", filter: "agTextColumnFilter",
  // filterParams: {
  //   buttons: ["reset", "apply"],
  // },
  floatingFilter:true,

},

  
  { headerName:"Total Of Aligners",field: "NoOfSets", filter: "agNumberColumnFilter",
  // filterParams: {
  //   buttons: ["reset", "apply"],
  // },
  floatingFilter:true,

  //  cellRenderer: "agGroupCellRenderer"
   },
  {
    field: "Dispatch Aligners",
    cellRenderer: (row) => {
      const buttonClicked = () => {
        // handleShow();
        handleShowRequest();
            setSets((pre)=>{
              return{...pre,
                PatientId:row.data.PatientId,
                PatientSetsId:row.data.PatientSetsId,
              DoctorId:row.data.DoctorId
              }
            })

            setTotalUpper(row.data.TotalNoOfUpperSets);
            setTotalLower(row.data.TotalNoOfLowerSets);

            console.log(row.data.TotalNoOfUpperSets);
      };
      return (
        <>
          <span>
            {/* <span>{cellValue}</span>&nbsp; */}
            <Button
              variant=""
              style={{ color: "#C49358" }}
              onClick={() => buttonClicked()}
            >
              Send
            </Button>
          </span>
        </>
      );
    },
  },
  { headerName: "Total Sets Status", field:"StatusSets",
  cellClassRules:{
    'cell-green' : param=>param.value==="Received"
  }
  ,filter: "agTextColumnFilter",
  // filterParams: {
  //   buttons: ["reset", "apply"],
  // },
  floatingFilter:true,
  

  //  cellRenderer: "agGroupCellRenderer"
   },
//   {
//     field: "Report",
//     cellRenderer: (event) => {
//       const buttonClicked = () => {
       
//         // console.log(e);
//         sessionStorage.setItem("pID",event.data.PatientId);
//   sessionStorage.setItem("PSID",event.data.PatientSetsId);
// let patId=sessionStorage.getItem("pID")

//         navigate(`/alloc-report/${patId}`);
//       };
//       return (
//         <>
//           <span>
//             {/* <span>{cellValue}</span>&nbsp; */}
//             <Button
//               variant=""
//               style={{ color: "#C49358" }}
//               onClick={() => buttonClicked()}
//             >
//               Reports
//             </Button>
//           </span>
//         </>
//       );
//     },
//   },
]);





const [UpperChecked, setUpperChecked] = useState([]);
const [LowerChecked, setLowerChecked] = useState([]);





const checkboxes = Array.from({ length: totalUpper }, (_, index) => index + 1);
const checkboxes1 = Array.from({ length: totalLower }, (_, index) => index + 1);





const [modalCheckboxValue, setModalCheckboxValue] = useState(null);
const [modalCheckboxValue1, setModalCheckboxValue1] = useState(null);



let UpperSetsReqBody={
  Uppersets:[],
  
}
let UpperSetsReqBody1={
  Uppersets:[],
  PatientSetsId:sets.PatientSetsId
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
      setModalCheckboxValue(checkbox);

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
    // uppercheckFunc();
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
    setModalCheckboxValue1(checkbox);

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

  console.log(LowerSetsReqBody1);
};







  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    // editable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  }));



    // Example of consuming Grid Event
   

    


    // Example load data from sever
  useEffect(() => {
    fetch(
      "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientTotalsetDetails/0/0/0"
    )
      .then((result) => result.json())
      .then((rowData) => {
        console.log(rowData.Data);
        setRowData(rowData.Data);
      });
    console.log(rowData);
  }, []);




  const paginationNumberFormatter = useCallback((params) => {
    return "[" + params.value.toLocaleString() + "]";
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.paginationGoToPage(4);
  }, []);

  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById("page-size").value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);


  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "Group",
      minWidth: 170,
      field: "athlete",
      valueGetter: (params) => {
        if (params.node.group) {
          return params.node.key;
        } else {
          return params.data[params.colDef.field];
        }
      },
      headerCheckboxSelection: true,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        checkbox: true,
      },
    };
  }, []);



















  

  const subGridRef = useRef(); // Optional - for accessing Grid's API

  const [rd, setRd] = useState();






  var filterParams = {
    comparator: (filterLocalDateAtMidnight, cellValue) => {
      var dateAsString = cellValue;
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split('/');
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
    },
    browserDatePicker: true,
    minValidYear: 2000,
    maxValidYear: 2080,
    inRangeFloatingFilterDateFormat: 'Do MMM YYYY',
  };




  const [cols, setCols] = useState([
    { headerName:"Dispatched Aligners",field: "NoOfSets", filter: "agNumberColumnFilter",
    // filterParams: {
    //   buttons: ["reset", "apply"],
    // },
    floatingFilter:true, 
  
  },
    { headerName:"Dispatch Date",field: "DispatchDate", filter: "agNumberColumnFilter",
    // filterParams: {
    //   buttons: ["reset", "apply"],
    // },
    floatingFilter:true, 
  
  },
    { headerName:"Upper Aligners",field: "TextForUpperAligners", filter: "agNumberColumnFilter",
    // filterParams: {
    //   buttons: ["reset", "apply"],
    // },
    floatingFilter:true, },
    { headerName:"Lower Aligners",field: "TextForLowerAligners", filter: "agNumberColumnFilter",
    // filterParams: {n 
    //   buttons: ["reset", "apply"],
    // },
    floatingFilter:true, },
    { headerName:"Delivery Date",field: "ReceivedDate", filter: 'agDateColumnFilter',
    filterParams: filterParams, floatingFilter:true, format:"YYYY-MM-DD"},
    { headerName:"Delivery Status",field: "ReceiveStatusSets", filter: "agTextColumnFilter",
    // filterParams: {
    //   buttons: ["reset", "apply"],
    // },
    floatingFilter:true, },


    

    
    // {field: 'PatientId', filter: true},
    // {field: 'CaseNo', filter: 'agTextColumnFilter',
    // filterParams: {
    //   buttons: ['reset', 'apply'],
    // },},
    // {field: 'NoOfSets',filter:true,cellRenderer: 'agGroupCellRenderer'},
  ]);



  const defColsDef = useMemo(() => ({
    // editable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  }));



  // useEffect(() => {

  const getTotalSetsView=()=>{
    fetch(
      `https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetPatientTotalsetView/${id1}/${id2}`
    )
      .then((result) => result.json())
      .then((subrow) => {
        console.log(subrow.Data);
        setRd(subrow.Data);
      });
    console.log(rd);
  }
    
  // }, [rd]);




































  const onChangeSet=(e)=>{
    const newdata={...sets}
    newdata[e.target.name]=e.target.value;
    
    setSets(newdata);
    console.log(newdata);
    setSets((pre)=>{
      return{...pre,
        PatientId:id1,
        PatientSetsId:id2,
      DoctorId:id3
      }
    })
  }


  // const columns = [
  //   {
  //     name: "Patient Code",
  //     selector: (row) => row.PatientId,
  //     sortable: true,
  //   },
  //   {
  //     name: "CaseNo",
  //     selector: (row) => row.CaseNo,
  //     sortable: true,
  //   },
  //   {
  //     name: "Name",
  //     selector: (row) => row.Name,
  //   },
  //   {
  //     name: "Doctor Name",
  //     selector: (row) => row.DoctorName,
  //     sortable: true,
  //   },
  //   {
  //     name: "No. of Sets",
  //     selector: (row) => row.NoOfSets,
  //     sortable: true,
  //   },
  //   {
  //     name: "Sets allocated",
  //     selector: (row) => row.SendTotalSets,
  //     sortable: true,
  //   },
  //   {
  //     name: "Dispatch Aligners",
  //     cell: (row) => (
  //       <button
  //         className="edit-patient-btn"
  //         onClick={() => {
  //           // RoleId==="1"? navigate(`/patient-details/${row?.PatientId}`):navigate(`/patient-details-doc/${row?.PatientId}`);
  //           // console.log(patient);
  //           handleShow();
  //           setSets((pre)=>{
  //             return{...pre,PatientSetsId:row.PatientSetsId,
  //             PatientId:row.PatientId,
  //             DoctorId:row.DoctorId
  //             }
  //           })
  //           // console.log(sets);
  //         }}
  //       > send
  //       </button>
  //     ),
  //   },
  //   {
  //     name: "Status",
  //     selector: (row) => row.StatusSets,
  //     conditionalCellStyles: [
  //       {
  //           when: row => row.StatusSets==="Dispatched",
  //           classNames: ['red-text'],
  //       },
  //       {
  //           when: row => row.StatusSets==="Received",
  //           classNames: ['green-text'],
  //       }
       
  //   ],

  //   },

  //   {
  //     name: "Receiving status",
  //     selector: (row) => row.ReceiveStatusSets,
  //     conditionalCellStyles: [
  //       {
  //           when: row => row.ReceiveStatusSets==="Dispatched",
  //           classNames: ['red-text'],
  //       },
  //       {
  //           when: row => row.ReceiveStatusSets==="Received",
  //           classNames: ['green-text'],
  //       }
       
  //   ],

  //   },
   
  //   // {
  //   //   // name: `${RoleId==="1"?"Action":""}`,
  //   //   cell: row => RoleId==="1"? <button className="edit-patient-btn" onClick={()=>{navigate(`/payment/${row?.PatientId}`)
  //   // sessionStorage.setItem("Pid",row.PatientId)
  //   // }}>Payment</button>:""
  //   // }
  // ];


  







  const submitSets=(e)=>{
    e.preventDefault();

   const setsallocUrl="https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddPatientTotalSetsAdmintToDoctor";
    
   

   let n={
    ...sets,
    TextForUpperAligners:sets.TextForUpperAligners.toString(),
    TextForLowerAligners:sets.TextForLowerAligners.toString()
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
    console.log(sets);
    if(result.status===true){
      Swal.fire({
        title:"Submitted Successfully!",
        icon:"success"
      })

      setTimeout(() => {
        
        window.location.reload();
      }, 1000);
    }
   })

  }

  // useEffect(() => {
  //   getPatient();
  // }, []);

  // useEffect(() => {
  //   const result = patient.filter((patientname) => {
  //     return patientname.Name.toLowerCase().match(search.toLowerCase());
  //   });
  //   setFilteredNames(result);
  // }, [search]);
  const tglContent = () => {
    let Menu = document.querySelector(".menuTab");

    if (Menu.classList.contains("collapsed")) {
      Menu.classList.remove("collapsed");
    } else {
      Menu.classList.add("collapsed");
    }
  };

  let DoctorName = sessionStorage.getItem("DocName");

  const [show, setShow] = useState(false); 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  const [showRequest, setShowRequest] = useState(false);

  const handleCloseRequest = () => setShowRequest(false);
  const handleShowRequest = () => setShowRequest(true);
  


  const onChangeRequest=(e)=>{
    const newdata={...sets}
    newdata[e.target.name]=e.target.value;
    
    setSets(newdata);
    console.log(newdata);
  
    let lengthOfUpper=newdata.TextForUpperAligners.length;
    let lengthOfLower=newdata.TextForLowerAligners.length;
    let noOfSets=lengthOfUpper+lengthOfLower;
  
    setSets((pre)=>{
      return{
        ...pre,
        TotalNoOfUpperSets:lengthOfUpper,
        TotalNoOfLowerSets:lengthOfLower
      }
    })
  
    console.log(sets);
  
  // let UpperNo=newdata.TextForUpperAligners;
  // let LowerNo=newdata.TextForLowerAligners;
  //   setCheckSets((pre)=>{
  //     return{
  //       ...pre,
  //       Uppersets:UpperNo,
  //       Lowersets:LowerNo
  //     }
  //   })
  
  // console.log("Checking Sets");
  // console.log(checkSets);
  
  
    // const checkUrl=`https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/CheckSets`;
  
  
  
    // let n={
    //   ...checkSets,
    //   Uppersets:UpperNo,
    //   Lowersets:LowerNo
    // }
    // fetch(checkUrl,{
    //   method:"POST",
    //     headers:{
    //       Accept: "application/json",
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(n)
    // })
    // .then((res)=>res.json())
    // .then((checked)=>{
    //   console.log(checked);
    //   if(checked.IsCheck===1){
    //     handleShowOrder1();
    //     handleCloseRequest();
    //   }
    // })
  }


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
                <FiMessageSquare fontSize={30} color="#C49358" className="me-2 notification" />
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
                    <Dropdown.Item href="#/action-1">
                      <CgProfile fontSize={25} />
                      <span className="px-3">Profile</span>
                    </Dropdown.Item>
                    <hr />
                    <Dropdown.Item href="#/action-2">
                      <FiPower fontSize={25} />
                      <span
                        className="px-3"
                        onClick={() => {
                          navigate("/");
                          // sessionStorage.clear();
                        }}
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
      <Container fluid className="pb-5">
        {/* {RoleId === "1" ? (
          ""
        ) : ( */}
          <Row className="menuTab">
            <Col>
              <Card body className="border-0">
                <Nav className="justify-content-center">
                  <Nav.Link
                    href=""
                    className="doc-tab active"
                    onClick={() =>
                     RoleId==="3"? navigate("/prodn-dash"):navigate("/admin-dashboard")
                    }
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
        {/* )} */}
        <Container fluid>
          <Row className="justify-content-center mt-5 mb-5 m-4"  style={{
                backgroundColor: "white",
                boxShadow: "0px 0px 15px  #C49358",
                borderRadius: "8px",
              }}>
            <Col md={10}>
              <Row>
                <Col
                  className="mt-5 mb-5"
                  // style={{ border: "solid 0.1em lightgray" }}
                >
                  {/* <DataTable
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
                        placeholder="Search by Name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      ></input>
                    }
                  /> */}




<Row>
              <Col
                className="ag-theme-alpine"
                style={{ width: 500, height: 500 }}
              >
                {/* <DataTable
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
                        placeholder="Search by Name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      ></input>
                    }
                  /> */}
                {/* <button onClick={buttonListener}>Push Me</button> */}
                <div className="example-header mb-2">
                  Page Size:
                  <select onChange={onPageSizeChanged} id="page-size">
                    <option value="10" selected={true}>
                      10
                    </option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                  </select>
                </div>

                <AgGridReact
                  className=""
                  ref={gridRef} // Ref for accessing Grid's API
                  rowData={rowData}
                  columnDefs={columnDefs}
                  autoGroupColumnDef={autoGroupColumnDef}
                  defaultColDef={defaultColDef}
                  suppressRowClickSelection={true}
                  groupSelectsChildren={true}
                  rowSelection={"multiple"}
                  rowGroupPanelShow={"always"}
                  pivotPanelShow={"always"}
                  pagination={true}
                  
                  paginationPageSize={10}
                  paginationNumberFormatter={paginationNumberFormatter}
                  // onGridReady={onGridReady}
                  masterDetail={true}
                  onCellClicked={cellClickedListener}
                  // detailCellRendererParams={detailCellRendererParams}
                  // detailCellRendererParams={()=>{
                  //   return(
                  //     <>
                  //     <p>jdskdhiald</p>
                  //     <AgGridReact
                  //     ref={subGridRef}
                  //     rowData={rd}
                  //     columnDefs={cols}
                  //     defaultColDef={defColsDef}
                  //     />
                  //     </>
                  //   );
                  // }}
                  // detailCellRenderer={() => {
                  //   return (
                  //     <>
                        
                  //     </>
                  //   );
                  // }}
                />

              </Col>
            </Row>

            <Row className="mt-5">
              <Col className="mt-5">
                <p className="fs-3">Details of Total Sets Allocated to <u>{pname}</u>.</p>
              </Col>
            </Row>
<Row className="mt-2">
                  <Col className="ag-theme-alpine"
                style={{ width: 500, height: 300 }}>

<div className="example-header mb-2">
                  Page Size:
                  <select onChange={onPageSizeChanged} id="page-size">
                    <option value="10" selected={true}>
                      10
                    </option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                   
                  </select>
                </div>
                  <AgGridReact
                      ref={subGridRef}
                      rowData={rd}
                      columnDefs={cols}
                      defaultColDef={defColsDef}

                      autoGroupColumnDef={autoGroupColumnDef}
                     
                      suppressRowClickSelection={true}
                      groupSelectsChildren={true}
                      rowSelection={"multiple"}
                      // rowGroupPanelShow={"always"}
                      pivotPanelShow={"always"}
                      pagination={true}
                    
                      paginationPageSize={10}
                      paginationNumberFormatter={paginationNumberFormatter}
                      // onGridReady={onGridReady}
                      // masterDetail={true}
                      // onCellClicked={cellClickedListener}
                      />
                  </Col>
                </Row>





                </Col>
              </Row>
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
                      onChange={(e) => onChangeSet(e)}
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
                      onChange={(e) => onChangeSet(e)}
                      value={sets.TotalNoOfLowerSets}
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
                      onChange={(e) => onChangeSet(e)}
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
                    onClick={(e)=>submitSets(e)}
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>




              <Modal show={showRequest} onHide={handleCloseRequest} centered size="lg"  style={{ display: 'flex' }}>
                <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="modal-lbl">Send Upper Aligners set no.</Form.Label>
                    {/* <Form.Control
                      type="text"
                      name="TextForUpperAligners"
                      onChange={(e) => onChangeRequest(e)}
                      value={requestSets.TextForUpperAligners}
                      required
                    /> */}
{/* {generateCheckboxes()} */}
<div>
      {checkboxes.map((checkbox,i) => (
        <label key={checkbox} className="m-3">
          <input type="checkbox"               checked={sets.TextForUpperAligners.includes(i+1)}
 onChange={() => handleCheckboxChange(checkbox)}/> <br />
          {/* Checkbox */}
           <span className="">{checkbox}</span>
        </label>
      ))}
    </div>
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
                    <Form.Label className="modal-lbl">Send Lower Aligners set no.</Form.Label>
                    {/* <Form.Control
                      type="text"
                      name="TextForLowerAligners"
                      onChange={(e) => onChangeRequest(e)}

                      value={requestSets.TextForLowerAligners}
                      required
                    /> */}

<div>
      {checkboxes1.map((checkbox,i) => (
        <label key={checkbox} className="m-3">
          <input type="checkbox" checked={sets.TextForLowerAligners.includes(i+1)} onChange={() => handleCheckboxChange1(checkbox)}/> <br />
          {/* Checkbox */}
           <span className="">{checkbox}</span>
        </label>
      ))}
    </div>

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
                   onClick={(e)=>submitSets(e)}
                    
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default PatientsListForSets;
