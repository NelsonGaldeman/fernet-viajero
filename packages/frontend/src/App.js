import React, { useState, useEffect } from "react";
import { GraphQLClient, gql } from 'graphql-request';
import { GoMarkGithub } from "react-icons/go";
import { 
  tiempoTranscurridoHoras, 
  diferenciaEnSegundos, 
  tiempoTranscurrido, 
  truncateHexString
} from "./utils";
import { ethers } from "ethers";

const endpoint = "https://api.thegraph.com/subgraphs/name/nelsongaldeman/fernet-viajero";

const getENSData = async (address) => {
  // const provider = new ethers.InfuraProvider(
  //   "mainnet",
  //   process.env.REACT_APP_INFURA_KEY
  // );
  // const provider = new ethers.AlchemyProvider(
  //   "mainnet",
  //   process.env.REACT_APP_ALCHEMY_KEY
  // )

  const provider = new ethers.QuickNodeProvider(
    "mainnet",
    process.env.REACT_APP_QUICKNODE_KEY
  )

  try {
    // Query ENS for the domain associated with the address
    const domain = await provider.lookupAddress(address);

    let avatar;
    if (domain) {
      // Query ENS for the avatar associated with the domain
      // avatar = await provider.getAvatar(domain);
    }

    return { domain, avatar };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const processHolder = async (holder, skipEns = false) => {
  holder.tiempoHumano = tiempoTranscurridoHoras(
    diferenciaEnSegundos(holder.timestamp)
  );
  holder.recibido = tiempoTranscurrido(diferenciaEnSegundos(holder.timestamp));
  holder.addressHuman = truncateHexString(holder.address, 6, 4);
  holder.overtime = holder.tiempo >= 86400 ? "💀" : "";
  holder.link = "https://welook.io/" + holder.address;
  
  if (skipEns) {
    return holder;
  }

  let ens = await getENSData(holder.address);
  if (ens && ens.domain) {
    holder.ens = {
      domain: ens.domain,
      avatar: ens.avatar
    };
  }
  return holder;
}

function App({ src, fallbackSrc, ...props }) {
  const [current, setCurrent] = useState(null);
  const [holders, setHolders] = useState(null);
  const [loaded, setLoaded] = useState(null);
  const [imgSrc, setImgSrc] = useState(src);

  function handleImgError() {
    setImgSrc(fallbackSrc);
  }

  const load = async () => {
    const client = new GraphQLClient(endpoint);

    let query = gql`
      query {
        currents(id: "1") {
          address
          block
          timestamp
        }
      }
    `
    let response = await client.request(query);
    let owner = await processHolder(response.currents[0]);
    setCurrent(owner);

    query = gql`
      query {
        previousHolders(orderBy: block, orderDirection: desc) {
          address
          tiempo
          timestamp
        }
      }
    `;

    response = await client.request(query);
    
    let holdersArr = [];
    for (let i = 0; i < response.previousHolders.length; i++) {
      holdersArr.push(await processHolder(response.previousHolders[i],true));
    }

    setHolders(holdersArr);
    setLoaded(true);

    holdersArr = [];
    for (let i = 0; i < response.previousHolders.length; i++) {
      holdersArr.push(await processHolder(response.previousHolders[i]));
    }
    setHolders(holdersArr);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button
            onClick={() =>
              window.open("https://github.com/NelsonGaldeman/fernet-viajero")
            }
            aria-label="github"
            id="github"
            title="Github"
          >
            <GoMarkGithub size="5vh" color="#b7aeb4" />
          </button>
        </div>
        <h1>El Viajero</h1>
        <main>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Holder</th>
                <th>Hold <p></p> time</th>
                <th>Recibido</th>
              </tr>
            </thead>
            {!loaded ? (
              <tbody>
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    Cargando...
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td>Escabiando...</td>
                  <td>
                    <a target="_blank" href={current.link}>
                    <img src={current.ens ? (current.ens.avatar ? current.ens.avatar : '') : ''} onError={handleImgError} style={{ display: imgSrc ? 'block' : 'none' }}/>
                      <p>{current && current.ens
                        ? current.ens.domain
                        : current.addressHuman}</p>
                    </a>
                  </td>
                  <td colspan={2}>{current.tiempoHumano}</td>
                </tr>
                {holders &&
                  holders.map((holder, i) => {
                    return (
                      <tr key={i}>
                        <td>#{holders.length - i}</td>
                        <td>
                          <a target="_blank" href={holder.link}>
                            <img src={holder.ens ? (holder.ens.avatar ? holder.ens.avatar : '') : ''} onError={handleImgError} style={{ display: imgSrc ? 'block' : 'none' }}/>
                            <p>{holder.ens ? holder.ens.domain : holder.addressHuman}</p> 
                          </a>
                        </td>
                        <td>{holder.tiempoHumano}</td>
                        <td><p>{holder.recibido}</p></td>
                      </tr>
                    );
                  })}
              </tbody>
            )}
          </table>
          <h3>
            Hecho con 🫶 por{" "} &nbsp;
            <a target="_blank" href="https://twitter.com/neeel_eth">
              neeel.eth
            </a> y &nbsp;
            <a target="_blank" href="https://twitter.com/olcortesb">
                olcortesb.eth
            </a> 
          </h3>
        </main>
      </header>
    </div>
  );
}

export default App;
