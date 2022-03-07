import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Container, Dropdown, Form, FormGroup, Button, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
  const amountRef = useRef(null);
  const descriptionRef = useRef(null);
  const infor_sent = {
    bankName: bankSelect,
    accountName: accountName,
    number: accountID,
    amount: amount.trim(),
    description: description,
    qrType: qrType.toLowerCase(),
  }
  const reg = new RegExp('^[0-9]+$');
  console.log(accountID);
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

  const submitHandler = (e) => {
    e.preventDefault();
    if(reg.test(infor_sent.amount)) {
      window.location.href="https://img.vietqr.io/image/" + bankSelect + '-' + infor_sent.number + '-' + infor_sent.qrType + '.png?amount=' + infor_sent.amount + '&addInfo=' + infor_sent.description + '&accountName=' + infor_sent.accountName;
    } else {
      descriptionRef.current.classList.add("required-field");
      amountRef.current.classList.add("required-field");
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
      className="d-flex align-items-center"
      style={{ height: "100vh" }}
    >
      <Container
        className="bg-white text-dark p-5 app-container"
        style={{ width: "40%", height: "80vh", borderRadius: "3rem", boxShadow: '0px 1px 20px rgba(0,0,0,.6)' }}
      >
        <Form className="d-flex flex-column justify-content-between" style={{height: "100%"}} onSubmit={submitHandler} >
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
            className="disabled-class py-1 px-4 position-relative"
            style={{ borderRadius: "1.2rem" }}
          >
            <Form.Text className="text-uppercase fw-light">
              Bank Number
            </Form.Text>
            <Form.Control
              className="fs-5 fw-bold p-0 "
              type="text"
              // placeholder="19031500578010"
              value={accountID} 
              onChange={(e) => setAccountID(e.target.value)}
            />
              <span style={{fontSize: "12px"}} className={`transition error-emptyfield ${!accountID ? 'text-danger':'d-none'}`}>Please enter this field</span>

          </FormGroup>

          <FormGroup
            className="disabled-class py-1 px-4 position-relative"
            style={{ borderRadius: "1.2rem" }}
          >
            <Form.Text className="text-uppercase fw-light">Full Name</Form.Text>
            <Form.Control
              className="fs-5 fw-bold text-uppercase p-0"
              type="text"
              // placeholder="Nguyen Huynh Quoc Trung"
              // disabled
              // readOnly
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
              <span style={{fontSize: "12px"}} className={`transition error-emptyfield ${!accountName ? 'text-danger':'d-none'}`}>Please enter this field</span>

          </FormGroup>
          <FormGroup
            className="disabled-class py-1 px-4 position-relative"
            style={{ borderRadius: "1.2rem" }}
            ref={amountRef}>
            <Form.Text className="text-uppercase fw-light">
              Amount (VND)
            </Form.Text>
            <Form.Control className="fs-5 fw-bold p-0" type="text" 
            // placeholder="Example: 50000" 
            onChange={amountHandler} />
              <span style={{fontSize: "12px"}} className={`transition error-numbertype ${amount && !reg.test(infor_sent.amount) ? 'text-danger':'d-none'}`} id="error-numbertype">Please enter valid number</span>
              <span style={{fontSize: "12px"}} className={`transition error-emptyfield ${!amount ? 'text-danger':'d-none'}`} >Please enter this field</span>
          </FormGroup>
          <FormGroup
            className="disabled-class py-1 px-4 position-relative"
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
            className="disabled-class py-1 px-4"
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
    </Container>
  );
}

export default App;
