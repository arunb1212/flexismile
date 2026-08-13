import React,{useState,useEffect,useRef} from "react";
import user from "../../Assets/user.png";
import logo from "../../Assets/Logoremovebg.png";
import { IoMdNotifications } from "react-icons/io";
import { FiMessageSquare, FiPower } from "react-icons/fi";
import { FaBars, FaEdit,FaUpload,FaCalendarAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbUser } from "react-icons/tb";

import {
    Container,
    Row,
    Col,
    Nav,
    Button,
    Navbar,
    Dropdown,
    Tab,
    InputGroup,
    Card,
    Stack,
    Form,
    ProgressBar,
    Tabs
  } from "react-bootstrap";
import { useNavigate,useParams } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';
import $ from "jquery";
import axios from "axios";
import Swal from "sweetalert2";

function EditDoctor(){
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








  const [data, setData] = useState({
    DoctorId:"",
    FirstName: "",
    LastName: "",
    PracticeName: "",
    PracticeName1: "",
    ClinicType: "",
    ClinicName: "",
    TaxID: "",
    Street1: "",
    Street2: "",
    // City: "",
    // Country: "",
    // State: "",
    PostalCode: "",
    PracticeWebsite: "",
    Fax: "",
    PracticeEmail: "",
    PhoneNo: "",
    mode: "2",
    CountryId: "",
    StateID: "",
    CityID: "",
  });


  const urlParams = useParams()
  console.log(urlParams);
const ID=urlParams.DoctorId;  



  const [ddet, setDDet] = useState([]);
      const url2 =
        "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetDoctorSelect/"+ID;
    
      useEffect(() => {
        fetch(url2)
          .then((res) => res.json())
          .then((list) => {
            console.log(list.Data);
            setDDet(list.Data);
            setData(pre=>{
              return{...pre,DoctorId:list.Data[0]?.DoctorID,
              FirstName:list.Data[0]?.Name.split(' ')[0],
              LastName:list.Data[0]?.Name.split(' ')[1],
              PracticeName:list.Data[0]?.PracticeName,
              PracticeName1:list.Data[0]?.PracticeName1,
              ClinicType:list.Data[0]?.ClinicType || "",
              ClinicName:list.Data[0]?.ClinicName || list.Data[0]?.PracticeName || "",
              TaxID:list.Data[0]?.TaxID,
              Street1:list.Data[0]?.Address.split(',')[0],
              Street2:list.Data[0]?.Address.split(',')[1],
              CountryId:list.Data[0]?.Address.split(',')[2],
              StateID:list.Data[0]?.Address.split(',')[3],
              CityID:list.Data[0]?.Address.split(',')[4],
              PostalCode:list.Data[0]?.Address.split(',')[5],
              PracticeWebsite:list.Data[0]?.PracticeWebsite,
              Fax:list.Data[0]?.Fax,
              PracticeEmail:list.Data[0]?.PracticeEmail,
              PhoneNo:list.Data[0]?.PhoneNo
              }
            })
            console.log(data.DoctorId);
          });
  }, []);




  const [checked, setChecked] = useState({
    isSelCCountry: false,
    isSelPCountry: false,
    isSelCState: false,
    isSelPState: false,
    isSelCCity: false,
    isSelPCity: false,
  });

  const [countries, setCountries] = useState({
    currentCountries: [],
  });
  const [states, setStates] = useState({
    currentStates: [],
  });
  const [cities, setCities] = useState({
    currentCities: [],
  });

  function handle(e) {
    
    const newdata={...data}
    newdata[e.target.name]=e.target.value;
    
    setData(newdata);
    console.log(newdata);
    


    switch (e.target.name) {
      case "CountryId": {
        setChecked((preData) => {
          return {
            ...preData,
            isSelCCountry: true,
            isSelCState: false,
            isSelCCity: false,
          };
        });
        getStates(e.target.value, "current");
        setCities((preData) => {
          return {
            ...preData,
            currentCities: [],
          };
        });
        setData((preData) => {
          return {
            ...preData,
            CurrentCountryId: e.target.value,
            CurrentStateId: "",
            CurrentCityId: "",
          };
        });
        break;
      }
      case "StateID": {
        setChecked((preData) => {
          return { ...preData, isSelCState: true, isSelCCity: false };
        });
        getCities(e.target.value, "current");
        setData((preData) => {
          return {
            ...preData,
            CurrentCityId: "",
          };
        });
        break;
      }
      case "CityID": {
        setChecked((preData) => {
          return { ...preData, isSelCCity: true };
        });
        break;
      }
    }
  }

  const getStates = async (countryId, cORp) => {
    let url = `https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetStatelist/${countryId}`;
    let state = await (await fetch(url)).json();
    console.log(state.Data);
    if (cORp === "current") {
      setStates({
        ...states,
        currentStates: state.Data,
      });
    }
  };

  const getCities = async (stateId, cORp) => {
    let url = `https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetCitylist/${stateId}`;
    let city = await (await fetch(url)).json();
    console.log(city.Data);
    if (cORp === "current") {
      setCities({
        ...cities,
        currentCities: city.Data,
      });
    }
  };

  const getCountries = async () => {
    let url = "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/GetCoutryList";
    let country = await (await fetch(url)).json();
    console.log(country.Data.slice(0, 2));
    setCountries({
      ...countries,
      currentCountries: country.Data,
      // permCountries: country.Data.slice(0, 2),
    });
    // console.log(countries);
  };

  useEffect(() => {
    getCountries();
  }, []);
  

  // const tglContent = () => {
  //   let Menu = document.querySelector(".menuTab");

  //   if (Menu.classList.contains("collapsed")) {
  //     Menu.classList.remove("collapsed");
  //   } else {
  //     Menu.classList.add("collapsed");
  //   }
  // };

  const url =
    "https://www.orthosquareportal.com/FlexismileApi/FlexAlign.svc/AddDoctorRegistration";

  const [validated, setValidated] = useState(false);


let Role=sessionStorage.getItem("Role");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

       
    }

    setValidated(true);

    const payload = {
      ...data,
      ClinicType: data.ClinicType,
      ClinicName: data.ClinicName || data.PracticeName,
    };

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log(result.message);
        if(result.DoctorId==="-1"){
          alert("Already exists!")
        }
        if (result.status === "1" && form.checkValidity() === true) {
          Swal.fire({
            title: "Registered Successfully!",
            // text: 'Do you want to continue',
            icon: "success"
            // confirmButtonText: 'Cool'
          })

        }

        if(Role==="1"){
          navigate("/view-doctors");

        }else{
          alert("Something went wrong!")
        }
        
      });

   
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
                <Dropdown className="out-dd">
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
                        // sessionStorage.clear();
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
        <Row style={{height:"30px"}}></Row>
        <Row className="justify-content-center mt-3">
          <Col md={10}>
            <Card className="mb-3 border-0 p-crd">
              <Row className="justify-content-center">
                <Col md={8}>
                  <Card className="border-1 p-4 mt-5 mb-5">
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
                      <Row className="">
                        <Col md={6}>
                          <Form.Group controlId="validationCustom01">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              required
                              type="text"
                              onChange={(e) => handle(e)}
                              name="FirstName"
                              // defaultValue={ddet[0]?.Name.split(' ')[0]}
                              // pattern="[A-Za-z]"
                              value={data.FirstName}
                              placeholder="Enter First Name"
                              className="p-3"
                            />
                            <Form.Control.Feedback type="invalid">
                              Enter First Name!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="validationCustom01">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              required
                              onChange={(e) => handle(e)}
                              name="LastName"
                              value={data.LastName}
                            // defaultValue={ddet[0]?.Name.split(' ')[1]}
                              type="text"
                              placeholder="Enter Last Name"
                              className="p-3"
                            />
                            <Form.Control.Feedback type="invalid">
                              Enter Last Name!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col md={6}>
                          <Form.Group controlId="validationCustom01">
                            <Form.Label>Practice Name</Form.Label>
                            <Form.Control
                              // required
                              type="text"
                              onChange={(e) => handle(e)}
                              name="PracticeName"
                              value={data.PracticeName}
                            // defaultValue={ddet[0]?.PracticeName}
                              placeholder="Enter Practice Name"
                              className="p-3"
                            />
                            {/* <Form.Control.Feedback type="invalid">Enter Practice Name!</Form.Control.Feedback> */}
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="validationCustom01">
                            <Form.Label>Practice Name1</Form.Label>
                            <Form.Control
                              // required
                              type="text"
                              onChange={(e) => handle(e)}
                              name="PracticeName1"
                              value={data.PracticeName1}
                            // defaultValue={ddet[0]?.PracticeName1}
                              placeholder="Enter Practice Name1"
                              className="p-3"
                            />
                            {/* <Form.Control.Feedback type="invalid">Enter Practice Name1!</Form.Control.Feedback> */}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col md={6}>
                          <Form.Group controlId="validationCustom01">
                            <Form.Label>Tax ID</Form.Label>
                            <Form.Control
                              // required
                              onChange={(e) => handle(e)}
                              name="TaxID"
                              value={data.TaxID}
                            // defaultValue={ddet[0]?.TaxID}
                              type="text"
                              placeholder="Enter Tax ID"
                              className="p-3"
                            />
                            {/* <Form.Control.Feedback type="invalid">Enter Tax ID!</Form.Control.Feedback> */}
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mt-5">
                        <Col>
                          <p className="add-t">ADDRESS</p>
                        </Col>
                      </Row>

                      <Row className="mt-2">
                        <Col md={6}>
                          <Form.Group controlId="validationCustom01">
                            <Form.Label>Street 1</Form.Label>
                            <Form.Control
                              // required
                              onChange={(e) => handle(e)}
                              name="Street1"
                              value={data.Street1}
                            // defaultValue={ddet[0]?.Address.split(',')[0]}
                              type="text"
                              placeholder="Enter Street"
                              className="p-3"
                            />
                            {/* <Form.Control.Feedback type="invalid">Enter Practice Name!</Form.Control.Feedback> */}
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="validationCustom01">
                            <Form.Label>Street 2</Form.Label>
                            <Form.Control
                              // required
                              onChange={(e) => handle(e)}
                              name="Street2"
                              value={data.Street2}
                            // defaultValue={ddet[0]?.Address.split(',')[1]}

                              type="text"
                              placeholder="Enter Practice Name1"
                              className="p-3"
                            />
                            {/* <Form.Control.Feedback type="invalid">Enter Practice Name1!</Form.Control.Feedback> */}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        {countries.currentCountries && (
                          <Col md={6}>
                            <Form.Group controlId="validationCustom01">
                              <Form.Label>Country</Form.Label>
                              <Form.Select
                                aria-label="Default select example"
                                className="p-3"
                                name="CountryId"
                                onChange={(e) => handle(e)}
                                // className="p-3"
                                value={data.CountryId}
                            // defaultValue={ddet[0]?.Address.split(',')[2]}

                              >
                                <option value="" selected>
                                  {data.CountryId}
                                </option>
                                {countries.currentCountries &&
                                  countries.currentCountries.map((country) => {
                                    return (
                                      <option
                                        value={country.CountryId}
                                        key={country.CountryId}
                                        // selected={country.CountryId == data.CurrentCountryId}
                                      >
                                        {country.CountryName}
                                      </option>
                                    );
                                  })}
                              </Form.Select>

                              <Form.Control.Feedback type="invalid">
                                Enter Country!
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        )}
                        {states.currentStates && (
                          <Col md={6}>
                            <Form.Group controlId="validationCustom01">
                              <Form.Label>State</Form.Label>
                              <Form.Select
                                aria-label="Default select example"
                                className="p-3"
                                name="StateID"
                                onChange={(e) => handle(e)}
                                // className="p-3"
                                disabled={!checked.isSelCCountry}
                                value={data.StateID}
                            // defaultValue={ddet[0]?.Address.split(',')[3]}

                              >
                                <option value="" selected>
                                  {data.StateID}
                                </option>
                                {states.currentStates &&
                                  states.currentStates.map((state) => {
                                    return (
                                      <option
                                        value={state.StateID}
                                        key={state.StateID}
                                        // selected={state.StateId == data.CurrentStateId}
                                      >
                                        {state.StateName}
                                      </option>
                                    );
                                  })}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                Enter State!
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        )}
                      </Row>

                      <Row className="mt-3">
                        {cities.currentCities && (
                          <Col md={6}>
                            <Form.Group controlId="validationCustom01">
                              <Form.Label>City</Form.Label>

                              <Form.Select
                                aria-label="Default select example"
                                className="p-3"
                                name="CityID"
                                onChange={(e) => handle(e)}
                                // className="p-3"
                                value={data.CityID}
                            // defaultValue={ddet[0]?.Address.split(',')[4]}

                                disabled={
                                  !checked.isSelCCountry || !checked.isSelCState
                                }
                              >
                                <option value="" selected>
                                {data.CityID}
                                </option>
                                {cities.currentCities &&
                                  cities.currentCities.map((city) => {
                                    return (
                                      <option
                                        value={city.CityID}
                                        key={city.CityId}
                                      >
                                        {city.CityName}
                                      </option>
                                    );
                                  })}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                Enter City!
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        )}
                        <Col md={6}>
                          <Form.Group controlId="validationCustom01">
                            <Form.Label>Postal Code</Form.Label>

                            <Form.Control
                              required
                              onChange={(e) => handle(e)}
                              name="PostalCode"
                              value={data.PostalCode}
                            // defaultValue={ddet[0]?.Address.split(',')[5]}

                              type="text"
                              placeholder="Enter Postal Code"
                              className="p-3"
                            />
                            <Form.Control.Feedback type="invalid">
                              Enter Postal Code!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mt-3">
                        <Col md={6}>
                          <Form.Group controlId="validationCustom01">
                            <Form.Label>Practice Website</Form.Label>

                            <Form.Control
                              // required
                              onChange={(e) => handle(e)}
                              name="PracticeWebsite"
                              value={data.PracticeWebsite}
                            // defaultValue={ddet[0]?.PracticeWebsite}

                              type="text"
                              placeholder="Enter Practice Website"
                              className="p-3"
                            />
                            {/* <Form.Control.Feedback type="invalid">Enter Fax!</Form.Control.Feedback> */}
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="validationCustom01">
                            <Form.Label>Fax</Form.Label>

                            <Form.Control
                              // required
                              onChange={(e) => handle(e)}
                              name="Fax"
                              value={data.Fax}
                            // defaultValue={ddet[0]?.Fax}
                            
                              type="text"
                              placeholder="Enter Fax"
                              className="p-3"
                            />
                            <Form.Control.Feedback type="invalid">
                              Enter Fax!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mt-3">
                        <Col md={6}>
                          <Form.Group controlId="validationCustom01">
                            <Form.Label>Practice Email</Form.Label>

                            <Form.Control
                              required
                              onChange={(e) => handle(e)}
                              name="PracticeEmail"
                              value={data.PracticeEmail}
                            // defaultValue={ddet[0]?.PracticeEmail}

                              type="email"
                              placeholder="Enter Practice Email"
                              className="p-3"
                            />
                            <Form.Control.Feedback type="invalid">
                              Enter Practice Email!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="validationCustom01">
                            <Form.Label>Phone No</Form.Label>

                            <Form.Control
                              required
                              onChange={(e) => handle(e)}
                              name="PhoneNo"
                              value={data.PhoneNo}
                            // defaultValue={ddet[0]?.PhoneNo}
                              type="number"
                              placeholder="Enter Phone No."
                              className="p-3"
                            />
                            <Form.Control.Feedback type="invalid">
                              Enter Phone No!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      {/* <Row className="mt-3">
                        <Col md={6}>
                          <Form.Group controlId="validationCustom01">
                            <Form.Label>Password</Form.Label>

                            <Form.Control
                              required
                              type="password"
                              onChange={(e) => handle(e)}
                              name="Password"
                              value={data.Password}
                              placeholder="Enter Password"
                              className="p-3"
                            />
                            <Form.Control.Feedback type="invalid">
                              Enter Password!
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>

                            <Form.Control
                              required
                              onChange={(e) => handle(e)}
                              name="ConfirmPassword"
                              value={data.ConfirmPassword}
                              type="password"
                              placeholder="Enter Confirm Password"
                              className="p-3"
                            />
                          </Form.Group>
                        </Col>
                      </Row> */}

                      <Row className="text-center mt-3">
                        <Col>
                          <Button
                            variant=""
                            type="submit"
                            className="doc-signup"
                          >
                            Update
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row style={{height:"30px"}}></Row>
      </Container>
        </>
    );
}


export default EditDoctor;