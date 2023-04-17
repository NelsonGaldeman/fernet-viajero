import { useState, useEffect } from "react";
import { ethers } from "ethers";

const provider = new ethers.InfuraProvider(
  "mainnet",
  "4086062dc5ab409398967ebe8485f646"
);

const useGetEnsData = (address) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!address) return;
    async function fetch() {
      try {
        setLoading(true); 

        let domain;
        if (localStorage.getItem(address)) {
          domain = JSON.parse(localStorage.getItem(address)).domain;
        } else { 
          // Query ENS for the domain associated with the address
          domain = await provider.lookupAddress(address);
          localStorage.setItem(address, JSON.stringify({domain:domain, avatar:null}));
        }
        
        if (domain) {
          let avatar = JSON.parse(localStorage.getItem(address)).avatar;

          if (!avatar) {
            // Query ENS for the avatar associated with the domain
            avatar = await provider.getAvatar(domain);
          }
          
          setData({ domain, avatar });
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }
      setLoading(false);
    }
    fetch();
  }, [address]);

  return { data, loading, error };
};

export default useGetEnsData;
