import React, { useState, useEffect } from "react";
import "../components/home.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import getlit from "../helpers/AlchemyNFT";
import AccessToken from "../contracts/AccessToken.json";
import { ethers } from "ethers";
import {createNewFlow} from "../helpers/superfluid"


const Dashboard = ({ name, address, image, price,teamId ,tokenUri}) => {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let Bal=0;
  const Accesstoken = new ethers.Contract(
    AccessToken.networks[80001].address,
    AccessToken.abi,
    signer 
  )

  
  
  const mintNFT = async()=>{
    //event.preventDefault();
    console.log(price)
   if(address.toLowerCase() === localStorage.getItem("CurrentAccount").toLowerCase()){
     address = "0x721d8574379BF9bB88a4Ca3442cCE095556279A7"
   }
    createNewFlow(price,address)
   
    console.log(teamId)
    const nft = await Accesstoken.CreateLicense(localStorage.getItem('CurrentAccount'),tokenUri,Number(teamId));
    console.log("Minting....")
    let tx = await nft.wait()
    console.log('Mined!', tx)
    let evente = tx.events[0]
    let value = evente.args[2]
    let tokenId = value.toNumber()
    console.log(tokenId)
    setTimeout(window.location.reload(false),2000); 
    alert("Congratulations you are Subscribed")
  }
  const [count, setCount] = useState(0);


  useEffect(() => {
    (async () => {
      const temp = await getlit(localStorage.getItem("CurrentAccount"),teamId)
      setCount(temp);
    })();
  })
  console.log(count);
  return (
    <>
      <div class="container-fluid col-md-12">
        <div class="card">
          <Image>
            <img
              src={image}
              style={{
                height: "250px",
                width: "350px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              class="card-img-top"
            />
          </Image>
          <div class="card-body">
            {name}
            {count || localStorage.getItem('CurrentAccount').toLowerCase()===localStorage.getItem('CurrentCreator').toLowerCase() ? 
            <a class="d-grid btn btn-primary mx-auto">
            <Link
              to={address}
              onClick={() => localStorage.setItem("CurrentCreator", address)}
              style={{ textDecoration: "none", color: "#FFF" }}
            >
              View
            </Link>
          </a>
            : 
            <a onClick = {mintNFT} class="d-grid btn btn-primary mx-auto">
            Subscribe - {price}$/month
            
          </a>
            }
          </div>
        </div>
 

      </div>
    </>
  );
};

export default Dashboard;

const Image = styled.div`
  > img {
    height: 100%;
    width: 100%;
  }
`;
