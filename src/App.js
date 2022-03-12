import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Container, Dropdown, Form, FormGroup, Button, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {BsX} from "react-icons/bs";
import axios from 'axios'

// import DropdownItem from "react-bootstrap/esm/DropdownItem";
// import { BsChevronDown } from "react-icons/bs";
const url = "https://api.vietqr.io/v2/banks";

function App() {
  const [banksList, setBanksList] = useState("");
  const [loading, setLoading] = useState(true);
  const [bankSelect, setBankSelect] = useState("Vietcombank");
  const [accountID, setAccountID] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState("");
  const [description, setDes] = useState("");
  const [qrType, setQrType] = useState("Compact2");
  // const [responseImg, setResponseImg] = useState("");
  const [error, setError] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const amountRef = useRef(null);
  const descriptionRef = useRef(null);
  const fullNameRef = useRef(null);
  const numberRef = useRef(null);
  const infor_sent = {
    bankName: bankSelect,
    accountName: accountName,
    number: accountID,
    amount: amount.trim(),
    description: description,
    qrType: qrType.toLowerCase(),
  }
  const reg = new RegExp('^[0-9]+$');
  const getBanksListAPI = async () => {
    try {
      const response = await fetch(url);
      const banks = await response.json();
      setBanksList(banks.data);
      setLoading(false);
      // setBankSelect(banks.data[0].short_name);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBanksListAPI();
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(false);
    }, 3000
    )
    return () => clearTimeout(timeout)
  },[error])
  const requestURL = "https://img.vietqr.io/image/" + bankSelect + '-' + infor_sent.number + '-' + infor_sent.qrType + '.png?amount=' + infor_sent.amount + '&addInfo=' + infor_sent.description + '&accountName=' + infor_sent.accountName;

  const submitHandler = (e) => {
    e.preventDefault();
    if(reg.test(infor_sent.amount)) {
      axios.get(requestURL)
      .then(data => data.status == "200" ? setRequestSent(true) : setError(true))
      .catch(error => setError(true))
    } else {
      descriptionRef.current.classList.add("required-field");
      amountRef.current.classList.add("required-field");
      fullNameRef.current.classList.add("required-field");
      numberRef.current.classList.add("required-field");
    }
  }

  const amountHandler = (e) => {
    setAmount(e.target.value);
  }
  const descriptionHandler = (e) => {
   setDes(e.target.value);
  }
  const selectHandler = (e) => {
    setQrType(e.target.value);
  }

  if (loading) {
    return <h1 className="loading-text fw-bold">Loading</h1>;
  }
  return (
    <Container
      className="d-flex align-items-center flex-column" id="container"
    >
      <Container className="py-5 d-flex">
        <h1 className="text-uppercase fw-bold fs-1 text-center m-auto" style={{color: "white"}}>QR CODE GENERATOR</h1>
      </Container>
      <Container
        className="bg-white text-dark p-5 app-container m-auto"
        style={{ width: "40%", height: "fit-content", borderRadius: "3rem", boxShadow: '0px 1px 20px rgba(0,0,0,.6)' }}
      >
        <Form className="d-flex flex-column" style={{height: "100%"}} onSubmit={submitHandler} >
          <FormGroup
            className="disabled-class py-1 px-4"
            style={{ borderRadius: "1.2rem" }}
          >
            <Form.Text className="text-uppercase fw-light">Bank Name</Form.Text>
            <Form.Select className="fs-5 fw-bold p-0 text-uppercase" onChange={(e) => setBankSelect(e.target.value)}>
                  <option className="text-uppercase" value="Vietcombank">Vietcombank</option>
              {banksList.filter(item => item.short_name != "Vietcombank" ).map((bank) => {
                const { id, name, short_name } = bank;
                return (
                  <option
                    key={id}
                    className="text-uppercase"
                    value={short_name}
                  >
                    {short_name}
                  </option>
                );
              })}
            </Form.Select>
          </FormGroup>
          <FormGroup
            className="disabled-class py-1 px-4 position-relative mt-3"
            style={{ borderRadius: "1.2rem" }} ref={numberRef}
          >
            <Form.Text className="text-uppercase fw-light">
              Bank Number
            </Form.Text>
            <Form.Control
              className="fs-5 fw-bold p-0 "
              type="text"
              // placeholder="19031500578010"
              value={accountID}
              maxLength="19" 
              onChange={(e) => setAccountID(e.target.value)}
            />
              <span style={{fontSize: "12px"}} className={`transition error-emptyfield ${!accountID ? 'text-danger':'d-none'}`}>Please enter this field</span>

          </FormGroup>

          <FormGroup
            className="disabled-class py-1 px-4 position-relative mt-3"
            style={{ borderRadius: "1.2rem" }} ref={fullNameRef}
          >
            <Form.Text className="text-uppercase fw-light">Full Name</Form.Text>
            <Form.Control
              className="fs-5 fw-bold text-uppercase p-0"
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)} 
            />
              <span style={{fontSize: "12px"}} className={`transition error-emptyfield ${!accountName ? 'text-danger':'d-none'}`}>Please enter this field</span>

          </FormGroup>
          <FormGroup
            className="disabled-class py-1 px-4 position-relative mt-3"
            style={{ borderRadius: "1.2rem" }}
            ref={amountRef}>
            <Form.Text className="text-uppercase fw-light">
              Amount (VND)
            </Form.Text>
            <Form.Control className="fs-5 fw-bold p-0" type="text" 
            // placeholder="Example: 50000"
            maxLength={13} 
            onChange={amountHandler} />
              <span style={{fontSize: "12px"}} className={`transition error-numbertype ${amount && !reg.test(infor_sent.amount) ? 'text-danger':'d-none'}`} id="error-numbertype">Please enter valid number</span>
              <span style={{fontSize: "12px"}} className={`transition error-emptyfield ${!amount ? 'text-danger':'d-none'}`} >Please enter this field</span>
          </FormGroup>
          <FormGroup
            className="disabled-class py-1 px-4 position-relative mt-3"
            style={{ borderRadius: "1.2rem" }}
            ref={descriptionRef}>
            <Form.Text className="text-uppercase fw-light">
              Description
            </Form.Text>
            <Form.Control
              className="fs-5 fw-bold p-0"
              type="text"
              // placeholder="Example: Tien an vat"
              onChange={descriptionHandler}
            />
              <span style={{fontSize: "12px"}}className={`transition error-emptyfield ${!description ? 'text-danger':'d-none'}`}>Please enter this field</span>
          </FormGroup>
          <FormGroup
            className="disabled-class py-1 px-4 mt-3"
            style={{ borderRadius: "1.2rem" }}
          >
            <Form.Text className="text-uppercase fw-light">QR Type</Form.Text>
            <Form.Select className="fs-5 fw-bold p-0" onChange={selectHandler}>
              <option value="Compact2">COMPACT 2</option>
              <option value="compact">COMPACT</option>
              <option value="qr_only">QR Only</option>
            </Form.Select>
          </FormGroup>
          <Button className="fs-3 rounded-pill text-uppercase fw-bold mt-4 submit-btn transition"
            variant="primary"
            type="submit"
            style={{ backgroundColor: "blue", width: "100%", boxShadow: '0px 1px 30px rgba(0,0,255,.5)' }}

          >
            Generate
          </Button>
        </Form>
      </Container>
      <Container className={`warning-alert position-absolute transition d-flex align-items-center ${error ? "opacity-1" : "opacity-0"}`} style={{backgroundColor:"#e35c6a",width:"400px", height:"80px" ,top:"20px", left:"50%",borderRadius:"1.3rem", transform:"translateX(-50%)"}}> 
              <span className="m-auto fs-6" style={{color: "white"}}>
                Something went wrong! Please check again
              </span>
      </Container>
      <Container fluid className={`position-absolute transition ${requestSent ? "d-block" : "d-none"}`} style={{backgroundColor:"rgba(0,0,0,0.2)",width:"100%",height:"100%",top:"0", left: "0", bottom:"0", right:"0", backdropFilter:"blur(5px)"}}>
        <BsX className="position-absolute" style={{width: "50px", height: "auto", top:"2rem", right:"5rem", color: "white", cursor:"pointer"}} onClick={() => setRequestSent(false)}/>
        <img className="position-absolute qr-code" src={requestURL} style={{width: "350px", height: "auto", top:"50%", left:"50%", transform:"translate(-50%,-50%)", borderRadius:"1.2rem"}} />
      </Container>
    </Container>
  );
}

export default App;
