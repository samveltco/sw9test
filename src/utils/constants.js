import fundsCharByType from './fundsCharByType';

export const localCurrencySettings = {
  maximumFractionDigits: 2,
  style: 'currency',
  currencyDisplay: 'symbol',
  currency: 'USD',
};

export const variableTypeShorts = {
  Hour: 'hr',
  Device:'dev',
  Site:  'flat'
}

export const workOrderCustomFieldTypes = {
  PUBLIC: 'Show custom field in Published Status',
  RESTRICTED: 'Show to contractor upon assignment',
  HIDDEN: 'Hide custom field from Contractors',
};

// ©2024 Austin App House. All rights reserved.

export const tabs = {
  contractor: [
    { value: 'upcoming-work', title: 'Upcoming Work' },
    { value: 'available', title: 'Available' },
    { value: 'routed', title: 'Routed' },
    { value: 'applied', title: 'Applied' },
    { value: 'completed', title: 'Completed' },
    { value: 'approved', title: 'Approved' },
    { value: 'paid', title: 'Paid' },
  ],
  client: [
    { value: 'draft', title: 'Draft' },
    { value: 'available', title: 'Available' },
    { value: 'routed', title: 'Routed' },
    { value: 'assigned', title: 'Assigned' },
    { value: 'completed', title: 'Completed' },
    { value: 'approved', title: 'Approved' },
    { value: 'paid', title: 'Paid' },
    { value: 'all', title: 'All' },
  ],
  superAdmin: [
    { value: 'draft', title: 'Draft' },
    { value: 'available', title: 'Available' },
    { value: 'routed', title: 'Routed' },
    { value: 'assigned', title: 'Assigned' },
    { value: 'completed', title: 'Completed' },
    { value: 'approved', title: 'Approved' },
    { value: 'paid', title: 'Paid' },
    { value: 'all', title: 'All' },
  ],
};

export const sortWOTypes = {
  client: [
    { key: 'id', value: '_id', title: 'Sort By Id' },
    { key: 'WIN', value: 'WIN', title: 'Sort By WIN' },
    { key: 'completedAt', value: 'completedAt', title: 'Sort By Completed Date' },
    { key: 'contractor', value: 'contractor_id', title: 'Sort By Contractor' },
    { key: 'company', value: 'woCompanyInfo.name', title: 'Sort By Company' },
    { key: 'project', value: 'projectInfo.name', title: 'Sort By Project' },
    { key: 'start date', value: 'startDate', title: 'Sort By Start Date' },
    { key: 'base pay', value: 'amount', title: 'Sort By Base Pay' },
    { key: 'city', value: 'city', title: 'Sort By City' },
    { key: 'state', value: 'state.label', title: 'Sort By State' },
    { key: 'applicants', value: 'applicant_count', title: 'Sort By Applicants' },
  ],
  contractor: [
    { key: 'id', value: '_id', title: 'Sort By Id' },
    { key: 'WIN', value: 'WIN', title: 'Sort By WIN' },
    { key: 'completedAt', value: 'completedAt', title: 'Sort By Completed Date' },
    { key: 'client', value: 'userId', title: 'Sort By Client' },
    { key: 'start date', value: 'startDate', title: 'Sort By Start Date' },
    { key: 'base pay', value: 'amount', title: 'Sort By Base Pay' },
    { key: 'city', value: 'city', title: 'Sort By City' },
    { key: 'state', value: 'state.label', title: 'Sort By State' },
  ],
  superAdmin: [
    { key: 'id', value: '_id', title: 'Sort By Id' },
    { key: 'WIN', value: 'WIN', title: 'Sort By WIN' },
    { key: 'completedAt', value: 'completedAt', title: 'Sort By Completed Date' },
    { key: 'contractor', value: 'contractor_id', title: 'Sort By Contractor' },
    { key: 'company', value: 'woCompanyInfo.name', title: 'Sort By Company' },
    { key: 'project', value: 'projectInfo.name', title: 'Sort By Project' },
    { key: 'start date', value: 'startDate', title: 'Sort By Start Date' },
    { key: 'base pay', value: 'amount', title: 'Sort By Base Pay' },
    { key: 'city', value: 'city', title: 'Sort By City' },
    { key: 'state', value: 'state.label', title: 'Sort By State' },
    { key: 'applicants', value: 'applicant_count', title: 'Sort By Applicants' },
  ],
};

