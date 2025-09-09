// ©2024 Austin App House. All rights reserved.
import axios from "axios";

const GetApplicantsForWorkOrder = async (workOrderId) => {
    const applicants = await axios.post("/api/users/view_applicants", {work_order_id: workOrderId})
    return applicants.data
};

export default GetApplicantsForWorkOrder;
