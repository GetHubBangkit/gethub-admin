import { useContext } from "react";
import { PrivilegeContext } from "../context/privilege";

export default function usePrivilege() {
	return useContext(PrivilegeContext);
}