export const rolloverInfoMessage = {
  client: '• If the work order is missing deliverables, please reach out to the contractor\n'
  + ' via messaging and provide detailed notes as to what is still required.\n\n'
  + '• If the work is incomplete and/or a pay reduction is needed, we urge you to first\n'
  + ' reach out to the contractor directly to discuss a pay adjustment Once you have\n'
  + ' come to an agreement, you can enter a negative $ amount into the "Pay.\n'
  + ' Adjustments" field, add the reasons for the reduction and a notice will go out to\n'
  + ' the contractor to accept the change.',
  contractor: '- If you have issues with the final payment amount shown or need to\n'
  + ' request an increase on labor, please reach out directly to the Client/PM\n'
  + ' contact listed in this work order to request an adjustment.\n\n'
  + '- If you need to request additional money for expenses, you need to add\n'
  + ' expenses to the work order before marking it complete.   If you have already\n'
  + ' marked the work order complete, you\'ll need to ask the Client/PM to add any\n'
  + ' additional expense adjustments for you.',
};

export const workOrderTypes = [
  {
    title: 'Draft',
    value: 'draft',
  },
  {
    title: 'Available',
    value: 'published',
  },
  {
    title: 'Routed',
    value: 'routed',
  },
  {
    title: 'Assigned',
    value: 'assigned',
  },
  {
    title: 'Completed',
    value: 'completed',
  },
  {
    title: 'Approved',
    value: 'approved',
  },
  {
    title: 'Paid',
    value: 'paid',
  },
  {
    title: 'Canceled',
    value: 'canceled',
  },
  {
    title: 'Deleted',
    value: 'deleted',
  }
];

export const datatableManagerFundsColumnsForClient = [
  {
    name: 'Date',
    sortable: true,
    sortField: 'createdAt',
    width: '200px',
    selector: row => new Date(row.createdAt).toLocaleString('en-US')
  },
  {
    name: 'IP Address',
    sortable: true,
    sortField: 'ip',
    selector: (row) => row.ip ?? " - "
  },
  {
    name: 'Description',
    sortable: true,
    sortField: 'description',
    selector: row => row.description,
  },
  {
    name: 'Payee',
    sortable: true,
    sortField: 'payee',
    selector: row => row.payee,
  },
  {
    name: 'Status',
    sortable: true,
    sortField: 'status',
    selector: row => row.status.replace(/^\w/, c => c.toUpperCase()),
  },
  {
    name: 'Amount',
    sortable: true,
    sortField: 'amount',
    selector: (row) => fundsCharByType(row.type)
      + Number(row.amount).toLocaleString('en-US', localCurrencySettings)
  }
];
export const recruitColumns = [
  {
    name: 'Name',
    sortable: true,
    sortField: 'name',
    width: '300px',
    selector: row => row.name
  },
  {
    name: 'Email',
    sortable: true,
    sortField: 'email',
    selector: (row) => row.email
  },
  {
    name: 'ZIP',
    sortable: true,
    sortField: 'zipcode',
    width: '100px',
    selector: row => row.zipcode,
  },
];

export const datatableManagerFundsColumnsForContractor = [
  {
    label: 'Date Paid',
    field: 'paidAt',
    width: 150,
    attributes: {
      'aria-controls': 'DataTable',
      'aria-label': 'Date',
    },
  },
  {
    label: 'Client Name',
    field: 'clientName',
    width: 200,
  },
  {
    label: 'Work Order',
    field: 'workOrderNamed',
    sort: 'disabled',
    width: 270,
  },
  {
    label: 'Status',
    field: 'status',
    sort: 'disabled',
    width: 270,
  },
  {
    label: 'Amount',
    field: 'amount',
    sort: 'asc',
    width: 100,
  },
];

