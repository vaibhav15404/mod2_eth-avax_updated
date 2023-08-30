import { useState, useEffect } from "react";
import { ethers } from "ethers";
// import "../App.css"
import AssessmentABI from "../artifacts/contracts/Assessment.sol/Assessment.json";

const nameAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function HomePage() {
  // Property Variables

  const [message, setMessage] = useState("");
  const [currentNaming, setCurrentNaming] = useState("");

  // Requests access to the user's Meta Mask Account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // Fetches the current value store in greeting
  async function fetchNaming() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        nameAddress,
        AssessmentABI.abi,
        provider
      );
      try {
        const data = await contract.name();
        console.log("data: ", data);
        setCurrentNaming(data);
        // document.="App".style.backgroundColor=data;
        document.getElementById("app").style.backgroundColor=data;
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  // Sets the greeting from input text box
  async function setNaming() {
    if (!message) return;
  
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        nameAddress,
        AssessmentABI.abi,
        signer
      );
  
      try {
        const transaction = await contract.setNaming(message);
        setMessage("");
        await transaction.wait();
        fetchNaming();
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  

  return (
    
    <div className="App" id="app" style={{
      margin:"0px",
      // padding:"200px",
      // backgroundImage: "linear-gradient(indigo,grey)",
      // backgroundColor:message,
      color:"white",
      borderRadius:"0px",
      display:"flex",
      justifyContent: "center",
      height:"95vh",
      maxHeight: "95vh",
      padding: "100px",
      display:"flex",
      justifyItems:"center",
      // alignItems:"center"
    }}>
      <div className="App-header">
        {/* DESCRIPTION  */}
        <div className="description">
          <h1 style={{color: 'white',fontSize:"50px",fontFamily:"sans-serif"}}>Change Background color</h1>
          {/* <h2 style={{color: 'black',fontFamily:"sans-serif"}}>Change background </h2> */}
          {/* <h4 style={{color: 'black',fontFamily:"sans-serif"}}>( Project: Frontend Demonstration )</h4> */}
        </div>
        {/* BUTTONS - Fetch and Set */}
        <div className="custom-buttons">
          {/* <button onClick={fetchNaming} style={{ 
            padding:"20px",
            border:"3px black solid",
            borderRadius:"10px",
            marginBottom:"10px",
            marginRight:"20px",
            color:"black",
            }}>
            Fetch your Currency name
          </button> */}
          <button onClick={setNaming} style={{ 
            backgroundColor: "white",
            border:"3px black solid",
            padding:"20px",
            borderRadius:"10px",
            marginBottom:"10px",
            marginRight:"20px" ,
            color:"black",
            fontWeight:"bolder"
            }}>
            Click to Change background
          </button>
        </div>
        {/* INPUT TEXT - String  */}
        <input
          id="input"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Enter background color"
          style={{
            justifyContent: "center",
            border:"3px black solid",
            marginTop:"10px",
            padding:"20px",
            borderRadius:"10px",
            width:"220px",
          }}
        />

        {/* Current Value stored on Blockchain */}
        <h2 className="naming" style={{
          padding:"20px",
          backgroundColor: "white",
          color:"black",
          border: "3px solid black",
          borderRadius:"10px",
          justifyContent: "center",
        }}>Color Name: {currentNaming}</h2>
      </div>
    </div>
  );
}
