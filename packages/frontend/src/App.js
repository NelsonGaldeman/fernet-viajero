import React, { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client";
import { GoMarkGithub } from "react-icons/go";
import { tiempoTranscurrido, diferenciaEnSegundos } from "./utils";
import { useApolloClient } from "@apollo/client";
import { InfuraProvider } from "ethers";
// import { ENS } from "@ensdomains/ensjs";

const getENSData = async (address) => {
  const provider = new InfuraProvider(
    "mainnet",
    "4086062dc5ab409398967ebe8485f646"
  );
  const ens = new ENS({ provider });

  try {
    // Query ENS for the domain associated with the address
    const domain = await ens.getName(address);

    // Query ENS for the avatar associated with the domain
    const avatar = await ens.getText(domain, "avatar");

    return { domain, avatar };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const processEns = async (holders) => {
  for (let i = 0; i < holders.length; i++) {
    let ens = await getENSData(holder.address);
    if (!ens.domain) {
      continue;
    }

    holders[i].ens = { domain: ens.domain, avatar: ens.avatar };
  }

  return holders;
};

function App() {
  const [current, setCurrent] = useState(null);
  const [holders, setHolders] = useState(null);
  const [loaded, setLoaded] = useState(null);

  let { data, loading, error, refetch } = useQuery(
    gql`
      query {
        currents(id: "1") {
          address
          block
          timestamp
        }
      }
    `
  );

  console.log(data);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let query = gql`
  //       query {
  //         currents(id: "1") {
  //           address
  //           block
  //           timestamp
  //         }
  //       }
  //     `;

  //     let { loading, error, response } = await useQuery(query, {
  //       variables: { address },
  //     });

  //     console.log(response);
  //     let owner = response.currents[0];
  //     owner.tiempoHumano = tiempoTranscurrido(
  //       diferenciaEnSegundos(owner.timestamp)
  //     );
  //     setCurrent(owner);

  //     // let ownerEns = await getENSData(owner.address);
  //     // if (ownerEns && ownersEns.domain) {
  //     //   owner.ens = {
  //     //     domain: ownerEns.domain,
  //     //     avatar: ownerEns.avatar
  //     //   };
  //     // }

  //     query = gql`
  //       query {
  //         currents(id: "1") {
  //           address
  //           block
  //           timestamp
  //         }
  //       }
  //     `;

  //     // { loading, error, response } = await useQuery(query, {
  //     //   variables: { address },
  //     // });

  //     response = [
  //       { address: "0x0", tiempo: 10000 },
  //       { address: "0x1", tiempo: 10000 },
  //       { address: "0x2", tiempo: 10000 },
  //     ];
  //     let holdersArr = [];

  //     response.forEach((holder) => {
  //       holder.tiempoHumano =
  //         tiempoTranscurrido(holder.tiempo) +
  //         (holder.tiempo >= 86400 ? " 💀" : "");
  //       holdersArr.push(holder);
  //     });

  //     setHolders(holdersArr);
  //     setLoaded(true);

  //     // setHolders(await processEns(holdersArr));
  //   };

  //   fetchData();
  // }, []);

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
                <th>Tiempo</th>
              </tr>
            </thead>
            {!loaded ? (
              <tbody>
                <tr>
                  <td colSpan={3} style={{ textAlign: "center" }}>
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
                </tr>
                {holders &&
                  holders.map((holder, i) => {
                    return (
                      <tr key={i}>
                        <td>#{holders.length - i}</td>
                        <td>
                          {holder.ens ? holder.ens.domain : holder.address}
                        </td>
                        <td>{holder.tiempoHumano}</td>
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