export const datatableManagerFundsColumnsForSuperAdmin = [
  {
    name: 'Date of creation',
    sortable: true,
    sortField: 'createdAt',
    width: '200px',
    selector: row => new Date(row.createdAt).toLocaleString('en-US')
  },
  {
    name: 'Date of the last update',
    sortable: true,
    sortField: 'updatedAt',
    width: '270px',
    selector: row => new Date(row.updatedAt).toLocaleString('en-US')
  },
  {
    name: 'IP Address',
    sortable: true,
    sortField: 'ip',
    selector: (row) => row.ip ?? " - "
  },
  {
    name: 'Type',
    sortable: true,
    sortField: 'type',
    selector: row => row.type.replace(/^\w/, c => c.toUpperCase()),
  },
  {
    name: 'Description',
    sortable: true,
    sortField: 'description',
    selector: row => row.description,
  },
  {
    name: 'Payee',
    sortable: true,
    sortField: 'payee',
    selector: row => row.payee,
  },
  {
    name: 'Status',
    sortable: true,
    sortField: 'status',
    selector: row => row.status.replace(/^\w/, c => c.toUpperCase()),
  },
  {
    name: 'Amount',
    sortable: true,
    sortField: 'amount',
    selector: (row) => fundsCharByType(row.type)
      + Number(row.amount).toLocaleString('en-US', localCurrencySettings)
  }
];

export const errorTitle = {
  'Insufficient funds in the account': 'Payment Failed',
};

export const errorDescription = {
  sendInviteFromWorkOrderToContractor: {
    'Insufficient funds in the account': 'Not enough funds available to invite contractors to this work order. Please add additional funds to your account.',
  },
};

export const errorActions = {
  'Insufficient funds in the account': {
    elementType: 'button',
    actionType: 'modal',
    label: 'Add Funds',
    action: func => func(true, 'addFunds'),
  },
};

// eslint-disable-next-line no-useless-escape
export const emailValidationRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const nameSymbolsOnlyRegExp = /^[a-zA-Z\s.-]+$/;

export const PROCESSING_MIN_AMOUNT = 1.0;

export const datatableManagerCompaniesColumnsForSuperAdmin = [
  {
    label: 'Company Name',
    value: 'name',
    sort: true,
  },
  {
    label: 'Name (Created By)',
    value: 'creatorName',
    sort: true,
  },
  {
    label: 'Phone',
    value: 'creatorPhone',
    sort: true,
  },
  {
    label: 'Email',
    value: 'creatorEmail',
    sort: true,
  },
  {
    label: 'Token',
    value: 'authToken',
    sort: false,
    className: 'auth-text'
  },
  {
    label: 'Balance',
    value: 'balance',
    sort: true,
    format: value => (`$${value.toFixed(2)}`),
  },
  {
    label: 'Available',
    value: 'available',
    sort: true,
    format: value => (`$${value.toFixed(2)}`),
  },
  {
    label: 'Fee',
    value: 'processingFee',
    sort: true,
    format: value => (`${(value * 100).toFixed(2)}%`),
  },
];

export const accountStatusOptions = [
  {
    label: 'Checking',
    value: 'checking',
  },
  {
    label: 'Savings',
    value: 'savings',
  },
];

export const accountTypeOptions = [
  {
    label: 'Personal',
    value: 'personal',
  },
  {
    label: 'Business',
    value: 'business',
  },
];


export const datatableColumnsForUserManagement = [
  {
    label: 'First name',
    value: 'firstName',
    sort: false,
  },
  {
    label: 'Last Name',
    value: 'lastName',
    sort: false,
  },
  {
    label: 'Email',
    value: 'email',
    sort: false,
  },
  {
    label: 'Phone',
    value: 'phone',
    sort: false,
  },
  {
    label: 'Role',
    value: 'role',
    sort: false,
  },
  {
    label: 'Status',
    value: 'status',
    sort: false,
  },
];

export const userTypeOptions = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Dispatcher', label: 'Dispatcher' },
];

export const manageCustomFieldsTableColumns = [
  {
    label: 'Custom field name',
    value: 'name',
    sort: false,
  },
];
