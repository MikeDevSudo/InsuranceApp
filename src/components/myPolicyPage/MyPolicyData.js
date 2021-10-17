import classes from "./MyPolicyData.module.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import PolicyDataEntry from "./PolicyDataEntry";

const POLICY_DETAILS = "https://api.bybits.co.uk/policys/details";

const MyPolicyData = () => {
  const authctx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [policyDataObj, setPolicyDataObj] = useState({});

  useEffect(() => {
    fetch(POLICY_DETAILS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        environment: "mock",
        Authorization: `Bearer ${authctx.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setPolicyDataObj(data);
        if (data && data !== null && data !== undefined) {
          setIsLoading(true);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [authctx.token]);

  if (!isLoading) {
    return <LoadingSpinner />;
  }

  const Caps = (s) => {
    return `${s[0].toUpperCase()}${s.slice(1)}`;
  };
  const policyAddress = `${policyDataObj.policy.address.line_1}, ${policyDataObj.policy.address.line_2}, ${policyDataObj.policy.address.postcode}`;
  const policyCar = `${policyDataObj.vehicle.make} ${policyDataObj.vehicle.model
  } ${Caps(policyDataObj.vehicle.colour)} -${policyDataObj.vehicle.reg}`;

  return (
    <div className={classes.content}>
      <h1 className={classes.policyTitle}>My Policy</h1>
      <PolicyDataEntry
        h2={"Policy Reference"}
        p={policyDataObj.policy_reference}
      ></PolicyDataEntry>
      <PolicyDataEntry
        h2={"Cover Type"}
        p={policyDataObj.policy.cover}
      ></PolicyDataEntry>
      <PolicyDataEntry h2={"Car"} p={policyCar}></PolicyDataEntry>
      <PolicyDataEntry h2={"Address"} p={policyAddress}></PolicyDataEntry>
    </div>
  );
};

export default MyPolicyData;
