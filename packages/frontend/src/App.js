import React, { useState, useEffect } from "react";
import { GraphQLClient, gql } from 'graphql-request';
import { GoMarkGithub } from "react-icons/go";
import { tiempoTranscurrido, diferenciaEnSegundos, timestampToDateString } from "./utils";
import { ethers } from "ethers";

const endpoint = "https://api.thegraph.com/subgraphs/name/nelsongaldeman/fernet-viajero";

const getENSData = async (address) => {
  const provider = new ethers.InfuraProvider(
    "mainnet",
    "4086062dc5ab409398967ebe8485f646"
  );

  try {
    // Query ENS for the domain associated with the address
    const domain = await provider.lookupAddress(address);

    let avatar;
    if (domain) {
      // Query ENS for the avatar associated with the domain
      avatar = await provider.getAvatar(domain);
      console.log(avatar);
    }

    return { domain, avatar };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const processEns = async (holders) => {
  for (let i = 0; i < holders.length; i++) {
    let ens = await getENSData(holders[i].address);
    if (!ens.domain) {
      continue;
    }

    holders[i].ens = { domain: ens.domain, avatar: ens.avatar };
    console.log(ens);
  }

  return holders;
};

function App() {
  const [current, setCurrent] = useState(null);
  const [holders, setHolders] = useState(null);
  const [loaded, setLoaded] = useState(null);

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
    
    let owner = response.currents[0];
    owner.tiempoHumano = tiempoTranscurrido(
      diferenciaEnSegundos(owner.timestamp)
    );
    owner.recibido = timestampToDateString(owner.timestamp);

    let ownerEns = await getENSData(owner.address);
    if (ownerEns && ownerEns.domain) {
      owner.ens = {
        domain: ownerEns.domain,
        avatar: ownerEns.avatar
      };
    }

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

    response.previousHolders.forEach((holder) => {
      holder.tiempoHumano = tiempoTranscurrido(holder.tiempo) + (holder.tiempo >= 86400 ? " 💀" : "");
      holder.recibido = timestampToDateString(holder.timestamp);
      holdersArr.push(holder);
    });

    setHolders(holdersArr);
    setHolders(await processEns(holdersArr));
    setLoaded(true);
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
            <GoMarkGithub size="3vh" color="#b7aeb4" />
          </button>
        </div>
        <h1>El Viajero</h1>
        <main>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Holder</th>
                <th>Hold time</th>
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
                    {current && current.ens
                      ? current.ens.domain
                      : current.address}
                  </td>
                  <td>{current && current.tiempoHumano}</td>
                  <td>{current && current.recibido }</td>
                </tr>
                {holders &&
                  holders.map((holder, i) => {
                    return (
                      <tr key={i}>
                        <td>#{holders.length - i}</td>
                        <td>
                          <img src={holder.ens ? (holder.ens.avatar ? holder.ens.avatar : '') : ''}/>
                           {holder.ens ? holder.ens.domain : holder.address}
                        </td>
                        <td>{holder.tiempoHumano}</td>
                        <td>{holder && holder.recibido }</td>
                      </tr>
                    );
                  })}
              </tbody>
            )}
          </table>
          <h3>
            Hecho con 🫶 por{" "}
            <a target="_blank" href="https://twitter.com/neeel_eth">
              neeel.eth
            </a>
          </h3>
        </main>
      </header>
    </div>
  );
}

export default App;
