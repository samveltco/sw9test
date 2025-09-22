// // ©2024 Austin App House. All rights reserved.
// import React, { useEffect, useState } from 'react';
// import { MDBContainer } from 'mdbreact';
// import { connect } from 'react-redux';
// import { withRouter } from 'withroute';
// import Select from 'react-select';
// import { getAccountBalanceByClient } from '../../storage/actions/profile';
// import {
//   fetchWorkOrderById,
//   fetchWorkOrderTemplateById,
//   setCurrentTemplate,
//   setCurrentWorkOrder,
// } from '../../storage/actions/workOrdersActions';
// import Loader from '../../components/dashboard/common/Loader';
// // eslint-disable-next-line import/no-cycle
// import Modal from '../../components/modal';
// import PageHeader from '../../components/createWorkOrder/PageHeader';
// import CreateWorkOrderReduxForm from '../../components/layout/reduxForm/CreateWorkOrder';
// import onSubmit from '../../utils/reduxForm/onSubmit/createWorkOrder';
// import getTemplatesList from '../../utils/api/get/getTemplatesList';
// import { white as customSelectStyle } from '../../utils/customSelectStyle';
// import { toggleModal } from '../../storage/actions/modalsActions';

// const CreateAndEditWorkOrder = ({
//   mainContainer,
//   currentWorkOrder,
//   fetchWorkOrderById,
//   getAccountBalanceByClient,
//   setCurrentWorkOrder,
//   match,
//   setCurrentTemplate,
//   fetchWorkOrderTemplateById,
//   toggleModal,
// }: any) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [templates, setTemplates] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState('');
//   const [isFormTouched, setFormTouched] = useState(false);

//   const getSingleWorkOrder = async (id: string) => {
//     if (!id) {
//       await setCurrentWorkOrder({});
//     } else if (id !== currentWorkOrder?._id) {
//       await fetchWorkOrderById(id);
//     }
//     setIsLoading(false);
//   };

//   const fetchTemplatesList = async () => {
//     const newTemplatesList = await getTemplatesList();
//     setTemplates(newTemplatesList);
//   };

//   useEffect(() => {
//     getAccountBalanceByClient();
//     setCurrentTemplate({});
//     getSingleWorkOrder(match?.params?.id);
//     fetchTemplatesList();
//   }, []);

//   const changeSelectedTemplate = async select => {
//     setIsLoading(true);
//     setSelectedTemplate(select);
//     if (!select) {
//       await setCurrentTemplate({});
//     } else {
//       await fetchWorkOrderTemplateById(select.value);
//     }
//     setIsLoading(false);
//   };

//   // eslint-disable-next-line consistent-return
//   const handlerSelectTemplate = select => {
//     if (!isFormTouched) return changeSelectedTemplate(select);
//     toggleModal(
//       true,
//       'confirmModal',
//       true,
//       {
//         onAccept: () => changeSelectedTemplate(select),
//         header: 'Are you sure (all fields will be rewrite)?',
//         buttonLabels: { reject: 'Cancel' },
//       },
//     );
//   };

//   return (
//     <MDBContainer className="clientcreateworkorderdiv" fluid>
//       <PageHeader isLoading={isLoading} WIN={!isLoading && currentWorkOrder?.WIN} />
//       {
//         !match?.params?.id
//           ? (
//             <div className="flex-box select-container align-items-baseline">
//               <label
//                 className="font-size-10 no-margins text-in-one-line padding-right-10"
//               >
//                 Use Template
//               </label>
//               <Select
//                 isClearable
//                 styles={customSelectStyle}
//                 options={templates}
//                 value={selectedTemplate}
//                 onChange={handlerSelectTemplate}
//                 placeholder="Select Template"
//               />
//             </div>
//           )
//           : (
//             <>
//               {
//                 currentWorkOrder?.templateId
//                   ? (
//                     <div
//                       title="Create using template"
//                       className="blue-grey-text font-size-08 text-in-one-line padding-left-12-5 padding-bottom-10"
//                     >
//                       {`Template${
//                         currentWorkOrder?.templateInfo?.name
//                           ? ` "${currentWorkOrder?.templateInfo?.name}"`
//                           : ''
//                       } Used`}
//                     </div>
//                   )
//                   : <></>
//               }
//             </>
//           )
//       }
//       {
//         isLoading
//           ? (
//             <div className="flex-box flex-center">
//               <Loader />
//             </div>
//           )
//           : (
//             <CreateWorkOrderReduxForm onSubmit={onSubmit} setTouched={setFormTouched} />
//           )
//       }
//       <Modal mainContainer={mainContainer.current} />
//     </MDBContainer>
//   );
// };

// const mapDispatchToProps = {
//   getAccountBalanceByClient,
//   fetchWorkOrderById,
//   setCurrentWorkOrder,
//   setCurrentTemplate,
//   fetchWorkOrderTemplateById,
//   toggleModal,
// };

// const mapStateToProps = (state: any) => ({
//   currentWorkOrder: state.workOrder.currentWorkOrder,
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withRouter(CreateAndEditWorkOrder));

export default () => <div>CreateEditWorkOrder</div>